"use client";

import Link from "next/link";
import { useLang } from "./LangContext";
import { BACK_LABEL, type Project } from "@/data/projects";
import { VideoPlayer } from "./VideoPlayer";

export function ProjectClient({ project }: { project: Project }) {
  const { lang } = useLang();
  const title = project.title[lang];
  const description = project.description[lang];

  return (
    <main className="mx-auto flex min-h-dvh max-w-[600px] flex-col px-6 py-24 sm:py-32">
      <Link href="/" className="text-muted no-underline self-start">
        {BACK_LABEL[lang]}
      </Link>

      <section className="mt-12 text-[17px] leading-[1.65]">
        <h1 className="text-[28px] font-medium tracking-tight">{title}</h1>
        <p className="text-muted mt-1 text-[14px]">
          {project.year} · {description}
        </p>

        {project.video && (
          <div className="mt-8">
            <VideoPlayer
              src={project.video.src}
              poster={project.video.poster}
              loop={project.video.loop}
              youtubeId={project.video.youtubeId}
              title={title}
            />
          </div>
        )}
      </section>
    </main>
  );
}
