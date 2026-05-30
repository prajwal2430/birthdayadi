import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import './CountdownTimer.css'

// 🎂 Set your birthday target date here
const BIRTHDAY = new Date('2026-05-31T00:00:00')

function getTimeLeft() {
  const now = new Date()
  let diff = BIRTHDAY - now
  if (diff < 0) diff = 0
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function launchCelebration() {
  const colors = ['#ff6eb4', '#a855f7', '#f5c842', '#f43f5e', '#818cf8', '#60efff']
  
  // Initial burst
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors,
  })

  // Firecrackers / side streams for 4 seconds
  const end = Date.now() + 4000
  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}

function TimeCard({ label, value }) {
  const prev = String(value).padStart(2, '0')

  return (
    <motion.div
      className="cd-card glass-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className="cd-glow" />
      <motion.div
        key={value}
        className="cd-value"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {prev}
      </motion.div>
      <div className="cd-label">{label}</div>
    </motion.div>
  )
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(t)
  }, [])

  const isBirthday = Object.values(time).every(v => v === 0)

  // Launch fireworks on load when it is the birthday!
  useEffect(() => {
    if (isBirthday) {
      launchCelebration()
    }
  }, [isBirthday])

  return (
    <section className="countdown-section">
      {/* Background particles */}
      <div className="cd-particles">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="cd-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 3,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <motion.div
        className="cd-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.p
          className="cd-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ✨ Counting Down To Your Day ✨
        </motion.p>

        <motion.h2
          className="cd-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          {isBirthday ? '🎉 Today is the Day! 🎉' : 'Until Your Birthday'}
        </motion.h2>

        <div className="cd-cards">
          <TimeCard label="Days" value={time.days} />
          <TimeCard label="Hours" value={time.hours} />
          <TimeCard label="Minutes" value={time.minutes} />
          <TimeCard label="Seconds" value={time.seconds} />
        </div>

        {isBirthday && (
          <motion.div
            className="cd-birthday-msg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            🎂 Happy Birthday! 🎂
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
