import { PRODUCT_IMAGE, SPECS } from "../data.js";
import SectionHeader from "./SectionHeader.jsx";

export default function ProductDetail() {
  return (
    <section className="section" id="product-detail">
      <SectionHeader title="Эко бруссын үзүүлэлт" />
      <div className="layout layout-half">
        <div className="card">
          <img className="img-fluid" src={PRODUCT_IMAGE} alt="Эко брусс хөндлөн огтлол" />
          <p className="caption">Гадна полимер бүрхүүл · дотор дахин боловсруулсан модон цөм</p>
        </div>
        <div>
          <p className="lead">
            Барилгын талбайн хуучин модон хаягдлыг цөм болгож, гадна талыг өндөр молекультай
            супер бат бэх полимер материалаар бүрхсэн шинэ төрлийн барилгын мод. Цутгалтын хийц,
            гүүр, худаг, инженерийн байгууламжийн түр хийцэд өргөн ашиглагдана.
          </p>
          <div className="spec-list">
            {SPECS.map(([label, value]) => (
              <div className="spec-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
