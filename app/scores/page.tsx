"use client";

import { useState, useEffect, useRef } from "react";

const GREEN  = "#8eb69b";
const GREY   = "#4b5563";

// ── Types ──────────────────────────────────────────────
type MatchStatus = "live" | "ft" | "upcoming" | "ht";
interface Match {
  id: number;
  home: string; homeAbbr: string; homeScore: number | null;
  away: string; awayAbbr: string; awayScore: number | null;
  minute: number | null; status: MatchStatus;
  kickoff: string; league: string; venue: string;
  homeScorers?: string[]; awayScorers?: string[];
}

// ── Real 2025/26 PSL Teams ─────────────────────────────
// Cape Town City FC, Cape Town Spurs, Chippa United FC,
// Durban City FC, Golden Arrows FC, Kaizer Chiefs FC,
// Magesi FC, Mamelodi Sundowns FC, Marumo Gallants FC,
// Orlando Pirates FC, Polokwane City FC, Richards Bay FC,
// Royal AM FC, Sekhukhune United FC, Stellenbosch FC,
// Siwelele FC (formerly SuperSport United), TS Galaxy FC

// ── Real 2025/26 NFD (GladAfrica) Teams ───────────────
// CASRIC FC, University of Pretoria FC (AmaTuks),
// Upington City FC, Milford FC, Pretoria Callies FC,
// Hungry Lions FC, Cape Umoya United FC, Milano United FC,
// Venda Football Academy, Tornado FC, Black Leopards FC,
// Tshakhuma FC, Baroka FC, Platinum City Rovers FC,
// African Warriors FC, JDR Stars FC

const MATCHES_BY_DAY: Record<string, Match[]> = {
  "-2": [
    {
      id: 1, home: "Kaizer Chiefs", homeAbbr: "KC", homeScore: 1,
      away: "Cape Town City", awayAbbr: "CTC", awayScore: 1,
      minute: null, status: "ft", kickoff: "15:00", league: "PSL",
      venue: "FNB Stadium, Johannesburg",
      homeScorers: ["Dolly 34'"], awayScorers: ["Tetteh 78'"],
    },
    {
      id: 2, home: "Stellenbosch FC", homeAbbr: "SFC", homeScore: 0,
      away: "Orlando Pirates", awayAbbr: "OPF", awayScore: 2,
      minute: null, status: "ft", kickoff: "17:30", league: "PSL",
      venue: "Danie Craven Stadium, Stellenbosch",
      homeScorers: [], awayScorers: ["Mofokeng 22'", "Ndlovu 88'"],
    },
    {
      id: 3, home: "Richards Bay", homeAbbr: "RBF", homeScore: 1,
      away: "TS Galaxy", awayAbbr: "TSG", awayScore: 1,
      minute: null, status: "ft", kickoff: "15:00", league: "PSL",
      venue: "King Zwelithini Stadium, Durban",
      homeScorers: ["Sithole 67'"], awayScorers: ["Maswanganyi 45'"],
    },
    {
      id: 4, home: "University of Pretoria", homeAbbr: "UPT", homeScore: 2,
      away: "CASRIC FC", awayAbbr: "CAS", awayScore: 0,
      minute: null, status: "ft", kickoff: "15:00", league: "GladAfrica",
      venue: "Tuks Stadium, Pretoria",
      homeScorers: ["Mokoena 12'", "Dlamini 55'"], awayScorers: [],
    },
    {
      id: 5, home: "Hungry Lions", homeAbbr: "HLF", homeScore: 3,
      away: "Milford FC", awayAbbr: "MFC", awayScore: 1,
      minute: null, status: "ft", kickoff: "15:00", league: "GladAfrica",
      venue: "Peter Mokaba Stadium, Polokwane",
      homeScorers: ["Nkosi 5'", "Cele 40'", "Zulu 78'"], awayScorers: ["Adams 60'"],
    },
  ],
  "-1": [
    {
      id: 6, home: "Mamelodi Sundowns", homeAbbr: "MSF", homeScore: 3,
      away: "Golden Arrows", awayAbbr: "GAF", awayScore: 0,
      minute: null, status: "ft", kickoff: "15:00", league: "PSL",
      venue: "Loftus Versfeld, Pretoria",
      homeScorers: ["Rayners 5'", "Shalulile 40'", "Lakay 88'"], awayScorers: [],
    },
    {
      id: 7, home: "Sekhukhune United", homeAbbr: "SUF", homeScore: 1,
      away: "Chippa United", awayAbbr: "CUF", awayScore: 1,
      minute: null, status: "ft", kickoff: "17:30", league: "PSL",
      venue: "Peter Mokaba Stadium, Polokwane",
      homeScorers: ["Grobler 67'"], awayScorers: ["Mabaso 45'"],
    },
    {
      id: 8, home: "Royal AM", homeAbbr: "RAM", homeScore: 2,
      away: "Marumo Gallants", awayAbbr: "MGF", awayScore: 2,
      minute: null, status: "ft", kickoff: "15:00", league: "PSL",
      venue: "Sugar Ray Xulu Stadium, Durban",
      homeScorers: ["Mthethwa 30'", "Cele 70'"], awayScorers: ["Mothiba 15'", "Grobler 80'"],
    },
    {
      id: 9, home: "Siwelele FC", homeAbbr: "SWF", homeScore: 2,
      away: "Magesi FC", awayAbbr: "MAG", awayScore: 0,
      minute: null, status: "ft", kickoff: "15:00", league: "PSL",
      venue: "Lucas Moripe Stadium, Pretoria",
      homeScorers: ["Modiba 20'", "Rusike 74'"], awayScorers: [],
    },
    {
      id: 10, home: "Polokwane City", homeAbbr: "PCF", homeScore: 1,
      away: "Durban City", awayAbbr: "DCF", awayScore: 0,
      minute: null, status: "ft", kickoff: "15:00", league: "PSL",
      venue: "Peter Mokaba Stadium, Polokwane",
      homeScorers: ["Phiri 55'"], awayScorers: [],
    },
    {
      id: 11, home: "Black Leopards", homeAbbr: "BLF", homeScore: 1,
      away: "Pretoria Callies", awayAbbr: "PCA", awayScore: 1,
      minute: null, status: "ft", kickoff: "15:00", league: "GladAfrica",
      venue: "Thohoyandou Stadium, Limpopo",
      homeScorers: ["Mulaudzi 44'"], awayScorers: ["Van Wyk 71'"],
    },
    {
      id: 12, home: "Upington City", homeAbbr: "UCF", homeScore: 0,
      away: "Platinum City Rovers", awayAbbr: "PCR", awayScore: 2,
      minute: null, status: "ft", kickoff: "15:00", league: "GladAfrica",
      venue: "Upington Stadium, Northern Cape",
      homeScorers: [], awayScorers: ["Khumalo 33'", "Sithole 89'"],
    },
  ],
  "0": [
    {
      id: 13, home: "Orlando Pirates", homeAbbr: "OPF", homeScore: 2,
      away: "Kaizer Chiefs", awayAbbr: "KC", awayScore: 1,
      minute: 73, status: "live", kickoff: "15:00", league: "PSL",
      venue: "Orlando Stadium, Soweto",
      homeScorers: ["Mofokeng 12'", "Ndlovu 58'"], awayScorers: ["Dolly 45'"],
    },
    {
      id: 14, home: "Mamelodi Sundowns", homeAbbr: "MSF", homeScore: 1,
      away: "Siwelele FC", awayAbbr: "SWF", awayScore: 1,
      minute: 45, status: "ht", kickoff: "15:00", league: "PSL",
      venue: "Loftus Versfeld, Pretoria",
      homeScorers: ["Shalulile 23'"], awayScorers: ["Modiba 41'"],
    },
    {
      id: 15, home: "Cape Town Spurs", homeAbbr: "CTS", homeScore: null,
      away: "Stellenbosch FC", awayAbbr: "SFC", awayScore: null,
      minute: null, status: "upcoming", kickoff: "17:30", league: "PSL",
      venue: "Athlone Stadium, Cape Town",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 16, home: "Chippa United", homeAbbr: "CUF", homeScore: null,
      away: "Richards Bay", awayAbbr: "RBF", awayScore: null,
      minute: null, status: "upcoming", kickoff: "17:30", league: "PSL",
      venue: "Nelson Mandela Bay Stadium",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 17, home: "Royal AM", homeAbbr: "RAM", homeScore: null,
      away: "Durban City", awayAbbr: "DCF", awayScore: null,
      minute: null, status: "upcoming", kickoff: "20:00", league: "PSL",
      venue: "Sugar Ray Xulu Stadium, Durban",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 18, home: "Magesi FC", homeAbbr: "MAG", homeScore: null,
      away: "Marumo Gallants", awayAbbr: "MGF", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "PSL",
      venue: "Peter Mokaba Stadium, Polokwane",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 19, home: "TS Galaxy", homeAbbr: "TSG", homeScore: null,
      away: "Polokwane City", awayAbbr: "PCF", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "PSL",
      venue: "Mbombela Stadium, Nelspruit",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 20, home: "University of Pretoria", homeAbbr: "UPT", homeScore: null,
      away: "Milford FC", awayAbbr: "MFC", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "GladAfrica",
      venue: "Tuks Stadium, Pretoria",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 21, home: "Cape Umoya United", homeAbbr: "CUU", homeScore: null,
      away: "JDR Stars", awayAbbr: "JDR", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "GladAfrica",
      venue: "Athlone Stadium, Cape Town",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 22, home: "Tshakhuma FC", homeAbbr: "TSH", homeScore: null,
      away: "Venda Football Academy", awayAbbr: "VFA", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "GladAfrica",
      venue: "Thohoyandou Stadium, Limpopo",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 23, home: "Baroka FC", homeAbbr: "BAR", homeScore: null,
      away: "African Warriors", awayAbbr: "AWF", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "GladAfrica",
      venue: "Peter Mokaba Stadium, Polokwane",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 24, home: "Mamelodi Sundowns", homeAbbr: "MSF", homeScore: null,
      away: "Al Ahly", awayAbbr: "AHA", awayScore: null,
      minute: null, status: "upcoming", kickoff: "21:00", league: "CAF",
      venue: "Loftus Versfeld, Pretoria",
      homeScorers: [], awayScorers: [],
    },
  ],
  "1": [
    {
      id: 25, home: "Kaizer Chiefs", homeAbbr: "KC", homeScore: null,
      away: "Golden Arrows", awayAbbr: "GAF", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "PSL",
      venue: "FNB Stadium, Johannesburg",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 26, home: "Cape Town City", homeAbbr: "CTC", homeScore: null,
      away: "Sekhukhune United", awayAbbr: "SUF", awayScore: null,
      minute: null, status: "upcoming", kickoff: "17:30", league: "PSL",
      venue: "DHL Newlands, Cape Town",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 27, home: "Siwelele FC", homeAbbr: "SWF", homeScore: null,
      away: "Royal AM", awayAbbr: "RAM", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "PSL",
      venue: "Lucas Moripe Stadium, Pretoria",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 28, home: "Durban City", homeAbbr: "DCF", homeScore: null,
      away: "Magesi FC", awayAbbr: "MAG", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "PSL",
      venue: "Sugar Ray Xulu Stadium, Durban",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 29, home: "CASRIC FC", homeAbbr: "CAS", homeScore: null,
      away: "Pretoria Callies", awayAbbr: "PCA", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "GladAfrica",
      venue: "Chatsworth Stadium, Durban",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 30, home: "Milano United", homeAbbr: "MIL", homeScore: null,
      away: "Tornado FC", awayAbbr: "TOR", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "GladAfrica",
      venue: "Dobsonville Stadium, Soweto",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 31, home: "Platinum City Rovers", homeAbbr: "PCR", homeScore: null,
      away: "Upington City", awayAbbr: "UCF", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "GladAfrica",
      venue: "Olympia Park Stadium, Rustenburg",
      homeScorers: [], awayScorers: [],
    },
  ],
  "2": [
    {
      id: 32, home: "Orlando Pirates", homeAbbr: "OPF", homeScore: null,
      away: "Stellenbosch FC", awayAbbr: "SFC", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "PSL",
      venue: "Orlando Stadium, Soweto",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 33, home: "Marumo Gallants", homeAbbr: "MGF", homeScore: null,
      away: "Cape Town Spurs", awayAbbr: "CTS", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "PSL",
      venue: "Peter Mokaba Stadium, Polokwane",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 34, home: "Richards Bay", homeAbbr: "RBF", homeScore: null,
      away: "Polokwane City", awayAbbr: "PCF", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "PSL",
      venue: "King Zwelithini Stadium, Durban",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 35, home: "Chippa United", homeAbbr: "CUF", homeScore: null,
      away: "TS Galaxy", awayAbbr: "TSG", awayScore: null,
      minute: null, status: "upcoming", kickoff: "17:30", league: "PSL",
      venue: "Nelson Mandela Bay Stadium",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 36, home: "Black Leopards", homeAbbr: "BLF", homeScore: null,
      away: "Tshakhuma FC", awayAbbr: "TSH", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "GladAfrica",
      venue: "Thohoyandou Stadium, Limpopo",
      homeScorers: [], awayScorers: [],
    },
    {
      id: 37, home: "University of Pretoria", homeAbbr: "UPT", homeScore: null,
      away: "Baroka FC", awayAbbr: "BAR", awayScore: null,
      minute: null, status: "upcoming", kickoff: "15:00", league: "GladAfrica",
      venue: "Tuks Stadium, Pretoria",
      homeScorers: [], awayScorers: [],
    },
  ],
};

const LEAGUES_LIST = ["All", "PSL", "GladAfrica", "CAF"];

function getDayLabel(offset: number) {
  if (offset === 0) return "Today";
  if (offset === -1) return "Yesterday";
  if (offset === 1) return "Tomorrow";
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short" });
}

function getDateStr(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-ZA", { day: "numeric", month: "short" });
}

function LiveDot() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="live-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#ef4444" }} />
      <span className="text-[10px] font-bold" style={{ color: "#ef4444" }}>LIVE</span>
    </span>
  );
}

function StatusPill({ match }: { match: Match }) {
  if (match.status === "live")
    return (
      <div className="flex flex-col items-center gap-0.5">
        <LiveDot />
        <span className="text-xs font-black" style={{ color: "#ef4444" }}>{match.minute}'</span>
      </div>
    );
  if (match.status === "ht")
    return <span className="text-[10px] font-bold rounded-full px-2 py-0.5" style={{ background: "#fef3c7", color: "#d97706" }}>HT</span>;
  if (match.status === "ft")
    return <span className="text-[10px] font-bold" style={{ color: GREY }}>FT</span>;
  return <span className="text-xs font-bold" style={{ color: GREY }}>{match.kickoff}</span>;
}

function Crest({ abbr }: { abbr: string }) {
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0"
      style={{ background: GREY }}>
      {abbr.slice(0, 3)}
    </div>
  );
}

function MatchCard({ match }: { match: Match }) {
  const [expanded, setExpanded] = useState(false);
  const isLive   = match.status === "live";
  const isHT     = match.status === "ht";
  const isFT     = match.status === "ft";
  const hasScore = match.homeScore !== null;

  return (
    <div className="match-card rounded-3xl border overflow-hidden cursor-pointer"
      style={{ borderColor: isLive ? GREEN : "#e5e7eb" }}
      onClick={() => setExpanded(e => !e)}>

      <div className="px-5 py-4 flex items-center gap-3"
        style={{ background: isLive ? `${GREEN}12` : "#fff" }}>

        {/* Home */}
        <div className="flex items-center gap-2.5 flex-1 justify-end">
          <span className="text-sm font-bold text-right leading-tight max-sm:hidden">{match.home}</span>
          <span className="text-sm font-bold sm:hidden">{match.homeAbbr}</span>
          <Crest abbr={match.homeAbbr} />
        </div>

        {/* Score / time */}
        <div className="flex flex-col items-center min-w-[88px] gap-1">
          {hasScore ? (
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black" style={{ color: isLive ? "#ef4444" : GREY }}>{match.homeScore}</span>
              <span className="text-base font-bold" style={{ color: "#d1d5db" }}>–</span>
              <span className="text-xl font-black" style={{ color: isLive ? "#ef4444" : GREY }}>{match.awayScore}</span>
            </div>
          ) : (
            <span className="text-base font-black" style={{ color: GREY }}>vs</span>
          )}
          <StatusPill match={match} />
        </div>

        {/* Away */}
        <div className="flex items-center gap-2.5 flex-1">
          <Crest abbr={match.awayAbbr} />
          <span className="text-sm font-bold leading-tight max-sm:hidden">{match.away}</span>
          <span className="text-sm font-bold sm:hidden">{match.awayAbbr}</span>
        </div>

        {/* Chevron */}
        <div style={{ color: GREY, transition: "transform 0.25s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Expanded */}
      <div style={{ maxHeight: expanded ? 240 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <div className="px-5 pb-5 pt-2 border-t flex flex-col gap-3" style={{ borderColor: "#f0f0f0" }}>

          {/* Venue */}
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GREY} strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-[11px]" style={{ color: GREY }}>{match.venue}</span>
          </div>

          {/* Scorers */}
          {(isFT || isLive || isHT) && (
            <div className="flex gap-4">
              <div className="flex flex-col gap-1 flex-1 items-end">
                {match.homeScorers && match.homeScorers.length > 0
                  ? match.homeScorers.map((s, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-[11px]" style={{ color: GREY }}>{s}</span>
                      <span className="text-[11px]">⚽</span>
                    </div>
                  ))
                  : <span className="text-[11px]" style={{ color: "#d1d5db" }}>–</span>
                }
              </div>
              <div className="w-px" style={{ background: "#e5e7eb" }} />
              <div className="flex flex-col gap-1 flex-1">
                {match.awayScorers && match.awayScorers.length > 0
                  ? match.awayScorers.map((s, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-[11px]">⚽</span>
                      <span className="text-[11px]" style={{ color: GREY }}>{s}</span>
                    </div>
                  ))
                  : <span className="text-[11px]" style={{ color: "#d1d5db" }}>–</span>
                }
              </div>
            </div>
          )}

          {match.status === "upcoming" && (
            <p className="text-[11px]" style={{ color: GREY }}>
              Kickoff at <strong>{match.kickoff}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ScoresPage() {
  const [dayOffset, setDayOffset] = useState(0);
  const [league, setLeague]       = useState("All");
  const [ready, setReady]         = useState(false);
  const dateBarRef                = useRef<HTMLDivElement>(null);

  useEffect(() => { setTimeout(() => setReady(true), 60); }, []);

  useEffect(() => {
    const bar  = dateBarRef.current;
    if (!bar) return;
    const active = bar.querySelector("[data-active='true']") as HTMLElement;
    if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [dayOffset]);

  const key        = String(dayOffset);
  const allMatches = MATCHES_BY_DAY[key] ?? [];
  const filtered   = league === "All" ? allMatches : allMatches.filter(m => m.league === league);

  const grouped = ["PSL", "GladAfrica", "CAF"].reduce<Record<string, Match[]>>((acc, l) => {
    const matches = filtered.filter(m => m.league === l);
    if (matches.length) acc[l] = matches;
    return acc;
  }, {});

  const liveCount = allMatches.filter(m => m.status === "live" || m.status === "ht").length;

  const heroT = (d: number) => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s ease ${d}ms, transform 0.6s ease ${d}ms`,
  });

  return (
    <>
      <style>{`
        @keyframes pulse-red { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.5)} }
        .live-dot { animation: pulse-red 1.2s ease-in-out infinite; }
        .match-card { transition: box-shadow 0.2s, transform 0.2s; }
        .match-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.07); transform: translateY(-2px); }
        .date-pill { transition: background 0.18s, color 0.18s, transform 0.18s; }
        .date-pill:hover { transform: translateY(-1px); }
        .league-pill { transition: background 0.18s, color 0.18s; }
        @keyframes slideIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .slide-in { animation: slideIn 0.35s ease forwards; }
      `}</style>

      <main>

        {/* ── HEADER ── */}
        <section className="relative rounded-4xl overflow-hidden border border-black min-h-[220px] flex items-end"
          style={{ background: GREY }}>
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: `repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),
                              repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)`,
          }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${GREY} 50%, transparent)` }} />
          <div className="relative z-10 p-10 w-full max-sm:p-5">
            <div style={heroT(80)}>
              <span className="cta-badge text-xs font-bold uppercase tracking-wide">
                {liveCount > 0
                  ? <span className="flex items-center gap-1.5"><span className="live-dot w-1.5 h-1.5 rounded-full inline-block bg-red-500" />{liveCount} match{liveCount > 1 ? "es" : ""} live now</span>
                  : "📅 Match Centre"
                }
              </span>
            </div>
            <h1 className="text-white text-5xl font-bold leading-tight mt-3 max-sm:text-3xl" style={heroT(180)}>
              Live <span style={{ color: GREEN }}>Scores</span>
            </h1>
            <p className="text-white/50 text-sm mt-2" style={heroT(280)}>
              PSL · GladAfrica Championship · CAF — all South African football in one place.
            </p>
          </div>
        </section>

        {/* ── DATE BAR ── */}
        <div ref={dateBarRef} className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}>
          {[-3, -2, -1, 0, 1, 2, 3].map(offset => (
            <button key={offset} data-active={dayOffset === offset}
              onClick={() => setDayOffset(offset)}
              className="date-pill flex-shrink-0 flex flex-col items-center rounded-3xl border px-4 py-3 cursor-pointer min-w-[84px]"
              style={{
                background:  dayOffset === offset ? GREY : "#fff",
                color:       dayOffset === offset ? "#fff" : GREY,
                borderColor: dayOffset === offset ? GREY  : "#e5e7eb",
                scrollSnapAlign: "center",
              }}>
              <span className="text-[10px] font-semibold uppercase tracking-wide opacity-70">{getDayLabel(offset)}</span>
              <span className="text-xs font-bold mt-0.5">{getDateStr(offset)}</span>
              {offset === 0 && liveCount > 0 && (
                <span className="mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: dayOffset === 0 ? GREEN : "#fecaca", color: dayOffset === 0 ? "#fff" : "#ef4444" }}>
                  {liveCount} live
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── LEAGUE FILTER ── */}
        <div className="flex gap-2 flex-wrap">
          {LEAGUES_LIST.map(l => (
            <button key={l} onClick={() => setLeague(l)}
              className="league-pill text-xs font-semibold rounded-full px-4 py-1.5 border cursor-pointer"
              style={{
                background:  league === l ? GREEN : "#fff",
                color:       league === l ? "#fff" : GREY,
                borderColor: league === l ? GREEN : "#e5e7eb",
              }}>
              {l === "GladAfrica" ? "GladAfrica Championship" : l}
            </button>
          ))}
        </div>

        {/* ── MATCHES ── */}
        {filtered.length === 0 ? (
          <div className="rounded-4xl border py-20 text-center" style={{ borderColor: "#e5e7eb" }}>
            <p className="text-sm" style={{ color: GREY }}>No matches scheduled for this day.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8 slide-in">
            {Object.entries(grouped).map(([leagueName, matches]) => (
              <div key={leagueName} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-black flex-shrink-0"
                    style={{ background: GREEN }}>
                    {leagueName.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: GREY }}>
                    {leagueName === "GladAfrica" ? "GladAfrica Championship (NFD)" : leagueName}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
                  <span className="text-[10px]" style={{ color: GREY }}>{matches.length} match{matches.length > 1 ? "es" : ""}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {matches.map((m, i) => (
                    <div key={m.id} style={{ animationDelay: `${i * 50}ms` }}>
                      <MatchCard match={m} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="h-8" />
      </main>
    </>
  );
}