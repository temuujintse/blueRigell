import { useEffect, useState } from "react";
import { COMPANY, formatPhone } from "../data.js";
import SectionHeader from "./SectionHeader.jsx";

const EMPTY = { name: "", phone: "", qty: "", message: "" };

export default function Order({ cartSummary, onClearCart }) {
  const [form, setForm] = useState(EMPTY);

  // Сагсанд бараа нэмэгдэх бүрт "тоо хэмжээ" талбарыг автоматаар бөглөнө
  useEffect(() => {
    if (cartSummary) setForm((f) => ({ ...f, qty: cartSummary }));
  }, [cartSummary]);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const body = [
      `Нэр: ${name}`,
      `Утас: ${form.phone.trim()}`,
      `Тоо хэмжээ / хэмжээ: ${form.qty.trim() || "-"}`,
      `Нэмэлт мэдээлэл: ${form.message.trim() || "-"}`,
    ].join("\n");

    window.location.href =
      `mailto:${COMPANY.email}` +
      `?subject=${encodeURIComponent(`Захиалга - ${name}`)}` +
      `&body=${encodeURIComponent(body)}`;
  };

  const handleClearCart = () => {
    onClearCart();
    setForm((f) => ({ ...f, qty: "" }));
  };

  return (
    <section className="section" id="order">
      <SectionHeader title="Захиалга өгөх" />
      <div className="layout layout-order">
        <div className="card card-padded">
          <form onSubmit={handleSubmit}>
            <div className="form-row-2">
              <Field label="Нэр *" name="name" value={form.name} onChange={update} required />
              <Field label="Утасны дугаар *" name="phone" type="tel" value={form.phone} onChange={update} required />
            </div>

            <Field
              label="Захиалах тоо хэмжээ / хэмжээ"
              name="qty"
              value={form.qty}
              onChange={update}
              placeholder="Жишээ: 300×5×7см — 500 ширхэг"
              extra={
                cartSummary && (
                  <button type="button" className="link-btn" onClick={handleClearCart}>
                    Сагс цэвэрлэх
                  </button>
                )
              }
            />

            <div className="field">
              <label htmlFor="of-message">Нэмэлт мэдээлэл</label>
              <textarea
                id="of-message"
                name="message"
                rows={4}
                value={form.message}
                onChange={update}
                placeholder="Хэрэгцээ, хүргэх хаяг, хугацаа..."
              />
            </div>

            <button className="btn btn-full" type="submit">Захиалга илгээх</button>
            <p className="form-note">
              Товч дарахад таны имэйл клиент нээгдэж,{" "}
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> хаяг руу мэдээлэл бэлэн
              бичигдэнэ.
            </p>
          </form>
        </div>

        <div className="contact-list">
          {COMPANY.phones.map((p) => (
            <ContactCard key={p.number} href={`tel:${p.number}`} title={formatPhone(p.number)} sub={p.label} icon="☎" />
          ))}
          <ContactCard href={`mailto:${COMPANY.email}`} title={COMPANY.email} sub="И-мэйл" icon="✉" />
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", extra, ...rest }) {
  const id = `of-${name}`;
  return (
    <div className="field">
      <div className="field-label-row">
        <label htmlFor={id}>{label}</label>
        {extra}
      </div>
      <input id={id} name={name} type={type} {...rest} />
    </div>
  );
}

function ContactCard({ href, title, sub, icon }) {
  return (
    <a className="contact-card" href={href}>
      <span>
        <strong>{title}</strong>
        <span>{sub}</span>
      </span>
      <span className="contact-icon">{icon}</span>
    </a>
  );
}
