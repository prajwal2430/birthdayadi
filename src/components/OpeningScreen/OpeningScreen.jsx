import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './OpeningScreen.css'

const HEARTS = Array.from({length:16},(_,i)=>({id:i,x:Math.random()*100,dur:5+Math.random()*6,delay:Math.random()*5,size:0.9+Math.random()*1.4}))
const STARS  = Array.from({length:24},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,dur:2+Math.random()*3,delay:Math.random()*4,size:0.6+Math.random()*1}))

export default function OpeningScreen({ onDone }) {
  const [step, setStep] = useState(0)
  // Step 0 → line1 appears, step 1 → line2 appears, step 2 → button appears

  useEffect(() => {
    const t1 = setTimeout(()=>setStep(1), 2200)
    const t2 = setTimeout(()=>setStep(2), 4500)
    return ()=>{ clearTimeout(t1); clearTimeout(t2) }
  },[])

  return (
    <motion.div className="os-wrap" exit={{ opacity:0, scale:0.97 }} transition={{ duration:0.8 }}>
      {/* Ambient orbs */}
      <div className="os-orb os-o1"/><div className="os-orb os-o2"/><div className="os-orb os-o3"/>

      {/* Stars */}
      {STARS.map(s=>(
        <motion.span key={s.id} className="os-star"
          style={{left:`${s.x}%`,top:`${s.y}%`,fontSize:`${s.size}rem`}}
          animate={{opacity:[0,1,0],scale:[0.5,1.4,0.5]}}
          transition={{duration:s.dur,delay:s.delay,repeat:Infinity}}
        >✦</motion.span>
      ))}

      {/* Floating hearts */}
      <div className="os-hearts">
        {HEARTS.map(h=>(
          <motion.div key={h.id} className="os-heart"
            style={{left:`${h.x}%`,fontSize:`${h.size}rem`}}
            animate={{y:[60,-(window.innerHeight+60)],opacity:[0,0.7,0]}}
            transition={{duration:h.dur,delay:h.delay,repeat:Infinity,ease:'easeOut'}}
          >{'❤️'}</motion.div>
        ))}
      </div>

      {/* Central content */}
      <div className="os-center">
        {/* Blossom icon */}
        <motion.div className="os-icon"
          initial={{scale:0,opacity:0}}
          animate={{scale:1,opacity:1}}
          transition={{duration:1,ease:[0.34,1.56,0.64,1]}}
        >
          <motion.span animate={{rotate:[0,10,-10,0]}} transition={{duration:4,repeat:Infinity,ease:'easeInOut'}}>🌸</motion.span>
        </motion.div>

        {/* Line 1 */}
        <AnimatePresence>
          {step >= 0 && (
            <motion.h1 key="l1" className="os-line1"
              initial={{opacity:0,y:30}}
              animate={{opacity:1,y:0}}
              transition={{duration:0.9,ease:'easeOut'}}
            >
              "Before your birthday ends,
              <br/>I want you to know something..."
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Line 2 */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.p key="l2" className="os-line2"
              initial={{opacity:0,y:24}}
              animate={{opacity:1,y:0}}
              transition={{duration:0.9}}
            >
              You are the most beautiful part of my life, Srusti ❤️
            </motion.p>
          )}
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.button key="btn" className="os-btn glow-btn"
              initial={{opacity:0,scale:0.85,y:20}}
              animate={{opacity:1,scale:1,y:0}}
              transition={{duration:0.7,type:'spring',stiffness:180}}
              onClick={onDone}
              whileHover={{scale:1.05}}
              whileTap={{scale:0.95}}
            >
              Continue the journey ✨
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Soft vignette */}
      <div className="os-vignette"/>
    </motion.div>
  )
}
