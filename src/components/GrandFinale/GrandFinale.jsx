import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import './GrandFinale.css'

const BALLOONS = [
  { id: 1, emoji: '🎈', color: '#ff6eb4', delay: 0, x: 10 },
  { id: 2, emoji: '🎈', color: '#a855f7', delay: 0.5, x: 25 },
  { id: 3, emoji: '🎈', color: '#f5c842', delay: 1.0, x: 70 },
  { id: 4, emoji: '🎈', color: '#60efff', delay: 1.5, x: 85 },
  { id: 5, emoji: '🎈', color: '#f43f5e', delay: 0.8, x: 50 },
  { id: 6, emoji: '🎈', color: '#818cf8', delay: 1.2, x: 40 },
]

const SPARKLE_POSITIONS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 0.5 + Math.random() * 1.5,
  delay: Math.random() * 4,
}))

function useFinaleConfetti(triggered) {
  useEffect(() => {
    if (!triggered) return

    const colors = ['#ff6eb4', '#a855f7', '#f5c842', '#f43f5e', '#818cf8', '#60efff', '#34d399']

    // Initial burst
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, colors })

    // Side streams
    setTimeout(() => {
      confetti({ particleCount: 80, angle: 60, spread: 80, origin: { x: 0, y: 0.6 }, colors })
      confetti({ particleCount: 80, angle: 120, spread: 80, origin: { x: 1, y: 0.6 }, colors })
    }, 400)

    // Continuous rain
    const interval = setInterval(() => {
      confetti({
        particleCount: 4,
        spread: 120,
        origin: { x: Math.random(), y: 0 },
        colors,
        gravity: 0.6,
      })
    }, 200)

    setTimeout(() => clearInterval(interval), 8000)
    return () => clearInterval(interval)
  }, [triggered])
}

export default function GrandFinale() {
  const [triggered, setTriggered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTimeout(() => setTriggered(true), 500)
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [triggered])

  useFinaleConfetti(triggered)

  return (
    <section className="finale-section" ref={ref}>
      {/* Ambient gradient orbs */}
      <div className="finale-orb finale-orb-1" />
      <div className="finale-orb finale-orb-2" />
      <div className="finale-orb finale-orb-3" />

      {/* Sparkles */}
      <div className="finale-sparkles">
        {SPARKLE_POSITIONS.map(s => (
          <motion.div
            key={s.id}
            className="finale-sparkle"
            style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: `${s.size}rem` }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0], rotate: [0, 180, 360] }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: s.delay,
              repeat: Infinity,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* Balloons */}
      <AnimatePresence>
        {triggered && BALLOONS.map(b => (
          <motion.div
            key={b.id}
            className="finale-balloon"
            style={{ left: `${b.x}%`, color: b.color }}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: '-120vh', opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: b.delay,
              ease: 'easeOut',
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            🎈
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating hearts */}
      <div className="finale-hearts">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="finale-heart"
            style={{ left: `${Math.random() * 100}%` }}
            animate={{
              y: [0, -window.innerHeight * 1.2],
              opacity: [0, 0.8, 0],
              x: [0, Math.random() * 60 - 30],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              delay: Math.random() * 6,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
          >
            {['❤️', '💕', '🌸', '✨', '💖'][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="finale-content">
        <motion.div
          className="finale-top-text"
          initial={{ opacity: 0, y: -20 }}
          animate={triggered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="finale-emoji-row">🎊 🎉 🎂 🎉 🎊</span>
        </motion.div>

        {/* Main title — staggered letter reveal */}
        <div className="finale-title-wrapper">
          {'HAPPY BIRTHDAY'.split('').map((char, i) => (
            <motion.span
              key={i}
              className={`finale-letter ${char === ' ' ? 'space' : ''}`}
              initial={{ opacity: 0, y: 60, scale: 0.5 }}
              animate={triggered ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.06,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Heart */}
        <motion.div
          className="finale-heart-icon"
          initial={{ scale: 0, opacity: 0 }}
          animate={triggered ? {
            scale: [0, 1.5, 1, 1.2, 1],
            opacity: 1,
          } : {}}
          transition={{ duration: 1, delay: 1.5 }}
        >
          ❤️
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="finale-subtext"
          initial={{ opacity: 0, y: 30 }}
          animate={triggered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          You are loved more than words can say.
        </motion.p>

        <motion.p
          className="finale-subtext-2"
          initial={{ opacity: 0, y: 20 }}
          animate={triggered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.1 }}
        >
          Today and every day, Srusti — you are someone truly extraordinary.
          The world is infinitely more beautiful because of you. ✨
        </motion.p>

        {/* Bottom emojis */}
        <motion.div
          className="finale-bottom-emojis"
          initial={{ opacity: 0 }}
          animate={triggered ? { opacity: 1 } : {}}
          transition={{ delay: 2.4 }}
        >
          {['🌸', '💝', '🌟', '✨', '💖', '🌸'].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -12, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, delay: i * 0.3 }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>

        {/* Footer signature */}
        <motion.p
          className="finale-signature"
          initial={{ opacity: 0 }}
          animate={triggered ? { opacity: 0.5 } : {}}
          transition={{ delay: 3 }}
        >
          Made with love for Srusti 💕
        </motion.p>
      </div>
    </section>
  )
}
