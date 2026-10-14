import { navigate } from "../router.js";

// "/..." холбоосыг хуудас дахин ачаалалгүйгээр нээнэ. "#..." болон гадаад холбоос энгийн <a> шиг ажиллана.
export default function Link({ href, onClick, children, ...rest }) {
  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // шинэ tab-д нээхийг зөвшөөрнө
    if (!href?.startsWith("/")) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
