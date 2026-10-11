export default function SectionHeader({ title, linkHref, linkLabel }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {linkHref && (
        <a className="all" href={linkHref}>
          {linkLabel}
        </a>
      )}
    </div>
  );
}
