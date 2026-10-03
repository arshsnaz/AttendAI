import React from "react";

interface AttendAiLogoProps {
  className?: string;
  size?: number | string;
  showGlow?: boolean;
}

export const AttendAiLogo: React.FC<AttendAiLogoProps> = ({
  className = "w-10 h-10",
  size,
  showGlow = false,
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${showGlow ? "drop-shadow-[0_0_12px_rgba(43,159,177,0.4)]" : "drop-shadow-sm"}`}
      style={style}
    >
      <defs>
        {/* Navy Head Silhouette Gradient */}
        <linearGradient id="headGrad" x1="60" y1="20" x2="60" y2="102" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B2E45" />
          <stop offset="50%" stopColor="#0F3D5E" />
          <stop offset="100%" stopColor="#184E77" />
        </linearGradient>

        {/* Cyan Target Brackets Gradient */}
        <linearGradient id="bracketGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C4D4" />
          <stop offset="100%" stopColor="#2B9FB1" />
        </linearGradient>

        {/* Biometric Mesh Gradient */}
        <linearGradient id="aiMeshGrad" x1="40" y1="30" x2="80" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>

        {/* Verified Badge Gradient */}
        <linearGradient id="checkBadgeGrad" x1="16" y1="62" x2="48" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>

        {/* Soft Drop Shadow for Badge */}
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0B2E45" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Target Brackets (Biometric Scan Frame) */}
      {/* Top Left */}
      <path
        d="M 20 34 L 20 22 C 20 20.8954 20.8954 20 22 20 L 34 20"
        stroke="url(#bracketGrad)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top Right */}
      <path
        d="M 86 20 L 98 20 C 99.1046 20 100 20.8954 100 22 L 100 34"
        stroke="url(#bracketGrad)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom Right */}
      <path
        d="M 100 86 L 100 98 C 100 99.1046 99.1046 100 98 100 L 86 100"
        stroke="url(#bracketGrad)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Head Silhouette Base */}
      <path
        d="M 60 22 C 46 22 36 33.5 36 49 C 36 58.5 40.5 68 47 76 C 45 81.5 37.5 88.5 28 94 C 40.5 98.5 79.5 98.5 92 94 C 82.5 88.5 75 81.5 73 76 C 79.5 68 84 58.5 84 49 C 84 33.5 74 22 60 22 Z"
        fill="url(#headGrad)"
      />

      {/* Futuristic Biometric Facial Grid Wireframe */}
      <g stroke="url(#aiMeshGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
        {/* Center Vertical Axis */}
        <line x1="60" y1="30" x2="60" y2="44" />
        <line x1="60" y1="44" x2="60" y2="57" />
        <line x1="60" y1="57" x2="60" y2="70" />

        {/* Upper Forehead Poly */}
        <line x1="60" y1="30" x2="48" y2="37" />
        <line x1="60" y1="30" x2="72" y2="37" />
        <line x1="48" y1="37" x2="60" y2="44" />
        <line x1="72" y1="37" x2="60" y2="44" />

        {/* Outer Brow & Temples */}
        <line x1="48" y1="37" x2="41" y2="50" />
        <line x1="72" y1="37" x2="79" y2="50" />
        <line x1="41" y1="50" x2="60" y2="44" />
        <line x1="79" y1="50" x2="60" y2="44" />

        {/* Cheeks & Nose Bridge */}
        <line x1="41" y1="50" x2="49" y2="59" />
        <line x1="79" y1="50" x2="71" y2="59" />
        <line x1="49" y1="59" x2="60" y2="57" />
        <line x1="71" y1="59" x2="60" y2="57" />
        <line x1="41" y1="50" x2="60" y2="57" />
        <line x1="79" y1="50" x2="60" y2="57" />

        {/* Lower Jaw & Chin Hexagons */}
        <line x1="49" y1="59" x2="46" y2="69" />
        <line x1="71" y1="59" x2="74" y2="69" />
        <line x1="46" y1="69" x2="60" y2="70" />
        <line x1="74" y1="69" x2="60" y2="70" />
        <line x1="49" y1="59" x2="60" y2="70" />
        <line x1="71" y1="59" x2="60" y2="70" />
      </g>

      {/* Polygonal Nodes / Tracking Markers */}
      <g fill="#FFFFFF" stroke="#0B2E45" strokeWidth="1.2">
        <circle cx="60" cy="30" r="2.8" />
        <circle cx="48" cy="37" r="2.3" />
        <circle cx="72" cy="37" r="2.3" />
        <circle cx="60" cy="44" r="2.7" />
        <circle cx="41" cy="50" r="2.3" />
        <circle cx="79" cy="50" r="2.3" />
        <circle cx="60" cy="57" r="2.7" />
        <circle cx="49" cy="59" r="2.3" />
        <circle cx="71" cy="59" r="2.3" />
        <circle cx="46" cy="69" r="2.1" />
        <circle cx="74" cy="69" r="2.1" />
        <circle cx="60" cy="70" r="2.8" />
      </g>

      {/* Verified AI Checkmark Badge */}
      <g filter="url(#badgeShadow)">
        <circle cx="32" cy="78" r="16" fill="url(#checkBadgeGrad)" stroke="#FFFFFF" strokeWidth="2.5" />
        <path
          d="M 23 78.5 L 29 84.5 L 41 71.5"
          stroke="#FFFFFF"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
