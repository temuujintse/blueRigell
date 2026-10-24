import { Icon } from "./Icons.jsx";
import Link from "./Link.jsx";

export default function SectionHeader({ title, linkHref, linkLabel }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {linkHref && (
        <Link className="all" href={linkHref}>
          {linkLabel} <Icon name="arrowRight" size={14} strokeWidth={2.2} />
        </Link>
      )}
    </div>
  );
}
