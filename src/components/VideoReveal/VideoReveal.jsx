import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlay, FiMaximize2 } from 'react-icons/fi'
import './VideoReveal.css'

export default function VideoReveal() {
  const [revealed, setRevealed] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)

  return (
    <section className="video-section">
      <div className="video-orb video-orb-1" />
      <div className="video-orb video-orb-2" />

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="section-eyebrow">🎬 One Last Surprise</p>
        <h2 className="section-title">"One last surprise awaits..."</h2>
        <p className="section-subtitle" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
          Something special prepared just for you
        </p>
      </motion.div>

      <motion.div
        className="video-container glass-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Cinematic bars */}
        <div className="cinematic-bar top" />
        <div className="cinematic-bar bottom" />

        {/* Video placeholder / embed */}
        <div className="video-inner">
          <AnimatePresence>
            {!revealed ? (
              <motion.div
                key="overlay"
                className="video-overlay"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="video-overlay-bg">
                  {/* Film grain effect */}
                  <div className="film-grain" />

                  {/* Film strips */}
                  <div className="film-strip film-strip-left">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="film-hole" />
                    ))}
                  </div>
                  <div className="film-strip film-strip-right">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="film-hole" />
                    ))}
                  </div>
                </div>

                <motion.div
                  className="video-play-area"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.p className="video-pre-text">
                    🎬 Your Special Memory Video
                  </motion.p>
                  <motion.button
                    className="video-play-btn"
                    onClick={() => setRevealed(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(255,110,180,0.4)',
                        '0 0 60px rgba(168,85,247,0.7)',
                        '0 0 20px rgba(255,110,180,0.4)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FiPlay />
                  </motion.button>
                  <p className="video-click-hint">Click to reveal ✨</p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="video"
                className="video-embed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Replace src with actual YouTube/video URL */}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Birthday Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.p
        className="video-note"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        💡 Replace the video URL in VideoReveal.jsx with your personal video
      </motion.p>
    </section>
  )
}
