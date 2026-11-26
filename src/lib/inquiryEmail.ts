// Project requests go to the inbox provided by the studio owner.
export const INQUIRY_EMAIL = 'hello@marginwebdesign.online';

export function inquiryMailto(subject: string, body: string) {
  const cleanSubject = subject.replace(/[\r\n]+/g, ' ');
  return `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(cleanSubject)}&body=${encodeURIComponent(body)}`;
}
