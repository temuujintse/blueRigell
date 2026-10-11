import { useCallback, useEffect, useRef, useState } from "react";
import { COMPANY, HERO_SLIDES, formatPhone } from "../data.js";

const INTERVAL = 5000;

export default function Hero({ cartCount, onCartClick }) {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);
  const total = HERO_SLIDES.length;
  const mainPhone = COMPANY.phones[0].number;

  const startTimer = useCallback(() => {
    clearInterval(timer.current);
    if (total < 2) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % total), INTERVAL);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timer.current);
  }, [startTimer]);

  const go = (i) => {
    setIndex((i + total) % total);
    startTimer(); // гараар солиход таймерыг дахин эхлүүлнэ
  };

  return (
    <header className="hero-full" id="hero">
      {HERO_SLIDES.map((src, i) => (
        <div key={src} className={`hero-slide-full${i === index ? " active" : ""}`}>
          <img src={src} alt="" />
        </div>
      ))}
      <div className="hero-full-scrim" />

      <div className="hero-topbar">
        <a href="#top" className="logo logo-light">
          <div className="logo-icon">🪵</div>
          <div>
            <h2>{COMPANY.name}</h2>
            <span>{COMPANY.tagline}</span>
          </div>
        </a>

        <div className="header-right">
          <div className="header-actions">
            <a className="action" href={`tel:${mainPhone}`}>
              <div className="action-icon">☎</div>
              <small>Залгах</small>
            </a>
            <a className="action" href="#contact">
              <div className="action-icon">✉</div>
              <small>Холбоо барих</small>
            </a>
            <button className="action" type="button" onClick={onCartClick}>
              <div className="action-icon">🛒</div>
              <small>Сагс</small>
              <span className="count">{cartCount}</span>
            </button>
          </div>

          <a className="header-phone" href={`tel:${mainPhone}`}>
            📞 <strong>{formatPhone(mainPhone)}</strong>
            <span>{COMPANY.hours}</span>
          </a>
        </div>
      </div>

      <div className="hero-full-content">
        <div className="tag">Цутгалтын хавтан</div>
        <h1>
          Дахин боловсруулсан
          <br />
          <span>мод, ган мэт бат бэх</span>
        </h1>
        <p>
          Хуучин модон хаягдлыг полимер бүрхүүлтэй хослуулсан Эко брусс — байгаль орчинд
          ээлтэй, 100–150 удаа дахин ашиглагдана.
        </p>
        <div className="hero-full-ctas">
          <a className="btn btn-light" href="#products">Бүтээгдэхүүн үзэх</a>
          <a className="btn-outline-light" href="#order">Захиалга өгөх</a>
        </div>
      </div>

      {total > 1 && (
        <>
          <button className="hero-arrow prev" type="button" aria-label="Өмнөх зураг" onClick={() => go(index - 1)}>
            ‹
          </button>
          <button className="hero-arrow next" type="button" aria-label="Дараах зураг" onClick={() => go(index + 1)}>
            ›
          </button>
          <div className="hero-dots">
            {HERO_SLIDES.map((src, i) => (
              <button
                key={src}
                type="button"
                className={i === index ? "active" : ""}
                aria-label={`${i + 1}-р зураг`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </>
      )}
    </header>
  );
}
