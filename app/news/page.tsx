"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const G   = "#8eb69b";
const GD  = "#6a9a7f";

const ALL_NEWS = [
  { id: 1,  tag: "Transfer",     featured: true,  title: "Sundowns Sign Star Midfielder Ahead of CAF Campaign",        excerpt: "Mamelodi Sundowns have confirmed the signing of a highly-rated midfielder ahead of their CAF Champions League campaign. The player joins on a three-year deal and is expected to make his debut next week.", date: "Mar 9, 2026",  readTime: "3 min read", img: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80", author: "Sipho Mokoena"  },
  { id: 2,  tag: "Match Report", featured: false, title: "Pirates Destroy Chiefs in Thrilling Soweto Derby",           excerpt: "A pulsating Soweto Derby ended with Pirates emerging victorious in a 3-0 defeat of their biggest rivals.",                                                                                                  date: "Mar 7, 2026",  readTime: "5 min read", img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80", author: "Thabo Nkosi"    },
  { id: 3,  tag: "PSL",          featured: false, title: "Bafana Bafana Climb FIFA Rankings After Strong Run",         excerpt: "South Africa's national side have climbed several places in the latest FIFA World Rankings.",                                                                                                         date: "Mar 5, 2026",  readTime: "2 min read", img: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80", author: "Lerato Dlamini" },
  { id: 4,  tag: "Transfer",     featured: false, title: "Kaizer Chiefs Target Nigerian Striker This Window",          excerpt: "Kaizer Chiefs are reportedly in advanced talks to sign a prolific Nigerian striker to bolster their attacking options.",                                                                          date: "Mar 4, 2026",  readTime: "4 min read", img: "https://images.unsplash.com/photo-1551958219-acbc8e4a1e0d?w=600&q=80", author: "Sipho Mokoena"  },
  { id: 5,  tag: "PSL",          featured: false, title: "Sundowns Extend Lead at Top of PSL Table",                  excerpt: "Mamelodi Sundowns remain on course for yet another league title after extending their lead at the summit.",                                                                                        date: "Mar 3, 2026",  readTime: "3 min read", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80", author: "Thabo Nkosi"    },
  { id: 6,  tag: "GladAfrica",   featured: false, title: "Promotion Race Heats Up in GladAfrica Championship",        excerpt: "The battle for promotion spots in the GladAfrica Championship is intensifying with just eight matches left.",                                                                                     date: "Mar 2, 2026",  readTime: "3 min read", img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80", author: "Zanele Khumalo" },
  { id: 7,  tag: "CAF",          featured: false, title: "Sundowns Draw Tough Opponents in CAF Quarter-Finals",       excerpt: "Mamelodi Sundowns have been drawn against a formidable North African side in the CAF Champions League quarter-finals.",                                                                          date: "Mar 1, 2026",  readTime: "2 min read", img: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=600&q=80", author: "Lerato Dlamini" },
  { id: 8,  tag: "Match Report", featured: false, title: "AmaZulu Stun Sekhukhune in Late Drama",                     excerpt: "AmaZulu snatched all three points in the dying minutes to deal a blow to Sekhukhune United's top-four hopes.",                                                                                    date: "Feb 28, 2026", readTime: "4 min read", img: "https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=600&q=80", author: "Thabo Nkosi"    },
  { id: 9,  tag: "PSL",          featured: false, title: "PSL Announces New Broadcast Deal Worth R2 Billion",         excerpt: "The Premier Soccer League has announced a landmark broadcast deal across multiple new platforms.",                                                                                                date: "Feb 27, 2026", readTime: "3 min read", img: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80", author: "Zanele Khumalo" },
  { id: 10, tag: "Transfer",     featured: false, title: "Orlando Pirates Secure Signature of Defensive Midfielder",  excerpt: "Orlando Pirates have completed the signing of a combative defensive midfielder from a European club.",                                                                                           date: "Feb 26, 2026", readTime: "2 min read", img: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=600&q=80", author: "Sipho Mokoena"  },
  { id: 11, tag: "GladAfrica",   featured: false, title: "Hungry Lions Top GladAfrica Table After Win",               excerpt: "Hungry Lions have moved to the top of the GladAfrica Championship following a convincing home victory.",                                                                                      date: "Feb 25, 2026", readTime: "2 min read", img: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&q=80", author: "Lerato Dlamini" },
  { id: 12, tag: "CAF",          featured: false, title: "South African Clubs Praised for CAF Performances",          excerpt: "SA representatives in CAF competitions have received widespread praise for their performances this season.",                                                                                   date: "Feb 24, 2026", readTime: "3 min read", img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80", author: "Zanele Khumalo" },
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
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.06, ...options });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms` }}>
      {children}
    </div>
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
        style={{ background:"var(--surface)", border:"1.5px solid var(--border)", opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(20px)", transition:`opacity 0.5s ease ${delay}ms,transform 0.5s ease ${delay}ms` }}>
        <div className="overflow-hidden flex-shrink-0" style={{ width:110, minHeight:90 }}>
          <img src={n.img} alt={n.title} className="w-full h-full object-cover news-img" />
        </div>
        <div className="px-3 py-3 flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide flex-shrink-0"
              style={{ background:tc.bg, color:tc.text }}>{n.tag}</span>
            <span className="text-[9px] muted">{n.readTime}</span>
          </div>
          <h3 className="font-bold card-text leading-snug line-clamp-2" style={{ fontSize:12 }}>{n.title}</h3>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-[9px] muted truncate">{n.author}</span>
            <span className="text-[9px] muted flex-shrink-0 ml-2">{n.date}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="news-card rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{ background:"var(--surface)", border:"1.5px solid var(--border)", opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(20px)", transition:`opacity 0.5s ease ${delay}ms,transform 0.5s ease ${delay}ms` }}>
      <div className="overflow-hidden relative" style={{ height: tall ? "clamp(200px,30vw,340px)" : 180 }}>
        <img src={n.img} alt={n.title} className="w-full h-full object-cover news-img" />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 60%)" }} />
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wide"
            style={{ background:tc.bg, color:tc.text }}>{n.tag}</span>
        </div>
        {tall && (
          <div className="absolute bottom-3 right-3">
            <span className="text-[10px] font-bold px-3 py-1 rounded-lg text-white"
              style={{ background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.2)" }}>
              {n.readTime}
            </span>
          </div>
        )}
      </div>
      {tall && <div style={{ height:3, background:G, flexShrink:0 }} />}
      <div className="px-4 py-4 flex flex-col gap-2.5 flex-1">
        <h3 className="font-black card-text leading-snug" style={{ fontSize: tall ? "clamp(14px,2.5vw,18px)" : 13, lineHeight:1.3 }}>{n.title}</h3>
        {tall && <p className="text-xs leading-relaxed muted line-clamp-3">{n.excerpt}</p>}
        <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop:"1px solid var(--border)" }}>
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-black flex-shrink-0" style={{ background:GD }}>
              {n.author.split(" ").map((w:string)=>w[0]).join("")}
            </div>
            <span className="text-[10px] muted truncate">{n.author}</span>
          </div>
          <span className="text-[10px] font-bold flex-shrink-0 ml-2" style={{ color:G }}>Read →</span>
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All");
  const [page, setPage]           = useState(1);
  const [ready, setReady]         = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => { setTimeout(() => setReady(true), 60); }, []);
  useEffect(() => { setPage(1); }, [search, category]);

  const filtered = ALL_NEWS.filter(n => {
    const matchCat = category === "All" || n.tag === category;
    const matchQ   = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.tag.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const heroT = (d: number) => ({
    opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.65s ease ${d}ms, transform 0.65s ease ${d}ms`,
  });

  const [hero, ...rest] = paginated;
  const sidePair  = rest.slice(0, 2);
  const remaining = rest.slice(2);

  return (
    <>
      <style>{`
        :root {
          --bg:#f8f9fa; --bg2:#ffffff; --bg3:#f1f3f0;
          --surface:#ffffff; --surface2:#f1f3f0; --border:#e2e8e4;
          --text:#1a2e22; --text2:#4a6358; --text3:#7a9688;
        }
        @media (prefers-color-scheme:dark) {
          :root {
            --bg:#0f1a14; --bg2:#162118; --bg3:#1c2b1f;
            --surface:#1c2b1f; --surface2:#243328; --border:#2a3d2f;
            --text:#e8f0ea; --text2:#a8c4b0; --text3:#6a9478;
          }
        }
        body { background:var(--bg) !important; }
        .card-text { color:var(--text); }
        .muted      { color:var(--text3); }

        .news-card { transition:transform .28s ease,box-shadow .28s ease,border-color .28s; }
        .news-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,.12); border-color:${G} !important; }
        .news-img { transition:transform .42s ease; }
        .news-card:hover .news-img { transform:scale(1.06); }

        .cat-pill { transition:background .18s,color .18s,border-color .18s,transform .18s; cursor:pointer; }
        .cat-pill:hover { transform:translateY(-1px); }

        .search-box:focus-within { border-color:${G} !important; box-shadow:0 0 0 3px ${G}22; }

        .page-btn { transition:background .18s,color .18s,transform .18s; }
        .page-btn:hover:not(:disabled) { transform:translateY(-1px); }

        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:.4} }
        .pulse-dot { animation:pulse-dot 1.6s ease-in-out infinite; }

        .section-label { display:flex;align-items:center;gap:8px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.18em;color:${G}; }
        .section-label::before { content:'';display:block;width:20px;height:3px;background:${G};border-radius:99px; }

        /* ── HERO responsive ── */
        .hero-content {
          display:flex; align-items:flex-end; justify-content:space-between;
          gap:24px; flex-wrap:wrap;
        }
        .hero-stats-row { display:flex; gap:12px; flex-wrap:wrap; }

        @media (max-width:600px) {
          .hero-content { flex-direction:column; align-items:flex-start; gap:16px; }
          .hero-stats-row { width:100%; display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
          .hero-stat-tile { padding:10px 8px !important; }
          .hero-stat-val  { font-size:18px !important; }
          .hero-stat-lbl  { font-size:8px !important; }
        }

        /* ── Top story grid: side-by-side → stacked ── */
        .top-story-grid {
          display:grid;
          grid-template-columns:1fr 300px;
          gap:16px;
        }
        @media (max-width:860px) {
          .top-story-grid { grid-template-columns:1fr; }
          .side-pair { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        }
        @media (max-width:520px) {
          .side-pair { grid-template-columns:1fr; }
        }

        /* ── More stories grid ── */
        .more-grid {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:16px;
        }
        @media (max-width:860px) { .more-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:520px) { .more-grid { grid-template-columns:1fr; } }

        /* ── Latest horizontal grid ── */
        .latest-grid {
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:12px;
        }
        @media (max-width:580px) { .latest-grid { grid-template-columns:1fr; } }

        /* ── Filter bar ── */
        .filter-bar-inner {
          display:flex; align-items:center; gap:16px;
          justify-content:space-between; flex-wrap:nowrap;
        }
        .cat-pills-row { display:flex; flex-wrap:wrap; gap:8px; flex:1; }

        /* On mobile: hide desktop pills, show toggle button */
        .mobile-filter-btn { display:none; }
        @media (max-width:640px) {
          .cat-pills-row { display:none; }
          .mobile-filter-btn { display:flex; }
          .filter-bar-inner { flex-wrap:wrap; gap:10px; }
        }

        /* Mobile filter dropdown */
        .mobile-cat-panel {
          display:none;
          flex-wrap:wrap;
          gap:8px;
          padding:12px 16px;
          border-top:1px solid var(--border);
          background:var(--surface2);
        }
        .mobile-cat-panel.open { display:flex; }

        /* ── Newsletter CTA ── */
        .newsletter-inner {
          display:flex; align-items:center; justify-content:space-between;
          gap:24px; flex-wrap:wrap;
        }
        .newsletter-form { display:flex; gap:10px; flex-wrap:wrap; }
        @media (max-width:560px) {
          .newsletter-form { width:100%; flex-direction:column; }
          .newsletter-form input { min-width:unset !important; width:100%; }
          .newsletter-form button { width:100%; }
        }

        /* ── Pagination ── */
        .pagination { display:flex; align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; }
      `}</style>

      <main style={{ background:"var(--bg)", display:"flex", flexDirection:"column", gap:28 }}>

        {/* ── HERO section ── */}
        <section className="relative flex items-end"
          style={{ minHeight:"clamp(300px,50vw,480px)", borderRadius:24, overflow:"hidden" }}>
          <div className="absolute inset-0">
            <img src="/images/stadium.jpg" alt="Stadium" className="w-full h-full object-cover"
              style={{ transition:"transform 8s ease", transform: ready?"scale(1.04)":"scale(1)" }} />
            <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.45) 50%,rgba(0,0,0,0.05) 100%)" }} />
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background:G }} />
          </div>

          <div className="relative z-10 w-full" style={{ padding:"clamp(20px,4vw,48px)" }}>
            <div style={heroT(60)} className="mb-4">
              <div className="section-label" style={{ color:G }}>Mzansi Football Coverage</div>
            </div>
            <div className="hero-content">
              <div>
                <h1 className="font-black leading-none text-white" style={{ fontSize:"clamp(36px,7vw,72px)", ...heroT(140) }}>
                  Diski <span style={{ color:G }}>News</span>
                </h1>
                <p className="mt-3 text-sm leading-relaxed max-w-md" style={{ ...heroT(240), color:"rgba(255,255,255,0.55)" }}>
                  Transfers, match reports, PSL updates and everything happening across South African football.
                </p>
              </div>

              {/* Stat tiles */}
              <div className="hero-stats-row" style={heroT(320)}>
                <div className="hero-stat-tile rounded-2xl text-center" style={{ padding:"12px 20px", background:"rgba(255,255,255,0.08)", border:"1.5px solid rgba(255,255,255,0.15)", backdropFilter:"blur(12px)" }}>
                  <div className="hero-stat-val font-black" style={{ fontSize:22, color:G }}>{ALL_NEWS.length}</div>
                  <div className="hero-stat-lbl uppercase tracking-widest mt-1 font-bold" style={{ fontSize:9, color:"rgba(255,255,255,0.45)" }}>Articles</div>
                </div>
                <div className="hero-stat-tile rounded-2xl text-center" style={{ padding:"12px 20px", background:"rgba(255,255,255,0.08)", border:"1.5px solid rgba(255,255,255,0.15)", backdropFilter:"blur(12px)" }}>
                  <div className="hero-stat-val font-black" style={{ fontSize:22, color:G }}>{CATEGORIES.length - 1}</div>
                  <div className="hero-stat-lbl uppercase tracking-widest mt-1 font-bold" style={{ fontSize:9, color:"rgba(255,255,255,0.45)" }}>Categories</div>
                </div>
                <div className="hero-stat-tile rounded-2xl flex items-center gap-2" style={{ padding:"12px 16px", background:G }}>
                  <span className="pulse-dot w-2 h-2 rounded-full flex-shrink-0" style={{ background:"#0a1a0e" }} />
                  <div>
                    <div className="font-black" style={{ fontSize:11, color:"#0a1a0e" }}>Live Updates</div>
                    <div className="font-bold" style={{ fontSize:9, color:"rgba(10,26,14,0.6)" }}>2025/26 Season</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <FadeUp>
          <div className="rounded-2xl overflow-hidden" style={{ background:"var(--surface)", border:"1.5px solid var(--border)" }}>
            <div className="filter-bar-inner px-4 py-3">

              {/* Desktop: category pills */}
              <div className="cat-pills-row">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setCategory(cat)}
                    className="cat-pill text-[11px] font-black rounded-xl px-4 py-2 border"
                    style={{ background: category===cat?G:"var(--surface2)", color: category===cat?"#fff":"var(--text2)", borderColor: category===cat?GD:"var(--border)" }}>
                    {cat}
                  </button>
                ))}
              </div>

              {/* Mobile: filter toggle button */}
              <button className="mobile-filter-btn items-center gap-2 px-4 py-2 rounded-xl text-xs font-black border cursor-pointer"
                onClick={() => setFiltersOpen(o=>!o)}
                style={{ background: filtersOpen?G:"var(--surface2)", color: filtersOpen?"#fff":"var(--text2)", borderColor: filtersOpen?GD:"var(--border)", transition:"background .18s,color .18s" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                </svg>
                {category !== "All" ? category : "Filter"}
                {category !== "All" && <span style={{ width:6, height:6, borderRadius:"50%", background: filtersOpen?"#fff":"#0a1a0e", display:"inline-block", marginLeft:2 }} />}
              </button>

              {/* Search */}
              <div className="search-box flex items-center gap-2 rounded-xl px-3 py-2.5"
                style={{ background:"var(--surface2)", border:"1.5px solid var(--border)", minWidth:180, transition:"border-color .2s,box-shadow .2s" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="text" placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)}
                  className="text-xs outline-none bg-transparent w-full" style={{ color:"var(--text)", caretColor:G }} />
                {search && <button onClick={()=>setSearch("")} className="muted text-xs leading-none cursor-pointer">✕</button>}
              </div>
            </div>

            {/* Mobile expandable category panel */}
            <div className={`mobile-cat-panel${filtersOpen?" open":""}`}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => { setCategory(cat); setFiltersOpen(false); }}
                  className="cat-pill text-[11px] font-black rounded-xl px-4 py-2 border"
                  style={{ background: category===cat?G:"var(--surface)", color: category===cat?"#fff":"var(--text2)", borderColor: category===cat?GD:"var(--border)" }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {(search || category !== "All") && (
            <p className="mt-2.5 text-xs muted px-1">
              {filtered.length} article{filtered.length !== 1?"s":""}
              {category !== "All" && <span> in <strong style={{ color:G }}>{category}</strong></span>}
              {search && <span> matching "<strong style={{ color:G }}>{search}</strong>"</span>}
              {(search || category !== "All") && (
                <button onClick={()=>{setSearch("");setCategory("All");}} className="ml-2 underline cursor-pointer" style={{ color:G }}>Clear</button>
              )}
            </p>
          )}
        </FadeUp>

        {/* ── ARTICLES ── */}
        {paginated.length === 0 ? (
          <FadeUp>
            <div className="rounded-2xl py-20 text-center" style={{ background:"var(--surface)", border:"1.5px solid var(--border)" }}>
              <div className="text-4xl mb-4">⚽</div>
              <p className="text-sm card-text font-bold mb-2">No articles found</p>
              <p className="text-xs muted mb-6">Try a different search term or category</p>
              <button onClick={()=>{setSearch("");setCategory("All");}}
                className="text-xs font-black px-5 py-2.5 rounded-xl text-white cursor-pointer" style={{ background:G }}>
                Clear Filters
              </button>
            </div>
          </FadeUp>
        ) : (
          <>
            {/* Top story */}
            {hero && (
              <FadeUp>
                <div className="section-label mb-4">Top Story</div>
                <div className="top-story-grid">
                  <NewsCard n={hero} tall delay={0} />
                  <div className="side-pair flex flex-col gap-4">
                    {sidePair.map((n,i) => <NewsCard key={n.id} n={n} delay={i*80+80} />)}
                    {sidePair.length < 2 && (
                      <div className="rounded-2xl p-5 flex flex-col gap-3 flex-1" style={{ background:G, minHeight:140 }}>
                        <div className="text-[10px] font-black uppercase tracking-widest" style={{ color:"rgba(10,26,14,0.6)" }}>Newsletter</div>
                        <p className="font-black leading-snug" style={{ color:"#0a1a0e", fontSize:14 }}>Get Mzansi football news straight to your inbox</p>
                        <button className="mt-auto text-xs font-black px-4 py-2.5 rounded-xl" style={{ background:"#0a1a0e", color:G }}>Subscribe Free →</button>
                      </div>
                    )}
                  </div>
                </div>
              </FadeUp>
            )}

            {/* More stories */}
            {remaining.length > 0 && (
              <FadeUp delay={100}>
                <div className="section-label mb-4">More Stories</div>
                <div className="more-grid mb-4">
                  {remaining.slice(0,3).map((n,i) => <NewsCard key={n.id} n={n} delay={i*60} />)}
                </div>
                {remaining.slice(3).length > 0 && (
                  <>
                    <div className="section-label mb-3">Latest</div>
                    <div className="latest-grid">
                      {remaining.slice(3).map((n,i) => <NewsCard key={n.id} n={n} horizontal delay={i*50} />)}
                    </div>
                  </>
                )}
              </FadeUp>
            )}
          </>
        )}

        {/* ── NEWSLETTER CTA ── */}
        <FadeUp delay={80}>
          <div className="rounded-3xl overflow-hidden relative" style={{ background:"var(--surface2)", border:"1.5px solid var(--border)" }}>
            <div className="absolute inset-0" style={{ backgroundImage:`repeating-linear-gradient(45deg,transparent,transparent 19px,${G}08 19px,${G}08 20px)` }} />
            <div className="relative z-10 newsletter-inner" style={{ padding:"clamp(20px,4vw,40px)" }}>
              <div>
                <div className="section-label mb-2">Stay Updated</div>
                <h2 className="text-xl font-black card-text" style={{ fontSize:"clamp(16px,3vw,24px)" }}>Never Miss a Diski Moment</h2>
                <p className="text-sm muted mt-1 max-w-sm">Live scores, transfer alerts, and match reports — all delivered directly.</p>
              </div>
              <div className="newsletter-form">
                <input type="email" placeholder="your@email.com"
                  className="rounded-xl px-4 py-3 text-sm outline-none"
                  style={{ background:"var(--surface)", border:"1.5px solid var(--border)", color:"var(--text)", minWidth:200, transition:"border-color .2s" }}
                  onFocus={e=>{(e.target as HTMLInputElement).style.borderColor=G}}
                  onBlur={e=>{(e.target as HTMLInputElement).style.borderColor="var(--border)"}} />
                <button className="rounded-xl px-6 py-3 text-sm font-black text-white cursor-pointer"
                  style={{ background:G, transition:"background .18s", whiteSpace:"nowrap" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=GD}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background=G}}>
                  Subscribe →
                </button>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <FadeUp>
            <div className="pagination">
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
                className="page-btn px-4 py-2.5 rounded-xl text-xs font-black border cursor-pointer"
                style={{ background:"var(--surface2)", color: page===1?"var(--text3)":"var(--text)", borderColor:"var(--border)", opacity: page===1?.4:1, cursor: page===1?"not-allowed":"pointer" }}>
                ← Prev
              </button>
              {Array.from({ length:totalPages },(_,i)=>i+1).map(p => (
                <button key={p} onClick={()=>setPage(p)}
                  className="page-btn w-10 h-10 rounded-xl text-xs font-black border cursor-pointer"
                  style={{ background: page===p?G:"var(--surface2)", color: page===p?"#fff":"var(--text2)", borderColor: page===p?GD:"var(--border)" }}>
                  {p}
                </button>
              ))}
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}
                className="page-btn px-4 py-2.5 rounded-xl text-xs font-black border cursor-pointer"
                style={{ background:"var(--surface2)", color: page===totalPages?"var(--text3)":"var(--text)", borderColor:"var(--border)", opacity: page===totalPages?.4:1, cursor: page===totalPages?"not-allowed":"pointer" }}>
                Next →
              </button>
            </div>
          </FadeUp>
        )}

        <div className="h-8" />
      </main>
    </>
  );
}