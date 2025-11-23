// Google Apps Script Web App URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwIb-jywzPysXuuxVYHY9L5dP-78RWSuj8z80aO62kRKGY4HrSyXW84YkvCRuQ4XUex/exec';

// Lấy form element
const orderForm = document.getElementById('orderForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitLoading = document.getElementById('submitLoading');

// Modal elements
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');

// Error elements
const fullNameError = document.getElementById('fullNameError');
const phoneError = document.getElementById('phoneError');

// Hàm hiển thị modal thành công
function showSuccessModal() {
   successModal.classList.remove('hidden');
   successModal.classList.add('flex');
}

// Hàm đóng modal thành công
function closeSuccessModal() {
   successModal.classList.add('hidden');
   successModal.classList.remove('flex');
}

// Hàm hiển thị modal lỗi
function showErrorModal(message) {
   errorMessage.textContent = message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
   errorModal.classList.remove('hidden');
   errorModal.classList.add('flex');
}

// Hàm đóng modal lỗi
function closeErrorModal() {
   errorModal.classList.add('hidden');
   errorModal.classList.remove('flex');
}

// Hàm validate form
function validateForm() {
   const fullName = document.getElementById('fullName').value.trim();
   const phone = document.getElementById('phone').value.trim();

   let isValid = true;

   // Reset error messages
   fullNameError.classList.add('hidden');
   phoneError.classList.add('hidden');
   document.getElementById('fullName').classList.remove('border-red-500');
   document.getElementById('phone').classList.remove('border-red-500');

   // Validate HỌ VÀ TÊN
   if (!fullName) {
      fullNameError.classList.remove('hidden');
      document.getElementById('fullName').classList.add('border-red-500');
      isValid = false;
   }

   // Validate SỐ ĐIỆN THOẠI
   if (!phone) {
      phoneError.classList.remove('hidden');
      document.getElementById('phone').classList.add('border-red-500');
      isValid = false;
   }

   return isValid;
}

// Hàm reset form
function resetForm() {
   orderForm.reset();
   // Reset các giá trị number về 0
   document.getElementById('hhBox').value = 0;
   document.getElementById('hhMap').value = 0;
   document.getElementById('hhCard').value = 0;

   // Reset error states
   fullNameError.classList.add('hidden');
   phoneError.classList.add('hidden');
   document.getElementById('fullName').classList.remove('border-red-500');
   document.getElementById('phone').classList.remove('border-red-500');
}

// Hàm lấy dữ liệu form và chuyển thành JSON
function getFormData() {
   const stt = document.getElementById('stt').value.trim();
   const fullName = document.getElementById('fullName').value.trim();
   const phone = document.getElementById('phone').value.trim();
   const hhBox = parseInt(document.getElementById('hhBox').value) || 0;
   const hhMap = parseInt(document.getElementById('hhMap').value) || 0;
   const hhCard = parseInt(document.getElementById('hhCard').value) || 0;
   const facebook = document.getElementById('facebook').value.trim();
   const note = document.getElementById('note').value.trim();

   return {
      stt: stt,
      fullName: fullName,
      phone: phone,
      hhBox: hhBox,
      hhMap: hhMap,
      hhCard: hhCard,
      facebook: facebook,
      note: note
   };
}

// Hàm gửi dữ liệu đến Google Apps Script
// Sử dụng form submission với iframe để tránh CORS và 401 Unauthorized errors
// Đây là cách được Google Apps Script khuyến nghị
async function submitForm(formData) {
   return new Promise((resolve) => {
      // Tạo iframe ẩn để nhận response
      let iframe = document.getElementById('hiddenIframe');
      if (!iframe) {
         iframe = document.createElement('iframe');
         iframe.id = 'hiddenIframe';
         iframe.name = 'hiddenIframe';
         iframe.style.display = 'none';
         document.body.appendChild(iframe);
      }

      // Tạo form ẩn
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = APPS_SCRIPT_URL;
      form.target = 'hiddenIframe';
      form.style.display = 'none';

      // Tạo input chứa JSON data
      // Google Apps Script sẽ parse JSON từ field 'data'
      const jsonInput = document.createElement('input');
      jsonInput.type = 'hidden';
      jsonInput.name = 'data';
      jsonInput.value = JSON.stringify(formData);
      form.appendChild(jsonInput);

      // Thêm form vào body
      document.body.appendChild(form);

      // Xử lý khi iframe load xong (response từ server)
      let resolved = false;
      const handleLoad = function () {
         if (resolved) return;
         resolved = true;

         setTimeout(() => {
            if (form.parentNode) {
               document.body.removeChild(form);
            }
            iframe.removeEventListener('load', handleLoad);
            resolve({ success: true, data: { status: 'ok' } });
         }, 500);
      };

      iframe.addEventListener('load', handleLoad);

      // Timeout fallback (nếu iframe.onload không fire)
      setTimeout(() => {
         if (resolved) return;
         resolved = true;

         if (form.parentNode) {
            document.body.removeChild(form);
         }
         iframe.removeEventListener('load', handleLoad);
         // Coi như thành công vì form đã được submit
         resolve({ success: true, data: { status: 'ok' } });
      }, 3000);

      // Submit form
      form.submit();
   });
}

// Xử lý submit form
orderForm.addEventListener('submit', async (e) => {
   e.preventDefault();

   // Validate form
   if (!validateForm()) {
      return;
   }

   // Disable submit button và hiển thị loading
   submitBtn.disabled = true;
   submitText.classList.add('hidden');
   submitLoading.classList.remove('hidden');

   // Lấy dữ liệu form
   const formData = getFormData();

   // Gửi dữ liệu
   const result = await submitForm(formData);

   // Enable submit button và ẩn loading
   submitBtn.disabled = false;
   submitText.classList.remove('hidden');
   submitLoading.classList.add('hidden');

   // Xử lý kết quả
   if (result.success) {
      // Hiển thị modal thành công
      showSuccessModal();
      // Reset form
      resetForm();
   } else {
      // Hiển thị modal lỗi
      showErrorModal(result.error);
   }
});

// Đóng modal khi click ra ngoài
successModal.addEventListener('click', (e) => {
   if (e.target === successModal) {
      closeSuccessModal();
   }
});

errorModal.addEventListener('click', (e) => {
   if (e.target === errorModal) {
      closeErrorModal();
   }
});

// Export functions để có thể gọi từ HTML
window.closeSuccessModal = closeSuccessModal;
window.closeErrorModal = closeErrorModal;

