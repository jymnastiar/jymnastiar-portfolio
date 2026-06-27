export type Experience = {
  id: number
  company: string
  role: string
  type: "work" | "organization"
  period: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Vinix7",
    role: "UI/UX & Web Developer Intern",
    type: "work",
    period: "Feb 2026 – Present",
    startDate: "2026-02",
    endDate: "",
    current: true,
    description: [
      "Developed an end-to-end sports field booking application, featuring an intuitive UI/UX and a dynamic scheduling system that allows users to easily manage and reschedule bookings.",
      "Built a secure admin panel utilizing a Next.js proxy to streamline venue management, user operations, and real-time schedule tracking.",
    ],
  },
  {
    id: 2,
    company: "BEMP Matematika UNJ",
    role: "Head of Professional and Academic Affairs Department",
    type: "organization",
    period: "Mar 2024 – Feb 2026",
    startDate: "2024-03",
    endDate: "2026-02",
    current: false,
    description: [
      "Spearheaded the planning and execution of academic workshops, seminars, and study groups to support students' educational development and career prospects.",
      "Coordinated with faculty members and professional organizations to provide relevant resources and networking opportunities for students.",
    ],
  },
  {
    id: 3,
    company: "Ikatan Lembaga Penalaran dan Penelitian Mahasiswa Indonesia (ILP2MI)",
    role: "Public Relations Coordinator",
    type: "organization",
    period: "May 2024 – Dec 2025",
    startDate: "2024-05",
    endDate: "2025-12",
    current: false,
    description: [
      "Managed and coordinated communication strategies across Regional II to strengthen networking and collaboration between student research institutions.",
      "Facilitated information dissemination and maintained professional relationships with external stakeholders to enhance organizational visibility.",
    ],
  },
  {
    id: 4,
    company: "Kelompok Peneliti Muda UNJ",
    role: "Research Member",
    type: "organization",
    period: "Nov 2023 – Nov 2025",
    startDate: "2023-11",
    endDate: "2025-11",
    current: false,
    description: [
      "Contributed to collaborative research projects and explored various analytical frameworks within the university's academic community.",
      "Won nine national and one international scientific essay competitions.",
    ],
  },
]
