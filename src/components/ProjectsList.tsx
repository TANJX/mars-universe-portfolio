"use client";

import Link from "next/link";
import { useLang } from "./LangContext";
import { PROJECTS, SECTION_LABEL, type Project } from "@/data/projects";

function ProjectRow({ project }: { project: Project }) {
  const { lang } = useLang();
  const title = project.title[lang];
  const description = project.description[lang];
  const isExternal = !!project.url;

  const rowContent = (
    <>
      <span className="font-medium underline-offset-[3px] decoration-1 group-hover:underline">
        {title}
      </span>
      <span className="text-muted">{description}</span>
      <span className="text-muted text-[14px] font-mono">{project.year}</span>
    </>
  );

  const rowClass =
    "group flex flex-col gap-y-0.5 no-underline sm:grid sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-x-2";

  return (
    <li>
      {isExternal ? (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer noopener"
          className={rowClass}
        >
          {rowContent}
        </a>
      ) : (
        <Link href={`/project/${project.slug}`} className={rowClass}>
          {rowContent}
        </Link>
      )}
    </li>
  );
}

export function ProjectsList() {
  const { lang } = useLang();
  const sorted = [...PROJECTS].sort((a, b) => b.year - a.year);

  return (
    <section className="mt-24 sm:mt-36 text-[17px] leading-[1.65]">
      <h2 className="mb-4 text-[13px] text-muted">{SECTION_LABEL[lang]}</h2>
      <ul className="flex flex-col gap-y-3">
        {sorted.map((p) => (
          <ProjectRow key={p.slug ?? p.url} project={p} />
        ))}
      </ul>
    </section>
  );
}
