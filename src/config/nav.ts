/**
 * Navigation structure for header and footer.
 */

export interface NavLink {
  label: string;
  href: string;
}

/** Primary navigation (desktop header + mobile menu). */
export const mainNav: NavLink[] = [
  { label: 'Usluge', href: '/usluge/' },
  { label: 'O nama', href: '/o-nama/' },
  { label: 'Kontakt', href: '/kontakt/' },
];

/** Extra links shown in the mobile menu. */
export const secondaryNav: NavLink[] = [];

/**
 * Footer "Lokacije" column (epic #112 task 7): the coverage hub. The
 * opštine links below it are built in Footer.astro from the opstine
 * collection, so a status:draft opština can never leave a dead footer
 * link (same choke-point rule as the Usluge column).
 */
export const footerLocationsNav: NavLink[] = [
  { label: 'Sve lokacije', href: '/lokacije/' },
];
