import { useEffect, useRef, useState } from "react";
import { COMPANY, DISTRICTS, formatPhone } from "../data.js";
import { buildOrderText, makeOrderNumber, openOrderEmail } from "../order.js";
import { Icon } from "./Icons.jsx";

const EMPTY = {
  name: "",
  reach: "",
  delivery: "pickup",
  district: DISTRICTS[0],
  address: "",
  recipientPhone: "",
  vat: false,
  vatType: "organization",
  vatId: "",
};

// Утас (8 орон) эсвэл имэйл эсэхийг шалгана
const isReachValid = (v) => {
  const t = v.trim();
  if (t.includes("@")) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
  return t.replace(/[\s+-]/g, "").replace(/^976/, "").length >= 8 && /^[\d\s+-]+$/.test(t);
};

/**
 * ppm32-ийн "Хүсэлт илгээх" цонхтой ижил алхам:
 * холбоо барих мэдээлэл + хүлээн авах хэлбэр + e-Barimt → захиалгын хураангуй → илгээх → дугаар
 */
export default function QuoteModal({ product, details, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(null); // { orderNo, text }
  const [copied, setCopied] = useState("");
  const firstInput = useRef(null);

  // Esc дарахад хаах, арын хуудсыг гүйлгэхгүй
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstInput.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const set = (name) => (e) =>
    setForm((f) => ({ ...f, [name]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const reachError = touched && !isReachValid(form.reach);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isReachValid(form.reach)) return;

    const orderNo = makeOrderNumber();
    const text = buildOrderText({ orderNo, product, details, contact: form });
    setDone({ orderNo, text });
    openOrderEmail(orderNo, product, text);
  };

  const copy = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      /* clipboard хориглогдсон */
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
        <div className="modal-head">
          <h3 id="quote-modal-title">{done ? "Хүсэлт бэлэн боллоо" : "Хүсэлт илгээх"}</h3>
          <button type="button" className="modal-close" aria-label="Хаах" onClick={onClose}>
            ×
          </button>
        </div>

        {done ? (
          <div className="modal-body">
            <div className="success-icon"><Icon name="shield" size={30} /></div>

            <label className="label-sm">Захиалгын дугаар</label>
            <div className="order-no">
              <strong>{done.orderNo}</strong>
              <button type="button" onClick={() => copy(done.orderNo, "no")}>
                {copied === "no" ? "Хуулсан ✓" : "Хуулах"}
              </button>
            </div>

            <p className="modal-text">
              Таны имэйл програм нээгдэж, хүсэлт <strong>{COMPANY.email}</strong> хаяг руу бэлэн
              бичигдсэн. <strong>“Send / Илгээх”</strong> дарснаар хүсэлт бидэнд очно. Бид хамгийн
              оновчтой саналыг боловсруулан эргэн холбогдоно.
            </p>

            <div className="modal-fallback">
              <strong>Имэйл програм нээгдээгүй юу?</strong>
              <p>Хүсэлтийн текстийг хуулж Messenger, имэйлээр илгээх эсвэл шууд залгана уу.</p>
              <div className="modal-fallback-actions">
                <button type="button" className="btn btn-ghost" onClick={() => copy(done.text, "text")}>
                  {copied === "text" ? "Хуулсан ✓" : "Хүсэлтийг хуулах"}
                </button>
                <a className="btn" href={`tel:${COMPANY.phones[1].number}`}>
                  <Icon name="phone" size={16} /> {formatPhone(COMPANY.phones[1].number)}
                </a>
              </div>
            </div>

            <button type="button" className="btn btn-full btn-ghost" onClick={onClose}>
              Хаах
            </button>
          </div>
        ) : (
          <form className="modal-body" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="qm-name">Нэр / Компани <span className="opt">(сонголттой)</span></label>
              <input
                ref={firstInput}
                id="qm-name"
                value={form.name}
                onChange={set("name")}
                placeholder="Таны нэр эсвэл компанийн нэр"
              />
            </div>

            <div className="field">
              <label htmlFor="qm-reach">Утас эсвэл Имэйл *</label>
              <input
                id="qm-reach"
                value={form.reach}
                onChange={set("reach")}
                onBlur={() => form.reach && setTouched(true)}
                placeholder="9999 9999 эсвэл name@mail.com"
                aria-invalid={reachError}
                className={reachError ? "invalid" : undefined}
              />
              {reachError && <small className="field-error">Утасны дугаар (8 орон) эсвэл зөв имэйл оруулна уу</small>}
            </div>

            <div className="field">
              <span className="label">Хүлээн авах хэлбэр</span>
              <div className="seg">
                {[
                  ["pickup", "Оффисоос авах"],
                  ["delivery", "Хүргүүлэх"],
                ].map(([v, l]) => (
                  <label key={v} className={form.delivery === v ? "on" : undefined}>
                    <input type="radio" name="delivery" value={v} checked={form.delivery === v} onChange={set("delivery")} />
                    {l}
                  </label>
                ))}
              </div>
            </div>

            {form.delivery === "delivery" && (
              <div className="subbox">
                <div className="field">
                  <label htmlFor="qm-district">Дүүрэг</label>
                  <select id="qm-district" value={form.district} onChange={set("district")}>
                    {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="qm-address">Хүлээн авах хаяг</label>
                  <textarea id="qm-address" rows={2} value={form.address} onChange={set("address")} placeholder="Хороо, байр, барилгын талбай..." />
                </div>
                <div className="field">
                  <label htmlFor="qm-rphone">Хүлээн авагчийн утас</label>
                  <input id="qm-rphone" type="tel" value={form.recipientPhone} onChange={set("recipientPhone")} placeholder="8888 8888" />
                </div>
              </div>
            )}

            <label className="check">
              <input type="checkbox" checked={form.vat} onChange={set("vat")} />
              <span>e-Barimt авах (НӨАТ)</span>
            </label>

            {form.vat && (
              <div className="subbox">
                <div className="seg seg-sm">
                  {[
                    ["organization", "Байгууллага"],
                    ["individual", "Хувь хүн"],
                  ].map(([v, l]) => (
                    <label key={v} className={form.vatType === v ? "on" : undefined}>
                      <input type="radio" name="vatType" value={v} checked={form.vatType === v} onChange={set("vatType")} />
                      {l}
                    </label>
                  ))}
                </div>
                <div className="field">
                  <label htmlFor="qm-vat">{form.vatType === "organization" ? "Байгууллагын регистр" : "Регистрийн дугаар"}</label>
                  <input id="qm-vat" value={form.vatId} onChange={set("vatId")} placeholder={form.vatType === "organization" ? "1234567" : "УБ99112233"} />
                </div>
              </div>
            )}

            <div className="summary">
              <h4>Захиалгын дэлгэрэнгүй</h4>
              <div className="summary-row">
                <span>Бүтээгдэхүүн</span>
                <strong>{product}</strong>
              </div>
              {details.map((d) => (
                <div className="summary-row" key={d.label}>
                  <span>{d.label}</span>
                  <strong>{d.value}</strong>
                </div>
              ))}
            </div>

            <button className="btn btn-full" type="submit">Хүсэлт илгээх</button>
          </form>
        )}
      </div>
    </div>
  );
}
