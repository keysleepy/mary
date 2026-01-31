"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface FlowerGardenProps {
  onFlowerClick: (flower: string) => void
  visitedFlowers: string[]
  allVisited: boolean
  onFinalMessage: () => void
}

const flowers = [
  { id: "letters", label: "ﮩ٨ـﮩﮩ٨ـ🫀ﮩ٨ـﮩﮩ٨ـ", emoji: "🌸", name: "", color: "from-pink-300 to-pink-400" },
  { id: "music", label: "ﮩ٨ـﮩﮩ٨ـ🫀ﮩ٨ـﮩﮩ٨ـ", emoji: "🪷", name: "", color: "from-rose-300 to-rose-400" },
  { id: "game", label: "ﮩ٨ـﮩﮩ٨ـ🫀ﮩ٨ـﮩﮩ٨ـ", emoji: "🌺", name: "", color: "from-pink-400 to-rose-400" },
  { id: "surprise", label: "ﮩ٨ـﮩﮩ٨ـ🫀ﮩ٨ـﮩﮩ٨ـ", emoji: "🌷", name: "", color: "from-pink-300 to-rose-300" },
]

export function FlowerGarden({ onFlowerClick, visitedFlowers, allVisited, onFinalMessage }: FlowerGardenProps) {
  const [hoveredFlower, setHoveredFlower] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
            className="absolute text-rose/30"
            style={{
              left: `${5 + i * 18}%`,
              bottom: `${5 + (i % 3) * 10}%`,
              fontSize: 30 + i * 5,
            }}
          >
            🌿
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12 z-10"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-3 text-balance">
          Pick a Flower
        </h2>
        <p className="font-sans text-lg text-muted-foreground">
          Each one holds something special
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-6 md:gap-10 max-w-2xl mx-auto z-10">
        {flowers.map((flower, index) => {
          const isVisited = visitedFlowers.includes(flower.id)
          
          return (
            <motion.button
              key={flower.id}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2 + index * 0.15, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onFlowerClick(flower.id)}
              onMouseEnter={() => setHoveredFlower(flower.id)}
              onMouseLeave={() => setHoveredFlower(null)}
              className={`relative flex flex-col items-center justify-center p-6 md:p-10 rounded-3xl transition-all duration-300 ${
                isVisited 
                  ? "bg-gradient-to-br " + flower.color + " shadow-lg" 
                  : "bg-card border-2 border-border hover:border-primary/50 shadow-md hover:shadow-lg"
              }`}
            >
              <motion.span
                animate={
                  hoveredFlower === flower.id
                    ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                    : {}
                }
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-7xl mb-3"
              >
                {flower.emoji}
              </motion.span>
              <span className={`font-serif text-lg md:text-xl ${
                isVisited ? "text-white" : "text-foreground"
              }`}>
                {flower.label}
              </span>
              <span className={`font-sans text-xs mt-1 ${
                isVisited ? "text-white/80" : "text-muted-foreground"
              }`}>
                {flower.name}
              </span>
              {isVisited && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs"
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-10 text-center z-10"
      >
        <p className="font-sans text-muted-foreground mb-2">
          {visitedFlowers.length}/4 flowers explored
        </p>
        <div className="flex gap-2 justify-center">
          {flowers.map((flower) => (
            <motion.div
              key={flower.id}
              className={`w-3 h-3 rounded-full transition-colors ${
                visitedFlowers.includes(flower.id) ? "bg-primary" : "bg-border"
              }`}
              animate={visitedFlowers.includes(flower.id) ? { scale: [1, 1.3, 1] } : {}}
            />
          ))}
        </div>
      </motion.div>

      {/* Final Message Button */}
      {allVisited && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mt-8 z-10"
        >
          <motion.button
            onClick={onFinalMessage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(236, 72, 153, 0)",
                "0 0 0 10px rgba(236, 72, 153, 0.3)",
                "0 0 0 0 rgba(236, 72, 153, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-400 text-white font-serif text-xl rounded-full shadow-lg"
          >
            One Last Thing
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
