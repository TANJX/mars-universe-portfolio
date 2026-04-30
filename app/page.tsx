import { MarsLogo } from "@/components/MarsLogo";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[600px] flex-col px-6 py-24 sm:py-32">
      <header className="mb-12 flex items-center gap-3">
        <MarsLogo />
        <span className="sr-only">Mars Tan</span>
      </header>

      <section className="space-y-10 text-[17px] leading-[1.65] text-[--color-fg]">
        <div className="space-y-2">
          <h1 className="text-[34px] font-semibold tracking-tight text-white">
            Mars Tan
          </h1>
          <p className="text-[--color-muted]">
            Senior Design Engineer at{" "}
            <a
              href="https://instalily.ai"
              target="_blank"
              rel="noreferrer"
              className="text-[--color-fg]"
            >
              InstaLILY AI
            </a>
            .
          </p>
        </div>

        <p>
          From the start of my education, I couldn&apos;t let go of either the
          opportunity to create something visual or build something meaningful.
          I studied Arts, Technology, and Business of Innovation at USC Iovine
          and Young Academy.
        </p>

        <p>
          At InstaLILY, I build customer-facing AI-native experiences and the
          systems behind them, from design systems as infrastructure to
          workflow tooling that helps teams build and ship better products.
        </p>

        <p>
          I speak English, 中文, and{" "}
          <a
            href="https://notes.marstanjx.com/n5/chapter/1/"
            target="_blank"
            rel="noreferrer"
          >
            日本語
          </a>
          .
        </p>
      </section>

      <nav className="mt-16 flex flex-wrap gap-x-6 gap-y-2 text-[--color-muted]">
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
  );
}
