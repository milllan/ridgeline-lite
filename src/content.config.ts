import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Content collections, validated at build time.
 * The Pro version adds projects (before/after galleries), city landing
 * pages, FAQ, and a blog - see the README for the comparison.
 */

const services = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /**
       * Meta <title> for /usluge/[slug]/: carries the long-tail keyword;
       * H1 uses title. The "| Majstor Dejan" tail is appended by SEO.astro
       * (epic #112 task 11 - titles stay phone-free). Optional until each
       * service's content PR lands (epic #70 Phase 3).
       */
      seoTitle: z.string().optional(),
      /**
       * Meta description (meta-only; excerpt stays the visible lead/card
       * copy). Carries the phone tail "Majstor Dejan: 065-3653379."
       * (epic #112 task 11). Falls back to excerpt when absent.
       */
      seoDescription: z.string().max(220).optional(),
      /** Icon name from src/components/common/Icon.astro */
      icon: z.string(),
      excerpt: z.string().max(220),
      heroImage: image(),
      heroImageAlt: z.string(),
      order: z.number().int(),
      processSteps: z
        .array(z.object({ title: z.string(), description: z.string() }))
        .length(4),
      /** Optional service FAQ - renders FaqSection + FAQPage schema on the page. */
      faq: z
        .array(z.object({ question: z.string(), answer: z.string() }))
        .optional(),
      /** Publication status - `draft` pages are suppressed from the build (epic #112 task 4). */
      status: z.enum(['draft', 'published']).default('published'),
    }),
});

const reviews = defineCollection({
  loader: file('./src/content/reviews.json'),
  schema: z.object({
    author: z.string(),
    city: z.string(),
    rating: z.number().int().min(1).max(5),
    date: z.coerce.date(),
    service: z.string(),
    text: z.string(),
  }),
});

/**
 * Opština landing pages (/lokacije/[slug]/) - pattern proven by #25.
 * Rakovica first (real base); 2nd opština = one content file, zero code.
 * naselja: real neighborhoods only, no coverage promises beyond copy.
 */
const opstine = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/opstine' }),
  schema: z.object({
    title: z.string(),
    /** Meta <title>: keyword + municipality; the "| Majstor Dejan" tail is
     * appended by SEO.astro (epic #112 task 11 - phone-free). H1 uses title. */
    seoTitle: z.string(),
    /**
     * Meta description (meta-only; excerpt stays the visible lead/card copy).
     * Carries the phone tail "Majstor Dejan: 065-3653379."
     * (epic #112 task 11). Falls back to excerpt when absent.
     */
    seoDescription: z.string().max(220).optional(),
    excerpt: z.string().max(220),
    naselja: z.array(z.string()).min(1),
    order: z.number().int(),
    /** Optional opština FAQ - renders FaqSection + FAQPage schema. */
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional(),
    /** Publication status - `draft` pages are suppressed from the build (epic #112 task 4). */
    status: z.enum(['draft', 'published']).default('published'),
  }),
});

/**
 * Brand landing pages (/brendovi-ves-masina/[slug]-majstor/) - spec #4, epic #28 D.
 * Gorenje first; next brand = one content file, zero code changes.
 * commonFaults are generic per-brand DRAFTs until the majstor confirms
 * brand-specific weak points (#21) - flagged in each content file.
 */
const brands = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/brands' }),
  schema: z.object({
    title: z.string(),
    /** Meta <title>: keyword + brand; the "| Majstor Dejan" tail is appended
     * by SEO.astro (epic #112 task 11 - phone-free). H1 uses title. */
    seoTitle: z.string(),
    /**
     * Meta description (meta-only; excerpt stays the visible lead/card copy).
     * Carries the phone tail "Majstor Dejan: 065-3653379."
     * (epic #112 task 11). Falls back to excerpt when absent.
     */
    seoDescription: z.string().max(220).optional(),
    excerpt: z.string().max(220),
    /** Short brand name for headings/links (e.g. "Gorenje"). */
    name: z.string(),
    commonFaults: z.array(z.string()).min(3),
    order: z.number().int(),
    /** Optional brand FAQ - renders FaqSection + FAQPage schema on the page. */
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional(),
    /** Publication status - `draft` pages are suppressed from the build (epic #112 task 4). */
    status: z.enum(['draft', 'published']).default('published'),
  }),
});

export const collections = { services, reviews, opstine, brands };
