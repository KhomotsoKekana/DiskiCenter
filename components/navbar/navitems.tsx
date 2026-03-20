'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const G = "#8eb69b";

const COMPETITIONS = [
  {
    category: "Domestic",
    items: [
      { label: "DStv Premiership",      href: "/competitions/dstv-premiership",   badge: "PSL"  },
      { label: "NFD Championship",      href: "/competitions/nfd",                badge: "NFD"  },
      { label: "Motsepe Foundation Cup",href: "/competitions/motsepe",            badge: "ABC"  },
      { label: "Nedbank Cup",           href: "/competitions/nedbank-cup",        badge: "KO"   },
      { label: "Carling Black Label Cup",href: "/competitions/carling-cup",       badge: "CUP"  },
      { label: "MTN8",                  href: "/competitions/mtn8",               badge: "MTN8" },
    ],
  },
  {
    category: "Continental",
    items: [
      { label: "CAF Champions League",  href: "/competitions/caf-cl",            badge: "CAF"  },
      { label: "CAF Confederation Cup", href: "/competitions/caf-confed",        badge: "CC"   },
      { label: "CAF Super Cup",         href: "/competitions/caf-super-cup",     badge: "SC"   },
    ],
  },
  {
    category: "National Team",
    items: [
      { label: "AFCON Qualifiers",      href: "/competitions/afcon",             badge: "AFCON"},
      { label: "FIFA World Cup Qualifiers", href: "/competitions/wc-qualifiers", badge: "WCQ"  },
      { label: "COSAFA Cup",            href: "/competitions/cosafa",            badge: "CSFA" },
    ],
  },
];

const navItems = [
  { label: "Home",         href: "/",              hasDropdown: false },
  { label: "News",         href: "/news",           hasDropdown: false },
  { label: "Scores",       href: "/scores",         hasDropdown: false },
  { label: "Teams",        href: "/teams",          hasDropdown: false },
  { label: "Competitions", href: "/competitions",   hasDropdown: true  },
  { label: "Transfers",    href: "/transfers",      hasDropdown: false },
];

const Navitems = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen]         = useState(false);
  const [dropOpen, setDropOpen]         = useState(false);
  const [mobileCompOpen, setMobileCompOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMenuOpen(false); setDropOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropOpen(false), 180);
  };

  const isCompActive = pathname.startsWith("/competitions");

  return (
    <>
      <style>{`
        .desktop-nav { display: flex; align-items: center; gap: 2px; }
        @media (max-width: 768px) { .desktop-nav { display: none; } }

        .hamburger-btn { display: none; }
        @media (max-width: 768px) { .hamburger-btn { display: flex; } }

        /* ── DROPDOWN ── */
        .comp-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          width: 620px;
          background: var(--surface, #fff);
          border: 1.5px solid var(--border, #e2e8e4);
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06);
          z-index: 100;
          overflow: hidden;
          opacity: 0;
          transform: translateX(-50%) translateY(-8px);
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .comp-dropdown.open {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: all;
        }

        /* Arrow pointer */
        .comp-dropdown::before {
          content: '';
          position: absolute;
          top: -7px; left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 13px; height: 13px;
          background: var(--surface, #fff);
          border-left: 1.5px solid var(--border, #e2e8e4);
          border-top: 1.5px solid var(--border, #e2e8e4);
          border-radius: 3px 0 0 0;
        }

        @media (prefers-color-scheme: dark) {
          .comp-dropdown { background: #1c2b1f; border-color: #2a3d2f; }
          .comp-dropdown::before { background: #1c2b1f; border-color: #2a3d2f; }
        }

        .drop-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 12px;
          text-decoration: none;
          transition: background 0.15s, transform 0.15s;
          cursor: pointer;
        }
        .drop-item:hover {
          background: ${G}14;
          transform: translateX(3px);
        }
        .drop-item:hover .drop-label { color: ${G}; }

        .drop-label {
          font-size: 13px; font-weight: 700;
          color: var(--text, #1a2e22);
          transition: color 0.15s;
        }
        .drop-badge {
          font-size: 8px; font-weight: 900;
          padding: 2px 6px; border-radius: 6px;
          background: var(--surface2, #f1f3f0);
          color: var(--text3, #7a9688);
          letter-spacing: 0.08em;
          flex-shrink: 0;
          margin-left: auto;
        }

        @media (prefers-color-scheme: dark) {
          .drop-label { color: #e8f0ea; }
          .drop-badge { background: #243328; color: #6a9478; }
        }

        /* ── MOBILE OVERLAY + DRAWER ── */
        .mobile-overlay {
          position: fixed; inset: 0; z-index: 40;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
          opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        }
        .mobile-overlay.open { opacity: 1; pointer-events: all; }

        .mobile-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 50;
          width: min(320px, 85vw);
          background: var(--surface, #fff);
          border-left: 1.5px solid var(--border, #e2e8e4);
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex; flex-direction: column;
          box-shadow: -8px 0 40px rgba(0,0,0,0.15);
        }
        .mobile-drawer.open { transform: translateX(0); }

        @media (prefers-color-scheme: dark) {
          .mobile-drawer { background: #1c2b1f; border-color: #2a3d2f; }
        }

        .ham-line {
          display: block; width: 22px; height: 2px; border-radius: 99px;
          background: var(--text, #1a2e22);
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .hamburger-btn.is-open .ham-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger-btn.is-open .ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger-btn.is-open .ham-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .drawer-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 24px; font-size: 15px; font-weight: 700;
          color: var(--text2, #4a6358); text-decoration: none;
          border-bottom: 1px solid var(--border, #e2e8e4);
          transition: background 0.18s, color 0.18s, padding-left 0.18s;
        }
        .drawer-link:hover { background: var(--surface2, #f1f3f0); padding-left: 28px; }
        .drawer-link.active {
          color: ${G}; background: ${G}14;
          border-left: 3px solid ${G}; padding-left: 21px; font-weight: 800;
        }
        .drawer-link.active:hover { padding-left: 25px; }

        /* Mobile competitions accordion */
        .mobile-comp-toggle {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 24px; font-size: 15px; font-weight: 700;
          color: var(--text2, #4a6358);
          border-bottom: 1px solid var(--border, #e2e8e4);
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
          background: none; border-left: none; border-right: none; border-top: none;
          width: 100%; text-align: left;
        }
        .mobile-comp-toggle:hover { background: var(--surface2, #f1f3f0); }
        .mobile-comp-toggle.active { color: ${G}; background: ${G}14; border-left: 3px solid ${G}; padding-left: 21px; }

        .mobile-comp-panel {
          max-height: 0; overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1);
          background: var(--surface2, #f1f3f0);
          border-bottom: 1px solid var(--border, #e2e8e4);
        }
        .mobile-comp-panel.open { max-height: 600px; }

        .mobile-comp-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 11px 24px 11px 32px;
          font-size: 13px; font-weight: 600;
          color: var(--text2, #4a6358); text-decoration: none;
          border-bottom: 1px solid var(--border, #e2e8e4);
          transition: background 0.15s, color 0.15s;
        }
        .mobile-comp-item:last-child { border-bottom: none; }
        .mobile-comp-item:hover { background: ${G}10; color: ${G}; }

        .mobile-cat-label {
          padding: 8px 24px 4px 32px;
          font-size: 9px; font-weight: 900;
          text-transform: uppercase; letter-spacing: 0.18em;
          color: ${G};
        }

        @media (prefers-color-scheme: dark) {
          .drawer-link { border-color: #2a3d2f; }
          .drawer-link:hover { background: #243328; }
          .drawer-link.active { background: ${G}1a; }
          .mobile-comp-toggle:hover { background: #243328; }
          .mobile-comp-toggle.active { background: ${G}1a; }
          .mobile-comp-panel { background: #162118; border-color: #2a3d2f; }
          .mobile-comp-item { border-color: #2a3d2f; }
          .mobile-comp-item:hover { background: ${G}14; }
          .mobile-cat-label { color: ${G}; }
        }
      `}</style>

      {/* ── DESKTOP NAV ── */}
      <nav className="desktop-nav">
        {navItems.map(({ label, href, hasDropdown }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

          if (hasDropdown) {
            return (
              <div key={label} ref={dropRef} style={{ position: "relative" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>

                {/* Competitions trigger */}
                <button
                  onClick={() => setDropOpen(o => !o)}
                  className="relative flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg"
                  style={{ color: isCompActive ? G : "var(--text2, #4a6358)", background: "none", border: "none", cursor: "pointer", transition: "color .2s" }}
                  onMouseEnter={e => { if (!isCompActive) (e.currentTarget as HTMLButtonElement).style.color = G; }}
                  onMouseLeave={e => { if (!isCompActive) (e.currentTarget as HTMLButtonElement).style.color = "var(--text2, #4a6358)"; }}>
                  {label}
                  {/* Chevron */}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ transition: "transform .22s ease", transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                  {isCompActive && (
                    <span className="absolute bottom-0 left-3 right-3 rounded-full" style={{ height: 2, background: G, display: "block" }} />
                  )}
                </button>

                {/* ── DROPDOWN Panel ── */}
                <div className={`comp-dropdown${dropOpen ? " open" : ""}`}>
                  {/* Header */}
                  <div className="px-5 py-4 flex items-center justify-between"
                    style={{ borderBottom: "1.5px solid var(--border, #e2e8e4)", background: `${G}0a` }}>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.18em", color: G, marginBottom: 2 }}>Browse</div>
                      <div style={{ fontSize: 15, fontWeight: 900, color: "var(--text, #1a2e22)" }}>Competitions</div>
                    </div>
                    <Link href="/competitions"
                      style={{ fontSize: 11, fontWeight: 800, color: G, textDecoration: "none", padding: "6px 14px", borderRadius: 10, background: `${G}18`, border: `1.5px solid ${G}33`, transition: "background .18s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${G}30`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${G}18`; }}>
                      View All →
                    </Link>
                  </div>

                  {/* Columns */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
                    {COMPETITIONS.map((group, gi) => (
                      <div key={group.category}
                        style={{ padding: "16px 12px", borderRight: gi < COMPETITIONS.length - 1 ? "1px solid var(--border, #e2e8e4)" : "none" }}>
                        {/* Category label */}
                        <div style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.18em", color: G, marginBottom: 10, paddingLeft: 12 }}>
                          {group.category}
                        </div>
                        {/* Items */}
                        {group.items.map(item => (
                          <Link key={item.href} href={item.href} className="drop-item">
                            <span className="drop-label">{item.label}</span>
                            <span className="drop-badge">{item.badge}</span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Footer strip */}
                  <div className="flex items-center gap-3 px-5 py-3"
                    style={{ borderTop: "1.5px solid var(--border, #e2e8e4)", background: "var(--surface2, #f1f3f0)" }}>
                    <span style={{ fontSize: 11, color: "var(--text3, #7a9688)", fontWeight: 600 }}>🇿🇦 South African Football</span>
                    <span style={{ fontSize: 11, color: "var(--border, #e2e8e4)" }}>·</span>
                    <Link href="/competitions" style={{ fontSize: 11, fontWeight: 700, color: G, textDecoration: "none" }}>All Competitions →</Link>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <Link key={label} href={href}
              className="relative px-3 py-2 text-sm font-semibold rounded-lg"
              style={{ color: active ? G : "var(--text2, #4a6358)", transition: "color .2s" }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = G; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "var(--text2, #4a6358)"; }}>
              {label}
              {active && (
                <span className="absolute bottom-0 left-3 right-3 rounded-full" style={{ height: 2, background: G, display: "block" }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── HAMBURGER menu ── */}
      <button className={`hamburger-btn${menuOpen ? " is-open" : ""}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        style={{ flexDirection: "column", gap: 5, padding: 8, borderRadius: 10, background: "transparent", border: "none", cursor: "pointer", transition: "background .18s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${G}22`; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
        <span className="ham-line" /><span className="ham-line" /><span className="ham-line" />
      </button>

      {/* ── OVERLAY ── */}
      <div className={`mobile-overlay${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)} />

      {/* ── MOBILE DRAWER ── */}
      <div className={`mobile-drawer${menuOpen ? " open" : ""}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1.5px solid var(--border, #e2e8e4)" }}>
          <div className="flex items-center gap-2">
            <div style={{ width: 28, height: 28, background: G, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: "#0a1a0e" }}>DC</div>
            <span style={{ fontWeight: 800, fontSize: 15, color: "var(--text, #1a2e22)" }}>
              diski<span style={{ color: G }}>Center</span>
            </span>
          </div>
          <button onClick={() => setMenuOpen(false)}
            style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid var(--border, #e2e8e4)", background: "var(--surface2, #f1f3f0)", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2, #4a6358)", transition: "background .18s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${G}22`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--surface2, #f1f3f0)"; }}>
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, overflowY: "auto", paddingTop: 8 }}>
          {navItems.map(({ label, href, hasDropdown }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

            if (hasDropdown) {
              return (
                <div key={label}>
                  {/* Accordion toggle */}
                  <button
                    className={`mobile-comp-toggle${isCompActive ? " active" : ""}`}
                    onClick={() => setMobileCompOpen(o => !o)}>
                    <span>{label}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{ transition: "transform .25s", transform: mobileCompOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>

                  {/* Accordion panel */}
                  <div className={`mobile-comp-panel${mobileCompOpen ? " open" : ""}`}>
                    {COMPETITIONS.map(group => (
                      <div key={group.category}>
                        <div className="mobile-cat-label">{group.category}</div>
                        {group.items.map(item => (
                          <Link key={item.href} href={item.href} className="mobile-comp-item">
                            <span>{item.label}</span>
                            <span style={{ fontSize: 9, fontWeight: 900, padding: "2px 6px", borderRadius: 6, background: `${G}18`, color: G }}>{item.badge}</span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link key={label} href={href} className={`drawer-link${active ? " active" : ""}`}>
                <span>{label}</span>
                <span style={{ fontSize: 12, opacity: 0.4 }}>→</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-5" style={{ borderTop: "1.5px solid var(--border, #e2e8e4)" }}>
          <p style={{ fontSize: 11, color: "var(--text3, #7a9688)", fontWeight: 600, marginBottom: 12 }}>🇿🇦 South Africa's #1 Football Hub</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["Scores", "News"].map(quick => (
              <Link key={quick} href={`/${quick.toLowerCase()}`}
                style={{ flex: 1, padding: "10px 0", borderRadius: 10, textAlign: "center", fontSize: 12, fontWeight: 800, textDecoration: "none", background: `${G}18`, color: G, border: `1.5px solid ${G}33` }}>
                {quick}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navitems;