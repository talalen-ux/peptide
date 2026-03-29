import { getAllPeptides, getPeptideBySlug, getCategoryBySlug } from "@/lib/peptides";
import { notFound } from "next/navigation";
import Link from "next/link";
import DetailTabs from "./DetailTabs";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllPeptides().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const peptide = getPeptideBySlug(params.slug);
  if (!peptide) return { title: "Not Found" };
  return {
    title: `${peptide.name} - Peptide Analyzer`,
    description: peptide.description,
  };
}

export default function PeptideDetailPage({ params }: { params: { slug: string } }) {
  const peptide = getPeptideBySlug(params.slug);
  if (!peptide) notFound();

  const category = getCategoryBySlug(peptide.category);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/peptides" className="hover:text-gray-300">Peptides</Link>
        <span>/</span>
        <span className="text-gray-300">{peptide.name}</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{category?.icon}</span>
          <span className="rounded-full bg-primary-900/50 px-3 py-1 text-xs text-primary-300 font-medium">
            {category?.name}
          </span>
          {peptide.legalStatus && (
            <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
              {peptide.legalStatus}
            </span>
          )}
        </div>
        <h1 className="text-4xl font-bold">{peptide.name}</h1>
        <p className="text-lg text-gray-400 mt-1">{peptide.fullName}</p>
        <p className="mt-4 text-gray-300 leading-relaxed">{peptide.description}</p>

        {(peptide.molecularFormula || peptide.molecularWeight) && (
          <div className="mt-6 flex gap-6 flex-wrap">
            {peptide.molecularFormula && (
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Formula</span>
                <p className="text-sm font-mono text-gray-300">{peptide.molecularFormula}</p>
              </div>
            )}
            {peptide.molecularWeight && (
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Molecular Weight</span>
                <p className="text-sm text-gray-300">{peptide.molecularWeight}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tabbed Content */}
      <DetailTabs peptide={peptide} />

      {/* Disclaimer */}
      <div className="mt-12 rounded-xl border border-yellow-800/50 bg-yellow-950/30 p-5">
        <p className="text-sm text-yellow-200/70">
          <strong className="text-yellow-400">Disclaimer:</strong> This information is for educational purposes only and is not medical advice.
          Many peptides are not FDA-approved for human use. Always consult a healthcare professional before use.{" "}
          <Link href="/disclaimer" className="underline">Full disclaimer</Link>
        </p>
      </div>
    </div>
  );
}
