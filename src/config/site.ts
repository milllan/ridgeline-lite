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
  // TODO: placeholder identity — logo wording + tagline to be confirmed
  logoText: 'Servis',
  logoSuffix: 'Veš Mašina',
  tagline:
    'Popravka veš mašina svih marki u Beogradu – brz dolazak, original delovi, garancija na rad.',
  /** Identity line shown in the top bar and footer. NOTE: no registered
   * business yet (2026-09) — must NOT claim registration; reword when it
   * gets registered. */
  licenseLine: 'Servis veš mašina – dolazak na kućnu adresu',

  /* ----------------------------------------------------------
   * Contact (NAP — keep identical everywhere for local SEO)
   * -------------------------------------------------------- */
  phone: '064/110-39-01',
  /** tel: link version of the phone number (digits only). */
  phoneHref: 'tel:+381641103901',
  // TODO: placeholder identity — replace with real business details
  email: 'servis@example.rs',
  address: {
    street: 'Vidikovački venac 104',
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
  // TODO: placeholder — confirm working hours with the business
  hours: [
    { days: 'Ponedeljak – Subota', open: '09:00', close: '17:00' },
    { days: 'Nedelja', open: 'ne radimo', close: '' },
  ],
  /** Schema.org openingHours strings (24h clock). */
  openingHoursSchema: ['Mo-Sa 09:00-17:00'],
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
  // TODO: placeholder — create a Formspree form and paste its real
  // endpoint here. Leads must NOT go to the theme author's endpoint.
  formEndpoint: 'https://formspree.io/f/TODO-FORM-ID',

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
    defaultTitle: 'Servis veš mašina Beograd – popravka svih marki',
    defaultDescription:
      'Popravka veš mašina u Beogradu – sve marke, original delovi, garancija na popravku. Pozovite 064/110-39-01 za brz termin.',
    /** Path to the default Open Graph image (in /public). */
    ogImage: '/og-default.jpg',
  },

  /* ----------------------------------------------------------
   * Theme — 'slate-orange' (scheme A) or 'blue-amber' (scheme B)
   * -------------------------------------------------------- */
  theme: 'slate-orange' as ThemeName,
} as const;

export type SiteConfig = typeof siteConfig;
