export interface ResearchLink {
  title: string;
  url: string;
  source: string;
  year?: number;
}

export interface DosageInfo {
  route: string;
  typicalDose: string;
  frequency: string;
  cycleLength?: string;
  notes?: string;
}

export type CategorySlug =
  | "healing-recovery"
  | "growth-hormone"
  | "cognitive"
  | "immune"
  | "sexual-health"
  | "anti-aging"
  | "metabolic"
  | "neuroprotective";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
}

export interface Peptide {
  slug: string;
  name: string;
  fullName: string;
  category: CategorySlug;
  description: string;
  molecularFormula?: string;
  molecularWeight?: string;
  aminoAcidSequence?: string;
  mechanismsOfAction: string[];
  benefits: string[];
  risks: string[];
  dosage: DosageInfo;
  researchLinks: ResearchLink[];
  legalStatus?: string;
  featured?: boolean;
}
