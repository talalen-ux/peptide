import { Peptide, CategorySlug, Category } from "@/types/peptide";
import { peptides } from "@/data/peptides";
import { categories } from "@/data/categories";

export function getAllPeptides(): Peptide[] {
  return peptides;
}

export function getPeptideBySlug(slug: string): Peptide | undefined {
  return peptides.find((p) => p.slug === slug);
}

export function getPeptidesByCategory(category: CategorySlug): Peptide[] {
  return peptides.filter((p) => p.category === category);
}

export function searchPeptides(query: string): Peptide[] {
  const q = query.toLowerCase().trim();
  if (!q) return peptides;
  return peptides.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.fullName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export function getFeaturedPeptides(): Peptide[] {
  return peptides.filter((p) => p.featured);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
