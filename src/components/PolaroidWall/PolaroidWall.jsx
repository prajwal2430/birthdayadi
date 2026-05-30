import { useState } from 'react'
import { motion } from 'framer-motion'
import './PolaroidWall.css'

const PHOTOS = [
  {
    id: 1,
    image: '/images/photo1.jpg',
    caption: 'Your beautiful smile, Srusti 🌸',
    date: 'Forever',
    rotate: -6,
  },
  {
    id: 2,
    image: '/images/photo10.jpg',
    caption: 'You make every landscape bloom 💫',
    date: 'Always',
    rotate: 4,
  },
  {
    id: 3,
    image: '/images/photo5.jpg',
    caption: 'Collage of my favorite person 💖',
    date: 'Treasured',
    rotate: -3,
  },
  {
    id: 4,
    image: '/images/photo2.jpg',
    caption: 'Every moment with you feels special ❤️',
    date: 'With You',
    rotate: 5,
  },
  {
    id: 5,
    image: '/images/photo6.jpg',
    caption: 'Even when we are far apart ✨',
    date: 'Connected',
    rotate: -4,
  },
  {
    id: 6,
    image: '/images/photo12.jpg',
    caption: 'Sharadsav College Memories 🏛️',
    date: 'College Day',
    rotate: 3,
  },
  {
    id: 7,
    image: '/images/photo8.jpg',
    caption: 'Making silly faces together 😜',
    date: 'Fun Times',
    rotate: -5,
  },
  {
    id: 8,
    image: '/images/photo9.jpg',
    caption: 'You are my cuteness overload 🐼',
    date: 'Adorable',
    rotate: 6,
  },
  {
    id: 9,
    image: '/images/photo11.jpg',
    caption: 'My peace, my happiness, my everything 🌻',
    date: 'Love You',
    rotate: -3,
  },
  {
    id: 10,
    image: '/images/photo13.jpg',
    caption: 'Exploring beautiful places with you 🏰',
    date: 'Adventure',
    rotate: 4,
  },
  {
    id: 11,
    image: '/images/photo4.png',
    caption: 'I love you more than words can explain 💟',
    date: 'Infinity',
    rotate: -5,
  },
]

function Polaroid({ photo, index }) {
  const [dragging, setDragging] = useState(false)

  return (
    <motion.div
      className="polaroid-wrapper"
      initial={{ opacity: 0, y: 60, rotate: photo.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: photo.rotate }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true, amount: 0.2 }}
      drag
      dragConstraints={{ left: -150, right: 150, top: -120, bottom: 120 }}
      whileDrag={{ scale: 1.1, zIndex: 100, rotate: 0 }}
      whileHover={{ scale: 1.05, y: -12, rotate: 0, zIndex: 50 }}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
    >
      <div className="polaroid-frame">
        <div className="polaroid-photo">
          {photo.image ? (
            <img src={photo.image} className="polaroid-img" alt={photo.caption} />
          ) : (
            <div className="polaroid-emoji">🌸</div>
          )}
        </div>
        <div className="polaroid-caption-area">
          <p className="polaroid-caption">{photo.caption}</p>
          <p className="polaroid-date">{photo.date}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function PolaroidWall() {
  return (
    <section className="polaroid-section">
      <div className="polaroid-orb polaroid-orb-1" />
      <div className="polaroid-orb polaroid-orb-2" />

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="section-eyebrow">📷 Memory Lane</p>
        <h2 className="section-title">Our Precious Moments</h2>
        <p className="section-subtitle">Drag the photos around ✨</p>
      </motion.div>

      <div className="polaroid-grid">
        {PHOTOS.map((photo, i) => (
          <Polaroid key={photo.id} photo={photo} index={i} />
        ))}
      </div>
    </section>
  )
}
