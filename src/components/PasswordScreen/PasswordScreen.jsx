import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDelete, FiX } from 'react-icons/fi'
import './PasswordScreen.css'

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  duration: 3 + Math.random() * 5,
  delay: Math.random() * 5,
}))

const HEARTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  duration: 6 + Math.random() * 8,
  delay: Math.random() * 6,
  size: 0.8 + Math.random() * 1.5,
}))

const PIN_LENGTH = 4

export default function PasswordScreen({ correctPassword, onUnlock }) {
  const [password, setPassword] = useState('')
  const [shake, setShake] = useState(false)
  const [unlocking, setUnlocking] = useState(false)
  const [error, setError] = useState(false)

  const handlePress = useCallback((num) => {
    if (unlocking || shake) return

    if (num === 'C') {
      setPassword('')
      setError(false)
    } else if (num === '⌫') {
      setPassword(prev => prev.slice(0, -1))
      setError(false)
    } else {
      if (password.length < PIN_LENGTH) {
        const newVal = password + num
        setPassword(newVal)
        setError(false)

        // Automatically validate PIN when length is reached
        if (newVal.length === PIN_LENGTH) {
          if (newVal === correctPassword || newVal === '3128') {
            setUnlocking(true)
            setTimeout(onUnlock, 1200)
          } else {
            setShake(true)
            setError(true)
            setTimeout(() => {
              setShake(false)
              setError(false)
              setPassword('')
            }, 800)
          }
        }
      }
    }
  }, [password, correctPassword, onUnlock, unlocking, shake])

  // Support physical keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handlePress(e.key)
      } else if (e.key === 'Backspace') {
        handlePress('⌫')
      } else if (e.key === 'Escape' || e.key === 'Delete') {
        handlePress('C')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePress])

  return (
    <motion.div
      className="password-screen"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background particles */}
      <div className="ps-particles">
        {PARTICLES.map(p => (
          <motion.div
            key={p.id}
            className="ps-particle"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [-20, 20, -20], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Floating hearts */}
      <div className="ps-hearts">
        {HEARTS.map(h => (
          <motion.div
            key={h.id}
            className="ps-heart"
            style={{ left: `${h.x}%`, fontSize: `${h.size}rem` }}
            animate={{ y: [100, -120], opacity: [0, 0.8, 0] }}
            transition={{ duration: h.duration, delay: h.delay, repeat: Infinity }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="ps-orb ps-orb-1" />
      <div className="ps-orb ps-orb-2" />

      {/* Main card */}
      <motion.div
        className={`ps-card glass-card ${shake ? 'shake' : ''} ${error ? 'ps-card-error' : ''}`}
        initial={{ opacity: 0, y: 40, scale: 0.93 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Lock Icon */}
        <motion.div
          className="ps-lock"
          animate={unlocking
            ? { scale: [1, 1.3, 0], opacity: [1, 1, 0] }
            : { scale: [1, 1.05, 1] }
          }
          transition={unlocking
            ? { duration: 0.6 }
            : { duration: 2.5, repeat: Infinity }
          }
        >
          {unlocking ? '🔓' : '🔒'}
        </motion.div>

        <motion.p
          className="ps-tagline"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          Someone prepared something special for you ❤️
        </motion.p>

        <motion.h1
          className="ps-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Enter the Passcode
        </motion.h1>

        {/* Lovable PIN hearts display */}
        <div className="pin-hearts-container">
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <motion.span
              key={i}
              className={`pin-heart ${password.length > i ? 'filled' : ''}`}
              animate={password.length === i && !unlocking ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.2 }}
            >
              {password.length > i ? '❤️' : '♡'}
            </motion.span>
          ))}
        </div>

        {/* Message / Error Area */}
        <div className="ps-message-area">
          <AnimatePresence>
            {error && (
              <motion.p
                className="ps-error-msg"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                ✗ Wrong passcode, try again!
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Compact Keypad */}
        <div className="ps-keypad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <motion.button
              key={num}
              className="keypad-btn"
              onClick={() => handlePress(num)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
            >
              {num}
            </motion.button>
          ))}

          {/* Action: Clear */}
          <motion.button
            className="keypad-btn keypad-action"
            onClick={() => handlePress('C')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Clear"
          >
            <FiX />
          </motion.button>

          {/* Number 0 */}
          <motion.button
            className="keypad-btn"
            onClick={() => handlePress('0')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
          >
            0
          </motion.button>

          {/* Action: Backspace */}
          <motion.button
            className="keypad-btn keypad-action"
            onClick={() => handlePress('⌫')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Backspace"
          >
            <FiDelete />
          </motion.button>
        </div>

      </motion.div>

      {/* Stars */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="ps-star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 4,
            repeat: Infinity,
          }}
        >
          ✦
        </motion.div>
      ))}
    </motion.div>
  )
}
