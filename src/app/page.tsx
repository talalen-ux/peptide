import Link from "next/link";
import { getFeaturedPeptides, getAllCategories } from "@/lib/peptides";

export default function HomePage() {
  const featured = getFeaturedPeptides();
  const categories = getAllCategories();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-28 sm:py-40">
        <div className="hero-glow absolute inset-0" />
        <div className="dot-grid absolute inset-0 opacity-[0.03]" />
        <div className="absolute top-20 right-[15%] w-64 h-64 rounded-full bg-[var(--accent)] opacity-[0.02] blur-[100px] animate-glow-pulse" />
        <div className="absolute bottom-10 left-[10%] w-48 h-48 rounded-full bg-[var(--accent)] opacity-[0.015] blur-[80px] animate-glow-pulse delay-500" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="opacity-0 animate-fade-up">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-8">
              Research-Backed Database
            </p>
          </div>

          <h1 className="opacity-0 animate-fade-up delay-100">
            <span className="font-display italic text-5xl sm:text-7xl lg:text-8xl tracking-tight text-gradient-green">
              Peptide Analyzer
            </span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-up delay-200">
            Comprehensive information on benefits, risks, dosage protocols, and
            scientific research for the most studied peptides.
          </p>

          <div className="mt-12 flex justify-center gap-4 opacity-0 animate-fade-up delay-300">
            <Link
              href="/peptides"
              className="group relative px-8 py-3.5 rounded-full font-heading text-sm font-semibold text-black bg-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all duration-300 hover:shadow-[0_0_30px_-5px_var(--accent)]"
            >
              Browse All Peptides
              <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      <div className="line-glow" />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="flex items-center gap-4 mb-12 opacity-0 animate-fade-up">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Categories</h2>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/peptides?category=${cat.slug}`}
              className="card p-5 group opacity-0 animate-fade-up"
              style={{ animationDelay: `${(i + 1) * 80}ms` }}
            >
              <span className="text-2xl block mb-3">{cat.icon}</span>
              <h3 className="font-heading text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300">
                {cat.name}
              </h3>
              <p className="mt-1.5 text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="relative">
        <div className="dot-grid absolute inset-0 opacity-[0.02]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">Featured</h2>
            <div className="flex-1 h-px bg-[var(--border)]" />
            <Link href="/peptides" className="font-mono text-xs text-[var(--accent)] hover:underline underline-offset-4">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((p, i) => (
              <Link
                key={p.slug}
                href={`/peptides/${p.slug}`}
                className="card p-6 group opacity-0 animate-fade-up"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-heading text-lg font-semibold group-hover:text-[var(--accent)] transition-colors duration-300">
                      {p.name}
                    </h3>
                    <p className="font-mono text-[10px] tracking-wider uppercase text-[var(--text-muted)] mt-1">
                      {p.category.replace(/-/g, " ")}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] group-hover:bg-[var(--accent-muted)] transition-all duration-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-300">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-5">
                  {p.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {p.benefits.slice(0, 2).map((b, j) => (
                    <span key={j} className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--accent-muted)]">
                      {b.length > 30 ? b.substring(0, 30) + "…" : b}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="card p-6 border-amber-900/30 bg-amber-950/5">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full border border-amber-800/40 bg-amber-950/30 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading text-sm font-semibold text-amber-400 mb-1">Medical Disclaimer</h3>
              <p className="text-sm text-amber-200/50 leading-relaxed">
                This website is for educational purposes only. It is not medical advice. Many peptides are not FDA-approved. Always consult a healthcare professional.{" "}
                <Link href="/disclaimer" className="underline underline-offset-2 text-amber-400/70 hover:text-amber-400 transition-colors">
                  Read full disclaimer
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
