export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoBg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="logoLine" x1="6" y1="24" x2="30" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e0e7ff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="36" height="36" rx="10" fill="url(#logoBg)" />
      {/* Subtle grid lines */}
      <line x1="6" y1="26" x2="30" y2="26" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
      <line x1="6" y1="20" x2="30" y2="20" stroke="white" strokeOpacity="0.07" strokeWidth="0.5" />
      <line x1="6" y1="14" x2="30" y2="14" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
      {/* Chart line */}
      <polyline
        points="7,24 13,19 18,21 23,13 29,9"
        fill="none"
        stroke="url(#logoLine)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
      />
      {/* Dot at end */}
      <circle cx="29" cy="9" r="2.5" fill="white" />
      <circle cx="29" cy="9" r="1.2" fill="#3b82f6" />
      {/* Small bars at bottom */}
      <rect x="8" y="27" width="3" height="3" rx="0.8" fill="white" fillOpacity="0.2" />
      <rect x="13" y="25" width="3" height="5" rx="0.8" fill="white" fillOpacity="0.25" />
      <rect x="18" y="26" width="3" height="4" rx="0.8" fill="white" fillOpacity="0.2" />
      <rect x="23" y="24" width="3" height="6" rx="0.8" fill="white" fillOpacity="0.3" />
    </svg>
  );
}
