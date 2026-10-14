import Link from "./Link.jsx";
import TopBar from "./TopBar.jsx";

export default function PageHeader({ title, cartCount, onCartClick }) {
  return (
    <header className="page-header">
      <TopBar cartCount={cartCount} onCartClick={onCartClick} />
      <div className="page-header-title">
        <div className="breadcrumb">
          <Link href="/">Нүүр</Link> <span>/</span> <span>{title}</span>
        </div>
        <h1>{title}</h1>
      </div>
    </header>
  );
}
