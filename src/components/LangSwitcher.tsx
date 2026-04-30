"use client";

import { LANGS, useLang } from "./LangContext";

export function LangSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div
      className="fixed top-6 right-6 z-10 flex gap-4 text-[14px] text-muted sm:top-8 sm:right-8"
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => {
        const active = l.id === lang;
        return (
          <button
            key={l.id}
            type="button"
            onClick={() => setLang(l.id)}
            aria-pressed={active}
            className={
              active
                ? "text-foreground"
                : "cursor-pointer transition-opacity hover:opacity-60"
            }
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
