import Navbar from '../visualizer/Navbar'
import ContactFooter from '../visualizer/ContactFooter'

export default function PortfolioLayout({ children }) {
  return (
    <div className="min-h-screen bg-paper text-ink font-display antialiased">
      <Navbar />
      <main id="about">{children}</main>
      <ContactFooter />
    </div>
  )
}
