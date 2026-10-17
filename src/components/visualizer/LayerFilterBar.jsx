export default function LayerFilterBar({ layers, activeLayer, onFocus, onReset }) {
  return (
    <div className="bg-slate-900 border-b-2 border-slate-700 px-3 py-2 flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="font-mono text-[11px] text-slate-400 mr-1">PILIH BAGIAN:</span>
        {layers.map((layer) => (
          <button
            key={layer.key}
            onClick={() => onFocus(layer.key)}
            className={`px-2.5 py-1 rounded font-mono text-xs font-bold ${layer.className} border border-ink ${
              activeLayer === layer.key ? 'ring-2 ring-white' : ''
            }`}
          >
            {layer.label}
          </button>
        ))}
      </div>
      <button onClick={onReset} className="font-mono text-[11px] text-slate-300 hover:text-white underline px-1">
        Reset Kamera
      </button>
    </div>
  )
}
