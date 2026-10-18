import { CONTACT_EMAIL } from '../data/media';

export type InquiryMessage = { name: string; email: string; subject: string; message: string; honey: string };

// FormSubmit's public endpoint needs no secret in the browser. The receiving
// mailbox must confirm the service's activation email once before live use.
export async function sendInquiry(data: InquiryMessage, signal: AbortSignal) {
  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: 'POST',
    credentials: 'omit',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    signal,
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      message: data.message,
      _subject: data.subject,
      _replyto: data.email,
      _template: 'table',
      _honey: data.honey,
      _url: 'https://marginwebdesign.online/anfrage'
    })
  });
  const result: unknown = await response.json();
  if (!response.ok || !result || typeof result !== 'object' || !('success' in result)
      || (result.success !== true && result.success !== 'true')) {
    throw new Error('Anfrage konnte nicht bestätigt werden.');
  }
}
