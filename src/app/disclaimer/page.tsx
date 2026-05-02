import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Disclaimer — Peptide Analyzer",
};

const sections = [
  {
    title: "Not Medical Advice",
    body: "Nothing on this website should be construed as medical advice. The content is not intended to diagnose, treat, cure, or prevent any disease. Always seek the advice of your physician or other qualified health provider with any questions regarding a medical condition.",
  },
  {
    title: "Research Status",
    body: "Many peptides discussed on this site are research compounds that have not been approved by the FDA or other regulatory bodies for human use. Research cited may include preclinical studies, in vitro studies, and early-phase clinical trials. Results do not guarantee similar outcomes in humans.",
  },
  {
    title: "Dosage Information",
    body: "Dosage information is derived from published research literature and is presented for educational reference only. Dosages vary based on individual factors. Never self-administer any peptide without supervision from a licensed healthcare provider.",
  },
  {
    title: "No Endorsement",
    body: "The inclusion of any peptide on this platform does not constitute an endorsement or recommendation. We do not sell, distribute, or promote the purchase of any peptides. Links to research papers are for educational purposes only.",
  },
  {
    title: "Legal Status",
    body: "The legal status of peptides varies by country and jurisdiction. It is your responsibility to understand and comply with all applicable laws. Some peptides may be classified as research chemicals, prescription medications, or controlled substances.",
  },
  {
    title: "Assumption of Risk",
    body: "By using this website, you acknowledge that the use of peptides carries inherent risks. PeptideAnalyzer and its creators are not liable for any adverse effects, damages, or consequences resulting from the use or misuse of information presented here.",
  },
];

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-amber-400 mb-3">Legal</p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight">Medical Disclaimer</h1>
      </div>

      <div className="card p-6 border-amber-900/30 bg-amber-950/5 mb-12">
        <p className="text-amber-200/70 font-heading font-medium leading-relaxed">
          The information provided on PeptideAnalyzer is for educational and informational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment.
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((s, i) => (
          <div key={i} className="opacity-0 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <h2 className="font-heading text-lg font-semibold text-[var(--text)] mb-3">{s.title}</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.body}</p>
            {i < sections.length - 1 && <div className="mt-8 h-px bg-[var(--border)]" />}
          </div>
        ))}
      </div>

      <div className="mt-16 card p-5 border-red-900/30 bg-red-950/5">
        <p className="text-sm text-red-200/60 leading-relaxed">
          <strong className="text-red-400">Emergency:</strong> If you are experiencing a medical emergency, call your local emergency services immediately. Do not rely on this website for emergency situations.
        </p>
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="font-mono text-xs text-[var(--accent)] hover:underline underline-offset-4">
          &larr; Back to home
        </Link>
      </div>
    </div>
  );
}
