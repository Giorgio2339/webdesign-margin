import { useState } from 'react';
import { HOME } from '../i18n/home';
import { useLocale } from '../i18n/useLocale';

export function Faq({ onOpenInquiry }: { onOpenInquiry: () => void }) {
  const t = HOME[useLocale()].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="faq section-pad" data-theme="light" aria-labelledby="faq-title">
      <div className="page-container faq-layout">
        <div className="faq-intro">
          <p className="eyebrow section-label">{t.label}</p>
          <h2 id="faq-title">
            <span className="faq-title-line"><span>{t.titleA}</span></span>
            <span className="faq-title-line"><span><em>{t.titleB}</em></span></span>
          </h2>
          <p className="faq-intro-text">{t.intro}</p>
          <button className="text-action faq-intro-cta" onClick={onOpenInquiry}>
            {t.cta} <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="faq-list">
          {t.questions.map((item, index) => {
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
