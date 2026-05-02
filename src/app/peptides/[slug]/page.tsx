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
  return { title: `${peptide.name} — Peptide Analyzer`, description: peptide.description };
}

export default function PeptideDetailPage({ params }: { params: { slug: string } }) {
  const peptide = getPeptideBySlug(params.slug);
  if (!peptide) notFound();
  const category = getCategoryBySlug(peptide.category);

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] mb-10">
        <Link href="/peptides" className="hover:text-[var(--accent)] transition-colors">peptides</Link>
        <span>/</span>
        <span className="text-[var(--accent)]">{peptide.slug}</span>
      </div>

      {/* Header */}
      <div className="mb-12 opacity-0 animate-fade-up">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border border-[var(--border)] text-[var(--accent)] bg-[var(--accent-muted)]">
            {category?.icon} {category?.name}
          </span>
          {peptide.legalStatus && (
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-mono tracking-wider border border-[var(--border)] text-[var(--text-muted)]">
              {peptide.legalStatus}
            </span>
          )}
        </div>

        <h1 className="font-display italic text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gradient-green mb-2">
          {peptide.name}
        </h1>
        <p className="font-heading text-lg text-[var(--text-secondary)]">{peptide.fullName}</p>
        <p className="mt-6 text-[var(--text-secondary)] leading-relaxed max-w-3xl">{peptide.description}</p>

        {/* Molecular info */}
        {(peptide.molecularFormula || peptide.molecularWeight) && (
          <div className="mt-8 flex gap-8 flex-wrap">
            {peptide.molecularFormula && (
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-1">Formula</p>
                <p className="font-mono text-sm text-[var(--accent)]">{peptide.molecularFormula}</p>
              </div>
            )}
            {peptide.molecularWeight && (
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-1">Weight</p>
                <p className="font-mono text-sm text-[var(--text)]">{peptide.molecularWeight}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="line-glow mb-10" />

      {/* Tabs */}
      <div className="opacity-0 animate-fade-up delay-200">
        <DetailTabs peptide={peptide} />
      </div>

      {/* Disclaimer */}
      <div className="mt-16 card p-5 border-amber-900/30 bg-amber-950/5">
        <p className="text-sm text-amber-200/50 leading-relaxed">
          <strong className="text-amber-400">Disclaimer:</strong> This information is for educational purposes only and is not medical advice. Many peptides are not FDA-approved. Always consult a healthcare professional.{" "}
          <Link href="/disclaimer" className="underline underline-offset-2 text-amber-400/70 hover:text-amber-400 transition-colors">Full disclaimer</Link>
        </p>
      </div>
    </div>
  );
}
