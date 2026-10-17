import ArchitectureVisualizer from './ArchitectureVisualizer'

export default function VisualizerSection() {
  return (
    <section id="visualizer" className="bg-slate-800 border-b-2 border-ink">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">Simulasi Arsitektur Fullstack 3D</h2>
        <p className="font-mono text-xs text-slate-400 mb-6 uppercase tracking-wide">
          Visualisasi interaktif: bagaimana tampilan, logika, data, dan server bekerja bersama
        </p>
        <ArchitectureVisualizer />
      </div>
    </section>
  )
}
