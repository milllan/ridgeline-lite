/**
 * Shared registry of brand marks used by BrandLogos tiles and the
 * /brendovi-ves-masina/ hub cards (epic #112 task 19). One source of
 * truth for logo paths and per-brand SEO alt text.
 *
 * SVGs in public/logos/ sourced from Wikimedia Commons (trademark of
 * respective owners; shown desaturated to signal independent service -
 * the site never claims "ovlašćeni" status). Brands without a mark fall
 * back to a styled text name in tiles; hub cards rely on their h3 text.
 *
 * Membership still comes from the brands collection via getPublished:
 * a `status: draft` brand's page does not generate, so it must not be
 * linked from anywhere (epic #112 task 4) - a registry entry whose slug
 * is not in the collection renders nowhere.
 */

export interface BrandTile {
  name: string;
  slug: string;
  /** File in /logos/ without extension prefix path. */
  logo?: string;
  alt: string;
}

export const brandTiles: BrandTile[] = [
  { name: 'Gorenje', slug: 'gorenje', logo: '/logos/gorenje.svg', alt: 'Logotip Gorenje' },
  { name: 'Whirlpool', slug: 'whirlpool', logo: '/logos/whirlpool.svg', alt: 'Logotip Whirlpool' },
  { name: 'Indesit', slug: 'indesit', logo: '/logos/indesit.svg', alt: 'Logotip Indesit' },
  { name: 'LG', slug: 'lg', logo: '/logos/lg.svg', alt: 'Logotip LG' },
  { name: 'Ariston', slug: 'ariston', logo: '/logos/ariston.svg', alt: 'Logotip Ariston' },
  { name: 'Beko', slug: 'beko', logo: '/logos/beko.svg', alt: 'Logotip Beko' },
  { name: 'Samsung', slug: 'samsung', logo: '/logos/samsung.svg', alt: 'Logotip Samsung' },
  { name: 'Bosch', slug: 'bosch', alt: 'Logotip Bosch' },
  { name: 'Electrolux', slug: 'electrolux', logo: '/logos/electrolux.svg', alt: 'Logotip Electrolux' },
  { name: 'Hisense', slug: 'hisense', logo: '/logos/hisense.svg', alt: 'Logotip Hisense' },
  { name: 'VOX', slug: 'vox', alt: 'Logotip VOX' },
  { name: 'Tesla', slug: 'tesla', alt: 'Logotip Tesla' },
  { name: 'Zanussi', slug: 'zanussi', logo: '/logos/zanussi.svg', alt: 'Logotip Zanussi' },
  { name: 'Candy', slug: 'candy', alt: 'Logotip Candy' },
];
