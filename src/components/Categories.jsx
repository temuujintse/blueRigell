import { CATEGORIES } from "../data.js";
import { Icon } from "./Icons.jsx";
import Link from "./Link.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function Categories() {
  return (
    <section className="section" id="categories">
      <SectionHeader title="Онцлох ангилал" linkHref="/products" linkLabel="Бүх ангилал" />
      <div className="category-grid">
        {CATEGORIES.map((c) => (
          <Link className="category-card" href={c.href} key={c.title}>
            <div className="category-media">
              {c.image ? (
                <img src={c.image} alt="" loading="lazy" />
              ) : (
                <Icon name={c.icon} size={56} strokeWidth={1.3} />
              )}
            </div>
            <div className="category-foot">
              <h3>{c.title}</h3>
              <span className="round-arrow"><Icon name="chevronRight" size={14} strokeWidth={2.6} /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
