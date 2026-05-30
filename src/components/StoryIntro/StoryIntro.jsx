import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './StoryIntro.css'

const STORIES = [
  {
    id: 0,
    text: 'Hey Srusti ❤️',
    emoji: '🌹',
    bg: 'linear-gradient(135deg, #1a0a2e 0%, #0d0d1a 50%, #1a0a2e 100%)',
    accent: 'var(--pink)',
  },
  {
    id: 1,
    text: 'Today is not just another day...',
    emoji: '✨',
    bg: 'linear-gradient(135deg, #0d0d1a 0%, #1a0a2e 50%, #0a0a0f 100%)',
    accent: 'var(--purple)',
  },
  {
    id: 2,
    text: "It's the day someone amazing was born ✨",
    emoji: '🌟',
    bg: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a0a 50%, #0a0a0f 100%)',
    accent: 'var(--gold)',
  },
  {
    id: 3,
    text: 'So I made something special just for you 🎁',
    emoji: '💝',
    bg: 'linear-gradient(135deg, #1a0a2e 0%, #0d0d1a 100%)',
    accent: 'var(--pink)',
  },
]

export default function StoryIntro({ onComplete }) {
  const [current, setCurrent] = useState(0)
  const [progresses, setProgresses] = useState(STORIES.map(() => 0))

  const DURATION = 4000

  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const p = Math.min((elapsed / DURATION) * 100, 100)
      setProgresses(prev => prev.map((v, i) => (i === current ? p : i < current ? 100 : 0)))
      if (elapsed >= DURATION) {
        clearInterval(interval)
        advance()
      }
    }, 30)
    return () => clearInterval(interval)
  }, [current])

  const advance = () => {
    if (current < STORIES.length - 1) {
      setCurrent(c => c + 1)
    } else {
      onComplete()
    }
  }

  const story = STORIES[current]

  return (
    <motion.div
      className="story-screen"
      style={{ background: story.bg }}
      onClick={advance}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      {/* Progress Bars */}
      <div className="story-progress">
        {STORIES.map((s, i) => (
          <div key={s.id} className="story-progress-track">
            <motion.div
              className="story-progress-fill"
              style={{ width: `${progresses[i]}%` }}
            />
          </div>
        ))}
      </div>

      {/* Tap hint */}
      <div className="story-tap-hint">Tap to continue →</div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="story-content"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            className="story-emoji"
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {story.emoji}
          </motion.div>

          <motion.h1
            className="story-text"
            style={{ textShadow: `0 0 60px ${story.accent}80` }}
          >
            {story.text}
          </motion.h1>
        </motion.div>
      </AnimatePresence>

      {/* Floating hearts */}
      <div className="story-hearts">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="story-floating-heart"
            style={{ left: `${10 + i * 12}%` }}
            animate={{ y: [0, -80, 0], opacity: [0, 0.6, 0] }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: i * 0.4,
              repeat: Infinity,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Stars */}
      <div className="story-stars">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="story-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${0.5 + Math.random()}rem`,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 3,
              repeat: Infinity,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
