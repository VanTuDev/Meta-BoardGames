/**
 * Google Apps Script để nhận dữ liệu từ form và ghi vào Google Sheets
 * 
 * HƯỚNG DẪN SỬ DỤNG:
 * 1. Mở Google Sheets: https://docs.google.com/spreadsheets/d/1sVMWuUISpF78VGxiVU0oVgKrFYrwt6m_Rrd4K7rMiBk/edit
 * 2. Vào menu: Mở rộng > Apps Script
 * 3. Xóa code mặc định và paste toàn bộ code này vào
 * 4. Lưu lại (Ctrl+S hoặc Cmd+S)
 * 5. Chạy hàm doPost một lần để cấp quyền (nếu cần)
 * 6. Triển khai > Triển khai dưới dạng ứng dụng web
 *    - Loại thực thi: Người dùng hiện tại
 *    - Ai có quyền truy cập: Bất kỳ ai
 * 7. Copy URL và cập nhật vào script.js (nếu URL khác)
 */

// ID của Google Sheets
const SHEET_ID = '1sVMWuUISpF78VGxiVU0oVgKrFYrwt6m_Rrd4K7rMiBk';

// Tên sheet (Sheet1)
const SHEET_NAME = 'Sheet1';

/**
 * Hàm xử lý POST request từ form
 * Hỗ trợ cả JSON (từ fetch) và form data (từ iframe)
 */
function doPost(e) {
  try {
    let data;
    
    // Kiểm tra xem dữ liệu đến dưới dạng JSON hay form data
    if (e.postData && e.postData.contents) {
      // Trường hợp 1: JSON từ fetch request
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // Trường hợp 2: Form data từ iframe submission
        const formData = e.parameter;
        if (formData.data) {
          // Nếu có field 'data' chứa JSON string
          data = JSON.parse(formData.data);
        } else {
          // Nếu dữ liệu đến dưới dạng form fields trực tiếp
          data = {
            stt: formData.stt || '',
            fullName: formData.fullName || '',
            phone: formData.phone || '',
            hhBox: parseInt(formData.hhBox) || 0,
            hhMap: parseInt(formData.hhMap) || 0,
            hhCard: parseInt(formData.hhCard) || 0,
            facebook: formData.facebook || '',
            note: formData.note || ''
          };
        }
      }
    } else if (e.parameter) {
      // Trường hợp 3: Form data từ URL parameters
      const formData = e.parameter;
      if (formData.data) {
        data = JSON.parse(formData.data);
      } else {
        data = {
          stt: formData.stt || '',
          fullName: formData.fullName || '',
          phone: formData.phone || '',
          hhBox: parseInt(formData.hhBox) || 0,
          hhMap: parseInt(formData.hhMap) || 0,
          hhCard: parseInt(formData.hhCard) || 0,
          facebook: formData.facebook || '',
          note: formData.note || ''
        };
      }
    } else {
      throw new Error('No data received');
    }
    
    // Lấy sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Nếu sheet chưa có header, thêm header
    if (sheet.getLastRow() === 0) {
      const headers = [
        'STT',
        'HỌ VÀ TÊN',
        'SĐT',
        'BOX',
        'MAP',
        'CARD',
        'FACEBOOK',
        'GHI CHÚ',
        'TIMESTAMP'
      ];
      sheet.appendRow(headers);
    }
    
    // Tạo timestamp
    const timestamp = new Date();
    const timestampString = Utilities.formatDate(
      timestamp,
      Session.getScriptTimeZone(),
      'yyyy-MM-dd HH:mm:ss'
    );
    
    // Chuẩn bị dữ liệu để ghi vào sheet
    // Thứ tự cột: STT | HỌ VÀ TÊN | SĐT | BOX | MAP | CARD | FACEBOOK | GHI CHÚ | TIMESTAMP
    const rowData = [
      data.stt || '',                    // STT
      data.fullName || '',               // HỌ VÀ TÊN
      data.phone || '',                  // SĐT
      data.hhBox || 0,                   // BOX
      data.hhMap || 0,                   // MAP
      data.hhCard || 0,                  // CARD
      data.facebook || '',               // FACEBOOK
      data.note || '',                   // GHI CHÚ
      timestampString                    // TIMESTAMP
    ];
    
    // Ghi dữ liệu vào sheet
    sheet.appendRow(rowData);
    
    // Trả về JSON response thành công
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Xử lý lỗi
    Logger.log('Error: ' + error.toString());
    Logger.log('Error details: ' + JSON.stringify(e));
    
    // Trả về JSON response lỗi
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Hàm test để kiểm tra kết nối (tùy chọn)
 * Chạy hàm này trong Apps Script editor để test
 */
function testConnection() {
  const testData = {
    stt: 'TEST001',
    fullName: 'Nguyễn Văn Test',
    phone: '0123456789',
    hhBox: 1,
    hhMap: 2,
    hhCard: 3,
    facebook: 'https://facebook.com/test',
    note: 'Đây là test'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

