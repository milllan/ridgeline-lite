/**
 * Navigation structure for header and footer.
 */

export interface NavLink {
  label: string;
  href: string;
}

/** Primary navigation (desktop header + mobile menu). */
export const mainNav: NavLink[] = [
  { label: 'Usluge', href: '/services/' },
  { label: 'O nama', href: '/about/' },
  { label: 'Kontakt', href: '/contact/' },
];

/** Extra links shown in the mobile menu. */
export const secondaryNav: NavLink[] = [];

/** Footer "Company" column. */
export const footerCompanyNav: NavLink[] = [
  { label: 'O nama', href: '/about/' },
  { label: 'Kontakt', href: '/contact/' },
  { label: 'Zatražite ponudu', href: '/quote/' },
];
