/**
 * ============================================================
 * Site configuration (single source of truth)
 * ============================================================
 * This file is the ONE place to change your company information.
 * Every page, the header, the footer, the contact page, and the
 * structured data (JSON-LD) read from here.
 *
 * See docs/customization.md for a field-by-field walkthrough.
 */

export type FormProvider = 'formspree' | 'netlify';
export type ThemeName = 'slate-orange' | 'blue-amber';

export interface TrustBadge {
  /** Icon name from src/components/common/Icon.astro */
  icon: string;
  /** Short label, e.g. "Licensed & Insured" */
  label: string;
}

export const siteConfig = {
  /* ----------------------------------------------------------
   * Company identity
   * -------------------------------------------------------- */
  // Owner-confirmed 2026-09-20: keep as is.
  name: 'Servis Veš Mašina Beograd',
  /** Short name used in the logo lock-up. */
  // Owner-confirmed 2026-09-20: keep as is.
  logoText: 'Servis za veš mašine',
  logoSuffix: '',
  /** Subline under the logo lock-up (empty = hidden). */
  logoSubtitle: 'Majstor Dejan · Beograd',
  // Tagline: owner wording 2026-09-16 (brand list for SEO; Indesit is in
  // the meta description, tagline keeps 6 + "i dr." for length).
  tagline:
    'Popravka veš mašina Beograd. Gorenje, Whirlpool, Indesit, Candy, Ariston, Beko, LG i dr. Majstor Dejan',
  /** Identity line shown in the top bar and footer. NOTE: no registered
   * business yet (2026-09) - must NOT claim registration; reword when it
   * gets registered. */
  licenseLine: 'Servis veš mašina, dolazak na kućnu adresu',

  /* ----------------------------------------------------------
   * Contact (NAP - keep identical everywhere for local SEO)
   * -------------------------------------------------------- */
  phone: '065/365-33-79',
  /** tel: link version of the phone number (digits only). */
  phoneHref: 'tel:+381653653379',
  // Owner-confirmed 2026-09-20. Domain mailbox on sculpiflex (HestiaCP);
  // webmail/IMAP creds are root-only on the server
  // (/root/.mail-kontakt-servisvesmasina-creds).
  email: 'kontakt@servisvesmasina-beograd.co.rs',
  /** Google Business Profile short link (share URL). Used for all
   * address references on the site + LocalBusiness hasMap. */
  gbpUrl: 'https://maps.app.goo.gl/7jgQ3FNCPz1Mf5Bg9',
  /** Direct "write a Google review" link (homepage CTA under the reviews
   * carousel). Place ID derived from gbpUrl's listing 2026-09-19 and
   * verified: q=place_id resolves to the business; writereview redirects
   * anonymous visitors to sign-in with a continue back to the form. */
  gbpReviewUrl:
    'https://search.google.com/local/writereview?placeid=ChIJGfaTpuxxWkcRWOH_QGll5-0',
  address: {
    street: 'Vidikovački venac 104, lokal 62',
    city: 'Rakovica, Beograd',
    zip: '11090',
  },
  /** Coordinates used in the HomeAndConstructionBusiness JSON-LD.
   * Owner-confirmed 2026-09-20 - matches the GBP pin placement. */
  geo: {
    latitude: 44.73961828380729,
    longitude: 20.416642569657256,
  },

  /* ----------------------------------------------------------
   * Hours
   * ---------------------------------------------------------- */
  // Times confirmed by the majstor 2026-09-15 ("Radno vreme od 8-20").
  // Owner-confirmed 2026-09-20: NOT WORKING on Sunday - deliberately
  // no Sunday row (Mon-Sat 08-20 only; schema omits Sunday accordingly).
  hours: [{ days: 'Ponedeljak - Subota', open: '08:00', close: '20:00' }],
  /** Schema.org openingHours strings (24h clock). */
  openingHoursSchema: ['Mo-Sa 08:00-20:00'],
  emergencyNote: 'Hitni pozivi vikendom po dogovoru.',

  /* ----------------------------------------------------------
   * Social profiles (used in footer + JSON-LD sameAs)
   * ---------------------------------------------------------- */
  // Owner decision 2026-09-20: no social profiles for now (empty = hidden).
  social: {
    facebook: '',
    instagram: '',
  },
  /* ----------------------------------------------------------
   * Analytics (StatCounter - same provider as the owner's other sites).
   * Renders in BaseLayout only in PROD builds with project > 0.
   * GA4 property "servisvesmasina-beograd.co.rs - GA4" (account
   * www.mill.iz.rs), created 2026-09-20. The gtag.js snippet renders
   * only on PROD builds of the registered domain; demo/dev builds
   * skip it so preview traffic stays out of the reports.
   * -------------------------------------------------------- */
  analytics: {
    statcounterProject: 13355162,
    statcounterSecurity: '0d30cb80',
    ga4MeasurementId: 'G-LK3SF74C49',
  },

  /* ----------------------------------------------------------
   * Lead form backend
   * ----------------------------------------------------------
   * formProvider:
   *   'formspree' - the form posts to `formEndpoint`.
   *                 Create a free form at https://formspree.io and
   *                 paste its endpoint below.
   *   'netlify'   - the form is tagged with data-netlify="true" and
   *                 submissions appear in your Netlify dashboard.
   *                 `formEndpoint` is ignored.
   * See docs/customization.md → "Connecting the forms".
   * -------------------------------------------------------- */
  formProvider: 'formspree' as FormProvider,
  // Real endpoint created by the owner 2026-09-15 (free tier: 50/mo,
  // AJAX submit + client redirect keeps /hvala/ without paid redirects).
  formEndpoint: 'https://formspree.io/f/meaojqko',

  /* ----------------------------------------------------------
   * Trust badges (header strip, quote page, footer)
   * ----------------------------------------------------------
   * Legal note: badges are rendered as text with generic icons.
   * Do NOT ship real manufacturer logos unless your client holds
   * the certification and has the official asset kit.
   * -------------------------------------------------------- */
  trustBadges: [
    { icon: 'shield-check', label: 'Garancija na rad i delove' },
    { icon: 'badge-check', label: 'Originalni delovi' },
    { icon: 'award', label: 'Sve marke mašina' },
    { icon: 'thumbs-up', label: 'Besplatna konstatacija uz popravku' },
    { icon: 'clipboard-check', label: 'Servis na terenu' },
  ] satisfies TrustBadge[],

  /* ----------------------------------------------------------
   * Stats (About page number wall, home page)
   * ---------------------------------------------------------- */
  stats: {
    yearFounded: 2010,
    projectsCompleted: 3500,
    warrantyYears: 1,
  },

  /* ----------------------------------------------------------
   * Default SEO
   * -------------------------------------------------------- */
  // NOTE: phone numbers live in meta descriptions and visible CTAs, never in
  // <title> (epic #112 task 11). defaultDescription embeds the phone - keep
  // in sync when siteConfig.phone changes.
  seo: {
    siteName: 'Servis Veš Mašina Beograd',
    /** Tail SEO.astro appends to page titles that lack it (see SEO.astro). */
    titleTail: 'Majstor Dejan',
    defaultTitle: 'Servis veš mašina Beograd | Majstor Dejan',
    defaultDescription:
      'Majstor za veš mašine Beograd, Gorenje, Whirlpool, Indesit, LG, Ariston, Beko, Candy. Original delovi, garancija na popravku. 065/365-33-79',
    /** Path to the default Open Graph image (in /public). */
    ogImage: '/og-default.jpg',
  },

  /* ----------------------------------------------------------
   * Theme - 'slate-orange' (scheme A) or 'blue-amber' (scheme B)
   * -------------------------------------------------------- */
  theme: 'slate-orange' as ThemeName,
} as const;

export type SiteConfig = typeof siteConfig;

/** True when an email is configured (real mailbox, owner-confirmed 2026-09-20). */
export const hasEmail = siteConfig.email.length > 0;
