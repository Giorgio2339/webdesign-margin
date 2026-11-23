import { useState, type FormEvent } from 'react';
import { SubpageHeader } from '../components/SubpageHeader';
import { Footer } from '../components/Footer';
import { CONTACT_EMAIL } from '../data/media';
import { inquiryMailto } from '../lib/inquiryEmail';
import { routePath } from '../i18n/locale';

interface Props { onNavigateHome: () => void; onNavigateRoute: (route: string) => void }
export function EnglishInquiryPage({ onNavigateHome, onNavigateRoute }: Props) {
  const [project, setProject] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [budget, setBudget] = useState('');
  const [timing, setTiming] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = `Hello MARGIN,\n\nI would like to discuss a project.\n\nProject: ${project}\nBudget: ${budget || 'To discuss'}\nTiming: ${timing || 'To discuss'}\n\n${message.trim()}\n\nName: ${name.trim()}\nEmail: ${email.trim()}`;
    window.location.href = inquiryMailto(`Project enquiry — ${project} — ${name.trim()}`, body);
  };
  return <div className="subpage-shell english-inquiry" data-theme="dark">
    <SubpageHeader onNavigateHome={onNavigateHome} currentTitle="Project enquiry" showInquiryButton={false} />
    <main className="page-container english-inquiry-main">
      <div className="english-inquiry-intro">
        <p className="eyebrow">A considered beginning</p>
        <h1>Tell us what<br /><em>you have in mind.</em></h1>
        <p>A few details are enough to start a useful conversation. We will respond personally and help define the right next step.</p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-action">Prefer a direct email? <span aria-hidden="true">↗</span></a>
      </div>
      <form className="english-inquiry-form" onSubmit={submit}>
        <label>What are you looking to create? <span>*</span>
          <select required value={project} onChange={event => setProject(event.target.value)}>
            <option value="">Select a project type</option>
            <option>Bespoke website</option><option>Website redesign</option><option>Digital art direction</option><option>Commerce experience</option><option>Something else</option>
          </select>
        </label>
        <label>Tell us about your project <span>*</span>
          <textarea required minLength={20} rows={5} value={message} onChange={event => setMessage(event.target.value)} placeholder="What are you hoping to achieve?" />
        </label>
        <div className="english-inquiry-row">
          <label>Indicative budget
            <select value={budget} onChange={event => setBudget(event.target.value)}>
              <option value="">To discuss</option><option>Under £2,000</option><option>£2,000–£5,000</option><option>£5,000–£10,000</option><option>Over £10,000</option>
            </select>
          </label>
          <label>Ideal timing
            <select value={timing} onChange={event => setTiming(event.target.value)}>
              <option value="">To discuss</option><option>As soon as possible</option><option>Within 1–2 months</option><option>Later this year</option>
            </select>
          </label>
        </div>
        <div className="english-inquiry-row">
          <label>Your name <span>*</span><input required autoComplete="name" value={name} onChange={event => setName(event.target.value)} /></label>
          <label>Email address <span>*</span><input required type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} /></label>
        </div>
        <p className="english-inquiry-privacy">Submitting opens your email application with the brief prepared for you. <a href={routePath('datenschutz', 'en')}>Privacy information ↗</a></p>
        <button type="submit" className="english-inquiry-submit">Prepare enquiry <span aria-hidden="true">↗</span></button>
      </form>
    </main>
    <Footer onOpenLegal={tab => onNavigateRoute(routePath(tab === 'cookies' ? 'datenschutz' : tab, 'en'))} onOpenInquiry={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
  </div>;
}
