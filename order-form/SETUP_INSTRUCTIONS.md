# Hướng dẫn khắc phục lỗi 401 Unauthorized

## Vấn đề
Lỗi **401 Unauthorized** xảy ra khi Google Apps Script từ chối request do vấn đề về quyền truy cập.

## Giải pháp

### Bước 1: Kiểm tra và cập nhật quyền truy cập Apps Script

1. **Mở Google Sheets:**
   - Truy cập: https://docs.google.com/spreadsheets/d/1sVMWuUISpF78VGxiVU0oVgKrFYrwt6m_Rrd4K7rMiBk/edit

2. **Vào Apps Script:**
   - Menu: **Mở rộng** > **Apps Script**

3. **Kiểm tra code:**
   - Đảm bảo code trong `AppsScript.gs` đã được paste đầy đủ
   - Lưu lại (Ctrl+S hoặc Cmd+S)

4. **Triển khai lại ứng dụng web:**
   - Click **Triển khai** > **Quản lý các bản triển khai**
   - Nếu đã có bản triển khai cũ, click vào biểu tượng **✏️ (chỉnh sửa)**
   - Nếu chưa có, click **Tạo bản triển khai mới**

5. **Cấu hình quyền truy cập:**
   - **Loại thực thi:** Chọn **Người dùng hiện tại** (hoặc **Tôi**)
   - **Ai có quyền truy cập:** **BẮT BUỘC** chọn **Bất kỳ ai** (Anyone)
   - Click **Triển khai**

6. **Copy URL mới:**
   - Sau khi triển khai, copy URL mới được tạo
   - Cập nhật URL này vào file `script.js` (dòng 2) nếu khác với URL hiện tại

### Bước 2: Cấp quyền cho Apps Script

1. **Lần đầu chạy sẽ yêu cầu cấp quyền:**
   - Click **Xem lại quyền**
   - Chọn tài khoản Google của bạn
   - Click **Nâng cao** > **Đi tới [Tên dự án] (không an toàn)**
   - Click **Cho phép**

2. **Kiểm tra quyền:**
   - Apps Script cần quyền truy cập Google Sheets để ghi dữ liệu
   - Đảm bảo đã cấp đầy đủ quyền

### Bước 3: Kiểm tra lại

1. **Mở form:**
   - Mở file `index.html` trong trình duyệt
   - Điền thông tin và submit

2. **Kiểm tra Google Sheets:**
   - Mở Google Sheets và kiểm tra xem dữ liệu đã được ghi chưa
   - Nếu có dữ liệu mới → Thành công! ✅
   - Nếu không có dữ liệu → Xem log trong Apps Script

3. **Xem log (nếu cần):**
   - Vào Apps Script Editor
   - Menu: **Xem** > **Nhật ký thực thi**
   - Xem các lỗi nếu có

## Lưu ý quan trọng

- ✅ **"Ai có quyền truy cập"** PHẢI là **"Bất kỳ ai"** (Anyone)
- ✅ Code hiện tại đã sử dụng form submission với iframe (không dùng fetch) để tránh CORS
- ✅ Apps Script đã được cấu hình để nhận cả JSON và form data

## Nếu vẫn gặp lỗi

1. **Kiểm tra URL Apps Script:**
   - Đảm bảo URL trong `script.js` đúng với URL từ bản triển khai mới nhất

2. **Thử triển khai lại:**
   - Xóa bản triển khai cũ và tạo bản mới
   - Copy URL mới và cập nhật vào code

3. **Kiểm tra Google Sheets:**
   - Đảm bảo Sheet ID đúng trong `AppsScript.gs`
   - Đảm bảo tên sheet là "Sheet1" (hoặc cập nhật tên trong code)

4. **Test trực tiếp:**
   - Mở URL Apps Script trong trình duyệt
   - Nếu hiện "This app isn't verified" → Click "Advanced" > "Go to [project name] (unsafe)"
   - Nếu vẫn lỗi → Kiểm tra lại quyền truy cập

