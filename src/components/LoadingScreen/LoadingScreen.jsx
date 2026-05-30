import { motion } from 'framer-motion'
import './LoadingScreen.css'

export default function LoadingScreen() {
  return (
    <motion.div className="ls-wrap" exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: 0.7 }}>
      <div className="ls-orb ls-o1" /><div className="ls-orb ls-o2" /><div className="ls-orb ls-o3" />

      {Array.from({length:18}).map((_,i)=>(
        <motion.span key={i} className="ls-star"
          style={{ left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, fontSize:`${0.5+Math.random()*1}rem` }}
          animate={{ opacity:[0,1,0], scale:[0.5,1.3,0.5] }}
          transition={{ duration:2+Math.random()*2, delay:Math.random()*3, repeat:Infinity }}
        >✦</motion.span>
      ))}

      <motion.div className="ls-content"
        initial={{ opacity:0, y:30 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.9, delay:0.2 }}
      >
        <motion.div className="ls-heart"
          animate={{ scale:[1,1.25,1] }}
          transition={{ duration:1.4, repeat:Infinity, ease:'easeInOut' }}
        >🌸</motion.div>

        <h1 className="ls-title">Just a moment...</h1>

        <div className="ls-dots">
          {[0,1,2].map(i=>(
            <motion.span key={i} className="ls-dot"
              animate={{ y:[0,-10,0], opacity:[0.3,1,0.3] }}
              transition={{ duration:0.9, repeat:Infinity, delay:i*0.25 }}
            />
          ))}
        </div>

        <p className="ls-sub">Something beautiful is being prepared for you 🌹</p>
      </motion.div>
    </motion.div>
  )
}
