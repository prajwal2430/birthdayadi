import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './LoveLetter.css'

const LINES = [
  'Dearest Srusti,',
  '',
  'You are the most beautiful part of my life.',
  'Every moment with you feels special,',
  'even when we are far apart.',
  '',
  'On your birthday, I just want to say —',
  'I love you more than words can explain 💟',
  '',
  'You are my happiness,',
  'my peace, my everything.',
  '',
  'Happy Birthday, my special girl ❤️',
]

function TypewriterText({ lines }) {
  return (
    <div className="ll-text">
      {lines.map((line, i) => (
        <motion.p key={i}
          className={`ll-line ${line===''?'ll-gap':''} ${i===0?'ll-salute':''} ${i>=lines.length-2?'ll-sign':''}`}
          initial={{ opacity:0, x:-15 }}
          whileInView={{ opacity:1, x:0 }}
          transition={{ duration:0.45, delay:i*0.14 }}
          viewport={{ once:true }}
        >{line}</motion.p>
      ))}
    </div>
  )
}

export default function LoveLetter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, amount:0.3 })

  return (
    <section className="ll-section" ref={ref}>
      <div className="ll-orb ll-o1"/><div className="ll-orb ll-o2"/>

      <motion.div className="ll-header"
        initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
      >
        <p className="mg-eyebrow">💌 From the heart</p>
        <h2 className="ll-title">A Love Letter</h2>
      </motion.div>

      <motion.div className="ll-card"
        initial={{opacity:0,y:40,scale:.97}}
        whileInView={{opacity:1,y:0,scale:1}}
        transition={{duration:.8}}
        viewport={{once:true}}
      >
        {/* Decorative hearts */}
        <span className="ll-deco ll-d1">🌸</span>
        <span className="ll-deco ll-d2">❤️</span>
        <span className="ll-deco ll-d3">💌</span>

        {inView && <TypewriterText lines={LINES}/>}
      </motion.div>

      {/* Floating petals */}
      {Array.from({length:8}).map((_,i)=>(
        <motion.div key={i} className="ll-petal"
          style={{left:`${10+i*11}%`}}
          animate={{y:[0,-350],opacity:[0,.7,0],rotate:[0,180]}}
          transition={{duration:5+Math.random()*3,delay:i*.5,repeat:Infinity,repeatDelay:1}}
        >{['🌸','🌺','🌹','💐'][i%4]}</motion.div>
      ))}
    </section>
  )
}
