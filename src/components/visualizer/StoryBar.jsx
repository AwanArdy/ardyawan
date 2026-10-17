export default function StoryBar({ story, stepBoxes, stepTexts, activeStep }) {
  return (
    <div className="bg-ink border-b-2 border-slate-700 px-4 py-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className={`font-mono text-xs font-bold ${story.badgeClass} uppercase tracking-wide`}>{story.headline}</span>
        <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
          Klik objek berlabel di 3D untuk detail
        </span>
      </div>
      <p
        className="text-xs sm:text-sm text-slate-200 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: story.explanation }}
      />
      {/* 4 Visual Step Pills that light up during packet animation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
        {stepBoxes.map(({ num, title, textClass }) => {
          const isActive = activeStep === num
          return (
            <div
              key={num}
              className={`rounded px-2.5 py-1.5 transition-all ${
                isActive
                  ? 'bg-slate-700 border-2 border-white text-white shadow-[2px_2px_0px_#3B82F6]'
                  : 'bg-slate-800 border border-slate-600 text-slate-300 opacity-75'
              }`}
            >
              <span className={`font-bold ${textClass} block`}>{title}</span>
              <span className="text-[10px] text-slate-400">{stepTexts[num - 1]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
