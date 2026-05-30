import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiHeart } from 'react-icons/fi'
import './MusicSection.css'

const SONGS = [
  { id:1, emoji:'🌹', title:'Perfect',            artist:'Ed Sheeran',        duration:'4:23' },
  { id:2, emoji:'💌', title:'A Thousand Years',   artist:'Christina Perri',   duration:'4:45' },
  { id:3, emoji:'🌙', title:'All of Me',           artist:'John Legend',       duration:'4:29' },
  { id:4, emoji:'✨', title:'Thinking Out Loud',   artist:'Ed Sheeran',        duration:'4:41' },
]

export default function MusicSection() {
  const [cur,    setCur]    = useState(0)
  const [play,   setPlay]   = useState(false)
  const [prog,   setProg]   = useState(0)
  const [liked,  setLiked]  = useState(false)
  const iv = useRef(null)

  useEffect(()=>{
    clearInterval(iv.current)
    if(play){
      iv.current = setInterval(()=>{
        setProg(p=>{ if(p>=100){setCur(c=>(c+1)%SONGS.length);return 0} return p+.18 })
      },100)
    }
    return ()=>clearInterval(iv.current)
  },[play])

  const s = SONGS[cur]
  const mins = Math.floor((prog/100)*4)
  const secs = String(Math.floor(((prog/100)*60)%60)).padStart(2,'0')

  return (
    <section className="ms-section">
      <div className="ms-orb ms-o1"/><div className="ms-orb ms-o2"/>

      <motion.div className="ms-header"
        initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
      >
        <p className="mg-eyebrow">🎵 Our soundtrack</p>
        <h2 className="ms-title">A Song for You ❤️</h2>
      </motion.div>

      <motion.div className="ms-player glass"
        initial={{opacity:0,y:40,scale:.95}}
        whileInView={{opacity:1,y:0,scale:1}}
        transition={{duration:.7}}
        viewport={{once:true}}
      >
        {/* Vinyl */}
        <div className="ms-vinyl-area">
          <motion.div className="ms-vinyl"
            animate={play?{rotate:360}:{}}
            transition={{duration:5,repeat:Infinity,ease:'linear'}}
          >
            <div className="ms-vinyl-center">{s.emoji}</div>
            {[80,100,120,140].map(sz=>(
              <div key={sz} className="ms-groove" style={{width:sz,height:sz}}/>
            ))}
          </motion.div>
          {play && <div className="ms-glow-ring"/>}
        </div>

        {/* Info & controls */}
        <div className="ms-info">
          <motion.h3 key={s.id} className="ms-song"
            initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
          >{s.title}</motion.h3>
          <p className="ms-artist">{s.artist}</p>

          {/* Progress */}
          <div className="ms-prog-track">
            <motion.div className="ms-prog-fill" style={{width:`${prog}%`}}/>
          </div>
          <div className="ms-time"><span>{mins}:{secs}</span><span>{s.duration}</span></div>

          {/* Controls */}
          <div className="ms-controls">
            <button className="ms-ctrl" onClick={()=>{setCur(c=>(c-1+SONGS.length)%SONGS.length);setProg(0)}}><FiSkipBack/></button>
            <motion.button className="ms-play glow-btn" onClick={()=>setPlay(p=>!p)} whileTap={{scale:.9}}>
              {play?<FiPause/>:<FiPlay/>}
            </motion.button>
            <button className="ms-ctrl" onClick={()=>{setCur(c=>(c+1)%SONGS.length);setProg(0)}}><FiSkipForward/></button>
            <motion.button className={`ms-like ${liked?'liked':''}`} onClick={()=>setLiked(l=>!l)} whileTap={{scale:1.4}}>
              <FiHeart fill={liked?'var(--pink)':'none'}/>
            </motion.button>
          </div>
        </div>

        {/* Playlist */}
        <div className="ms-playlist">
          {SONGS.map((sg,i)=>(
            <motion.div key={sg.id} className={`ms-item ${i===cur?'active':''}`}
              onClick={()=>{setCur(i);setProg(0)}} whileHover={{x:6}}
            >
              <span className="ms-emoji">{sg.emoji}</span>
              <div className="ms-meta">
                <p className="ms-item-title">{sg.title}</p>
                <p className="ms-item-artist">{sg.artist}</p>
              </div>
              <span className="ms-dur">{sg.duration}</span>
              {i===cur && play && (
                <div className="ms-bars">
                  {[0,1,2].map(b=>(
                    <motion.div key={b} className="ms-bar"
                      animate={{height:['4px','16px','4px']}}
                      transition={{duration:.5+b*.15,repeat:Infinity}}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
