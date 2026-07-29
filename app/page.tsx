"use client";

import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Baby,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Download,
  FileText,
  Heart,
  History,
  Home,
  Info,
  LineChart,
  LockKeyhole,
  LogOut,
  Mail,
  Menu,
  MoreHorizontal,
  Plus,
  Ruler,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRound,
  Users,
  Weight,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Metric = "height" | "weight" | "armSpan" | "sittingHeight" | "headCircumference";
type View = "overview" | "measurements" | "charts" | "reports";

type Measurement = {
  id: number;
  date: string;
  age: number;
  height?: number;
  weight?: number;
  armSpan?: number;
  sittingHeight?: number;
  headCircumference?: number;
};

const metricInfo: Record<
  Metric,
  { label: string; unit: string; short: string; color: string; icon: typeof Ruler }
> = {
  height: { label: "Height", unit: "cm", short: "Height", color: "#e86f51", icon: Ruler },
  weight: { label: "Weight", unit: "kg", short: "Weight", color: "#345f63", icon: Scale },
  armSpan: { label: "Arm span", unit: "cm", short: "Arm span", color: "#dfa827", icon: ArrowLeft },
  sittingHeight: {
    label: "Sitting height",
    unit: "cm",
    short: "Sitting",
    color: "#7b6da9",
    icon: UserRound,
  },
  headCircumference: {
    label: "Head circumference",
    unit: "cm",
    short: "Head",
    color: "#c65e7b",
    icon: Baby,
  },
};

const referenceMetrics: Metric[] = ["height", "weight", "headCircumference"];

const initialMeasurements: Measurement[] = [
  {
    id: 1,
    date: "2023-09-18",
    age: 5.9,
    height: 96.4,
    weight: 16.1,
    armSpan: 90.8,
    sittingHeight: 56.2,
    headCircumference: 52.1,
  },
  {
    id: 2,
    date: "2024-03-22",
    age: 6.4,
    height: 98.9,
    weight: 16.8,
    armSpan: 93.2,
    sittingHeight: 57.4,
    headCircumference: 52.4,
  },
  {
    id: 3,
    date: "2024-10-11",
    age: 7.0,
    height: 101.8,
    weight: 17.7,
    armSpan: 95.9,
    sittingHeight: 58.9,
    headCircumference: 52.7,
  },
  {
    id: 4,
    date: "2025-04-16",
    age: 7.5,
    height: 104.1,
    weight: 18.4,
    armSpan: 98.1,
    sittingHeight: 60.1,
    headCircumference: 52.9,
  },
  {
    id: 5,
    date: "2025-10-24",
    age: 8.0,
    height: 106.3,
    weight: 19.2,
    armSpan: 100.2,
    sittingHeight: 61.2,
    headCircumference: 53.2,
  },
  {
    id: 6,
    date: "2026-07-12",
    age: 8.7,
    height: 109.2,
    weight: 20.1,
    armSpan: 103.1,
    sittingHeight: 62.8,
    headCircumference: 53.4,
  },
];

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(date: string, long = false) {
  const parsed = new Date(`${date}T12:00:00`);
  if (long) {
    return parsed.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return `${parsed.getDate()} ${monthNames[parsed.getMonth()]} ${parsed.getFullYear()}`;
}

function formatAge(age: number) {
  const years = Math.floor(age);
  const months = Math.round((age - years) * 12);
  return `${years}y ${months}m`;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark">
        <Heart size={18} fill="currentColor" strokeWidth={2.4} />
        <TrendingUp size={17} strokeWidth={2.8} />
      </span>
      {!compact && (
        <span className="brand-copy">
          <strong>HCH</strong>
          <small>Growth Tracker</small>
        </span>
      )}
    </div>
  );
}

function AuthScreen({ onEnter }: { onEnter: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("sarah@example.com");
  const [password, setPassword] = useState("demo1234");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(onEnter, 650);
  };

  return (
    <main className="auth-shell">
      <section className="auth-story">
        <div className="auth-story-inner">
          <Logo />
          <div className="auth-message">
            <span className="eyebrow light">Made for HCH families</span>
            <h1>Every little milestone,<br />beautifully mapped.</h1>
            <p>
              Keep your child&apos;s growth history in one calm, private place—and
              bring a clearer picture to every appointment.
            </p>
          </div>
          <div className="auth-chart-card" aria-hidden="true">
            <div className="auth-chart-head">
              <div>
                <small>HEIGHT PROGRESS</small>
                <strong>109.2 <span>cm</span></strong>
              </div>
              <span className="gentle-pill"><TrendingUp size={13} /> +2.9 cm</span>
            </div>
            <svg viewBox="0 0 500 150" role="img" aria-label="Sample growth trend">
              <defs>
                <linearGradient id="authArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffd986" stopOpacity=".58" />
                  <stop offset="100%" stopColor="#ffd986" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M12 128 C75 122 100 104 154 104 S236 76 286 75 S360 55 410 47 S464 23 488 19 L488 145 L12 145 Z"
                fill="url(#authArea)"
              />
              <path
                d="M12 128 C75 122 100 104 154 104 S236 76 286 75 S360 55 410 47 S464 23 488 19"
                fill="none"
                stroke="#f2b84b"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {[["12", "128"], ["154", "104"], ["286", "75"], ["410", "47"], ["488", "19"]].map(
                ([cx, cy]) => (
                  <circle key={cx} cx={cx} cy={cy} r="6" fill="#fffaf1" stroke="#e56d50" strokeWidth="3" />
                ),
              )}
            </svg>
            <div className="auth-chart-labels">
              <span>Age 6</span><span>Age 7</span><span>Age 8</span>
            </div>
          </div>
          <p className="auth-note">
            <ShieldCheck size={16} />
            Your family&apos;s data stays private and in your control.
          </p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="mobile-auth-logo"><Logo /></div>
        <div className="auth-form-wrap">
          <div className="auth-heading">
            <span className="eyebrow">Welcome back</span>
            <h2>{mode === "login" ? "Sign in to your account" : "Create your family account"}</h2>
            <p>{mode === "login" ? "Your child’s growth story is waiting." : "Start tracking meaningful milestones today."}</p>
          </div>

          <button className="google-button" type="button" onClick={() => { setLoading(true); window.setTimeout(onEnter, 550); }}>
            <span className="google-g">G</span>
            Continue with Google
          </button>

          <div className="auth-divider"><span>or continue with email</span></div>

          <form className="auth-form" onSubmit={submit}>
            <label>
              Email address
              <span className="input-shell">
                <Mail size={17} />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </span>
            </label>
            <label>
              Password
              <span className="input-shell">
                <LockKeyhole size={17} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={6}
                  required
                />
                <button type="button" className="text-button" onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </span>
            </label>
            <div className="auth-options">
              <label className="check-label"><input type="checkbox" defaultChecked /> Remember me</label>
              <button className="link-button" type="button">Forgot password?</button>
            </div>
            <button className="primary-button full" type="submit" disabled={loading}>
              {loading ? <span className="spinner" /> : mode === "login" ? "Sign in" : "Create account"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>
          <p className="auth-switch">
            {mode === "login" ? "New to HCH Growth Tracker?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")}>
              {mode === "login" ? "Create account" : "Sign in"}
            </button>
          </p>
          <button className="demo-link" type="button" onClick={onEnter}>Explore the demo dashboard</button>
        </div>
        <p className="auth-legal">By continuing, you agree to our Terms and Privacy Policy.</p>
      </section>
    </main>
  );
}

function Sidebar({
  view,
  setView,
  mobileOpen,
  closeMobile,
  onSignOut,
}: {
  view: View;
  setView: (view: View) => void;
  mobileOpen: boolean;
  closeMobile: () => void;
  onSignOut: () => void;
}) {
  const items: { id: View; label: string; icon: typeof Home }[] = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "measurements", label: "Measurements", icon: Ruler },
    { id: "charts", label: "Growth charts", icon: LineChart },
    { id: "reports", label: "Reports", icon: FileText },
  ];
  return (
    <>
      <div className={`mobile-backdrop ${mobileOpen ? "show" : ""}`} onClick={closeMobile} />
      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-top">
          <Logo />
          <button className="mobile-close icon-button" onClick={closeMobile}><X size={19} /></button>
        </div>
        <nav className="sidebar-nav" aria-label="Primary">
          <span className="nav-label">Workspace</span>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={view === item.id ? "active" : ""}
                onClick={() => {
                  setView(item.id);
                  closeMobile();
                }}
              >
                <Icon size={19} strokeWidth={2} />
                <span>{item.label}</span>
                {item.id === "measurements" && <small>6</small>}
              </button>
            );
          })}
          <span className="nav-label secondary">Support</span>
          <button><CircleHelp size={19} /><span>Guidance</span></button>
          <button><Settings size={19} /><span>Settings</span></button>
        </nav>
        <div className="sidebar-callout">
          <span className="callout-icon"><Sparkles size={17} /></span>
          <strong>Appointment ready?</strong>
          <p>Create a clear summary to share with your child&apos;s care team.</p>
          <button onClick={() => setView("reports")}>Create report <ArrowRight size={14} /></button>
        </div>
        <div className="sidebar-user">
          <span className="avatar small">SC</span>
          <span><strong>Sarah Carter</strong><small>Parent account</small></span>
          <button className="icon-button" onClick={onSignOut} title="Sign out"><LogOut size={17} /></button>
        </div>
      </aside>
    </>
  );
}

function Topbar({
  onMenu,
  onAdd,
}: {
  onMenu: () => void;
  onAdd: () => void;
}) {
  return (
    <header className="topbar">
      <button className="mobile-menu icon-button" onClick={onMenu}><Menu size={21} /></button>
      <div className="top-search">
        <Search size={17} />
        <input aria-label="Search" placeholder="Search measurements..." />
        <kbd>⌘ K</kbd>
      </div>
      <div className="top-actions">
        <span className="sync-state"><CheckCircle2 size={15} /> All changes saved</span>
        <button className="icon-button notification" title="Notifications"><Bell size={19} /><i /></button>
        <button className="top-add" onClick={onAdd}><Plus size={17} /> <span>Add measurement</span></button>
      </div>
    </header>
  );
}

function ChildPicker({ onOpen }: { onOpen: () => void }) {
  return (
    <button className="child-picker" onClick={onOpen}>
      <span className="avatar">MC</span>
      <span className="child-picker-copy">
        <small>VIEWING PROFILE</small>
        <strong>Mia Carter <ChevronDown size={15} /></strong>
      </span>
      <span className="child-age">8 years, 8 months</span>
    </button>
  );
}

function MiniMetric({
  metric,
  value,
  delta,
  note,
}: {
  metric: Metric;
  value: string;
  delta: string;
  note: string;
}) {
  const info = metricInfo[metric];
  const Icon = info.icon;
  return (
    <article className="metric-card">
      <div className="metric-card-head">
        <span className="metric-icon" style={{ background: `${info.color}18`, color: info.color }}><Icon size={18} /></span>
        <button className="icon-button"><MoreHorizontal size={18} /></button>
      </div>
      <span className="metric-label">{info.label}</span>
      <strong className="metric-value">{value} <small>{info.unit}</small></strong>
      <div className="metric-foot">
        <span className="positive"><TrendingUp size={13} /> {delta}</span>
        <span>{note}</span>
      </div>
    </article>
  );
}

function GrowthChart({
  metric,
  measurements,
  zoom,
  setZoom,
  compact = false,
}: {
  metric: Metric;
  measurements: Measurement[];
  zoom: number;
  setZoom: (zoom: number) => void;
  compact?: boolean;
}) {
  const info = metricInfo[metric];
  const dims = compact
    ? { width: 800, height: 320, left: 56, right: 22, top: 22, bottom: 42 }
    : { width: 920, height: 380, left: 64, right: 26, top: 26, bottom: 48 };
  const values = measurements
    .filter((entry) => typeof entry[metric] === "number")
    .map((entry) => ({ x: entry.age, y: entry[metric] as number, date: entry.date }));
  const metricRanges: Record<Metric, { min: number; max: number; reference: [number, number, number][] }> = {
    height: {
      min: 76,
      max: 146,
      reference: [[80, 89.1, 99], [89, 100, 111], [98, 110, 122], [106, 120, 134], [113, 128, 143], [119, 134, 150]],
    },
    weight: {
      min: 10,
      max: 52,
      reference: [[10, 14.5, 21], [13, 20, 29], [16, 25.5, 38], [20, 31.7, 47], [24, 38, 55], [28, 44, 63]],
    },
    armSpan: {
      min: 76,
      max: 128,
      reference: [[78, 88, 96], [84, 94, 103], [90, 101, 111], [96, 108, 119], [101, 115, 126], [106, 121, 133]],
    },
    sittingHeight: {
      min: 46,
      max: 76,
      reference: [[47, 52, 57], [50, 55, 61], [53, 59, 65], [56, 62, 69], [58, 65, 72], [60, 68, 75]],
    },
    headCircumference: {
      min: 48,
      max: 60,
      reference: [[49, 52, 55], [49.8, 53, 56.2], [50.4, 54, 57], [50.8, 54.7, 57.7], [51.2, 55.3, 58.3], [51.5, 55.7, 58.7]],
    },
  };
  const range = metricRanges[metric];
  const xMin = zoom === 1 ? 4 : zoom === 2 ? 5 : 6;
  const xMax = zoom === 1 ? 14 : zoom === 2 ? 12 : 10;
  const yMin = range.min;
  const yMax = range.max;
  const x = (age: number) =>
    dims.left + ((age - xMin) / (xMax - xMin)) * (dims.width - dims.left - dims.right);
  const y = (value: number) =>
    dims.top + (1 - (value - yMin) / (yMax - yMin)) * (dims.height - dims.top - dims.bottom);
  const refAges = [4, 6, 8, 10, 12, 14];
  const path = (points: { x: number; y: number }[]) =>
    points.map((point, index) => `${index === 0 ? "M" : "L"}${x(point.x).toFixed(1)},${y(point.y).toFixed(1)}`).join(" ");
  const visibleValues = values.filter((point) => point.x >= xMin && point.x <= xMax);
  const percentiles = [0, 1, 2].map((column) =>
    refAges.map((age, index) => ({ x: age, y: range.reference[index][column] })),
  );
  const yTicks = Array.from({ length: 6 }, (_, index) => yMin + ((yMax - yMin) / 5) * index);
  const xTicks = refAges.filter((age) => age >= xMin && age <= xMax);

  return (
    <div className="chart-wrap">
      <svg className="growth-svg" viewBox={`0 0 ${dims.width} ${dims.height}`} role="img" aria-label={`${info.label} growth chart`}>
        <defs>
          <linearGradient id={`plotFill-${metric}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={info.color} stopOpacity=".18" />
            <stop offset="100%" stopColor={info.color} stopOpacity="0" />
          </linearGradient>
          <filter id="dotShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity=".16" />
          </filter>
        </defs>
        {yTicks.map((tick) => (
          <g key={tick}>
            <line x1={dims.left} y1={y(tick)} x2={dims.width - dims.right} y2={y(tick)} stroke="#dfe5e2" strokeDasharray="3 6" />
            <text x={dims.left - 13} y={y(tick) + 4} textAnchor="end" className="axis-label">{Math.round(tick)}</text>
          </g>
        ))}
        {xTicks.map((tick) => (
          <g key={tick}>
            <line x1={x(tick)} y1={dims.top} x2={x(tick)} y2={dims.height - dims.bottom} stroke="#eef1ef" />
            <text x={x(tick)} y={dims.height - 17} textAnchor="middle" className="axis-label">{tick} yrs</text>
          </g>
        ))}
        <text x="15" y="15" className="axis-unit">{info.unit}</text>
        <path
          d={`${path(percentiles[2])} ${percentiles[0].slice().reverse().map((point) => `L${x(point.x).toFixed(1)},${y(point.y).toFixed(1)}`).join(" ")} Z`}
          fill="#f2c65d"
          opacity=".11"
        />
        {percentiles.map((points, index) => (
          <path
            key={index}
            d={path(points)}
            fill="none"
            stroke={index === 1 ? "#c9a03f" : "#d7c38e"}
            strokeWidth={index === 1 ? 2 : 1.4}
            strokeDasharray={index === 1 ? "0" : "7 7"}
          />
        ))}
        {visibleValues.length > 1 && (
          <path
            d={`${path(visibleValues)} L${x(visibleValues[visibleValues.length - 1].x)},${dims.height - dims.bottom} L${x(visibleValues[0].x)},${dims.height - dims.bottom} Z`}
            fill={`url(#plotFill-${metric})`}
          />
        )}
        <path d={path(visibleValues)} fill="none" stroke={info.color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {visibleValues.map((point, index) => (
          <g key={point.date} className="chart-point" filter="url(#dotShadow)">
            <circle cx={x(point.x)} cy={y(point.y)} r={index === visibleValues.length - 1 ? 7 : 5} fill="#fff" stroke={info.color} strokeWidth="3" />
            <title>{formatDate(point.date)} · {point.y} {info.unit}</title>
          </g>
        ))}
        {!compact && visibleValues.length > 0 && (() => {
          const point = visibleValues[visibleValues.length - 1];
          return (
            <g transform={`translate(${Math.min(x(point.x) + 13, dims.width - 135)},${Math.max(y(point.y) - 36, 9)})`}>
              <rect width="113" height="33" rx="9" fill="#183f42" />
              <text x="12" y="21" fill="white" fontSize="12" fontWeight="700">{point.y} {info.unit} · Latest</text>
            </g>
          );
        })()}
        <text x={dims.width - 51} y={y(percentiles[2][Math.min(percentiles[2].length - 1, 3)].y) - 8} className="centile-label">98th</text>
        <text x={dims.width - 51} y={y(percentiles[1][Math.min(percentiles[1].length - 1, 3)].y) - 8} className="centile-label">50th</text>
        <text x={dims.width - 51} y={y(percentiles[0][Math.min(percentiles[0].length - 1, 3)].y) - 8} className="centile-label">2nd</text>
      </svg>
      {!compact && (
        <div className="chart-controls">
          <button className="icon-button" onClick={() => setZoom(Math.max(1, zoom - 1))} disabled={zoom === 1} title="Zoom out"><ZoomOut size={16} /></button>
          <span>{zoom === 1 ? "Age 4–14" : zoom === 2 ? "Age 5–12" : "Age 6–10"}</span>
          <button className="icon-button" onClick={() => setZoom(Math.min(3, zoom + 1))} disabled={zoom === 3} title="Zoom in"><ZoomIn size={16} /></button>
        </div>
      )}
    </div>
  );
}

function ChartPanel({
  measurements,
  initialMetric = "height",
  expanded = false,
}: {
  measurements: Measurement[];
  initialMetric?: Metric;
  expanded?: boolean;
}) {
  const [metric, setMetric] = useState<Metric>(initialMetric);
  const [zoom, setZoom] = useState(1);
  return (
    <article className={`panel chart-panel ${expanded ? "expanded-chart" : ""}`}>
      <div className="panel-head chart-panel-head">
        <div>
          <span className="eyebrow">HCH growth reference</span>
          <h3>{metricInfo[metric].label} over time</h3>
          <p>Mia&apos;s measurements shown with a digitised preview of published HCH reference centiles.</p>
        </div>
        <div className="chart-actions">
          <select value={metric} onChange={(event) => setMetric(event.target.value as Metric)} aria-label="Select measurement">
            {referenceMetrics.map((id) => <option key={id} value={id}>{metricInfo[id].label}</option>)}
          </select>
          <button className="ghost-button"><Download size={15} /> Data</button>
        </div>
      </div>
      <div className="legend">
        <span><i className="legend-line personal" /> Mia&apos;s measurements</span>
        <span><i className="legend-line reference" /> HCH 50th centile</span>
        <span><i className="legend-band" /> HCH 2nd–98th range</span>
      </div>
      <GrowthChart metric={metric} measurements={measurements} zoom={zoom} setZoom={setZoom} />
      <div className="clinical-note">
        <Info size={16} />
        <p>
          <strong>Published HCH source.</strong> The reference is Cheung et al. (2024), based on 188 children and seven centiles by sex.
          This interactive preview uses simplified visual interpolation and is not for diagnosis.{" "}
          <a href="/hch-growth-reference.pdf" target="_blank" rel="noreferrer">Open the original charts <Download size={12} /></a>
        </p>
      </div>
    </article>
  );
}

function MeasurementRows({ measurements, limit }: { measurements: Measurement[]; limit?: number }) {
  const rows = measurements.slice().reverse().slice(0, limit ?? measurements.length);
  return (
    <div className="measurement-table-wrap">
      <table className="measurement-table">
        <thead>
          <tr><th>Date</th><th>Age</th><th>Height</th><th>Weight</th><th>Head circ.</th><th /></tr>
        </thead>
        <tbody>
          {rows.map((entry, index) => (
            <tr key={entry.id}>
              <td>
                <span className={`date-marker marker-${index % 3}`} />
                <strong>{formatDate(entry.date)}</strong>
              </td>
              <td>{formatAge(entry.age)}</td>
              <td>{entry.height ?? "—"} <small>cm</small></td>
              <td>{entry.weight ?? "—"} <small>kg</small></td>
              <td>{entry.headCircumference ?? "—"} <small>cm</small></td>
              <td><button className="icon-button"><MoreHorizontal size={17} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Overview({
  measurements,
  onAdd,
  onView,
  onProfile,
}: {
  measurements: Measurement[];
  onAdd: () => void;
  onView: (view: View) => void;
  onProfile: () => void;
}) {
  const latest = measurements[measurements.length - 1];
  const previous = measurements[measurements.length - 2];
  return (
    <div className="page overview-page">
      <div className="page-intro">
        <div>
          <span className="eyebrow">Wednesday, 29 July</span>
          <h1>Good morning, Sarah <span>☀</span></h1>
          <p>Here&apos;s how Mia&apos;s growth story is taking shape.</p>
        </div>
        <ChildPicker onOpen={onProfile} />
      </div>

      <section className="welcome-strip">
        <div className="welcome-icon"><Ruler size={26} /></div>
        <div className="welcome-copy">
          <span className="eyebrow">Next check-in</span>
          <strong>Ready for a new measurement?</strong>
          <p>It&apos;s been 17 days since Mia&apos;s last entry. Regular measurements make trends easier to see.</p>
        </div>
        <button className="primary-button" onClick={onAdd}><Plus size={17} /> Add today&apos;s measurement</button>
        <div className="welcome-pattern" aria-hidden="true" />
      </section>

      <div className="section-title">
        <div><h2>Latest measurements</h2><p>Recorded {formatDate(latest.date, true)}</p></div>
        <button className="link-button" onClick={() => onView("measurements")}>View all history <ArrowRight size={15} /></button>
      </div>
      <section className="metrics-grid">
        <MiniMetric metric="height" value={`${latest.height}`} delta={`+${((latest.height ?? 0) - (previous.height ?? 0)).toFixed(1)} cm`} note="since last entry" />
        <MiniMetric metric="weight" value={`${latest.weight}`} delta={`+${((latest.weight ?? 0) - (previous.weight ?? 0)).toFixed(1)} kg`} note="since last entry" />
        <MiniMetric metric="armSpan" value={`${latest.armSpan}`} delta={`+${((latest.armSpan ?? 0) - (previous.armSpan ?? 0)).toFixed(1)} cm`} note="since last entry" />
        <MiniMetric metric="headCircumference" value={`${latest.headCircumference}`} delta={`+${((latest.headCircumference ?? 0) - (previous.headCircumference ?? 0)).toFixed(1)} cm`} note="since last entry" />
      </section>

      <section className="dashboard-grid">
        <ChartPanel measurements={measurements} />
        <aside className="right-column">
          <article className="panel insight-panel">
            <div className="insight-orbit"><TrendingUp size={22} /></div>
            <span className="eyebrow">Growth insight</span>
            <h3>A steady path</h3>
            <p>Mia&apos;s recorded height has followed a consistent trajectory across the last three entries.</p>
            <div className="insight-stat">
              <strong>4.3 <small>cm/year</small></strong>
              <span>Average recorded velocity</span>
            </div>
            <button className="text-link" onClick={() => onView("charts")}>Explore the chart <ArrowRight size={15} /></button>
          </article>
          <article className="panel profile-card">
            <div className="profile-card-head">
              <span className="avatar large">MC</span>
              <div><strong>Mia Carter</strong><span>Female · HCH</span></div>
              <button className="icon-button" onClick={onProfile}><MoreHorizontal size={18} /></button>
            </div>
            <dl>
              <div><dt>Date of birth</dt><dd>18 Nov 2017</dd></div>
              <div><dt>Current age</dt><dd>8y 8m</dd></div>
              <div><dt>Measurements</dt><dd>{measurements.length} entries</dd></div>
            </dl>
            <button className="soft-button full" onClick={onProfile}><UserRound size={16} /> Manage profile</button>
          </article>
        </aside>
      </section>

      <section className="panel recent-panel">
        <div className="panel-head">
          <div><span className="eyebrow">History</span><h3>Recent measurements</h3></div>
          <button className="ghost-button" onClick={() => onView("measurements")}>View all <ChevronRight size={15} /></button>
        </div>
        <MeasurementRows measurements={measurements} limit={3} />
      </section>
    </div>
  );
}

function MeasurementsPage({
  measurements,
  onAdd,
  onProfile,
}: {
  measurements: Measurement[];
  onAdd: () => void;
  onProfile: () => void;
}) {
  return (
    <div className="page">
      <div className="page-intro">
        <div><span className="eyebrow">Health record</span><h1>Measurements</h1><p>A complete, editable history of Mia&apos;s growth.</p></div>
        <ChildPicker onOpen={onProfile} />
      </div>
      <div className="subpage-actions">
        <div className="filter-pills">
          <button className="active">All entries</button>
          <button>Past year</button>
          <button>Height</button>
          <button>Weight</button>
        </div>
        <button className="primary-button" onClick={onAdd}><Plus size={17} /> Add measurement</button>
      </div>
      <section className="measurement-summary">
        <div><span className="summary-icon coral"><Ruler size={20} /></span><p>Latest height<strong>{measurements.at(-1)?.height} cm</strong></p></div>
        <div><span className="summary-icon teal"><History size={20} /></span><p>Tracking since<strong>{formatDate(measurements[0].date)}</strong></p></div>
        <div><span className="summary-icon yellow"><Activity size={20} /></span><p>Total entries<strong>{measurements.length} measurements</strong></p></div>
      </section>
      <section className="panel full-table-panel">
        <div className="panel-head">
          <div><span className="eyebrow">All records</span><h3>Growth history</h3></div>
          <button className="ghost-button"><Download size={15} /> Export CSV</button>
        </div>
        <MeasurementRows measurements={measurements} />
      </section>
    </div>
  );
}

function ChartsPage({ measurements, onProfile }: { measurements: Measurement[]; onProfile: () => void }) {
  return (
    <div className="page">
      <div className="page-intro">
        <div><span className="eyebrow">Visual trends</span><h1>Growth charts</h1><p>Zoom in, compare and explore Mia&apos;s history over time.</p></div>
        <ChildPicker onOpen={onProfile} />
      </div>
      <section className="chart-kpis">
        <div><span>Tracking period</span><strong>2 years, 10 months</strong></div>
        <div><span>Recorded height change</span><strong>+12.8 cm</strong></div>
        <div><span>Latest recorded velocity</span><strong>4.3 cm/year</strong></div>
      </section>
      <ChartPanel measurements={measurements} expanded />
      <section className="chart-explainer-grid">
        <article className="panel explain-card">
          <span className="summary-icon coral"><LineChart size={19} /></span>
          <div><strong>Reading the chart</strong><p>The coral line connects Mia&apos;s measurements. Reference lines provide context for the overall pattern.</p></div>
        </article>
        <article className="panel explain-card">
          <span className="summary-icon yellow"><ShieldCheck size={19} /></span>
          <div><strong>Clinical context matters</strong><p>A chart supports—but never replaces—conversation with your child&apos;s specialist care team.</p></div>
        </article>
      </section>
    </div>
  );
}

function ReportsPage({
  measurements,
  onProfile,
}: {
  measurements: Measurement[];
  onProfile: () => void;
}) {
  const [creating, setCreating] = useState(false);
  const [done, setDone] = useState(false);
  const exportPdf = async () => {
    setCreating(true);
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.setFillColor(24, 63, 66);
    doc.rect(0, 0, 210, 42, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("HCH Growth Summary", 16, 19);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Prepared for Mia Carter · 29 July 2026", 16, 29);
    doc.setTextColor(31, 52, 54);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Child profile", 16, 57);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Date of birth: 18 November 2017", 16, 67);
    doc.text("Diagnosis recorded by parent: Hypochondroplasia (HCH)", 16, 74);
    doc.text("Tracking period: September 2023 – July 2026", 16, 81);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Measurement history", 16, 99);
    doc.setFontSize(9);
    doc.setTextColor(92, 104, 103);
    doc.text("DATE", 16, 110);
    doc.text("AGE", 55, 110);
    doc.text("HEIGHT", 83, 110);
    doc.text("WEIGHT", 120, 110);
    doc.text("HEAD CIRC.", 155, 110);
    let rowY = 120;
    doc.setTextColor(31, 52, 54);
    doc.setFont("helvetica", "normal");
    measurements.slice().reverse().forEach((entry) => {
      doc.text(formatDate(entry.date), 16, rowY);
      doc.text(formatAge(entry.age), 55, rowY);
      doc.text(`${entry.height ?? "—"} cm`, 83, rowY);
      doc.text(`${entry.weight ?? "—"} kg`, 120, rowY);
      doc.text(`${entry.headCircumference ?? "—"} cm`, 155, rowY);
      doc.setDrawColor(226, 229, 226);
      doc.line(16, rowY + 4, 194, rowY + 4);
      rowY += 13;
    });
    doc.setFillColor(248, 244, 236);
    doc.roundedRect(16, 208, 178, 35, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Important context", 23, 220);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    const note = "This parent-generated report is a record-keeping aid and is not a diagnosis. Reference curves shown in the prototype are illustrative. Review measurements and clinical decisions with a qualified care professional.";
    doc.text(doc.splitTextToSize(note, 164), 23, 229);
    doc.setTextColor(118, 126, 125);
    doc.setFontSize(8);
    doc.text("Generated by HCH Growth Tracker", 16, 282);
    doc.save("mia-carter-hch-growth-summary.pdf");
    setCreating(false);
    setDone(true);
    window.setTimeout(() => setDone(false), 3000);
  };
  return (
    <div className="page">
      <div className="page-intro">
        <div><span className="eyebrow">Shareable summaries</span><h1>Reports</h1><p>Prepare a clear record for appointments and your care team.</p></div>
        <ChildPicker onOpen={onProfile} />
      </div>
      <section className="report-hero">
        <div>
          <span className="report-icon"><FileText size={30} /></span>
          <span className="eyebrow light">Appointment summary</span>
          <h2>Mia&apos;s growth report</h2>
          <p>A clean PDF with profile details and complete measurement history, ready to save or print.</p>
          <button className="light-button" onClick={exportPdf} disabled={creating}>
            {creating ? <span className="spinner dark" /> : done ? <Check size={17} /> : <Download size={17} />}
            {creating ? "Creating PDF..." : done ? "PDF downloaded" : "Export as PDF"}
          </button>
        </div>
        <div className="report-preview">
          <div className="paper">
            <div className="paper-brand"><Logo compact /><span>GROWTH SUMMARY</span></div>
            <h3>Mia Carter</h3>
            <p>8 years, 8 months · Female</p>
            <div className="paper-rule" />
            <div className="paper-stats">
              <span><small>HEIGHT</small><strong>109.2 cm</strong></span>
              <span><small>WEIGHT</small><strong>20.1 kg</strong></span>
            </div>
            <svg viewBox="0 0 260 72">
              <path d="M3 62 C38 60 48 50 79 50 S127 35 157 34 S203 20 257 10" fill="none" stroke="#e86f51" strokeWidth="3" />
              <path d="M3 69 C45 62 70 55 110 48 S185 27 257 16" fill="none" stroke="#dfc879" strokeDasharray="5 5" />
            </svg>
          </div>
        </div>
      </section>
      <section className="report-options">
        <article className="panel option-card">
          <span className="summary-icon coral"><Ruler size={19} /></span>
          <div><strong>All measurements</strong><p>{measurements.length} dated entries across five growth metrics.</p></div>
          <CheckCircle2 size={20} className="checked" />
        </article>
        <article className="panel option-card">
          <span className="summary-icon teal"><LineChart size={19} /></span>
          <div><strong>Growth overview</strong><p>Latest values, recorded changes and clinical context.</p></div>
          <CheckCircle2 size={20} className="checked" />
        </article>
        <article className="panel option-card">
          <span className="summary-icon yellow"><LockKeyhole size={19} /></span>
          <div><strong>Privacy first</strong><p>Generated in your browser; you choose where to share it.</p></div>
          <CheckCircle2 size={20} className="checked" />
        </article>
      </section>
      <div className="clinical-note report-note">
        <Info size={16} />
        <p>Reports are parent-generated records and not medical documents. Please verify all measurements with your care team. <a href="/hch-growth-reference.pdf" target="_blank" rel="noreferrer">View the published HCH charts.</a></p>
      </div>
    </div>
  );
}

function MeasurementModal({
  open,
  close,
  add,
}: {
  open: boolean;
  close: () => void;
  add: (measurement: Measurement) => void;
}) {
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);
  const [values, setValues] = useState({
    date: new Date().toISOString().slice(0, 10),
    height: "",
    weight: "",
    armSpan: "",
    sittingHeight: "",
    headCircumference: "",
  });
  useEffect(() => {
    if (open) {
      setStep(1);
      setSaved(false);
    }
  }, [open]);
  if (!open) return null;

  const save = () => {
    const date = new Date(`${values.date}T12:00:00`);
    const birth = new Date("2017-11-18T12:00:00");
    const age = (date.getTime() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    add({
      id: Date.now(),
      date: values.date,
      age,
      height: values.height ? Number(values.height) : undefined,
      weight: values.weight ? Number(values.weight) : undefined,
      armSpan: values.armSpan ? Number(values.armSpan) : undefined,
      sittingHeight: values.sittingHeight ? Number(values.sittingHeight) : undefined,
      headCircumference: values.headCircumference ? Number(values.headCircumference) : undefined,
    });
    setSaved(true);
    window.setTimeout(close, 850);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Add measurement">
      <div className="modal measurement-modal">
        <div className="modal-head">
          <div><span className="eyebrow">Mia Carter</span><h2>Add measurement</h2></div>
          <button className="icon-button" onClick={close}><X size={20} /></button>
        </div>
        <div className="modal-progress">
          <span className={step >= 1 ? "active" : ""}><i>1</i> Details</span>
          <b />
          <span className={step >= 2 ? "active" : ""}><i>2</i> Review</span>
        </div>
        {saved ? (
          <div className="success-state"><span><Check size={30} /></span><h3>Measurement saved</h3><p>Mia&apos;s chart has been updated.</p></div>
        ) : step === 1 ? (
          <div className="modal-body">
            <label className="field-label">
              Measurement date
              <span className="input-shell"><CalendarDays size={17} /><input type="date" value={values.date} onChange={(event) => setValues({ ...values, date: event.target.value })} /></span>
            </label>
            <div className="form-grid">
              {(Object.keys(metricInfo) as Metric[]).map((metric) => {
                const info = metricInfo[metric];
                const Icon = info.icon;
                return (
                  <label className="field-label" key={metric}>
                    {info.label}
                    <span className="input-shell">
                      <Icon size={17} />
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder={metric === "weight" ? "20.1" : "109.2"}
                        value={values[metric]}
                        onChange={(event) => setValues({ ...values, [metric]: event.target.value })}
                      />
                      <small>{info.unit}</small>
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="tip-box"><Info size={17} /><p>Only add the values you measured today. You can leave the others blank.</p></div>
          </div>
        ) : (
          <div className="modal-body review-body">
            <div className="review-date"><CalendarDays size={20} /><span><small>MEASUREMENT DATE</small><strong>{formatDate(values.date, true)}</strong></span></div>
            <div className="review-grid">
              {(Object.keys(metricInfo) as Metric[]).filter((metric) => values[metric]).map((metric) => (
                <div key={metric}><span>{metricInfo[metric].label}</span><strong>{values[metric]} <small>{metricInfo[metric].unit}</small></strong></div>
              ))}
            </div>
            {!(Object.keys(metricInfo) as Metric[]).some((metric) => values[metric]) && (
              <div className="empty-review">Go back and add at least one measurement.</div>
            )}
          </div>
        )}
        {!saved && (
          <div className="modal-foot">
            {step === 1 ? (
              <>
                <button className="ghost-button" onClick={close}>Cancel</button>
                <button className="primary-button" onClick={() => setStep(2)} disabled={!(Object.keys(metricInfo) as Metric[]).some((metric) => values[metric])}>Review <ArrowRight size={16} /></button>
              </>
            ) : (
              <>
                <button className="ghost-button" onClick={() => setStep(1)}><ArrowLeft size={16} /> Back</button>
                <button className="primary-button" onClick={save}><Check size={16} /> Save measurement</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileModal({ open, close }: { open: boolean; close: () => void }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Child profiles">
      <div className="modal profile-modal">
        <div className="modal-head">
          <div><span className="eyebrow">Family</span><h2>Child profiles</h2></div>
          <button className="icon-button" onClick={close}><X size={20} /></button>
        </div>
        <div className="profile-choice selected">
          <span className="avatar large">MC</span>
          <div><strong>Mia Carter</strong><span>8 years, 8 months · Female</span><small>Hypochondroplasia (HCH)</small></div>
          <span className="selected-check"><Check size={15} /></span>
        </div>
        <button className="add-profile"><span><Plus size={19} /></span><div><strong>Add another child</strong><small>Create a separate, private growth record</small></div><ChevronRight size={18} /></button>
        <div className="profile-privacy"><ShieldCheck size={18} /><p>Each child&apos;s record is kept separate. You control what gets exported or shared.</p></div>
      </div>
    </div>
  );
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [view, setView] = useState<View>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [measurementModal, setMeasurementModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [measurements, setMeasurements] = useState<Measurement[]>(initialMeasurements);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("hch-demo-measurements");
      const auth = window.localStorage.getItem("hch-demo-auth");
      if (stored) setMeasurements(JSON.parse(stored));
      if (auth === "true") setAuthenticated(true);
    } catch {
      // Storage is optional; the demo remains usable without it.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("hch-demo-measurements", JSON.stringify(measurements));
  }, [measurements, hydrated]);

  const enter = () => {
    setAuthenticated(true);
    window.localStorage.setItem("hch-demo-auth", "true");
  };
  const signOut = () => {
    setAuthenticated(false);
    window.localStorage.removeItem("hch-demo-auth");
  };
  const addMeasurement = (measurement: Measurement) => {
    setMeasurements((current) => [...current, measurement].sort((a, b) => a.date.localeCompare(b.date)));
  };
  const content = useMemo(() => {
    if (view === "measurements") return <MeasurementsPage measurements={measurements} onAdd={() => setMeasurementModal(true)} onProfile={() => setProfileModal(true)} />;
    if (view === "charts") return <ChartsPage measurements={measurements} onProfile={() => setProfileModal(true)} />;
    if (view === "reports") return <ReportsPage measurements={measurements} onProfile={() => setProfileModal(true)} />;
    return <Overview measurements={measurements} onAdd={() => setMeasurementModal(true)} onView={setView} onProfile={() => setProfileModal(true)} />;
  }, [view, measurements]);

  if (!hydrated) return <div className="app-loading"><Logo /><span className="spinner dark" /></div>;
  if (!authenticated) return <AuthScreen onEnter={enter} />;

  return (
    <div className="app-shell">
      <Sidebar view={view} setView={setView} mobileOpen={mobileOpen} closeMobile={() => setMobileOpen(false)} onSignOut={signOut} />
      <div className="main-shell">
        <Topbar onMenu={() => setMobileOpen(true)} onAdd={() => setMeasurementModal(true)} />
        <main>{content}</main>
        <footer className="app-footer">
          <span>HCH Growth Tracker · Family record-keeping prototype</span>
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK1477/" target="_blank" rel="noreferrer">Clinical reference: GeneReviews <ArrowRight size={13} /></a>
        </footer>
      </div>
      <MeasurementModal open={measurementModal} close={() => setMeasurementModal(false)} add={addMeasurement} />
      <ProfileModal open={profileModal} close={() => setProfileModal(false)} />
    </div>
  );
}
