import PortfolioLayout from './components/layouts/PortfolioLayout'
import HeroSection from './components/visualizer/HeroSection'
import SkillsSection from './components/visualizer/SkillsSection'
import ProjectsSection from './components/visualizer/ProjectsSection'
import VisualizerSection from './components/visualizer/VisualizerSection'
import ContactFooter from './components/visualizer/ContactFooter'

export default function App() {
  return (
    <PortfolioLayout>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <VisualizerSection />
      <ContactFooter />
    </PortfolioLayout>
  )
}
