import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_SLIDES } from "../data.js";
import { Icon } from "./Icons.jsx";
import Link from "./Link.jsx";

const INTERVAL = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);
  const total = HERO_SLIDES.length;

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
    <section className="hero" id="hero" aria-roledescription="carousel">
      {HERO_SLIDES.map((s, i) => (
        <div key={s.image} className={`hero-slide${i === index ? " active" : ""}`} aria-hidden={i !== index}>
          <img className="hero-img" src={s.image} alt="" />
          <div className="hero-content">
            <span className="tag">{s.tag}</span>
            <h1>
              {s.title}
              <br />
              <span>{s.accent}</span>
            </h1>
            <p>{s.text}</p>
            <Link className="btn" href={s.cta.href} tabIndex={i === index ? 0 : -1}>
              {s.cta.label} <Icon name="arrowRight" size={16} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      ))}

      {total > 1 && (
        <>
          <div className="hero-arrows">
            <button type="button" aria-label="Өмнөх" onClick={() => go(index - 1)}>
              <Icon name="chevronLeft" size={18} strokeWidth={2.2} />
            </button>
            <button type="button" aria-label="Дараах" onClick={() => go(index + 1)}>
              <Icon name="chevronRight" size={18} strokeWidth={2.2} />
            </button>
          </div>
          <div className="hero-dots">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.image}
                type="button"
                className={i === index ? "active" : ""}
                aria-label={`${i + 1}-р слайд`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
