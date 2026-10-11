import { CATEGORIES, COMPANY, NAV_LINKS, formatPhone } from "../data.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact">
      <div className="footer-grid">
        <div>
          <h2>{COMPANY.name}</h2>
          <p>
            Байгаль орчинд ээлтэй, ногоон технологийн барилгын материал нийлүүлэгч. Хог хаягдлыг
            үнэ цэнэтэй болгоно.
          </p>
        </div>

        <div>
          <h3>Холбоос</h3>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>

        <div>
          <h3>Ангилал</h3>
          {CATEGORIES.slice(0, 4).map((c) => (
            <a key={c.title} href="#categories">{c.title}</a>
          ))}
        </div>

        <div>
          <h3>Холбоо барих</h3>
          <p>{COMPANY.phones.map((p) => formatPhone(p.number)).join(" · ")}</p>
          <p>{COMPANY.email}</p>
          <p>{COMPANY.address}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} Blue Rigel ХХК. Бүх эрх хуулиар хамгаалагдсан.</span>
        <span>{COMPANY.website}</span>
      </div>
    </footer>
  );
}
