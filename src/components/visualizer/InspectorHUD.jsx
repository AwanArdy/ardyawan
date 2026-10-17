export default function InspectorHUD({ inspector, telemetry }) {
  return (
    <div className="bg-slate-950 border-b-2 border-slate-700 px-4 py-3 flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded border border-ink font-mono font-bold text-[10px] uppercase ${telemetry.badgeClass}`}>
            {telemetry.status}
          </span>
          <span className="font-mono text-[11px] text-slate-400">{telemetry.latency}</span>
        </div>
        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest hidden sm:inline">
          Inspector Komponen
        </span>
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`w-2.5 h-2.5 rounded-sm ${inspector.colorClass} inline-block border border-white`} />
          <span className="font-mono text-xs font-bold text-white">{inspector.title}</span>
          <span className="font-mono text-[10px] text-slate-400 uppercase">{inspector.badge}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{inspector.desc}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {(inspector.skills || []).map((skill) => (
            <span key={skill} className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-600 text-slate-200">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
