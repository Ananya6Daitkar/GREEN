import { Link } from 'react-router-dom'
import { Play, ArrowRight, Leaf, Zap, TrendingDown, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'

export const Home = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="bg-ivory">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ivory via-white to-citron/20">
        {/* Background image placeholder - in production use real architectural photo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-timber rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-forest mb-6 leading-tight">
              WASTE IS NOT<br />THE END OF<br />THE DESIGN.
            </h1>
            <p className="text-2xl md:text-3xl text-charcoal mb-8 font-light">
              It's where MATERRA begins.
            </p>
            <p className="text-lg md:text-xl text-charcoal/80 mb-12 max-w-2xl mx-auto">
              Turn reclaimed timber into feasible new designs through material intelligence, adaptive optimization, and environmental evidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/studio"
              className="btn-primary text-lg flex items-center gap-2 group"
            >
              Enter the Studio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="btn-secondary text-lg flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch the Transformation
            </button>
          </motion.div>

          {/* Value Props */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Leaf, label: 'Circular Design', desc: 'From existing materials' },
              { icon: TrendingDown, label: 'Damage-Aware', desc: 'Adaptive redesign' },
              { icon: Zap, label: 'Lower Environmental', desc: 'Footprint' },
              { icon: Wrench, label: 'Real Optimization', desc: 'Feasible builds' },
            ].map((prop, i) => {
              const Icon = prop.icon
              return (
                <motion.div
                  key={i}
                  variants={item}
                  className="bg-white/60 backdrop-blur rounded-lg p-6 border border-white/40"
                >
                  <Icon className="w-8 h-8 text-forest mx-auto mb-3" />
                  <h3 className="font-serif font-bold text-sm text-forest mb-1">{prop.label}</h3>
                  <p className="text-xs text-charcoal/70">{prop.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-5xl font-bold text-forest mb-4 text-center">
            How MATERRA Works
          </h2>
          <p className="text-center text-charcoal/70 mb-16 text-lg">
            From reclaimed material to a new, feasible design in three intelligent steps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Trust',
                description: 'Understand the material, its condition, and its real constraints.',
                icon: '🔍',
              },
              {
                step: '02',
                title: 'Regenerate',
                description: 'Mark damage. Solver adapts layout. New design emerges.',
                icon: '♻️',
              },
              {
                step: '03',
                title: 'Evaluate',
                description: 'Compare environmental impact with transparent assumptions.',
                icon: '📊',
              },
            ].map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{section.icon}</div>
                <h3 className="font-serif text-2xl font-bold text-forest mb-2">{section.title}</h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">{section.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guided Demo CTA */}
      <section className="py-24 px-6 bg-forest text-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <Play className="w-16 h-16 mx-auto mb-6 opacity-70" />
          <h2 className="font-serif text-5xl font-bold mb-6">
            Experience the full MATERRA workflow
          </h2>
          <p className="text-xl mb-8 opacity-90">
            in a 3-minute interactive demo.
          </p>
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 bg-ivory text-forest px-8 py-4 rounded font-bold text-lg hover:bg-citron transition-colors"
          >
            Start Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold text-forest mb-6">
            The next great design may already exist.
          </h2>
          <p className="text-lg text-charcoal/70 mb-12">
            It's waiting in your reclaimed timber. MATERRA helps you find it.
          </p>
          <Link
            to="/studio"
            className="btn-primary text-lg inline-flex items-center gap-2"
          >
            Begin Your Design
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
