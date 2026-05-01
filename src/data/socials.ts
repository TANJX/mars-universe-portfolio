import type { Lang } from "@/components/LangContext";

export type SocialLabels = {
  linkedin: string;
  github: string;
  email: string;
  archive: string;
};

export const SOCIAL_LABELS: Record<Lang, SocialLabels> = {
  en: {
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    archive: "Archive",
  },
  zh: {
    linkedin: "领英",
    github: "GitHub",
    email: "邮箱",
    archive: "旧版网站",
  },
  ja: {
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "メール",
    archive: "アーカイブ",
  },
};
