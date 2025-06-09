import { Metadata } from "next";
import { LocalizedPageProps } from "src/types/intl";

import { getTranslations } from "next-intl/server";

import VisionPageSections from "src/components/vision/VisionSections";

async function getProjects(): Promise<string> {
  const res = await fetch(`https://www.uuidgenerator.net/api/version7`, {
    cache: "no-store",
  });
  const projects = await res.text();

  return projects;
}

export async function generateMetadata({ params }: LocalizedPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const meta: Metadata = {
    title: t("Vision.pageTitle"),
    description: t("Index.metaDescription"),
  };
  return meta;
}

export default function Vision() {
  return <VisionPageSections test={getProjects()} />;
}
