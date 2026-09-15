import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Content collections, validated at build time.
 * The Pro version adds projects (before/after galleries), city landing
 * pages, FAQ, and a blog — see the README for the comparison.
 */

const services = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Icon name from src/components/common/Icon.astro */
      icon: z.string(),
      excerpt: z.string().max(220),
      heroImage: image(),
      heroImageAlt: z.string(),
      order: z.number().int(),
      processSteps: z
        .array(z.object({ title: z.string(), description: z.string() }))
        .length(4),
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
 * Opština landing pages (/lokacije/[slug]/) — pattern proven by #25.
 * Rakovica first (real base); 2nd opština = one content file, zero code.
 * naselja: real neighborhoods only, no coverage promises beyond copy.
 */
const opstine = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/opstine' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().max(220),
    naselja: z.array(z.string()).min(1),
    order: z.number().int(),
  }),
});

export const collections = { services, reviews, opstine };
