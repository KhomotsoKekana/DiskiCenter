"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const GREEN  = "#8eb69b";
const GREY   = "#4b5563";
const GREY_L = "#f3f4f6";

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
    img: "/images/derby.png",
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
    excerpt: "Kaizer Chiefs are reportedly in advanced talks to sign a prolific Nigerian striker to bolster their attacking options for the second half of the season.",
    date: "Mar 4, 2026", readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80",
    author: "Sipho Mokoena",
  },
  {
    id: 5, tag: "PSL", featured: false,
    title: "Sundowns Extend Lead at Top of PSL Table",
    excerpt: "Mamelodi Sundowns remain on course for yet another league title after extending their lead at the summit of the PSL standings.",
    date: "Mar 3, 2026", readTime: "3 min read",
    img: "https://images.unsplash.com/photo-1551958219-acbc8e4a1e0d?w=600&q=80",
    author: "Thabo Nkosi",
  },
  {
    id: 6, tag: "GladAfrica", featured: false,
    title: "Promotion Race Heats Up in GladAfrica Championship",
    excerpt: "The battle for promotion spots in the GladAfrica Championship is intensifying with just eight matches left in the season.",
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
    excerpt: "AmaZulu snatched all three points in the dying minutes to deal a serious blow to Sekhukhune United's top-four hopes.",
    date: "Feb 28, 2026", readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=600&q=80",
    author: "Thabo Nkosi",
  },
  {
    id: 9, tag: "PSL", featured: false,
    title: "PSL Announces New Broadcast Deal Worth R2 Billion",
    excerpt: "The Premier Soccer League has announced a landmark broadcast deal that will see matches aired across multiple new platforms.",
    date: "Feb 27, 2026", readTime: "3 min read",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
    author: "Zanele Khumalo",
  },
  {
    id: 10, tag: "Transfer", featured: false,
    title: "Orlando Pirates Secure Signature of Defensive Midfielder",
    excerpt: "Orlando Pirates have completed the signing of a combative defensive midfielder who joins from a European club.",
    date: "Feb 26, 2026", readTime: "2 min read",
    img: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=600&q=80",
    author: "Sipho Mokoena",
  },
  {
    id: 11, tag: "GladAfrica", featured: false,
    title: "Hungry Lions Top GladAfrica Table After Win",
    excerpt: "Hungry Lions have moved to the top of the GladAfrica Championship table following a convincing home victory.",
    date: "Feb 25, 2026", readTime: "2 min read",
    img: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80",
    author: "Lerato Dlamini",
  },
  {
    id: 12, tag: "CAF", featured: false,
    title: "South African Clubs Praised for CAF Performances",
    excerpt: "South African representatives in CAF competitions have received widespread praise for their performances this season.",
    date: "Feb 24, 2026", readTime: "3 min read",
    img: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&q=80",
    author: "Zanele Khumalo",
  },
];

const CATEGORIES = ["All", "PSL", "Transfer", "Match Report", "GladAfrica", "CAF"];
const PER_PAGE = 6;

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.08, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0px)" : "translateY(24px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function NewsPage() {
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All");
  const [page, setPage]           = useState(1);
  const [ready, setReady]         = useState(false);

  useEffect(() => { setTimeout(() => setReady(true), 60); }, []);

  const filtered = ALL_NEWS.filter((n) => {
    const matchCat = category === "All" || n.tag === category;
    const matchQ   = search === "" ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.tag.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  const totalPages  = Math.ceil(filtered.length / PER_PAGE);
  const paginated   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => { setPage(1); }, [search, category]);

  const heroT = (delay: number) => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0px)" : "translateY(28px)",
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
  });

  const col1 = paginated.filter((_, i) => i % 3 === 0);
  const col2 = paginated.filter((_, i) => i % 3 === 1);
  const col3 = paginated.filter((_, i) => i % 3 === 2);

  return (
    <>
      <style>{`
        .news-card { transition: transform 0.28s ease, box-shadow 0.28s ease; }
        .news-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.09); }
        .news-card img { transition: transform 0.4s ease; }
        .news-card:hover img { transform: scale(1.05); }

        .cat-pill { transition: background 0.18s, color 0.18s, transform 0.18s; }
        .cat-pill:hover { transform: translateY(-1px); }

        .search-wrap:focus-within { box-shadow: 0 0 0 2px ${GREEN}; }

        .page-btn { transition: background 0.18s, color 0.18s, transform 0.18s; }
        .page-btn:hover:not(:disabled) { transform: translateY(-1px); }

        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .grid-appear { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      <main>

        {/* ── PAGE HEADER ── */}
        <section className="relative rounded-4xl overflow-hidden border border-black min-h-[260px] flex items-end"
          style={{ background: GREY }}>
          {/* <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: `repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px),
                              repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px)`,
          }} /> */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${GREY} 40%, transparent)` }} />

          <div className="relative z-10 p-10 w-full max-sm:p-5">
            <div style={heroT(80)}>
              <span className="cta-badge text-xs font-bold uppercase tracking-wide">Latest Coverage</span>
            </div>
            <h1 className="text-white text-5xl font-bold leading-tight mt-3 max-sm:text-3xl" style={heroT(180)}>
              Diski <span style={{ color: GREEN }}>News</span>
            </h1>
            <p className="text-white/50 text-sm mt-2 max-w-md" style={heroT(280)}>
              Transfers, match reports, PSL updates and everything happening in Mzansi.
            </p>
          </div>
        </section>

        {/* ── SEARCH && FILTERS ── */}
        <FadeUp delay={80}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between flex-wrap">

            {/* Search */}
            <div className="search-wrap flex items-center gap-2 rounded-4xl border px-4 py-2.5 bg-white transition-all"
              style={{ borderColor: "#d1d5db", maxWidth: 320 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREY} strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="text-xs outline-none bg-transparent w-full placeholder:text-gray-400"
                style={{ color: GREY }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ color: GREY, lineHeight: 1 }} className="text-xs">✕</button>
              )}
            </div>

            {/* Category section */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className="cat-pill text-xs font-semibold rounded-full px-4 py-1.5 border cursor-pointer"
                  style={{
                    background: category === cat ? GREEN : "#fff",
                    color:      category === cat ? "#fff" : GREY,
                    borderColor: category === cat ? GREEN : "#d1d5db",
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </FadeUp>

        {(search || category !== "All") && (
          <FadeUp>
            <p className="text-xs" style={{ color: GREY }}>
              {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
              {category !== "All" && <span> in <strong>{category}</strong></span>}
              {search && <span> for "<strong>{search}</strong>"</span>}
            </p>
          </FadeUp>
        )}

        {paginated.length === 0 ? (
          <FadeUp>
            <div className="rounded-4xl border py-20 text-center" style={{ borderColor: "#d1d5db" }}>
              <p className="text-sm" style={{ color: GREY }}>No articles found. Try a different search or category.</p>
              <button onClick={() => { setSearch(""); setCategory("All"); }}
                className="mt-4 text-xs font-semibold underline cursor-pointer" style={{ color: GREEN }}>
                Clear filters
              </button>
            </div>
          </FadeUp>
        ) : (
          <FadeUp>
            <div className="grid grid-cols-3 gap-4 items-start max-lg:grid-cols-2 max-md:grid-cols-1">
              {[col1, col2, col3].map((col, ci) => (
                <div key={ci} className="flex flex-col gap-4">
                  {col.map((n, i) => {
                    const tall = i === 0 && ci === 0; // played around with the height of the first card in the first column to add some visual interest to the grid. you can remove this logic if you want all cards to be the same height.
                    return (
                      <div key={n.id} className="news-card rounded-4xl border overflow-hidden cursor-pointer flex flex-col"
                        style={{ borderColor: "#d1d5db", animationDelay: `${(ci * 2 + i) * 60}ms` }}>
                        {/* Image */}
                        <div className="overflow-hidden" style={{ height: tall ? 260 : 180 }}>
                          <img src={n.img} alt={n.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Body */}
                        <div className="px-5 py-4 flex flex-col gap-2.5 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="subject-badge text-[10px]"
                              style={{ background: GREEN, color: "#fff" }}>
                              {n.tag}
                            </span>
                            <span className="text-[10px] text-muted-foreground">{n.readTime}</span>
                          </div>

                          <h3 className="font-bold leading-snug"
                            style={{ fontSize: tall ? 17 : 13, lineHeight: 1.35 }}>
                            {n.title}
                          </h3>

                          {tall && (
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{n.excerpt}</p>
                          )}

                          <div className="flex items-center justify-between mt-auto pt-1">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
                                style={{ background: GREY }}>
                                {n.author.split(" ").map(w => w[0]).join("")}
                              </div>
                              <span className="text-[10px] text-muted-foreground">{n.author}</span>
                            </div>
                            <span className="text-[10px] text-muted-foreground">{n.date}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </FadeUp>
        )}

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <FadeUp delay={100}>
            <div className="flex items-center justify-center gap-2 flex-wrap">

              {/* Prev */}
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="page-btn btn-signin text-xs"
                style={{
                  borderColor: page === 1 ? "#e5e7eb" : GREY,
                  color: page === 1 ? "#9ca3af" : GREY,
                  opacity: page === 1 ? 0.5 : 1,
                  cursor: page === 1 ? "not-allowed" : "pointer",
                }}>
                ← Prev
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className="page-btn w-9 h-9 rounded-full text-xs font-bold border cursor-pointer"
                  style={{
                    background:  page === p ? GREEN : "#fff",
                    color:       page === p ? "#fff" : GREY,
                    borderColor: page === p ? GREEN : "#d1d5db",
                  }}>
                  {p}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="page-btn btn-signin text-xs"
                style={{
                  borderColor: page === totalPages ? "#e5e7eb" : GREY,
                  color: page === totalPages ? "#9ca3af" : GREY,
                  opacity: page === totalPages ? 0.5 : 1,
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                }}>
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