export type Skill = {
  name: string
  category: "language" | "framework" | "database" | "tool"
  level: "familiar" | "intermediate" | "proficient"
  icon?: string // untuk Three.js/Spline icon nanti
}

export type SoftSkill = {
  name: string
}

export const hardSkills: Skill[] = [
  // Languages
  { name: "JavaScript", category: "language", level: "proficient" },
  { name: "TypeScript", category: "language", level: "proficient" },
  { name: "Python", category: "language", level: "intermediate" },

  // Frameworks & Libraries
  { name: "React", category: "framework", level: "proficient" },
  { name: "Next.js", category: "framework", level: "proficient" },
  { name: "Node.js", category: "framework", level: "intermediate" },
  { name: "Express.js", category: "framework", level: "intermediate" },

  // Databases
  { name: "MongoDB", category: "database", level: "intermediate" },
  { name: "Supabase", category: "database", level: "intermediate" },
  { name: "Convex", category: "database", level: "intermediate" },

  // Tools & Design
  { name: "Git", category: "tool", level: "proficient" },
  { name: "Figma", category: "tool", level: "intermediate" },
  { name: "Tailwind CSS", category: "tool", level: "proficient" },
  { name: "Shadcn", category: "tool", level: "intermediate" },
]

export const softSkills: SoftSkill[] = [
  { name: "Communication" },
  { name: "Problem Solving" },
  { name: "Adaptability" },
  { name: "Time Management" },
]

// Grouping untuk tampilan di UI
export const skillsByCategory = {
  languages: hardSkills.filter((s) => s.category === "language"),
  frameworks: hardSkills.filter((s) => s.category === "framework"),
  databases: hardSkills.filter((s) => s.category === "database"),
  tools: hardSkills.filter((s) => s.category === "tool"),
}
