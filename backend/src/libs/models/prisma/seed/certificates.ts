const mockCertificates = [
  'mock-images/certificates-and-diplomas/certificate-1.pdf',
  'mock-images/certificates-and-diplomas/certificate-2.pdf',
  'mock-images/certificates-and-diplomas/certificate-3.pdf',
  'mock-images/certificates-and-diplomas/certificate-4.pdf',
  'mock-images/certificates-and-diplomas/certificate-5.pdf',
  'mock-images/certificates-and-diplomas/certificate-6.pdf',
]

export function getRandomCertificates() {
  const shuffledCertificates = mockCertificates.sort(() => 0.5 - Math.random());
  const randomCount = Math.floor(Math.random() * 6) + 1;
  return shuffledCertificates.slice(0, randomCount);
}
