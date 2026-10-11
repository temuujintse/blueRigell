import { CATEGORIES } from "../data.js";
import SectionHeader from "./SectionHeader.jsx";

export default function Categories() {
  return (
    <section className="section" id="categories">
      <SectionHeader title="Онцлох ангилал" linkHref="#products" linkLabel="Бүх бүтээгдэхүүн →" />
      <div className="category-grid">
        {CATEGORIES.map((c) => (
          <a className="category-card" href={c.href} key={c.title}>
            <img src={c.image} alt={c.title} loading="lazy" />
            <h3>
              {c.title} <span className="round-arrow">›</span>
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}
