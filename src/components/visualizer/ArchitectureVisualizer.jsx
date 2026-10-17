import { useEffect, useRef, useState, useCallback } from 'react'
import ArchitectureEngine from '../../hooks/architectureEngine'
import { DEFAULT_STORY, DEFAULT_TELEMETRY, LAYER_DETAILS, LAYER_BUTTONS, STEP_BOXES, LEGEND_ITEMS } from '../../lib/archData'
import { onSimulateProject, onFocusLayer } from '../../lib/simBus'
import LayerFilterBar from './LayerFilterBar'
import StoryBar from './StoryBar'
import CanvasStage from './CanvasStage'
import InspectorHUD from './InspectorHUD'
import ActionControls from './ActionControls'

export default function ArchitectureVisualizer() {
  const containerRef = useRef(null)
  const labelsRef = useRef(null)
  const packetTagRef = useRef(null)
  const packetTagTextRef = useRef(null)
  const engineRef = useRef(null)

  const [activeLayer, setActiveLayer] = useState('all')
  const [story, setStory] = useState(DEFAULT_STORY)
  const [stepTexts, setStepTexts] = useState(STEP_BOXES.map((s) => s.desc))
  const [activeStep, setActiveStep] = useState(0)
  const [telemetry, setTelemetry] = useState(DEFAULT_TELEMETRY)
  const [inspector, setInspector] = useState(LAYER_DETAILS.all)
  const [logEntries, setLogEntries] = useState(['> Geser kanvas untuk memutar 3D', '> Klik objek atau tombol di bawah'])
  const [packetCount, setPacketCount] = useState(0)

  useEffect(() => {
    const engine = new ArchitectureEngine({
      onLog: (text) => setLogEntries((prev) => [...prev.slice(-5), `> ${text}`]),
      onPacketCount: (n) => setPacketCount(n),
      onInspector: (info) => setInspector(info),
      onStory: ({ headline, explanation, badgeClass }) =>
        setStory({ headline, explanation, badgeClass: badgeClass || 'text-database' }),
      onStep: (activeStepNumber, texts) => {
        setActiveStep(activeStepNumber)
        if (texts) setStepTexts(texts)
      },
      onTelemetry: (t) => setTelemetry(t),
    })
    engineRef.current = engine

    const disposeEngine = engine.init(containerRef.current, {
      labels: labelsRef.current,
      packetTag: packetTagRef.current,
      packetTagText: packetTagTextRef.current,
    })

    // Trigger simulation from Project cards (scroll to visualizer, then run)
    const unsubscribe = onSimulateProject((event) => {
      document.getElementById('visualizer')?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => engine.triggerWorkload(event.detail), 450)
    })

    // Focus a layer from Skills cards (mirror the filter bar behavior)
    const unsubscribeLayer = onFocusLayer((event) => {
      const key = event.detail
      setActiveLayer(key)
      engine.focusLayer(key)
    })

    return () => {
      unsubscribe()
      unsubscribeLayer()
      disposeEngine()
      engineRef.current = null
    }
  }, [])

  const handleFocusLayer = useCallback((key) => {
    engineRef.current?.focusLayer(key)
  }, [])

  const handleResetView = useCallback(() => {
    setActiveLayer('all')
    engineRef.current?.resetView()
  }, [])

  return (
    <div className="rounded-2xl overflow-hidden border-2 border-slate-700 shadow-[8px_8px_0px_#0F172A]">
      {/* Layer Filter Buttons (Top Overlay inside Canvas area) */}
      <LayerFilterBar
        layers={LAYER_BUTTONS}
        activeLayer={activeLayer}
        onFocus={(key) => {
          setActiveLayer(key)
          handleFocusLayer(key)
        }}
        onReset={handleResetView}
      />

      {/* Step-by-Step Simple Story Bar (Easy Explanation for Anyone) */}
      <StoryBar story={story} stepBoxes={STEP_BOXES} stepTexts={stepTexts} activeStep={activeStep} />

      {/* Three.js Canvas Container */}
      <CanvasStage
        containerRef={containerRef}
        labelsRef={labelsRef}
        packetTagRef={packetTagRef}
        packetTagTextRef={packetTagTextRef}
        legendItems={LEGEND_ITEMS}
        logEntries={logEntries}
        packetCount={packetCount}
      />

      {/* Inspector HUD (live component detail panel) */}
      <InspectorHUD inspector={inspector} telemetry={telemetry} />

      {/* Simulation Action Controls Bar (Bottom of Card) */}
      <ActionControls onSelectWorkload={(type) => engineRef.current?.triggerWorkload(type)} />
    </div>
  )
}
