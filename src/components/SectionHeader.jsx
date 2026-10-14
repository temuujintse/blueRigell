import Link from "./Link.jsx";

export default function SectionHeader({ title, linkHref, linkLabel }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {linkHref && (
        <Link className="all" href={linkHref}>
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
