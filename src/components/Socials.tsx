"use client";

import { useLang, type Lang } from "./LangContext";

type Labels = {
  linkedin: string;
  github: string;
  email: string;
  archive: string;
};

const LABELS: Record<Lang, Labels> = {
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

export function Socials() {
  const { lang } = useLang();
  const labels = LABELS[lang];

  return (
    <nav className="mt-16 flex flex-wrap gap-x-6 gap-y-2 text-muted">
      <a
        href="https://www.linkedin.com/in/marstanjx"
        target="_blank"
        rel="noreferrer"
      >
        {labels.linkedin}
      </a>
      <a
        href="https://github.com/TANJX"
        target="_blank"
        rel="noreferrer"
      >
        {labels.github}
      </a>
      <a href="mailto:marstanjx@gmail.com">{labels.email}</a>
      <a
        href="https://archive.marstanjx.com"
        target="_blank"
        rel="noreferrer"
      >
        {labels.archive}
      </a>
    </nav>
  );
}
