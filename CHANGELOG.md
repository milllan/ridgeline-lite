# Changelog

All notable changes to this fork are documented here. The format loosely
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.47.0] - 2026-09-21

Sadržaj iz istraživačkog dokumenta (research/), vođeno GSC podacima starog
domena (servisvesmasina.co.rs, 500 dana, 132k impresija). (1) Nova opštinska
stranica Vračar (/lokacije/vracar/): vracar.mdx (Neimar, Istočni Vračar,
Englezovac; najgušće naseljena opština; 3 lokalna FAQ-a), lokalni hook i ručno
nabrajanje opština u meta opisu /lokacije/ ažurirani (komentar u fajlu to
zahteva), footer token Vračar sada linkuje (loc() umesto golog teksta).
(2) Amortizeri: nova sekcija u beko.mdx (simptom: mašina udara i pomera se,
bubanj ne klima; kada se ne rastavlja) + commonFaults tag, diferencijacija
ležajevi/amortizeri u popravka-ves-masina.mdx simptom listi i
zamena-lezajeva-zaptivaca.mdx prozi, novi FAQ (lupa i skače, ali bubanj ne
klima) na ležajevi stranici. (3) README: 15->14 brendova (zastarelo nakon Miele uklanjanja #137), 4->5
opština. GSC validacija: Zemun
(1608 imp/500d) i Voždovac (642) jedini ne pokriveni hubovi s dokazanom
potražnjom; Vračar (57) izabran kao jedina dodatna stranica po odluci vlasnika.

## [2.46.0] - 2026-09-21

Vlasnički zaokret: novi vizuelni identitet, footer i recenzije
reorganizovani, Miele izbačen iz ponude. (1) Novi logo: img-based
Logo.astro (logo-masina-za-ves-servis-beograd.svg), redizajniran favicon,
schema.org logo pokazuje na novi fajl (stari favicon-washer-wrench.svg
uklonjen). (2) Footer: uklonjene kolone Kompanija i Usluge, Kontakt
kolona proširena (1.5fr grid), novi opis sa opštinama i brendovima -
rečenica po redu, svako ime linkuje na stranicu gde postoji
(kolekcije-driven, draft ne može ostaviti mrtav link). (3) Recenzije:
ceo ocena-blok + eyebrow "Recenzije" linkuju na Google write-review,
CTA "Ostavite Google recenziju" ispod ocene, tamni strip posle karusela
uklonjen. (4) Karusel recenzija: scroll-driven edge fades (čist CSS,
timeline u posebnom pravilu jer minifier ga savija u animation
shorthand). (5) Miele pravilo: brend se NE servisira; stranica, logo,
forma i tekst uklonjeni; content-gate marker Miele; .htaccess 301 svih
Miele varijanti ka /brendovi-ves-masina/; pravilo upisano u AGENTS.md.

## [2.45.1] - 2026-09-21

Prikaz novog broja prebačen u srpski zapisni format:
065/365-33-79 (kao ranije 064/110-39-01), umesto privremenog
065-3653379. Zamenjeno na istih 30 mesta (siteConfig.phone,
seo.defaultDescription rep, 25x seoDescription rep, content.config.ts
komentari). tel: link ostaje tel:+381653653379.

## [2.45.0] - 2026-09-21

Nova telefonska linija: 065-3653379 (zamenjuje 064/110-39-01).
Zamenjeno svuda: siteConfig.phone + phoneHref (tel:+381653653379),
seo.defaultDescription rep, "Majstor Dejan:" rep u svih 25
seoDescription frontmatter polja (brendovi/usluge/opštine) i komentari
u content.config.ts. JSON-LD telephone se izvodi iz phoneHref pa se
ažurirao automatski; og-default.jpg ne sadrži telefon (bez
regeneracije). NAP napomena: broj treba ažurirati i u Google Business
Profilu da lokalni SEO NAP ostane konzistentan.

## [2.44.0] - 2026-09-20

GA4 (Google Analytics 4) integracija. Kreiran property
"servisvesmasina-beograd.co.rs - GA4" na nalogu www.mill.iz.rs
(measurement ID G-LK3SF74C49, web stream za
https://servisvesmasina-beograd.co.rs, timezone Srbija, valuta RSD,
kategorija Home & Garden, ciljevi: Generate leads + Understand web
traffic). gtag.js tag se renderuje u <head> BaseLayout-a samo na PROD
buildovima registrovanog domena - demo build (vesmasine.wpspeedopt.net)
i dev server preskaču tag da preview saobraćaj ne prlja izveštaje.
StatCounter ostaje nepromenjen. Novo polje u siteConfig.analytics:
ga4MeasurementId.

## [2.43.1] - 2026-09-21

Kontakt i ponuda forme: input/select/textarea polja dobila belu pozadinu
(bg-white) + suptilnu senku (shadow-sm). Bila su transparentna pa su se
stapala sa bg-surface (#f8fafc) sekcijom i delovala nevidljivo.

## [2.43.0] - 2026-09-20

Epic #112 task 3 FINAL - sva identity polja potvrđena od vlasnika:
name + logoText ostaju kakvi jesu, geo koordinate ažurirane na tačan
GBP pin (44.73961828380729, 20.416642569657256), socijalni profili =
nema za sada. content-gate prvi put ČIST (27 fajlova, 0 markera) i od
sada UGRAĐEN u postbuild lanac: build failuje ako bilo koji
production-facing fajl sadrži TODO/DRAFT/PLACEHOLDER/SAMPLE/@example/
UNVERIFIED/potvrditi marker ili status:draft (CONTENT_GATE_SKIP za
lokalni override). Unconfirmed content više ne može da se shipuje.

## [2.42.0] - 2026-09-20

Vlasničko pravilo: povlačenje crte (en-dash) zabranjeno svuda, uključujući
datume i vremenske raspone (em-dash je već bio zabavljen). Sweeping izmena
preko 41 fajla (src/ + CHANGELOG): sve \u2013 i \u2014 zamenjene običnim
minusom. Vidljivo na sajtu: sati u headeru/footeru/kontaktu (08:00-20:00,
Ponedeljak - Subota) i jedna rečenica u whirlpool.mdx. serbian-copy-gate
scanner sada HARD-banuje svaki en-dash (bez izuzetka za raspone).

## [2.41.0] - 2026-09-20

Sadržajni markeri očišćeni po vlasničkim odlukama 2026-09-20: email
potvrđen (kontakt@servisvesmasina-beograd.co.rs; hasEmail refaktorisano
bez @example.rs literala koji je večno tripovao content-gate), nedelja
potvrđena = NE radi se (nedeljni red namerno ostaje nepublikovan,
Pon-Sub 08-20, schema bez nedelje), svih 15 brend DRAFT blokova i 6
servisnih TODO komentinara uklonjeno - SEO copy je odgovornost web
dev-a, potvrda servisera nije potrebna za tu vrstu sadržaja.
content-gate: 27 fajlova sa nalazima → 1 (samo još identity polja:
name, logoText, geo, social). Render izlaz identičan: whitespace-only
delta na 6 usluge strana (dokazano normalizacijom), ostalih 28 strana
byte-identično.

## [2.40.1] - 2026-09-20

AGENTS.md: novo pravilo vlasnika - brzina sajta je non-factor (sajt je
veoma brz); nikakva merenja ni optimizacije performansi (epic #112
taski 17+22 zatvoreni iz istog razloga).

## [2.40.0] - 2026-09-20

Lokacije Service schema dopuna (epic #112 task 12 follow-up, iz #124
recenzije): /lokacije/[slug]/ Service blokovi dobijaju `url` (kanonski
URL stranice) i `description` (seoDescription ?? excerpt) - identičan
obrazac kao usluge stranice iz 2.35.0. Sada SVI Service blokovi na sajtu
imaju url + description.

## [2.39.0] - 2026-09-20

Repo identitet bez roofing nasleđa (epic #112 taski 13+14). `package.json`:
ime `ridgeline-lite` → `servis-ves-masina-beograd`, opis → tačan opis sajta
(statički Astro sajt za servis veš mašina u Beogradu); samo ta dva polja,
bez bumpa verzije i bez izmena skripti/dependensija. `README.md` kompletno
prepisan (engleski, developer-facing): šta je sajt, struktura (~34 strane),
quickstart, mapa sadržaja (site.ts, content kolekcije, nav/brandLogos),
quality gates (content:gate, postbuild seo-gate, serbian-copy-gate), draft
workflow preko `getPublished`, deploy (rsync u public_html). Uklonjen
`.github/preview.jpg` iz README (fajl ostaje) i Lite-vs-Pro marketing.
`MIGRATION.md` obrisan (zastareo template-era dokument; istorija živi u git +
CHANGELOG). Build zelen: 34 strane, seo-gate 0 FAIL, astro check 0 errors.

## [2.38.0] - 2026-09-20

Horizontalni overflow popupravke - mereno headless Chromiumom na 5 širina
(360/375/1024/1100/1280), pre i posle: 28/13/44/32/2 px → 0/0/0/0/0.
Dijagnoza (P4 paket, 14 širina + bisect): "ReviewsCarousel 1024px
overflow" bila je pogrešna atribucija - karusel ne doprinosi page-level
overflowu (overflow-x-auto klipuje, karte se dele čisto). Pravi krivci:
(1) footer email link (nebreakabilan token 203px u lg:grid-cols-6 koloni
od 127px na 1024px) → `break-all` na mailto anchoru; (2) header logo
anchor `shrink-0` + logo lockup bez min-w-0 (na 360-375px gura action red
na 388px) → `min-w-0` lanac na anchoru i u Logo.astro da se tekst brenda
prelomi samo pod pritiskom prostora. Skip-link (L-1) je off-screen a11y
element, ne pravi overflow.

## [2.37.0] - 2026-09-20

FAQ semantika + 1024px overflow dijagnoza (epic #112 task 15 + parked
micro-fix). FaqSection: `<summary>` sada sam nosi tipografiju pitanja
(`font-heading text-xl font-bold uppercase tracking-wide` prebačeno sa
h3 na summary, vizuelno identično) - bez heading elementa u i oko
summary-ja; pitanja ostaju pristupačna kroz nativnu details/summary
semantiku (ime iz sadržaja summary-ja, collapse/expand stanje, tastatura).
Heading outline gubi h3-nivoe pod sekcijom h2 - svesna odluka (h3 OKO
details bi bio nevalidan HTML: content model h1-h6 je phrasing content;
h3-ov `inline` utility je otpao jer je bio inertan - flex item se
blokifikuje).
Parked "ReviewsCarousel 1024px overflow": karusel OSLOBOĐEN merenjima
(headless Chromium, 14 širina 360-1440) - njegov `overflow-x-auto` ul
klipuje sav sadržaj, nema page-level overflow na nijednoj širini, a
širine kartica (85%/45%/31% + gap 20px) dele scrollport sa namernim
peek-om. Pravi krivac page-level overflow-a od 1024 do ~1289px: kontakt
email u footeru (`kontakt@servisvesmasina-beograd.co.rs`, min-content
203px) prelazi svoju `lg:grid-cols-6` kolonu od ~127px (=(960−5×40)/6≈126.7)
→ +44px na 1024px; predlog follow-up fix: `break-all` na email linku
(Footer.astro, van scope-a ovog paketa zbog paralelnih task-23 grana).
Poseban nalaz: header telefon+hamburger red ima min-width ~388px →
page-level overflow na 360-414px (Header.astro, takođe follow-up).
Gates: 34 strane, seo-gate 0 FAIL / 1 pre-existing WARN (kontakt),
astro check 0/0/0, content-gate bez novih nalaza, 99/99 FAQ blokova na
24 strane sa novom strukturom.

## [2.36.0] - 2026-09-20

Higijena alt tekstova logotipa (epic #112 task 21): svi 15 alt-ova u
registry-ju brandLogos.ts zamenjeni neutralnim `Logotip X` obrascem
(umesto keyword-stuffed altova tipa "Servis Gorenje veš mašina
Beograd") - usklađeno sa hub-card obrascem iz #117 cross-lane review-a;
anchor tekst oko logotipa već nosi SEO kontekst. Uklonjen
nekorišćen `LogoWasherWrench.astro` (task 16, nula importa potvrđena
grep-om). `public/de1b28972cff1b5e8f8f0424f3650799.txt` (site
verification token) i `public/favicon-washer-wrench.svg` namerno
netaknuti - favicon dobija novu ulogu kao LocalBusiness logo u paralelnom
PR-u.

## [2.35.0] - 2026-09-20

Čišćenje schema.org markupa (epic #112 task 12). LocalBusiness: uklonjen
izmišljeni `priceRange: '$$'` - biznis ne definiše cenu, pa ni semantika
ne treba da je tvrdi; dodat eksplicitni `logo`
(`/favicon-washer-wrench.svg`, apsolutni URL - do sada je OG slika
imala duplu ulogu `image`-a, a favicon je stajao neiskorišćen).
Service blokovi na /usluge/[slug]/ stranicama dobijaju `url` (kanonski
URL stranice) i `description` (seoDescription ?? excerpt) - prethodno
su imali samo name/serviceType/provider/areaServed. FAQPage,
BreadcrumbList i ostali schema blokovi nisu dirani.

## [2.34.0] - 2026-09-20

Popularni brendovi u footeru prema realnoj potražnji (epic #112 task 23
dorada). POPULAR_BRAND_SLUGS: gorenje, bosch, samsung, lg -> gorenje,
samsung, beko, candy. Signali (2026-09-20): google.rs autocomplete za
"servis ves masine" nabraja gorenje/candy/samsung/beko; sister-GSC
(servis frizidera, 365d) gorenje 3612 / samsung 2479 / beko 1910
impresija; candy slaba na friziderima ali konzistentna na svim
autocomplete listama za veš mašine (budget installed base); bosch i lg
slabi na washer-specifičnim signalima. Hub lead i meta description
ažurirani na novi izbor marki. Breadcrumb GSC alert ("Missing field
item") proveren na live sajtu: svi itemListElement imaju item još od
#116/#117 - alert je stari crawl, čeka se re-validacija u GSC.

## [2.33.0] - 2026-09-20

Fix vizuelnog prikaza brendova (epic #112, follow-up). Grid varijanta
BrandLogos sekcije: tile-ovi više nemaju `flex-1` pa se poslednji red
ne razvlači preko cele širine (na početnoj strani sa 15 logotipa je
samousamljeni logo u 3. redu izgledao razvučeno). Tile dobija fiksne
širine po breakpoint-u (1 kolona na mobilnom, 3 od `sm`, 5 od `lg` -
redovi se pune tačno, bez rastezanja), a nedovršen poslednji red se
centrira (`justify-center`), u duhu centriranog naslova sekcije. Strip
(marquee) varijanta ostaje nepromenjena. Uklonjen i zastareo TODO komentar
u o-nama.astro o garanciji "6-12 meseci" - garancija je potvrđena: 1 godina.

## [2.32.0] - 2026-09-20

Footer "Marke" kolona trim + "bilo koja marka" framing (epic #112 zadatak 23).
Kolona umesto hub-linka + svih 15 brendova (16 linkova, najviša kolona) sada
nosi 6 linkova: hub "Servis po markama", 4 popularna brenda (gorenje, bosch,
samsung, lg - predlog vlasniku za odluku u PR-u) i novi link "Svi
brendovi" na /brendovi-ves-masina/. Popularni brendovi se rešavaju iz
getPublished('brands') liste po slugu, pa draft-suppression ostaje netaknuta
(brand sa status: draft se automatski ne renderuje). Grupa ostaje na
lg:grid-cols-6. Framing: vlasnik je 2026-09-20 potvrdio da se servisiraju
SVE marke (badge "Sve marke mašina" tačan), pa je hub uvod na
/brendovi-ves-masina/ preformulisan ("Servisiramo sve marke veš mašina, a
Gorenje, Bosch, Samsung i LG su samo neke od njih...") - 15 stranica su
primeri, ne kompletna lista; footer blurb ("sve marke") ostaje usklađen.
Copy-gate: 0 novih HARD/SOFT nalaza.

## [2.31.0] - 2026-09-20

Internal-link mesh brend ↔ lokacija ↔ usluge (epic #112 zadatak 9). Nova
komponenta LocationLinks.astro: kompaktan strip s pilulama ka objavljenim
/lokacije/[slug]/ stranicama plus hub link (lista isključivo kroz
getPublished, draft opštine se nikad ne linkuju; prop `exclude` za sibling
mod). Brend stranice dobijaju strip „Servis u vašoj opštini", service
stranice isti strip (BrandLogos grid već vodi ka brendovima), a opštinske
stranice sibling strip „Dolazimo i u ove opštine" (bez pilule svoje
opštine). DESIGN PROMENA u ServicesGrid.astro: naslovi karata su sada
linkovi na /usluge/[slug]/ detaljne stranice - na naslovnoj, brendovima i
opštinama - dok „Zatražite ponudu" ostaje sporedni CTA; karte više ne
završavaju na formi za ponudu. Verifikacija: 34 stranice, dist crawl 62
internih href / 0 mrtvih, seo-gate 0 FAIL, copy-gate 0 novih nalaza,
content-gate bez novih nalaza.

## [2.30.0] - 2026-09-20

Business claims potvrđeni (vlasnik + Dejan, 2026-09-20) - uklonjeni TODO
markeri iz src/config/site.ts (epic #112 zadatak 3). Brišu se komentari
iznad trustBadges niza i stats bloka: placeholder TODO za bedževe i
"placeholder numbers" TODO sa napomenom o garanciji 6-12 meseci. Vrednosti
su već bile ispravne i ostaju nepromenjene: godina osnivanja 2010, 3500+
popravki, garancija IS 1 godina (warrantyYears: 1). Od pet bedža u nizu,
četiri novopotvrđena (Originalni delovi, Besplatna konstatacija, Sve marke
mašina, Servis na terenu) ostaju uz već postojeći "Garancija na rad i
delove". Comments-only promena: dist build byte-identičan
baseline-u. Preostali TODO markeri (identity polja, geo, nedelja, social)
čekaju svoje potvrde i nisu dirani.

## [2.29.0] - 2026-09-20

Broj telefona izbačen iz svih <title> (epic #112 zadatak 11). Kompozicija
naslova rework u src/components/common/SEO.astro: sufiks koji se dopisuje
naslovima bez identifikacije menja ime sajta ("| Servis Veš Mašina Beograd")
kratkim person-brend repom "| Majstor Dejan" (novi seo.titleTail u
src/config/site.ts), pa "Servis Gorenje veš mašina u Beogradu | Servis Veš
Mašina Beograd" redundancija nestaje; pun naziv sajta ostaje u og:site_name.
defaultTitle: "Servis veš mašina Beograd | Majstor Dejan" (bez telefona).
Strip " | Majstor Dejan 064/110-39-01" iz 25 seoTitle frontmatter polja
(15 brendova + 6 usluga + 4 opštine) - rep se sada dopisuje centralno.
Telefon ostaje u meta descriptionima, vidljivim CTA i LocalBusiness šemi:
nova opcionalna seoDescription polja (content.config.ts, sve 3 kolekcije;
meta-only, excerpt i dalje vidljivi lead/karte - telefon se ne rasipa po
listing karticama) nose rep "Majstor Dejan: 064/110-39-01." u sva 25 fajla
(133-158 znakova); [slug]. stranice koriste seoDescription ?? excerpt
fallback. Bonus (vlasnik, rešava "Title is short" WARN s kraće repom):
kontakt i o-nama dobijaju keyword naslove. o-nama: "O nama: servis veš
mašina u Beogradu" (52 znaka s repom; lokativ "u Beogradu" namerno -
nominativ bi sadržao puno ime sajta kao substring i preskočio bi
"| Majstor Dejan" rep u kompozitoru). kontakt: vlasnikov finalni naslov
"Kontakt: servis veš mašina, Dorćol, Stari Grad, Majstor Dejan" (61
znak, prolazi kroz kompozitor nepromenjen - sadrži "Majstor Dejan";
"Dorcol" normalizovan na "Dorćol"; NAP napomena: adresa na strani je
Rakovica, "Dorćol, Stari Grad" čita se kao serviced opština).
Verify: build zelen, astro check 0 grešaka, seo-gate 0 FAIL,
content:gate čist, serbian-copy-gate 0 novih HARD nalaza, dist: 0 telefona
u <title>, 26/26 meta descriptiona s telefonom. Napomena: GSC skraćene
naslove re-renderuje nekoliko dana - očekivano.

## [2.28.0] - 2026-09-20

/brendovi-ves-masina/ hub stranica + "Marke" breadcrumb link + footer "Marke"
kolona (epic #112 zadatak 19). Nova src/pages/brendovi-ves-masina/index.astro,
po uzoru na /lokacije/ hub (#116): H1 "Servis veš mašina po markama", intro bez
"sve marke" tvrdnje (nepotvrđena tvrdnja, epic #112), 15 karata brendova iz
getPublished('brands') (naslov, excerpt i logotip iz registra; status:draft
brend se ne pojavljuje), cross-link sekcija ka /usluge/ i /lokacije/, tel +
/zatrazi-ponudu/ CTA i FinalCTA. Registar logotipa izdvojen iz BrandLogos.astro
u novi src/config/brandLogos.ts (shared source of truth za tile i hub karte;
BrandLogoTile uvozi tip odatle). Breadcrumb "Marke" na brend stranicama dobija
href '/brendovi-ves-masina/' pa BreadcrumbList ListItem dobija item URL
(komentar u Breadcrumbs.astro ažuriran: svi posredni kruhovi sada imaju href).
Footer dobija "Marke" kolonu (footerBrandsNav u src/config/nav.ts + brendovi iz
getPublished('brands') u Footer.astro, grid lg:grid-cols-5 -> 6; hub link +
15 brend linkova u jednoj koloni, najviša kolona u footeru - plasman i dužina
ostavljeni vlasniku na uvid u PR-u). Verify: build zelen (34 stranice), astro
check 0 grešaka, seo-gate 0 FAIL, /brendovi-ves-masina/ u sitemap-u,
privremeni status: draft brend se ne pojavljuje na hubu ni u footeru,
serbian-copy-gate 0 novih HARD nalaza.

## [2.27.0] - 2026-09-20

/lokacije/ hub stranica + footer "Lokacije" kolona + breadcrumb link (epic
#112 zadaci 6, 7 i 8). Nova src/pages/lokacije/index.astro: H1 i intro o
terenskom servisu u Beogradu, četiri opštine kao linkovi s lokalnim hookom
(Rakovica, Stari grad, Novi Beograd, Savski venac; hook iz činjenica već
objavljenih na opštinskim stranicama, fallback na frontmatter excerpt),
ServiceAreaMap + sekcija "Kako pokrivamo Beograd" (radionica u Rakovici,
popravka na adresi, preuzimanje i vraćanje mašine) i CTA tel +
/zatrazi-ponudu/. Footer dobija "Lokacije" kolonu (footerLocationsNav u
src/config/nav.ts + opštine iz getPublished('opstine') u Footer.astro, grid
lg:grid-cols-4 -> 5); header nav nije diran, plasman u glavnu navigaciju je
vlasnička odluka. Breadcrumb "Lokacije" na opštinskim stranicama sada vodi
na /lokacije/ pa BreadcrumbList ListItem dobija item URL ("Marke" crumb ostaje,
zadatak 19). Verify: build zelen (33 stranice), astro check 0 grešaka,
seo-gate 0 FAIL, /lokacije/ u sitemap-u, serbian-copy-gate 0 HARD nalaza.

## [2.26.0] - 2026-09-19

LocalBusiness JSON-LD bez aggregateRating (epic #112 zadatak 2).
Uklonjen getAggregateRating uvoz i uslovni spread iz
src/lib/schema.ts; funkcija ostaje u src/lib/reviews.ts za vidljivi
UI recenzija (Hero, ReviewsCarousel, o-nama, zatrazi-ponudu; to je
zadatak 1 i teče odvojeno, čeka prave GBP recenzije). aggregateRating
se ne vraća ni kasnije: ocene koje sam objavljuje sajt su po Google
smernicama self-serving (ne važe za rich results), pa struktuirani
podaci ostaju bez njega trajno. Ostala polja LocalBusiness šeme
nepromenjena. Verify: build zelen (32 stranice), astro check 0
grešaka, nijedan emitovani HTML ne sadrži aggregateRating ključ.

## [2.25.1] - 2026-09-19

Reviews proglašene autentičnim (epic #112 task 1, vlasnička odluka 2026-09-19):
uklonjeno SAMPLE/placeholder upozorenje iz `src/content/README.md` - recenzije u
`reviews.json` se tretiraju kao produkcioni sadržaj; nove se dodaju iz Google
Business Profile izvoza kad budu dostupne (#5). Ponašanje sajta nepromenjeno
(`reviews.json` već nije imao markere - content gate ga i dalje prolazi čist).

## [2.25.0] - 2026-09-19

Content-readiness gate + draft-suppression plumbing (epic #112 task 4).
`npm run content:gate` (standalone Node skripta; još NIJE u build lancu -
wiring se dodaje tek kad se sadržajni dug iz prvog run-a očisti) failuje na
markerima TODO/DRAFT/PLACEHOLDER/SAMPLE/@example/UNVERIFIED/potvrditi u
src/config/site.ts + src/content/**/*.mdx + src/content/*.json (samo
top-level json), uz allowlist CHANGELOG/docs/AGENTS (CONTENT_GATE_ALLOW) i
CONTENT_GATE_SKIP prekidač. Frontmatter `status: draft` u mdx = posebna
DRAFT-STATUS kategorija (bez duplog prijavljivanja kao keyword hit) i
takođe failuje gate. status:draft stranice se NE generišu i ne pojavljuju
se ni u jednom linku/listi/nav-u (no dead links) - novi getPublished choke
point (src/lib/collections.ts); svi getCollection pozivi za
services/brands/opstine zamenjeni, reviews ostaje na sirovom
getCollection (nema status polje); BrandLogos statična lista (logo/alt
podaci) filtrira se kroz getPublished - draft brend se ne linkuje ni sa
jedne stranice (review nalog). Gate hardening iz review rundе: UTF-8 BOM
strip ispred frontmatter parse, YAML # komentar tolerancija na status
liniji, nečitljiv fajl u scope-u = [UNREADABLE] finding (ne crash, ne
skip), prazan scan (pogrešan cwd) = fail (nikad "clean"), neobrađiv
content dir (ENOTDIR/EACCES na samom direktorijumu) takođe fail-closed,
POSIX path separatori svuda (allowlist radi i na Windowsu). Prvi run failing
inventory je deliverable (docs/content-gate-inventory-2026-09-19.md):
27 fajla, 22 sa nalazima (TODO 14, DRAFT 15, PLACEHOLDER 13, @example 1,
potvrditi 6). Verify: fixture pass-path exit 0 (uz allowlist),
draft-status fixture exit 1, BOM+YAML-komentar fixture = DRAFT-STATUS,
nečitljiv fajl = UNREADABLE, prazan dir = exit 1; draft-suppression
build brenda (beko.mdx status: draft): dist 32 → 31 stranica,
/brendovi-ves-masina/beko-majstor/ van dist-a i sitemap-a, 0 href-ova
na nju u celom dist-u (BrandLogos fix); build/check/seo-gate zeleni.

## [2.24.11] - 2026-09-19

Sufiks brend slug-ova: -servis -> -majstor (owner izbor; /brendovi-ves-masina/
direktorijum ostaje). Ista izmena na svim mestima: getStaticPaths, oba link
buildera (BrandLogoTile, usluge chips), ariston.mdx in-content link, komentari.
.htaccess redirect lanac nadograđen: /brendovi/[slug]/ I kratko živeći
/brendovi-ves-masina/[slug]-servis/ oba 301 -> /brendovi-ves-masina/[slug]-majstor/
(dvostruki sufiks guard sada (?:servis|majstor)). Verify: dist 15 -majstor
stranica, 0 stale -servis href-ova, sitemap 15 novih URL-ova, copy-gate 0 NEW,
build/check/seo-gate zeleni; live curl nakon deploya.

## [2.24.10] - 2026-09-19

URL restrukttura brend stranica (owner zahtev): /brendovi/[slug]/ ->
/brendovi-ves-masina/[slug]-servis/ (npr. /brendovi/beko/ ->
/brendovi-ves-masina/beko-servis/). Route dir preimenovan
(src/pages/brendovi-ves-masina/), getStaticPaths dodaje -servis
sufiks, oba link buildera (BrandLogoTile, usluge index chips)
ažurirana, ariston.mdx in-content cross-link ka Indesitu ažuriran
(jedini content link). Copy-gate 0 NEW. 301 redirecti server-side u
.htaccess (static Astro redirect je samo meta-refresh, ne 301):
RedirectMatch 301 ^/brendovi/([a-z0-9-]+?)(?:-servis)?/?$ ->
/brendovi-ves-masina/$1-servis/ (+ /brendovi/ sam -> /usluge/),
.htaccess backup na /root/.htaccess-backup-2026-09-19. Verify: dist
15 novih stranica, 0 stale /brendovi/ linkova, sitemap na novim
URL-ovima, curl 301 + Location na starim; build/check/seo-gate zeleni.
Napomena: Search Console će preindeksirati preko 301 + novog sitemap-a.

## [2.24.9] - 2026-09-19

BrandLogos 'strip' varijanta (samo /lokacije/[slug]) postaje pure-CSS
marquee (owner: "one line but auto rotate"): duple liste u beskonačnoj
petlji (translateX -50% - gap), 45s linear, pauza na hover/focus,
edge fade maskom, duplikat aria-hidden (linkovi se čitaju jednom),
prefers-reduced-motion fallback na statični wrappujući grid (width
reset na track-u - max-content bi inače blokirao wrap). Prelučaj
tile izdvojen u novi BrandLogoTile.astro (grid i marquee varijanta
ga dele; {#snippet} sintaksa pada na ovom astro compileru -
"Expected in" CompilerError, zato child-component pristup).
Verify: animation ime/dužina + kretanje track-a, seam matematika
(track = 2×set+gap), tile 172px u jednom redu, RM 3 reda wrap +
duplikat hidden, mobilni 375px bez novog overflow-a (382px je
prethodni header issue), screenshotovi; build/check/seo-gate zeleni.

## [2.24.8] - 2026-09-19

Bg ritam naizmeničan na celom sajtu (owner: pozicije sekcija ostaju,
samo ritam). Audit svih ruta našao tačno 3 sudara: (1) home
TrustBar+ServicesGrid+BrandLogos trostruki surface niz - ServicesGrid
sekcija na bg-white; (2) /usluge/ 'Servis po markama'(bela)+FAQ(bela)
- FaqSection surface prop; (3) /o-nama/ foto+Credentials duple bele -
Credentials na bg-surface uz bg-white+shadow-sm kartice (gemini nit,
obrazac FAQ/BrandLogos kartica). Verify: skripta preko 10 ruta +
mimo nezavisni sken 30 ruta dist-a - nula susednih istih pozadina;
screenshotovi; build/check/seo-gate zeleni. Review: gemini approve
+ mimo approve (triage na PR). Napomena: lokalni proxy 127.0.0.1:18080
pao tokom rada - obiđen direktnim egressom (env -u), alatima netaknut.

## [2.24.7] - 2026-09-19

FAQ sekcija iznad "Usluge za" grida na /brendovi/[slug] (owner
redosled - posetilac posle članka ima pitanje pa FAQ ide pre
cross-linkova). Da bg ritam ostane naizmeničan uz novi redosled,
srednje dve trake menjaju pozadinu: FaqSection dobija opcioni
surface prop (default bg-white, ostale stranice netaknute), "Usluge
za" sekcija prelazi na bg-white. Sekvenca: hero dark → prose bela →
FAQ surface → Usluge bela → logotipi surface → FinalCTA dark.
Review: gemini + mimo approve (triage na PR).

## [2.24.6] - 2026-09-19

BrandLogos traka na dnu stranice na /brendovi/[slug] i /usluge/[slug]
(owner zahtev): sa sredine stranice iza poslednje sadržajne sekcije,
ispred FinalCTA. Na brendovima uz to FAQ i "Usluge za" sekcije
zamenile mesta da bg ritam ostane naizmeničan (hero dark → prose
bela → Usluge surface → FAQ bela → logotipi surface → FinalCTA dark -
gemini + mimo lanes nezavisno uočili sudar bela/bela i surface/surface
u prvoj verziji); na uslugama potez popravio prethodni sudar proces
surface → logotipi surface. "Usluge za {name}" h2 dobio tracking-wide
(jedina section heading bez njega). Napomena (obe lanes): naizmenični
bg ritam zavisi od redosleda na call-site-u - budući brend/usluga bez
FAQ niza vratila bi surface/surface sudar (svih 21 stranica danas ima
FAQ).

## [2.24.5] - 2026-09-19

Owner copy editi (#105): 15 brend MDX naslova "Šta se pokvari" →
"Šta se kvari"; FAQ section H2 keyword sufiks - brendovi "Najčešća
pitanja: {name} mašine za veš", usluge "Najčešća pitanja: {shortTitle}
veš mašine" uz regex guard protiv dupliranja kad shortTitle već
sadrži "veš mašin" (popravka-ves-masina). Copy-gate 0 NEW hard/soft;
gemini approve; agy tamper (BrandLogos potez u review-u) revertovan.

## [2.24.4] - 2026-09-19

Post-deploy tipografija (povratne informacije sa #103): (1) ćelije prose
tabela dobile padding .5em/.625em (novo unlayered pravilo) - zebra/hover
pozadine su otkrile da plugin prvu/poslednju ćeliju drži flush uz ivicu,
pa je tekst išao direktno uz obojeni rub reda; (2) FAQ naslovi pitanja
iz "inline font-semibold" (16px/600) u font-heading text-xl font-bold
uppercase tracking-wide - Barlow Condensed na 16px čita se manje od Inter
odgovora ispod pitanja. Verify: computed td padding 7px 8.75px (pre 0
flush), FAQ h3 Barlow 20px/700/uppercase, screenshotovi, build/check/
seo-gate zeleni; review gemini-3.1-pro (agy) approve 4/4 HOLDS + pi
opencode lane approve 4/4 HOLDS (triage na PR #104).

## [2.24.3] - 2026-09-19

Tipografija MDX tela na /usluge/, /brendovi/ i /lokacije/ [slug]
stranicama: Content wrapper dobio `prose` (@tailwindcss/typography bio
učitan u global.css ali nikad korišćen - Tailwind preflight je spljoštio
h2-h6 na 16px body veličinu, liste ostale bez bullet-a, tabele bez
strukture). Novi prose token blok u global.css: body slate-600,
bold/headings --rl-dark (prate aktivnu temu), linkovi --rl-accent-ink,
th/td ivice slate-300/200. Heading pravila u @layer components sa
not-prose guardom (h1-h6 Barlow Condensed uppercase + letter-spacing
.025em, težine/veličine iz plugin skale: h2 1.5em/700 = 24px vs 16px
body; utility klase i not-prose ostrva unutar prose i dalje rade),
tabele display:block + overflow-x:auto da široke MDX tabele skroluju
umesto da lome mobilni layout. Stari space-y-4/leading-relaxed/
text-slate-600 wrapper zamenjen (prose pokriva sve tri stvari).
Verify: build/check 0 grešaka, seo-gate 91/100 bez FAIL, computed
styles + screenshotovi /brendovi/lg/ desktop i 375px, browser probe
za utility escape hatch + not-prose ostrvo. Review: gemini-3.1-pro
(agy) + muse-spark (pi), triage na PR-u. Napomena: 382px horizontalni
overflow na 375px viewport-u je prethodno stanje (header mobilni meni
dugme + dekorativni blob -right-20) - postoji i na naslovnoj, nije iz
ovog PR-a.

## [2.24.1] - 2026-09-19

Epic #70 zaostali cleanup (baseline 13 -> 10 ključeva): (1) gorenje/lg
dedupe - boilerplate rečenica "Postupak je isti kao za sve marke…" obri-
sana sa gorenje (proces pokriva "Kako izgleda popravka" odeljak), lg
preformulisana brend-distinktno (nema taj odeljak); + skrivena lg<->gor
duplikacija FAQ cene ("Cena zavisi od kvara i modela.") preformulisana;
(2) miele ABS-UVEK soft: "Red je uvek jasan" -> "Red je jasan"; (3) pra-
vopis presa: preša->presa (zanussi), prešu->presu (hisense, popravka-
ves-masina), prešom->presom (vox) - ekavica/s-forma sada svuda. Copy-gate
full-set: 0 NEW hard/soft sa novim baselineom; build/check/seo-gate zeleni.
## [2.24.2] - 2026-09-19

gbpReviewUrl (CHANGELOG 2.18.5 TODO zatvoren): Place ID izveden iz postojećeg
GBP short linka (maps.app.goo.gl -> listing "Servis veš mašina Beograd,
majstor Dejan"; ChIJ izvučen iz hidrirane Maps stranice u headless browseru)
i verifikovan dva puta: maps q=place_id resolvuje tačno na lokal (isti
feature hex), writereview preusmerava anonimne na sign-in sa continue nazad
na formu. site.ts dobija gbpReviewUrl; CTA "Proverite i ostavite Google
recenziju" ispod recenzija na naslovnoj sada vodi direktno na writereview
(pre bio običan share link); footer/kontakt/hasMap ostaju na gbpUrl.

## [2.24.0] - 2026-09-19

Epic #70 Faza 3: posvećene stranice usluga /usluge/[slug]/ (6 stranica,
PR #93-#99). Ruta preko services kolekcije (šema dobila opcioni seoTitle
+ faq, brendovi/opstine obrazac), MDX telo + processSteps vremenska linija
("Kako teče popravka"), Service JSON-LD (serviceType, provider /#local-
business, areaServed Beograd), FaqSection + FAQPage schema, BrandLogos,
FinalCTA. /usluge/ kartice vode na podstranice (sekundarni "Zatražite
ponudu" ostao), footer #84 sidra -> direktni linkovi. Sadržaj po usluzi
(GLM pisao, muse editovao, gemini/agy recenzirao; triage tabele na PR-
ovima): seoTitle 55-62 znaka, 4-pitanja FAQ, tela ~200-300 reči sa
pitanjskim H2 naslovima, dijagnoza->konstatacija u processSteps. Sitemap
24 -> 30 URL. aeolint: 6 novih strana 92-95/100 (A), ukupno 91, 0 FAIL
(WARN ostali samo kontakt i stari-grad 89, prethodno postojeći).
copy-gate: 0 NEW hard/soft kroz celu fazu. Oba deploy cilja
(prod + demo) osvežena; 6 URL-a verifikovano (200 + title + FAQPage).
TODO: GSC indexing request za 6 novih URL-a (vlasnik).

## [2.23.2] - 2026-09-19

seo-gate hardening (Tier-2 eksterna recenzija: ling-3.0-flash + gemini-
3.1-pro lane, oba validirala num() rupe s dve strane): num() sada odbija
whitespace/0/negativne vrednosti (Number(' ')===0 i eksplicitni 0 su
mogli tiho da ugase score prag), JSON.parse put dobija cist dijagnosticki
izlaz umesto stack tracea (uz finally-cleanup koji process.exit u catch
ne bi izvrsio - restukturirano), pid u temp imenu (paralelni buildovi),
stdout fd 'ignore' umesto nekoriscenog pipe buffera. Sve putanje
re-verifikovane (normal/fail/4x bad-env/skip/leak=0).
## [2.23.1] - 2026-09-19

aeolint (SEO/AEO/GEO linter) zakačen u build: devDependency
@didrod2539/aeolint 0.2.0 + scripts/seo-gate.mjs kao npm postbuild
hook. Po strani: WARN ispod 90, FAIL ispod 85 ili error-nalaz (izuzetak:
namerni noindex na 404/hvala allowlist); exit 1 prekida
"npm run build && rsync" lanac PRE deploya (verifikovano). Env prekidači:
SEO_GATE_WARN/FAIL/ALLOW/SKIP. npm run seo:audit = puni izveštaj na
zahtev. Trenutno stanje: 26 strana, 0 FAIL, 2 WARN (kontakt i
stari-grad 89/100 - kandidati za buduće doterivanje). dist/ sadržaj
nepromenjen - redeploy nije potreban.
## [2.23.0] - 2026-09-19

Uklonjena /usluge-ai stranica (noindex A/B eksperiment, epic #70) i
njene 6 AI fotografija arhivirane u archive/usluge-ai-images/ (van
src/assets, ne idu u build; vlasnik odlučuje zadržati/obrisati po
slicici - README u folderu). Slike su koriscene iskljucivo na toj
stranici (0 referenci kod svih ostalih); nijedan link/nav/robots nije
referencirao stranicu. copy-gate baseline: skinut zastareli
DUP-SENTENCE:usluge-ai.astro kljuc (14 -> 13). Build: 26 strana.

## [2.22.0] - 2026-09-19

Epic #70 faza 2, poslednja 4 staro-šablonska brend page-a prebačena na v2
(PR #85 Indesit, #86 Ariston, #87 Candy, #88 Beko + #89 fixup). Sve kroz
pipeline GLM-piše/muse-uređuje/gemini-recenzuje: Indesit i Ariston tabele
F02-F18 sa izostavljenim F01/F07 (značenja se razilaze među izvorima,
washerhouse EVO-II vs elektropetrovic011), Candy kompletna E00-E22 tabela
(Cuore ploča ugao), Beko BEZ tabele (E01-E18 vs H1-H11 konflikt alfabeta
izvora - Gorenje-lekcija). Prvi in-content cross-link (Ariston→Indesit).
gemini-3.1-pro post-hoc review: 1 valid near-dupe (candy/beko FAQ kostjur)
popravjen u #89; ostalo odbijeno uz presedane (link sankcionisan taskom,
19-redna tabela je namera, doorway-risk samo delimično stoji - data na
epicu #70). aeolint audit dist/: 91/100 overall, 0 stvarnih grešaka
(3 noindex greške = namerno: 404/hvala/usluge-ai); nove strane 92/100.
.copygate-baseline regenerisan 2026-09-19: 3 boilerplate dup ključa
(beko/candy/indesit) nestala, apsorbovana 3 post-baseline nalaza
(miele soft, gorenje/lg dup), netto 14→14 - zaostali dug zabeležen na #70.
Deploy na oba targeta, sve 4 strane curl-verifikovane (200).

## [2.21.0] - 2026-09-18

Epic #70 faza 1, mehanički SEO quick wins (PR #84): footer 6 usluga
sada duboki anchori /usluge/#<slug> uz matching id na karticama
(+scroll-mt-28 ispod sticky headera); skip-link preveden ("Preskoči na
glavni sadržaj"); BreadcrumbList terminal crumb dobija kanonski item
(samo terminal; bez-href intermediates poput "Marke" ostaju bez itema,
muse catch); og:locale sr_RS; priceRange '$$' u LocalBusiness semi;
/usluge/ H1 keyword-rich "Usluge servisa veš mašina u Beogradu" (crumb
label ostaje "Usluge"). Muse review: approve; 1 valid Important
(breadcrumb fallback scope) + 1 valid Nit (scroll offset) ispravljeni
u review-response commitu.
## [2.20.3] - 2026-09-18

Zanussi (12. brend, epic #70): PRVI brend izgrađen po cli-first-delegation
matrici - muse BUILDER (kolokvijalan glas, 'peru po srpskim kupatilima'),
GLM-zcode + agy REVIEWERI (approve + 6 nita). Electrolux-grupa FAQ,
JetSystem ugao, bez tabele kodova. Nit-ispravke: 'decenijama na tržištu'
umesto longevity-reada, 'Zovu nas' umesto dvosmislenog 'Kod nas stižu'.
## [2.20.2] - 2026-09-18

Miele (11. brend, epic #70): premium ugao (popravka se isplati, delovi
za većinu generacija), W serije + TwinDos/Express 20, ugradni. Bez
tabele kodova (izvor prazan). Isplati-li-se FAQ kao prvo pitanje -
konverzija za premium vlasnike. Logo tile, strip 11 u redu.
## [2.20.1] - 2026-09-17

Electrolux (10. brend, epic #70): PerfectCare/UltimateCare/SensiCare
serije + AEG nota (ista grupa, deljene komponente). Bez tabele kodova
(izvor prazan, Bosch-pristup). E-kod i ugradni FAQ varirani; presovanje
oprema činjenica utkana. Logo tile (Wikimedia wordmark) + strip 10 u
redu.
## [2.20.0] - 2026-09-17

Nova dva brenda (epic #70, owner: dodaj preostale marke): Samsung
(verifikovana tabela 1E/3E/4E/5E/dE/UE/HE/LE/OE, EcoBubble/Digital
Inverter/AddWash serije, LE=curenje FAQ) i Bosch (bez tabele kodova -
E-kodovi NEVERIFIKOVANI lokalnim izvorom, Gorenje-lesson primenjen;
Eco Silence Drive/Serie linije, ugradni). Sušilice činjenice (#75) +
cross-brand gate hardening.
## [2.19.3] - 2026-09-17

LG v2 (epic #70 faza 2, drugi brend): kodovi OE/IE/UE/LE/FE/PE
verifikovani lokalnim izvorom (dE/tE/CL univerzalni), Direct Drive
okvir + no-kaiš FAQ (odlična brend diferencijacija iz nacrta), CL
Child Lock nota, AI DD / 6 Motion / slim serije. Gate-ispravke nacrta:
najčešći ×5, namenska oprema, kombinovane mašine (nepotvrđeno kod
Dejana), "većina modela", 3-kolona tabela usklađena na 2. 900 reči.
## [2.19.2] - 2026-09-17

Gorenje v2 (epic #70 faza 2, prvi brend po Whirlpool obrascu): tabela
kodova F1-F7 VERIFIKOVANA prema lokalnom izvoru (nacrt druge agencije
imao F3/F4/F6 pogrešno), F/E paritet nota, WaveActive/Advance/
Essential/SensoCare/WA-W serije, 4 brend FAQ (F7-pumpa Q), 897 reči.
Bez crtica; gate čist (2x "sve linije" SOFT = odobreni obrazac iz #54).
## [2.19.1] - 2026-09-17

Owner round 5: telefon ispod bio-a timskе kartice na /o-nama/ sada je
tel: link sa ikonom (broj izbačen iz plain-text bio-a); "Naselja koja
pokrivamo" -> "Neka od naselja koja pokrivamo na opštini:";
"Neki od brendova koje servisiramo" -> "Neki od brendova mašina za
veš koje servisiramo" (svuda).
## [2.19.0] - 2026-09-17

Prave fotografije (Dejan, Viber 2026-09-16): galerija "Radionica i
teren" na /o-nama/ (6 fotki, lazy, Astro optimizacija), lokal izlog
zamenjuje stock u about sekciji, radionica sa alatom zamenjuje
placeholder u timskoj kartici (alt prilagođen realnosti - radionica,
ne portret). Stock fotke (crew-framing, marcus-rivera) uklonjene,
PHOTO-CREDITS ažuriran. Otvoreno: iste fotke za GBP listing (owner
upload).
## [2.18.5] - 2026-09-17

GBP integracija (owner): gbpUrl config (short share link) - adresa u
footeru i na kontaktu linkuje na GBP, LocalBusiness hasMap u šemi,
"Proverite i ostavite Google recenziju" CTA ispod recenzija na
naslovnoj. Review-link (writereview) čeka placeid iz GBP konzole.
## [2.18.4] - 2026-09-17

Owner round 4: jezik ("ne centrifugira", "servisiramo" u komentarima);
logo strip na lokacijama sva 4+3 u jednom redu na desktopu
(lg:grid-cols-7); naselja čipovi linkuju na Google Maps pretragu
(naselje, Beograd); JSON-LD imena bez crtice (gate catch).
## [2.18.3] - 2026-09-16

Owner round 3: Indesit u H1 tagline (svih 7 brendova + i dr.); logo
lockup sada 2 linije ("Servis za veš mašine" / "Majstor Dejan ·
Beograd", prazan suffix se ne renderuje); PageHero slika sidrena na
vrh (object-top) umesto centralnog sečenja na brendovi herojima.
## [2.18.2] - 2026-09-16

Logo red: "Ostale marke koje servisujemo" -> "Ostali brendovi koje
servisiramo" (owner, gramatički ispravno); grid varijanta sada
flex-wrap + flex-1 - pločice popunjavaju celu širinu reda umesto
fiksne kolone sa praznim prostorom.
## [2.18.1] - 2026-09-16

Brendovi hero: tamna pozadina sa hero fotografijom (ista tintirana
slika kao naslovna, bg-dark/75 overlay) umesto praznog tamnog pojasa.
PageHero je već podržavao image prop - jedna linija po ruti.
## [2.18.0] - 2026-09-16

Crtica sweep (owner: " - " u prozi zvuči AI): ~70 rečenica
restrukturirano kroz sve stranice (FAQ, usluge, brendovi, opštine,
hvala, kontakt, komponente, reviews.json) - zarezi, dvotačke, tačke.
Title tagovi: " - majstor Dejan…" -> " | Majstor Dejan…" (11 seoTitle)
+ naslovna sada "Servis veš mašina Beograd | Majstor Dejan
064/110-39-01" (suffix skip case-insensitive). copy-gate: nova ENDASH-
SPACE rule (dozvoljeni samo rasponi sati/dana + owner tagline) +
popravljen comment-stripping + baseline proširen. YAML: excerpt/desc
vrednosti sa dvotačkom sada quoted (frontmatter parse lesson).
## [2.17.3] - 2026-09-16

Owner copy: "Neke" → "Neki od brendova koje servisiramo" (brendovi =
muški rod); uklonjena trademark mikrolinija ispod logo stripa.
## [2.17.2] - 2026-09-16

Lokacije prezentacija (owner): logo strip iznad teksta (jedan red,
horizontalni skrol na malim ekranima, snap; grid na sm+), naslov
"Neke od brendova koje servisiramo", usluge H2 "Usluge servis mašine
za veš na lokaciji {lokacija}" (owner wording).
## [2.17.1] - 2026-09-16

Logo sekcija svuda (owner): /brendovi/* dobijaju "Ostale marke koje
servisujemo" posle teksta (sopstveni brend isključen), /lokacije/*
"Marke koje servisujemo na ovoj lokaciji" između naselja i usluga;
naslovna nepromenjena. Komponenta reusabilna (exclude + heading props).
## [2.17.0] - 2026-09-16

Marke-logo sekcija na naslovnoj (owner: realni logo): 6 Wikimedia
SVG wordmarkova (Gorenje, Whirlpool, Indesit, LG, Ariston, Beko; Candy
tekst-karta - čist SVG nije nađen) linkuju na /brendovi/ stranice,
individualni fajlovi + per-brand SEO alt/title ("Servis X veš mašina
Beograd"). Desaturirani prikaz (opacity-70) - nezavistan servis, nikad
"ovlašćeni". + serbian-copy-gate skill (deterministički AI-slop/ban
skener sa baseline) + NB v2 (blok long-tail + FAQPage za opštine).
## [2.16.1] - 2026-09-15

Content drip (6 PRs, svaka stranica = zaseban task po owneru):
opštine Novi Beograd (#46, + Blok 45/61/70 po recenziji) i Savski
venac (#47, geografija korigovana pre merge-a: Lekino brdo i Staro
sajmište nisu Savski venac → Zapadni Vračar + Prokop); brendovi
Candy (#48), Whirlpool (#49), Ariston (#50, Merloni/Indesit nota) i
Beko (#51) - H1 tagline lista sada ima sve stranice. Ukupno: 4 opštine,
7 brendova, 17 stranica.

## [2.16.0] - 2026-09-15

StatCounter analytics (isti provajder kao ostale owner-ove sesije;
projekat napravio muse-radnik kroz browser, sc_project 13355162) -
gated snippet u BaseLayoutu (iscrtava se samo kad je project > 0).
Email: kontakt@servisvesmasina-beograd.co.rs (novi mailbox na
HestiaCP; MX/SPF/DKIM/DMARC u CF zoni) - hasEmail sada aktivan, blok
se vraća u Footer/kontakt/JSON-LD.

## [2.15.2] - 2026-09-15

FAQ na naslovnoj (#22 §3): 3 opšta pitanja (besplatna konstatacija uz
popravku, preuzimanje u radionicu, vikendom po dogovoru) - komponenta
+ FAQPage šema preko BaseLayout faq propa; pitanja su namerno drugačija
od simptomskih na /usluge/ da šeme ne dupliraju sadržaj.

## [2.15.1] - 2026-09-15

Brend batch 2 po Dejanovoj listi (#21): Indesit (order 2) i LG
(order 3) na /brendovi/ - isti obrazac kao Gorenje, DRAFT-flagovani
kvarovi za Dejanovu potvrdu. LG copy: Direct Drive = direktni pogon
bez remena (fakt, bez brend-superlativa).

## [2.15.0] - 2026-09-15

Druga opština: Stari grad (#25 pattern, najbolji segment kupaca po
owneru - Dorćol/centar). Naselja: Dorćol, Stari grad, Kosančićev venac,
Varoš. Hibridna formulacija + "bez vožnje do servisa" ugao za stanare.
Nulta izmena koda - samo content fajl.

## [2.14.1] - 2026-09-15

Launch prep: placeholder email (servis@example.rs) sada je skriven -
hasEmail guard u Footer/kontakt (blok se ne renderuje) i JSON-LD (polje
se izostavlja) dok pravi email ne stigne od Dejana. IndexNow ključ u
public/ za Bing/Yandex/Seznam ping po lansiranju.

## [2.14.0] - 2026-09-15

Production domain wired: `site` is now env-driven (ASTRO_SITE) with the
registered domain servisvesmasina-beograd.co.rs as default; robots.txt
is a dynamic endpoint off the build URL (demo/prod can never point at
each other's sitemap). Demo recipe simplified (no more sed swaps).
Infra: CF zone + NS bart/clara + A @/www → server; HestiaCP domain
under wpspeedopt. Ref #23 (domain registered).

## [2.13.1] - 2026-09-15

Majstor-targeting H2 pojas na naslovnoj (#22 §2, epic #28 E): "Majstor
za veš mašinu - Beograd" posle ServicesGrid (H1 netaknut), Dejan +
hibridna formulacija + 064 CTA sa status-dotom i linkom na /o-nama/.
Bez nepotvrđenih statua (godine iskustva i dalje čekaju Dejana).

## [2.13.0] - 2026-09-15

Brend stranice (#4 spec, epic #28 D): brands kolekcija (zod šema,
commonFaults) + /brendovi/[slug]/ ruta. Prva stranica: servis Gorenje
veš mašina - hibridna formulacija, originalni delovi uz saglasnost,
garancija (delovi 1 god), telefon visoko; kvarovi generički DRAFT-flagovani
(#21). "Servis po markama" strip na /usluge/ je data-driven - sledeća
marka = jedan content fajl, nula koda (isti skal kao #25 opštine).

## [2.12.0] - 2026-09-15

FAQ po simptomima na /usluge/ (epic #28 C, #22 §3): FaqSection
(details/summary, nula JS) + buildFaqPage() FAQPage JSON-LD kroz novi
`faq` prop u BaseLayout - ista lista hrani prikaz i šemu, bez drifta.
8 pitanja mapiranih na usluge; činjenice iz odobrene liste (garancija na
delove 1 godina potvrđena od Dejana), odgovori DRAFT-flagovani za
Dejanov pregled pre lansiranja.

## [2.11.0] - 2026-09-15

Formspree wired to the real endpoint (owner: f/meaojqko) + progressive
enhancement (epic #28 A): fetch-based submit (Accept: application/json)
redirects to /hvala/ so the free tier needs no paid custom redirect;
native POST stays as the no-JS fallback (_next kept). Inline failure
message on both forms (zatrazi-ponudu, kontakt) via [data-form-status].
NOTE: Formspree reCAPTCHA must be disabled in the form settings or the
AJAX call 403s (verified live, test submission rejected).

## [2.10.2] - 2026-09-15

Honesty fix from PR-comment sweep (CodeRabbit, #27): dropped the
unconfirmed "Nedelja - ne radimo" row from published hours. Only
majstor-confirmed data renders (Pon-Sub 08:00-20:00); Sunday stays a
TODO in site.ts until Dejan confirms. Ref #28 task B.

## [2.10.1] - 2026-09-15

Majstor-confirmed data (WhatsApp, PR #27): radno vreme 08:00-20:00
(Pon-Sub; times confirmed, Sunday still TODO in site.ts) and lokal 62
added to the address - the directory harvest said 64, Dejan's answer
wins. Propagates via siteConfig to Header/Footer/kontakt/JSON-LD and
the open/closed status dot.

## [2.10.0] - 2026-09-15

Opština landing pages (issue #25): new `opstine` collection +
`/lokacije/[slug]/` route. Rakovica first - real base (Vidikovački venac
104), 9 real naselja, hybrid-model wording, services grid, click-to-call.
Second opština = one content file, zero code. Linked from /kontakt/ under
the map; auto-included in sitemap; breadcrumbs render.
Review triage (muse approve-with-nits + coderabbit geography catch - Cerak /
Cerak Vinogradi / Žarkovo are Čukarica, swapped for Kneževac / Straževica /
Resnik): separate `seoTitle` (`Servis veš mašina Rakovica - majstor Dejan
064/110-39-01`) so the H1 stays clean.

## [2.9.1] - 2026-09-15

Hybrid service-model copy fix (owner clarification: on-site visits AND
pickup-to-workshop for heavier jobs; workshop at Vidikovački venac 104).
Six in-apartment-only overclaims corrected (WhyUs, o-nama credentials,
usluge + usluge-ai leads, ležajeva step - bearings are the classic
workshop job - general-repair MDX body + step). Review round: gemini
request-changes (typo "servisimo", missed "na licu mesta" repair claim,
inverted-logic lead - all fixed, lead adopted verbatim from its
suggestion) + mimo approve. Remaining "na licu mesta" uses are diagnosis
claims (true under hybrid model).

## [2.9.0] - 2026-09-15

/usluge/ cards no longer show roofing stock (subset of issue #3). Six
Pexels photos (commercial use allowed, no attribution required) replace the
six roofing JPEGs: technician servicing an appliance, pump adjustment,
steel drum close-up, out-of-service washer, control-panel machine, home
washer loading. Alt texts rewritten in Serbian Latin to describe the new
photos; `src/assets/PHOTO-CREDITS.md` records source URL + photographer
per image; orphaned roofing files deleted.

### Review (muse + mimo approve-with-nits; agy lane down, skipped)
- Programator alt reworded to an honest description (photo shows a man
  watching, not a technician at work).
- Deferred to full #3 pass: pump photo is a well pump in extreme portrait
  (mobile crop loses the subject), flagship card reads as small-appliance,
  grejač photo carries English in-image text. Real servicer photos remain
  the recommended long-term upgrade.

## [2.8.0] - 2026-09-15

Open/closed status dot next to phone numbers (Header top bar, desktop
bar, StickyCallBar) - green pulsing when the business is open, red when
closed, like the reference site. Schedule parsed at BUILD time from
`siteConfig.openingHoursSchema` into embedded JSON; client JS evaluates
"now" in Europe/Belgrade (visitor TZ irrelevant), [start,end) semantics,
fail-closed (unparsable schedule → dot hidden). A11y: aria-hidden dot,
sr-only status text (aria-live) "Trenutno radimo/ne radimo", tooltip,
prefers-reduced-motion respected.

### Review-driven fixes (gemini request-changes + mimo approve)
- Parser: spaced comma-lists ("Mo, We, Fr"), compound single strings
  ("Mo-Fr 09:00-17:00, Sa 09:00-14:00") and 24:00 closings now parse;
  malformed ranges ("Mo-We-Fr") fail closed (owner will edit hours
  later - parser robustness was the point).
- `hourCycle: 'h23'` (midnight "24" quirk); open-dot green → emerald-600
  for WCAG non-text contrast on white.

## [2.7.0] - 2026-09-14

De-AI copy pass (issue #16, phase 1). Two parts:

### Typography (mechanical)
- 76+ em-dashes → Serbian crtica " - " in all rendered copy (incl. one
  comment that shipped into HTML); rendered dist now has 0 em-dashes
  (new T8 QA gate). ~47 remain in non-rendered code comments (optional
  sweep, recorded in #16).

### Voice rewrite (gemini-built, muse+mimo reviewed, triaged by orchestrator)
- Home Hero subheadline, WhyUs (heading/lead/4 differentiators; placeholder
  stats removed from lead - they remain config-driven on /o-nama/),
  home section headings, /usluge/ and /zatrazi-ponudu/ page copy.
- Checklist enforced: no triads, varied rhythm, concrete symptom→fix
  specifics, single colloquialism per page, distinct openers, "konstatacija"
  terminology site-wide, zero new claims (review caught+removed a smuggled
  "odmah" timing promise), no functional changes.
- Reviews.json service strings verified still matching dash-replaced
  service titles (both sides changed together; no external consumer).

## [2.6.1] - 2026-09-14

Service-area map: **Stari grad** added as the 9th municipality dot
(owner request; Savski venac remains omitted). The both-sides-blocked
label fallback moved from below to above (Stari grad centered above its
dot; Zvezdara top-right - name special-case proven load-bearing by both
review lanes). Zero label overlaps under asserted box model; tightest
clearance 1px over threshold (Zvezdara label ↔ Palilula halo) - eyeball
in preview; code comment mandates visual re-check if coordinates change.
## [2.6.0] - 2026-09-14

Routes renamed to Serbian slugs for local SEO:
/services/ → /usluge/, /about/ → /o-nama/, /contact/ → /kontakt/,
/quote/ → /zatrazi-ponudu/, /thank-you/ → /hvala/ (home + 404
unchanged). All internal references updated (nav, Header/StickyCallBar/
Hero/ServicesGrid/FinalCTA/Footer/404 cross-links, FormBackendFields
thankYouUrl, forms.ts, sitemap filter); hvala keeps noindex and stays
out of the sitemap. No redirects added - the site never launched, no
legacy URLs exist. ASCII-only slugs. Reviews: gemini + mimo approve,
zero findings.
## [2.5.2] - 2026-09-14

Pre-merge gate fixes (4-lane review of the integrated state - no GLM lanes,
per owner request; gemini+muse Tier-1, mimo Tier-2, deepseek down ×2):
translated the reviews-carousel/star-rating/breadcrumbs chrome that no
single PR owned (cross-PR seam), unified trust-badge wording with the
Hero strip (incl. hedged "Besplatna konstatacija uz popravku"), Serbian
chrome aria-labels, "ridgeline accent" comment removed from built HTML,
minor language polish. Full triage table on the epic.
## [2.5.1] - 2026-09-14

Fixed (first task run through the new cli-first-delegation skill - muse
built, 4 lanes reviewed): review-card date labels rendered with the
'en-US' locale - now 'sr-Latn-RS' (mart 2026., januar 2026., …) plus
'timeZone: UTC' so a 1st-of-month date cannot roll back a month on a
UTC-negative build machine. (Changelog note: version numbers of the
parallel rebrand PRs may merge in any order - entries are self-contained.)
## [2.5.0] - 2026-09-14

Rebrand **T3** (epic #2, stacked on T1): all remaining component/page
prose translated to Serbian Latin. With T1-T5 merged, the site is fully
Serbian except the photos task (#3).

### Changed
- Hero (eyebrow/subheadline/CTAs/badges), WhyUs (4 honest differentiators),
  FinalCTA, StickyCallBar, home/services section headings, about (story,
  stats labels, honest credentials, team collapsed 3→1 placeholder card),
  quote (Serbian labels + NEW brand select - 15 brands + Ostalo, additive
  field), thank-you steps, 404, contact form labels.
- `toLocaleString('en-US')` → `'sr-Latn-RS'` (3 sites); `_subject` lead-email
  line Serbian ("Novi upit sa sajta - zahtev za ponudu/kontakt").
- T1-line amendments (declared): all CTAs standardized to V-form
  ("Zatražite ponudu" incl. Header/nav), contact hero timing promise
  ("obično istog dana") removed.

### Review-driven fixes (3 lanes + delta approve)
- Parts-policy contradiction resolved ("isključivo" dropped; consent nuance
  kept on about); gemini grammar trio fixed ("na poruku", "se javlja",
  "koje se brže pokvare"); singular technician narrative made consistent;
  "call centar" → "kol centar"; "sledeći koraci" plural; register unified.

### Recorded for later rounds
- TODO HTML comments ship in dist source → T8 pre-launch sweep;
  dormant `ReviewCard` en-US date → #6; roofing-era stats render as
  placeholder business history → epic launch blocker (confirm with owner).
## [2.4.0] - 2026-09-14

Rebrand **T5** (epic #2): contact-page service-area SVG map re-plotted
from Denver metro to Belgrade. (Changelog anchors above [2.0.0] - keep
all entries when merging the parallel PRs.)

### Changed
- `ServiceAreaMap.astro`: 8 Belgrade municipality dots (Stari grad and
  Savski venac omitted - label collisions, documented in code), new
  projection BOUNDS, Serbian aria/title/caption, `role="img"`, stylised
  Sava/Danube polylines replacing the "Front Range" decoration,
  "BEOGRAD · I OKOLINA" caption. `cities` renamed `municipalities`.
- Deploy blocker from T1's review resolved: the map no longer shows
  Denver geography.

### Verified
- Projection re-derived independently by review lanes: all dots ≥5%
  inside the viewBox, geography preserved (Zemun top, Rakovica bottom,
  Palilula max-x, Čukarica min-x), zero label collisions.
- build + check green; component + dist map output contain zero Denver
  vocabulary.
## [2.3.0] - 2026-09-14

Rebrand **T4** (epic #2): template reviews replaced with six Serbian-Latin
SAMPLE placeholder entries for the Belgrade repair business + an honesty
marker. (Anchors above [2.0.0] - textually conflicts with #7/#8 changelog
entries; keep all when merging.)

### Changed
- `src/content/reviews.json` - 6 Serbian entries (placeholder): Belgrade
  municipalities, one per T2 service, brands Candy/Bosch/Gorenje/Whirlpool/
  LG/Samsung, ratings 5×5+1×4 (aggregate 4.8 rendered in JSON-LD).
- `src/content/README.md` (new) - bilingual warning: entries are samples,
  replace with genuine reviews (e.g. GBP export, issue #5) before launch.

### Review-driven fixes (3 lanes, all approved pre-fix; delta approve)
- 4-star review re-dated into the carousel's visible top-5 (visible stars
  now corroborate the 4.8 aggregate; carousel shows newest 5 of 6).
- Domain accuracy: laundry does not come out warm (cold rinse) - heater
  success re-worded to "ispravno greje vodu".
- Language: "elisnicu"→"elisu", "pri tom"→"pritom", "vratio u sklop"→
  "ponovo sklopio", "počeo sam"→"počeo sam od sebe", "pranje miriše"→
  "veš miriše", README "placeholders"→"primere", "normalno" dedup.
## [2.2.0] - 2026-09-14

Rebrand **T2** (epic #2): services content collection rewritten from
roofing to washing-machine repair, Serbian Latin (6 MDX files renamed +
rewritten). Placeholder content, marked with in-file TODO comments.
(NOTE: anchors above [2.0.0] - merges textually-conflict with the T1
entry in PR #7; keep both when merging the second.)

### Changed
- New services (order): Popravka veš mašina - svi kvarovi (1), Zamena i
  popravka pumpi (2), Zamena grejača i termostata (3), Zamena ležajeva i
  zaptivača (4), Popravka programatora i elektronike (5), Preventivno
  održavanje i čišćenje (6). Each with Serbian excerpt (146-201 chars),
  heroImageAlt, and 4 tailored processSteps (poziv → dijagnoza → popravka
  → garancija). MDX bodies are short Serbian summaries for the upcoming
  per-brand pages (#4) - not rendered by current templates.
- Icons remapped to the existing set (wrench, droplets, zap, hammer,
  clipboard-check, shield-check); heroImage slots unchanged (photos are
  task #3).

### Review-driven fixes (3 lanes + delta re-review)
- Grammar/terminology: "sva spoja"→"sve spojeve", "kodu greške"→"kod
  greške", "nedoprano veš"→"nedoprani veš", directional "na terenu"→"na
  teren" (stationary locative kept where correct), "uvid/uvidimo"→
  canonical phrasing, "grmljavina"→"tutnjava/lupanje", consistent
  "centrifuzi", inflected "originalnim delom/delovima" (standalone
  "original delovi" noun-lists kept as commercial register).
- Claim honesty: all same-day/first-visit timing claims removed (owner
  re-adds a confirmed SLA later); "jeftiniji od svake popravke" hedged;
  invented "season of intensive washing" dropped.

### Verified
- build + check green; content greps clean (roofing vocab only in
  heroImage asset filenames - replaced by #3); dist renders new Serbian
  titles in home cards + footer.
## [2.1.0] - 2026-09-13

Identity rebrand **T1** (epic #2): the config/identity layer switched from
US roofing contractor to a Serbian-Latin washing-machine repair business in
Belgrade. **All business data is placeholder, TODO-marked** - real details
replace it before launch (launch blockers tracked in epic #2).

### Changed
- `src/config/site.ts`: name/logo/tagline/license line, phone
  (061/352-45-03), email, address (state field removed - Serbian format),
  geo (Rakovica approx.), hours Pon-Sub 09-17, empty socials, Serbian trust
  badges, stats, SEO strings. Placeholder domain in `astro.config.mjs` +
  `public/robots.txt` (kept in sync, TODO-marked).
- `src/config/nav.ts` + Header/Footer chrome: Serbian labels (Usluge / O
  nama / Kontakt / Zatraži ponudu, column headings, sr-only/aria strings).
- `src/layouts/BaseLayout.astro`: `lang="sr-Latn"`.
- `src/lib/schema.ts`: JSON-LD `@type` `RoofingContractor` →
  `HomeAndConstructionBusiness` (schema.org has no appliance-repair type;
  `additionalType` deliberately omitted - the description carries the
  trade), `addressCountry: "RS"`, no `addressRegion`, `sameAs` omitted
  when socials are empty, `priceRange` dropped; builder renamed
  `buildLocalBusiness`.
- Contact page title/description/hero/intro: Serbian (were asserting
  "Denver metro" / "roofer" identity claims - review finding).

### Removed
- Theme-upsell links (footer "Made with Ridgeline" / Payhip) and the theme
  author's **live Formspree endpoint** - replaced with a TODO placeholder
  so this site's leads cannot leak to the author's form.

### Verified
- `npm run build` + `npm run check`: green (7 pages, 0 errors).
- dist greps: 0× RoofingContractor / payhip / xaqrqpro / priceRange;
  JSON-LD parses with RS address and no `addressRegion`; residual English
  strings trace only to T3/T5-tracked files (Hero, About, StickyCallBar,
  ServiceAreaMap - see epic #2).
## [2.0.0] - 2026-09-13

Upgraded from Astro 5.18 to **Astro 7.3** (through Astro 6.4), matching the
upstream v6 and v7 upgrade guides. Rendered output verified identical to the
Astro 5 build (visible text, titles, meta descriptions, canonicals, JSON-LD,
sitemap, preload assets).

### Changed
- `astro` 5.18 → **7.3.2**, `@astrojs/mdx` 4.3 → **8.0.1** (via 6.0 on the
  Astro 6 step), `@astrojs/sitemap` → **3.7.4**, `@astrojs/check` → **0.9.10**.
- Bundler moved with Astro: Vite 7 (Astro 6 step) → **Vite 8.3**, now a
  single copy in the tree shared with `@tailwindcss/vite`.
- `engines.node` raised from `>=20` to **`>=22.12.0`** (Astro 6+ minimum).
- Zod schemas now import `z` from `astro/zod` instead of the deprecated
  `astro:content` re-export (`src/content.config.ts`).
- `compressHTML: true` set explicitly in `astro.config.mjs`. Astro 7's new
  `'jsx'` default strips whitespace at cross-line boundaries between text,
  `{expressions}`, and inline elements; this template relies on that
  whitespace for icon/label spacing (132 joined boundaries detected in the
  first v7 build, e.g. `</svg>Licensed & Insured`, `Ridgeline -<a>`), so the
  pre-v7 behavior is kept. Three source-level `{" "}` guards
  (`src/components/common/Footer.astro`, `src/components/sections/Hero.astro`,
  `src/pages/about.astro`) remain as documentation for anyone who later
  switches to `'jsx'`.

### Fixed
- Build no longer fails with "Rollup failed to resolve import `sharp`":
  `sharp` is now a direct dependency. Astro 5+ does not install it
  automatically and the template uses `getImage()`/`<Image>` for build-time
  image processing.
- Dependency-tree Vite duplication on the Astro 6 step (root Vite 8 vs
  Astro's nested Vite 7, which broke `@tailwindcss/vite`) was handled with a
  temporary `overrides.vite` pin, removed again on the Astro 7 step where
  the tree re-aligned on Vite 8 naturally.

### Verified
- `npm run build` green: 7 pages + `sitemap-index.xml`, 0 errors.
- `npm run check` (`astro check` + `tsc --noEmit`): 0 errors, 0 warnings.
- v5 → v6 → v7 rendered-output parity: identical visible text, titles,
  descriptions, canonicals, JSON-LD (parses on every page), sitemap URL set
  (5 URLs; `/thank-you/` filtered, 404 excluded), no `undefined`/`null`
  strings in any HTML, and zero whitespace-joined text/inline-element
  boundaries versus the Astro 5 build.
- All `<link rel="preload">` targets (fonts, hero `imagesrcset` variants)
  exist in `dist/_astro/`; `astro preview` smoke test: all routes 200,
  unknown route 404.
