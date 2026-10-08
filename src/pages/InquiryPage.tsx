import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { CONTACT_EMAIL, CONTACT_PHONE_TEL } from '../data/media';

interface InquiryPageProps {
  onNavigateHome: () => void;
  onNavigateRoute: (route: string) => void;
}

type InquiryData = {
  scope: string;
  budget: string;
  goal: string;
  timing: string;
  website: string;
  priorities: string[];
  name: string;
  email: string;
  phone: string;
  company: string;
  conversation: string;
};

const initialData: InquiryData = {
  scope: '',
  budget: '',
  goal: '',
  timing: '',
  website: '',
  priorities: [],
  name: '',
  email: '',
  phone: '',
  company: '',
  conversation: ''
};

const scopeOptions = [
  {
    id: 'Maßgeschneiderte Website',
    label: 'Website',
    desc: 'Individuelles digitales Flagship für Marken & B2B',
    tag: 'Flagship'
  },
  {
    id: 'High-Converting Landing Page',
    label: 'Landing Page',
    desc: 'Fokus auf messbare Lead-Generierung & Kampagnen',
    tag: 'Performance'
  },
  {
    id: 'Relaunch & Redesign',
    label: 'Relaunch',
    desc: 'Bestehende Webpräsenz visuell & technisch neu aufstellen',
    tag: 'Relaunch'
  },
  {
    id: 'Art Direction & Branding',
    label: 'Branding & Design',
    desc: 'Ganzheitliche digitale Identität, Typografie & Motion',
    tag: 'Identität'
  }
];

const budgetOptions = [
  'Unter 1.500 €',
  '1.500–3.000 €',
  '3.000–5.000 €',
  '5.000–8.000 €',
  'Über 8.000 €',
  'Noch nicht festgelegt'
];

const timingOptions = [
  'So bald wie möglich',
  'Innerhalb der nächsten 2–4 Wochen',
  'In 1–3 Monaten',
  'Zeitlich flexibel'
];

const durationByScope: Record<string, { label: string; detail?: string }> = {
  'High-Converting Landing Page': {
    label: 'Ca. 1–2 Wochen'
  },
  'Maßgeschneiderte Website': {
    label: 'Ca. 2–3 Wochen',
    detail: 'Für eine typische Business-Website mit 3–5 Seiten.'
  },
  'Relaunch & Redesign': {
    label: 'Ca. 3–5 Wochen',
    detail: 'Größere Migrationen oder komplexe Anforderungen können mehr Zeit benötigen.'
  },
  'Art Direction & Branding': {
    label: 'Ca. 2–4 Wochen',
    detail: 'Je nach Umfang und den vereinbarten Deliverables.'
  }
};

const durationNote = 'Ab Projektstart und sobald alle benötigten Inhalte vorliegen. Der genaue Zeitplan wird im Angebot vereinbart.';

const getScopeLabel = (scope: string) =>
  scopeOptions.find((option) => option.id === scope)?.label ?? 'Noch nicht ausgewählt';

const getDuration = (scope: string) => durationByScope[scope];

const priorityOptions = [
  'Exklusives UI/UX Design',
  'Hohe Conversion & B2B-Leads',
  'Schnelle Ladezeit & SEO',
  'Mobile-First Perfektion',
  'Subtile Animationen & Motion',
  'Einfache Inhaltsverwaltung (CMS)'
];

const conversationOptions = [
  '30-Min. Video-Call',
  'Telefonischer Rückruf',
  'Erstkontakt per E-Mail'
];

export function InquiryPage({ onNavigateHome, onNavigateRoute: _onNavigateRoute }: InquiryPageProps) {
  const [inquiry, setInquiry] = useState<InquiryData>(initialData);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const scopeLabel = getScopeLabel(inquiry.scope);
  const duration = getDuration(inquiry.scope);
  const budgetLabel = inquiry.budget || 'Noch nicht festgelegt';
  const timingLabel = inquiry.timing || 'Noch nicht angegeben';

  useEffect(() => {
    document.title = 'Projekt anfragen — MARGIN Studio';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (step === 2 && !submitted) {
      setTimeout(() => nameInputRef.current?.focus(), 150);
    }
  }, [step, submitted]);

  const update = <K extends keyof InquiryData>(key: K, value: InquiryData[K]) =>
    setInquiry((curr) => ({ ...curr, [key]: value }));

  const updateAndClearValidation = <K extends keyof InquiryData>(key: K, value: InquiryData[K]) => {
    update(key, value);
    setValidationMessage('');
  };

  const togglePriority = (p: string) => {
    setInquiry((curr) => {
      const exists = curr.priorities.includes(p);
      const updated = exists ? curr.priorities.filter((item) => item !== p) : [...curr.priorities, p];
      return { ...curr, priorities: updated };
    });
  };

  const summaryText = [
    `MARGIN PROJEKT-BRIEFING`,
    `=============================`,
    `Projektart: ${scopeLabel}`,
    `Budgetrahmen: ${budgetLabel}`,
    `Gewünschter Start: ${timingLabel}`,
    ...(duration ? [`Voraussichtliche Umsetzung: ${duration.label}`, `Hinweis: ${durationNote}`] : []),
    `Bestehende Domain: ${inquiry.website.trim() || 'Keine angegeben'}`,
    `Schwerpunkte: ${inquiry.priorities.join(', ') || 'Keine ausgewählt'}`,
    `Projekt-Vision: ${inquiry.goal.trim() || 'Keine zusätzliche Angabe'}`,
    `Bevorzugter Erstkontakt: ${inquiry.conversation || 'Keine Angabe'}`,
    ``,
    `KONTAKTDATEN`,
    `-----------------------------`,
    `Name: ${inquiry.name.trim()}`,
    `Unternehmen: ${inquiry.company.trim() || 'Keine Angabe'}`,
    `E-Mail: ${inquiry.email.trim()}`,
    `Telefon: ${inquiry.phone.trim() || 'Keine Angabe'}`
  ].join('\n');

  const canContinue = (targetStep: number) => {
    if (targetStep === 1) return Boolean(inquiry.scope);
    if (targetStep === 2) return Boolean(inquiry.scope && inquiry.budget && inquiry.timing);
    return true;
  };

  const scrollToStepTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const goToStep = (targetStep: number) => {
    if (targetStep > step && !canContinue(targetStep)) {
      setValidationMessage(targetStep === 1
        ? 'Wählen Sie bitte zuerst die Art Ihres Vorhabens.'
        : 'Wählen Sie bitte einen Budgetrahmen und den gewünschten Projektstart.');
      return;
    }
    setValidationMessage('');
    setStep(targetStep);
    scrollToStepTop();
  };

  const handleNextOrSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step < 2) {
      goToStep(step + 1);
      return;
    }

    if (!inquiry.name.trim() || !inquiry.email.trim()) {
      setValidationMessage('Bitte geben Sie Ihren Namen und Ihre E-Mail-Adresse an.');
      return;
    }

    const subject = encodeURIComponent(`MARGIN Projektanfrage: ${scopeLabel} (${inquiry.name})`);
    const body = encodeURIComponent(summaryText);
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailtoUrl;
    } catch {
      // smooth fallback
    }

    setSubmitted(true);
    scrollToStepTop();
  };

  const copyDetails = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  };

  const openMailDraft = () => {
    const subject = encodeURIComponent(`MARGIN Projektanfrage: ${scopeLabel} (${inquiry.name})`);
    const body = encodeURIComponent(summaryText);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const openWhatsApp = () => {
    const cleanPhone = CONTACT_PHONE_TEL.replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(
      `Hallo MARGIN Studio, ich interessiere mich für ein Webprojekt (${scopeLabel}).\n\nName: ${inquiry.name}\nBudget: ${budgetLabel}\nGewünschter Start: ${timingLabel}${duration ? `\nVoraussichtliche Umsetzung: ${duration.label}` : ''}`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${waText}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="inquiry-shell" data-theme="dark">
      {/* Top Navigation Bar */}
      <header className="inquiry-topbar">
        <button type="button" className="inquiry-brand-btn" onClick={onNavigateHome} aria-label="MARGIN — Zur Startseite">
          <img src="/assets/margin_logo_light.png" alt="MARGIN" width="134" height="31" />
        </button>
        <div className="inquiry-topbar-right">
          <span className="inquiry-topbar-meta">PROJEKT-DIALOG</span>
          <button type="button" className="inquiry-close-btn" onClick={onNavigateHome}>
            Schließen <span>✕</span>
          </button>
        </div>
      </header>

      {/* Main Split Experience */}
      <div className="inquiry-split-layout">
        {/* Left Column: Creative Studio Identity & Trust */}
        <aside className="inquiry-ambient-side">
          <div className="ambient-inner">
            <span className="eyebrow brief-kicker">MARGIN / PROJEKTBRIEF</span>
            <div className="ambient-statement">
              <h2 className="ambient-title">Ein guter<br /><em>Anfang.</em></h2>
              <p className="ambient-desc">Drei Schritte. Ein gemeinsamer Ausgangspunkt.</p>
            </div>
            <div className="brief-preview" aria-label="Ihr Projektbrief">
              <span className="eyebrow">Ihr Vorhaben</span>
              <p>{scopeLabel}</p>
              <div className="brief-rule" />
              <dl>
                <div><dt>Budgetrahmen</dt><dd>{budgetLabel}</dd></div>
                <div><dt>Gewünschter Start</dt><dd>{timingLabel}</dd></div>
                {duration && <div><dt>Voraussichtliche Umsetzung</dt><dd>{duration.label}</dd></div>}
              </dl>
            </div>
            <a className="brief-contact text-action" href={`mailto:${CONTACT_EMAIL}`}>Lieber direkt schreiben <span aria-hidden="true">↗</span></a>
          </div>
        </aside>

        {/* Right Column: The Interactive Dialogue Funnel */}
        <main className="inquiry-form-side">
          <div className="inquiry-form-card">
            {!submitted ? (
              <>
                {/* Stepper Header */}
                <div className="inquiry-funnel-stepper">
                  <div className="stepper-pills" aria-label="Schritte der Anfrage">
                    <button
                      type="button"
                      className={`stepper-pill ${step === 0 ? 'active' : step > 0 ? 'completed' : ''}`}
                      aria-current={step === 0 ? 'step' : undefined}
                      onClick={() => goToStep(0)}
                    >
                      <span className="stepper-idx">01</span>
                      <span className="stepper-txt">Vorhaben</span>
                    </button>
                    <span className="stepper-sep">/</span>
                    <button
                      type="button"
                      className={`stepper-pill ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}
                      aria-current={step === 1 ? 'step' : undefined}
                      aria-disabled={step < 1 && !inquiry.scope}
                      onClick={() => goToStep(1)}
                    >
                      <span className="stepper-idx">02</span>
                      <span className="stepper-txt">Rahmen</span>
                    </button>
                    <span className="stepper-sep">/</span>
                    <button
                      type="button"
                      className={`stepper-pill ${step === 2 ? 'active' : ''}`}
                      aria-current={step === 2 ? 'step' : undefined}
                      aria-disabled={step < 2 && !canContinue(2)}
                      onClick={() => goToStep(2)}
                    >
                      <span className="stepper-idx">03</span>
                      <span className="stepper-txt">Kontakt</span>
                    </button>
                  </div>

                  <div className="stepper-track" aria-hidden="true">
                    <div
                      className="stepper-bar"
                      style={{ width: `${((step + 1) / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Editorial Headline per Step */}
                <div className="inquiry-step-hero">
                  <h1 className="inquiry-editorial-title">
                    {step === 0 ? (
                      <>
                        Ihr <em>Vorhaben.</em>
                      </>
                    ) : step === 1 ? (
                      <>
                        Der <em>Rahmen.</em>
                      </>
                    ) : (
                      <>
                        In <em>Kontakt.</em>
                      </>
                    )}
                  </h1>
                  <p className="inquiry-editorial-lead">
                    {step === 0
                      ? 'Was haben Sie vor?'
                      : step === 1
                      ? 'Ein paar klare Eckdaten genügen.'
                      : 'Wie erreichen wir Sie?'}
                  </p>
                </div>

                {/* The Step Form */}
                <form className="inquiry-interactive-form" onSubmit={handleNextOrSubmit}>
                  {/* STEP 0: PROJECT TYPE */}
                  {step === 0 && (
                    <div key={step} className="funnel-pane fade-in">
                      <fieldset className="pane-fieldset">
                        <legend className="pane-legend">01 / Projektart</legend>
                        <div className="scope-grid">
                          {scopeOptions.map((opt, index) => {
                            const isSelected = inquiry.scope === opt.id;
                            return (
                              <button
                                type="button"
                                key={opt.id}
                                className={`scope-card ${isSelected ? 'selected' : ''}`}
                                aria-pressed={isSelected}
                                onClick={() => updateAndClearValidation('scope', opt.id)}
                              >
                                <span className="scope-number">0{index + 1}</span>
                                <span className="scope-name">{opt.label}</span>
                                <span className="scope-check" aria-hidden="true">{isSelected ? '●' : '○'}</span>
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>

                    </div>
                  )}

                  {/* STEP 1: BUDGET, START & CONTEXT */}
                  {step === 1 && (
                    <div key={step} className="funnel-pane fade-in">
                      <fieldset className="pane-fieldset">
                        <legend className="pane-legend">Welchen Budgetrahmen haben Sie eingeplant?</legend>
                        <p className="field-support">Eine grobe Orientierung genügt. Den konkreten Umfang und Preis besprechen wir gemeinsam.</p>
                        <div className="budget-chips-grid">
                          {budgetOptions.map((budget) => {
                            const isSelected = inquiry.budget === budget;
                            return (
                              <button
                                type="button"
                                key={budget}
                                className={`budget-chip ${isSelected ? 'selected' : ''}`}
                                aria-pressed={isSelected}
                                onClick={() => updateAndClearValidation('budget', budget)}
                              >
                                <span className="budget-label">{budget}</span>
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>

                      {duration && (
                        <section className="implementation-estimate" aria-label="Voraussichtliche Umsetzung">
                          <div>
                            <span className="estimate-label">Voraussichtliche Umsetzung</span>
                            <strong>{duration.label}</strong>
                          </div>
                          <p>{duration.detail}</p>
                          <small>{durationNote}</small>
                        </section>
                      )}

                      <fieldset className="pane-fieldset">
                        <legend className="pane-legend">Wann möchten Sie starten?</legend>
                        <p className="field-support">Der gewünschte Projektstart bleibt unabhängig von der Umsetzungsdauer.</p>
                        <div className="timing-chips-row">
                          {timingOptions.map((t) => {
                            const isSelected = inquiry.timing === t;
                            return (
                              <button
                                type="button"
                                key={t}
                                className={`pill-btn ${isSelected ? 'selected' : ''}`}
                                aria-pressed={isSelected}
                                onClick={() => updateAndClearValidation('timing', t)}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>

                      <div className="input-group">
                        <label htmlFor="website-input">
                          Bestehende Domain <span className="opt-tag">(optional)</span>
                        </label>
                        <input
                          id="website-input"
                          type="url"
                          className="field-input"
                          placeholder="https://ihre-website.de"
                          value={inquiry.website}
                          onChange={(e) => updateAndClearValidation('website', e.target.value)}
                        />
                      </div>

                      <div className="input-group">
                        <label htmlFor="goal-input">
                          Was soll sich verändern? <span className="opt-tag">(optional)</span>
                        </label>
                        <input
                          id="goal-input"
                          type="text"
                          className="field-input"
                          placeholder="Ein Satz genügt."
                          value={inquiry.goal}
                          onChange={(e) => updateAndClearValidation('goal', e.target.value)}
                        />
                      </div>

                      <fieldset className="pane-fieldset">
                        <legend className="pane-legend">
                          <span className="legend-title">Was ist Ihnen besonders wichtig?</span>
                          <span className="legend-sub">· Mehrfachauswahl möglich</span>
                        </legend>
                        <div className="priority-tags-cloud">
                          {priorityOptions.map((p) => {
                            const isSelected = inquiry.priorities.includes(p);
                            return (
                              <button
                                type="button"
                                key={p}
                                className={`priority-tag ${isSelected ? 'selected' : ''}`}
                                aria-pressed={isSelected}
                                onClick={() => togglePriority(p)}
                              >
                                <span className="tag-icon">{isSelected ? '✓ ' : '+ '}</span>
                                {p}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>
                    </div>
                  )}

                  {/* STEP 2: CONTACT & PREFERRED METHOD */}
                  {step === 2 && (
                    <div key={step} className="funnel-pane fade-in">
                      <div className="fields-grid-2">
                        <div className="input-group">
                          <label htmlFor="name-input">Ihr Name *</label>
                          <input
                            id="name-input"
                            ref={nameInputRef}
                            autoComplete="name"
                            required
                            type="text"
                            className="field-input"
                            placeholder="Vor- und Nachname"
                            value={inquiry.name}
                            onChange={(e) => updateAndClearValidation('name', e.target.value)}
                          />
                        </div>
                        <div className="input-group">
                          <label htmlFor="email-input">E-Mail-Adresse *</label>
                          <input
                            id="email-input"
                            autoComplete="email"
                            required
                            type="email"
                            className="field-input"
                            placeholder="name@unternehmen.de"
                            value={inquiry.email}
                            onChange={(e) => updateAndClearValidation('email', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="fields-grid-2">
                        <div className="input-group">
                          <label htmlFor="phone-input">Telefonnummer <span className="opt-tag">(optional)</span></label>
                          <input
                            id="phone-input"
                            autoComplete="tel"
                            type="tel"
                            className="field-input"
                            placeholder="+49 ..."
                            value={inquiry.phone}
                            onChange={(e) => updateAndClearValidation('phone', e.target.value)}
                          />
                        </div>
                        <div className="input-group">
                          <label htmlFor="company-input">Unternehmen / Marke <span className="opt-tag">(optional)</span></label>
                          <input
                            id="company-input"
                            autoComplete="organization"
                            type="text"
                            className="field-input"
                            placeholder="Firma / GmbH / Brand"
                            value={inquiry.company}
                            onChange={(e) => updateAndClearValidation('company', e.target.value)}
                          />
                        </div>
                      </div>

                      <fieldset className="pane-fieldset">
                        <legend className="pane-legend">Bevorzugter Erstkontakt</legend>
                        <div className="timing-chips-row">
                          {conversationOptions.map((c) => {
                            const isSelected = inquiry.conversation === c;
                            return (
                              <button
                                type="button"
                                key={c}
                                className={`pill-btn ${isSelected ? 'selected' : ''}`}
                                aria-pressed={isSelected}
                                onClick={() => updateAndClearValidation('conversation', c)}
                              >
                                {c}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>

                      <div className="privacy-trust-box">
                        <span className="privacy-icon" aria-hidden="true">↗</span>
                        <span>
                          Ihre Angaben werden für die Bearbeitung Ihrer Anfrage verwendet.
                          <a className="brief-privacy-link" href="/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutz lesen ↗</a>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Summary Bar */}
                  <div className="funnel-summary-bar">
                    <span className="summary-title">Projektbrief</span>
                    <span className="summary-values">
                      {scopeLabel} · {budgetLabel}
                    </span>
                  </div>

                  {validationMessage && (
                    <p className="form-validation" role="status">{validationMessage}</p>
                  )}

                  {/* Actions Row */}
                  <div className="funnel-footer-actions">
                    {step > 0 ? (
                      <button
                        type="button"
                        className="btn-back"
                        onClick={() => goToStep(step - 1)}
                      >
                        ← Zurück
                      </button>
                    ) : (
                      <div />
                    )}

                    <button type="submit" className="btn-next-action">
                      {step < 2 ? (
                        <>
                          {step === 0 ? 'Weiter zum Rahmen' : 'Weiter zum Kontakt'} <span>→</span>
                        </>
                      ) : (
                        <>
                          E-Mail vorbereiten <span aria-hidden="true">↗</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Success View */
              <div className="funnel-success-state fade-in">
                <div className="success-badge-pill">
                  <span className="badge-check">✓</span>
                  <span>PROJEKTBRIEF VORBEREITET</span>
                </div>

                <h2 className="success-title">
                  Vielen Dank{inquiry.name.trim() ? `, ${inquiry.name.trim()}` : ''}!
                </h2>

                <p className="success-lead">
                  Ihr Projektbrief ist bereit. Senden Sie den geöffneten E-Mail-Entwurf ab, damit Ihre Anfrage bei uns ankommt.
                </p>

                <div className="success-card-recap">
                  <div className="recap-row">
                    <span className="recap-label">Projekt:</span>
                    <span className="recap-val">{scopeLabel}</span>
                  </div>
                  <div className="recap-row">
                    <span className="recap-label">Budgetrahmen:</span>
                    <span className="recap-val">{budgetLabel}</span>
                  </div>
                  <div className="recap-row">
                    <span className="recap-label">Gewünschter Start:</span>
                    <span className="recap-val">{timingLabel}</span>
                  </div>
                  {duration && <div className="recap-row">
                    <span className="recap-label">Voraussichtliche Umsetzung:</span>
                    <span className="recap-val">{duration.label}</span>
                  </div>}
                  <div className="recap-row">
                    <span className="recap-label">Kontakt:</span>
                    <span className="recap-val">{inquiry.email}</span>
                  </div>
                </div>

                <div className="success-action-group">
                  <button type="button" className="success-btn primary" onClick={openMailDraft}>
                    <span>E-Mail-Entwurf öffnen &amp; absenden</span>
                    <span>↗</span>
                  </button>
                  <button type="button" className="success-btn secondary" onClick={copyDetails}>
                    <span>{copied ? 'Angaben kopiert ✓' : 'Briefing-Text kopieren'}</span>
                    <span>📋</span>
                  </button>
                  <button type="button" className="success-btn secondary" onClick={openWhatsApp}>
                    <span>Per WhatsApp senden</span>
                    <span>💬</span>
                  </button>
                </div>

                <button type="button" className="success-home-link" onClick={onNavigateHome}>
                  ← Zurück zur Startseite
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
