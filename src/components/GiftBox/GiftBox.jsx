import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import './GiftBox.css'

function launchConfetti() {
  const colors = ['#ff6eb4', '#a855f7', '#f5c842', '#f43f5e', '#818cf8']

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors,
  })
  setTimeout(() => confetti({
    particleCount: 80,
    angle: 60,
    spread: 60,
    origin: { x: 0, y: 0.6 },
    colors,
  }), 250)
  setTimeout(() => confetti({
    particleCount: 80,
    angle: 120,
    spread: 60,
    origin: { x: 1, y: 0.6 },
    colors,
  }), 400)
}

export default function GiftBox() {
  const [opened, setOpened] = useState(false)
  const [opening, setOpening] = useState(false)

  const handleOpen = useCallback(() => {
    if (opened || opening) return
    setOpening(true)
    setTimeout(() => {
      setOpened(true)
      launchConfetti()
    }, 800)
  }, [opened, opening])

  return (
    <section className="gift-section">
      <div className="gift-orb gift-orb-1" />
      <div className="gift-orb gift-orb-2" />

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="section-eyebrow">🎁 A Surprise Awaits</p>
        <h2 className="section-title">Click to Open Your Gift</h2>
      </motion.div>

      <div className="gift-stage">
        {/* Gift Box */}
        <motion.div
          className="gift-box-wrapper"
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
          viewport={{ once: true }}
          onClick={handleOpen}
          style={{ cursor: opened ? 'default' : 'pointer' }}
        >
          <motion.div
            className="gift-box"
            animate={opening ? {
              scale: [1, 1.05, 1, 1.1, 0],
              rotate: [0, -5, 5, -3, 0],
            } : {
              y: [0, -8, 0],
            }}
            transition={opening ? { duration: 0.8 } : { duration: 2.5, repeat: Infinity }}
            whileHover={!opened ? { scale: 1.05 } : {}}
          >
            {/* Box bottom */}
            <div className="gift-bottom">
              <div className="gift-ribbon-v" />
              <div className="gift-bow-base" />
            </div>

            {/* Box lid */}
            <motion.div
              className="gift-lid"
              animate={opening ? { rotateX: -180, y: -60 } : {}}
              transition={{ duration: 0.6 }}
              style={{ transformOrigin: 'center bottom' }}
            >
              <div className="gift-ribbon-h" />
              <div className="gift-bow">
                <div className="gift-bow-left" />
                <div className="gift-bow-center" />
                <div className="gift-bow-right" />
              </div>
            </motion.div>

            <div className="gift-glow" />
          </motion.div>

          {!opened && !opening && (
            <motion.p
              className="gift-hint"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎁 Click to open!
            </motion.p>
          )}
        </motion.div>

        {/* Revealed Message */}
        <AnimatePresence>
          {opened && (
            <motion.div
              className="gift-message glass-card"
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', delay: 0.3 }}
            >
              <div className="gift-msg-hearts">
                {['❤️', '💕', '💝', '🌸', '✨'].map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {h}
                  </motion.span>
                ))}
              </div>
              <h3 className="gift-msg-title">Happy Birthday Srusti</h3>
              <p className="gift-msg-subtitle">My Favorite Person ❤️</p>
              <p className="gift-msg-text">
                You deserve all the joy, love, and magic in the world.
                Today and every day — you are truly cherished.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating hearts burst */}
        <AnimatePresence>
          {opened && Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="gift-heart-burst"
              style={{ left: `${20 + Math.random() * 60}%` }}
              initial={{ opacity: 0, y: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], y: -200 + Math.random() * -100, scale: 1.5 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            >
              {['❤️', '💕', '✨', '🌸'][i % 4]}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
