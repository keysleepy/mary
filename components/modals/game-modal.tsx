"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, RefreshCw } from "lucide-react"
import { useState, useEffect, useCallback, useRef } from "react"

interface GameModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Heart {
  id: number
  x: number
  y: number
  size: number
}

export function GameModal({ isOpen, onClose }: GameModalProps) {
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState<Heart[]>([])
  const [gameActive, setGameActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [hasWon, setHasWon] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const heartIdRef = useRef(0)

  const spawnHeart = useCallback(() => {
    heartIdRef.current += 1
    const newHeart: Heart = {
      id: heartIdRef.current,
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 60) + 20,
      size: Math.floor(Math.random() * 20) + 30,
    }
    setHearts((prev) => [...prev.slice(-8), newHeart])
  }, [])

  const startGame = () => {
    setScore(0)
    setTimeLeft(15)
    setGameActive(true)
    setHasWon(false)
    setHearts([])
  }

  const catchHeart = (id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id))
    setScore((prev) => prev + 1)
  }

  useEffect(() => {
    if (!gameActive) return

    const spawnInterval = setInterval(spawnHeart, 800)
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(spawnInterval)
      clearInterval(timerInterval)
    }
  }, [gameActive, spawnHeart])

  useEffect(() => {
    if (!gameActive && score > 0) {
      if (score >= 10) {
        setHasWon(true)
      }
      if (score > highScore) {
        setHighScore(score)
      }
    }
  }, [gameActive, score, highScore])

  // Reset game state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setGameActive(false)
      setHearts([])
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-gradient-to-br from-pink-50 to-rose-100 rounded-3xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-rose-200/50 transition-colors text-foreground/60 hover:text-foreground z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <div className="text-center mb-4">
                <h3 className="font-serif text-2xl text-foreground">Catch the Flowers!</h3>
                <p className="font-sans text-sm text-muted-foreground">
                  Tap them before they disappear
                </p>
              </div>

              {/* Game Stats */}
              <div className="flex justify-between items-center mb-4 px-4">
                <div className="text-center">
                  <p className="font-sans text-xs text-muted-foreground">Score</p>
                  <p className="font-serif text-2xl text-primary">{score}</p>
                </div>
                <div className="text-center">
                  <p className="font-sans text-xs text-muted-foreground">Time</p>
                  <p className={`font-serif text-2xl ${timeLeft <= 5 ? "text-red-500" : "text-foreground"}`}>
                    {timeLeft}s
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-sans text-xs text-muted-foreground">Best</p>
                  <p className="font-serif text-2xl text-amber-500">{highScore}</p>
                </div>
              </div>

              {/* Game Area */}
              <div className="relative h-72 bg-gradient-to-b from-rose-100 to-pink-100 rounded-2xl overflow-hidden border-2 border-rose-200">
                {!gameActive && !hasWon && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    {score > 0 && timeLeft === 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-center mb-4"
                      >
                        <p className="font-serif text-xl text-foreground">
                          {score >= 10 ? "Amazing!" : "Nice try!"}
                        </p>
                        <p className="font-sans text-muted-foreground">
                          You caught {score} flowers!
                        </p>
                      </motion.div>
                    )}
                    <motion.button
                      onClick={startGame}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-serif text-lg rounded-full shadow-lg"
                    >
                      {score > 0 ? <RefreshCw className="w-5 h-5" /> : null}
                      {score > 0 ? "Play Again" : "Start Game"}
                    </motion.button>
                    <p className="font-sans text-xs text-muted-foreground mt-3">
                      Catch 10+ flowers to win!
                    </p>
                  </div>
                )}

                {hasWon && !gameActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gradient-to-br from-rose-200/90 to-pink-200/90"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: 3 }}
                      className="text-6xl mb-4"
                    >
                      (  ˶˘ ³ ˘) ♡
                    </motion.div>
                    <h4 className="font-serif text-2xl text-foreground mb-2"></h4>
                    <p className="font-sans text-lg text-primary mb-4">You won! You get a kiss!</p>
                    <motion.div className="flex gap-2">
                      {[""].map((emoji, i) => (
                        <motion.span
                          key={i}
                          initial={{ y: 0, opacity: 1 }}
                          animate={{ y: -20, opacity: 0 }}
                          transition={{ delay: i * 0.2, duration: 1, repeat: Infinity }}
                          className="text-2xl"
                        >
                          {emoji}
                        </motion.span>
                      ))}
                    </motion.div>
                    <motion.button
                      onClick={startGame}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-sans text-sm rounded-full"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Play Again
                    </motion.button>
                  </motion.div>
                )}

                {/* Hearts */}
                <AnimatePresence>
                  {hearts.map((heart) => (
                    <motion.button
                      key={heart.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => catchHeart(heart.id)}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${heart.x}%`,
                        top: `${heart.y}%`,
                        fontSize: heart.size,
                      }}
                    >
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        💮
                      </motion.span>
                    </motion.button>
                  ))}
                </AnimatePresence>

                {/* Decorative elements */}
                {gameActive && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                        className="absolute text-rose-300/50"
                        style={{
                          left: `${10 + i * 20}%`,
                          bottom: "5%",
                          fontSize: 20,
                        }}
                      >
                        🌸
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
