import { CATEGORIES, COMPANY, NAV_LINKS, formatPhone } from "../data.js";
import Link from "./Link.jsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact">
      <div className="container">
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
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h3>Ангилал</h3>
            {CATEGORIES.slice(0, 4).map((c) => (
              <Link key={c.title} href="/products">
                {c.title}
              </Link>
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
      </div>
    </footer>
  );
}
