"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { getAllPeptides, searchPeptides, getAllCategories } from "@/lib/peptides";
import Link from "next/link";

function PeptidesList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") || "";
  const cat = searchParams.get("category") || "";
  const [query, setQuery] = useState(q);
  const categories = getAllCategories();

  let results = q ? searchPeptides(q) : getAllPeptides();
  if (cat) results = results.filter((p) => p.category === cat);

  useEffect(() => { setQuery(q); }, [q]);

  function handleSearch(value: string) {
    setQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("q", value); else params.delete("q");
    router.push(`/peptides?${params.toString()}`);
  }

  function toggleCategory(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === slug) params.delete("category"); else params.set("category", slug);
    router.push(`/peptides?${params.toString()}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-3">Database</p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight">Browse Peptides</h1>
      </div>

      <div className="mb-6 relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name or keyword..."
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)] text-sm font-body placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-muted)] transition-all duration-300"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => { const params = new URLSearchParams(searchParams.toString()); params.delete("category"); router.push(`/peptides?${params.toString()}`); }}
          className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border ${!cat ? "bg-[var(--accent)] text-black border-[var(--accent)] font-semibold" : "bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-hover)]"}`}
        >
          ALL
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => toggleCategory(c.slug)}
            className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border ${cat === c.slug ? "bg-[var(--accent)] text-black border-[var(--accent)] font-semibold" : "bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-hover)]"}`}
          >
            {c.name.toUpperCase()}
          </button>
        ))}
      </div>

      <p className="font-mono text-xs text-[var(--text-muted)] mb-6">{results.length} peptide{results.length !== 1 ? "s" : ""}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((p, i) => (
          <Link key={p.slug} href={`/peptides/${p.slug}`} className="card p-6 group opacity-0 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-heading text-base font-semibold group-hover:text-[var(--accent)] transition-colors duration-300">{p.name}</h3>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[var(--text-muted)] mt-0.5">{p.category.replace(/-/g, " ")}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-300 mt-1">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
            <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">{p.description}</p>
          </Link>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[var(--text-muted)] font-body">No peptides found.</p>
          <button onClick={() => handleSearch("")} className="mt-3 font-mono text-xs text-[var(--accent)] hover:underline underline-offset-4">Clear search</button>
        </div>
      )}
    </div>
  );
}

export default function PeptidesPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-16"><div className="h-8 w-48 bg-[var(--bg-card)] rounded animate-pulse" /></div>}>
      <PeptidesList />
    </Suspense>
  );
}
