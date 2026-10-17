export default function CanvasStage({ containerRef, labelsRef, packetTagRef, packetTagTextRef, legendItems, logEntries, packetCount }) {
  return (
    <div ref={containerRef} className="bg-dark-grid relative overflow-hidden h-[380px] sm:h-[480px]">
      {/* HTML 2D Floating Labels Container (Synced in real-time with 3D Objects) */}
      <div ref={labelsRef} id="labels-overlay" className="absolute inset-0 pointer-events-none z-10 overflow-hidden" />

      {/* Floating Packet Action Bubble (Follows active moving data packet in 3D) */}
      <div
        ref={packetTagRef}
        className="hidden absolute pointer-events-none z-20 -translate-x-1/2 -translate-y-full pb-2 transition-opacity duration-150"
      >
        <div className="bg-white text-ink border-2 border-ink rounded-lg px-2.5 py-1 shadow-[3px_3px_0px_#0F172A] font-mono text-[11px] font-bold whitespace-nowrap flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-frontend border border-ink inline-block animate-ping" />
          <span ref={packetTagTextRef} id="packet-tag-text">
            Mengirim permintaan...
          </span>
        </div>
      </div>

      {/* Visual Legend Pill (Top Left of Canvas) */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none hidden sm:flex flex-col gap-1 bg-slate-900/95 border-2 border-slate-700 p-2.5 rounded-xl font-mono text-[10px] text-slate-200">
        <div className="font-bold text-slate-400 border-b border-slate-700 pb-1 mb-0.5">BENTUK OBJEK 3D:</div>
        {legendItems.map(({ colorClass, label, desc }) => (
          <div key={colorClass} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-sm ${colorClass} inline-block border border-white`} />
            <span>
              <strong>{label}</strong> {desc}
            </span>
          </div>
        ))}
      </div>

      {/* Live Packet Log Overlay (Bottom Right of Canvas) */}
      <div className="absolute bottom-3 right-3 z-20 pointer-events-none bg-slate-900/95 border-2 border-slate-700 p-2.5 rounded-xl font-mono text-[11px] w-60 sm:w-72">
        <div className="text-slate-400 font-bold border-b border-slate-700 pb-1 mb-1 flex justify-between">
          <span>STATUS ALIRAN DATA</span>
          <span className="text-backend">{packetCount} paket</span>
        </div>
        <div className="space-y-1 text-slate-200 max-h-16 overflow-hidden">
          {logEntries.map((line, i) => (
            <div key={`${line}-${i}`}>{line}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
