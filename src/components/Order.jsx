import { useState } from "react";
import { COMPANY, PRODUCTS, formatPhone } from "../data.js";
import { Icon } from "./Icons.jsx";
import Link from "./Link.jsx";
import QuoteModal from "./QuoteModal.jsx";

// "Үнийн санал авах" хуудас (ppm32.mn/quote.html шиг): бүтээгдэхүүн сонгоод дэлгэрэнгүй маягт руу орно
export default function Order() {
  const [general, setGeneral] = useState(null); // ерөнхий хүсэлтийн тэмдэглэл
  const [notes, setNotes] = useState("");

  return (
    <>
      <section className="section">
        <p className="lead lead-narrow">
          Бүтээгдэхүүнээ сонгож, хэмжээ, тоо ширхэгээ оруулаад хүсэлт илгээнэ үү. Бид мэдээллийг
          хүлээн авч, хамгийн оновчтой саналыг боловсруулан богино хугацаанд эргэн холбогдоно.
        </p>

        <div className="quote-grid">
          {PRODUCTS.map((p) => (
            <Link className="quote-card" href={`/products/${p.id}`} key={p.id}>
              <div className="quote-media">
                <img src={p.image} alt="" loading="lazy" />
              </div>
              <div className="quote-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="btn btn-sm">
                  Үнийн санал <Icon name="arrowRight" size={14} strokeWidth={2.2} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section layout layout-order">
        <div className="card card-padded">
          <h3 className="card-title">Тохирох бүтээгдэхүүн олдсонгүй юу?</h3>
          <p className="lead">Хэрэгцээгээ товч бичээд ерөнхий хүсэлт илгээгээрэй.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setGeneral([{ label: "Хүсэлт", value: notes.trim() }]);
            }}
          >
            <div className="field">
              <label htmlFor="gq-notes">Таны хүсэлт *</label>
              <textarea
                id="gq-notes"
                rows={4}
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Жишээ: 400×5×7 см хэмжээтэй 800 ширхэг, Хан-Уул дүүрэгт хүргүүлэх..."
              />
            </div>
            <button className="btn btn-full" type="submit">Хүсэлт илгээх</button>
          </form>
        </div>

        <div className="contact-list">
          {COMPANY.phones.map((p) => (
            <ContactCard key={p.number} href={`tel:${p.number}`} title={formatPhone(p.number)} sub={p.label} icon="phone" />
          ))}
          <ContactCard href={`mailto:${COMPANY.email}`} title={COMPANY.email} sub="И-мэйл" icon="mail" />
        </div>
      </section>

      {general && (
        <QuoteModal product="Ерөнхий хүсэлт" details={general} onClose={() => setGeneral(null)} />
      )}
    </>
  );
}

function ContactCard({ href, title, sub, icon }) {
  return (
    <a className="contact-card" href={href}>
      <span>
        <strong>{title}</strong>
        <span>{sub}</span>
      </span>
      <span className="contact-icon"><Icon name={icon} size={20} /></span>
    </a>
  );
}
