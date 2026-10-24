import { PRODUCTS } from "../data.js";
import { Icon } from "./Icons.jsx";
import Link from "./Link.jsx";
import SectionHeader from "./SectionHeader.jsx";

const matches = (p, q) =>
  `${p.title} ${p.desc}`.toLowerCase().includes(q.toLowerCase());

export default function Products({
  query = "",
  title = "Бүтээгдэхүүн",
  linkHref = "#product-detail",
  linkLabel = "Дэлгэрэнгүй мэдээлэл",
}) {
  const q = query.trim();
  const list = q ? PRODUCTS.filter((p) => matches(p, q)) : PRODUCTS;

  return (
    <section className="section" id="products">
      <SectionHeader title={title} linkHref={linkHref} linkLabel={linkLabel} />

      {q && (
        <p className="search-note">
          “{q}” хайлтаар {list.length} бүтээгдэхүүн олдлоо.{" "}
          <Link href="/products">Хайлт цэвэрлэх</Link>
        </p>
      )}

      {list.length === 0 ? (
        <div className="empty">
          Тохирох бүтээгдэхүүн олдсонгүй. <Link href="/order">Ерөнхий хүсэлт илгээж</Link> лавлана уу.
        </div>
      ) : (
        <div className="products">
          {list.map((p) => (
            <Link className="product" href={`/products/${p.id}`} key={p.id}>
              <div className="product-image">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="product-info">
                <h3>{p.title}</h3>
                <p className="desc">{p.desc}</p>
                <div className="product-bottom">
                  <div className="price">{p.price}</div>
                  <span className="quote-btn">
                    Үнийн санал <Icon name="arrowRight" size={14} strokeWidth={2.2} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
