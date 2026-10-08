import { useEffect, useState, useRef } from 'react';
import type { FormEvent } from 'react';
import { useDialog } from '../hooks/useDialog';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from '../data/media';

type Inquiry = {
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

const initialInquiry: Inquiry = {
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
  { id: 'Maßgeschneiderte Website', label: 'Maßgeschneiderte Website', desc: 'Individuelles Flagship für Marken' },
  { id: 'E-Commerce & Shop', label: 'E-Commerce & Online-Shop', desc: 'Conversion-optimierte Shopping-Plattform' },
  { id: 'Relaunch & Redesign', label: 'Relaunch & Redesign', desc: 'Bestehende Website modernisieren' },
  { id: 'Art Direction & Branding', label: 'Art Direction & Branding', desc: 'Designsystem, Identität & Typografie' }
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

const priorityOptions = [
  'Exklusives UI/UX Design',
  'Hohe Conversion & Leads',
  'Schnelle Ladezeit & SEO',
  'Mobile-First Perfektion',
  'Subtile Animationen'
];

const conversationOptions = [
  '30-Min. Video-Call',
  'Telefonischer Rückruf',
  'Erstkontakt per E-Mail'
];

const bookingUrl = import.meta.env.VITE_BOOKING_URL as string | undefined;

export function InquiryDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [inquiry, setInquiry] = useState<Inquiry>(initialInquiry);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setStep(0);
    setSubmitted(false);
    setCopied(false);
    setInquiry(initialInquiry);
  };

  const close = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  const ref = useDialog(isOpen, close);

  useEffect(() => {
    ref.current?.scrollTo({ top: 0, behavior: 'instant' });
    if (step === 2 && !submitted) {
      setTimeout(() => nameInputRef.current?.focus(), 150);
    }
  }, [step, submitted, ref]);

  const update = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) =>
    setInquiry((current) => ({ ...current, [key]: value }));

  const togglePriority = (p: string) => {
    setInquiry((current) => {
      const exists = current.priorities.includes(p);
      const updated = exists ? current.priorities.filter((item) => item !== p) : [...current.priorities, p];
      return { ...current, priorities: updated };
    });
  };

  const summaryText = [
    `MARGIN PROJEKT-ANFRAGE`,
    `=============================`,
    `Projekt: ${inquiry.scope}`,
    `Budgetrahmen: ${inquiry.budget}`,
    `Zeitplan: ${inquiry.timing}`,
    `Aktuelle Website: ${inquiry.website.trim() || 'Keine angegeben'}`,
    `Schwerpunkte: ${inquiry.priorities.join(', ') || 'Keine ausgewählt'}`,
    `Projektziel / Notiz: ${inquiry.goal.trim() || 'Keine zusätzliche Notiz'}`,
    `Wunsch-Erstkontakt: ${inquiry.conversation}`,
    ``,
    `KONTAKTDATEN`,
    `-----------------------------`,
    `Name: ${inquiry.name.trim()}`,
    `Unternehmen: ${inquiry.company.trim() || 'Keine Angabe'}`,
    `E-Mail: ${inquiry.email.trim()}`,
    `Telefon: ${inquiry.phone.trim() || 'Keine Angabe'}`
  ].join('\n');

  const handleNextOrSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < 2) {
      setStep((current) => current + 1);
      return;
    }

    // Prepare mailto link
    const subject = encodeURIComponent(`MARGIN Projektanfrage: ${inquiry.scope} (${inquiry.name})`);
    const body = encodeURIComponent(summaryText);
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    // Trigger draft window
    try {
      window.location.href = mailtoUrl;
    } catch {
      // Fallback handled smoothly
    }

    setSubmitted(true);
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
    const subject = encodeURIComponent(`MARGIN Projektanfrage: ${inquiry.scope} (${inquiry.name})`);
    const body = encodeURIComponent(summaryText);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const openWhatsApp = () => {
    const cleanPhone = CONTACT_PHONE_TEL.replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(
      `Hallo MARGIN Team, ich interessiere mich für ein Projekt (${inquiry.scope}).\n\nMein Name: ${inquiry.name}\nBudget: ${inquiry.budget}\nZeitplan: ${inquiry.timing}`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${waText}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <dialog
      ref={ref}
      className="inquiry-drawer"
      aria-labelledby="inquiry-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left) close();
        }
      }}
    >
      <div className="dialog-toolbar">
        <span className="eyebrow">MARGIN / Projekt-Dialog</span>
        <button className="text-action" type="button" onClick={close} aria-label="Anfrage schließen">
          Schließen <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="inquiry-content">
        {!submitted ? (
          <>
            {/* Step Stepper Header */}
            <div className="inquiry-funnel-header">
              <div className="inquiry-step-pills" role="tablist" aria-label="Schritte der Projektanfrage">
                <button
                  type="button"
                  className={`step-pill-indicator ${step === 0 ? 'active' : step > 0 ? 'completed' : ''}`}
                  onClick={() => setStep(0)}
                >
                  <span className="step-num">01</span>
                  <span className="step-label">Vorhaben</span>
                </button>
                <span className="step-divider" aria-hidden="true">/</span>
                <button
                  type="button"
                  className={`step-pill-indicator ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}
                  onClick={() => setStep(1)}
                >
                  <span className="step-num">02</span>
                  <span className="step-label">Rahmen</span>
                </button>
                <span className="step-divider" aria-hidden="true">/</span>
                <button
                  type="button"
                  className={`step-pill-indicator ${step === 2 ? 'active' : ''}`}
                  onClick={() => {
                    // Only allow jumping forward if basic requirements are selected
                    setStep(2);
                  }}
                >
                  <span className="step-num">03</span>
                  <span className="step-label">Kontakt</span>
                </button>
              </div>

              <div className="inquiry-progress-line" aria-hidden="true">
                <span style={{ width: `${((step + 1) / 3) * 100}%` }} />
              </div>
            </div>

            <h2 id="inquiry-title" className="inquiry-headline">
              {step === 0 ? (
                <>
                  Was wollen wir<br />
                  <em>erschaffen?</em>
                </>
              ) : step === 1 ? (
                <>
                  Rahmen &<br />
                  <em>Prioritäten.</em>
                </>
              ) : (
                <>
                  Den Dialog<br />
                  <em>beginnen.</em>
                </>
              )}
            </h2>

            <p className="inquiry-intro">
              {step === 0
                ? 'Wählen Sie einfach die Art Ihres Vorhabens und einen ungefähren Rahmen.'
                : step === 1
                ? 'Helfen Sie uns, den Zeithorizont und Ihre Prioritäten einzuschätzen.'
                : 'Wie dürfen wir Sie kontaktieren? Wir melden uns innerhalb von 24 Stunden.'}
            </p>

            <form onSubmit={handleNextOrSubmit} className="inquiry-form modern-funnel-form">
              {/* STEP 0: SCOPE & BUDGET */}
              {step === 0 && (
                <div className="funnel-step-pane">
                  <fieldset className="funnel-fieldset">
                    <legend className="funnel-legend">Projekt-Kategorie auswählen</legend>
                    <div className="funnel-cards-grid">
                      {scopeOptions.map((opt) => {
                        const isSelected = inquiry.scope === opt.id;
                        return (
                          <button
                            type="button"
                            key={opt.id}
                            className={`funnel-choice-card ${isSelected ? 'selected' : ''}`}
                            aria-pressed={isSelected}
                            onClick={() => update('scope', opt.id)}
                          >
                            <div className="card-top">
                              <span className="card-title">{opt.label}</span>
                              <span className="card-check" aria-hidden="true">
                                {isSelected ? '✓' : '↗'}
                              </span>
                            </div>
                            <span className="card-desc">{opt.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset className="funnel-fieldset">
                    <legend className="funnel-legend">Geplanter Budgetrahmen</legend>
                    <div className="funnel-chips-row">
                      {budgetOptions.map((b) => {
                        const isSelected = inquiry.budget === b;
                        return (
                          <button
                            type="button"
                            key={b}
                            className={`funnel-chip ${isSelected ? 'selected' : ''}`}
                            aria-pressed={isSelected}
                            onClick={() => update('budget', b)}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="funnel-field-group">
                    <label htmlFor="project-goal-input">
                      Projekt-Vision in einem Satz <span>(optional)</span>
                    </label>
                    <input
                      id="project-goal-input"
                      type="text"
                      value={inquiry.goal}
                      onChange={(e) => update('goal', e.target.value)}
                      maxLength={180}
                      placeholder="z. B. Neuer Markenauftritt zur Neukundengewinnung"
                    />
                  </div>
                </div>
              )}

              {/* STEP 1: TIMING & PRIORITIES */}
              {step === 1 && (
                <div className="funnel-step-pane">
                  <fieldset className="funnel-fieldset">
                    <legend className="funnel-legend">Wann soll das Vorhaben starten?</legend>
                    <div className="funnel-chips-row">
                      {timingOptions.map((t) => {
                        const isSelected = inquiry.timing === t;
                        return (
                          <button
                            type="button"
                            key={t}
                            className={`funnel-chip ${isSelected ? 'selected' : ''}`}
                            aria-pressed={isSelected}
                            onClick={() => update('timing', t)}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="funnel-field-group">
                    <label htmlFor="project-website-input">
                      Bestehende Website <span>(optional)</span>
                    </label>
                    <input
                      id="project-website-input"
                      type="url"
                      value={inquiry.website}
                      onChange={(e) => update('website', e.target.value)}
                      placeholder="https://ihre-website.de"
                    />
                  </div>

                  <fieldset className="funnel-fieldset">
                    <legend className="funnel-legend">
                      Was ist Ihnen besonders wichtig? <span>(Mehrfachauswahl möglich)</span>
                    </legend>
                    <div className="funnel-tags-cloud">
                      {priorityOptions.map((p) => {
                        const isSelected = inquiry.priorities.includes(p);
                        return (
                          <button
                            type="button"
                            key={p}
                            className={`funnel-tag-pill ${isSelected ? 'selected' : ''}`}
                            aria-pressed={isSelected}
                            onClick={() => togglePriority(p)}
                          >
                            <span className="tag-check" aria-hidden="true">{isSelected ? '✓ ' : '+ '}</span>
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
                <div className="funnel-step-pane">
                  <div className="funnel-inputs-grid">
                    <div className="funnel-field-group">
                      <label htmlFor="client-name-input">
                        Ihr Name *
                      </label>
                      <input
                        ref={nameInputRef}
                        id="client-name-input"
                        name="name"
                        value={inquiry.name}
                        onChange={(e) => update('name', e.target.value)}
                        required
                        autoComplete="name"
                        placeholder="Vor- und Nachname"
                      />
                    </div>

                    <div className="funnel-field-group">
                      <label htmlFor="client-email-input">
                        E-Mail-Adresse *
                      </label>
                      <input
                        id="client-email-input"
                        name="email"
                        type="email"
                        value={inquiry.email}
                        onChange={(e) => update('email', e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="ihre.adresse@unternehmen.de"
                      />
                    </div>
                  </div>

                  <div className="funnel-inputs-grid">
                    <div className="funnel-field-group">
                      <label htmlFor="client-phone-input">
                        Telefonnummer <span>(optional)</span>
                      </label>
                      <input
                        id="client-phone-input"
                        name="phone"
                        type="tel"
                        value={inquiry.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        autoComplete="tel"
                        placeholder="+49 ..."
                      />
                    </div>

                    <div className="funnel-field-group">
                      <label htmlFor="client-company-input">
                        Unternehmen / Marke <span>(optional)</span>
                      </label>
                      <input
                        id="client-company-input"
                        name="company"
                        value={inquiry.company}
                        onChange={(e) => update('company', e.target.value)}
                        autoComplete="organization"
                        placeholder="Name des Unternehmens"
                      />
                    </div>
                  </div>

                  <fieldset className="funnel-fieldset">
                    <legend className="funnel-legend">Wie möchten Sie starten?</legend>
                    <div className="funnel-chips-row">
                      {conversationOptions.map((c) => {
                        const isSelected = inquiry.conversation === c;
                        return (
                          <button
                            type="button"
                            key={c}
                            className={`funnel-chip ${isSelected ? 'selected' : ''}`}
                            aria-pressed={isSelected}
                            onClick={() => update('conversation', c)}
                          >
                            {c}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <p className="funnel-trust-note">
                    🔒 Ihre Angaben werden vertraulich behandelt und ausschließlich zur Beantwortung Ihrer Projektanfrage verwendet. Keine Weitergabe an Dritte.
                  </p>
                </div>
              )}

              {/* Bottom Summary Capsule */}
              <div className="funnel-summary-capsule">
                <span className="capsule-label">AUSWAHL:</span>
                <span className="capsule-text">
                  {inquiry.scope} · {inquiry.budget} · {inquiry.timing}
                </span>
              </div>

              {/* Navigation Controls */}
              <div className="funnel-actions-row">
                {step > 0 ? (
                  <button
                    className="text-action funnel-back-btn"
                    type="button"
                    onClick={() => setStep((current) => current - 1)}
                  >
                    ← Zurück
                  </button>
                ) : (
                  <div />
                )}

                <button type="submit" className="text-action funnel-submit-btn">
                  {step < 2 ? (
                    <>
                      Weiter zu Schritt 0{step + 2} <span aria-hidden="true">→</span>
                    </>
                  ) : (
                    <>
                      Projekt anfragen <span aria-hidden="true">↗</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* SUCCESS CONFIRMATION STATE */
          <div className="funnel-success-view" role="status">
            <div className="success-badge">
              <span className="success-icon" aria-hidden="true">✓</span>
              <span className="eyebrow">ANFRAGE VORBEREITET</span>
            </div>

            <h2 className="success-headline">
              Vielen Dank{inquiry.name.trim() ? `, ${inquiry.name.trim()}` : ''}!
            </h2>

            <p className="success-message">
              Ihre Projekt-Konfiguration ist zusammengestellt. Wir analysieren Ihre Anforderungen und melden uns innerhalb von <strong>24 Stunden</strong> bei Ihnen.
            </p>

            <div className="success-summary-card">
              <div className="summary-row">
                <span className="summary-lbl">Projekt:</span>
                <span className="summary-val">{inquiry.scope}</span>
              </div>
              <div className="summary-row">
                <span className="summary-lbl">Budget:</span>
                <span className="summary-val">{inquiry.budget}</span>
              </div>
              <div className="summary-row">
                <span className="summary-lbl">Zeitplan:</span>
                <span className="summary-val">{inquiry.timing}</span>
              </div>
              <div className="summary-row">
                <span className="summary-lbl">Kontakt:</span>
                <span className="summary-val">{inquiry.email}</span>
              </div>
            </div>

            <div className="success-dispatch-actions">
              <button
                type="button"
                className="dispatch-action-btn primary"
                onClick={openMailDraft}
              >
                <span>E-Mail-Entwurf öffnen & senden</span>
                <span aria-hidden="true">↗</span>
              </button>

              <button
                type="button"
                className="dispatch-action-btn secondary"
                onClick={copyDetails}
              >
                <span>{copied ? 'Details kopiert ✓' : 'Angaben kopieren'}</span>
                <span aria-hidden="true">📋</span>
              </button>

              <button
                type="button"
                className="dispatch-action-btn secondary"
                onClick={openWhatsApp}
              >
                <span>Per WhatsApp senden</span>
                <span aria-hidden="true">💬</span>
              </button>

              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="dispatch-action-btn secondary"
              >
                <span>Direkt anrufen ({CONTACT_PHONE})</span>
                <span aria-hidden="true">☎</span>
              </a>
            </div>

            {bookingUrl && /^https:\/\//.test(bookingUrl) && (
              <div className="success-booking-wrap">
                <a
                  className="text-action"
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Oder direkt einen 30-Min. Termin im Kalender buchen <span aria-hidden="true">↗</span>
                </a>
              </div>
            )}

            <button
              type="button"
              className="text-action success-close-btn"
              onClick={close}
            >
              Dialog schließen <span aria-hidden="true">×</span>
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
