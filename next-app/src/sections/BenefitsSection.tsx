"use client";

import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  videoSrc?: string;
}

function BenefitCard({ icon, title, description, delay, videoSrc }: BenefitCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const popRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("is-visible"), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const updatePos = React.useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  }, []);

  // Fechar somente quando mouse sair de AMBOS (card e popup).
  // Usa mousemove + matches(':hover') para evitar race condition onde
  // o browser não dispara mouseenter no popup quando ele aparece sob cursor estático.
  React.useEffect(() => {
    if (!open) return;
    const check = () => {
      const overCard = !!cardRef.current?.matches(":hover");
      const overPop = !!popRef.current?.matches(":hover");
      if (!overCard && !overPop) setOpen(false);
    };
    window.addEventListener("mousemove", check, { passive: true });
    return () => window.removeEventListener("mousemove", check);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    updatePos();
    window.addEventListener("scroll", updatePos, { passive: true });
    window.addEventListener("resize", updatePos);
    return () => {
      window.removeEventListener("scroll", updatePos);
      window.removeEventListener("resize", updatePos);
    };
  }, [open, updatePos]);

  const handleEnter = React.useCallback(() => {
    updatePos();
    setOpen(true);
  }, [updatePos]);

  return (
    <div
      ref={cardRef}
      className="ben-card fade-up-item"
      onMouseEnter={videoSrc ? handleEnter : undefined}
      onClick={videoSrc ? (e) => { e.stopPropagation(); setOpen((v) => !v); } : undefined}
    >
      <div className="ben-card-topbar" />
      <div className="ben-icon-wrap">{icon}</div>
      <h3 className="ben-card-title">{title}</h3>
      <p className="ben-card-desc">{description}</p>

      {mounted && videoSrc
        ? createPortal(
            <AnimatePresence>
              {open && (
                <motion.div
                  ref={popRef}
                  className="ben-video-pop"
                  style={{ left: pos.x, top: pos.y, x: "-50%", y: "-50%" }}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    className="ben-video-pop-media"
                    src={videoSrc}
                    muted
                    autoPlay
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    onClick={(e) => e.stopPropagation()}
                  />
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )
        : null}
    </div>
  );
}

const benefits = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Marketing nacional",
    description: "A marca odontológica que mais investe em mídia nacional.",
    delay: 100,
    videoSrc:
      "https://pub-db8ed4fb33634589a6ce5fb07e85cb46.r2.dev/landingpage_odc_franchising/video_ratinho.mp4",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Modelo Seguro e Lucrativo",
    description:
      "Rede validada com histórico sólido e operação estruturada para crescer com segurança.",
    delay: 200,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Modelo de captação exclusivo",
    description:
      "Tenha uma clínica sempre cheia e captação de clientes com baixo custo. Todas as especialidades em um só lugar.",
    delay: 300,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Modelo testado e aprovado",
    description: "60% dos nossos franqueados possuem mais de uma unidade.",
    delay: 400,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    title: "Universidade corporativa",
    description:
      "Capacitação completa para você e sua equipe: operacional, comercial e clínico.",
    delay: 500,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Suporte de ponta a ponta",
    description: "Da escolha do ponto comercial à inauguração. Especialistas em obras e mercado.",
    delay: 600,
  },
];

export default function BenefitsSection() {
  return (
    <section className="benefits-section-new" id="vantagens">
      <div className="ben-inner">
        <div className="ben-header fade-up-item">
          <div className="section-kicker section-kicker--light">O que você recebe</div>
          <h2 className="ben-title">
            Tudo que você precisa para{" "}
            <span className="ben-highlight-text">ter sucesso</span>
          </h2>
          <p className="ben-sub">
            Você cuida da gestão do negócio. A OdontoCompany cuida de todo o
            resto.
          </p>
        </div>

        <div className="ben-grid">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={benefit.delay}
              videoSrc={benefit.videoSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
