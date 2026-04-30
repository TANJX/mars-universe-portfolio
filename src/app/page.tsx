import { Intro } from "@/components/Intro";
import { LangProvider } from "@/components/LangContext";
import { LangSwitcher } from "@/components/LangSwitcher";
import { MarsLogo } from "@/components/MarsLogo";

export default function Home() {
  return (
    <LangProvider>
      <LangSwitcher />
      <main className="mx-auto flex min-h-dvh max-w-[600px] flex-col px-6 py-24 sm:py-32">
        <header className="flex items-center gap-3 mb-2">
          <MarsLogo />
          <span className="sr-only">Mars Tan</span>
        </header>

        <Intro />

        <nav className="mt-16 flex flex-wrap gap-x-6 gap-y-2 text-muted">
          <a
            href="https://www.linkedin.com/in/marstanjx"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/marstanjx"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:mars@instalily.ai">Email</a>
          <a href="/archive">Archive</a>
        </nav>
      </main>
    </LangProvider>
  );
}
