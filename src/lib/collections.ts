import { getCollection } from 'astro:content';

/**
 * Collections read through the publication filter (everything but reviews —
 * the reviews schema has no status field; review data is epic #112 task 1's
 * concern and stays on raw getCollection).
 */
type PublishedCollection = 'services' | 'opstine' | 'brands';

/**
 * Single choke point for published-content reads: entries with frontmatter
 * `status: draft` are filtered out here, so draft pages neither generate
 * (getStaticPaths) nor appear in any listing/nav (no dead links) (epic #112
 * task 4).
 */
export async function getPublished<Name extends PublishedCollection>(name: Name) {
  const entries = await getCollection(name);
  return entries.filter((entry) => entry.data.status !== 'draft');
}
