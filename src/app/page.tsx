import { getFeaturedPeptides, getAllCategories } from "@/lib/peptides";
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

export default function HomePage() {
  const featured = getFeaturedPeptides();
  const categories = getAllCategories();

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Peptide Analyzer</h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Comprehensive, research-backed information on 30 top peptides. Explore benefits, risks, dosage, mechanisms of action, and the latest scientific research.
          </p>
          <Link
            href="/peptides"
            className="inline-block bg-white text-primary-800 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Browse All Peptides →
          </Link>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
        <p className="text-center text-sm text-yellow-800">
          ⚠️ <strong>Educational purposes only.</strong> This is not medical advice. Always consult a qualified healthcare provider before using any peptide.{" "}
          <Link href="/disclaimer" className="underline font-medium">Read full disclaimer</Link>
        </p>
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/peptides?category=${cat.slug}`}
              className="p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all text-center"
            >
              <span className="text-3xl mb-2 block">{cat.icon}</span>
              <h3 className="font-semibold text-gray-900 text-sm">{cat.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Peptides */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Peptides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((peptide) => (
              <Link
                key={peptide.slug}
                href={`/peptides/${peptide.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-6 card-hover"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-900">{peptide.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[peptide.category] || "bg-gray-100 text-gray-800"}`}>
                    {peptide.category.replace(/-/g, " ")}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">{peptide.fullName}</p>
                <p className="text-sm text-gray-600 line-clamp-3">{peptide.description}</p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {peptide.benefits.slice(0, 3).map((b, i) => (
                    <span key={i} className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded">
                      {b.length > 30 ? b.substring(0, 30) + "..." : b}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
