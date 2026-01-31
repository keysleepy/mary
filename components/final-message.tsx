"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface FinalMessageProps {
  onRestart: () => void
}

export function FinalMessage({ onRestart }: FinalMessageProps) {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  // Floating petals
  const petals = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5,
    size: Math.random() * 15 + 10,
    emoji: ["🌸", "🌷", "💗", "✨"][Math.floor(Math.random() * 4)],
  }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Floating petals background */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: "-10vh", x: `${petal.x}vw`, opacity: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 1, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute pointer-events-none"
          style={{ fontSize: petal.size }}
        >
          {petal.emoji}
        </motion.div>
      ))}

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center z-10 max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="text-7xl md:text-8xl mb-8"
        >
          °❀⋆.ೃ࿔*:･
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="font-serif text-3xl md:text-5xl text-foreground mb-6 text-balance"
        >
          Thank You for Everything
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="font-sans text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
        >
          For being my person, my partner, my best friend.
          All in one atake mo, Ai.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="font-sans text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
        >
          Naway tumagal pa tayo—kasi kung hindi, sasapakin ko bago mo
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5 }}
          className="mb-10"
        >
          <p className="font-serif text-2xl md:text-3xl text-primary">
            Happy Monthsary Again
          </p>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl mt-2"
          >
            
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="font-sans text-xl text-foreground/80 italic"
        >
          I love you, always and forever.
        </motion.p>

        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-6 py-3 bg-card border border-border text-foreground font-sans text-sm rounded-full hover:bg-muted transition-colors"
          >
            Start Over
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}
