'use client';

import Link from "next/link";

const G  = "#8eb69b";
const GD = "#6a9a7f";

const PSL_CLUBS = [
  "Chippa United FC",
  "Durban City FC",
  "Golden Arrows FC",
  "Kaizer Chiefs FC",
  "Magesi FC",
  "Mamelodi Sundowns FC",
  "Marumo Gallants FC",
  "Orlando Pirates FC",
  "Polokwane City FC",
  "Richards Bay FC",
  "Royal AM FC",
  "Sekhukhune United FC",
  "Stellenbosch FC",
  "Siwelele FC",
  "TS Galaxy FC",
];

const NFD_CLUBS = [
  "Cape Town City FC",
  "Cape Town Spurs",
  "CASRIC FC",
  "University of Pretoria FC",
  "Upington City FC",
  "Milford FC",
  "Pretoria Callies FC",
  "Hungry Lions FC",
  "Cape Umoya United FC",
  "Milano United FC",
  "Venda Football Academy",
  "Tornado FC",
  "Black Leopards FC",
  "Tshakhuma FC",
  "Baroka FC",
  "Platinum City Rovers",
  "African Warriors FC",
  "JDR Stars FC",
];
const ALL_CLUBS = [
  { name: "Cape Town City FC",       division: "PSL" },
  { name: "Cape Town Spurs",         division: "PSL" },
  { name: "Chippa United FC",        division: "PSL" },
  { name: "Durban City FC",          division: "PSL" },
  { name: "Golden Arrows FC",        division: "PSL" },
  { name: "Kaizer Chiefs FC",        division: "PSL" },
  { name: "Magesi FC",               division: "PSL" },
  { name: "Mamelodi Sundowns FC",    division: "PSL" },
  { name: "Marumo Gallants FC",      division: "PSL" },
  { name: "Orlando Pirates FC",      division: "PSL" },
  { name: "Polokwane City FC",       division: "PSL" },
  { name: "Richards Bay FC",         division: "PSL" },
  { name: "Royal AM FC",             division: "PSL" },
  { name: "Sekhukhune United FC",    division: "PSL" },
  { name: "Stellenbosch FC",         division: "PSL" },
  { name: "Siwelele FC",             division: "PSL" },
  { name: "TS Galaxy FC",            division: "PSL" },
  { name: "CASRIC FC",               division: "NFD" },
  { name: "University of Pretoria FC", division: "NFD" },
  { name: "Upington City FC",        division: "NFD" },
  { name: "Milford FC",              division: "NFD" },
  { name: "Pretoria Callies FC",     division: "NFD" },
  { name: "Hungry Lions FC",         division: "NFD" },
  { name: "Cape Umoya United FC",    division: "NFD" },
  { name: "Milano United FC",        division: "NFD" },
  { name: "Venda Football Academy",  division: "NFD" },
  { name: "Tornado FC",              division: "NFD" },
  { name: "Black Leopards FC",       division: "NFD" },
  { name: "Tshakhuma FC",            division: "NFD" },
  { name: "Baroka FC",               division: "NFD" },
  { name: "Platinum City Rovers",    division: "NFD" },
  { name: "African Warriors FC",     division: "NFD" },
  { name: "JDR Stars FC",            division: "NFD" },
];

const FOOTER_LINKS = [
  {
    heading: "Competitions",
    links: [
      { label: "Premier Soccer League", href: "/leagues/psl" },
      { label: "GladAfrica Championship", href: "/leagues/gladafrica" },
      { label: "Motsepe Foundation Cup", href: "/leagues/motsepe" },
      { label: "CAF Champions League", href: "/leagues/caf" },
      { label: "Nedbank Cup", href: "/leagues/nedbank" },
    ],
  },
  {
    heading: "Features",
    links: [
      { label: "Live Scores", href: "/scores" },
      { label: "Fixtures & Results", href: "/fixtures" },
      { label: "Standings", href: "/standings" },
      { label: "Top Scorers", href: "/scorers" },
      { label: "Transfers", href: "/transfers" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Teams", href: "/teams" },
      { label: "Players", href: "/players" },
      { label: "News", href: "/news" },
      { label: "Match Reports", href: "/news?tag=match-report" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Advertise", href: "/advertise" },
      { label: "Submit Data", href: "/submit" },
    ],
  },
];

const SOCIAL = [
  {
    label: "X / Twitter", href: "https://twitter.com",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: "Facebook", href: "https://facebook.com",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    label: "Instagram", href: "https://instagram.com",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>,
  },
  {
    label: "YouTube", href: "https://youtube.com",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
  {
    label: "TikTok", href: "https://tiktok.com",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
  },
];

function ClubInitials({ name }: { name: string }) {
  const words = name.replace(" FC", "").replace(" United", "U").split(" ");
  const initials = words.length >= 2
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
  return <span>{initials}</span>;
}

export default function Footer() {
  return (
    <>
      <style>{`
        @media (prefers-color-scheme: dark) {
          .footer-root {
            --f-bg:      #0f1a14;
            --f-surface: #1c2b1f;
            --f-surface2:#243328;
            --f-border:  #2a3d2f;
            --f-text:    #e8f0ea;
            --f-text2:   #a8c4b0;
            --f-text3:   #6a9478;
          }
        }
        .footer-root {
          --f-bg:      #f8f9fa;
          --f-surface: #ffffff;
          --f-surface2:#f1f3f0;
          --f-border:  #e2e8e4;
          --f-text:    #1a2e22;
          --f-text2:   #4a6358;
          --f-text3:   #7a9688;
        }

        .footer-club-tile {
          background: var(--f-surface);
          border: 1.5px solid var(--f-border);
          transition: border-color 0.2s, transform 0.2s, background 0.2s;
          cursor: pointer;
          height: 90px;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
        }
        .footer-club-tile:hover {
          border-color: ${G};
          background: var(--f-surface2);
          transform: translateY(-2px);
        }

        /* PSL tile — green crest */
        .club-crest-psl {
          width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
          background: ${G}22; border: 1.5px solid ${G}44;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 900; color: ${G};
        }
        /* NFD tile — neutral crest */
        .club-crest-nfd {
          width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
          background: var(--f-surface2); border: 1.5px solid var(--f-border);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 900; color: var(--f-text2);
        }
        /* NFD badge on tile */
        .nfd-chip {
          font-size: 8px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.08em;
          background: var(--f-surface2); color: var(--f-text3);
          border-radius: 4px; padding: 1px 4px;
          display: inline-block; margin-top: 1px;
        }

        .club-name {
          font-size: 10px; font-weight: 700;
          color: var(--f-text);
          line-height: 1.2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          width: 100%;
        }

        /* divider between PSL + NFD in the same grid */
        .division-divider {
          grid-column: 1 / -1;
          display: flex; align-items: center; gap: 12px;
          padding: 8px 0 4px;
        }
        .division-divider-line {
          flex: 1; height: 1px; background: var(--f-border);
        }
        .division-divider-label {
          font-size: 10px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.18em; white-space: nowrap;
        }

        .footer-link {
          color: var(--f-text3); font-size: 13px;
          text-decoration: none; transition: color 0.18s;
          display: block; padding: 3px 0;
        }
        .footer-link:hover { color: ${G}; }

        .social-btn {
          width: 36px; height: 36px; border-radius: 10px;
          background: var(--f-surface2); border: 1.5px solid var(--f-border);
          display: flex; align-items: center; justify-content: center;
          color: var(--f-text2);
          transition: background 0.18s, border-color 0.18s, color 0.18s, transform 0.18s;
          cursor: pointer; text-decoration: none;
        }
        .social-btn:hover { background: ${G}; border-color: ${G}; color: #fff; transform: translateY(-2px); }

        .bottom-legal-link {
          font-size: 12px; color: var(--f-text3); font-weight: 600;
          text-decoration: none; transition: color 0.18s;
        }
        .bottom-legal-link:hover { color: ${G}; }

        @keyframes pulse-dot {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:.4;transform:scale(1.5)}
        }
        .live-dot { animation: pulse-dot 1.6s ease-in-out infinite; }
      `}</style>

      <footer className="footer-root" style={{
        background: "var(--f-bg)",
        borderTop: "2px solid var(--f-border)",
        marginTop: 48,
      }}>

        {/* ── GREEN TOP BAND ── */}
        <div style={{ background: G, padding: "14px 56px" }}
          className="flex items-center justify-between flex-wrap gap-4 max-sm:px-4">
          <div className="flex items-center gap-3">
            <div style={{
              width: 32, height: 32, background: "#0a1a0e", borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 900, color: G,
            }}>DC</div>
            <span style={{ fontWeight: 800, fontSize: 16, color: "#0a1a0e" }}>
              diski<span style={{ opacity: 0.55 }}>Center</span>
            </span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(10,26,14,0.65)", fontWeight: 600 }}>
            South Africa's #1 Football Hub · 2025/26 Season Live
          </p>
          <div className="flex items-center gap-2">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: "rgba(10,26,14,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#0a1a0e", transition: "background 0.18s", textDecoration: "none",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(10,26,14,0.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(10,26,14,0.15)"; }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 56px 0" }}
          className="max-sm:px-4">

          {/* ── SINGLE UNIFIED CLUBS GRID ── */}
          <div className="mb-10">

            {/* Section heading */}
            <div className="flex items-center gap-3 mb-5">
              <span style={{
                fontSize: 10, fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "0.2em", color: G,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ width: 20, height: 3, background: G, borderRadius: 99, display: "inline-block" }} />
                South African Clubs — 2025/26
              </span>
            </div>

            {/* One grid, PSL divider then NFD divider inline */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
              gap: 8,
              alignItems: "start",
            }}>

              {/* PSL divider */}
              <div className="division-divider">
                <span className="division-divider-label" style={{ color: G }}>
                  PSL — Premier Soccer League
                </span>
                <div className="division-divider-line" />
                <span style={{ fontSize: 10, fontWeight: 700, color: G, whiteSpace: "nowrap" }}>
                  {PSL_CLUBS.length} clubs
                </span>
              </div>

              {/* PSL tiles */}
              {PSL_CLUBS.map((club) => (
                <Link
                  href={`/teams/${club.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                  key={club}>
                  <div className="footer-club-tile rounded-xl">
                    <div className="club-crest-psl">
                      <ClubInitials name={club} />
                    </div>
                    <span className="club-name">{club.replace(" FC", "")}</span>
                  </div>
                </Link>
              ))}

              {/* NFD divider */}
              <div className="division-divider" style={{ marginTop: 8 }}>
                <span className="division-divider-label" style={{ color: "var(--f-text2)" }}>
                  GladAfrica Championship
                </span>
                <div className="division-divider-line" />
                <span style={{ fontSize: 10, fontWeight: 700, color: "var(--f-text3)", whiteSpace: "nowrap" }}>
                  {NFD_CLUBS.length} clubs
                </span>
              </div>

              {/* NFD tiles */}
              {NFD_CLUBS.map((club) => (
                <Link
                  href={`/teams/${club.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                  key={club}>
                  <div className="footer-club-tile rounded-xl">
                    <div className="club-crest-nfd">
                      <ClubInitials name={club} />
                    </div>
                    <span className="club-name">{club.replace(" FC", "")}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div style={{ height: 1, background: "var(--f-border)", marginBottom: 40 }} />

          {/* ── LINKS + BRAND ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: 32,
            marginBottom: 48,
          }} className="max-lg:grid-cols-2 max-sm:grid-cols-1">

            {/* Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <div style={{
                  width: 36, height: 36, background: G, borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 900, color: "#0a1a0e",
                }}>DC</div>
                <span style={{ fontWeight: 800, fontSize: 18, color: "var(--f-text)" }}>
                  diski<span style={{ color: G }}>Center</span>
                </span>
              </div>
              <p style={{ fontSize: 13, color: "var(--f-text3)", lineHeight: 1.7, maxWidth: 280 }}>
                The home of South African football. Live scores, fixtures, standings, transfers and news from the PSL, GladAfrica Championship and beyond.
              </p>
              <div className="flex gap-2 flex-wrap">
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    title={s.label} className="social-btn">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link cols */}
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <h4 style={{
                  fontSize: 11, fontWeight: 800, textTransform: "uppercase",
                  letterSpacing: "0.18em", color: G, marginBottom: 4,
                }}>{col.heading}</h4>
                {col.links.map((l) => (
                  <Link key={l.label} href={l.href} className="footer-link">{l.label}</Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{ borderTop: "1.5px solid var(--f-border)" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 56px" }}
            className="flex items-center justify-between flex-wrap gap-4 max-sm:px-4">
            <p style={{ fontSize: 12, color: "var(--f-text3)", fontWeight: 600 }}>
              © {new Date().getFullYear()} DiskiCenter. All rights reserved.
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              {["Privacy Policy", "Terms of Use", "Contact Us", "Submit Data"].map((item) => (
                <Link key={item} href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="bottom-legal-link">
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="live-dot w-2 h-2 rounded-full inline-block" style={{ background: G }} />
              <span style={{ fontSize: 12, color: "var(--f-text3)", fontWeight: 600 }}>2025/26 Season Live</span>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}