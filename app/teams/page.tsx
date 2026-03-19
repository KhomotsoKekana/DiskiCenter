"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const G  = "#8eb69b";
const GD = "#6a9a7f";

const PSL_TEAMS = [
  { id: "kaizer-chiefs",      name: "Kaizer Chiefs",       abbr: "KC",  city: "Johannesburg", founded: 1970, stadium: "FNB Stadium",       capacity: "94,736", trophies: 54, league: "PSL", color: "#FFD700" },
  { id: "orlando-pirates",    name: "Orlando Pirates",      abbr: "OP",  city: "Soweto",       founded: 1937, stadium: "Orlando Stadium",    capacity: "40,000", trophies: 36, league: "PSL", color: "#000000" },
  { id: "mamelodi-sundowns",  name: "Mamelodi Sundowns",    abbr: "MS",  city: "Pretoria",     founded: 1970, stadium: "Loftus Versfeld",    capacity: "51,762", trophies: 42, league: "PSL", color: "#FFD700" },
  { id: "stellenbosch-fc",    name: "Stellenbosch FC",      abbr: "SF",  city: "Stellenbosch", founded: 1994, stadium: "Danie Craven",       capacity: "10,000", trophies: 2,  league: "PSL", color: "#0033A0" },
  { id: "cape-town-city",     name: "Cape Town City FC",    abbr: "CT",  city: "Cape Town",    founded: 2016, stadium: "DHL Newlands",       capacity: "51,900", trophies: 3,  league: "PSL", color: "#00AEEF" },
  { id: "sekhukhune-united",  name: "Sekhukhune United",    abbr: "SK",  city: "Polokwane",    founded: 2018, stadium: "Peter Mokaba",       capacity: "46,000", trophies: 1,  league: "PSL", color: "#8B0000" },
  { id: "golden-arrows",      name: "Golden Arrows FC",     abbr: "GA",  city: "Durban",       founded: 1943, stadium: "Sugar Ray Xulu",     capacity: "10,000", trophies: 5,  league: "PSL", color: "#FFD700" },
  { id: "richards-bay",       name: "Richards Bay FC",      abbr: "RB",  city: "Richards Bay", founded: 1999, stadium: "Umhlathuze Sports",  capacity: "10,000", trophies: 1,  league: "PSL", color: "#0000FF" },
  { id: "chippa-united",      name: "Chippa United FC",     abbr: "CU",  city: "Gqeberha",     founded: 2010, stadium: "Nelson Mandela Bay", capacity: "46,000", trophies: 1,  league: "PSL", color: "#FF6600" },
  { id: "ts-galaxy",          name: "TS Galaxy FC",         abbr: "TS",  city: "Mbombela",     founded: 2018, stadium: "Mbombela Stadium",   capacity: "46,000", trophies: 2,  league: "PSL", color: "#FF0000" },
  { id: "magesi-fc",          name: "Magesi FC",            abbr: "MG",  city: "Limpopo",      founded: 2016, stadium: "Peter Mokaba",       capacity: "46,000", trophies: 1,  league: "PSL", color: "#006400" },
  { id: "marumo-gallants",    name: "Marumo Gallants FC",   abbr: "MRG", city: "Polokwane",    founded: 2002, stadium: "Peter Mokaba",       capacity: "46,000", trophies: 2,  league: "PSL", color: "#FF8C00" },
  { id: "polokwane-city",     name: "Polokwane City FC",    abbr: "PC",  city: "Polokwane",    founded: 2010, stadium: "Peter Mokaba",       capacity: "46,000", trophies: 1,  league: "PSL", color: "#00FF00" },
  { id: "orbit-college",      name: "Orbit College FC",     abbr: "OC",  city: "Johannesburg", founded: 2023, stadium: "Dobsonville Stadium", capacity: "10,000", trophies: 0, league: "PSL", color: "#800080" },
  { id: "siwelele",           name: "Siwelele FC",          abbr: "SW",  city: "Pretoria",     founded: 1994, stadium: "Lucas Moripe",       capacity: "42,000", trophies: 8,  league: "PSL", color: "#0000CD" },
  { id: "durban-city",        name: "Durban City FC",       abbr: "DC",  city: "Durban",       founded: 2022, stadium: "Moses Mabhida",      capacity: "56,000", trophies: 0,  league: "PSL", color: "#4B0082" },
];

const NFD_TEAMS = [
  { id: "university-pretoria", name: "University of Pretoria FC", abbr: "UP",  city: "Pretoria",      founded: 1931, stadium: "Tuks Stadium",       capacity: "10,000", trophies: 2, league: "GladAfrica", color: "#003580" },
  { id: "black-leopards",      name: "Black Leopards FC",         abbr: "BL",  city: "Thohoyandou",   founded: 1969, stadium: "Thohoyandou Stadium", capacity: "20,000", trophies: 3, league: "GladAfrica", color: "#006400" },
  { id: "pretoria-callies",    name: "Pretoria Callies FC",       abbr: "PCA", city: "Pretoria",      founded: 1933, stadium: "Caledonian Ground",   capacity: "8,000",  trophies: 4, league: "GladAfrica", color: "#FF0000" },
  { id: "baroka-fc",           name: "Baroka FC",                 abbr: "BAR", city: "Polokwane",     founded: 2009, stadium: "Peter Mokaba",        capacity: "46,000", trophies: 2, league: "GladAfrica", color: "#008000" },
  { id: "hungry-lions",        name: "Hungry Lions FC",           abbr: "HL",  city: "Bloemfontein",  founded: 2007, stadium: "Goble Park",          capacity: "10,000", trophies: 1, league: "GladAfrica", color: "#FF8C00" },
  { id: "jdr-stars",           name: "JDR Stars FC",              abbr: "JDR", city: "Pretoria",      founded: 2014, stadium: "Dobsonville Stadium", capacity: "10,000", trophies: 0, league: "GladAfrica", color: "#FFD700" },
  { id: "cape-umoya",          name: "Cape Umoya United FC",      abbr: "CUU", city: "Cape Town",     founded: 2017, stadium: "Athlone Stadium",     capacity: "14,000", trophies: 0, league: "GladAfrica", color: "#00CED1" },
  { id: "tshakhuma",           name: "Tshakhuma FC",              abbr: "TSH", city: "Thohoyandou",   founded: 2016, stadium: "Thohoyandou Stadium", capacity: "20,000", trophies: 0, league: "GladAfrica", color: "#800000" },
  { id: "platinum-city",       name: "Platinum City Rovers FC",   abbr: "PCR", city: "Rustenburg",    founded: 2018, stadium: "Olympia Park",        capacity: "10,000", trophies: 0, league: "GladAfrica", color: "#C0C0C0" },
  { id: "african-warriors",    name: "African Warriors FC",       abbr: "AW",  city: "Durban",        founded: 2015, stadium: "Chatsworth Stadium",  capacity: "15,000", trophies: 0, league: "GladAfrica", color: "#8B4513" },
  { id: "milford-fc",          name: "Milford FC",                abbr: "MIF", city: "Cape Town",     founded: 2019, stadium: "Athlone Stadium",     capacity: "14,000", trophies: 0, league: "GladAfrica", color: "#DC143C" },
  { id: "tornado-fc",          name: "Tornado FC",                abbr: "TOR", city: "Johannesburg",  founded: 2010, stadium: "Dobsonville Stadium", capacity: "10,000", trophies: 0, league: "GladAfrica", color: "#4169E1" },
  { id: "upington-city",       name: "Upington City FC",          abbr: "UC",  city: "Upington",      founded: 2018, stadium: "Upington Stadium",    capacity: "5,000",  trophies: 0, league: "GladAfrica", color: "#FF4500" },
  { id: "casric-fc",           name: "CASRIC FC",                 abbr: "CAS", city: "Cape Town",     founded: 2012, stadium: "Athlone Stadium",     capacity: "14,000", trophies: 0, league: "GladAfrica", color: "#20B2AA" },
  { id: "venda-football",      name: "Venda Football Academy",    abbr: "VFA", city: "Thohoyandou",   founded: 2016, stadium: "Thohoyandou Stadium", capacity: "20,000", trophies: 0, league: "GladAfrica", color: "#9400D3" },
  { id: "milano-united",       name: "Milano United FC",          abbr: "MU",  city: "Johannesburg",  founded: 2017, stadium: "Dobsonville Stadium", capacity: "10,000", trophies: 0, league: "GladAfrica", color: "#B22222" },
  { id: "cape-town-spurs",     name: "Cape Town Spurs",           abbr: "CTS", city: "Cape Town",     founded: 1999, stadium: "Athlone Stadium",    capacity: "46,000", trophies: 2,  league: "PSL", color: "#003399" },
];

const ALL_TEAMS = [...PSL_TEAMS, ...NFD_TEAMS];

const LEAGUE_FILTERS = ["All", "PSL", "GladAfrica"];
const SORT_OPTIONS   = ["Name", "Founded", "Titles", "City"];

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.05, ...options });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(24px)", transition:`opacity 0.55s ease ${delay}ms,transform 0.55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

type Team = typeof ALL_TEAMS[0];

function TeamCard({ team, delay = 0, view }: { team: Team; delay?: number; view: "grid" | "list" }) {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);

  if (view === "list") {
    return (
      <div ref={ref}
        style={{ opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(16px)", transition:`opacity 0.45s ease ${delay}ms,transform 0.45s ease ${delay}ms` }}>
        <Link href={`/teams/${team.name.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"")}`}>
          <div className="team-list-row"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ borderLeftColor: hovered ? team.color : "transparent" }}>
            {/* Crest */}
            <div className="flex-shrink-0 flex items-center justify-center font-black text-sm rounded-xl"
              style={{ width:44, height:44, background:`${team.color}22`, border:`1.5px solid ${team.color}44`, color:team.color }}>
              {team.abbr}
            </div>
            {/* Name + city */}
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm card-text truncate">{team.name}</div>
              <div className="text-[11px] muted mt-0.5">{team.city} · Est. {team.founded}</div>
            </div>
            {/* League badge */}
            <span className="text-[10px] font-black px-2.5 py-1 rounded-lg flex-shrink-0"
              style={{ background: team.league==="PSL"?`${G}22`:"var(--surface2)", color: team.league==="PSL"?G:"var(--text2)" }}>
              {team.league}
            </span>
            {/* Stadium */}
            <div className="text-[11px] muted flex-shrink-0 hidden sm:block" style={{ minWidth:160 }}>
              🏟 {team.stadium}
            </div>
            {/* Titles */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {team.titles > 0
                ? <span className="text-xs font-black px-2.5 py-1 rounded-lg" style={{ background:`${G}22`, color:G }}>🏆 {team.titles}</span>
                : <span className="text-[10px] muted px-2.5 py-1 rounded-lg" style={{ background:"var(--surface2)" }}>—</span>}
            </div>
            {/* Arrow */}
            <span className="text-xs muted flex-shrink-0 hidden sm:block">→</span>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div ref={ref}
      style={{ opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(20px)", transition:`opacity 0.5s ease ${delay}ms,transform 0.5s ease ${delay}ms` }}>
      <Link href={`/teams/${team.name.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"")}`}>
        <div className="team-card"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>
          {/* Top accent bar using team colour */}
          <div style={{ height:3, background: hovered ? team.color : "var(--border)", transition:"background .3s", flexShrink:0 }} />

          <div className="flex flex-col gap-3 p-4 flex-1">
            {/* Crest + league badge */}
            <div className="flex items-start justify-between">
              <div className="flex items-center justify-center font-black text-lg rounded-2xl"
                style={{ width:52, height:52, background:`${team.color}18`, border:`2px solid ${team.color}33`, color:team.color, transition:"transform .3s,box-shadow .3s", transform: hovered?"scale(1.08)":"scale(1)", boxShadow: hovered?`0 4px 16px ${team.color}44`:"none" }}>
                {team.abbr}
              </div>
              <span className="text-[9px] font-black px-2.5 py-1 rounded-lg"
                style={{ background: team.league==="PSL"?`${G}22`:"var(--surface2)", color: team.league==="PSL"?G:"var(--text2)" }}>
                {team.league}
              </span>
            </div>

            {/* Name */}
            <div>
              <h3 className="font-black card-text leading-tight" style={{ fontSize:13 }}>{team.name}</h3>
              <p className="text-[11px] muted mt-0.5">{team.city}</p>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-2 mt-auto pt-2" style={{ borderTop:"1px solid var(--border)" }}>
              <div className="flex flex-col flex-1">
                <span className="text-[9px] uppercase tracking-widest font-bold muted">Founded</span>
                <span className="text-xs font-black card-text">{team.founded}</span>
              </div>
              <div className="w-px self-stretch" style={{ background:"var(--border)" }} />
              <div className="flex flex-col flex-1 items-center">
                <span className="text-[9px] uppercase tracking-widest font-bold muted">Titles</span>
                <span className="text-xs font-black" style={{ color: team.titles>0?G:"var(--text3)" }}>
                  {team.titles > 0 ? `🏆 ${team.titles}` : "—"}
                </span>
              </div>
              <div className="w-px self-stretch" style={{ background:"var(--border)" }} />
              <div className="flex flex-col flex-1 items-end">
                <span className="text-[9px] uppercase tracking-widest font-bold muted">Cap.</span>
                <span className="text-xs font-black card-text">{team.capacity}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function TeamsPage() {
  const [league, setLeague]   = useState("All");
  const [search, setSearch]   = useState("");
  const [sort, setSort]       = useState("Name");
  const [view, setView]       = useState<"grid"|"list">("grid");
  const [ready, setReady]     = useState(false);

  useEffect(() => { setTimeout(() => setReady(true), 60); }, []);

  const heroT = (d: number) => ({
    opacity: ready?1:0, transform: ready?"translateY(0)":"translateY(28px)",
    transition:`opacity 0.65s ease ${d}ms,transform 0.65s ease ${d}ms`,
  });

  const filtered = ALL_TEAMS
    .filter(t => (league==="All" || t.league===league) && (!search || t.name.toLowerCase().includes(search.toLowerCase()) || t.city.toLowerCase().includes(search.toLowerCase())))
    .sort((a,b) => {
      if (sort==="Founded") return a.founded - b.founded;
      if (sort==="Titles")  return b.titles  - a.titles;
      if (sort==="City")    return a.city.localeCompare(b.city);
      return a.name.localeCompare(b.name);
    });

  const pslCount  = ALL_TEAMS.filter(t=>t.league==="PSL").length;
  const nfdCount  = ALL_TEAMS.filter(t=>t.league==="GladAfrica").length;
  const totalTitles = PSL_TEAMS.reduce((s,t)=>s+t.titles,0);

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

        .section-label { display:flex;align-items:center;gap:8px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.18em;color:${G}; }
        .section-label::before { content:'';display:block;width:20px;height:3px;background:${G};border-radius:99px; }

        /* ── TEAM CARD (grid) ── */
        .team-card {
          display:flex; flex-direction:column;
          background:var(--surface); border:1.5px solid var(--border);
          border-radius:20px; overflow:hidden; cursor:pointer; height:100%;
          transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease;
        }
        .team-card:hover {
          transform:translateY(-4px);
          box-shadow:0 16px 40px rgba(0,0,0,.12);
          border-color:var(--border);
        }

        /* ── TEAM LIST ROW ── */
        .team-list-row {
          display:flex; align-items:center; gap:14px;
          padding:14px 16px;
          background:var(--surface); border:1.5px solid var(--border);
          border-left-width:3px;
          border-radius:16px; cursor:pointer;
          transition:transform .2s,box-shadow .2s,border-color .2s,background .2s,border-left-color .2s;
        }
        .team-list-row:hover {
          transform:translateX(4px);
          box-shadow:0 4px 20px rgba(0,0,0,.08);
          background:var(--surface2);
        }

        /* ── CONTROLS ── */
        .cat-pill { transition:background .18s,color .18s,border-color .18s; cursor:pointer; }
        .search-box:focus-within { border-color:${G} !important; box-shadow:0 0 0 3px ${G}22; }
        .sort-btn { transition:background .18s,color .18s; cursor:pointer; }
        .view-btn { transition:background .18s,color .18s; cursor:pointer; }

        /* ── TEAM GRID ── */
        .teams-grid {
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:14px;
        }
        @media (max-width:1100px) { .teams-grid { grid-template-columns:repeat(3,1fr); } }
        @media (max-width:740px)  { .teams-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:420px)  { .teams-grid { grid-template-columns:1fr; } }

        /* ── HERO ── */
        .hero-stats-row { display:flex; gap:12px; flex-wrap:wrap; }
        .hero-bottom { display:flex; align-items:flex-end; justify-content:space-between; gap:24px; flex-wrap:wrap; }
        @media (max-width:600px) {
          .hero-bottom { flex-direction:column; align-items:flex-start; gap:16px; }
          .hero-stats-row { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; width:100%; }
        }

        /* ── CONTROLS BAR ── */
        .controls-bar {
          display:flex; align-items:center; gap:12px;
          flex-wrap:wrap; justify-content:space-between;
        }
        .controls-left  { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .controls-right { display:flex; align-items:center; gap:8px; }

        /* ── LEAGUE SECTION DIVIDER ── */
        .league-divider {
          display:flex; align-items:center; gap:12px;
          padding:10px 0;
        }
        .league-divider-line { flex:1; height:1px; background:var(--border); }
      `}</style>

      <main style={{ background:"var(--bg)", display:"flex", flexDirection:"column", gap:28 }}>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden flex items-end"
          style={{ minHeight:"clamp(280px,45vw,420px)", borderRadius:24 }}>
          <div className="absolute inset-0">
            <img src="/images/stadium.jpg" alt="Stadium" className="w-full h-full object-cover"
              style={{ transition:"transform 8s ease", transform: ready?"scale(1.04)":"scale(1)" }} />
            <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.90) 0%,rgba(0,0,0,0.45) 50%,rgba(0,0,0,0.05) 100%)" }} />
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background:G }} />
          </div>

          <div className="relative z-10 w-full" style={{ padding:"clamp(20px,4vw,48px)" }}>
            <div style={heroT(60)} className="mb-4">
              <div className="section-label" style={{ color:G }}>2025/26 Season</div>
            </div>
            <div className="hero-bottom">
              <div>
                <h1 className="font-black leading-none text-white" style={{ fontSize:"clamp(36px,7vw,72px)", ...heroT(140) }}>
                  Mzansi <span style={{ color:G }}>Clubs</span>
                </h1>
                <p className="mt-3 text-sm leading-relaxed max-w-md" style={{ ...heroT(240), color:"rgba(255,255,255,0.55)" }}>
                  Every club from the Premier Soccer League and GladAfrica Championship — stats, stadiums, and history.
                </p>
              </div>
              <div className="hero-stats-row" style={heroT(320)}>
                {[
                  { val: pslCount,    lbl:"PSL Teams"    },
                  { val: nfdCount,    lbl:"NFD Teams"    },
                  { val: totalTitles, lbl:"Total Titles" },
                ].map(s => (
                  <div key={s.lbl} className="rounded-2xl text-center"
                    style={{ padding:"clamp(10px,2vw,14px) clamp(16px,3vw,24px)", background:"rgba(255,255,255,0.08)", border:"1.5px solid rgba(255,255,255,0.15)", backdropFilter:"blur(12px)" }}>
                    <div className="font-black" style={{ fontSize:"clamp(18px,3vw,26px)", color:G }}>{s.val}</div>
                    <div className="uppercase tracking-widest mt-1 font-bold" style={{ fontSize:9, color:"rgba(255,255,255,0.45)" }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTROLS BAR ── */}
        <FadeUp>
          <div className="rounded-2xl px-4 py-3" style={{ background:"var(--surface)", border:"1.5px solid var(--border)" }}>
            <div className="controls-bar">
              <div className="controls-left">
                {/* League filter */}
                {LEAGUE_FILTERS.map(f => (
                  <button key={f} onClick={()=>setLeague(f)}
                    className="cat-pill text-[11px] font-black rounded-xl px-4 py-2 border"
                    style={{ background: league===f?G:"var(--surface2)", color: league===f?"#fff":"var(--text2)", borderColor: league===f?GD:"var(--border)" }}>
                    {f}
                  </button>
                ))}

                {/* Divider */}
                <div className="w-px h-5 hidden sm:block" style={{ background:"var(--border)" }} />

                {/* Sort */}
                <div className="flex items-center gap-1 hidden sm:flex">
                  <span className="text-[10px] font-bold muted">Sort:</span>
                  {SORT_OPTIONS.map(s => (
                    <button key={s} onClick={()=>setSort(s)}
                      className="sort-btn text-[10px] font-black px-3 py-1.5 rounded-lg border"
                      style={{ background: sort===s?`${G}22`:"transparent", color: sort===s?G:"var(--text3)", borderColor: sort===s?`${G}44`:"transparent" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="controls-right">
                {/* Search */}
                <div className="search-box flex items-center gap-2 rounded-xl px-3 py-2"
                  style={{ background:"var(--surface2)", border:"1.5px solid var(--border)", transition:"border-color .2s,box-shadow .2s" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <input type="text" placeholder="Search teams…" value={search} onChange={e=>setSearch(e.target.value)}
                    className="text-xs outline-none bg-transparent w-full" style={{ color:"var(--text)", caretColor:G, minWidth:120 }} />
                  {search && <button onClick={()=>setSearch("")} className="muted text-xs cursor-pointer leading-none">✕</button>}
                </div>

                {/* View toggle */}
                <div className="flex rounded-xl overflow-hidden p-0.5" style={{ background:"var(--surface2)" }}>
                  {(["grid","list"] as const).map(v => (
                    <button key={v} onClick={()=>setView(v)}
                      className="view-btn px-3 py-2 rounded-lg"
                      style={{ background: view===v?G:"transparent", color: view===v?"#fff":"var(--text2)" }}>
                      {v === "grid"
                        ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z"/></svg>
                        : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v2H3zm0 6h18v2H3zm0 6h18v2H3z"/></svg>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile sort row */}
            <div className="flex items-center gap-1 mt-2 sm:hidden flex-wrap">
              <span className="text-[10px] font-bold muted">Sort:</span>
              {SORT_OPTIONS.map(s => (
                <button key={s} onClick={()=>setSort(s)}
                  className="sort-btn text-[10px] font-black px-3 py-1.5 rounded-lg border"
                  style={{ background: sort===s?`${G}22`:"transparent", color: sort===s?G:"var(--text3)", borderColor: sort===s?`${G}44`:"transparent" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          {(search || league !== "All") && (
            <p className="mt-2 text-xs muted px-1">
              {filtered.length} team{filtered.length!==1?"s":""}
              {league!=="All" && <span> in <strong style={{ color:G }}>{league}</strong></span>}
              {search && <span> matching "<strong style={{ color:G }}>{search}</strong>"</span>}
              <button onClick={()=>{setSearch("");setLeague("All");}} className="ml-2 underline cursor-pointer" style={{ color:G }}>Clear</button>
            </p>
          )}
        </FadeUp>

        {/* ── TEAMS ── */}
        {filtered.length === 0 ? (
          <FadeUp>
            <div className="rounded-2xl py-20 text-center" style={{ background:"var(--surface)", border:"1.5px solid var(--border)" }}>
              <div className="text-4xl mb-4">⚽</div>
              <p className="text-sm card-text font-bold mb-2">No teams found</p>
              <p className="text-xs muted mb-6">Try a different search or filter</p>
              <button onClick={()=>{setSearch("");setLeague("All");}}
                className="text-xs font-black px-5 py-2.5 rounded-xl text-white cursor-pointer" style={{ background:G }}>
                Clear Filters
              </button>
            </div>
          </FadeUp>
        ) : (
          <>
            {/* If showing all, split by league with dividers */}
            {league === "All" ? (
              <>
                {/* PSL Section */}
                <FadeUp>
                  <div className="league-divider">
                    <div className="league-divider-line" />
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                      style={{ background:`${G}18`, border:`1.5px solid ${G}33` }}>
                      <span className="text-xs font-black" style={{ color:G }}>Premier Soccer League</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background:G, color:"#0a1a0e" }}>{pslCount}</span>
                    </div>
                    <div className="league-divider-line" />
                  </div>
                  {view === "grid"
                    ? <div className="teams-grid">{filtered.filter(t=>t.league==="PSL").map((t,i)=><TeamCard key={t.name} team={t} delay={i*40} view="grid" />)}</div>
                    : <div className="flex flex-col gap-2">{filtered.filter(t=>t.league==="PSL").map((t,i)=><TeamCard key={t.name} team={t} delay={i*30} view="list" />)}</div>
                  }
                </FadeUp>

                {/* GladAfrica Section */}
                <FadeUp delay={100}>
                  <div className="league-divider">
                    <div className="league-divider-line" />
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                      style={{ background:"var(--surface2)", border:"1.5px solid var(--border)" }}>
                      <span className="text-xs font-black card-text">GladAfrica Championship</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background:"var(--border)", color:"var(--text2)" }}>{nfdCount}</span>
                    </div>
                    <div className="league-divider-line" />
                  </div>
                  {view === "grid"
                    ? <div className="teams-grid">{filtered.filter(t=>t.league==="GladAfrica").map((t,i)=><TeamCard key={t.name} team={t} delay={i*40} view="grid" />)}</div>
                    : <div className="flex flex-col gap-2">{filtered.filter(t=>t.league==="GladAfrica").map((t,i)=><TeamCard key={t.name} team={t} delay={i*30} view="list" />)}</div>
                  }
                </FadeUp>
              </>
            ) : (
              <FadeUp>
                {view === "grid"
                  ? <div className="teams-grid">{filtered.map((t,i)=><TeamCard key={t.name} team={t} delay={i*40} view="grid" />)}</div>
                  : <div className="flex flex-col gap-2">{filtered.map((t,i)=><TeamCard key={t.name} team={t} delay={i*30} view="list" />)}</div>
                }
              </FadeUp>
            )}
          </>
        )}

        {/* ── BOTTOM CTA ── */}
        <FadeUp delay={80}>
          <div className="rounded-3xl overflow-hidden relative" style={{ background:"var(--surface2)", border:"1.5px solid var(--border)" }}>
            <div className="absolute inset-0" style={{ backgroundImage:`repeating-linear-gradient(45deg,transparent,transparent 19px,${G}08 19px,${G}08 20px)` }} />
            <div className="relative z-10 flex items-center justify-between gap-6 flex-wrap" style={{ padding:"clamp(20px,4vw,40px)" }}>
              <div>
                <div className="section-label mb-2">Diski Center</div>
                <h2 className="font-black card-text" style={{ fontSize:"clamp(16px,3vw,24px)" }}>Follow Your Club All Season</h2>
                <p className="text-sm muted mt-1 max-w-sm">Live fixtures, standings, transfers and match reports for every SA club.</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link href="/fixtures">
                  <button className="rounded-xl px-6 py-3 text-sm font-black text-white cursor-pointer"
                    style={{ background:G, transition:"background .18s" }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=GD}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background=G}}>
                    View Fixtures →
                  </button>
                </Link>
                <Link href="/leagues">
                  <button className="rounded-xl px-6 py-3 text-sm font-black cursor-pointer"
                    style={{ background:"var(--surface)", color:"var(--text2)", border:"1.5px solid var(--border)", transition:"border-color .18s" }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor=G}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor="var(--border)"}}>
                    Leagues
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>

        <div className="h-8" />
      </main>
    </>
  );
}