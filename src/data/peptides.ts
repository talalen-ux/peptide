import { Peptide } from "@/types/peptide";

export const peptides: Peptide[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    fullName: "Body Protection Compound-157",
    category: "healing-recovery",
    description: "A pentadecapeptide derived from human gastric juice. Known for its remarkable healing properties across multiple tissue types including tendons, muscles, and the gut lining.",
    molecularFormula: "C62H98N16O22",
    molecularWeight: "1419.5 g/mol",
    mechanismsOfAction: [
      "Upregulates growth hormone receptors",
      "Promotes angiogenesis and blood vessel formation",
      "Modulates nitric oxide system",
      "Activates FAK-paxillin signaling for tissue repair"
    ],
    benefits: [
      "Accelerates healing of tendons, ligaments, and muscles",
      "Protects and heals gut lining",
      "Reduces inflammation systemically",
      "May improve joint health and mobility",
      "Potential neuroprotective effects"
    ],
    risks: [
      "Limited human clinical trial data",
      "Possible nausea or dizziness",
      "Unknown long-term safety profile",
      "May affect blood pressure",
      "Not FDA-approved for human use"
    ],
    dosage: {
      route: "Subcutaneous injection or oral",
      typicalDose: "250-500 mcg/day",
      frequency: "1-2 times daily",
      cycleLength: "4-12 weeks",
      notes: "Can be taken orally for gut-related issues. Inject near injury site for localized healing."
    },
    researchLinks: [
      { title: "BPC 157 as potential treatment for GI disorders", url: "https://pubmed.ncbi.nlm.nih.gov/34697042/", source: "PubMed", year: 2021 },
      { title: "Stable gastric pentadecapeptide BPC 157 in trials for inflammatory bowel disease", url: "https://pubmed.ncbi.nlm.nih.gov/32504357/", source: "PubMed", year: 2020 }
    ],
    legalStatus: "Unregulated research peptide in most countries",
    featured: true,
  },
  {
    slug: "tb-500",
    name: "TB-500",
    fullName: "Thymosin Beta-4 Fragment",
    category: "healing-recovery",
    description: "A synthetic version of thymosin beta-4, a naturally occurring peptide present in nearly all human cells. Plays a critical role in tissue repair and regeneration.",
    molecularFormula: "C212H350N56O78S",
    molecularWeight: "4963.4 g/mol",
    mechanismsOfAction: [
      "Promotes cell migration to injury sites",
      "Upregulates actin for cellular structure repair",
      "Reduces inflammation via cytokine modulation",
      "Stimulates stem cell maturation"
    ],
    benefits: [
      "Promotes wound healing and tissue repair",
      "Reduces chronic inflammation",
      "Improves flexibility and reduces muscle spasm",
      "Supports cardiac tissue repair",
      "May promote hair regrowth"
    ],
    risks: [
      "May stimulate growth of existing cancers",
      "Headaches reported in some users",
      "Possible fatigue during initial use",
      "Limited human trial data",
      "Not FDA-approved"
    ],
    dosage: {
      route: "Subcutaneous or intramuscular injection",
      typicalDose: "2-5 mg twice weekly",
      frequency: "Twice weekly (loading), weekly (maintenance)",
      cycleLength: "4-6 weeks loading, then maintenance",
      notes: "Often stacked with BPC-157 for synergistic healing effects."
    },
    researchLinks: [
      { title: "Thymosin beta-4 and tissue repair", url: "https://pubmed.ncbi.nlm.nih.gov/30957123/", source: "PubMed", year: 2019 },
      { title: "Role of thymosin beta-4 in wound healing", url: "https://pubmed.ncbi.nlm.nih.gov/28291425/", source: "PubMed", year: 2017 }
    ],
    legalStatus: "Banned by WADA; unregulated research peptide",
    featured: true,
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295",
    fullName: "CJC-1295 with DAC (Drug Affinity Complex)",
    category: "growth-hormone",
    description: "A synthetic growth hormone-releasing hormone (GHRH) analog that stimulates the pituitary gland to produce more growth hormone. The DAC modification extends its half-life significantly.",
    molecularFormula: "C152H252N44O42",
    molecularWeight: "3367.9 g/mol",
    mechanismsOfAction: [
      "Binds to GHRH receptors on pituitary somatotrophs",
      "Stimulates pulsatile GH release",
      "Increases IGF-1 levels over sustained period",
      "DAC extends half-life to 6-8 days"
    ],
    benefits: [
      "Increases natural growth hormone production",
      "Improves body composition and fat loss",
      "Enhances deep sleep quality",
      "Supports muscle growth and recovery",
      "May improve skin elasticity and collagen"
    ],
    risks: [
      "Water retention and bloating",
      "Tingling or numbness in extremities",
      "Possible insulin resistance with long-term use",
      "Headaches and flushing",
      "May affect blood sugar levels"
    ],
    dosage: {
      route: "Subcutaneous injection",
      typicalDose: "1-2 mg per week (with DAC) or 100 mcg per dose (no DAC)",
      frequency: "Once or twice weekly (with DAC); 1-3x daily (no DAC)",
      cycleLength: "8-12 weeks",
      notes: "Often combined with Ipamorelin for synergistic GH release. Best taken before bed."
    },
    researchLinks: [
      { title: "CJC-1295 increases plasma GH levels", url: "https://pubmed.ncbi.nlm.nih.gov/16352683/", source: "PubMed", year: 2006 },
      { title: "Extended-release GHRH analogs in clinical trials", url: "https://pubmed.ncbi.nlm.nih.gov/17018654/", source: "PubMed", year: 2006 }
    ],
    legalStatus: "Research peptide; not FDA-approved",
    featured: true,
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    fullName: "Ipamorelin Acetate",
    category: "growth-hormone",
    description: "A selective growth hormone secretagogue that stimulates GH release without significantly affecting cortisol or prolactin levels. Considered one of the safest GH peptides.",
    molecularFormula: "C38H49N9O5",
    molecularWeight: "711.9 g/mol",
    mechanismsOfAction: [
      "Selectively binds ghrelin/GHS receptors on pituitary",
      "Stimulates GH release without raising cortisol",
      "Does not significantly affect prolactin or ACTH",
      "Works synergistically with GHRH analogs"
    ],
    benefits: [
      "Clean growth hormone release with fewer side effects",
      "Improved sleep quality and recovery",
      "Enhanced fat metabolism",
      "Supports lean muscle development",
      "Anti-aging effects on skin and joints"
    ],
    risks: [
      "Mild headaches initially",
      "Possible water retention",
      "Increased hunger (ghrelin receptor activation)",
      "Transient numbness or tingling",
      "Not FDA-approved for human use"
    ],
    dosage: {
      route: "Subcutaneous injection",
      typicalDose: "200-300 mcg per dose",
      frequency: "2-3 times daily",
      cycleLength: "8-12 weeks",
      notes: "Best taken on empty stomach. Evening dose before bed optimizes natural GH pulse."
    },
    researchLinks: [
      { title: "Ipamorelin, a new growth hormone secretagogue", url: "https://pubmed.ncbi.nlm.nih.gov/9849822/", source: "PubMed", year: 1998 },
      { title: "Safety and tolerability of ipamorelin", url: "https://pubmed.ncbi.nlm.nih.gov/15265848/", source: "PubMed", year: 2004 }
    ],
    legalStatus: "Research peptide; banned by WADA",
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    fullName: "Copper Peptide GHK-Cu (Glycyl-L-Histidyl-L-Lysine)",
    category: "anti-aging",
    description: "A naturally occurring copper-binding tripeptide found in human plasma. Levels decline significantly with age. Known for powerful skin regeneration and anti-aging properties.",
    molecularFormula: "C14H24CuN6O4",
    molecularWeight: "403.9 g/mol",
    mechanismsOfAction: [
      "Stimulates collagen and elastin synthesis",
      "Promotes glycosaminoglycan production",
      "Activates wound healing gene expression",
      "Acts as potent antioxidant via SOD and catalase",
      "Remodels damaged tissue via metalloproteinase regulation"
    ],
    benefits: [
      "Reduces wrinkles and improves skin firmness",
      "Accelerates wound healing",
      "Stimulates hair follicle growth",
      "Reduces inflammation and oxidative damage",
      "May have neuroprotective properties"
    ],
    risks: [
      "Skin irritation with topical use (rare)",
      "Not well studied via injection in humans",
      "May interact with copper metabolism",
      "Possible allergic reactions in sensitive individuals",
      "Quality varies significantly between suppliers"
    ],
    dosage: {
      route: "Topical (cream/serum) or subcutaneous injection",
      typicalDose: "1-2 mg/day (injection) or topical as directed",
      frequency: "Daily for topical; daily for injection cycles",
      cycleLength: "Ongoing for topical; 4-8 weeks for injection",
      notes: "Topical is the most studied and safest route. Widely available in skincare products."
    },
    researchLinks: [
      { title: "GHK peptide as a natural modulator of multiple cellular pathways", url: "https://pubmed.ncbi.nlm.nih.gov/24508075/", source: "PubMed", year: 2014 },
      { title: "Regenerative and protective actions of GHK-Cu", url: "https://pubmed.ncbi.nlm.nih.gov/22585065/", source: "PubMed", year: 2012 }
    ],
    legalStatus: "Available in cosmetics; research peptide for injection",
    featured: true,
  },
  {
    slug: "pt-141",
    name: "PT-141",
    fullName: "Bremelanotide (PT-141)",
    category: "sexual-health",
    description: "A melanocortin receptor agonist originally developed from Melanotan II. FDA-approved as Vyleesi for hypoactive sexual desire disorder in premenopausal women.",
    molecularFormula: "C50H68N14O10",
    molecularWeight: "1025.2 g/mol",
    mechanismsOfAction: [
      "Activates melanocortin-4 receptors (MC4R) in the brain",
      "Acts on central nervous system rather than vascular system",
      "Modulates dopamine and oxytocin pathways",
      "Distinct mechanism from PDE5 inhibitors like Viagra"
    ],
    benefits: [
      "Increases sexual desire and arousal",
      "FDA-approved for female HSDD (as Vyleesi)",
      "Works via brain pathways, not blood flow",
      "Effective for both men and women",
      "Does not require timing around sexual activity"
    ],
    risks: [
      "Nausea (most common, ~40% of users)",
      "Flushing and headaches",
      "May increase blood pressure transiently",
      "Injection site reactions",
      "Darkening of skin with repeated use"
    ],
    dosage: {
      route: "Subcutaneous injection",
      typicalDose: "1.75 mg (FDA-approved dose)",
      frequency: "As needed, at least 45 min before activity",
      cycleLength: "As needed; max once per 24 hours",
      notes: "FDA-approved as Vyleesi. Do not use more than 8 doses per month per label guidance."
    },
    researchLinks: [
      { title: "Bremelanotide for female sexual dysfunction", url: "https://pubmed.ncbi.nlm.nih.gov/31150539/", source: "NEJM", year: 2019 },
      { title: "PT-141 for erectile dysfunction", url: "https://pubmed.ncbi.nlm.nih.gov/15163299/", source: "PubMed", year: 2004 }
    ],
    legalStatus: "FDA-approved as Vyleesi (prescription); research peptide otherwise",
  },
  {
    slug: "selank",
    name: "Selank",
    fullName: "Selank (TP-7)",
    category: "cognitive",
    description: "A synthetic analog of the immunomodulatory peptide tuftsin, developed in Russia. Approved in Russia as an anxiolytic and nootropic. Known for reducing anxiety without sedation.",
    molecularFormula: "C33H57N11O9",
    molecularWeight: "751.9 g/mol",
    mechanismsOfAction: [
      "Modulates GABA-ergic neurotransmission",
      "Influences BDNF expression for neuroplasticity",
      "Stabilizes enkephalin degradation",
      "Modulates serotonin and norepinephrine balance"
    ],
    benefits: [
      "Reduces anxiety without sedation or cognitive impairment",
      "Improves memory and learning capacity",
      "Enhances focus and mental clarity",
      "Stabilizes mood",
      "Immunomodulatory properties"
    ],
    risks: [
      "Fatigue in some users",
      "Possible nasal irritation (intranasal route)",
      "Limited research outside of Russia",
      "Long-term effects not well characterized",
      "May interact with other anxiolytics"
    ],
    dosage: {
      route: "Intranasal spray or subcutaneous injection",
      typicalDose: "250-500 mcg per dose",
      frequency: "1-3 times daily",
      cycleLength: "2-4 weeks, with breaks",
      notes: "Intranasal is the most common and convenient route. Effects typically felt within 15-30 minutes."
    },
    researchLinks: [
      { title: "Selank anxiolytic activity study", url: "https://pubmed.ncbi.nlm.nih.gov/18577768/", source: "PubMed", year: 2008 },
      { title: "Selank effects on gene expression in brain", url: "https://pubmed.ncbi.nlm.nih.gov/24117391/", source: "PubMed", year: 2013 }
    ],
    legalStatus: "Approved anxiolytic in Russia; research peptide elsewhere",
  },
  {
    slug: "thymosin-alpha-1",
    name: "Thymosin Alpha-1",
    fullName: "Thymosin Alpha-1 (Tα1)",
    category: "immune",
    description: "A thymic peptide critical for immune system maturation. FDA-approved as an orphan drug (Zadaxin) for hepatitis B. Widely used in over 30 countries for immune modulation.",
    molecularFormula: "C129H215N33O55",
    molecularWeight: "3108.3 g/mol",
    mechanismsOfAction: [
      "Activates dendritic cells and toll-like receptors",
      "Enhances T-cell maturation and differentiation",
      "Stimulates natural killer cell activity",
      "Modulates cytokine production for balanced immune response"
    ],
    benefits: [
      "Strengthens innate and adaptive immunity",
      "Approved for hepatitis B treatment in many countries",
      "May improve vaccine efficacy",
      "Studied for cancer immunotherapy support",
      "Anti-inflammatory immune modulation"
    ],
    risks: [
      "Injection site reactions",
      "Possible immune overstimulation in autoimmune conditions",
      "Mild flu-like symptoms initially",
      "Expensive compared to other peptides",
      "Should not be used with immunosuppressants without guidance"
    ],
    dosage: {
      route: "Subcutaneous injection",
      typicalDose: "1.6 mg per dose",
      frequency: "2-3 times per week",
      cycleLength: "4-6 months for chronic conditions",
      notes: "Approved as Zadaxin in 30+ countries. Consult physician for use alongside other immune therapies."
    },
    researchLinks: [
      { title: "Thymosin alpha 1 in treatment of viral infections", url: "https://pubmed.ncbi.nlm.nih.gov/17367287/", source: "PubMed", year: 2007 },
      { title: "Tα1 as immune response modifier in cancer", url: "https://pubmed.ncbi.nlm.nih.gov/28434455/", source: "PubMed", year: 2017 }
    ],
    legalStatus: "FDA orphan drug; approved in 30+ countries as Zadaxin",
    featured: true,
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    fullName: "Advanced Obesity Drug 9604",
    category: "metabolic",
    description: "A modified fragment of human growth hormone (amino acids 176-191). Developed specifically for fat loss without the growth-promoting effects of full GH.",
    molecularFormula: "C78H125N23O23S2",
    molecularWeight: "1817.1 g/mol",
    mechanismsOfAction: [
      "Stimulates lipolysis (fat breakdown)",
      "Inhibits lipogenesis (fat formation)",
      "Does not affect IGF-1 or insulin levels",
      "Mimics the fat-burning fragment of growth hormone"
    ],
    benefits: [
      "Targeted fat reduction without muscle effects",
      "Does not cause insulin resistance",
      "No effect on blood sugar or growth",
      "TGA-approved in Australia for osteoarthritis (as injection)",
      "May support cartilage repair"
    ],
    risks: [
      "Headaches and mild nausea",
      "Injection site irritation",
      "Limited published human efficacy data for fat loss",
      "Results may be modest compared to expectations",
      "Not FDA-approved for any indication"
    ],
    dosage: {
      route: "Subcutaneous injection",
      typicalDose: "300 mcg per day",
      frequency: "Once daily, morning on empty stomach",
      cycleLength: "12 weeks",
      notes: "Best taken fasted in the morning. Avoid eating for 30 minutes after injection."
    },
    researchLinks: [
      { title: "AOD9604 lipolytic activity study", url: "https://pubmed.ncbi.nlm.nih.gov/11713213/", source: "PubMed", year: 2001 },
      { title: "hGH fragment 176-191 in obese mice", url: "https://pubmed.ncbi.nlm.nih.gov/15203374/", source: "PubMed", year: 2004 }
    ],
    legalStatus: "TGA-approved in Australia for OA; research peptide elsewhere",
  },
  {
    slug: "epithalon",
    name: "Epithalon",
    fullName: "Epithalon (Epitalon/Epithalone)",
    category: "anti-aging",
    description: "A synthetic tetrapeptide based on epithalamin, a natural extract from the pineal gland. Known primarily for its ability to activate telomerase and potentially extend cellular lifespan.",
    molecularFormula: "C14H22N4O9",
    molecularWeight: "390.3 g/mol",
    mechanismsOfAction: [
      "Activates telomerase enzyme to lengthen telomeres",
      "Regulates melatonin production in the pineal gland",
      "Modulates gene expression related to aging",
      "Antioxidant effects at the cellular level"
    ],
    benefits: [
      "May slow cellular aging by maintaining telomere length",
      "Regulates circadian rhythm and sleep via melatonin",
      "Potential anti-cancer properties (in animal studies)",
      "Antioxidant protection for cells",
      "Studied for retinal health in aging"
    ],
    risks: [
      "Very limited human clinical data",
      "Most research conducted in animal models",
      "Unknown long-term safety in humans",
      "Theoretical risk of promoting cancer cell survival",
      "Not FDA-approved or regulated"
    ],
    dosage: {
      route: "Subcutaneous injection",
      typicalDose: "5-10 mg per day",
      frequency: "Daily for 10-20 days",
      cycleLength: "10-20 day cycles, 2-3 times per year",
      notes: "Typically used in short intensive cycles spaced months apart. Based on Khavinson protocol."
    },
    researchLinks: [
      { title: "Epithalon peptide and telomerase activation", url: "https://pubmed.ncbi.nlm.nih.gov/14523363/", source: "PubMed", year: 2003 },
      { title: "Effect of epithalon on age-related changes", url: "https://pubmed.ncbi.nlm.nih.gov/12937682/", source: "PubMed", year: 2003 }
    ],
    legalStatus: "Research peptide; not approved for clinical use",
  },
];
