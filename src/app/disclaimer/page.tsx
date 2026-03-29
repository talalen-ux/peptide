import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Medical Disclaimer</h1>

      <div className="prose prose-gray max-w-none space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-red-900 mt-0">Important Notice</h2>
          <p className="text-red-800 mb-0">
            The information provided on PeptideAnalyzer is for <strong>educational and informational purposes only</strong>.
            It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-gray-900">Not Medical Advice</h2>
        <p className="text-gray-700">
          Nothing on this website should be construed as medical advice. The content is not intended to diagnose, treat, cure,
          or prevent any disease or health condition. Always seek the advice of your physician or other qualified health provider
          with any questions you may have regarding a medical condition.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Research Status</h2>
        <p className="text-gray-700">
          Many of the peptides discussed on this site are the subject of ongoing research. Some have not been approved by the
          FDA or other regulatory agencies for human use. The research cited may include preclinical studies (animal models),
          in vitro studies, and early-phase clinical trials. Results from such studies do not guarantee similar outcomes in humans
          or in clinical practice.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Dosage Information</h2>
        <p className="text-gray-700">
          Any dosage information provided is derived from published research literature and is presented for educational reference
          only. Dosages may vary based on individual factors including age, weight, health status, and concurrent medications.
          <strong> Never self-administer any peptide without direct supervision from a licensed healthcare provider.</strong>
        </p>

        <h2 className="text-xl font-semibold text-gray-900">No Endorsement</h2>
        <p className="text-gray-700">
          The inclusion of any peptide on this platform does not constitute an endorsement or recommendation for its use.
          We do not sell, distribute, or promote the purchase of any peptides. Links to research papers are provided for
          educational purposes and do not imply endorsement by the cited authors or institutions.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Legal Status</h2>
        <p className="text-gray-700">
          The legal status of peptides varies by country and jurisdiction. It is your responsibility to understand and comply
          with all applicable laws and regulations in your area. Some peptides may be classified as research chemicals,
          prescription medications, or controlled substances depending on your location.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Assumption of Risk</h2>
        <p className="text-gray-700">
          By using this website, you acknowledge that the use of peptides carries inherent risks. You agree that PeptideAnalyzer
          and its creators are not liable for any adverse effects, damages, or consequences resulting from the use or misuse of
          information presented on this platform.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Data Accuracy</h2>
        <p className="text-gray-700">
          While we strive to provide accurate and up-to-date information, we make no warranties or representations regarding the
          accuracy, completeness, or timeliness of the content. Scientific understanding evolves, and information may become
          outdated. We encourage users to verify information through primary research sources and consult with qualified professionals.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <p className="text-yellow-800 text-sm mb-0">
            <strong>If you are experiencing a medical emergency, call your local emergency services immediately.</strong> Do not
            rely on any information from this website for emergency medical situations.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">← Back to Home</Link>
      </div>
    </div>
  );
}
