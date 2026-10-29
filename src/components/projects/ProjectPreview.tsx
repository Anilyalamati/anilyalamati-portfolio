import { cn } from '../../lib/cn';

const IVORY = '#eeebda';

function EasyTripPattern() {
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden="true">
      <g stroke={IVORY} strokeOpacity="0.35" fill="none">
        <circle cx="130" cy="130" r="40" />
        <circle cx="130" cy="130" r="75" />
        <circle cx="130" cy="130" r="110" />
      </g>
      <path
        d="M 20 220 C 120 170, 180 90, 320 50"
        stroke={IVORY}
        strokeOpacity="0.5"
        strokeDasharray="2 8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="130" cy="130" r="5" fill={IVORY} />
      <circle cx="320" cy="50" r="5" fill={IVORY} />
      <circle cx="20" cy="220" r="3.5" fill={IVORY} fillOpacity="0.7" />
    </svg>
  );
}

function DeepDetectPattern() {
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden="true">
      <g stroke={IVORY} strokeOpacity="0.12">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={30 * (i + 1)} x2="400" y2={30 * (i + 1)} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={40 * (i + 1)} y1="0" x2={40 * (i + 1)} y2="260" />
        ))}
      </g>
      <g stroke={IVORY} strokeWidth="2" fill="none">
        <path d="M 130 90 L 130 70 L 150 70" />
        <path d="M 270 90 L 270 70 L 250 70" />
        <path d="M 130 190 L 130 210 L 150 210" />
        <path d="M 270 190 L 270 210 L 250 210" />
      </g>
      <rect x="130" y="90" width="140" height="100" stroke={IVORY} strokeOpacity="0.3" fill="none" />
      <line x1="130" y1="140" x2="270" y2="140" stroke={IVORY} strokeOpacity="0.6" strokeDasharray="1 6" />
    </svg>
  );
}

function RecommenderPattern() {
  const nodes = [
    [80, 60], [200, 40], [320, 80], [60, 170], [180, 190], [300, 160], [220, 110],
  ];
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden="true">
      <g stroke={IVORY} strokeOpacity="0.25">
        <line x1={nodes[0][0]} y1={nodes[0][1]} x2={nodes[6][0]} y2={nodes[6][1]} />
        <line x1={nodes[1][0]} y1={nodes[1][1]} x2={nodes[6][0]} y2={nodes[6][1]} />
        <line x1={nodes[2][0]} y1={nodes[2][1]} x2={nodes[6][0]} y2={nodes[6][1]} />
        <line x1={nodes[3][0]} y1={nodes[3][1]} x2={nodes[4][0]} y2={nodes[4][1]} />
        <line x1={nodes[4][0]} y1={nodes[4][1]} x2={nodes[6][0]} y2={nodes[6][1]} />
        <line x1={nodes[5][0]} y1={nodes[5][1]} x2={nodes[6][0]} y2={nodes[6][1]} />
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={i === 6 ? 7 : 4} fill={IVORY} fillOpacity={i === 6 ? 0.95 : 0.6} />
      ))}
    </svg>
  );
}

function DevOpsPattern() {
  const stages = 4;
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden="true">
      <line x1="40" y1="130" x2="360" y2="130" stroke={IVORY} strokeOpacity="0.25" />
      {Array.from({ length: stages }).map((_, i) => {
        const x = 70 + i * 90;
        return (
          <g key={x}>
            <rect
              x={x - 28}
              y={100}
              width="56"
              height="60"
              rx="8"
              stroke={IVORY}
              strokeOpacity={0.5}
              fill={i % 2 === 0 ? 'transparent' : IVORY}
              fillOpacity={i % 2 === 0 ? 0 : 0.06}
            />
            {i < stages - 1 && (
              <path
                d={`M ${x + 30} 130 L ${x + 58} 130`}
                stroke={IVORY}
                strokeOpacity="0.5"
                markerEnd="url(#arrow)"
              />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill={IVORY} fillOpacity="0.5" />
        </marker>
      </defs>
    </svg>
  );
}

function ExperimentsPattern() {
  const points = [
    [60, 200], [100, 160], [140, 180], [180, 110], [210, 150], [250, 90],
    [280, 130], [310, 70], [330, 120], [90, 90], [160, 60],
  ];
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden="true">
      <g stroke={IVORY} strokeOpacity="0.2">
        <line x1="40" y1="20" x2="40" y2="220" />
        <line x1="40" y1="220" x2="370" y2="220" />
      </g>
      {points.map(([x, y], i) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill={IVORY} fillOpacity={0.3 + (i % 3) * 0.2} />
      ))}
      <path
        d="M 50 200 C 150 150, 220 100, 340 60"
        stroke={IVORY}
        strokeOpacity="0.45"
        strokeDasharray="1 6"
        fill="none"
      />
    </svg>
  );
}

const PATTERNS: Record<string, React.ComponentType> = {
  easytrip: EasyTripPattern,
  deepdetect: DeepDetectPattern,
  recommender: RecommenderPattern,
  devops: DevOpsPattern,
  experiments: ExperimentsPattern,
};

interface ProjectPreviewProps {
  seed: string;
  image?: string;
  title: string;
  className?: string;
}

export function ProjectPreview({ seed, image, title, className }: ProjectPreviewProps) {
  const Pattern = PATTERNS[seed] ?? RecommenderPattern;

  return (
    <div
      className={cn(
        'relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl border border-ivory/10 bg-indigo-900/60',
        className,
      )}
    >
      {image ? (
        <img src={image} alt={`${title} preview`} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <>
          <div className="grain absolute inset-0 opacity-60" aria-hidden="true" />
          <Pattern />
        </>
      )}
    </div>
  );
}
