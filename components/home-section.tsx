"use client"

import { motion } from "framer-motion"

interface HomeSectionProps {
  onProceed: () => void
}

export function HomeSection({ onProceed }: HomeSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Background floating petals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, x: Math.random() * 100 - 50, opacity: 0 }}
          animate={{
            y: [0, 20, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute text-rose/40"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${20 + (i * 8)}%`,
            fontSize: 20 + Math.random() * 20,
          }}
        >
          🌸
        </motion.div>
      ))}

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-7xl md:text-9xl mb-6"
        >
          
        </motion.div>
        
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground mb-4 text-balance">
          Happy Monthsary, Honey
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-sans text-xl md:text-2xl text-muted-foreground mb-12 italic"
        >
          Another beautiful month with you
        </motion.p>

        <motion.button
          onClick={onProceed}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-10 py-4 bg-primary text-primary-foreground font-serif text-xl md:text-2xl rounded-full shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
        >
          <span className="relative z-10">Enter</span>
          <motion.div
            className="absolute inset-0 bg-soft-red/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
