import { test, expect } from '@playwright/test';

test('spacing, language, images and navigation work across screen sizes', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('#hero h1')).toHaveText('Hanoi Gift Box');
  await expect(page.locator('#product-green-rice-cake')).toContainText('Origins and Story');
  await expect(page.locator('#product-green-rice-cake')).not.toContainText('Nguồn gốc và câu chuyện');
  await expect(page.locator('#brand-story')).not.toContainText('Bộ quà tặng Hà Nội');
  await expect(page.locator('#sustainability')).not.toContainText('Tất cả 4 thức quà');
  await expect(page.locator('#team')).not.toContainText('Nếp Tre được vận hành');
  for (const [name, role] of [
    ['Lưu Thị Thùy Dung', 'Founder & CEO'],
    ['Dương Thị Na', 'Finance & Accounting Manager'],
    ['Đặng Phương Trang', 'Marketing Manager'],
    ['Dương Thị Chúc', 'Sales Manager'],
    ['Nguyễn Diệu Anh', 'Operations Manager'],
  ]) {
    await expect(page.locator('#team .glass-card').filter({ hasText: name })).toContainText(role);
  }
  await expect(page.locator('#hero .section-label')).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(page.locator('#contact form input').first()).toHaveCSS('padding-top', '12px');
  await expect(page.locator('#contact form input').first()).toHaveCSS('padding-left', '16px');
  await expect(page.locator('#gift-box h2')).toHaveCSS('margin-bottom', '16px');
  await expect(page.locator('#gift-box')).toContainText('Sustainable Design');
  const vietnameseSwitch = page.getByRole('button', { name: 'Switch to Vietnamese' }).filter({ visible: true });
  await expect(vietnameseSwitch).toContainText('ENG');
  await vietnameseSwitch.click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await expect(page.locator('#hero h1')).toHaveText('Bộ Quà Hà Nội');
  await expect(page.locator('#product-green-rice-cake')).toContainText('Nguồn gốc và câu chuyện');
  await expect(page.locator('#product-green-rice-cake')).not.toContainText('Origins and Story');
  await expect(page.locator('#brand-story')).not.toContainText('The Hanoi Gift Box is more');
  await expect(page.locator('#sustainability')).not.toContainText('All four exquisite delicacies');
  await expect(page.locator('#team')).not.toContainText('Nếp Tre is led by');
  for (const [name, role] of [
    ['Lưu Thị Thùy Dung', 'Nhà sáng lập & Giám đốc điều hành'],
    ['Dương Thị Na', 'Quản lý tài chính & kế toán'],
    ['Đặng Phương Trang', 'Quản lý marketing'],
    ['Dương Thị Chúc', 'Quản lý kinh doanh'],
    ['Nguyễn Diệu Anh', 'Quản lý vận hành'],
  ]) {
    await expect(page.locator('#team .glass-card').filter({ hasText: name })).toContainText(role);
  }
  await expect(page.locator('#gift-box')).toContainText('Thiết Kế Bền Vững');
  const englishSwitch = page.getByRole('button', { name: 'Chuyển sang tiếng Anh' }).filter({ visible: true });
  await expect(englishSwitch).toContainText('VIE');
  await englishSwitch.click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('#hero h1')).toHaveText('Hanoi Gift Box');
  if (testInfo.project.name === 'mobile') {
    await page.locator('#nav-burger').click();
    await expect(page.locator('#nav-burger')).toHaveAttribute('aria-expanded', 'true');
    const menuLanguageSwitch = page.locator('#mobile-navigation button');
    await expect(menuLanguageSwitch).toContainText('Language:🇬🇧 English');
    await menuLanguageSwitch.click();
    await expect(page.locator('#hero h1')).toHaveText('Bộ Quà Hà Nội');
    await expect(menuLanguageSwitch).toContainText('Chuyển Ngôn Ngữ:🇻🇳 Tiếng Việt');
    await menuLanguageSwitch.click();
    await expect(page.locator('#hero h1')).toHaveText('Hanoi Gift Box');
    await page.locator('#mobile-navigation a[href="#contact"]').first().click();
    await expect(page.locator('#nav-burger')).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  }
  await page.locator('#sustainability').scrollIntoViewIfNeeded();
  await page.getByRole('link', { name: 'Open Nếp Tre contact section' }).click();
  await expect(page).toHaveURL(/#contact$/);
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
  expect(errors).toEqual([]);
});

test('demo form validates quantity and preserves inputs on return without sending an order', async ({ page }) => {
  const submissions = [];
  page.on('request', request => {
    if (request.method() === 'POST') submissions.push(request.url());
  });
  await page.goto('/#contact');
  await page.getByRole('button', { name: 'Switch to Vietnamese' }).filter({ visible: true }).click();
  await page.getByLabel('Họ và Tên', { exact: true }).fill('Khách thử nghiệm');
  await page.getByLabel('Số Điện Thoại', { exact: true }).fill('0972000300');
  const quantity = page.getByLabel('Số Lượng Hộp', { exact: true });
  await quantity.fill('0');
  await page.getByRole('button', { name: 'Thử Gửi Yêu Cầu Minh Họa' }).click();
  await expect(page.getByRole('status')).toHaveCount(0);
  await quantity.fill('2');
  await page.getByRole('button', { name: 'Thử Gửi Yêu Cầu Minh Họa' }).click();
  await expect(page.getByRole('status')).toContainText('Yêu cầu chưa được gửi hoặc lưu');
  await page.getByRole('button', { name: 'Quay lại biểu mẫu' }).click();
  await expect(page.getByLabel('Họ và Tên', { exact: true })).toHaveValue('Khách thử nghiệm');
  await expect(quantity).toHaveValue('2');
  expect(submissions).toEqual([]);
});
