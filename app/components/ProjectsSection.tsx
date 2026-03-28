"use client";

import { useEffect, useRef, useState, useCallback, CSSProperties } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Slide {
  id: number;
  image: string;
  thumbnail: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  content: string;
  accent: string;
}

interface GSAPInstance {
  set: (target: Element | Element[] | NodeList, vars: Record<string, unknown>) => void;
  to: (target: Element | Element[] | NodeList, vars: Record<string, unknown>) => void;
  killTweensOf: (target: Element) => void;
}

// Extend CSSProperties to allow CSS custom properties
type CSSWithVars = CSSProperties & Record<`--${string}`, string>;

// ─── Data ─────────────────────────────────────────────────────────────────────

const SLIDES: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=60",
    eyebrow: "LANDSCAPE",
    title: "The Silent\nSummits",
    subtitle: "Alpine Dreams Await",
    content: "Where jagged peaks pierce the clouds and silence becomes the loudest sound you'll ever hear. These ancient giants hold centuries of stories in every crevice.",
    accent: "#7FECB4",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&q=60",
    eyebrow: "OCEANSCAPE",
    title: "Depths\nUncharted",
    subtitle: "Below the Surface",
    content: "The ocean swallows the sky whole at the horizon. Waves are time made visible, each crest a heartbeat of the earth's oldest living system.",
    accent: "#7BCFFF",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&q=60",
    eyebrow: "WILDERNESS",
    title: "Forest\nCathedral",
    subtitle: "Light Through the Canopy",
    content: "Light fractures into gold as it descends through ancient timber. The forest breathes, and in that breath, every living thing is connected.",
    accent: "#B4F08C",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&q=60",
    eyebrow: "DESERT",
    title: "Dunes\nat Dusk",
    subtitle: "Sand & Shadow",
    content: "The desert is not empty — it is full of silence that speaks. Sand sculpted by wind into monuments that shift and breathe like living things.",
    accent: "#FFD07B",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=300&q=60",
    eyebrow: "AURORA",
    title: "Polar\nSymphony",
    subtitle: "Northern Lights Dance",
    content: "The sky tears open into ribbons of green and violet. The aurora is the universe reminding you it is vast and you are woven into it.",
    accent: "#C87BFF",
  },
];

const AUTO_DURATION = 5000;

// ─── Component ────────────────────────────────────────────────────────────────

export default function GSAPCarousel() {
  const [current, setCurrent] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [gsapLoaded, setGsapLoaded] = useState<boolean>(false);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gsapRef = useRef<GSAPInstance | null>(null);

  // ── Load GSAP from CDN ──────────────────────────────────────────────────────
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.onload = () => {
      gsapRef.current = (window as Window & { gsap: GSAPInstance }).gsap;
      setGsapLoaded(true);
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // ── Animate a slide in ─────────────────────────────────────────────────────
  const animateIn = useCallback((index: number, direction: 1 | -1 = 1): void => {
    const gsap = gsapRef.current;
    if (!gsap) return;
    const slide = slideRefs.current[index];
    const text = textRefs.current[index];
    if (!slide || !text) return;

    gsap.set(slide, { x: direction > 0 ? "100%" : "-100%", opacity: 1 });
    gsap.to(slide, { x: "0%", duration: 1.1, ease: "expo.inOut" });

    const img = slide.querySelector<HTMLImageElement>(".slide-img");
    if (img) {
      gsap.set(img, { x: direction > 0 ? "8%" : "-8%" });
      gsap.to(img, { x: "0%", duration: 1.4, ease: "expo.inOut" });
    }

    const children = text.querySelectorAll<HTMLElement>(".anim");
    gsap.set(children, { y: 40, opacity: 0 });
    gsap.to(children, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.1,
      delay: 0.45,
      ease: "power3.out",
    });
  }, []);

  // ── Animate a slide out ────────────────────────────────────────────────────
  const animateOut = useCallback((index: number, direction: 1 | -1 = 1): void => {
    const gsap = gsapRef.current;
    if (!gsap) return;
    const slide = slideRefs.current[index];
    if (!slide) return;

    gsap.to(slide, {
      x: direction > 0 ? "-100%" : "100%",
      duration: 1.1,
      ease: "expo.inOut",
      onComplete: () => gsap.set(slide, { x: "100%" }),
    });
  }, []);

  // ── Navigate to a slide ────────────────────────────────────────────────────
  const goTo = useCallback(
    (next: number, direction: 1 | -1 = 1): void => {
      if (isAnimating || next === current) return;
      setIsAnimating(true);
      const prev = current;
      setCurrent(next);

      setTimeout(() => {
        animateOut(prev, direction);
        animateIn(next, direction);
        setTimeout(() => setIsAnimating(false), 1200);
      }, 10);
    },
    [current, isAnimating, animateIn, animateOut]
  );

  // ── Initial entrance animation ─────────────────────────────────────────────
  useEffect(() => {
    if (!gsapLoaded) return;
    const gsap = gsapRef.current!;
    const slide = slideRefs.current[0];
    const text = textRefs.current[0];
    if (!slide || !text) return;

    gsap.set(slide, { x: "0%", opacity: 1 });

    const children = text.querySelectorAll<HTMLElement>(".anim");
    gsap.set(children, { y: 50, opacity: 0 });
    gsap.to(children, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.12,
      delay: 0.3,
      ease: "power3.out",
    });

    SLIDES.forEach((_, i) => {
      if (i !== 0) gsap.set(slideRefs.current[i]!, { x: "100%" });
    });
  }, [gsapLoaded]);

  // ── Auto-advance ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!gsapLoaded) return;
    timerRef.current = setInterval(() => {
      goTo((current + 1) % SLIDES.length, 1);
    }, AUTO_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gsapLoaded, current, goTo]);

  const activeSlide = SLIDES[current];

  // ── Nav button data ────────────────────────────────────────────────────────
  const navButtons: Array<{
    label: string;
    dir: 1 | -1;
    points: string;
    next: number;
  }> = [
    {
      label: "Previous",
      dir: -1,
      points: "15 18 9 12 15 6",
      next: (current - 1 + SLIDES.length) % SLIDES.length,
    },
    {
      label: "Next",
      dir: 1,
      points: "9 6 15 12 9 18",
      next: (current + 1) % SLIDES.length,
    },
  ];

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .carousel-root {
          width: 100%;
          height: 100vh;
          min-height: 600px;
          background: #0a0a0a;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* Parallax image — 108% size trick can't be done inline */
        .slide-img {
          width: 108%; height: 108%;
          position: absolute; top: -4%; left: -4%;
          object-fit: cover;
          filter: brightness(0.55);
          will-change: transform;
        }

        /* Grain overlay */
        .grain {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 256px;
          z-index: 2; pointer-events: none;
          opacity: 0.35; mix-blend-mode: overlay;
        }

        /* Vignette */
        .vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%);
          z-index: 3; pointer-events: none;
        }

        /* Left text gradient */
        .left-fade {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
          z-index: 3; pointer-events: none;
        }

        /* Eyebrow pseudo-element line */
        .eyebrow::before {
          content: '';
          display: inline-block;
          width: 28px; height: 1.5px;
          background: var(--accent);
          flex-shrink: 0;
        }

        /* Fluid clamp font sizes */
        .title-size   { font-size: clamp(52px, 6.5vw, 92px); }
        .sub-size     { font-size: clamp(16px, 1.6vw, 22px); }
        .content-size { font-size: clamp(13px, 1.1vw, 16px); }

        /* Active thumbnail ring uses CSS variable */
        .thumb-active { box-shadow: 0 0 0 2px var(--accent); }

        @media (max-width: 768px) {
          .text-panel  { width: 90% !important; padding-bottom: 120px; }
          .thumb-strip { right: 12px !important; bottom: 16px !important; gap: 7px !important; }
          .thumb-img   { width: 54px !important; height: 36px !important; }
          .nav-arrows  { bottom: 16px !important; }
          .counter     { top: 20px !important; right: 20px !important; }
        }
      `}</style>

      {/* ── Root ── */}
      <div
        className="carousel-root"
        style={{ "--accent": activeSlide.accent } as CSSWithVars}
      >
        {/* Grain */}
        <div className="grain" />

        {/* ── Slide track ── */}
        <div style={styles.track}>
          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => { slideRefs.current[i] = el; }}
              style={styles.slide}
            >
              <img className="slide-img" src={s.image} alt={s.title} loading="lazy" />
              <div className="vignette" />
              <div className="left-fade" />
            </div>
          ))}
        </div>

        {/* ── Text panels ── */}
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className="text-panel"
            ref={(el) => { textRefs.current[i] = el; }}
            style={{
              ...styles.textPanel,
              opacity: i === current ? 1 : 0,
              pointerEvents: i === current ? "auto" : "none",
              transition: "opacity 0.1s",
              "--accent": s.accent,
            } as CSSWithVars}
          >
            {/* Eyebrow */}
            <div
              className="eyebrow anim"
              style={{
                ...styles.eyebrow,
                color: "var(--accent)",
              }}
            >
              {s.eyebrow}
            </div>

            {/* Title */}
            <div className="title-size anim" style={styles.title}>
              {s.title}
            </div>

            {/* Subtitle */}
            <div className="sub-size anim" style={styles.subtitle}>
              {s.subtitle}
            </div>

            {/* Divider */}
            <div
              className="anim"
              style={{ ...styles.divider, background: "var(--accent)" }}
            />

            {/* Body copy */}
            <div className="content-size anim" style={styles.content}>
              {s.content}
            </div>
          </div>
        ))}

        {/* ── Slide counter ── */}
        <div className="counter" style={styles.counter}>
          <span style={styles.counterCurrent}>0{current + 1}</span>
          <span>/</span>
          <span>0{SLIDES.length}</span>
        </div>

        {/* ── Nav arrows ── */}
        <div className="nav-arrows" style={styles.navArrows}>
          {navButtons.map(({ label, dir, points, next }) => (
            <button
              key={label}
              aria-label={label}
              onClick={() => goTo(next, dir)}
              style={styles.arrowBtn}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.background = "rgba(255,255,255,0.15)";
                btn.style.borderColor = "rgba(255,255,255,0.5)";
                btn.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.background = "rgba(255,255,255,0.05)";
                btn.style.borderColor = "rgba(255,255,255,0.2)";
                btn.style.transform = "scale(1)";
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                style={{ width: 16, height: 16 }}
              >
                <polyline points={points} />
              </svg>
            </button>
          ))}
        </div>

        {/* ── Thumbnail strip ── */}
        <div className="thumb-strip" style={styles.thumbStrip}>
          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              className={i === current ? "thumb-active" : ""}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              title={s.title.replace("\n", " ")}
              style={{
                ...styles.thumbItem,
                opacity: i === current ? 1 : 0.45,
                "--accent": s.accent,
              } as CSSWithVars}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                if (i !== current)
                  (e.currentTarget as HTMLDivElement).style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                if (i !== current)
                  (e.currentTarget as HTMLDivElement).style.opacity = "0.45";
              }}
            >
              <img
                className="thumb-img"
                src={s.thumbnail}
                alt={s.title}
                loading="lazy"
                style={styles.thumbImg}
              />
              <span style={styles.thumbNumber}>0{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Static style objects ─────────────────────────────────────────────────────
// Anything that is fixed (no runtime CSS variable) lives here as a typed object.

const styles = {
  track: {
    position: "absolute",
    inset: 0,
  } satisfies CSSProperties,

  slide: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    transform: "translateX(100%)",
  } satisfies CSSProperties,

  textPanel: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "52%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 5% 0 6%",
    zIndex: 10,
  } satisfies CSSProperties,

  eyebrow: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    letterSpacing: "0.3em",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 12,
  } satisfies CSSProperties,

  title: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    lineHeight: 0.95,
    color: "#fff",
    whiteSpace: "pre-line",
    marginBottom: 20,
    letterSpacing: "-0.01em",
  } satisfies CSSProperties,

  subtitle: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic",
    fontWeight: 400,
    color: "rgba(255,255,255,0.55)",
    marginBottom: 24,
  } satisfies CSSProperties,

  divider: {
    width: 40,
    height: 1.5,
    borderRadius: 2,
    marginBottom: 22,
  } satisfies CSSProperties,

  content: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 300,
    color: "rgba(255,255,255,0.65)",
    lineHeight: 1.75,
    maxWidth: 420,
  } satisfies CSSProperties,

  counter: {
    position: "absolute",
    top: 44,
    right: 44,
    zIndex: 20,
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.15em",
  } satisfies CSSProperties,

  counterCurrent: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 28,
    color: "#fff",
    fontStyle: "italic",
    lineHeight: 1,
  } satisfies CSSProperties,

  navArrows: {
    position: "absolute",
    bottom: 40,
    left: "6%",
    zIndex: 20,
    display: "flex",
    gap: 12,
  } satisfies CSSProperties,

  arrowBtn: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "rgba(255,255,255,0.8)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s ease",
    backdropFilter: "blur(6px)",
  } satisfies CSSProperties,

  thumbStrip: {
    position: "absolute",
    bottom: 36,
    right: 36,
    zIndex: 20,
    display: "flex",
    gap: 10,
    alignItems: "flex-end",
  } satisfies CSSProperties,

  thumbItem: {
    position: "relative",
    cursor: "pointer",
    borderRadius: 6,
    overflow: "hidden",
    transition: "transform 0.3s ease, opacity 0.3s ease",
    flexShrink: 0,
  } satisfies CSSProperties,

  thumbImg: {
    width: 72,
    height: 48,
    objectFit: "cover",
    display: "block",
  } satisfies CSSProperties,

  thumbNumber: {
    position: "absolute",
    bottom: 5,
    left: 7,
    fontSize: 9,
    fontWeight: 500,
    color: "rgba(255,255,255,0.85)",
    letterSpacing: "0.1em",
  } satisfies CSSProperties,
} as const;
