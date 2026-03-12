"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const STATS = [
  { value: "32+",    label: "Teams"   },
  { value: "500+",   label: "Players" },
  { value: "1,000+", label: "Matches" },
  { value: "8",      label: "Leagues" },
];

const MATCHES = [
  { home: "Kaizer Chiefs",     homeAbbr: "KC", homeScore: 2, away: "Orlando Pirates", awayAbbr: "OP", awayScore: 1, date: "Mar 15", time: "15:00", league: "PSL", status: "upcoming" },
  { home: "Mamelodi Sundowns", homeAbbr: "MS", homeScore: 3, away: "Golden Arrows",   awayAbbr: "GA", awayScore: 0, date: "Mar 10", time: "FT",    league: "PSL", status: "finished" },
  { home: "Sekhukhune Utd",    homeAbbr: "SK", homeScore: 1, away: "AmaZulu FC",      awayAbbr: "AZ", awayScore: 1, date: "Mar 8",  time: "FT",    league: "PSL", status: "finished" },
];

const NEWS = [
  { tag: "Transfer",     title: "Sundowns Sign Star Midfielder Ahead of CAF Campaign",          excerpt: "Mamelodi Sundowns have confirmed the signing of a highly-rated midfielder ahead of their CAF Champions League run.", date: "Mar 9, 2026",  readTime: "3 min read", img: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80" },
  { tag: "Match Report", title: "Pirates Destroy Chiefs in Thrilling Soweto Derby Encounter",   excerpt: "A pulsating Soweto Derby ended with Pirates emerging victorious over a 3-0 defeat.",                                  date: "Mar 7, 2026",  readTime: "5 min read", img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80" },
  { tag: "PSL",          title: "Bafana Bafana Climb FIFA Rankings After Strong Run",           excerpt: "South Africa's national side have climbed several places in the latest FIFA World Rankings.",                         date: "Mar 5, 2026",  readTime: "2 min read", img: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80" },
];

const LEAGUES = [
  { name: "Premier Soccer League",   abbr: "PSL", country: "South Africa", teams: 16 },
  { name: "GladAfrica Championship", abbr: "GFC", country: "South Africa", teams: 16 },
  { name: "Motsepe Foundation Cup",  abbr: "MFC", country: "South Africa", teams: 32 },
  { name: "CAF Champions League",    abbr: "CCL", country: "Africa",       teams: 16 },
];

const TOP_SCORERS = [
  { name: "Junior Dion",      club: "Golden Arrows",     goals: 10, penaltyGoals: 1 },
  { name: "Iqraam Rayners",   club: "Mamelodi Sundowns", goals: 9,  penaltyGoals: 1 },
  { name: "Bradley Grobler",  club: "Sekhukhune Utd",    goals: 8,  penaltyGoals: 1 },
  { name: "Langelihle Phili", club: "Stellenbosch FC",   goals: 7,  penaltyGoals: 0 },
];

const RECENT_RESULTS = [
  { home: "Sundowns",  homeScore: 2, away: "Pirates",   awayScore: 0, league: "PSL" },
  { home: "Chiefs",    homeScore: 1, away: "Arrows",    awayScore: 1, league: "PSL" },
  { home: "Siwelele",  homeScore: 3, away: "Magesi",    awayScore: 1, league: "PSL" },
  { home: "TS Galaxy", homeScore: 0, away: "Royal AM",  awayScore: 2, league: "PSL" },
  { home: "Chippa",    homeScore: 1, away: "Polokwane", awayScore: 0, league: "PSL" },
];

const G  = "#8eb69b";
const GD = "#6a9a7f";

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

function Counter({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let s = 0; const step = Math.ceil(target / (duration / 16));
    const t = setInterval(() => { s += step; if (s >= target) { setCount(target); clearInterval(t); } else setCount(s); }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}</span>;
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function StaggerList({ children, className = "" }: { children: React.ReactNode[]; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div key={i} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms` }}>
          {child}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "results">("upcoming");
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => { const t = setTimeout(() => setHeroReady(true), 80); return () => clearTimeout(t); }, []);

  const filtered = MATCHES.filter(m => activeTab === "upcoming" ? m.status === "upcoming" : m.status === "finished");
  const heroT = (d: number) => ({ opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ease ${d}ms, transform 0.7s ease ${d}ms` });

  return (
    <>
      <style>{`
        :root {
          --bg:#f8f9fa; --bg2:#ffffff; --bg3:#f1f3f0;
          --surface:#ffffff; --surface2:#f1f3f0; --border:#e2e8e4;
          --text:#1a2e22; --text2:#4a6358; --text3:#7a9688;
          --green:${G}; --green-d:${GD};
        }
        @media (prefers-color-scheme:dark) {
          :root {
            --bg:#0f1a14; --bg2:#162118; --bg3:#1c2b1f;
            --surface:#1c2b1f; --surface2:#243328; --border:#2a3d2f;
            --text:#e8f0ea; --text2:#a8c4b0; --text3:#6a9478;
            --green:${G}; --green-d:${GD};
          }
        }
        body { background:var(--bg) !important; }

        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.5)} }
        .pulse-dot { animation:pulse-dot 1.6s ease-in-out infinite; }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-inner { animation:ticker 24s linear infinite; }
        .ticker-inner:hover { animation-play-state:paused; }

        .match-row { background:var(--surface); border:1.5px solid var(--border); transition:transform .2s,box-shadow .2s,border-color .2s; }
        .match-row:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(0,0,0,.10); border-color:var(--green); }

        .league-row { background:var(--surface); border:1.5px solid var(--border); transition:transform .2s,border-color .2s,background .2s; }
        .league-row:hover { border-color:var(--green); background:var(--surface2); transform:translateX(3px); }

        .news-card { background:var(--surface); border:1.5px solid var(--border); transition:transform .28s ease,box-shadow .28s ease; }
        .news-card:hover { transform:translateY(-6px); box-shadow:0 20px 48px rgba(0,0,0,.13); }
        .news-card img { transition:transform .4s ease; }
        .news-card:hover img { transform:scale(1.06); }

        .quick-link { background:var(--surface); border:1.5px solid var(--border); transition:background .2s,border-color .2s,transform .2s; }
        .quick-link:hover { background:var(--green); border-color:var(--green); transform:scale(1.04); }
        .quick-link:hover img { filter:brightness(0) invert(1); }
        .quick-link:hover .ql-label { color:#fff; }

        .scorer-row { transition:background .18s; }
        .scorer-row:hover { background:var(--surface2); }

        .result-row { background:var(--surface); border:1.5px solid var(--border); transition:border-color .2s,transform .2s; }
        .result-row:hover { border-color:var(--green); transform:translateY(-1px); }

        .tab-btn  { transition:background .18s,color .18s; }
        .cta-btn  { transition:background .18s,transform .18s; }
        .cta-btn:hover { background:var(--green-d) !important; transform:translateY(-1px); }

        .section-label { display:flex;align-items:center;gap:10px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.18em;color:var(--green); }
        .section-label::before { content:'';display:block;width:24px;height:3px;background:var(--green);border-radius:99px; }

        .page-title { color:var(--text); }
        .card-text  { color:var(--text); }
        .muted      { color:var(--text3); }

        /* ── LAYOUT ── */
        /* Main two-column layout: content + sidebar */
        .home-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          align-items: start;
        }
        /* Sidebar stacks below on tablet/mobile */
        @media (max-width: 1024px) {
          .home-grid { grid-template-columns: 1fr; }
        }

        /* On tablet, sidebar items go side-by-side in a 2-col mini-grid */
        .sidebar-inner {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        @media (max-width: 1024px) and (min-width: 641px) {
          .sidebar-inner {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          /* Stats + CTA span both cols on tablet */
          .sidebar-stats { grid-column: 1 / -1; }
          .sidebar-cta   { grid-column: 1 / -1; }
        }

        /* ── HERO ── */
        /* Stats: 2x2 grid on mobile → row of 4 on very small screens */
        .hero-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          flex-shrink: 0;
        }
        /* On very small screens, stats go in a single row */
        @media (max-width: 480px) {
          .hero-bottom { flex-direction: column; align-items: flex-start; gap: 20px; }
          .hero-stats  { grid-template-columns: repeat(4, 1fr); gap: 6px; width: 100%; }
          .hero-stat-tile { padding: 8px 6px !important; }
          .hero-stat-val  { font-size: 16px !important; }
          .hero-stat-lbl  { font-size: 8px !important; }
        }

        /* ── FIXTURES ── */
        .fixtures-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        /* Match row: hide full name on mobile, show abbr */
        .team-full { display: block; }
        .team-abbr { display: none; }
        @media (max-width: 520px) {
          .team-full { display: none; }
          .team-abbr { display: block; }
          .match-date-col { min-width: 44px !important; }
        }

        /* ── SCORERS TABLE ── */
        /* Hide Club + Pen on small screens */
        .scorer-club { }
        .scorer-pen  { }
        @media (max-width: 500px) {
          .scorer-club { display: none; }
          .scorer-pen  { display: none; }
        }

        /* ── NEWS GRID ── */
        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 860px) { .news-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .news-grid { grid-template-columns: 1fr; } }

        /* ── QUICK LINKS ── */
        /* 4-col on sidebar, 2-col on stacked mobile */
        .quicklinks-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        @media (max-width: 1024px) and (min-width: 641px) {
          .quicklinks-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* ── PLATFORM STATS GRID ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (max-width: 1024px) and (min-width: 641px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* Utility */
        .truncate-text { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      `}</style>

      <main style={{ background:"var(--bg)", display:"flex", flexDirection:"column", gap:24 }}>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden flex items-end"
          style={{ minHeight:"clamp(380px,60vw,520px)", borderRadius:24 }}>
          <div className="absolute inset-0">
            <img src="/images/stadium.jpg" alt="Stadium" className="w-full h-full object-cover"
              style={{ transition:"transform 8s ease", transform: heroReady ? "scale(1.04)" : "scale(1)" }} />
            <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.55) 45%,rgba(0,0,0,0.05) 100%)" }} />
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background:G }} />
          </div>

          <div className="relative z-10 w-full" style={{ padding:"clamp(20px,4vw,40px)" }}>
            {/* Badges row */}
            <div className="flex items-center gap-3 flex-wrap mb-5" style={heroT(100)}>
              <span className="cta-badge text-xs font-bold tracking-widest uppercase">🇿🇦 South Africa's #1 Football Hub</span>
              <span className="flex items-center gap-1.5 rounded-full px-3 py-1 text-white text-xs"
                style={{ background:"rgba(142,182,155,0.18)", border:"1px solid rgba(142,182,155,0.35)" }}>
                <span className="pulse-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background:G }} />
                Live Now
              </span>
            </div>

            <div className="hero-bottom">
              {/* Left: headline + buttons */}
              <div style={{ maxWidth:480 }}>
                <h1 className="text-white font-bold leading-none" style={{ fontSize:"clamp(36px,7vw,80px)", ...heroT(200) }}>
                  Live The<br /><span style={{ color:G }}>Beautiful</span><br />Game.
                </h1>
                <p className="text-sm leading-relaxed mt-4 max-w-sm"
                  style={{ ...heroT(320), color:"rgba(255,255,255,0.55)" }}>
                  Fixtures, standings, transfers, and live scores — everything South African football, in one place.
                </p>
                <div className="flex gap-3 flex-wrap mt-5" style={heroT(420)}>
                  <Link href="/fixtures">
                    <button className="cta-btn font-bold text-sm px-6 py-3 rounded-xl text-white" style={{ background:G }}>
                      View Fixtures →
                    </button>
                  </Link>
                  <Link href="/teams">
                    <button className="font-bold text-sm px-6 py-3 rounded-xl text-white"
                      style={{ background:"rgba(255,255,255,0.08)", border:"1.5px solid rgba(255,255,255,0.2)", transition:"background .2s" }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.15)"}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.08)"}}>
                      Explore Teams
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right: stat tiles */}
              <div className="hero-stats" style={heroT(500)}>
                {STATS.map(s => (
                  <div key={s.label} className="hero-stat-tile rounded-2xl text-center"
                    style={{ padding:"14px 16px", background:"rgba(255,255,255,0.08)", border:"1.5px solid rgba(255,255,255,0.15)", backdropFilter:"blur(12px)" }}>
                    <div className="hero-stat-val font-black" style={{ fontSize:22, color:G }}>{s.value}</div>
                    <div className="hero-stat-lbl uppercase tracking-widest mt-1 font-bold"
                      style={{ fontSize:9, color:"rgba(255,255,255,0.45)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TICKER ── */}
        <FadeUp>
          <div className="rounded-2xl overflow-hidden py-3 select-none" style={{ background:G }}>
            <div className="ticker-inner flex whitespace-nowrap w-max">
              {[...Array(2)].map((_,i) => (
                <span key={i} className="flex items-center gap-8 px-8 text-xs font-bold tracking-widest uppercase">
                  {MATCHES.map((m,j) => (
                    <span key={j} className="flex items-center gap-3" style={{ color:"#0a1a0e" }}>
                      <span style={{ opacity:.5 }}>{m.date}</span>
                      <span>{m.home}</span>
                      <span className="font-black">{m.homeScore} – {m.awayScore}</span>
                      <span>{m.away}</span>
                      <span style={{ opacity:.3 }}>◆</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ── MAIN TWO-COLUMN GRID ── */}
        <div className="home-grid">

          {/* ── LEFT COLUMN ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:24, minWidth:0 }}>

            {/* Fixtures header */}
            <FadeUp>
              <div className="fixtures-header">
                <div>
                  <div className="section-label mb-1">Schedule</div>
                  <h2 className="text-2xl font-black page-title">Fixtures & Results</h2>
                </div>
                <div className="flex rounded-xl overflow-hidden p-1" style={{ background:"var(--surface2)" }}>
                  {(["upcoming","results"] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className="tab-btn px-4 py-2 text-xs font-bold capitalize rounded-lg cursor-pointer"
                      style={{ background: activeTab===tab ? G : "transparent", color: activeTab===tab ? "#fff" : "var(--text2)" }}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Match rows */}
            <StaggerList className="flex flex-col gap-3">
              {filtered.length === 0
                ? [<p key="e" className="muted text-sm text-center py-10">No {activeTab} matches.</p>]
                : filtered.map((m, i) => (
                  <div key={i} className="match-row rounded-2xl px-4 py-4 flex items-center gap-3 cursor-pointer">
                    {/* Date + time */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0 match-date-col" style={{ minWidth:52 }}>
                      <span className="text-[10px] uppercase tracking-wide font-bold muted">{m.date}</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                        style={m.status==="upcoming" ? { background:`${G}22`,color:G } : { background:"var(--surface2)",color:"var(--text3)" }}>
                        {m.time}
                      </span>
                    </div>

                    {/* Teams + score */}
                    <div className="flex items-center gap-2 flex-1 justify-center min-w-0">
                      {/* Home */}
                      <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
                        <span className="team-full text-sm font-bold card-text text-right truncate-text">{m.home}</span>
                        <span className="team-abbr text-sm font-bold card-text">{m.homeAbbr}</span>
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                          style={{ background:G }}>{m.homeAbbr[0]}</div>
                      </div>
                      {/* Score */}
                      <div className="flex items-center gap-1 px-3 py-2 rounded-xl flex-shrink-0"
                        style={{ background:"var(--surface2)", minWidth:68, justifyContent:"center" }}>
                        {m.status==="finished"
                          ? <span className="text-sm font-black card-text">{m.homeScore} – {m.awayScore}</span>
                          : <span className="text-xs font-black muted">VS</span>}
                      </div>
                      {/* Away */}
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                          style={{ background:"var(--text2)" }}>{m.awayAbbr[0]}</div>
                        <span className="team-full text-sm font-bold card-text truncate-text">{m.away}</span>
                        <span className="team-abbr text-sm font-bold card-text">{m.awayAbbr}</span>
                      </div>
                    </div>

                    {/* League badge */}
                    <span className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex-shrink-0"
                      style={{ background:`${G}22`,color:G }}>{m.league}</span>
                  </div>
                ))
              }
            </StaggerList>

            <FadeUp>
              <Link href="/fixtures">
                <button className="w-full py-3 rounded-xl text-sm font-bold"
                  style={{ background:"var(--surface2)",color:"var(--text2)",border:"1.5px solid var(--border)",transition:"background .2s,color .2s,border-color .2s" }}
                  onMouseEnter={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.background=G;b.style.color="#fff";b.style.borderColor=G}}
                  onMouseLeave={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.background="var(--surface2)";b.style.color="var(--text2)";b.style.borderColor="var(--border)"}}>
                  See All Fixtures →
                </button>
              </Link>
            </FadeUp>

            {/* Top Scorers */}
            <FadeUp>
              <div className="section-label mb-1">2025/26 Season</div>
              <h2 className="text-2xl font-black page-title mb-4">Top Scorers</h2>
              <div className="rounded-2xl overflow-hidden" style={{ border:"1.5px solid var(--border)" }}>

                {/* Table header */}
                <div className="flex px-4 py-3 text-xs uppercase tracking-widest font-black"
                  style={{ background:G, color:"#0a1a0e" }}>
                  <span style={{ width:28, flexShrink:0 }}>#</span>
                  <span style={{ flex:1 }}>Player</span>
                  <span className="scorer-club" style={{ width:120, flexShrink:0 }}>Club</span>
                  <span style={{ width:56, flexShrink:0, textAlign:"center" }}>Goals</span>
                  <span className="scorer-pen" style={{ width:40, flexShrink:0, textAlign:"center" }}>Pen</span>
                </div>

                <StaggerList className="flex flex-col">
                  {TOP_SCORERS.map((p,i) => (
                    <div key={p.name}
                      className={`scorer-row flex px-4 py-3.5 items-center cursor-pointer ${i!==TOP_SCORERS.length-1?"border-b":""}`}
                      style={{ borderColor:"var(--border)", background:"var(--surface)" }}>
                      <span style={{ width:28, flexShrink:0, fontSize:13, fontWeight:900, color:i===0?G:"var(--text3)" }}>{i+1}</span>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-black flex-shrink-0"
                          style={{ background:i===0?G:"var(--surface2)", color:i===0?"#fff":"var(--text2)", border:"1.5px solid var(--border)" }}>
                          {p.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                        </div>
                        <span className="font-bold text-xs card-text truncate-text">{p.name}</span>
                      </div>
                      <span className="scorer-club text-[11px] muted truncate-text" style={{ width:120, flexShrink:0 }}>{p.club}</span>
                      <div style={{ width:56, flexShrink:0, display:"flex", justifyContent:"center" }}>
                        <span className="text-xs font-black px-2 py-1 rounded-lg" style={{ background:`${G}22`,color:G }}>{p.goals}</span>
                      </div>
                      <span className="scorer-pen text-xs muted font-bold" style={{ width:40, flexShrink:0, textAlign:"center" }}>{p.penaltyGoals}</span>
                    </div>
                  ))}
                </StaggerList>

                {/* Recent Results */}
                <div className="px-4 py-3 border-t" style={{ borderColor:"var(--border)", background:"var(--surface2)" }}>
                  <p className="text-[10px] font-black uppercase tracking-widest muted mb-3">Recent Results</p>
                  <div className="flex flex-col gap-2">
                    {RECENT_RESULTS.map((r,i) => (
                      <div key={i} className="result-row rounded-xl px-3 py-2.5 flex items-center gap-2 cursor-pointer">
                        <span className="text-[10px] font-bold flex-1 text-right card-text truncate-text">{r.home}</span>
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg flex-shrink-0" style={{ background:`${G}18` }}>
                          <span className="text-xs font-black" style={{ color:G }}>{r.homeScore}</span>
                          <span className="text-[10px] muted">–</span>
                          <span className="text-xs font-black" style={{ color:G }}>{r.awayScore}</span>
                        </div>
                        <span className="text-[10px] font-bold flex-1 card-text truncate-text">{r.away}</span>
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md flex-shrink-0" style={{ background:`${G}18`,color:G }}>{r.league}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="sidebar-inner">

            {/* Platform Stats */}
            <div className="sidebar-stats">
              <FadeUp delay={100}>
                <div className="rounded-2xl p-5" style={{ background:"var(--surface)", border:"1.5px solid var(--border)" }}>
                  <div className="section-label mb-4">Platform Stats</div>
                  <div className="stats-grid">
                    {STATS.map(s => {
                      const num = parseInt(s.value.replace(/[^0-9]/g,""));
                      const suffix = s.value.replace(/[0-9]/g,"").replace(",","");
                      return (
                        <div key={s.label} className="rounded-xl px-4 py-4 text-center" style={{ background:G, border:`1.5px solid ${GD}` }}>
                          <div className="text-2xl font-black" style={{ color:"#0a1a0e" }}><Counter target={num} />{suffix}</div>
                          <div className="text-[10px] uppercase tracking-widest mt-1 font-bold" style={{ color:"rgba(10,26,14,0.65)" }}>{s.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* CTA Card */}
            <div className="sidebar-cta">
              <FadeUp delay={150}>
                <div className="rounded-2xl overflow-hidden" style={{ border:"1.5px solid var(--border)" }}>
                  <div className="px-6 py-5" style={{ background:"var(--bg3)" }}>
                    <div className="section-label mb-2">2026 Season</div>
                    <h3 className="text-xl font-black page-title leading-tight">Don't Miss a<br />Single Match</h3>
                    <p className="text-xs mt-2 leading-relaxed muted">Live scores, news alerts, and fixture reminders — all in one place.</p>
                  </div>
                  <div className="px-6 pb-6 pt-4 flex flex-col gap-3" style={{ background:"var(--surface)" }}>
                    <button className="cta-btn w-full py-3 rounded-xl font-black text-sm text-white" style={{ background:G }}>Get Started Free</button>
                    <Link href="/news">
                      <button className="w-full py-3 rounded-xl font-bold text-sm"
                        style={{ background:"var(--surface2)",color:"var(--text2)",border:"1.5px solid var(--border)",transition:"border-color .2s" }}
                        onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor=G}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor="var(--border)"}}>
                        Browse News
                      </button>
                    </Link>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Active Leagues */}
            <FadeUp delay={200}>
              <div className="section-label mb-1">Competitions</div>
              <h2 className="text-xl font-black page-title mb-3">Active Leagues</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {LEAGUES.map((l,i) => (
                  <Link href="/leagues" key={l.abbr}>
                    <div className="league-row rounded-2xl px-4 py-3.5 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black flex-shrink-0"
                          style={{ background:i===0?G:"var(--surface2)", color:i===0?"#fff":"var(--text2)", border:"1.5px solid var(--border)" }}>
                          {l.abbr.slice(0,2)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold card-text leading-tight truncate-text">{l.name}</div>
                          <div className="text-[10px] muted mt-0.5">{l.country} · {l.teams} teams</div>
                        </div>
                      </div>
                      <span className="text-xs muted ml-3 flex-shrink-0">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </FadeUp>

            {/* Quick Links */}
            <FadeUp delay={250}>
              <div className="section-label mb-3">Explore</div>
              <div className="quicklinks-grid">
                {[
                  { label:"Transfers", href:"/transfers", icon:"/images/transfer.svg"        },
                  { label:"Teams",     href:"/teams",     icon:"/images/football-badge.svg"  },
                  { label:"Players",   href:"/players",   icon:"/images/football-player.svg" },
                  { label:"News",      href:"/news",      icon:"/images/news.svg"            },
                ].map(item => (
                  <Link href={item.href} key={item.label}>
                    <div className="quick-link rounded-2xl px-2 py-4 flex flex-col gap-2 cursor-pointer text-center items-center">
                      <img src={item.icon} alt={item.label} width={28} height={28} />
                      <span className="ql-label text-xs font-black card-text">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>

        {/* ── NEWS ── */}
        <section>
          <FadeUp className="flex items-center justify-between mb-6">
            <div>
              <div className="section-label mb-1">Coverage</div>
              <h2 className="text-2xl font-black page-title">Latest News</h2>
            </div>
            <Link href="/news">
              <button className="text-xs font-bold px-4 py-2 rounded-xl"
                style={{ background:`${G}22`,color:G,border:`1.5px solid ${G}44`,transition:"background .2s,color .2s" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=G;(e.currentTarget as HTMLButtonElement).style.color="#fff"}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background=`${G}22`;(e.currentTarget as HTMLButtonElement).style.color=G}}>
                All News →
              </button>
            </Link>
          </FadeUp>

          <StaggerList className="news-grid">
            {NEWS.map((n,i) => (
              <div key={n.title} className="news-card rounded-2xl overflow-hidden cursor-pointer flex flex-col">
                <div className="overflow-hidden" style={{ height: i===0 ? 220 : 180 }}>
                  <img src={n.img} alt={n.title} className="w-full h-full object-cover" />
                </div>
                {i===0 && <div style={{ height:3, background:G }} />}
                <div className="px-5 py-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black px-3 py-1 rounded-lg" style={{ background:`${G}22`,color:G }}>{n.tag}</span>
                    <span className="text-[10px] muted">{n.readTime}</span>
                  </div>
                  <h3 className="font-black leading-snug card-text" style={{ fontSize: i===0?15:13 }}>{n.title}</h3>
                  <p className="text-xs leading-relaxed line-clamp-2 muted">{n.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop:"1px solid var(--border)" }}>
                    <span className="text-[10px] muted">{n.date}</span>
                    <span className="text-[10px] font-bold" style={{ color:G }}>Read →</span>
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