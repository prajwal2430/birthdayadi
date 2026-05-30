import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import './BirthdayCake.css'

const NUM_CANDLES = 5

function launchFireworks() {
  const colors = ['#ff6eb4', '#a855f7', '#f5c842', '#f43f5e', '#818cf8', '#60efff']
  const duration = 3000
  const end = Date.now() + duration

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}

export default function BirthdayCake() {
  const [blown, setBlown] = useState(false)

  const blowCandles = useCallback(() => {
    if (blown) return
    setBlown(true)
    setTimeout(launchFireworks, 500)
  }, [blown])

  return (
    <section className="cake-section">
      <div className="cake-orb cake-orb-1" />
      <div className="cake-orb cake-orb-2" />

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="section-eyebrow">🎂 Make a Wish</p>
        <h2 className="section-title">
          {blown ? 'Wish Made! 🌟' : 'Blow Out the Candles'}
        </h2>
      </motion.div>

      <div className="cake-stage">
        <motion.div
          className="cake-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Candles */}
          <div className="cake-candles">
            {Array.from({ length: NUM_CANDLES }).map((_, i) => (
              <div key={i} className="candle-wrapper">
                {/* Flame */}
                <AnimatePresence>
                  {!blown && (
                    <motion.div
                      className="candle-flame"
                      initial={{ scale: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                    >
                      <div className="flame-outer" />
                      <div className="flame-inner" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Candle body */}
                <div
                  className="candle-body"
                  style={{ background: [`#ff6eb4`, `#a855f7`, `#f5c842`, `#f43f5e`, `#60efff`][i] }}
                />
                {/* Smoke after blown */}
                {blown && (
                  <motion.div
                    className="candle-smoke"
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -40 }}
                    transition={{ duration: 1.5 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Cake body */}
          <div className="cake-body">
            {/* Top tier */}
            <div className="cake-tier cake-tier-top">
              <div className="cake-frosting cake-frosting-top" />
              <div className="cake-layer" style={{ background: 'linear-gradient(to bottom, #fce4ec, #f48fb1)' }}>
                <span className="cake-decoration">🌸 🎂 🌸</span>
              </div>
            </div>

            {/* Bottom tier */}
            <div className="cake-tier cake-tier-bottom">
              <div className="cake-frosting cake-frosting-bottom" />
              <div className="cake-layer cake-layer-bottom" style={{ background: 'linear-gradient(to bottom, #e8d5ff, #c084fc)' }}>
                <span className="cake-decoration">💜 Happy Birthday 💜</span>
              </div>
            </div>

            {/* Plate */}
            <div className="cake-plate" />
          </div>

          {/* Glow */}
          {!blown && (
            <div className="cake-glow" />
          )}
        </motion.div>

        {/* Button */}
        <AnimatePresence>
          {!blown ? (
            <motion.button
              className="cake-btn btn-glow"
              onClick={blowCandles}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.5 }}
            >
              💨 Blow Candles!
            </motion.button>
          ) : (
            <motion.div
              className="cake-wish-msg glass-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
            >
              <p className="cake-wish-emoji">🎊</p>
              <h3 className="cake-wish-title">Your Wish is Coming True!</h3>
              <p className="cake-wish-text">
                May this year bring you everything your heart desires.
                You deserve the absolute best! 🌟
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Firework symbols */}
        {blown && (
          <div className="cake-fireworks">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="firework-symbol"
                style={{
                  left: `${10 + i * 11}%`,
                  top: `${20 + Math.random() * 40}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
              >
                {['✨', '🎆', '🌟', '💫', '🎇', '⭐', '🌠', '🎑'][i]}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
