function pick<T>(list: readonly T[], n: number): T {
  const index = ((n % list.length) + list.length) % list.length;
  return list[index] as T;
}

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mix(hex: string, toward: string, amount: number) {
  const parse = (value: string) => [
    Number.parseInt(value.slice(1, 3), 16),
    Number.parseInt(value.slice(3, 5), 16),
    Number.parseInt(value.slice(5, 7), 16),
  ];
  const a = parse(hex);
  const b = parse(toward);
  const c = a.map((channel, i) => Math.round(channel + ((b[i] ?? channel) - channel) * amount));
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
}

const SKINS = ["#c48a62", "#a56b45", "#8d5a3c", "#d1a27a", "#6e4432", "#b07d55"];
const CLOTHS = ["#3e2a24", "#243038", "#3a3328", "#4a2c2c", "#2c3330", "#1f2a33", "#4a3a32", "#34302c"];
const GROUNDS = ["#1a1412", "#14181a", "#1c1614", "#121410", "#181410", "#151311"];
const HAIRS = ["#1a120e", "#24180f", "#120e0c", "#2a2118"];

export function Portrait({ seed, label }: { seed: string; label: string }) {
  const h = hash(seed || "sri-mangalam");
  const skin = pick(SKINS, h);
  const cloth = pick(CLOTHS, h >>> 3);
  const ground = pick(GROUNDS, h >>> 6);
  const hair = pick(HAIRS, h >>> 9);
  const style = h % 6;
  const id = `p${h.toString(36)}`;
  const shift = (h % 7) - 3;
  const cx = 150 + shift;
  const highlight = mix(skin, "#f3efe8", 0.28);
  const shadow = mix(skin, "#100e0c", 0.28);
  const clothDeep = mix(cloth, "#100e0c", 0.35);
  const lip = mix(skin, "#6e2e2a", 0.35);

  return (
    <svg
      viewBox="0 0 300 400"
      className="h-full w-full"
      role={label ? "img" : "presentation"}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <radialGradient id={`${id}-face`} cx="45%" cy="38%" r="68%">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="62%" stopColor={skin} />
          <stop offset="100%" stopColor={shadow} />
        </radialGradient>
        <linearGradient id={`${id}-cloth`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cloth} />
          <stop offset="100%" stopColor={clothDeep} />
        </linearGradient>
        <radialGradient id={`${id}-light`} cx="50%" cy="32%" r="55%">
          <stop offset="0%" stopColor="#f3efe8" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#f3efe8" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-bangs`}>
          <rect x="78" y="78" width="144" height={style % 2 === 0 ? 46 : 28} />
        </clipPath>
      </defs>
      <rect width="300" height="400" fill={ground} />
      <ellipse cx="150" cy="150" rx="130" ry="150" fill={`url(#${id}-light)`} />
      <path d="M36 400 Q48 286 150 274 Q252 286 264 400 Z" fill={`url(#${id}-cloth)`} />
      <rect x={cx - 16} y="214" width="32" height="48" rx="12" fill={shadow} />
      {style !== 2 && style !== 5 ? (
        <ellipse cx={cx} cy="210" rx={style === 0 ? 78 : 70} ry={style === 0 ? 92 : 64} fill={hair} />
      ) : null}
      <ellipse cx={cx - 58} cy="176" rx="10" ry="14" fill={shadow} />
      <ellipse cx={cx + 58} cy="176" rx="10" ry="14" fill={shadow} />
      <ellipse cx={cx} cy="168" rx="58" ry="72" fill={`url(#${id}-face)`} />
      {style === 1 ? <circle cx={cx + 24} cy="92" r="18" fill={hair} /> : null}
      {style === 5 ? <ellipse cx={cx} cy="108" rx="54" ry="28" fill={hair} /> : null}
      <ellipse
        cx={cx}
        cy={style === 2 ? 112 : 124}
        rx="60"
        ry="42"
        fill={hair}
        clipPath={`url(#${id}-bangs)`}
      />
      <ellipse cx={cx - 20} cy="162" rx="9" ry="4" fill={shadow} opacity="0.55" />
      <ellipse cx={cx + 20} cy="162" rx="9" ry="4" fill={shadow} opacity="0.55" />
      <path
        d={`M${cx} 168 L${cx - 4} 186 L${cx + 4} 186`}
        fill="none"
        stroke={shadow}
        strokeWidth="1.4"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <ellipse cx={cx} cy="200" rx="11" ry="4.5" fill={lip} />
      <path
        d={`M${cx - 34} 292 Q${cx} 276 ${cx + 34} 292`}
        fill="none"
        stroke={clothDeep}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <rect x="16" y="16" width="268" height="368" fill="none" stroke="#e7e1d6" strokeOpacity="0.28" />
    </svg>
  );
}
