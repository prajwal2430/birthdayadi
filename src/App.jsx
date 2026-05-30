import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './styles/global.css'
import './App.css'

import LoadingScreen   from './components/LoadingScreen/LoadingScreen'
import CustomCursor    from './components/shared/CustomCursor'
import MouseTrail      from './components/shared/MouseTrail'
import PasswordScreen  from './components/PasswordScreen/PasswordScreen'
import OpeningScreen   from './components/OpeningScreen/OpeningScreen'
import StoryIntro      from './components/StoryIntro/StoryIntro'

// Import all 10 pager sections
import CountdownTimer   from './components/CountdownTimer/CountdownTimer'
import PolaroidWall     from './components/PolaroidWall/PolaroidWall'
import FloatingNotes    from './components/FloatingNotes/FloatingNotes'
import ReasonsSlider    from './components/ReasonsSlider/ReasonsSlider'
import LoveLetter       from './components/LoveLetter/LoveLetter'
import GiftBox          from './components/GiftBox/GiftBox'
import BirthdayCake     from './components/BirthdayCake/BirthdayCake'
import GrandFinale      from './components/GrandFinale/GrandFinale'

const PAGES = [
  { id: 'countdown', label: '⏳', Component: CountdownTimer },
  { id: 'polaroid',  label: '📷', Component: PolaroidWall   },
  { id: 'notes',     label: '💌', Component: FloatingNotes   },
  { id: 'reasons',   label: '💖', Component: ReasonsSlider  },
  { id: 'letter',    label: '✍️', Component: LoveLetter     },
  { id: 'gift',      label: '🎁', Component: GiftBox        },
  { id: 'cake',      label: '🎂', Component: BirthdayCake   },
  { id: 'finale',    label: '✨', Component: GrandFinale    },
]

const slide = {
  enter: d => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
  center:    { x: 0, opacity: 1 },
  exit:  d => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function App() {
  const [phase, setPhase]     = useState('loading') // loading | password | opening | story | main
  const [page, setPage]       = useState(0)
  const [dir,  setDir]        = useState(1)

  useEffect(() => {
    const t = setTimeout(() => setPhase('password'), 3000)
    return () => clearTimeout(t)
  }, [])

  /* keyboard nav */
  useEffect(() => {
    if (phase !== 'main') return
    const fn = e => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft')  goPrev()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [phase, page])

  const goNext = () => { if (page < PAGES.length-1) { setDir(1);  setPage(p=>p+1) } }
  const goPrev = () => { if (page > 0)              { setDir(-1); setPage(p=>p-1) } }
  const goTo   = i  => { setDir(i > page ? 1 : -1); setPage(i)  }

  const { Component } = PAGES[page]

  return (
    <div id="app-root">
      <CustomCursor />
      <MouseTrail />

      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <LoadingScreen key="loading" />
        )}

        {phase === 'password' && (
          <PasswordScreen
            key="password"
            correctPassword="2026"
            onUnlock={() => setPhase('opening')}
          />
        )}

        {phase === 'opening' && (
          <OpeningScreen
            key="opening"
            onDone={() => setPhase('story')}
          />
        )}

        {phase === 'story' && (
          <StoryIntro
            key="story"
            onComplete={() => setPhase('main')}
          />
        )}

        {phase === 'main' && (
          <motion.div
            key="main"
            className="pager-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Page viewport */}
            <div className="pager-viewport">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={page}
                  className="pager-page"
                  custom={dir}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.4,0,0.2,1] }}
                >
                  <Component />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom nav */}
            <motion.div
              className="pager-bottom-nav"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                className="pager-nav-btn"
                onClick={goPrev}
                disabled={page === 0}
                aria-label="Previous"
              >←</button>

              <div className="pager-dots">
                {PAGES.map((p, i) => (
                  <motion.button
                    key={p.id}
                    className={`pager-dot ${i === page ? 'active' : ''}`}
                    onClick={() => goTo(i)}
                    title={p.label}
                    animate={{ scale: i === page ? 1.4 : 1 }}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              <button
                className="pager-nav-btn"
                onClick={goNext}
                disabled={page === PAGES.length - 1}
                aria-label="Next"
              >→</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
