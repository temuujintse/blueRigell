# BlueRigel

Blue Rigel — Эко брусс цутгалтын хавтангийн танилцуулга вэб (React + Vite).

## Ажиллуулах

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ хавтаст production хувилбар гарна
npm run preview  # build-ийг локалаар шалгах
```

## Бүтэц

- `src/data.js` — бүх текст, утас, бүтээгдэхүүн, үзүүлэлт (контентоо эндээс засна)
- `src/components/` — хэсэг тус бүрийн компонент (Hero, Products, Order, ...)
- `src/hooks/useCart.js` — сагс (localStorage-д хадгална)
- `src/styles.css` — бүх загвар
- `src/assets/` — зургууд
- `legacy/index.html` — React-аас өмнөх анхны HTML хувилбар
