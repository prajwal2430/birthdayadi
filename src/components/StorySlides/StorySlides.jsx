import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './StorySlides.css'

const SLIDES = [
  { id:0, emoji:'🌙', line:'Some people come into our lives and change everything.' },
  { id:1, emoji:'✨', line:'You made ordinary days feel extraordinary.' },
  { id:2, emoji:'💌', line:'Your smile is my favorite notification.' },
  { id:3, emoji:'🌸', line:'Every memory with you became a treasure I hold close.' },
  { id:4, emoji:'🌹', line:'And today, I just want you to know how deeply you are loved.' },
]

export default function StorySlides() {
  const [idx, setIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const DURATION = 4500

  useEffect(() => {
    setProgress(0)
    const start = Date.now()
    const iv = setInterval(() => {
      const p = Math.min(((Date.now()-start)/DURATION)*100, 100)
      setProgress(p)
      if (p >= 100) {
        clearInterval(iv)
        if (idx < SLIDES.length-1) setTimeout(()=>setIdx(i=>i+1), 150)
      }
    }, 30)
    return ()=>clearInterval(iv)
  }, [idx])

  const s = SLIDES[idx]

  return (
    <section className="ss-section">
      {/* Progress bars */}
      <div className="ss-bars">
        {SLIDES.map((sl,i)=>(
          <div key={sl.id} className="ss-bar-track">
            <motion.div className="ss-bar-fill"
              style={{ width: i<idx?'100%': i===idx?`${progress}%`:'0%' }}
            />
          </div>
        ))}
      </div>

      {/* Ambient */}
      <div className="ss-orb ss-o1"/><div className="ss-orb ss-o2"/>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div key={idx} className="ss-content"
          initial={{opacity:0,scale:0.94,y:28}}
          animate={{opacity:1,scale:1,y:0}}
          exit={{opacity:0,scale:1.04,y:-20}}
          transition={{duration:0.6,ease:'easeOut'}}
        >
          <motion.div className="ss-emoji"
            animate={{y:[0,-12,0],rotate:[0,5,-5,0]}}
            transition={{duration:4,repeat:Infinity,ease:'easeInOut'}}
          >{s.emoji}</motion.div>

          <p className="ss-line">{s.line}</p>

          <div className="ss-counter">{idx+1} / {SLIDES.length}</div>
        </motion.div>
      </AnimatePresence>

      {/* Floating hearts */}
      <div className="ss-hearts">
        {Array.from({length:8}).map((_,i)=>(
          <motion.div key={i} className="ss-fheart"
            style={{left:`${10+i*11}%`}}
            animate={{y:[0,-300],opacity:[0,0.6,0]}}
            transition={{duration:4+Math.random()*3,delay:i*0.6,repeat:Infinity,repeatDelay:1}}
          >❤️</motion.div>
        ))}
      </div>

      {/* Stars */}
      {Array.from({length:16}).map((_,i)=>(
        <motion.span key={i} className="ss-star"
          style={{left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,fontSize:`${0.5+Math.random()*.9}rem`}}
          animate={{opacity:[0,1,0],scale:[0.5,1.3,0.5]}}
          transition={{duration:2+Math.random()*3,delay:Math.random()*4,repeat:Infinity}}
        >✦</motion.span>
      ))}
    </section>
  )
}
