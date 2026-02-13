import { useState, useMemo } from 'react';
import type { DailyStats, ChartPeriod } from '../types';
import { formatNumber } from '../data';

interface ChartProps {
  data: DailyStats[];
  dataKey: 'subscribers' | 'views' | 'growth';
  color: string;
  gradientId: string;
  title: string;
  height?: number;
}

export function Chart({ data, dataKey, color, gradientId, title, height = 240 }: ChartProps) {
  const [period, setPeriod] = useState<ChartPeriod>('30d');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredData = useMemo(() => {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    return data.slice(-days);
  }, [data, period]);

  const values = filteredData.map(d => d[dataKey]);
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);
  const range = maxVal - minVal || 1;

  const padding = { top: 20, right: 20, bottom: 30, left: 0 };
  const chartWidth = 100;
  const chartHeight = height;
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const points = filteredData.map((_, i) => {
    const x = padding.left + (i / (filteredData.length - 1)) * innerWidth;
    const y = padding.top + innerHeight - ((values[i] - minVal) / range) * innerHeight;
    return { x, y };
  });

  const pathD = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + (p.x - prev.x) * 0.4;
    const cpx2 = prev.x + (p.x - prev.x) * 0.6;
    return `C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
  }).join(' ');

  const areaD = pathD + ` L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`;

  const totalChange = values[values.length - 1] - values[0];
  const percentChange = ((totalChange / values[0]) * 100).toFixed(2);

  const periods: { key: ChartPeriod; label: string }[] = [
    { key: '7d', label: '7 дней' },
    { key: '30d', label: '30 дней' },
    { key: '90d', label: '90 дней' },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] overflow-hidden">
      <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {dataKey === 'growth' ? '+' : ''}{formatNumber(values[values.length - 1])}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              totalChange >= 0
                ? 'bg-emerald-500/10 text-emerald-500'
                : 'bg-red-500/10 text-red-500'
            }`}>
              {totalChange >= 0 ? '↑' : '↓'} {percentChange}%
            </span>
          </div>
        </div>
        <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-xl p-1 border border-slate-200 dark:border-white/[0.06]">
          {periods.map(p => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                period === p.key
                  ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 relative">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full"
          style={{ height: `${height}px` }}
          preserveAspectRatio="none"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((frac, i) => {
            const y = padding.top + innerHeight * (1 - frac);
            const val = minVal + range * frac;
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + innerWidth}
                  y2={y}
                  stroke="currentColor"
                  className="text-slate-100 dark:text-white/5"
                  strokeWidth="0.15"
                  strokeDasharray="0.5,0.5"
                />
                <text
                  x={padding.left + innerWidth + 1}
                  y={y + 1}
                  className="text-slate-400 dark:text-slate-500"
                  fontSize="2.5"
                  fill="currentColor"
                >
                  {formatNumber(Math.round(val))}
                </text>
              </g>
            );
          })}

          {/* Area */}
          <path d={areaD} fill={`url(#${gradientId})`} />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="0.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hover areas */}
          {points.map((p, i) => (
            <g key={i}>
              <rect
                x={p.x - (innerWidth / filteredData.length) / 2}
                y={padding.top}
                width={innerWidth / filteredData.length}
                height={innerHeight}
                fill="transparent"
                onMouseEnter={() => setHoveredIndex(i)}
              />
              {hoveredIndex === i && (
                <>
                  <line
                    x1={p.x}
                    y1={padding.top}
                    x2={p.x}
                    y2={padding.top + innerHeight}
                    stroke={color}
                    strokeWidth="0.15"
                    strokeDasharray="0.4,0.4"
                    opacity="0.5"
                  />
                  <circle cx={p.x} cy={p.y} r="1" fill={color} stroke="white" strokeWidth="0.3" />
                </>
              )}
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        {hoveredIndex !== null && filteredData[hoveredIndex] && (
          <div
            className="absolute pointer-events-none bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg px-3 py-2 text-xs shadow-xl z-10"
            style={{
              left: `${(hoveredIndex / (filteredData.length - 1)) * 85 + 5}%`,
              top: '20px',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="font-medium">{filteredData[hoveredIndex].date}</div>
            <div className="font-bold mt-0.5">
              {dataKey === 'growth' ? '+' : ''}{formatNumber(filteredData[hoveredIndex][dataKey])}
            </div>
          </div>
        )}

        {/* Date labels */}
        <div className="flex justify-between mt-2 px-1">
          <span className="text-[10px] text-slate-400">{filteredData[0]?.date}</span>
          <span className="text-[10px] text-slate-400">{filteredData[filteredData.length - 1]?.date}</span>
        </div>
      </div>
    </div>
  );
}

interface MiniChartProps {
  data: DailyStats[];
  dataKey: 'subscribers' | 'views' | 'growth';
  color: string;
  width?: number;
  height?: number;
}

export function MiniChart({ data, dataKey, color, width = 80, height = 32 }: MiniChartProps) {
  const last14 = data.slice(-14);
  const values = last14.map(d => d[dataKey]);
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);
  const range = maxVal - minVal || 1;

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - 2 - ((v - minVal) / range) * (height - 4);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
