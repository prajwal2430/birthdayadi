import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import './ReasonsSection.css'

const REASONS = [
  { icon:'❤️', title:'Your Kindness',      text:'You give without expecting anything in return. That is rare and so beautiful.' },
  { icon:'🌸', title:'Your Smile',         text:'Your smile has the power to change the mood of an entire room. Never stop smiling.' },
  { icon:'💛', title:'Your Caring Nature', text:'The way you care for others shows the depth of your beautiful heart.' },
  { icon:'💪', title:'Your Strength',      text:'You face every challenge with grace. You are stronger than you will ever know.' },
  { icon:'✨', title:'Your Light',         text:'The way you make people feel at ease — that is one of your most magical gifts.' },
  { icon:'🌹', title:'Simply Being You',   text:'No act or mask. Just you — and that is more than enough. You are enough.' },
]

function ReasonCard({ r, i, active }) {
  const offset = i - active
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rx = useTransform(my,[-80,80],[10,-10])
  const ry = useTransform(mx,[-80,80],[-10,10])

  if (Math.abs(offset) > 1) return null

  return (
    <motion.div className={`rs-card-wrap ${offset===0?'active':''}`}
      animate={{ x:offset*240, scale:offset===0?1:0.82, opacity:offset===0?1:0.45, filter:offset===0?'none':'blur(2px)' }}
      transition={{ type:'spring', stiffness:220, damping:26 }}
      style={{ zIndex: offset===0?10:5 }}
    >
      <motion.div className="rs-card glass"
        style={{ rotateX:rx, rotateY:ry, transformStyle:'preserve-3d' }}
        onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();mx.set(e.clientX-r.left-r.width/2);my.set(e.clientY-r.top-r.height/2)}}
        onMouseLeave={()=>{mx.set(0);my.set(0)}}
      >
        <div className="rs-icon">{r.icon}</div>
        <h3 className="rs-title">{r.title}</h3>
        <p className="rs-text">{r.text}</p>
        <div className="rs-glow"/>
      </motion.div>
    </motion.div>
  )
}

export default function ReasonsSection() {
  const [active, setActive] = useState(0)
  const prev = ()=>setActive(a=>Math.max(0,a-1))
  const next = ()=>setActive(a=>Math.min(REASONS.length-1,a+1))

  return (
    <section className="rs-section">
      <div className="rs-orb rs-o1"/><div className="rs-orb rs-o2"/>

      <motion.div className="rs-header"
        initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
      >
        <p className="mg-eyebrow">💝 From my heart</p>
        <h2 className="rs-main-title">Reasons Why You're Amazing</h2>
      </motion.div>

      <div className="rs-stage">
        <div className="rs-cards">
          {REASONS.map((r,i)=>(<ReasonCard key={i} r={r} i={i} active={active}/>))}
        </div>

        <div className="rs-nav">
          <motion.button className="rs-btn" onClick={prev} disabled={active===0} whileTap={{scale:.9}}>←</motion.button>
          <div className="rs-dots">
            {REASONS.map((_,i)=>(
              <motion.button key={i} className={`rs-dot ${i===active?'on':''}`}
                onClick={()=>setActive(i)} animate={{scale:i===active?1.4:1}}
              />
            ))}
          </div>
          <motion.button className="rs-btn" onClick={next} disabled={active===REASONS.length-1} whileTap={{scale:.9}}>→</motion.button>
        </div>

        <p className="rs-counter">{active+1} / {REASONS.length}</p>
      </div>
    </section>
  )
}
