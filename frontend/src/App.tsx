import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Home } from '@/pages/Home'
import { Studio } from '@/pages/Studio'
import { Materials } from '@/pages/Materials'
import { Designs } from '@/pages/Designs'
import { Impact } from '@/pages/Impact'
import { Demo } from '@/pages/Demo'
import { useProjectStore } from '@/stores/projectStore'
import { useEffect } from 'react'

function App() {
  const { loadProjects } = useProjectStore()

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  return (
    <Router>
      <div className="min-h-screen bg-ivory">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/designs" element={<Designs />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
