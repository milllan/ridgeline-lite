import { siteConfig } from '../config/site';
import { getAggregateRating } from './reviews';

/**
 * Basic HomeAndConstructionBusiness structured data, rendered on every
 * page. NAP, hours, and geo come from src/config/site.ts. The Pro
 * version adds per-city Service entities, FAQPage, Article, and
 * project ImageGallery markup.
 */
export async function buildLocalBusiness(site: URL) {
  const rating = await getAggregateRating();
  const { address, geo } = siteConfig;

  /** Same-as links — skip empty values so we never emit dead hrefs. */
  const sameAs = Object.values(siteConfig.social).filter((url) => url !== '');

  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': new URL('/#local-business', site).href,
    name: siteConfig.name,
    // SEO default description already names the trade (servis veš mašina).
    description: siteConfig.seo.defaultDescription,
    url: site.href,
    telephone: siteConfig.phoneHref.replace('tel:', ''),
    email: siteConfig.email,
    image: new URL(siteConfig.seo.ogImage, site).href,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      postalCode: address.zip,
      addressCountry: 'RS',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHours: siteConfig.openingHoursSchema,
    ...(sameAs.length > 0 && { sameAs }),
    ...(rating.count > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.average,
        reviewCount: rating.count,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };
}

/**
 * FAQPage structured data for a page's FAQ block (epic #28 C, #22 §3).
 * Consumes the same FaqItem[] the FaqSection renders, so the visible
 * answers and the schema can never drift apart.
 */
export function buildFaqPage(
  faqs: { question: string; answer: string }[],
  pageUrl: URL,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': new URL('#faq', pageUrl).href,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
