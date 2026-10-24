import { useState } from "react";
import { SPECS } from "../data.js";
import { Icon } from "./Icons.jsx";
import Link from "./Link.jsx";
import QuoteModal from "./QuoteModal.jsx";

const today = () => new Date().toISOString().slice(0, 10);

function initialValues(options) {
  const v = { date: "", notes: "" };
  options.forEach((o) => {
    if (o.type === "select") v[o.name] = o.choices[0];
    else if (o.type === "check") v[o.name] = false;
    else if (o.type === "size") v[o.name] = { l: "", w: "", h: "" };
    else v[o.name] = "";
  });
  return v;
}

// Сонгосон утгуудыг хураангуй мөр болгоно ({label, value})
function toDetails(options, values) {
  const rows = options.map((o) => {
    const v = values[o.name];
    if (o.type === "check") return { label: o.label, value: v ? "Тийм" : "Үгүй" };
    if (o.type === "size") return { label: o.label, value: `${v.l} × ${v.w} × ${v.h} см` };
    if (o.type === "number") return { label: o.label, value: `${Number(v).toLocaleString("mn-MN")} ${o.unit ?? ""}`.trim() };
    return { label: o.label, value: v };
  });
  if (values.date) rows.push({ label: "Хүлээн авах хугацаа", value: values.date });
  if (values.notes.trim()) rows.push({ label: "Тэмдэглэл", value: values.notes.trim() });
  return rows;
}

export default function ProductPage({ product }) {
  const [active, setActive] = useState(0);
  const [values, setValues] = useState(() => initialValues(product.options));
  const [details, setDetails] = useState(null); // null бол цонх хаалттай

  const setValue = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault(); // required талбаруудыг browser өөрөө шалгасны дараа энд орно
    setDetails(toDetails(product.options, values));
  };

  return (
    <section className="pd">
      <div className="pd-gallery">
        <div className="pd-main">
          <img src={product.images[active]} alt={product.title} />
        </div>
        <div className="pd-thumbs">
          {product.images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={i === active ? "active" : undefined}
              onClick={() => setActive(i)}
              aria-label={`${i + 1}-р зураг`}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      </div>

      <div className="pd-desc">
        <h4>Дэлгэрэнгүй</h4>
        <p>{product.longDesc}</p>
        {product.id !== "accessories" && (
          <div className="spec-list">
            {SPECS.map(([label, value]) => (
              <div className="spec-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pd-form-card">
        <h2>{product.title}</h2>
        <p className="pd-price">{product.price}</p>

        <form className="pd-form" onSubmit={handleSubmit}>
          {product.options.map((o) => (
            <OptionField key={o.name} option={o} value={values[o.name]} onChange={(v) => setValue(o.name, v)} />
          ))}

          <div className="field">
            <label htmlFor="pd-date">Хүлээн авах хугацаа</label>
            <input id="pd-date" type="date" min={today()} value={values.date} onChange={(e) => setValue("date", e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="pd-notes">Тэмдэглэл</label>
            <textarea
              id="pd-notes"
              rows={3}
              value={values.notes}
              onChange={(e) => setValue("notes", e.target.value)}
              placeholder="Нэмэлт шаардлага, төслийн мэдээлэл..."
            />
          </div>

          <button className="btn btn-full" type="submit">
            Хүсэлт илгээх <Icon name="arrowRight" size={16} strokeWidth={2.2} />
          </button>
          <p className="form-note">
            Үнэ төлбөргүй үнийн санал. Хүсэлтийг хүлээн авч, богино хугацаанд эргэн холбогдоно.{" "}
            <Link href="/order">Бусад бүтээгдэхүүн</Link>
          </p>
        </form>
      </div>

      {details && <QuoteModal product={product.title} details={details} onClose={() => setDetails(null)} />}
    </section>
  );
}

function OptionField({ option: o, value, onChange }) {
  const id = `pd-${o.name}`;

  if (o.type === "check") {
    return (
      <label className="check">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        <span>{o.label}</span>
      </label>
    );
  }

  if (o.type === "select") {
    return (
      <div className="field">
        <label htmlFor={id}>{o.label}</label>
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
          {o.choices.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
    );
  }

  if (o.type === "size") {
    const part = (k, ph) => (
      <input
        type="number"
        min="1"
        step="any"
        inputMode="decimal"
        required={o.required}
        placeholder={ph}
        aria-label={ph}
        value={value[k]}
        onChange={(e) => onChange({ ...value, [k]: e.target.value })}
      />
    );
    return (
      <div className="field">
        <span className="label">{o.label}{o.required && " *"}</span>
        <div className="size-inputs">
          {part("l", "Урт")}<span>×</span>{part("w", "Өргөн")}<span>×</span>{part("h", "Зузаан")}
        </div>
      </div>
    );
  }

  // number + хурдан сонголтын товчнууд
  return (
    <div className="field">
      <label htmlFor={id}>{o.label}{o.required && " *"}</label>
      <div className="qty-input">
        <input
          id={id}
          type="number"
          min="1"
          inputMode="numeric"
          required={o.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Тоо оруулна уу"
        />
        {o.unit && <span>{o.unit}</span>}
      </div>
      {o.presets && (
        <div className="chips">
          {o.presets.map((n) => (
            <button
              key={n}
              type="button"
              className={String(n) === String(value) ? "on" : undefined}
              onClick={() => onChange(String(n))}
            >
              {n.toLocaleString("mn-MN")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
