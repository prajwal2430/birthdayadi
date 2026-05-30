import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiHeart } from 'react-icons/fi'
import './MusicCard.css'

const SONGS = [
  { 
    id: 1, 
    title: 'River Flows In You', 
    artist: 'Yiruma', 
    duration: '3:04', 
    emoji: '🎹',
    url: 'https://archive.org/download/classic-romantic-instrumental-music-collection/02.%20Yiruma%20-%20River%20Flows%20In%20You.mp3'
  },
  { 
    id: 2, 
    title: 'Ballade Pour Adeline', 
    artist: 'Richard Clayderman', 
    duration: '2:39', 
    emoji: '🎵',
    url: 'https://archive.org/download/classic-romantic-instrumental-music-collection/01.%20Richard%20Clayderman%20-%20Ballade%20Pour%20Adeline.mp3'
  },
  { 
    id: 3, 
    title: 'Love Story', 
    artist: 'Richard Clayderman', 
    duration: '3:01', 
    emoji: '🎹',
    url: 'https://archive.org/download/classic-romantic-instrumental-music-collection/03.%20Richard%20Clayderman%20-%20Love%20Story.mp3'
  },
  { 
    id: 4, 
    title: 'Kiss The Rain', 
    artist: 'Yiruma', 
    duration: '4:16', 
    emoji: '🌧️',
    url: 'https://archive.org/download/classic-romantic-instrumental-music-collection/04.%20Yiruma%20-%20Kiss%20The%20Rain.mp3'
  },
]

export default function MusicCard() {
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const [liked, setLiked] = useState(false)
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00')
  const audioRef = useRef(null)

  const song = SONGS[current]

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(err => {
          console.log("Audio playback failed (usually requires user interaction first):", err)
          setPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [playing, current])

  // Reset progress and handle track change
  const handleTrackChange = (index) => {
    setCurrent(index)
    setProgress(0)
    setCurrentTimeStr('0:00')
    // Auto play when switching track, if we were already playing
    setPlaying(true)
  }

  const prev = () => {
    const nextIdx = (current - 1 + SONGS.length) % SONGS.length
    handleTrackChange(nextIdx)
  }
  
  const next = () => {
    const nextIdx = (current + 1) % SONGS.length
    handleTrackChange(nextIdx)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const curTime = audioRef.current.currentTime
      const dur = audioRef.current.duration || 1
      setProgress((curTime / dur) * 100)

      const mins = Math.floor(curTime / 60)
      const secs = String(Math.floor(curTime % 60)).padStart(2, '0')
      setCurrentTimeStr(`${mins}:${secs}`)
    }
  }

  const handleSeek = (e) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      const newTime = percentage * audioRef.current.duration
      audioRef.current.currentTime = newTime
      setProgress(percentage * 100)
    }
  }

  return (
    <section className="music-section">
      <div className="music-orb music-orb-1" />
      <div className="music-orb music-orb-2" />

      {/* Hidden native audio tag */}
      <audio 
        ref={audioRef} 
        src={song.url} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={next} 
        preload="auto"
      />

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="section-eyebrow">🎵 For Your Soul</p>
        <h2 className="section-title">Your Special Birthday Playlist ❤️</h2>
      </motion.div>

      <motion.div
        className="music-player glass-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Vinyl Record */}
        <div className="music-vinyl-area">
          <motion.div
            className="vinyl-outer"
            animate={playing ? { rotate: 360 } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            <div className="vinyl-inner">
              <span className="vinyl-emoji">{song.emoji}</span>
            </div>
            <div className="vinyl-groove vinyl-groove-1" />
            <div className="vinyl-groove vinyl-groove-2" />
            <div className="vinyl-groove vinyl-groove-3" />
          </motion.div>
          {playing && (
            <div className="vinyl-glow-ring" />
          )}
        </div>

        {/* Song Info */}
        <div className="music-info">
          <motion.h3
            key={song.id}
            className="music-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {song.title}
          </motion.h3>
          <motion.p
            key={`${song.id}-artist`}
            className="music-artist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {song.artist}
          </motion.p>

          {/* Progress Bar */}
          <div className="music-progress-track" onClick={handleSeek} style={{ cursor: 'pointer' }}>
            <motion.div
              className="music-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="music-time">
            <span>{currentTimeStr}</span>
            <span>{song.duration}</span>
          </div>

          {/* Controls */}
          <div className="music-controls">
            <motion.button className="music-ctrl-btn" onClick={prev} whileTap={{ scale: 0.9 }}>
              <FiSkipBack />
            </motion.button>

            <motion.button
              className="music-play-btn btn-glow"
              onClick={() => setPlaying(p => !p)}
              whileTap={{ scale: 0.9 }}
              animate={playing ? { boxShadow: ['0 0 20px rgba(255,110,180,0.5)', '0 0 50px rgba(168,85,247,0.7)', '0 0 20px rgba(255,110,180,0.5)'] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {playing ? <FiPause /> : <FiPlay />}
            </motion.button>

            <motion.button className="music-ctrl-btn" onClick={next} whileTap={{ scale: 0.9 }}>
              <FiSkipForward />
            </motion.button>

            <motion.button
              className={`music-like-btn ${liked ? 'liked' : ''}`}
              onClick={() => setLiked(l => !l)}
              whileTap={{ scale: 1.4 }}
              animate={liked ? { scale: [1, 1.3, 1] } : {}}
            >
              <FiHeart fill={liked ? 'var(--rose)' : 'none'} />
            </motion.button>
          </div>
        </div>

        {/* Song list */}
        <div className="music-playlist">
          {SONGS.map((s, i) => (
            <motion.div
              key={s.id}
              className={`playlist-item ${i === current ? 'active' : ''}`}
              onClick={() => handleTrackChange(i)}
              whileHover={{ x: 8 }}
            >
              <span className="playlist-emoji">{s.emoji}</span>
              <div className="playlist-info">
                <p className="playlist-title">{s.title}</p>
                <p className="playlist-artist">{s.artist}</p>
              </div>
              <span className="playlist-dur">{s.duration}</span>
              {i === current && playing && (
                <div className="playlist-bars">
                  {[0,1,2].map(b => (
                    <motion.div
                      key={b}
                      className="playlist-bar"
                      animate={{ height: ['4px', '16px', '4px'] }}
                      transition={{ duration: 0.5 + b * 0.2, repeat: Infinity }}
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
