import { motion } from 'framer-motion'
import './MemoryGallery.css'

const MEMORIES = [
  { id:1, emoji:'🌅', caption:"The day I couldn't stop smiling", date:'A beautiful day', rotate:-5, color:'#ffe4e8' },
  { id:2, emoji:'🎵', caption:'Our funniest moment ever', date:'A laughing memory', rotate:4, color:'#f3e8ff' },
  { id:3, emoji:'🌸', caption:'A memory I will always keep', date:'Captured forever', rotate:-3, color:'#fef9c3' },
  { id:4, emoji:'🌙', caption:'That quiet evening just us', date:'A peaceful night', rotate:6, color:'#e0f2fe' },
  { id:5, emoji:'💌', caption:'When you made my whole week', date:'Without even trying', rotate:-7, color:'#fce7f3' },
  { id:6, emoji:'✨', caption:'The moment everything felt perfect', date:'Pure magic', rotate:3, color:'#f0fdf4' },
]

export default function MemoryGallery() {
  return (
    <section className="mg-section">
      <div className="mg-orb mg-o1"/><div className="mg-orb mg-o2"/>

      <motion.div className="mg-header"
        initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
      >
        <p className="mg-eyebrow">📷 Through our memories</p>
        <h2 className="mg-title">Moments I Treasure</h2>
        <p className="mg-sub">Drag the photos around ✨</p>
      </motion.div>

      <div className="mg-grid">
        {MEMORIES.map((m,i)=>(
          <motion.div key={m.id} className="mg-polaroid-wrap"
            initial={{opacity:0,y:50,rotate:m.rotate}}
            whileInView={{opacity:1,y:0,rotate:m.rotate}}
            transition={{duration:0.6,delay:i*0.1}}
            viewport={{once:true,amount:.3}}
            drag
            dragConstraints={{left:-70,right:70,top:-50,bottom:50}}
            whileDrag={{scale:1.08,zIndex:100,rotate:0}}
            whileHover={{scale:1.06,y:-10,rotate:0,zIndex:50}}
            style={{cursor:'grab'}}
          >
            <div className="mg-frame">
              <div className="mg-photo" style={{background:`linear-gradient(135deg,${m.color}80,${m.color}cc)`}}>
                <span className="mg-emoji">{m.emoji}</span>
              </div>
              <div className="mg-caption-area">
                <p className="mg-caption">{m.caption}</p>
                <p className="mg-date">{m.date}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
