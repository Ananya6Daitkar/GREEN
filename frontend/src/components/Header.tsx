import { Link, useLocation } from 'react-router-dom'
import { Menu, LogOut, Download } from 'lucide-react'
import { useState } from 'react'

export const Header = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Studio', path: '/studio' },
    { label: 'Materials', path: '/materials' },
    { label: 'Designs', path: '/designs' },
    { label: 'Impact', path: '/impact' },
    { label: 'Demo', path: '/demo' },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-serif font-bold text-xl">
          <div className="w-8 h-8 bg-forest rounded flex items-center justify-center text-ivory text-sm">M</div>
          <span className="text-forest">MATERRA</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-semibold transition-colors ${
                isActive(item.path)
                  ? 'text-forest'
                  : 'text-charcoal hover:text-forest'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="btn-icon">
            <Download className="w-5 h-5" />
          </button>
          <button className="btn-icon">
            <LogOut className="w-5 h-5" />
          </button>
          <button className="bg-forest text-ivory px-4 py-2 rounded font-semibold text-sm hover:bg-charcoal transition-colors">
            Run Optimization →
          </button>
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col divide-y">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-6 py-3 text-sm font-semibold hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
