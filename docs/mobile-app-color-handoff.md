# Like A Model — Mobile App Color Handoff

المصدر الحالي لتوكنز الهوية هو `:root` في
`src/styles/styles.css`، ويعرضها `src/styles/index.css` إلى Tailwind بأسماء
`lam-*`.

## الألوان الأساسية

| الدور | CSS token | القيمة |
|---|---|---|
| Primary | `--color-primary` | `#E0AEAF` |
| Primary hover (outline) | `--color-primary-hover` | `#F8E7E0` |
| Primary active (outline) | `--color-primary-active` | `#D99CA0` |
| Filled button hover | `--color-btn-primary-hover` | `#B97880` |
| Filled button active | `--color-btn-primary-active` | `#9E5F68` |
| Brown / strong text | `--color-brown` | `#44231A` |
| White | `--color-white` | `#FFFFFF` |
| Section white | `--section-white` | `#FFFCFA` |
| Section blush | `--section-blush` | `#FDF5F2` |
| Section cream | `--section-cream` | `#F9F1EB` |
| Danger | `--color-danger` | `#B3261E` |
| Success | `--color-success` | `#166534` |
| WhatsApp | `--color-whatsapp` | `#12833F` |

## ألوان محسوبة

| الدور | القيمة التقريبية |
|---|---|
| Primary border | `#F0D8D9` |
| Brand cream | `#FBF0EC` |
| Muted text | `#937F7A` |
| Subtle text | `#B0A39F` |
| Strong border | `#C0A5A4` |
| Neutral border | `#E1DCDA` |
| Placeholder | `#B4A7A3` |
| WhatsApp hover | `#0F6B34` |

## الحركة والشكل

| Token | القيمة |
|---|---|
| `--t-fast` | `180ms` |
| `--t-med` | `320ms` |
| `--t-slow` | `600ms` |
| `--t-btn` | `220ms` |
| `--ease` | `cubic-bezier(.22,.61,.36,1)` |
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` |
| `--r-sm` | `8px` |
| `--r-md` | `12px` |
| `--r-lg` | `16px` |
| `--r-xl` | `20px` |
| `--r-2xl` | `28px` |
| `--r-pill` | `999px` |

## ملاحظات التطبيق

- `#F8E7E0` هو hover للأسطح والأزرار الخارجية، وليس للزر الممتلئ.
- الزر الممتلئ يستخدم `#B97880` عند hover و`#9E5F68` عند الضغط.
- واتساب يبقى أخضر وظيفيًا ولا يتحول إلى لون الهوية.
- الخط العربي للعناوين هو El Messiri، وللنص IBM Plex Sans Arabic.
- نقاط التوقف المتوافقة مع الموقع: `560px`، `768px`، `900px`، `1080px`.