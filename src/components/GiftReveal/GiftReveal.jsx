import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import './GiftReveal.css'

const burst = () => {
  const c = ['#ff8fab','#d8b4fe','#ffd60a','#ffb3c6','#a78bfa','#fff']
  confetti({ particleCount:120, spread:90, origin:{y:.55}, colors:c })
  setTimeout(()=>{
    confetti({ angle:60,  particleCount:60, spread:75, origin:{x:0,y:.6}, colors:c })
    confetti({ angle:120, particleCount:60, spread:75, origin:{x:1,y:.6}, colors:c })
  },300)
}

export default function GiftReveal() {
  const [opened, setOpened] = useState(false)

  const open = () => { setOpened(true); burst() }

  return (
    <section className="gr-section">
      <div className="gr-orb gr-o1"/><div className="gr-orb gr-o2"/>

      <motion.div className="gr-header"
        initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
      >
        <p className="mg-eyebrow">🎁 Something special</p>
        <h2 className="gr-title">A Gift For You</h2>
      </motion.div>

      <div className="gr-stage">
        {/* Gift Box */}
        <motion.div className="gr-box-wrap" whileHover={!opened?{scale:1.04}:{}} onClick={!opened?open:undefined} style={{cursor:opened?'default':'pointer'}}>
          <div className="gr-box">
            {/* Lid */}
            <motion.div className="gr-lid"
              animate={opened?{y:-80,rotateX:50,opacity:0}:{}}
              transition={{duration:.7,type:'spring',stiffness:140}}
            >
              <div className="gr-ribbon-h"/>
              <div className="gr-bow">
                <div className="gr-bow-l"/><div className="gr-bow-c"/><div className="gr-bow-r"/>
              </div>
            </motion.div>

            {/* Body */}
            <div className="gr-body">
              <div className="gr-ribbon-v"/>
              <AnimatePresence>
                {opened && (
                  <motion.div className="gr-surprise"
                    initial={{scale:0,opacity:0,y:20}}
                    animate={{scale:1,opacity:1,y:0}}
                    transition={{delay:.4,type:'spring',stiffness:180}}
                  >🎊</motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="gr-glow"/>
          </div>

          {!opened && <p className="gr-hint">Tap to open ✨</p>}
        </motion.div>

        {/* Message after opening */}
        <AnimatePresence>
          {opened && (
            <motion.div className="gr-msg glass"
              initial={{opacity:0,scale:.9,y:30}}
              animate={{opacity:1,scale:1,y:0}}
              transition={{delay:.6,type:'spring',stiffness:160}}
            >
              <div className="gr-msg-hearts">🌸 ❤️ 🌸</div>
              <h3 className="gr-msg-title">Happy Birthday, Beautiful</h3>
              <p className="gr-msg-sub">❤️</p>
              <p className="gr-msg-text">
                This gift is just a little symbol of how much you mean.
                You deserve the whole world and more.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hearts burst */}
      {opened && Array.from({length:10}).map((_,i)=>(
        <motion.div key={i} className="gr-heart"
          style={{left:`${Math.random()*100}%`,bottom:0}}
          animate={{y:-400,opacity:[0,.8,0]}}
          transition={{duration:3+Math.random()*2,delay:Math.random()*1.5}}
        >{['❤️','💕','🌸','✨','💖'][i%5]}</motion.div>
      ))}
    </section>
  )
}
