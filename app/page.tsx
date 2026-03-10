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

// ── Colours ──────────────────────────────
const GREEN  = "#8eb69b";
const GREY   = "#454545";
const GREY_L = "#f3f4f6";
// ──────────────────────────────────────────────

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.12, ...options });
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

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0px)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function StaggerList({ children, className = "" }: { children: React.ReactNode[]; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div key={i} style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0px)" : "translateY(20px)",
          transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
        }}>
          {child}
        </div>
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
    transform: heroReady ? "translateY(0px)" : "translateY(32px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <>
      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        .pulse-dot { animation: pulse-dot 1.6s ease-in-out infinite; }

        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-inner { animation: ticker 22s linear infinite; }
        .ticker-inner:hover { animation-play-state: paused; }

        .match-row { transition: background 0.2s, transform 0.2s, box-shadow 0.2s; }
        .match-row:hover { background: ${GREY_L}; transform: translateX(4px); box-shadow: -4px 0 0 0 ${GREEN}; }

        .league-row { transition: background 0.2s, transform 0.2s; }
        .league-row:hover { background: ${GREY_L}; transform: translateX(3px); }

        .news-card-inner { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .news-card-inner:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }

        .quick-link { transition: background 0.2s, color 0.2s, transform 0.2s; }
        .quick-link:hover { background: ${GREY}; color: #fff; transform: scale(1.04); }
        .quick-link:hover img { filter: invert(1); }

        .score-badge { transition: transform 0.15s; }
        .score-badge:hover { transform: scale(1.15); }

        .tab-btn { transition: background 0.2s, color 0.2s; }

        .cta-card-btn { transition: filter 0.2s, transform 0.2s; }
        .cta-card-btn:hover { filter: brightness(1.06); transform: translateY(-1px); }

        .scorer-row { transition: background 0.2s, transform 0.2s; }
        .scorer-row:hover { background: ${GREY_L}; transform: translateX(3px); }
      `}</style>

      <main>

        {/* ── HERO section ── */}
        <section className="relative rounded-4xl overflow-hidden border border-black min-h-[480px] flex items-end">
          <div className="absolute inset-0">
            <img
              src="/images/stadium.jpg"
              alt="Stadium"
              className="w-full h-full object-cover"
              style={{ transition: "transform 8s ease", transform: heroReady ? "scale(1.04)" : "scale(1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          </div>

          <div className="relative z-10 p-10 w-full flex flex-col gap-6 max-sm:p-5">
            <div className="flex items-center gap-3" style={heroT(100)}>
              <span className="cta-badge text-xs font-bold tracking-wide uppercase">
                🇿🇦 South Africa's #1 Football Hub
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-white text-xs">
                <span className="pulse-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: GREEN }} />
                Live Now
              </span>
            </div>

            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div className="flex flex-col gap-4">
                <h1 className="text-white text-5xl font-bold leading-[1.05] max-sm:text-3xl" style={heroT(200)}>
                  Live The<br />
                  <span style={{ color: GREEN }}>Beautiful</span> Game
                </h1>
                <p className="text-white/60 text-sm max-w-sm leading-relaxed" style={heroT(320)}>
                  Fixtures, standings, transfers, and live scores — everything South African football, in one place.
                </p>
                <div className="flex gap-3 flex-wrap" style={heroT(420)}>
                  <Link href="/fixtures">
                    <button className="btn-primary text-sm font-semibold"
                      style={{ transition: "transform 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ""; }}>
                      View Fixtures →
                    </button>
                  </Link>
                  <Link href="/teams">
                    <button className="btn-signin bg-white/10 backdrop-blur-sm border-white/30 text-white text-sm"
                      style={{ transition: "background 0.2s, transform 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ""; (e.currentTarget as HTMLButtonElement).style.background = ""; }}>
                      Explore Teams
                    </button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-2" style={heroT(500)}>
                {STATS.map((s) => (
                  <div key={s.label}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-center min-w-[80px]"
                    style={{ transition: "background 0.2s, transform 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = ""; (e.currentTarget as HTMLDivElement).style.transform = ""; }}
                  >
                    <div className="text-xl font-bold" style={{ color: GREEN }}>{s.value}</div>
                    <div className="text-white/50 text-[10px] uppercase tracking-wider mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TICKER ── */}
        <FadeUp delay={100}>
          <div className="rounded-4xl border overflow-hidden py-3 select-none" style={{ background: GREY, borderColor: GREY }}>
            <div className="ticker-inner flex gap-0 whitespace-nowrap w-max">
              {[...Array(2)].map((_, i) => (
                <span key={i} className="flex items-center gap-6 px-6 text-xs font-semibold tracking-wide uppercase text-white/80">
                  {MATCHES.map((m, j) => (
                    <span key={j} className="flex items-center gap-3">
                      <span className="text-white/40">{m.date}</span>
                      <span>
                        {m.home} <span style={{ color: GREEN }}>{m.homeScore}</span>
                        {" – "}
                        <span style={{ color: GREEN }}>{m.awayScore}</span> {m.away}
                      </span>
                      <span className="text-white/20">|</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ── FIXTURES + SIDEBAR  section ── */}
        <section className="flex gap-4 justify-between items-start w-full max-lg:flex-col">

          <div className="flex-1 flex flex-col gap-4">

            <FadeUp>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-xl font-bold">Fixtures & Results</h2>
                <div className="flex rounded-full overflow-hidden text-sm font-medium border" style={{ borderColor: GREY }}>
                  {(["upcoming", "results"] as const).map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className="tab-btn px-4 py-1.5 capitalize cursor-pointer"
                      style={{
                        background: activeTab === tab ? GREY : "#fff",
                        color: activeTab === tab ? "#fff" : GREY,
                      }}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </FadeUp>

            <StaggerList className="flex flex-col gap-3">
              {filtered.length === 0
                ? [<p key="empty" className="text-muted-foreground text-sm text-center py-8">No {activeTab} matches.</p>]
                : filtered.map((m, i) => (
                  <div key={i} className="match-row rounded-4xl border px-6 py-4 flex items-center gap-4 cursor-pointer" style={{ borderColor: "#d1d5db" }}>
                    <div className="flex flex-col items-center min-w-[52px] text-center gap-1">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">{m.date}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={m.status === "upcoming"
                          ? { background: GREEN, color: "#fff" }
                          : { background: GREY_L, color: GREY }}>
                        {m.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-1 justify-center">
                      <div className="flex items-center gap-2.5 flex-1 justify-end">
                        <span className="text-sm font-bold text-right max-sm:hidden">{m.home}</span>
                        <span className="text-sm font-bold sm:hidden">{m.homeAbbr}</span>
                        <div className="w-8 h-8 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                          style={{ background: GREY }}>{m.homeAbbr[0]}</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {m.status === "finished" ? (
                          <>
                            <span className="score-badge text-white rounded-xl px-3 py-1.5 text-sm font-bold min-w-[32px] text-center inline-block" style={{ background: GREY }}>{m.homeScore}</span>
                            <span className="text-muted-foreground text-xs font-medium">–</span>
                            <span className="score-badge text-white rounded-xl px-3 py-1.5 text-sm font-bold min-w-[32px] text-center inline-block" style={{ background: GREY }}>{m.awayScore}</span>
                          </>
                        ) : (
                          <span className="text-xs rounded-xl px-3 py-1.5 font-semibold border" style={{ color: GREY, borderColor: GREY }}>VS</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2.5 flex-1">
                        <div className="w-8 h-8 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                          style={{ background: GREY }}>{m.awayAbbr[0]}</div>
                        <span className="text-sm font-bold max-sm:hidden">{m.away}</span>
                        <span className="text-sm font-bold sm:hidden">{m.awayAbbr}</span>
                      </div>
                    </div>
                    <span className="subject-badge text-[10px] flex-shrink-0" style={{ background: GREEN, color: "#fff" }}>{m.league}</span>
                  </div>
                ))
              }
            </StaggerList>

            <FadeUp delay={100}>
              <Link href="/fixtures">
                <button className="btn-signin text-xs w-full justify-center"
                  style={{ borderColor: GREY, color: GREY, transition: "transform 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ""; }}>
                  See All Fixtures →
                </button>
              </Link>
            </FadeUp>

            {/* Top Scorers */}
            <FadeUp delay={80} className="flex flex-col gap-4 mt-2">
              <h2 className="text-xl font-bold">Top Scorers</h2>
              <div className="rounded-4xl overflow-hidden border" style={{ borderColor: "#d1d5db" }}>
                <div className="grid grid-cols-12 px-6 py-3 text-white text-[10px] uppercase tracking-widest font-bold"
                  style={{ background: GREY }}>
                  <span className="col-span-1">#</span>
                  <span className="col-span-5">Player</span>
                  <span className="col-span-3">Club</span>
                  <span className="col-span-2 text-center">Goals</span>
                  <span className="col-span-1 text-center">Pen</span>
                </div>
                <StaggerList className="flex flex-col">
                  {TOP_SCORERS.map((p, i) => (
                    <div key={p.name}
                      className={`scorer-row grid grid-cols-12 px-6 py-4 items-center text-sm cursor-pointer ${i !== TOP_SCORERS.length - 1 ? "border-b" : ""}`}
                      style={{ borderColor: "#e5e7eb" }}
                    >
                      <span className="col-span-1 font-bold text-xs" style={{ color: GREY }}>{i + 1}</span>
                      <div className="col-span-5 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                          style={{ background: GREY }}>
                          {p.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-semibold text-xs leading-tight">{p.name}</span>
                      </div>
                      <span className="col-span-3 text-[11px] text-muted-foreground">{p.club}</span>
                      <div className="col-span-2 flex justify-center">
                        <span className="text-xs font-bold rounded-lg px-2.5 py-1 text-white" style={{ background: GREEN }}>{p.goals}</span>
                      </div>
                      <span className="col-span-1 text-center text-xs text-muted-foreground font-medium">{p.penaltyGoals}</span>
                    </div>
                  ))}
                </StaggerList>
              </div>
            </FadeUp>
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-4 w-[340px] max-lg:w-full">

            {/* Stats counters */}
            <FadeUp delay={150}>
              <div className="grid grid-cols-2 gap-2">
                {STATS.map((s) => {
                  const num = parseInt(s.value.replace(/[^0-9]/g, ""));
                  const suffix = s.value.replace(/[0-9]/g, "").replace(",", "");
                  return (
                    <div key={s.label} className="rounded-4xl border px-4 py-4 text-center"
                      style={{ borderColor: "#d1d5db", transition: "background 0.2s, transform 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = GREY_L; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = ""; (e.currentTarget as HTMLDivElement).style.transform = ""; }}>
                      <div className="text-2xl font-bold" style={{ color: GREY }}>
                        <Counter target={num} />{suffix}
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </FadeUp>

            {/* CTA card */}
            <FadeUp delay={200}>
              <div className="rounded-4xl border px-7 py-8 flex flex-col gap-4 items-center text-center text-white"
                style={{ background: GREY, borderColor: GREY }}>
                <span className="cta-badge text-xs font-bold">🏆 2026 Season</span>
                <h3 className="text-xl font-bold leading-snug">Don't Miss a Single Match</h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  Live scores, news alerts, and fixture reminders — all in one place.
                </p>
                <button className="cta-card-btn font-bold rounded-xl px-6 py-3 w-full text-sm cursor-pointer text-white"
                  style={{ background: GREEN }}>
                  Get Started Free
                </button>
                <Link href="/news" className="w-full">
                  <button className="btn-signin text-xs w-full justify-center"
                    style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)", transition: "background 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = ""; }}>
                    Browse News
                  </button>
                </Link>
              </div>
            </FadeUp>

            {/* Active Leagues */}
            <FadeUp delay={250}>
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold">Active Leagues</h2>
                <StaggerList className="flex flex-col gap-2">
                  {LEAGUES.map((l) => (
                    <Link href="/leagues" key={l.abbr}>
                      <div className="league-row rounded-4xl border px-5 py-3.5 flex items-center justify-between cursor-pointer group"
                        style={{ borderColor: "#d1d5db" }}>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                            style={{ background: GREEN, transition: "transform 0.2s" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "rotate(8deg) scale(1.1)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; }}>
                            {l.abbr.slice(0, 2)}
                          </div>
                          <div>
                            <div className="text-xs font-bold leading-tight">{l.name}</div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">{l.country} · {l.teams} teams</div>
                          </div>
                        </div>
                        <span className="group-hover:translate-x-1 transition-all text-sm inline-block" style={{ color: GREY }}>→</span>
                      </div>
                    </Link>
                  ))}
                </StaggerList>
              </div>
            </FadeUp>

            {/* Quick Links */}
            <FadeUp delay={300}>
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold">Quick Links</h2>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Transfers", href: "/transfers", icon: "/images/transfer.svg" },
                    { label: "Teams", href: "/teams", icon: "/images/football-badge.svg" },
                    { label: "Players", href: "/players", icon: "/images/football-player.svg" },
                    { label: "News", href: "/news", icon: "/images/news.svg" },
                  ].map((item) => (
                    <Link href={item.href} key={item.label}>
                      <div className="quick-link rounded-4xl border px-4 py-4 flex flex-col gap-2 cursor-pointer text-center items-center"
                        style={{ borderColor: "#d1d5db" }}>
                        <img src={item.icon} alt={item.label} width={28} height={28} />
                        <span className="text-xs font-bold">{item.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── NEWS section── */}
        <FadeUp>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Latest News</h2>
            <Link href="/news">
              <button className="btn-signin text-xs"
                style={{ borderColor: GREY, color: GREY, transition: "transform 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateX(2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ""; }}>
                All News →
              </button>
            </Link>
          </div>
        </FadeUp>

        <StaggerList className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {NEWS.map((n) => (
            <div key={n.title} className="news-card-inner rounded-4xl border overflow-hidden cursor-pointer group flex flex-col"
              style={{ borderColor: "#d1d5db" }}>
              <div className="h-[180px] overflow-hidden">
                <img src={n.img} alt={n.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="px-6 py-5 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="subject-badge text-[10px]" style={{ background: GREEN, color: "#fff" }}>{n.tag}</span>
                  <span className="text-[10px] text-muted-foreground">{n.readTime}</span>
                </div>
                <h3 className="text-sm font-bold leading-snug">{n.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{n.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-[10px] text-muted-foreground">{n.date}</span>
                </div>
              </div>
            </div>
          ))}
        </StaggerList>

        <div className="h-8" />
      </main>
    </>
  );
}