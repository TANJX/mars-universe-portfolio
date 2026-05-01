import { notFound } from "next/navigation";
import { ProjectClient } from "@/components/ProjectClient";
import { PROJECTS } from "@/data/projects";

export function generateStaticParams() {
  return PROJECTS.filter((p) => p.slug).map((p) => ({ slug: p.slug! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  const title = project.title.en;
  return {
    title: `${title} — Mars Tan`,
    description: project.description.en,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectClient project={project} />;
}
