"use client";

import { useLang } from "./LangContext";
import { INTRO_CONTENT } from "@/data/intro";

export function Intro() {
  const { lang } = useLang();
  const { name, role, paragraphs } = INTRO_CONTENT[lang];

  return (
    <section className="space-y-10 text-[17px] leading-[1.65] text-foreground">
      <div>
        <h1 className="text-[28px] font-medium tracking-tight">{name}</h1>
        <p className="text-muted">{role}</p>
      </div>

      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </section>
  );
}
