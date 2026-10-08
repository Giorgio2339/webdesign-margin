import { useState, useEffect } from 'react';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from '../data/media';

/* Minimalistisches, hochkarätiges Atelier-Closing mit Kinetik und direktem Inhaberdialog */
export function ConversionCTA({ onOpenInquiry }: { onOpenInquiry: () => void }) {
  const [cetTime, setCetTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCetTime(
        now.toLocaleTimeString('de-DE', {
          timeZone: 'Europe/Berlin',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="closing" data-theme="dark" aria-labelledby="contact-title">
      <div className="surface-takeover" aria-hidden="true" />
      
      {/* Kinetic Infinite Velocity Ribbon — Groß, Fett, Nur 'PROJEKT STARTEN ↗' */}
      <div className="closing-kinetic-marquee" role="region" aria-label="Projekt starten Laufband">
        <div className="marquee-track">
          <div className="marquee-content">
            <button
              type="button"
              className="marquee-action"
              onClick={onOpenInquiry}
              aria-label="Projekt starten"
            >
              <span>PROJEKT STARTEN</span>
              <span className="marquee-arrow" aria-hidden="true">↗</span>
            </button>
            <span className="marquee-sep" aria-hidden="true">✦</span>
            <button
              type="button"
              className="marquee-action"
              onClick={onOpenInquiry}
              aria-label="Projekt starten"
            >
              <span>PROJEKT STARTEN</span>
              <span className="marquee-arrow" aria-hidden="true">↗</span>
            </button>
            <span className="marquee-sep" aria-hidden="true">✦</span>
            <button
              type="button"
              className="marquee-action"
              onClick={onOpenInquiry}
              aria-label="Projekt starten"
            >
              <span>PROJEKT STARTEN</span>
              <span className="marquee-arrow" aria-hidden="true">↗</span>
            </button>
            <span className="marquee-sep" aria-hidden="true">✦</span>
            <button
              type="button"
              className="marquee-action"
              onClick={onOpenInquiry}
              aria-label="Projekt starten"
            >
              <span>PROJEKT STARTEN</span>
              <span className="marquee-arrow" aria-hidden="true">↗</span>
            </button>
            <span className="marquee-sep" aria-hidden="true">✦</span>
          </div>
          <div className="marquee-content" aria-hidden="true">
            <button
              type="button"
              className="marquee-action"
              onClick={onOpenInquiry}
              tabIndex={-1}
            >
              <span>PROJEKT STARTEN</span>
              <span className="marquee-arrow" aria-hidden="true">↗</span>
            </button>
            <span className="marquee-sep" aria-hidden="true">✦</span>
            <button
              type="button"
              className="marquee-action"
              onClick={onOpenInquiry}
              tabIndex={-1}
            >
              <span>PROJEKT STARTEN</span>
              <span className="marquee-arrow" aria-hidden="true">↗</span>
            </button>
            <span className="marquee-sep" aria-hidden="true">✦</span>
            <button
              type="button"
              className="marquee-action"
              onClick={onOpenInquiry}
              tabIndex={-1}
            >
              <span>PROJEKT STARTEN</span>
              <span className="marquee-arrow" aria-hidden="true">↗</span>
            </button>
            <span className="marquee-sep" aria-hidden="true">✦</span>
            <button
              type="button"
              className="marquee-action"
              onClick={onOpenInquiry}
              tabIndex={-1}
            >
              <span>PROJEKT STARTEN</span>
              <span className="marquee-arrow" aria-hidden="true">↗</span>
            </button>
            <span className="marquee-sep" aria-hidden="true">✦</span>
          </div>
        </div>
      </div>

      <div className="page-container closing-inner">
        {/* Editorial Header */}
        <div className="closing-header">
          <div className="closing-badge-row">
            <span className="closing-status-pill">
              <span className="status-indicator-dot" />
              <span>DE / LOKALZEIT {cetTime || '--:--:--'} · MARGIN ATELIER</span>
            </span>
            <span className="eyebrow closing-eyebrow">Direkter Austausch</span>
          </div>

          <h2 id="contact-title" className="closing-title">
            <span className="closing-line closing-line-1">
              <span className="closing-line-inner">Raum schaffen</span>
            </span>
            <span className="closing-line closing-line-2">
              <span className="closing-line-inner"><em>für Besseres.</em></span>
            </span>
          </h2>

          <p className="closing-narrative">
            Wir gestalten und programmieren digitale Flagships für Marken mit Anspruch auf Eigenständigkeit. 
            Individuell gestaltet, präzise entwickelt und auf die Anforderungen Ihres Unternehmens abgestimmt.
          </p>
        </div>

        {/* Minimalist, Creative Communication Station */}
        <div className="closing-dispatch-station">
          <div className="dispatch-primary">
            <button type="button" className="closing-cta-magnet" onClick={onOpenInquiry}>
              <span className="cta-magnet-backdrop" aria-hidden="true" />
              <span className="cta-magnet-text">Projekt anfragen</span>
              <span className="cta-magnet-arrow" aria-hidden="true">↗</span>
            </button>
            <span className="dispatch-hint">Interaktives Projekt-Briefing (ca. 2 Min.)</span>
          </div>

          <div className="dispatch-channels">
            <a className="dispatch-channel-card" href={`tel:${CONTACT_PHONE_TEL}`}>
              <div className="channel-top">
                <span className="channel-tag">TELEFON // DIREKT</span>
                <span className="channel-live-dot" />
              </div>
              <span className="channel-main-val">{CONTACT_PHONE}</span>
              <span className="channel-sub-info">Direkter Kontakt für Ihr Vorhaben</span>
            </a>

            <a className="dispatch-channel-card" href={`mailto:${CONTACT_EMAIL}`}>
              <div className="channel-top">
                <span className="channel-tag">E-MAIL // ANFRAGE</span>
                <span className="channel-arrow">↗</span>
              </div>
              <span className="channel-main-val">{CONTACT_EMAIL}</span>
              <span className="channel-sub-info">Schreiben Sie uns Ihr Anliegen</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
