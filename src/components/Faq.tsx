import { useState } from 'react';

const questions = [
  {
    question: 'Welche Art von Projekten setzt MARGIN um?',
    answer: 'Wir konzipieren und entwickeln maßgeschneiderte Websites, Flagship-E-Commerce-Erlebnisse und digitale Markenauftritte. Der Ausgangspunkt ist stets Ihr Geschäftsmodell, Ihre Zielgruppe und der strategische Anspruch der Marke.'
  },
  {
    question: 'Können Sie mit einer bestehenden Markenidentität arbeiten?',
    answer: 'Ja. Wir übersetzen gewachsene Identitäten in ein hochgradig präzises digitales Erlebnis oder schärfen die visuelle Richtung, Typografie und Kinetik für den digitalen Raum.'
  },
  {
    question: 'Wie läuft der Start eines gemeinsamen Projekts ab?',
    answer: 'Im ersten Schritt teilen Sie Ihre Ziele und Herausforderungen mit uns. Wir analysieren das Briefing, schärfen gemeinsam den Umfang und definieren eine klare These, bevor die parallele Gestaltungs- und Code-Arbeit beginnt.'
  },
  {
    question: 'Wie gestalten sich Zeitrahmen und Investition?',
    answer: 'Beides richtet sich nach Umfang, Funktionalität und technischer Komplexität. Im Erstgespräch klären wir den realistischen Zeitrahmen und besprechen die Investition transparent.'
  },
  {
    question: 'Wie wird die mobile Nutzererfahrung gewährleistet?',
    answer: 'Mobile wird von Beginn an gleichwertig gedacht. Lesbarkeit, Touch-Bedienung, Bildausschnitte und Ladeverhalten prüfen wir über unterschiedliche Bildschirmgrößen hinweg.'
  }
];

export function Faq({ onOpenInquiry }: { onOpenInquiry: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="faq section-pad" data-theme="light" aria-labelledby="faq-title">
      <div className="page-container faq-layout">
        <div className="faq-intro">
          <p className="eyebrow section-label">Vor dem Start</p>
          <h2 id="faq-title">
            <span className="faq-title-line"><span>Gute Fragen.</span></span>
            <span className="faq-title-line"><span><em>Klare Antworten.</em></span></span>
          </h2>
          <p className="faq-intro-text">Haben Sie ein konkretes Vorhaben oder offene Fragen?</p>
          <button className="text-action faq-intro-cta" onClick={onOpenInquiry}>
            Sprechen Sie mit uns <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="faq-list">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className="faq-item" key={item.question} data-faq-open={isOpen ? 'true' : 'false'}>
                <h3>
                  <button
                    id={`faq-question-${index}`}
                    className="faq-question"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="faq-number">0{index + 1}</span>
                    <span className="faq-question-text">{item.question}</span>
                    <span className="faq-toggle" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        <line x1="9" y1="2" x2="9" y2="16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
