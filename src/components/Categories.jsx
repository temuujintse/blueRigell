import { CATEGORIES } from "../data.js";
import Link from "./Link.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function Categories() {
  return (
    <section className="section" id="categories">
      <SectionHeader title="Онцлох ангилал" linkHref="/products" linkLabel="Бүх бүтээгдэхүүн →" />
      <div className="category-grid">
        {CATEGORIES.map((c) => (
          <Link className="category-card" href={c.href} key={c.title}>
            <img src={c.image} alt={c.title} loading="lazy" />
            <h3>
              {c.title} <span className="round-arrow">›</span>
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
