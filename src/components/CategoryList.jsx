import { CATEGORIES } from "../data.js";
import { Icon } from "./Icons.jsx";
import Link from "./Link.jsx";

// Зүүн талын ангиллын жагсаалт (нүүрэнд байнга, бусад хуудсанд dropdown)
export default function CategoryList({ className = "" }) {
  return (
    <ul className={`cat-list ${className}`}>
      {CATEGORIES.map((c) => (
        <li key={c.title}>
          <Link href={c.href}>
            <Icon name={c.icon} size={18} />
            <span>{c.title}</span>
            <Icon name="chevronRight" size={14} className="cat-list-end" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
