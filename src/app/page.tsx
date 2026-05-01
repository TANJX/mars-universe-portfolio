import { Intro } from "@/components/Intro";
import { MarsLogo } from "@/components/MarsLogo";
import { ProjectsList } from "@/components/ProjectsList";
import { Socials } from "@/components/Socials";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[600px] flex-col px-6 py-24 sm:py-32">
      <header className="flex items-center gap-3 mb-2">
        <MarsLogo />
        <span className="sr-only">Mars Tan</span>
      </header>

      <Intro />

      <Socials />

      <ProjectsList />
    </main>
  );
}
