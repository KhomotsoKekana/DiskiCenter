"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const STATS = [
  { value: "32+", label: "Teams" },
  { value: "500+", label: "Players" },
  { value: "1,000+", label: "Matches" },
  { value: "8", label: "Leagues" },
];

const MATCHES = [
  {
    home: "Kaizer Chiefs", homeAbbr: "KC", homeScore: 2,
    away: "Orlando Pirates", awayAbbr: "OP", awayScore: 1,
    date: "Mar 15", time: "15:00", league: "PSL", status: "upcoming",
  },
  {
    home: "Mamelodi Sundowns", homeAbbr: "MS", homeScore: 3,
    away: "Golden Arrows", awayAbbr: "GA", awayScore: 0,
    date: "Mar 10", time: "FT", league: "PSL", status: "finished",
  },
  {
    home: "Sekhukhune Utd", homeAbbr: "SK", homeScore: 1,
    away: "AmaZulu FC", awayAbbr: "AZ", awayScore: 1,
    date: "Mar 8", time: "FT", league: "PSL", status: "finished",
  },
];

const NEWS = [
  {
    tag: "Transfer",
    title: "Sundowns Sign Star Midfielder Ahead of CAF Campaign",
    excerpt: "Mamelodi Sundowns have confirmed the signing of a highly-rated midfielder ahead of their CAF Champions League run.",
    date: "Mar 9, 2026", readTime: "3 min read",
    img: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80",
  },
  {
    tag: "Match Report",
    title: "Pirates Destroy Chiefs in Thrilling Soweto Derby Encounter",
    excerpt: "A pulsating Soweto Derby ended with Pirates emerging victorious over a 3-0 defeat.",
    date: "Mar 7, 2026", readTime: "5 min read",
    img: "/images/derby.png",
  },
  {
    tag: "PSL",
    title: "Bafana Bafana Climb FIFA Rankings After Strong Run",
    excerpt: "South Africa's national side have climbed several places in the latest FIFA World Rankings following impressive results.",
    date: "Mar 5, 2026", readTime: "2 min read",
    img: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80",
  },
];

const LEAGUES = [
  { name: "Premier Soccer League", abbr: "PSL", country: "South Africa", teams: 16 },
  { name: "GladAfrica Championship", abbr: "GFC", country: "South Africa", teams: 16 },
  { name: "Motsepe Foundation Cup", abbr: "MFC", country: "South Africa", teams: 32 },
  { name: "CAF Champions League", abbr: "CCL", country: "Africa", teams: 16 },
];

const TOP_SCORERS = [
  { name: "Junior Dion", club: "Golden Arrows", goals: 10, penaltyGoals: 1 },
  { name: "Iqraam Rayners", club: "Mamelodi Sundowns", goals: 9, penaltyGoals: 1 },
  { name: "Bradley Grobler", club: "Sekhukhune Utd", goals: 8, penaltyGoals: 1 },
  { name: "Langelihle Phili", club: "Stellenbosch FC", goals: 7, penaltyGoals: 0 },
];

const RECENT_RESULTS = [
  { home: "Sundowns", homeAbbr: "MS", homeScore: 2, away: "Pirates", awayAbbr: "OP", awayScore: 0, league: "PSL" },
  { home: "Chiefs", homeAbbr: "KC", homeScore: 1, away: "Arrows", awayAbbr: "GA", awayScore: 1, league: "PSL" },
  { home: "Siwelele", homeAbbr: "SW", homeScore: 3, away: "Magesi", awayAbbr: "MG", awayScore: 1, league: "PSL" },
  { home: "TS Galaxy", homeAbbr: "TS", homeScore: 0, away: "Royal AM", awayAbbr: "RA", awayScore: 2, league: "PSL" },
  { home: "Chippa", homeAbbr: "CH", homeScore: 1, away: "Polokwane", awayAbbr: "PC", awayScore: 0, league: "PSL" },
];

const G  = "#8eb69b";
const GD = "#6a9a7f";

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

function Counter({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}</span>;
}

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>{children}</div>
  );
}

function StaggerList({ children, className = "" }: { children: React.ReactNode[]; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div key={i} style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
        }}>{child}</div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "results">("upcoming");
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  const filtered = MATCHES.filter((m) =>
    activeTab === "upcoming" ? m.status === "upcoming" : m.status === "finished"
  );

  const heroT = (delay: number) => ({
    opacity: heroReady ? 1 : 0,
    transform: heroReady ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <>
      <style>{`
        :root {
          --bg:      #f8f9fa;
          --bg2:     #ffffff;
          --bg3:     #f1f3f0;
          --surface: #ffffff;
          --surface2:#f1f3f0;
          --border:  #e2e8e4;
          --text:    #1a2e22;
          --text2:   #4a6358;
          --text3:   #7a9688;
          --green:   ${G};
          --green-d: ${GD};
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --bg:      #0f1a14;
            --bg2:     #162118;
            --bg3:     #1c2b1f;
            --surface: #1c2b1f;
            --surface2:#243328;
            --border:  #2a3d2f;
            --text:    #e8f0ea;
            --text2:   #a8c4b0;
            --text3:   #6a9478;
            --green:   ${G};
            --green-d: ${GD};
          }
        }
        body { background: var(--bg) !important; }

        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.5)} }
        .pulse-dot { animation: pulse-dot 1.6s ease-in-out infinite; }

        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-inner { animation: ticker 24s linear infinite; }
        .ticker-inner:hover { animation-play-state: paused; }

        .match-row {
          background: var(--surface);
          border: 1.5px solid var(--border);
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .match-row:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.10); border-color: var(--green); }

        .league-row {
          background: var(--surface);
          border: 1.5px solid var(--border);
          transition: transform 0.2s, border-color 0.2s, background 0.2s;
        }
        .league-row:hover { border-color: var(--green); background: var(--surface2); transform: translateX(3px); }

        .news-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          transition: transform 0.28s ease, box-shadow 0.28s ease;
        }
        .news-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.13); }
        .news-card img { transition: transform 0.4s ease; }
        .news-card:hover img { transform: scale(1.06); }

        .quick-link {
          background: var(--surface);
          border: 1.5px solid var(--border);
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .quick-link:hover { background: var(--green); border-color: var(--green); transform: scale(1.04); }
        .quick-link:hover img { filter: brightness(0) invert(1); }
        .quick-link:hover .ql-label { color: #fff; }

        .scorer-row { transition: background 0.18s; }
        .scorer-row:hover { background: var(--surface2); }

        .result-row {
          background: var(--surface);
          border: 1.5px solid var(--border);
          transition: border-color 0.2s, transform 0.2s;
        }
        .result-row:hover { border-color: var(--green); transform: translateY(-1px); }

        .tab-btn { transition: background 0.18s, color 0.18s; }
        .cta-btn { transition: background 0.18s, transform 0.18s; }
        .cta-btn:hover { background: var(--green-d) !important; transform: translateY(-1px); }

        .section-label {
          display: flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.18em; color: var(--green);
        }
        .section-label::before {
          content: ''; display: block; width: 24px; height: 3px;
          background: var(--green); border-radius: 99px;
        }

        .page-title  { color: var(--text); }
        .page-sub    { color: var(--text2); }
        .card-text   { color: var(--text); }
        .muted       { color: var(--text3); }
      `}</style>

      <main style={{ background: "var(--bg)" }}>

        {/* ── HERO — pure image, no green tint ── */}
        <section className="relative rounded-4xl overflow-hidden min-h-[500px] flex items-end">
          <div className="absolute inset-0">
            <img
              src="/images/stadium.jpg"
              alt="Stadium"
              className="w-full h-full object-cover"
              style={{ transition: "transform 8s ease", transform: heroReady ? "scale(1.04)" : "scale(1)" }}
            />
            {/* Pure black gradient — no green tint */}
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.05) 100%)"
            }} />
            {/* Left green accent stripe */}
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: G }} />
          </div>

          <div className="relative z-10 p-10 w-full max-sm:p-6">
            <div className="flex items-center gap-3 mb-6" style={heroT(100)}>
              <span className="cta-badge text-xs font-bold tracking-widest uppercase">
                🇿🇦 South Africa's #1 Football Hub
              </span>
              <span className="flex items-center gap-1.5 rounded-full px-3 py-1 text-white text-xs"
                style={{ background: "rgba(142,182,155,0.18)", border: "1px solid rgba(142,182,155,0.35)" }}>
                <span className="pulse-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: G }} />
                Live Now
              </span>
            </div>

            <div className="flex items-end justify-between gap-8 flex-wrap">
              <div className="flex flex-col gap-5 max-w-lg">
                <h1 className="text-white font-bold leading-[0.95] max-sm:text-4xl"
                  style={{ fontSize: "clamp(48px,7vw,80px)", ...heroT(200) }}>
                  Live The<br />
                  <span style={{ color: G }}>Beautiful</span><br />
                  Game.
                </h1>
                <p className="text-sm leading-relaxed max-w-sm"
                  style={{ ...heroT(320), color: "rgba(255,255,255,0.55)" }}>
                  Fixtures, standings, transfers, and live scores — everything South African football, in one place.
                </p>
                <div className="flex gap-3 flex-wrap" style={heroT(420)}>
                  <Link href="/fixtures">
                    <button className="cta-btn font-bold text-sm px-6 py-3 rounded-xl text-white"
                      style={{ background: G }}>
                      View Fixtures →
                    </button>
                  </Link>
                  <Link href="/teams">
                    <button className="font-bold text-sm px-6 py-3 rounded-xl text-white"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1.5px solid rgba(255,255,255,0.2)",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; }}>
                      Explore Teams
                    </button>
                  </Link>
                </div>
              </div>

              {/* Stat tiles — white glass, green numbers */}
              <div className="grid grid-cols-2 gap-3" style={heroT(500)}>
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl px-5 py-4 text-center min-w-[100px]"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1.5px solid rgba(255,255,255,0.15)",
                      backdropFilter: "blur(12px)",
                    }}>
                    <div className="text-2xl font-black" style={{ color: G }}>{s.value}</div>
                    <div className="text-[10px] uppercase tracking-widest mt-1 font-bold"
                      style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TICKER ── */}
        <FadeUp delay={80}>
          <div className="rounded-2xl overflow-hidden py-3 select-none" style={{ background: G }}>
            <div className="ticker-inner flex whitespace-nowrap w-max">
              {[...Array(2)].map((_, i) => (
                <span key={i} className="flex items-center gap-8 px-8 text-xs font-bold tracking-widest uppercase">
                  {MATCHES.map((m, j) => (
                    <span key={j} className="flex items-center gap-3" style={{ color: "#0a1a0e" }}>
                      <span style={{ opacity: 0.5 }}>{m.date}</span>
                      <span>{m.home}</span>
                      <span className="font-black">{m.homeScore} – {m.awayScore}</span>
                      <span>{m.away}</span>
                      <span style={{ opacity: 0.3 }}>◆</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ── FIXTURES + SIDEBAR ── */}
        <section className="flex gap-6 justify-between items-start w-full max-lg:flex-col">

          {/* ── LEFT ── */}
          <div className="flex-1 flex flex-col gap-6">

            <FadeUp>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="section-label mb-1">Schedule</div>
                  <h2 className="text-2xl font-black page-title">Fixtures & Results</h2>
                </div>
                <div className="flex rounded-xl overflow-hidden p-1" style={{ background: "var(--surface2)" }}>
                  {(["upcoming", "results"] as const).map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className="tab-btn px-5 py-2 text-xs font-bold capitalize rounded-lg cursor-pointer"
                      style={{
                        background: activeTab === tab ? G : "transparent",
                        color: activeTab === tab ? "#fff" : "var(--text2)",
                      }}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </FadeUp>

            <StaggerList className="flex flex-col gap-3">
              {filtered.length === 0
                ? [<p key="empty" className="muted text-sm text-center py-10">No {activeTab} matches.</p>]
                : filtered.map((m, i) => (
                  <div key={i} className="match-row rounded-2xl px-5 py-4 flex items-center gap-4 cursor-pointer">
                    <div className="flex flex-col items-center min-w-[56px] gap-1">
                      <span className="text-[10px] uppercase tracking-wide font-bold muted">{m.date}</span>
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full"
                        style={m.status === "upcoming"
                          ? { background: `${G}22`, color: G }
                          : { background: "var(--surface2)", color: "var(--text3)" }}>
                        {m.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-1 justify-center">
                      <div className="flex items-center gap-2.5 flex-1 justify-end">
                        <span className="text-sm font-bold card-text text-right max-sm:hidden">{m.home}</span>
                        <span className="text-sm font-bold card-text sm:hidden">{m.homeAbbr}</span>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                          style={{ background: G }}>{m.homeAbbr[0]}</div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                        style={{ background: "var(--surface2)", minWidth: 80, justifyContent: "center" }}>
                        {m.status === "finished"
                          ? <span className="text-base font-black card-text">{m.homeScore} – {m.awayScore}</span>
                          : <span className="text-xs font-black muted">VS</span>}
                      </div>
                      <div className="flex items-center gap-2.5 flex-1">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                          style={{ background: "var(--text2)" }}>{m.awayAbbr[0]}</div>
                        <span className="text-sm font-bold card-text max-sm:hidden">{m.away}</span>
                        <span className="text-sm font-bold card-text sm:hidden">{m.awayAbbr}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-3 py-1.5 rounded-lg flex-shrink-0"
                      style={{ background: `${G}22`, color: G }}>{m.league}</span>
                  </div>
                ))
              }
            </StaggerList>

            <FadeUp>
              <Link href="/fixtures">
                <button className="w-full py-3 rounded-xl text-sm font-bold"
                  style={{
                    background: "var(--surface2)", color: "var(--text2)",
                    border: "1.5px solid var(--border)", transition: "background 0.2s, color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => {
                    const b = e.currentTarget as HTMLButtonElement;
                    b.style.background = G; b.style.color = "#fff"; b.style.borderColor = G;
                  }}
                  onMouseLeave={e => {
                    const b = e.currentTarget as HTMLButtonElement;
                    b.style.background = "var(--surface2)"; b.style.color = "var(--text2)"; b.style.borderColor = "var(--border)";
                  }}>
                  See All Fixtures →
                </button>
              </Link>
            </FadeUp>

            {/* ── TOP SCORERS ── */}
            <FadeUp className="flex flex-col gap-4">
              <div>
                <div className="section-label mb-1">2025/26 Season</div>
                <h2 className="text-2xl font-black page-title">Top Scorers</h2>
              </div>
              <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid var(--border)" }}>
                <div className="grid grid-cols-12 px-5 py-3 text-xs uppercase tracking-widest font-black"
                  style={{ background: G, color: "#0a1a0e" }}>
                  <span className="col-span-1">#</span>
                  <span className="col-span-5">Player</span>
                  <span className="col-span-3">Club</span>
                  <span className="col-span-2 text-center">Goals</span>
                  <span className="col-span-1 text-center">Pen</span>
                </div>
                <StaggerList className="flex flex-col">
                  {TOP_SCORERS.map((p, i) => (
                    <div key={p.name}
                      className={`scorer-row grid grid-cols-12 px-5 py-4 items-center cursor-pointer ${i !== TOP_SCORERS.length - 1 ? "border-b" : ""}`}
                      style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                      <span className="col-span-1 text-sm font-black" style={{ color: i === 0 ? G : "var(--text3)" }}>{i + 1}</span>
                      <div className="col-span-5 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black flex-shrink-0"
                          style={{
                            background: i === 0 ? G : "var(--surface2)",
                            color: i === 0 ? "#fff" : "var(--text2)",
                            border: "1.5px solid var(--border)",
                          }}>
                          {p.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-bold text-xs card-text">{p.name}</span>
                      </div>
                      <span className="col-span-3 text-[11px] muted">{p.club}</span>
                      <div className="col-span-2 flex justify-center">
                        <span className="text-xs font-black px-2.5 py-1 rounded-lg"
                          style={{ background: `${G}22`, color: G }}>{p.goals}</span>
                      </div>
                      <span className="col-span-1 text-center text-xs muted font-bold">{p.penaltyGoals}</span>
                    </div>
                  ))}
                </StaggerList>

                {/* ── RECENT RESULTS fills the gap ── */}
                <div className="px-5 py-3 border-t" style={{ borderColor: "var(--border)", background: "var(--surface2)" }}>
                  <p className="text-[10px] font-black uppercase tracking-widest muted mb-3">Recent Results</p>
                  <div className="flex flex-col gap-2">
                    {RECENT_RESULTS.map((r, i) => (
                      <div key={i} className="result-row rounded-xl px-4 py-2.5 flex items-center gap-3 cursor-pointer">
                        <span className="text-[10px] font-bold flex-1 text-right card-text">{r.home}</span>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg"
                          style={{ background: `${G}18` }}>
                          <span className="text-xs font-black" style={{ color: G }}>{r.homeScore}</span>
                          <span className="text-[10px] muted">–</span>
                          <span className="text-xs font-black" style={{ color: G }}>{r.awayScore}</span>
                        </div>
                        <span className="text-[10px] font-bold flex-1 card-text">{r.away}</span>
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-md"
                          style={{ background: `${G}18`, color: G }}>{r.league}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="flex flex-col gap-5 w-[340px] max-lg:w-full">

            {/* ── PLATFORM STATS — neutral bg, green tiles ── */}
            <FadeUp delay={100}>
              <div className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}>
                <div className="section-label mb-4">Platform Stats</div>
                <div className="grid grid-cols-2 gap-3">
                  {STATS.map((s) => {
                    const num = parseInt(s.value.replace(/[^0-9]/g, ""));
                    const suffix = s.value.replace(/[0-9]/g, "").replace(",", "");
                    return (
                      <div key={s.label} className="rounded-xl px-4 py-4 text-center"
                        style={{ background: G, border: `1.5px solid ${GD}` }}>
                        <div className="text-2xl font-black" style={{ color: "#0a1a0e" }}>
                          <Counter target={num} />{suffix}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest mt-1 font-bold"
                          style={{ color: "rgba(10,26,14,0.65)" }}>{s.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeUp>

            {/* CTA Card */}
            <FadeUp delay={150}>
              <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid var(--border)" }}>
                <div className="px-6 py-5" style={{ background: "var(--bg3)" }}>
                  <div className="section-label mb-2">2026 Season</div>
                  <h3 className="text-xl font-black page-title leading-tight">Don't Miss a<br />Single Match</h3>
                  <p className="text-xs mt-2 leading-relaxed muted">
                    Live scores, news alerts, and fixture reminders — all in one place.
                  </p>
                </div>
                <div className="px-6 pb-6 pt-4 flex flex-col gap-3" style={{ background: "var(--surface)" }}>
                  <button className="cta-btn w-full py-3 rounded-xl font-black text-sm text-white"
                    style={{ background: G }}>
                    Get Started Free
                  </button>
                  <Link href="/news">
                    <button className="w-full py-3 rounded-xl font-bold text-sm"
                      style={{
                        background: "var(--surface2)", color: "var(--text2)",
                        border: "1.5px solid var(--border)", transition: "border-color 0.2s",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = G; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; }}>
                      Browse News
                    </button>
                  </Link>
                </div>
              </div>
            </FadeUp>

            {/* Active Leagues */}
            <FadeUp delay={200}>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="section-label mb-1">Competitions</div>
                  <h2 className="text-xl font-black page-title">Active Leagues</h2>
                </div>
                <StaggerList className="flex flex-col gap-2">
                  {LEAGUES.map((l, i) => (
                    <Link href="/leagues" key={l.abbr}>
                      <div className="league-row rounded-2xl px-4 py-3.5 flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black flex-shrink-0"
                            style={{
                              background: i === 0 ? G : "var(--surface2)",
                              color: i === 0 ? "#fff" : "var(--text2)",
                              border: "1.5px solid var(--border)",
                            }}>
                            {l.abbr.slice(0, 2)}
                          </div>
                          <div>
                            <div className="text-xs font-bold card-text leading-tight">{l.name}</div>
                            <div className="text-[10px] muted mt-0.5">{l.country} · {l.teams} teams</div>
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: "var(--surface2)", transition: "background 0.2s, color 0.2s" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = G; (e.currentTarget as HTMLDivElement).querySelector("span")!.style.color = "#fff"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "var(--surface2)"; (e.currentTarget as HTMLDivElement).querySelector("span")!.style.color = "var(--text2)"; }}>
                          <span className="text-xs" style={{ color: "var(--text2)", transition: "color 0.2s" }}>→</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </StaggerList>
              </div>
            </FadeUp>

            {/* Quick Links */}
            <FadeUp delay={250}>
              <div className="flex flex-col gap-3">
                <div className="section-label">Explore</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Transfers", href: "/transfers", icon: "/images/transfer.svg" },
                    { label: "Teams", href: "/teams", icon: "/images/football-badge.svg" },
                    { label: "Players", href: "/players", icon: "/images/football-player.svg" },
                    { label: "News", href: "/news", icon: "/images/news.svg" },
                  ].map((item) => (
                    <Link href={item.href} key={item.label}>
                      <div className="quick-link rounded-2xl px-4 py-5 flex flex-col gap-2.5 cursor-pointer text-center items-center">
                        <img src={item.icon} alt={item.label} width={30} height={30} />
                        <span className="ql-label text-xs font-black card-text">{item.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── NEWS ── */}
        <section>
          <FadeUp className="flex items-center justify-between mb-6">
            <div>
              <div className="section-label mb-1">Coverage</div>
              <h2 className="text-2xl font-black page-title">Latest News</h2>
            </div>
            <Link href="/news">
              <button className="text-xs font-bold px-4 py-2 rounded-xl"
                style={{
                  background: `${G}22`, color: G, border: `1.5px solid ${G}44`,
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = G; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${G}22`; (e.currentTarget as HTMLButtonElement).style.color = G; }}>
                All News →
              </button>
            </Link>
          </FadeUp>

          <StaggerList className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {NEWS.map((n, i) => (
              <div key={n.title} className="news-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col">
                <div className="overflow-hidden" style={{ height: i === 0 ? 220 : 180 }}>
                  <img src={n.img} alt={n.title} className="w-full h-full object-cover" />
                </div>
                {i === 0 && <div style={{ height: 3, background: G }} />}
                <div className="px-5 py-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black px-3 py-1 rounded-lg"
                      style={{ background: `${G}22`, color: G }}>{n.tag}</span>
                    <span className="text-[10px] muted">{n.readTime}</span>
                  </div>
                  <h3 className="font-black leading-snug card-text" style={{ fontSize: i === 0 ? 15 : 13 }}>{n.title}</h3>
                  <p className="text-xs leading-relaxed line-clamp-2 muted">{n.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-2"
                    style={{ borderTop: "1px solid var(--border)" }}>
                    <span className="text-[10px] muted">{n.date}</span>
                    <span className="text-[10px] font-bold" style={{ color: G }}>Read →</span>
                  </div>
                </div>
              </div>
            ))}
          </StaggerList>
        </section>

        <div className="h-12" />
      </main>
    </>
  );
}