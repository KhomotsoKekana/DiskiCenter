"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const G   = "#8eb69b";
const GD  = "#6a9a7f";

const ALL_NEWS = [
  {
    id: 1, tag: "Transfer", featured: true,
    title: "Sundowns Sign Star Midfielder Ahead of CAF Campaign",
    excerpt: "Mamelodi Sundowns have confirmed the signing of a highly-rated midfielder ahead of their CAF Champions League campaign. The player joins on a three-year deal and is expected to make his debut next week.",
    date: "Mar 9, 2026", readTime: "3 min read",
    img: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
    author: "Sipho Mokoena",
  },
  {
    id: 2, tag: "Match Report", featured: false,
    title: "Pirates Destroy Chiefs in Thrilling Soweto Derby",
    excerpt: "A pulsating Soweto Derby ended with Pirates emerging victorious in a 3-0 defeat of their biggest rivals.",
    date: "Mar 7, 2026", readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    author: "Thabo Nkosi",
  },
  {
    id: 3, tag: "PSL", featured: false,
    title: "Bafana Bafana Climb FIFA Rankings After Strong Run",
    excerpt: "South Africa's national side have climbed several places in the latest FIFA World Rankings.",
    date: "Mar 5, 2026", readTime: "2 min read",
    img: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80",
    author: "Lerato Dlamini",
  },
  {
    id: 4, tag: "Transfer", featured: false,
    title: "Kaizer Chiefs Target Nigerian Striker This Window",
    excerpt: "Kaizer Chiefs are reportedly in advanced talks to sign a prolific Nigerian striker to bolster their attacking options.",
    date: "Mar 4, 2026", readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1551958219-acbc8e4a1e0d?w=600&q=80",
    author: "Sipho Mokoena",
  },
  {
    id: 5, tag: "PSL", featured: false,
    title: "Sundowns Extend Lead at Top of PSL Table",
    excerpt: "Mamelodi Sundowns remain on course for yet another league title after extending their lead at the summit.",
    date: "Mar 3, 2026", readTime: "3 min read",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
    author: "Thabo Nkosi",
  },
  {
    id: 6, tag: "GladAfrica", featured: false,
    title: "Promotion Race Heats Up in GladAfrica Championship",
    excerpt: "The battle for promotion spots in the GladAfrica Championship is intensifying with just eight matches left.",
    date: "Mar 2, 2026", readTime: "3 min read",
    img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80",
    author: "Zanele Khumalo",
  },
  {
    id: 7, tag: "CAF", featured: false,
    title: "Sundowns Draw Tough Opponents in CAF Quarter-Finals",
    excerpt: "Mamelodi Sundowns have been drawn against a formidable North African side in the CAF Champions League quarter-finals.",
    date: "Mar 1, 2026", readTime: "2 min read",
    img: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=600&q=80",
    author: "Lerato Dlamini",
  },
  {
    id: 8, tag: "Match Report", featured: false,
    title: "AmaZulu Stun Sekhukhune in Late Drama",
    excerpt: "AmaZulu snatched all three points in the dying minutes to deal a blow to Sekhukhune United's top-four hopes.",
    date: "Feb 28, 2026", readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=600&q=80",
    author: "Thabo Nkosi",
  },
  {
    id: 9, tag: "PSL", featured: false,
    title: "PSL Announces New Broadcast Deal Worth R2 Billion",
    excerpt: "The Premier Soccer League has announced a landmark broadcast deal across multiple new platforms.",
    date: "Feb 27, 2026", readTime: "3 min read",
    img: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80",
    author: "Zanele Khumalo",
  },
  {
    id: 10, tag: "Transfer", featured: false,
    title: "Orlando Pirates Secure Signature of Defensive Midfielder",
    excerpt: "Orlando Pirates have completed the signing of a combative defensive midfielder from a European club.",
    date: "Feb 26, 2026", readTime: "2 min read",
    img: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=600&q=80",
    author: "Sipho Mokoena",
  },
  {
    id: 11, tag: "GladAfrica", featured: false,
    title: "Hungry Lions Top GladAfrica Table After Win",
    excerpt: "Hungry Lions have moved to the top of the GladAfrica Championship following a convincing home victory.",
    date: "Feb 25, 2026", readTime: "2 min read",
    img: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&q=80",
    author: "Lerato Dlamini",
  },
  {
    id: 12, tag: "CAF", featured: false,
    title: "South African Clubs Praised for CAF Performances",
    excerpt: "SA representatives in CAF competitions have received widespread praise for their performances this season.",
    date: "Feb 24, 2026", readTime: "3 min read",
    img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80",
    author: "Zanele Khumalo",
  },
];

const CATEGORIES = ["All", "PSL", "Transfer", "Match Report", "GladAfrica", "CAF"];
const PER_PAGE = 9;

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Transfer:       { bg: "#fef3c7", text: "#92400e" },
  "Match Report": { bg: "#dbeafe", text: "#1e40af" },
  PSL:            { bg: `${G}22`, text: GD },
  GladAfrica:     { bg: "#fce7f3", text: "#9d174d" },
  CAF:            { bg: "#ede9fe", text: "#5b21b6" },
};

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.06, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
    }}>{children}</div>
  );
}

function NewsCard({ n, tall = false, horizontal = false, delay = 0 }: {
  n: typeof ALL_NEWS[0]; tall?: boolean; horizontal?: boolean; delay?: number;
}) {
  const { ref, inView } = useInView();
  const tc = TAG_COLORS[n.tag] ?? { bg: `${G}22`, text: GD };

  if (horizontal) {
    return (
      <div ref={ref} className="news-card rounded-2xl overflow-hidden cursor-pointer flex"
        style={{
          background: "var(--surface)", border: "1.5px solid var(--border)",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        }}>
        <div className="overflow-hidden flex-shrink-0" style={{ width: 120, minHeight: 100 }}>
          <img src={n.img} alt={n.title} className="w-full h-full object-cover news-img" />
        </div>
        <div className="px-4 py-3 flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide"
              style={{ background: tc.bg, color: tc.text }}>{n.tag}</span>
            <span className="text-[9px] muted">{n.readTime}</span>
          </div>
          <h3 className="font-bold card-text leading-snug line-clamp-2" style={{ fontSize: 12 }}>{n.title}</h3>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-[9px] muted">{n.author}</span>
            <span className="text-[9px] muted">{n.date}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="news-card rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{
        background: "var(--surface)", border: "1.5px solid var(--border)",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}>
      <div className="overflow-hidden relative" style={{ height: tall ? 340 : 180 }}>
        <img src={n.img} alt={n.title} className="w-full h-full object-cover news-img" />
        {/* EFL-style gradient overlay on image */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)"
        }} />
        {/* Tag floated on image like EFL */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wide"
            style={{ background: tc.bg, color: tc.text }}>{n.tag}</span>
        </div>
        {tall && (
          <div className="absolute bottom-3 right-3">
            <span className="text-[10px] font-bold px-3 py-1 rounded-lg text-white"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}>
              {n.readTime}
            </span>
          </div>
        )}
      </div>

      {/* Green accent bar on featured */}
      {tall && <div style={{ height: 3, background: G, flexShrink: 0 }} />}

      <div className="px-5 py-4 flex flex-col gap-2.5 flex-1">
        <h3 className="font-black card-text leading-snug"
          style={{ fontSize: tall ? 18 : 13, lineHeight: 1.3 }}>{n.title}</h3>
        {tall && (
          <p className="text-xs leading-relaxed muted line-clamp-3">{n.excerpt}</p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2"
          style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-black flex-shrink-0"
              style={{ background: GD }}>
              {n.author.split(" ").map((w: string) => w[0]).join("")}
            </div>
            <span className="text-[10px] muted">{n.author}</span>
          </div>
          <span className="text-[10px] font-bold" style={{ color: G }}>Read →</span>
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage]         = useState(1);
  const [ready, setReady]       = useState(false);

  useEffect(() => { setTimeout(() => setReady(true), 60); }, []);
  useEffect(() => { setPage(1); }, [search, category]);

  const filtered = ALL_NEWS.filter((n) => {
    const matchCat = category === "All" || n.tag === category;
    const matchQ   = !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.tag.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const heroT = (d: number) => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.65s ease ${d}ms, transform 0.65s ease ${d}ms`,
  });

  // Layout: first card big, next 2 medium in col, rest horizontal list
  const [hero, ...rest] = paginated;
  const sidePair = rest.slice(0, 2);
  const remaining = rest.slice(2);

  return (
    <>
      <style>{`
        :root {
          --bg:      #f8f9fa; --bg2: #ffffff; --bg3: #f1f3f0;
          --surface: #ffffff; --surface2: #f1f3f0; --border: #e2e8e4;
          --text: #1a2e22; --text2: #4a6358; --text3: #7a9688;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --bg: #0f1a14; --bg2: #162118; --bg3: #1c2b1f;
            --surface: #1c2b1f; --surface2: #243328; --border: #2a3d2f;
            --text: #e8f0ea; --text2: #a8c4b0; --text3: #6a9478;
          }
        }
        body { background: var(--bg) !important; }

        .card-text { color: var(--text); }
        .muted      { color: var(--text3); }

        .news-card {
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s;
        }
        .news-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
          border-color: ${G} !important;
        }
        .news-img { transition: transform 0.42s ease; }
        .news-card:hover .news-img { transform: scale(1.06); }

        .cat-pill { transition: background 0.18s, color 0.18s, border-color 0.18s, transform 0.18s; }
        .cat-pill:hover { transform: translateY(-1px); }

        .search-box:focus-within {
          border-color: ${G} !important;
          box-shadow: 0 0 0 3px ${G}22;
        }

        .page-btn { transition: background 0.18s, color 0.18s, transform 0.18s; }
        .page-btn:hover:not(:disabled) { transform: translateY(-1px); }

        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:.4} }
        .pulse-dot { animation: pulse-dot 1.6s ease-in-out infinite; }

        .section-label {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.18em; color: ${G};
        }
        .section-label::before {
          content:''; display:block; width:20px; height:3px;
          background:${G}; border-radius:99px;
        }
      `}</style>

      <main style={{ background: "var(--bg)", display: "flex", flexDirection: "column", gap: 32 }}>

        <section className="full-bleed relative flex items-end"
          style={{ minHeight: 480, background: "var(--surface)", border: "none", borderRadius: 0 }}>
            <div className="absolute inset-0">
              <img
                src="/images/stadium.jpg"
                alt="Stadium"
                className="w-full h-full object-cover"
                style={{ transition: "transform 8s ease", transform: ready ? "scale(1.04)" : "scale(1)" }}
              />
            </div>

          {/* Inner content stays padded */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-14 pb-10 max-sm:px-5">
            <div style={heroT(60)}>
              <div className="section-label mb-3">Mzansi Football Coverage</div>
            </div>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <h1 className="font-black leading-none card-text" style={{ fontSize: "clamp(40px,7vw,72px)", ...heroT(140) }}>
                  Diski <span style={{ color: G }}>News</span>
                </h1>
                <p className="mt-3 text-sm leading-relaxed muted max-w-md" style={heroT(240)}>
                  Transfers, match reports, PSL updates and everything happening across South African football.
                </p>
              </div>
              {/* stat tiles */}
              <div className="flex gap-3 flex-wrap" style={heroT(320)}>
                <div className="rounded-2xl px-5 py-3 text-center"
                  style={{ background: `${G}18`, border: `1.5px solid ${G}33` }}>
                  <div className="text-2xl font-black" style={{ color: G }}>{ALL_NEWS.length}</div>
                  <div className="text-[9px] uppercase tracking-widest font-bold muted">Articles</div>
                </div>
                <div className="rounded-2xl px-5 py-3 text-center"
                  style={{ background: `${G}18`, border: `1.5px solid ${G}33` }}>
                  <div className="text-2xl font-black" style={{ color: G }}>{CATEGORIES.length - 1}</div>
                  <div className="text-[9px] uppercase tracking-widest font-bold muted">Categories</div>
                </div>
                <div className="rounded-2xl px-5 py-3 flex items-center gap-2"
                  style={{ background: G }}>
                  <span className="pulse-dot w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: "#0a1a0e" }} />
                  <div>
                    <div className="text-[11px] font-black" style={{ color: "#0a1a0e" }}>Live Updates</div>
                    <div className="text-[9px] font-bold" style={{ color: "rgba(10,26,14,0.6)" }}>2025/26 Season</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SEARCH + FILTERS — EFL-style horizontal bar ── */}
        <FadeUp>
          <div className="rounded-2xl px-5 py-4 flex items-center gap-4 flex-wrap justify-between"
            style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className="cat-pill text-[11px] font-black rounded-xl px-4 py-2 border cursor-pointer"
                  style={{
                    background: category === cat ? G : "var(--surface2)",
                    color:      category === cat ? "#fff" : "var(--text2)",
                    borderColor: category === cat ? GD : "var(--border)",
                  }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="search-box flex items-center gap-2 rounded-xl px-4 py-2.5 flex-shrink-0"
              style={{ background: "var(--surface2)", border: "1.5px solid var(--border)", minWidth: 220, transition: "border-color 0.2s, box-shadow 0.2s" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Search articles…" value={search}
                onChange={e => setSearch(e.target.value)}
                className="text-xs outline-none bg-transparent w-full"
                style={{ color: "var(--text)", caretColor: G }} />
              {search && (
                <button onClick={() => setSearch("")} className="muted text-xs leading-none cursor-pointer">✕</button>
              )}
            </div>
          </div>

          {/* Results count */}
          {(search || category !== "All") && (
            <p className="mt-3 text-xs muted px-1">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              {category !== "All" && <span> in <strong style={{ color: G }}>{category}</strong></span>}
              {search && <span> matching "<strong style={{ color: G }}>{search}</strong>"</span>}
            </p>
          )}
        </FadeUp>

        {/* ── ARTICLES ── */}
        {paginated.length === 0 ? (
          <FadeUp>
            <div className="rounded-2xl py-24 text-center" style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}>
              <div className="text-4xl mb-4">⚽</div>
              <p className="text-sm card-text font-bold mb-2">No articles found</p>
              <p className="text-xs muted mb-6">Try a different search term or category</p>
              <button onClick={() => { setSearch(""); setCategory("All"); }}
                className="text-xs font-black px-5 py-2.5 rounded-xl text-white cursor-pointer"
                style={{ background: G }}>
                Clear Filters
              </button>
            </div>
          </FadeUp>
        ) : (
          <>
            {/* ── EFL-style HERO + SIDEBAR layout for top stories ── */}
            {hero && (
              <FadeUp>
                <div className="section-label mb-4">Top Story</div>
                <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 340px" }}>
                  {/* Big featured card */}
                  <NewsCard n={hero} tall delay={0} />

                  {/* Side column — 2 stacked cards like EFL right rail */}
                  <div className="flex flex-col gap-4">
                    {sidePair.map((n, i) => (
                      <NewsCard key={n.id} n={n} delay={i * 80 + 80} />
                    ))}
                    {/* EFL-style promo block if only 1 side card */}
                    {sidePair.length < 2 && (
                      <div className="rounded-2xl p-5 flex flex-col gap-3 flex-1"
                        style={{ background: G, minHeight: 160 }}>
                        <div className="text-[10px] font-black uppercase tracking-widest"
                          style={{ color: "rgba(10,26,14,0.6)" }}>Newsletter</div>
                        <p className="font-black leading-snug" style={{ color: "#0a1a0e", fontSize: 15 }}>
                          Get Mzansi football news straight to your inbox
                        </p>
                        <button className="mt-auto text-xs font-black px-4 py-2.5 rounded-xl"
                          style={{ background: "#0a1a0e", color: G }}>
                          Subscribe Free →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </FadeUp>
            )}

            {/* ── MORE STORIES — EFL horizontal card list ── */}
            {remaining.length > 0 && (
              <FadeUp delay={100}>
                <div className="section-label mb-4">More Stories</div>

                {/* First row: 3 standard cards */}
                <div className="grid grid-cols-3 gap-4 mb-4 max-md:grid-cols-1">
                  {remaining.slice(0, 3).map((n, i) => (
                    <NewsCard key={n.id} n={n} delay={i * 60} />
                  ))}
                </div>

                {/* Remaining: horizontal compact list like EFL "Latest" strip */}
                {remaining.slice(3).length > 0 && (
                  <>
                    <div className="section-label mb-3" style={{ fontSize: 9 }}>Latest</div>
                    <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                      {remaining.slice(3).map((n, i) => (
                        <NewsCard key={n.id} n={n} horizontal delay={i * 50} />
                      ))}
                    </div>
                  </>
                )}
              </FadeUp>
            )}
          </>
        )}

        {/* ── NEWSLETTER CTA — EFL-style full-width band ── */}
        <FadeUp delay={80}>
          <div className="rounded-3xl overflow-hidden relative"
            style={{ background: "var(--surface2)", border: "1.5px solid var(--border)" }}>
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                45deg, transparent, transparent 19px,
                ${G}08 19px, ${G}08 20px
              )`,
            }} />
            <div className="relative z-10 px-10 py-10 flex items-center justify-between gap-8 flex-wrap max-sm:px-5">
              <div>
                <div className="section-label mb-2">Stay Updated</div>
                <h2 className="text-2xl font-black card-text">Never Miss a Diski Moment</h2>
                <p className="text-sm muted mt-1 max-w-sm">
                  Live scores, transfer alerts, and match reports — all delivered directly.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <input type="email" placeholder="your@email.com"
                  className="rounded-xl px-4 py-3 text-sm outline-none"
                  style={{
                    background: "var(--surface)", border: "1.5px solid var(--border)",
                    color: "var(--text)", minWidth: 220,
                  }}
                  onFocus={e => { (e.target as HTMLInputElement).style.borderColor = G; }}
                  onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "var(--border)"; }}
                />
                <button className="rounded-xl px-6 py-3 text-sm font-black text-white cursor-pointer"
                  style={{ background: G, transition: "background 0.18s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GD; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = G; }}>
                  Subscribe →
                </button>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <FadeUp>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="page-btn px-5 py-2.5 rounded-xl text-xs font-black border cursor-pointer"
                style={{
                  background: "var(--surface2)", color: page === 1 ? "var(--text3)" : "var(--text)",
                  borderColor: "var(--border)", opacity: page === 1 ? 0.4 : 1,
                  cursor: page === 1 ? "not-allowed" : "pointer",
                }}>← Prev</button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className="page-btn w-10 h-10 rounded-xl text-xs font-black border cursor-pointer"
                  style={{
                    background:  page === p ? G : "var(--surface2)",
                    color:       page === p ? "#fff" : "var(--text2)",
                    borderColor: page === p ? GD : "var(--border)",
                  }}>{p}</button>
              ))}

              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="page-btn px-5 py-2.5 rounded-xl text-xs font-black border cursor-pointer"
                style={{
                  background: "var(--surface2)", color: page === totalPages ? "var(--text3)" : "var(--text)",
                  borderColor: "var(--border)", opacity: page === totalPages ? 0.4 : 1,
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                }}>Next →</button>
            </div>
          </FadeUp>
        )}

        <div className="h-8" />
      </main>
    </>
  );
}