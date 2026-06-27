export type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  thumbnail: string;
  liveUrl: string;
  githubUrl: string;
  group: 1 | 2; // group 1 = section 2, group 2 = section 3
  position: "left" | "right";
  date: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Tri-Ace Booking",
    description:
      "End-to-end sports field booking application featuring an intuitive UI/UX and a dynamic scheduling system that allows users to easily manage and reschedule bookings. Built with a secure admin panel utilizing Next.js proxy.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    thumbnail: "/assets/images/projects/project-1/thumbnail.webp",
    liveUrl: "https://tri-ace-booking.vercel.app/",
    githubUrl: "https://github.com/jymnastiar/Tri-Ace-Booking",
    group: 1,
    position: "left",
    date: "Feb 2026",
  },
  {
    id: 2,
    title: "Dotripple",
    description:
      "High-performance full-stack blogging platform featuring dynamic article publication, seamless image uploads, and real-time data fetching powered by Convex. Includes comprehensive user profile management with unique shareable author page URLs.",
    techStack: ["Next.js", "TypeScript", "Convex", "Tailwind CSS"],
    thumbnail: "/assets/images/projects/project-2/thumbnail.webp",
    liveUrl: "https://dotripple.vercel.app/",
    githubUrl: "https://github.com/jymnastiar/dotripple-platform",
    group: 1,
    position: "right",
    date: "Jun 2026",
  },
  {
    id: 3,
    title: "E-Commerce Application",
    description:
      "Responsive full-stack e-commerce platform integrated with secure user authentication, product filtering, and an intuitive shopping cart management system. Features optimized database schemas for managing product inventories, user orders, and checkout workflows.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB"],
    thumbnail: "/assets/images/projects/project-3/thumbnail.webp",
    liveUrl: "",
    githubUrl: "https://github.com/jymnastiar/E-Commerce-App",
    group: 2,
    position: "left",
    date: "Aug 2026",
  },
  {
    id: 4,
    title: "Todo App",
    description:
      "A lightweight, highly responsive task manager built with React, Vite, and Tailwind CSS. Features real-time state updates, local storage persistence, interactive category filtering, and clean visual indicators for completed items.",
    techStack: ["React", "Vite", "Tailwind CSS"],
    thumbnail: "/assets/images/projects/project-4/thumbnail.webp",
    liveUrl: "https://todo-vite-app-jym.vercel.app/",
    githubUrl: "https://github.com/jymnastiar/todo-vite-app",
    group: 2,
    position: "right",
    date: "2026",
  },
];
