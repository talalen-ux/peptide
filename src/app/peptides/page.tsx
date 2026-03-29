"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { getAllPeptides, searchPeptides, getPeptidesByCategory, getAllCategories } from "@/lib/peptides";
import Link from "next/link";

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

function PeptidesList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") || "";
  const cat = searchParams.get("category") || "";
  const [query, setQuery] = useState(q);
  const categories = getAllCategories();

  let results = q ? searchPeptides(q) : getAllPeptides();
  if (cat) {
    results = results.filter((p) => p.category === cat);
  }

  useEffect(() => { setQuery(q); }, [q]);

  function handleSearch(value: string) {
    setQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("q", value);
    else params.delete("q");
    router.push(`/peptides?${params.toString()}`);
  }

  function toggleCategory(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === slug) params.delete("category");
    else params.set("category", slug);
    router.push(`/peptides?${params.toString()}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Peptides</h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search peptides by name, description..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-gray-900"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => { const params = new URLSearchParams(searchParams.toString()); params.delete("category"); router.push(`/peptides?${params.toString()}`); }}
          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${!cat ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => toggleCategory(c.slug)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${cat === c.slug ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="text-sm text-gray-500 mb-4">{results.length} peptide{results.length !== 1 ? "s" : ""} found</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((peptide) => (
          <Link
            key={peptide.slug}
            href={`/peptides/${peptide.slug}`}
            className="bg-white rounded-xl border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg text-gray-900">{peptide.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[peptide.category] || "bg-gray-100"}`}>
                {peptide.category.replace(/-/g, " ")}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">{peptide.fullName}</p>
            <p className="text-sm text-gray-600 line-clamp-2">{peptide.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {peptide.benefits.slice(0, 2).map((b, i) => (
                <span key={i} className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded">
                  {b.length > 35 ? b.substring(0, 35) + "..." : b}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No peptides found matching your search.</p>
          <button onClick={() => handleSearch("")} className="mt-3 text-primary-600 hover:underline text-sm">Clear search</button>
        </div>
      )}
    </div>
  );
}

export default function PeptidesPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8"><p>Loading...</p></div>}>
      <PeptidesList />
    </Suspense>
  );
}
