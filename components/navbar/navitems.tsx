'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { label: 'Home',      href: '/'          },
  { label: 'News',      href: '/news'       },
  { label: 'Scores',    href: '/scores'     },
  { label: 'Teams',     href: '/teams'      },
  { label: 'Leagues',   href: '/leagues'    },
  { label: 'Transfers', href: '/transfers'  },
];

const G = "#8eb69b";

const Navitems = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        /* Desktop nav — hidden on mobile */
        .desktop-nav { display: flex; align-items: center; gap: 4px; }
        @media (max-width: 768px) { .desktop-nav { display: none; } }

        /* Hamburger button — hidden on desktop */
        .hamburger-btn { display: none; }
        @media (max-width: 768px) { .hamburger-btn { display: flex; } }

        /* Mobile overlay */
        .mobile-overlay {
          position: fixed; inset: 0; z-index: 40;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .mobile-overlay.open { opacity: 1; pointer-events: all; }

        /* Mobile drawer — slides in from right */
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
          .mobile-drawer {
            background: #1c2b1f;
            border-color: #2a3d2f;
          }
        }

        /* Hamburger icon lines */
        .ham-line {
          display: block; width: 22px; height: 2px;
          border-radius: 99px;
          background: var(--text, #1a2e22);
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
          transform-origin: center;
        }
        .hamburger-btn.is-open .ham-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger-btn.is-open .ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger-btn.is-open .ham-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Drawer nav links */
        .drawer-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 24px;
          font-size: 15px; font-weight: 700;
          color: var(--text2, #4a6358);
          text-decoration: none;
          border-bottom: 1px solid var(--border, #e2e8e4);
          transition: background 0.18s, color 0.18s, padding-left 0.18s;
          position: relative;
        }
        .drawer-link:hover { background: var(--surface2, #f1f3f0); padding-left: 28px; }
        .drawer-link.active {
          color: ${G};
          background: ${G}14;
          border-left: 3px solid ${G};
          padding-left: 21px;
          font-weight: 800;
        }
        .drawer-link.active:hover { padding-left: 25px; }

        @media (prefers-color-scheme: dark) {
          .drawer-link { border-color: #2a3d2f; }
          .drawer-link:hover { background: #243328; }
          .drawer-link.active { background: ${G}1a; }
        }
      `}</style>

      {/* ── DESKTOP NAV ── */}
      <nav className="desktop-nav">
        {navItems.map(({ label, href }) => {
          const active = pathname === href;
          return (
            <Link key={label} href={href}
              className="relative px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-200"
              style={{ color: active ? G : "var(--text2, #4a6358)" }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = G; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "var(--text2, #4a6358)"; }}>
              {label}
              {active && (
                <span className="absolute bottom-0 left-3 right-3 rounded-full"
                  style={{ height: 2, background: G, display: "block" }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── HAMBURGER BUTTON ── */}
      <button
        className={`hamburger-btn${menuOpen ? " is-open" : ""}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        style={{
          flexDirection: "column", gap: 5, padding: 8, borderRadius: 10,
          background: "transparent", border: "none", cursor: "pointer",
          transition: "background 0.18s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${G}22`; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
        <span className="ham-line" />
        <span className="ham-line" />
        <span className="ham-line" />
      </button>

      {/* ── OVERLAY ── */}
      <div className={`mobile-overlay${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)} />

      {/* ── DRAWER ── */}
      <div className={`mobile-drawer${menuOpen ? " open" : ""}`}>

        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1.5px solid var(--border, #e2e8e4)" }}>
          <div className="flex items-center gap-2">
            <div style={{
              width: 28, height: 28, background: G, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 900, color: "#0a1a0e",
            }}>DC</div>
            <span style={{ fontWeight: 800, fontSize: 15, color: "var(--text, #1a2e22)" }}>
              diski<span style={{ color: G }}>Center</span>
            </span>
          </div>
          <button onClick={() => setMenuOpen(false)}
            style={{
              width: 32, height: 32, borderRadius: 8, border: "1.5px solid var(--border, #e2e8e4)",
              background: "var(--surface2, #f1f3f0)", cursor: "pointer", fontSize: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--text2, #4a6358)", transition: "background 0.18s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${G}22`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--surface2, #f1f3f0)"; }}>
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, overflowY: "auto", paddingTop: 8 }}>
          {navItems.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link key={label} href={href}
                className={`drawer-link${active ? " active" : ""}`}>
                <span>{label}</span>
                <span style={{ fontSize: 12, opacity: 0.4 }}>→</span>
              </Link>
            );
          })}
        </nav>

        {/* Drawer footer */}
        <div className="px-6 py-5" style={{ borderTop: "1.5px solid var(--border, #e2e8e4)" }}>
          <p style={{ fontSize: 11, color: "var(--text3, #7a9688)", fontWeight: 600, marginBottom: 12 }}>
            🇿🇦 South Africa's #1 Football Hub
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {["Scores", "News"].map(quick => (
              <Link key={quick} href={`/${quick.toLowerCase()}`}
                style={{
                  flex: 1, padding: "10px 0", borderRadius: 10, textAlign: "center",
                  fontSize: 12, fontWeight: 800, textDecoration: "none",
                  background: `${G}18`, color: G,
                  border: `1.5px solid ${G}33`,
                  transition: "background 0.18s",
                }}>
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