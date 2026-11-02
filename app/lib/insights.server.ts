import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type InsightCategory =
  | "ERP"
  | "SAP Business One"
  | "Cloud & Infrastructure"
  | "Business Productivity"
  | "Automation"
  | "Technology Strategy";

export type InsightPost = {
  slug: string;
  title: string;
  publishedAt: string;
  category: InsightCategory;
  excerpt: string;
  originalUrl: string;
  content: string;
  readingMinutes: number;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

function formatPublishedAt(raw: unknown): string {
  if (raw instanceof Date && !Number.isNaN(raw.getTime())) {
    return raw.toISOString().slice(0, 10);
  }
  const asString = String(raw ?? "");
  const parsed = new Date(asString);
  if (!Number.isNaN(parsed.getTime()) && asString.length >= 8) {
    return parsed.toISOString().slice(0, 10);
  }
  return asString;
}

function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function parseCategory(raw: string): InsightCategory {
  const allowed: InsightCategory[] = [
    "ERP",
    "SAP Business One",
    "Cloud & Infrastructure",
    "Business Productivity",
    "Automation",
    "Technology Strategy",
  ];
  if (allowed.includes(raw as InsightCategory)) {
    return raw as InsightCategory;
  }
  return "Technology Strategy";
}

export function getInsightSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllInsights(): InsightPost[] {
  return getInsightSlugs()
    .map((slug) => getInsightBySlug(slug))
    .filter((p): p is InsightPost => p !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getInsightBySlug(slug: string): InsightPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    publishedAt: formatPublishedAt(data.publishedAt),
    category: parseCategory(String(data.category ?? "")),
    excerpt: String(data.excerpt ?? ""),
    originalUrl: String(data.originalUrl ?? ""),
    content: content.trim(),
    readingMinutes: readingMinutes(content),
  };
}
