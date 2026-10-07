# Nếp Tre — Hanoi Gift Box

Giao diện minh họa giới thiệu bộ quà Hà Nội, xây dựng bằng React, Vite và Tailwind CSS.

## Chạy dự án

```sh
npm ci
npm run dev
```

## Kiểm tra

```sh
npm run lint
npm run build
npm test
```

Kiểm thử Playwright sử dụng Google Chrome cài trên máy, kiểm tra desktop và kích thước điện thoại. Để dùng Chromium của Playwright trên máy khác, bỏ `channel: 'chrome'` trong `playwright.config.js` và chạy `npx playwright install chromium`.

## Phạm vi minh họa

- Biểu mẫu chỉ mô phỏng thao tác gửi, không gọi API và không lưu đơn. Thông báo trong giao diện nêu rõ điều này; có thể quay lại để thử tiếp.
- Nút ngôn ngữ chuyển nội dung Việt/Anh và cập nhật ngôn ngữ tài liệu HTML.
- QR được tạo từ URL hiện tại, dẫn tới mục liên hệ. Khi chạy localhost, thiết bị khác chỉ mở được nếu URL đó truy cập được từ thiết bị; khi triển khai, mã tự dùng địa chỉ website đang mở.
- Nhạc nền chỉ phát khi người xem chọn nút phát.

## Ảnh

Trang sử dụng WebP đã tối ưu, ảnh ngoài màn hình đầu tải trì hoãn. Giữ nguyên PNG gốc để chỉnh sửa hoặc xuất lại.

Để tạo lại WebP (cần Python và Pillow):

```sh
python scripts/optimize-images.py
```

# NEPTRE
