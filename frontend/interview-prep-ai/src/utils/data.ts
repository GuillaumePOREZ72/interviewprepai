export interface Feature {
  id: string;
  title: string;
  description: string;
}

export const APP_FEATURES: Feature[] = [
  {
    id: "01",
    title: "No More Generic Questions",
    description:
      "Get questions that actually match your interview—tailored by role, experience, and specific tech areas you need.",
  },
  {
    id: "02",
    title: "Learn at Your Speed",
    description:
      "Reveal answers only when you're ready. Need more context? Request detailed AI explanations instantly.",
  },
  {
    id: "03",
    title: "Never Lose Track",
    description:
      "Pin critical questions, add your own insights, and keep your most important prep material front and center.",
  },
  {
    id: "04",
    title: "Understand, Don't Memorize",
    description:
      "Go beyond simple answers. Get comprehensive concept breakdowns that help you actually understand the material.",
  },
  {
    id: "05",
    title: "All Your Prep, One Place",
    description:
      "Save unlimited sessions, organize by interview or topic, and access your entire prep history anytime.",
  },
];
