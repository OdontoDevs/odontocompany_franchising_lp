'use client';

import { Gauge, Building2, Award } from "lucide-react";
import CtaFunnel from "@/components/CtaFunnel";

export default function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero-overlay" />

      <div className="hero-stats" aria-hidden="true">
        <div className="hero-stat hero-stat--1 fade-in-soft delay-3">
          <span className="hero-stat__icon">
            <Gauge />
          </span>
          <div className="hero-stat__text">
            <strong className="hero-stat__value">Operação Simplificada</strong>
          </div>
        </div>

        <div className="hero-stat hero-stat--2 fade-in-soft delay-4">
          <span className="hero-stat__icon">
            <Building2 />
          </span>
          <div className="hero-stat__text">
            <strong className="hero-stat__value">Estrutura Completa</strong>
          </div>
        </div>

        <div className="hero-stat hero-stat--3 fade-in-soft delay-5">
          <span className="hero-stat__icon">
            <Award />
          </span>
          <div className="hero-stat__text">
            <strong className="hero-stat__value">Autoridade de Mercado</strong>
          </div>
        </div>
      </div>

      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-headline animate-in delay-2">
            Invista no <em>maior ecossistema</em> de rede de franquias
            odontológicas do Brasil
          </h1>
          <p className="hero-sub animate-in delay-3">
            +1.000 unidades, modelo comprovado em 35 anos de mercado
          </p>
          <div className="fade-in-soft delay-4 max-w-lg mt-6 hero-ctas">
            <CtaFunnel />
          </div>
        </div>
      </div>
      <div className="hero-ticker">
        <div className="hero-ticker-track">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="hero-ticker-set" key={index} aria-hidden={index > 0 ? true : undefined}>
              <span>ESTRUTURA OPERACIONAL</span>
              <span className="hero-ticker-sep">·</span>
              <span>SOLIDEZ DA MARCA</span>
              <span className="hero-ticker-sep">·</span>
              <span>FACILIDADE DE GESTÃO</span>
              <span className="hero-ticker-sep">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
