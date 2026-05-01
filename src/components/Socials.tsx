"use client";

import { useLang } from "./LangContext";
import { SOCIAL_LABELS } from "@/data/socials";

export function Socials() {
  const { lang } = useLang();
  const labels = SOCIAL_LABELS[lang];

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
