// Tiny event bus so non-visualizer sections (e.g. Projects) can trigger 3D simulations
export function simulateProjectIn3D(workloadType) {
  window.dispatchEvent(new CustomEvent('portofolio:simulate', { detail: workloadType }))
}

export function focusLayerFromCard(layerKey) {
  simulateProjectIn3D('api_cache')
  window.dispatchEvent(new CustomEvent('portofolio:focus-layer', { detail: layerKey }))
}

export function onFocusLayer(handler) {
  window.addEventListener('portofolio:focus-layer', handler)
  return () => window.removeEventListener('portofolio:focus-layer', handler)
}

export function onSimulateProject(handler) {
  window.addEventListener('portofolio:simulate', handler)
  return () => window.removeEventListener('portofolio:simulate', handler)
}
