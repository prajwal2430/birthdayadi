import { motion } from 'framer-motion'
import './FloatingNotes.css'

const NOTES = [
  { id: 1, text: 'You make ordinary days special ❤️', rotate: -8, x: '5%', y: '10%', delay: 0 },
  { id: 2, text: 'Your smile changes everything ✨', rotate: 5, x: '70%', y: '5%', delay: 0.5 },
  { id: 3, text: 'Thank you for existing 💕', rotate: -3, x: '80%', y: '55%', delay: 1.0 },
  { id: 4, text: 'You are someone truly magical 🌙', rotate: 7, x: '10%', y: '65%', delay: 1.5 },
  { id: 5, text: 'The world is better because you are in it 🌸', rotate: -5, x: '40%', y: '80%', delay: 2.0 },
  { id: 6, text: 'Your kindness is a superpower 💫', rotate: 4, x: '55%', y: '30%', delay: 2.5 },
]

const floatVariants = {
  animate: (i) => ({
    y: [0, -18, 0, -12, 0],
    rotate: [0, 1, -1, 0.5, 0],
    transition: {
      duration: 5 + i,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
}

export default function FloatingNotes() {
  return (
    <section className="notes-section">
      <div className="notes-orb notes-orb-1" />
      <div className="notes-orb notes-orb-2" />

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 10 }}
      >
        <p className="section-eyebrow">💌 Little Reminders</p>
        <h2 className="section-title">Notes From the Heart</h2>
      </motion.div>

      <div className="notes-container">
        {NOTES.map((note, i) => (
          <motion.div
            key={note.id}
            className="note-card"
            style={{
              left: note.x,
              top: note.y,
              rotate: note.rotate,
            }}
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: note.delay }}
            viewport={{ once: true }}
            custom={i}
            variants={floatVariants}
            animate="animate"
            whileHover={{ scale: 1.08, zIndex: 50, rotate: 0 }}
          >
            <div className="note-pin" />
            <p className="note-text">{note.text}</p>
            <div className="note-lines">
              <div className="note-line" />
              <div className="note-line" />
              <div className="note-line" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating hearts ambient */}
      <div className="notes-hearts">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="notes-heart"
            style={{ left: `${Math.random() * 100}%`, bottom: '-20px' }}
            animate={{ y: [0, -500], opacity: [0, 0.5, 0] }}
            transition={{
              duration: 6 + Math.random() * 4,
              delay: Math.random() * 8,
              repeat: Infinity,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </section>
  )
}
