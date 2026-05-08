"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HomeScrollAnimations() {
  useLayoutEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches) {
      return;
    }

    document.documentElement.classList.add("has-home-scroll-animations");

    const ctx = gsap.context(() => {
      const hero = document.querySelector<HTMLElement>("[data-home-hero]");
      const progressBar = document.querySelector<HTMLElement>("[data-home-progress-bar]");

      // ── Scroll progress bar ─────────────────────────────────────────────
      if (progressBar) {
        gsap.fromTo(
          progressBar,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.2,
            },
          },
        );
      }

      // ── SVG hero network ────────────────────────────────────────────────
      const heroPolylines = document.querySelectorAll<SVGPolylineElement>(
        ".home-hero-connections polyline",
      );
      const heroNodes = document.querySelectorAll<SVGCircleElement>(
        ".home-hero-nodes circle",
      );
      const heroPolygons = document.querySelectorAll<SVGPolygonElement>(
        ".home-hero-polygons polygon",
      );

      heroPolylines.forEach((line, i) => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.9,
          ease: "power2.inOut",
          delay: 0.2 + i * 0.14,
        });
      });

      gsap.set(heroNodes, { scale: 0, transformOrigin: "50% 50%" });
      gsap.to(heroNodes, {
        scale: 1,
        duration: 0.55,
        ease: "back.out(2.4)",
        stagger: { each: 0.05, from: "random" },
        delay: 0.7,
        onComplete() {
          gsap.to(heroNodes, {
            scale: 1.7,
            autoAlpha: 0.35,
            duration: 1.8,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            stagger: { each: 0.22, from: "random" },
          });
        },
      });

      gsap.fromTo(
        heroPolygons,
        { autoAlpha: 0, scale: 0.82, transformOrigin: "50% 50%" },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
          stagger: 0.14,
          delay: 0.4,
        },
      );

      // ── Hero entrance timeline ──────────────────────────────────────────
      gsap
        .timeline({ defaults: { duration: 0.85, ease: "power3.out" } })
        .from("[data-home-hero-avatar]", { autoAlpha: 0, scale: 0.82, y: 34 })
        .from("[data-home-hero-title]", { autoAlpha: 0, y: 30 }, "-=0.52")
        .from("[data-home-hero-subtitle]", { autoAlpha: 0, y: 24 }, "-=0.58")
        .from("[data-home-hero-socials]", { autoAlpha: 0, y: 18 }, "-=0.58");

      // ── Hero scroll-out parallax ────────────────────────────────────────
      if (hero) {
        gsap.to(hero, {
          yPercent: -7,
          scale: 0.965,
          autoAlpha: 0.62,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top+=88",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(hero.querySelector(".home-hero-background"), {
          scale: 1.12,
          rotate: 2.5,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top+=88",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ── Section reveal + accent line ────────────────────────────────────
      gsap.utils
        .toArray<HTMLElement>("[data-home-section]")
        .forEach((section) => {
          const content = section.querySelector("[data-home-section-content]");
          if (content) {
            gsap.from(content, {
              autoAlpha: 0,
              y: 42,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 78%", once: true },
            });
          }

          gsap.fromTo(
            section,
            { "--section-accent-scale": 0 },
            {
              "--section-accent-scale": 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 78%", once: true },
            },
          );
        });

      // ── Masonry card batch reveal ───────────────────────────────────────
      const cards = gsap.utils.toArray<HTMLElement>("[data-home-card]");

      gsap.set(cards, {
        autoAlpha: 0,
        transformPerspective: 900,
        transformOrigin: "50% 80%",
        y: 72,
        rotateX: 8,
        scale: 0.96,
      });

      ScrollTrigger.batch(cards, {
        start: "top 86%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          });
        },
      });
    });

    return () => {
      ctx.revert();
      document.documentElement.classList.remove("has-home-scroll-animations");
    };
  }, []);

  return (
    <div className="home-scroll-progress" aria-hidden="true">
      <div className="home-scroll-progress-bar" data-home-progress-bar />
    </div>
  );
}
