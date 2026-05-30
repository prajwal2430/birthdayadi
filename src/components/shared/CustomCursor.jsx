import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, { stiffness: 300, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 25 })

  const trailX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const trailY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)
    }
    const onOver = (e) => {
      if (e.target.closest('button, a, [role="button"], input')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [mouseX, mouseY])

  if (!isVisible) return null

  return (
    <div className="custom-cursor" style={{ zIndex: 99999 }}>
      {/* Trail */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          position: 'fixed',
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid rgba(255,110,180,0.4)',
          pointerEvents: 'none',
          scale: isHovering ? 2 : 1,
          transition: 'scale 0.2s ease',
        }}
      />
      {/* Main Heart Cursor */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          position: 'fixed',
          top: -10,
          left: -10,
          pointerEvents: 'none',
          fontSize: isHovering ? '1.4rem' : '1rem',
          filter: 'drop-shadow(0 0 8px rgba(255,110,180,0.9))',
          transition: 'font-size 0.2s ease',
        }}
      >
        ❤️
      </motion.div>
    </div>
  )
}
