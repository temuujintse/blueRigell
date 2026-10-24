import { useEffect, useRef, useState } from "react";
import { COMPANY, NAV_LINKS, formatPhone } from "../data.js";
import { navigate } from "../router.js";
import CategoryList from "./CategoryList.jsx";
import { Icon } from "./Icons.jsx";
import Link from "./Link.jsx";

// path: одоогийн хуудас (идэвхтэй цэсийг тодруулахад)
// home: нүүр хуудсанд (том дэлгэц) ангиллын жагсаалт hero-гийн хажууд үргэлж харагдана
export default function Header({ path, query = "", home = false }) {
  const mainPhone = COMPANY.phones[0].number;
  const [term, setTerm] = useState(query);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => setTerm(query), [query]);
  useEffect(() => setMenuOpen(false), [path]);

  // Dropdown-оос гадна дарахад хаана
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => !menuRef.current?.contains(e.target) && setMenuOpen(false);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [menuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = term.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <header className="site-header">
      <div className="container header-main">
        <Link href="/" className="logo">
          <span className="logo-icon"><Icon name="house" size={34} strokeWidth={1.7} /></span>
          <span>
            <strong>{COMPANY.name}</strong>
            <small>{COMPANY.tagline}</small>
          </span>
        </Link>

        <form className="search" role="search" onSubmit={handleSearch}>
          <Icon name="search" size={18} className="search-icon" />
          <input
            type="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Бүтээгдэхүүн хайх..."
            aria-label="Бүтээгдэхүүн хайх"
          />
          <button type="submit" aria-label="Хайх">
            <Icon name="search" size={18} strokeWidth={2.2} />
          </button>
        </form>

        <div className="header-actions">
          <a className="action" href={`tel:${mainPhone}`}>
            <Icon name="phone" />
            <small>Залгах</small>
          </a>
          <a className="action" href="#contact">
            <Icon name="mail" />
            <small>Холбоо барих</small>
          </a>
          <Link className="btn header-cta" href="/order">
            Үнийн санал авах
          </Link>
        </div>
      </div>

      <div className="container header-nav">
        <div className={`cat-menu${home ? " is-home" : ""}`} ref={menuRef}>
          <button
            className="cat-toggle"
            type="button"
            aria-expanded={menuOpen}
            onClick={() =>
              // Нүүрний том дэлгэцэнд жагсаалт аль хэдийн харагдаж байгаа тул бүтээгдэхүүн рүү шилжинэ
              home && window.matchMedia("(min-width: 901px)").matches
                ? navigate("/products")
                : setMenuOpen((o) => !o)
            }
          >
            <Icon name="menu" size={18} strokeWidth={2} />
            <span>Бүх ангилал</span>
            <Icon name={home ? "chevronRight" : "chevronDown"} size={16} strokeWidth={2} className="cat-toggle-end" />
          </button>
          {menuOpen && <CategoryList className="cat-dropdown" />}
        </div>

        <nav className="main-nav" aria-label="Үндсэн цэс">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={l.href === path || (l.href === "/products" && path.startsWith("/products/")) ? "active" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>

        <a className="nav-phone" href={`tel:${mainPhone}`}>
          <Icon name="phone" size={22} />
          <span>
            <strong>{formatPhone(mainPhone)}</strong>
            <small>{COMPANY.hours}</small>
          </span>
        </a>
      </div>
    </header>
  );
}
