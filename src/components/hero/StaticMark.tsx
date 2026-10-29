/**
 * Static, dependency-free stand-in for the 3D hero mark — used while
 * the WebGL scene loads, and permanently for reduced-motion, no-WebGL,
 * or very low-powered devices. Deliberately echoes the same faceted
 * silhouette so the page never feels like it's missing its hero visual.
 */
export function StaticMark({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div
        className="absolute inset-0 -z-10 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(64,68,122,0.55) 0%, rgba(40,43,74,0) 70%)',
        }}
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="h-full w-full"
        role="img"
        aria-label="Abstract faceted geometric mark"
      >
        <g stroke="#eeebda" strokeWidth="1" opacity="0.8">
          <polygon points="200,40 330,120 330,280 200,360 70,280 70,120" />
          <polygon points="200,40 70,120 200,200 330,120" />
          <polygon points="70,120 70,280 200,200" />
          <polygon points="330,120 330,280 200,200" />
          <polygon points="70,280 200,360 200,200" />
          <polygon points="330,280 200,360 200,200" />
          <line x1="200" y1="40" x2="200" y2="200" />
        </g>
        <circle cx="200" cy="200" r="150" stroke="#8d8b7e" strokeOpacity="0.35" />
        <g fill="#eeebda">
          <circle cx="200" cy="40" r="3" />
          <circle cx="330" cy="120" r="2.5" opacity="0.8" />
          <circle cx="330" cy="280" r="2" opacity="0.6" />
          <circle cx="200" cy="360" r="2.5" opacity="0.8" />
          <circle cx="70" cy="280" r="2" opacity="0.6" />
          <circle cx="70" cy="120" r="2.5" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
