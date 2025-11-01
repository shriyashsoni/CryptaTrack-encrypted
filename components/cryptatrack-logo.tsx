"use client"

export function CryptaTrackLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
      >
        {/* Main encrypted vault concept with lock */}
        <defs>
          <linearGradient id="cryptaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>

        {/* Outer circle - encryption ring */}
        <circle cx="16" cy="16" r="14" stroke="url(#cryptaGradient)" strokeWidth="1.5" fill="none" opacity="0.6" />

        {/* Lock body */}
        <rect x="9" y="14" width="14" height="12" rx="1.5" fill="url(#cryptaGradient)" />

        {/* Lock shackle (upper part) */}
        <path
          d="M 11 14 Q 11 8 16 8 Q 21 8 21 14"
          stroke="url(#cryptaGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Lock keyhole */}
        <circle cx="16" cy="20" r="2.5" fill="rgba(255, 255, 255, 0.3)" />

        {/* Inner tech pattern */}
        <circle cx="16" cy="16" r="7" stroke="url(#cryptaGradient)" strokeWidth="0.8" fill="none" opacity="0.3" />
      </svg>
      <span className="font-bold text-xl">CryptaTrack</span>
    </div>
  )
}
