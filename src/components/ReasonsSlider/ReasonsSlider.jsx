import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import './ReasonsSlider.css'

const REASONS = [
  { id: 1, icon: '😊', title: 'Your Smile', text: 'Your smile lights up every room and warms every heart around you.' },
  { id: 2, icon: '💛', title: 'Your Kindness', text: 'You make people feel valued, seen, and loved without even trying.' },
  { id: 3, icon: '✨', title: 'Your Spirit', text: 'Your kindness is unforgettable — people remember how you made them feel.' },
  { id: 4, icon: '💪', title: 'Your Strength', text: 'You are stronger than you know. Every challenge makes you more beautiful.' },
  { id: 5, icon: '🌟', title: 'Your Presence', text: 'You make life better just by being in it. The world is brighter with you.' },
]

function ReasonCard({ reason, index, active }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [12, -12])
  const rotateY = useTransform(x, [-100, 100], [-12, 12])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  const offset = index - active
  const isActive = offset === 0
  const isPrev = offset === -1
  const isNext = offset === 1

  if (Math.abs(offset) > 2) return null

  return (
    <motion.div
      className="reason-card-wrapper"
      style={{
        scale: isActive ? 1 : 0.85,
        x: offset * 220,
        zIndex: isActive ? 10 : 5 - Math.abs(offset),
        opacity: isActive ? 1 : isPrev || isNext ? 0.5 : 0,
        filter: isActive ? 'none' : 'blur(2px)',
      }}
      animate={{
        scale: isActive ? 1 : 0.85,
        x: offset * 220,
        opacity: isActive ? 1 : Math.abs(offset) === 1 ? 0.5 : 0,
      }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 25 }}
    >
      <motion.div
        className="reason-card glass-card"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={isActive ? { scale: 1.02 } : {}}
      >
        <div className="reason-icon">{reason.icon}</div>
        <h3 className="reason-title">{reason.title}</h3>
        <p className="reason-text">{reason.text}</p>
        <div className="reason-glow" />
      </motion.div>
    </motion.div>
  )
}

export default function ReasonsSlider() {
  const [active, setActive] = useState(0)
  const dragRef = useRef(null)

  const prev = () => setActive(a => Math.max(0, a - 1))
  const next = () => setActive(a => Math.min(REASONS.length - 1, a + 1))

  return (
    <section className="reasons-section">
      <div className="reasons-orb reasons-orb-1" />
      <div className="reasons-orb reasons-orb-2" />

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="section-eyebrow">💝 Made Just For You</p>
        <h2 className="section-title">Reasons Why You're Special ❤️</h2>
      </motion.div>

      <div className="reasons-slider">
        <div className="reasons-cards" ref={dragRef}>
          {REASONS.map((reason, i) => (
            <ReasonCard key={reason.id} reason={reason} index={i} active={active} />
          ))}
        </div>

        {/* Navigation */}
        <div className="reasons-nav">
          <motion.button
            className="reasons-nav-btn btn-glow"
            onClick={prev}
            disabled={active === 0}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>

          <div className="reasons-dots">
            {REASONS.map((_, i) => (
              <motion.button
                key={i}
                className={`reasons-dot ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                animate={{ scale: i === active ? 1.4 : 1 }}
              />
            ))}
          </div>

          <motion.button
            className="reasons-nav-btn btn-glow"
            onClick={next}
            disabled={active === REASONS.length - 1}
            whileTap={{ scale: 0.9 }}
          >
            →
          </motion.button>
        </div>

        {/* Counter */}
        <p className="reasons-counter">{active + 1} / {REASONS.length}</p>
      </div>
    </section>
  )
}
