export interface CardBg {
  id: number;
  bgcolor: string;
}

interface Feature {
  id: string;
  title: string;
  description: string;
}

export const CARD_BG: CardBg[] = [
  { id: 1, bgcolor: "linear-gradient(135deg, #e6f8f3 0%, #f7fcfa 100%)" },
  { id: 2, bgcolor: "linear-gradient(135deg, #fef9e7 0%, #fffdf4 100%)" },
  { id: 3, bgcolor: "linear-gradient(135deg, #eaf7ff 0%, #ff3fbff 100%)" },
  { id: 4, bgcolor: "linear-gradient(135deg, #fff2e9 0%, #fff8f3 100%)" },
  { id: 5, bgcolor: "linear-gradient(135deg, #e7f6fe 0%, #f4fafd 100%)" },
  { id: 6, bgcolor: "linear-gradient(135deg, #f5f5f5 0%, #fbfbfb 100%)" },
  { id: 7, bgcolor: "linear-gradient(135deg, #fff4fc 0%, #fff8fd 100%)" },
  { id: 8, bgcolor: "linear-gradient(135deg, #e8fef3 0%, #f5fef8 100%)" },
  { id: 9, bgcolor: "linear-gradient(135deg, #f0ecff 0%, #f7f5ff 100%)" },
  { id: 10, bgcolor: "linear-gradient(135deg, #fef2f2 0%, #fff8f8 100%)" },
];

interface Feature {
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
