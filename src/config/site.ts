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
  // TODO: placeholder identity — replace with real business details
  name: 'Servis Veš Mašina Beograd',
  /** Short name used in the logo lock-up. */
  // TODO: placeholder identity — logo wording to be confirmed
  logoText: 'Servis',
  logoSuffix: 'Veš Mašina',
  // Tagline confirmed by owner 2026-09-15: brand list appended for SEO
  // (top 5 by GSC impressions: Gorenje, Candy, Whirlpool, Ariston, Beko).
  tagline:
    'Popravka veš mašina Beograd – Majstor Dejan. Gorenje, Whirlpool, Candy, Ariston, Beko i dr.',
  /** Identity line shown in the top bar and footer. NOTE: no registered
   * business yet (2026-09) — must NOT claim registration; reword when it
   * gets registered. */
  licenseLine: 'Servis veš mašina, dolazak na kućnu adresu',

  /* ----------------------------------------------------------
   * Contact (NAP — keep identical everywhere for local SEO)
   * -------------------------------------------------------- */
  phone: '064/110-39-01',
  /** tel: link version of the phone number (digits only). */
  phoneHref: 'tel:+381641103901',
  // TODO: placeholder identity — replace with real business details
  // Domain mailbox on sculpiflex (HestiaCP); webmail/IMAP creds are
  // root-only on the server (/root/.mail-kontakt-servisvesmasina-creds).
  email: 'kontakt@servisvesmasina-beograd.co.rs',
  address: {
    street: 'Vidikovački venac 104, lokal 62',
    city: 'Rakovica, Beograd',
    zip: '11090',
  },
  /** Coordinates used in the HomeAndConstructionBusiness JSON-LD.
   * OSM Nominatim house-level match (2026-09-15); TODO: verify on-site. */
  geo: {
    latitude: 44.7396,
    longitude: 20.4166,
  },

  /* ----------------------------------------------------------
   * Hours
   * ---------------------------------------------------------- */
  // Times confirmed by the majstor 2026-09-15 ("Radno vreme od 8-20").
  // TODO: confirm Sunday – until then no Sunday row is published
  // (CodeRabbit #27: no unconfirmed "closed" claim may render).
  hours: [{ days: 'Ponedeljak – Subota', open: '08:00', close: '20:00' }],
  /** Schema.org openingHours strings (24h clock). */
  openingHoursSchema: ['Mo-Sa 08:00-20:00'],
  emergencyNote: 'Hitni pozivi vikendom po dogovoru.',

  /* ----------------------------------------------------------
   * Social profiles (used in footer + JSON-LD sameAs)
   * ---------------------------------------------------------- */
  // TODO: placeholder identity — add real social profile URLs (empty = hidden)
  social: {
    facebook: '',
    instagram: '',
  },
  /* ----------------------------------------------------------
   * Analytics (StatCounter — same provider as the owner's other sites).
   * Renders in BaseLayout only in PROD builds with project > 0.
   * -------------------------------------------------------- */
  analytics: {
    statcounterProject: 13355162,
    statcounterSecurity: '0d30cb80',
  },

  /* ----------------------------------------------------------
   * Lead form backend
   * ----------------------------------------------------------
   * formProvider:
   *   'formspree' — the form posts to `formEndpoint`.
   *                 Create a free form at https://formspree.io and
   *                 paste its endpoint below.
   *   'netlify'   — the form is tagged with data-netlify="true" and
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
  // TODO: placeholder claims — business must confirm each before launch
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
  // TODO: placeholder numbers — confirm with the business. Note:
  // warranty is really 6–12 months; warrantyYears is 1 for now and
  // display wording gets fixed when components are translated (T3).
  stats: {
    yearFounded: 2010,
    projectsCompleted: 3500,
    warrantyYears: 1,
  },

  /* ----------------------------------------------------------
   * Default SEO
   * -------------------------------------------------------- */
  // NOTE: defaultDescription embeds the phone number — keep in sync when
  // siteConfig.phone changes.
  seo: {
    siteName: 'Servis Veš Mašina Beograd',
    defaultTitle: 'Servis veš mašina Beograd | Majstor Dejan 064/110-39-01',
    defaultDescription:
      'Popravka veš mašina u Beogradu: sve marke, original delovi, garancija na popravku. Pozovite 064/110-39-01 za brz termin.',
    /** Path to the default Open Graph image (in /public). */
    ogImage: '/og-default.jpg',
  },

  /* ----------------------------------------------------------
   * Theme — 'slate-orange' (scheme A) or 'blue-amber' (scheme B)
   * -------------------------------------------------------- */
  theme: 'slate-orange' as ThemeName,
} as const;

export type SiteConfig = typeof siteConfig;

/** True when a real (non-placeholder) email is configured. */
export const hasEmail = !siteConfig.email.toLowerCase().endsWith('@example.rs');
