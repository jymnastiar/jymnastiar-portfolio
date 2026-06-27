export type Certificate = {
  id: number
  title: string
  issuer: string
  year: string
  category: "achievement" | "certification"
  rank?: string
  thumbnail?: string // path ke foto sertifikat
}

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Harmoni Cinta Guru Essay Competition",
    issuer: "National",
    year: "2023",
    category: "achievement",
    rank: "1st Place Winner",
    thumbnail: "/assets/images/certificates/cert-1.webp",
  },
  {
    id: 2,
    title: "National Essay Competition Bidikmisi Award",
    issuer: "National",
    year: "2023",
    category: "achievement",
    rank: "2nd Place Winner",
    thumbnail: "/assets/images/certificates/cert-2.webp",
  },
  {
    id: 3,
    title: "Pekan Ilmiah Fisika ke-21 (Essay Category)",
    issuer: "National",
    year: "2023",
    category: "achievement",
    rank: "2nd Place Winner",
    thumbnail: "/assets/images/certificates/cert-3.webp",
  },
  {
    id: 4,
    title: "Mathlicious International Essay Competition",
    issuer: "International",
    year: "2023",
    category: "achievement",
    rank: "2nd Place Winner",
    thumbnail: "/assets/images/certificates/cert-4.webp",
  },
  {
    id: 5,
    title: "Outstanding Student Award FMIPA Student Award",
    issuer: "Universitas Negeri Jakarta",
    year: "2024",
    category: "achievement",
    rank: "3rd Place Winner",
    thumbnail: "/assets/images/certificates/cert-5.webp",
  },
  {
    id: 6,
    title: "7th Islamic Economic Festival (Essay Category)",
    issuer: "National",
    year: "2024",
    category: "achievement",
    rank: "3rd Place Winner",
    thumbnail: "/assets/images/certificates/cert-6.webp",
  },
  {
    id: 7,
    title: "LOGIKA UI (Essay Category)",
    issuer: "Universitas Indonesia",
    year: "2025",
    category: "achievement",
    rank: "3rd Place Winner",
    thumbnail: "/assets/images/certificates/cert-7.webp",
  },
  {
    id: 8,
    title: "POLINELA Research Competition (Essay Category)",
    issuer: "National",
    year: "2023",
    category: "achievement",
    rank: "2nd Honorable Mention",
    thumbnail: "/assets/images/certificates/cert-8.webp",
  },
  {
    id: 9,
    title: "HK Expertalk Essay Competition",
    issuer: "National",
    year: "2023",
    category: "achievement",
    rank: "2nd Honorable Mention",
    thumbnail: "/assets/images/certificates/cert-9.webp",
  },
  {
    id: 10,
    title: "Formabisa Innovation Challenge Essay National",
    issuer: "National",
    year: "2023",
    category: "achievement",
    rank: "3rd Honorable Mention",
    thumbnail: "/assets/images/certificates/cert-10.webp",
  },
]
