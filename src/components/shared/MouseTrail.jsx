import { useState, useEffect, useRef } from 'react'

const COLORS = ['#ff6eb4', '#a855f7', '#f5c842', '#f43f5e', '#818cf8']

export default function MouseTrail() {
  const [particles, setParticles] = useState([])
  const idRef = useRef(0)

  useEffect(() => {
    let lastX = 0, lastY = 0
    const onMove = (e) => {
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      if (Math.abs(dx) + Math.abs(dy) < 6) return
      lastX = e.clientX
      lastY = e.clientY

      const id = idRef.current++
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      setParticles(prev => [...prev.slice(-20), {
        id, x: e.clientX, y: e.clientY, color,
        size: 4 + Math.random() * 6,
      }])

      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id))
      }, 700)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99998 }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animation: 'trailFade 0.7s ease-out forwards',
            pointerEvents: 'none',
          }}
        />
      ))}
      <style>{`
        @keyframes trailFade {
          0% { opacity: 0.9; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0) translateY(-20px); }
        }
      `}</style>
    </div>
  )
}
