import { getAllPeptides, getPeptideBySlug } from "@/lib/peptides";
import { notFound } from "next/navigation";
import Link from "next/link";
import PeptideDetailTabs from "@/components/PeptideDetailTabs";
import type { Metadata } from "next";

const categoryColors: Record<string, string> = {
  "healing-recovery": "bg-green-100 text-green-800",
  "growth-hormone": "bg-blue-100 text-blue-800",
  "cognitive": "bg-purple-100 text-purple-800",
  "immune": "bg-yellow-100 text-yellow-800",
  "sexual-health": "bg-pink-100 text-pink-800",
  "anti-aging": "bg-indigo-100 text-indigo-800",
  "metabolic": "bg-orange-100 text-orange-800",
  "neuroprotective": "bg-teal-100 text-teal-800",
};

export function generateStaticParams() {
  return getAllPeptides().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const peptide = getPeptideBySlug(params.slug);
  if (!peptide) return { title: "Peptide Not Found" };
  return {
    title: `${peptide.name} - Peptide Analyzer`,
    description: peptide.description,
  };
}

export default function PeptideDetailPage({ params }: { params: { slug: string } }) {
  const peptide = getPeptideBySlug(params.slug);
  if (!peptide) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/peptides" className="hover:text-primary-600">Peptides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{peptide.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{peptide.name}</h1>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${categoryColors[peptide.category] || "bg-gray-100"}`}>
            {peptide.category.replace(/-/g, " ")}
          </span>
        </div>
        <p className="text-lg text-gray-500">{peptide.fullName}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-700">{peptide.benefits.length}</p>
          <p className="text-xs text-green-600">Benefits</p>
        </div>
        <div className="bg-red-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-red-700">{peptide.risks.length}</p>
          <p className="text-xs text-red-600">Known Risks</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-700">{peptide.mechanismsOfAction.length}</p>
          <p className="text-xs text-blue-600">Mechanisms</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-purple-700">{peptide.researchLinks.length}</p>
          <p className="text-xs text-purple-600">Studies</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <PeptideDetailTabs peptide={peptide} />
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800 text-center">
          ⚠️ Information is for educational and research purposes only. This is not medical advice. Always consult a licensed healthcare professional before using any peptide.{" "}
          <Link href="/disclaimer" className="underline font-medium">Full disclaimer</Link>
        </p>
      </div>
    </div>
  );
}
