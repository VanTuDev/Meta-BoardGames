# Form Đặt Hàng Huyền Hoàng

Mini-project form đặt hàng với tích hợp Google Sheets qua Google Apps Script.

## 📁 Cấu trúc file

```
order-form/
├── index.html          # Giao diện form
├── script.js          # Logic xử lý form và gửi dữ liệu
├── AppsScript.gs      # Mã Google Apps Script
└── README.md          # Hướng dẫn này
```

## 🚀 Cách sử dụng

### Bước 1: Thiết lập Google Apps Script

1. Mở Google Sheets: https://docs.google.com/spreadsheets/d/1sVMWuUISpF78VGxiVU0oVgKrFYrwt6m_Rrd4K7rMiBk/edit

2. Vào menu: **Mở rộng** > **Apps Script**

3. Xóa code mặc định và paste toàn bộ nội dung từ file `AppsScript.gs`

4. Lưu lại (Ctrl+S hoặc Cmd+S)

5. **Triển khai ứng dụng web:**
   - Click vào **Triển khai** > **Triển khai dưới dạng ứng dụng web**
   - **Loại thực thi:** Người dùng hiện tại
   - **Ai có quyền truy cập:** Bất kỳ ai
   - Click **Triển khai**
   - Copy URL được tạo ra (nếu khác với URL trong script.js, cần cập nhật)

6. **Cấp quyền:**
   - Lần đầu chạy sẽ yêu cầu cấp quyền
   - Click **Xem lại quyền** > Chọn tài khoản > **Nâng cao** > **Đi tới [Tên dự án] (không an toàn)**
   - Click **Cho phép**

### Bước 2: Chạy form HTML

**Cách 1: Mở trực tiếp file**
- Mở file `index.html` bằng trình duyệt (double-click hoặc right-click > Open with browser)

**Cách 2: Dùng Live Server (khuyến nghị)**
- Nếu dùng VS Code: Cài extension "Live Server"
- Right-click vào `index.html` > **Open with Live Server**

**Cách 3: Dùng local server**
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server

# Sau đó mở: http://localhost:8000
```

## 📋 Các trường form

| Trường | Loại | Bắt buộc | Mô tả |
|--------|------|-----------|-------|
| STT | Text/Number | Không | Số thứ tự |
| HỌ VÀ TÊN | Text | **Có** | Họ và tên đầy đủ |
| SỐ ĐIỆN THOẠI | Text | **Có** | Số điện thoại |
| HUYỀN HOÀNG BOX | Number | Không | Số lượng (599.000đ) |
| HUYỀN HOÀNG MAP | Number | Không | Số lượng (319.000đ) |
| HUYỀN HOÀNG CARD | Number | Không | Số lượng (219.000đ) |
| FACEBOOK | Text | Không | Link Facebook |
| GHI CHÚ | Textarea | Không | Ghi chú thêm |

## 🔧 Cấu hình

### Thay đổi URL Apps Script

Nếu URL Apps Script khác, sửa trong `script.js`:

```javascript
const APPS_SCRIPT_URL = 'YOUR_NEW_URL_HERE';
```

### Thay đổi Google Sheets ID

Nếu dùng sheet khác, sửa trong `AppsScript.gs`:

```javascript
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
```

## 📊 Cấu trúc dữ liệu trong Google Sheets

Sheet sẽ có các cột theo thứ tự:

1. **STT** - Số thứ tự
2. **HỌ VÀ TÊN** - Họ và tên khách hàng
3. **SĐT** - Số điện thoại
4. **BOX** - Số lượng Huyền Hoàng Box
5. **MAP** - Số lượng Huyền Hoàng Map
6. **CARD** - Số lượng Huyền Hoàng Card
7. **FACEBOOK** - Link Facebook
8. **GHI CHÚ** - Ghi chú
9. **TIMESTAMP** - Thời gian gửi (tự động)

## ✅ Tính năng

- ✅ Form validation (Họ tên và SĐT bắt buộc)
- ✅ Gửi dữ liệu JSON đến Google Apps Script
- ✅ Hiển thị popup thành công/lỗi
- ✅ Tự động reset form sau khi gửi thành công
- ✅ Giao diện đẹp với Tailwind CSS
- ✅ Responsive (mobile-friendly)
- ✅ Loading state khi đang gửi

## 🐛 Xử lý lỗi

### Lỗi "CORS" hoặc "Network error"
- Kiểm tra URL Apps Script có đúng không
- Đảm bảo Apps Script đã được triển khai với quyền "Bất kỳ ai"

### Lỗi "Permission denied"
- Kiểm tra quyền truy cập Google Sheets
- Đảm bảo đã cấp quyền cho Apps Script

### Dữ liệu không ghi vào Sheet
- Kiểm tra tên sheet có đúng là "Sheet1" không
- Kiểm tra Sheet ID có đúng không
- Xem log trong Apps Script editor (Xem > Nhật ký thực thi)

## 📝 Ghi chú

- Form sẽ tự động thêm header vào sheet nếu sheet trống
- Timestamp được tạo tự động khi gửi form
- Số lượng sản phẩm mặc định là 0 nếu không nhập

## 🔒 Bảo mật

- URL Apps Script có thể được chia sẻ công khai
- Không lưu trữ thông tin nhạy cảm trong code
- Nên giới hạn quyền truy cập Google Sheets nếu cần

