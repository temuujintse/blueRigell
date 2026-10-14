import { useEffect, useState } from "react";

// Жижиг client-side router (нэмэлт сан шаардлагагүй).
// Хуудсууд: "/" (нүүр), "/products", "/order"

const listeners = new Set();

const currentPath = () => window.location.pathname.replace(/\/+$/, "") || "/";

export function scrollToHash(hash) {
  if (!hash) return;
  document
    .getElementById(decodeURIComponent(hash.slice(1)))
    ?.scrollIntoView({ behavior: "smooth" });
}

export function navigate(to) {
  const url = new URL(to, window.location.origin);
  const same =
    url.pathname === window.location.pathname && url.hash === window.location.hash;

  if (same) {
    if (url.hash) scrollToHash(url.hash);
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  window.history.pushState({}, "", url.pathname + url.hash);
  listeners.forEach((l) => l());
}

export function useLocation() {
  const [loc, setLoc] = useState(() => ({
    path: currentPath(),
    hash: window.location.hash,
  }));

  useEffect(() => {
    const update = () => setLoc({ path: currentPath(), hash: window.location.hash });
    listeners.add(update);
    window.addEventListener("popstate", update);
    return () => {
      listeners.delete(update);
      window.removeEventListener("popstate", update);
    };
  }, []);

  return loc;
}
