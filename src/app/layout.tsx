import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peptide Analyzer - Comprehensive Peptide Research & Information",
  description: "Research-backed peptide information including benefits, risks, dosage, and the latest scientific studies. Your trusted source for peptide analysis.",
};

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🧬</span>
            <span className="font-bold text-xl text-gray-900">PeptideAnalyzer</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/" className="text-sm font-medium text-gray-600 hover:text-primary-700 transition-colors">Home</a>
            <a href="/peptides" className="text-sm font-medium text-gray-600 hover:text-primary-700 transition-colors">Browse</a>
            <a href="/disclaimer" className="text-sm font-medium text-gray-600 hover:text-primary-700 transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧬</span>
              <span className="font-bold text-lg text-white">PeptideAnalyzer</span>
            </div>
            <p className="text-sm">Research-backed peptide information for educational purposes.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <a href="/peptides" className="hover:text-white transition-colors">Browse Peptides</a>
              <a href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Categories</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a href="/peptides?category=healing-recovery" className="hover:text-white transition-colors">Healing & Recovery</a>
              <a href="/peptides?category=growth-hormone" className="hover:text-white transition-colors">Growth Hormone</a>
              <a href="/peptides?category=cognitive" className="hover:text-white transition-colors">Cognitive</a>
              <a href="/peptides?category=anti-aging" className="hover:text-white transition-colors">Anti-Aging</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p className="text-yellow-500/80 mb-2">⚠️ For educational and research purposes only. Not medical advice. Consult a healthcare professional.</p>
          <p>&copy; {new Date().getFullYear()} PeptideAnalyzer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
