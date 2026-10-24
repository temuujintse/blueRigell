import Link from "./Link.jsx";

// Дэд хуудасны гарчгийн зурвас (header-ийн доор)
// crumbs: [{ label, href }] — нүүр ба одоогийн хуудасны хоорондох холбоосууд
export default function PageHeader({ title, crumbs = [] }) {
  return (
    <div className="page-title">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Нүүр</Link>
          {crumbs.map((c) => (
            <span key={c.href}>
              {" "}<span>/</span> <Link href={c.href}>{c.label}</Link>
            </span>
          ))}{" "}
          <span>/</span> <span>{title}</span>
        </div>
        <h1>{title}</h1>
      </div>
    </div>
  );
}
