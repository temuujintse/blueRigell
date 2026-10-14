import { COMPANY, formatPhone } from "../data.js";
import Link from "./Link.jsx";
import { CartIcon, MailIcon, PhoneIcon } from "./Icons.jsx";

export default function TopBar({ cartCount, onCartClick }) {
  const mainPhone = COMPANY.phones[0].number;

  return (
    <div className="hero-topbar">
      <Link href="/" className="logo logo-light">
        <div className="logo-icon">🪵</div>
        <div>
          <h2>{COMPANY.name}</h2>
          <span>{COMPANY.tagline}</span>
        </div>
      </Link>

      <div className="header-right">
        <div className="header-actions">
          <a className="action" href={`tel:${mainPhone}`}>
            <div className="action-icon"><PhoneIcon /></div>
            <small>Залгах</small>
          </a>
          <a className="action" href="#contact">
            <div className="action-icon"><MailIcon /></div>
            <small>Холбоо барих</small>
          </a>
          <button className="action" type="button" onClick={onCartClick}>
            <div className="action-icon"><CartIcon /></div>
            <small>Сагс</small>
            <span className="count">{cartCount}</span>
          </button>
        </div>

        <a className="header-phone" href={`tel:${mainPhone}`}>
          <PhoneIcon width={14} height={14} className="header-phone-icon" /> <strong>{formatPhone(mainPhone)}</strong>
          <span>{COMPANY.hours}</span>
        </a>
      </div>
    </div>
  );
}
