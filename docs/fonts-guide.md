# راهنمای اضافه کردن فونت فارسی

## مرحله ۱ — فایل فونت‌ها

فایل‌های `.woff2` یا `.woff` فونت‌ها رو توی پوشه `src/assets/fonts/` قرار بده:

```
src/assets/fonts/
├── Vazirmatn-Regular.woff2
├── Vazirmatn-Bold.woff2
├── IRANYekan-Regular.woff2
└── IRANYekan-Bold.woff2
```

## مرحله ۲ — تعریف فونت‌ها با `next/font/local`

توی `layout.tsx` (یا هر layout دلخواه):

```typescript
import localFont from "next/font/local";

// فونت برای سایت اصلی
const vazirmatn = localFont({
  src: [
    { path: "../assets/fonts/Vazirmatn-Regular.woff2", weight: "400" },
    { path: "../assets/fonts/Vazirmatn-Bold.woff2", weight: "700" },
  ],
  variable: "--font-vazirmatn",
});

// فونت برای پنل ادمین
const iranYekan = localFont({
  src: [
    { path: "../assets/fonts/IRANYekan-Regular.woff2", weight: "400" },
    { path: "../assets/fonts/IRANYekan-Bold.woff2", weight: "700" },
  ],
  variable: "--font-iran-yekan",
});
```

## مرحله ۳ — اضافه کردن CSS variable به body

```tsx
<body className={`${vazirmatn.variable} ${iranYekan.variable}`}>
```

## مرحله ۴ — تعریف توکن Tailwind

توی `globals.css` داخل بلاک `@theme inline`:

```css
@theme inline {
  --font-vazirmatn: var(--font-vazirmatn);
  --font-iran-yekan: var(--font-iran-yekan);
}
```

## مرحله ۵ — استفاده با Tailwind

```tsx
// صفحات سایت
<div className="font-vazirmatn">محتوای سایت</div>

// صفحات پنل ادمین
<div className="font-iran-yekan">محتوای پنل</div>
```

## روش پیشنهادی — جداسازی فونت با Route Group

اگر کل پنل باید فونت متفاوتی داشته باشه، از ساختار route group استفاده کن:

```
src/app/
├── (site)/              ← layout با فونت vazirmatn
│   ├── layout.tsx
│   └── page.tsx
├── (panel)/             ← layout با فونت iranYekan
│   ├── layout.tsx
│   └── page.tsx
└── layout.tsx           ← root layout
```

هر بخش layout مخصوص خودش رو داره و فونت رو فقط یکبار روی layout تنظیم میکنی، بدون نیاز به زدن کلاس روی هر المان.

مثلاً `(panel)/layout.tsx`:

```tsx
import localFont from "next/font/local";

const iranYekan = localFont({
  src: [
    { path: "../../assets/fonts/IRANYekan-Regular.woff2", weight: "400" },
    { path: "../../assets/fonts/IRANYekan-Bold.woff2", weight: "700" },
  ],
});

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={iranYekan.className}>{children}</div>;
}
```

با این کار فونت `IRANYekan` روی **تمام صفحات زیرمجموعه پنل** اعمال میشه بدون اینکه نیاز باشه هر صفحه جداگانه کلاس بگیره. هر صفحه‌ای که داخل `(panel)/` ساخته بشه، خودکار از این layout و فونت ارث‌بری میکنه.

---

## روش جایگزین — فونت از پوشه `public/`

اگه فونت‌ها رو توی `public/fonts/` گذاشتی، از `next/font/local` نمیشه استفاده کرد. در عوض مستقیم با `@font-face` توی CSS تعریف کن.

ساختار فایل‌ها:

```
public/
└── fonts/
    ├── Vazirmatn-Regular.woff2
    ├── Vazirmatn-Bold.woff2
    ├── IRANYekan-Regular.woff2
    └── IRANYekan-Bold.woff2
```

توی `globals.css`:

```css
@font-face {
  font-family: "Vazirmatn";
  src: url("/fonts/Vazirmatn-Regular.woff2") format("woff2");
  font-weight: 400;
}

@font-face {
  font-family: "Vazirmatn";
  src: url("/fonts/Vazirmatn-Bold.woff2") format("woff2");
  font-weight: 700;
}

@font-face {
  font-family: "IRANYekan";
  src: url("/fonts/IRANYekan-Regular.woff2") format("woff2");
  font-weight: 400;
}

@font-face {
  font-family: "IRANYekan";
  src: url("/fonts/IRANYekan-Bold.woff2") format("woff2");
  font-weight: 700;
}
```

بعد توی `@theme inline` توکن Tailwind رو تعریف کن:

```css
@theme inline {
  --font-vazirmatn: "Vazirmatn", sans-serif;
  --font-iran-yekan: "IRANYekan", sans-serif;
}
```

استفاده مثل قبل:

```tsx
<div className="font-vazirmatn">متن سایت</div>
<div className="font-iran-yekan">متن پنل</div>
```

> **نکته:** روش `next/font/local` (از داخل `src/assets/fonts/`) بهتره چون Next.js خودش فونت رو optimize میکنه (self-host، preload، حذف layout shift). روش `public/` این بهینه‌سازی‌ها رو نداره.
