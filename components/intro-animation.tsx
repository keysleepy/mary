"use client"

import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface IntroAnimationProps {
  onComplete: () => void
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [show, setShow] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onComplete, 500)
    }, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  // Pre-defined values to avoid hydration mismatch
  const hearts = useMemo(() => [
    { id: 0, x: 5, delay: 0.1, size: 18, duration: 3 },
    { id: 1, x: 15, delay: 0.4, size: 24, duration: 4 },
    { id: 2, x: 25, delay: 0.2, size: 14, duration: 3.5 },
    { id: 3, x: 35, delay: 0.6, size: 20, duration: 4.5 },
    { id: 4, x: 45, delay: 0.3, size: 16, duration: 3.2 },
    { id: 5, x: 55, delay: 0.8, size: 22, duration: 4.2 },
    { id: 6, x: 65, delay: 0.5, size: 12, duration: 2.8 },
    { id: 7, x: 75, delay: 0.9, size: 26, duration: 4.8 },
    { id: 8, x: 85, delay: 0.7, size: 15, duration: 3.3 },
    { id: 9, x: 95, delay: 1.0, size: 19, duration: 3.8 },
    { id: 10, x: 10, delay: 1.2, size: 21, duration: 4.1 },
    { id: 11, x: 20, delay: 1.4, size: 13, duration: 2.9 },
    { id: 12, x: 30, delay: 1.1, size: 25, duration: 4.6 },
    { id: 13, x: 40, delay: 1.5, size: 17, duration: 3.4 },
    { id: 14, x: 50, delay: 1.3, size: 23, duration: 4.3 },
    { id: 15, x: 60, delay: 1.6, size: 11, duration: 2.7 },
    { id: 16, x: 70, delay: 1.8, size: 28, duration: 5 },
    { id: 17, x: 80, delay: 1.7, size: 14, duration: 3.1 },
    { id: 18, x: 90, delay: 1.9, size: 20, duration: 3.9 },
    { id: 19, x: 3, delay: 2.0, size: 16, duration: 3.6 },
  ], [])

  const sparkles = useMemo(() => [
    { id: 0, x: 10, y: 20, delay: 0.2, size: 8, repeatDelay: 1 },
    { id: 1, x: 30, y: 15, delay: 0.5, size: 6, repeatDelay: 1.5 },
    { id: 2, x: 50, y: 40, delay: 0.3, size: 10, repeatDelay: 0.8 },
    { id: 3, x: 70, y: 25, delay: 0.8, size: 7, repeatDelay: 1.2 },
    { id: 4, x: 85, y: 60, delay: 0.1, size: 9, repeatDelay: 1.8 },
    { id: 5, x: 20, y: 70, delay: 0.6, size: 5, repeatDelay: 1.3 },
    { id: 6, x: 40, y: 80, delay: 0.9, size: 11, repeatDelay: 0.9 },
    { id: 7, x: 60, y: 10, delay: 0.4, size: 8, repeatDelay: 1.6 },
    { id: 8, x: 80, y: 45, delay: 0.7, size: 6, repeatDelay: 1.1 },
    { id: 9, x: 15, y: 55, delay: 1.0, size: 9, repeatDelay: 1.4 },
    { id: 10, x: 45, y: 30, delay: 1.2, size: 7, repeatDelay: 0.7 },
    { id: 11, x: 75, y: 75, delay: 1.1, size: 10, repeatDelay: 1.7 },
    { id: 12, x: 90, y: 35, delay: 1.3, size: 5, repeatDelay: 1.0 },
    { id: 13, x: 25, y: 90, delay: 1.5, size: 8, repeatDelay: 1.9 },
    { id: 14, x: 55, y: 65, delay: 1.4, size: 6, repeatDelay: 0.6 },
  ], [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
        >
          {/* Floating Hearts */}
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ y: "110vh", x: `${heart.x}vw`, opacity: 0 }}
              animate={{
                y: "-10vh",
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: heart.duration,
                delay: heart.delay,
                ease: "easeOut",
              }}
              className="absolute text-rose"
              style={{ fontSize: heart.size }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          ))}

          {/* Sparkles */}
          {sparkles.map((sparkle) => (
            <motion.div
              key={`sparkle-${sparkle.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: sparkle.delay,
                repeat: Infinity,
                repeatDelay: sparkle.repeatDelay,
              }}
              className="absolute text-amber-300"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                fontSize: sparkle.size,
              }}
            >
              ✦
            </motion.div>
          ))}

          {/* Main Text */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-center z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl md:text-8xl mb-4"
            >
              
            </motion.div>
            <h1 className="font-serif text-3xl md:text-5xl text-foreground tracking-wide">
              
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
