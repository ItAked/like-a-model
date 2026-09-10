# Like A Model

موقع عربي RTL مبني بـ React 19 وVite وTailwind CSS 4.

## المتطلبات

- Node.js 22
- npm
- Docker وDocker Compose (اختياري)

## التشغيل المحلي

```bash
cp .env.example .env
npm ci
npm run dev
```

أو عبر Docker:

```bash
docker compose -f docker-compose-local.yaml up --build
```

الموقع المحلي يعمل افتراضيًا على `http://localhost:3007`.

## متغيرات البيئة

```env
VITE_API_BASE_URL=http://localhost:8014
APP_PORT=3005
LOCAL_APP_PORT=3007
```

`VITE_API_BASE_URL` قيمة عامة تُضمّن وقت البناء؛ لا تضع فيها أسرارًا.

## أوامر المشروع

```bash
npm run dev
npm run build
npm run preview
```

## بنية المشروع

- `src/components/`: مكونات الواجهة.
- `src/pages/`: صفحات React Router.
- `src/styles/index.css`: مدخل Tailwind والثيم.
- `src/styles/styles.css`: الأساس العام وتأثيرات الحركة والحالات فقط.
- `src/styles/soft-halo-cursor.css`: تأثير المؤشر المخصص.
- `public/assets/`: الصور والملفات العامة المستخدمة وقت التشغيل.
- `src/effects/boot.js`: حالات وتأثيرات التمرير المعتمدة على DOM.

## بناء وتشغيل الإنتاج

```bash
docker compose up -d --build
curl http://localhost:${APP_PORT:-3005}/healthz
```

صورة الإنتاج تستخدم Nginx وتدعم fallback لمسارات React Router.

## النشر

- CI يبني المشروع على كل push وpull request إلى `main`.
- Workflow النشر يحدّث GitHub Pages وينشر صورة
  `ghcr.io/itaked/like-a-model:latest`.
- عرّف Repository Variable باسم `VITE_API_BASE_URL` في GitHub Actions.

للنشر من Git على السيرفر:

```bash
git pull --ff-only origin main
docker compose up -d --build --remove-orphans
docker compose ps
```