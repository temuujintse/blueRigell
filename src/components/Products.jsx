import { useState } from "react";
import { PRODUCTS } from "../data.js";
import Link from "./Link.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function Products({ onAdd }) {
  const [justAdded, setJustAdded] = useState(null);

  const handleAdd = (p) => {
    onAdd(p.id, p.cartName);
    setJustAdded(p.id);
    setTimeout(() => setJustAdded((cur) => (cur === p.id ? null : cur)), 1200);
  };

  return (
    <section className="section" id="products">
      <SectionHeader title="Бүтээгдэхүүн" linkHref="#product-detail" linkLabel="Дэлгэрэнгүй мэдээлэл →" />
      <div className="products">
        {PRODUCTS.map((p) => (
          <div className="product" key={p.id}>
            <div className="product-image">
              <img src={p.image} alt={p.title} loading="lazy" />
            </div>
            <div className="product-info">
              <h3>{p.title}</h3>
              <p className="desc">{p.desc}</p>
              <div className="price">{p.price}</div>

              {p.type === "cart" ? (
                <button className="add-cart" type="button" onClick={() => handleAdd(p)}>
                  {justAdded === p.id ? "✓ Нэмэгдлээ" : "🛒 Сагсанд нэмэх"}
                </button>
              ) : (
                <Link className="btn btn-block" href="/order">
                  {p.linkLabel}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
