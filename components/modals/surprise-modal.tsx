"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles } from "lucide-react"

interface SurpriseModalProps {
  isOpen: boolean
  onClose: () => void
}

const reasons = [
  "I'd rather wipe your tears than let you drown in silence thinking no one cares about u",
  "I'd love to figure out what love is with you",
  "To imagine your hands in mine is to feel warmth in the coldest hours.",
   "if nobody seems to notice your small wins, i always do. palagi ipapaalala sa'yo ni coli.",
]

export function SurpriseModal({ isOpen, onClose }: SurpriseModalProps) {
  const [revealed, setRevealed] = useState<number[]>([])
  const [isRevealing, setIsRevealing] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setRevealed([])
      setIsRevealing(false)
    }
  }, [isOpen])

  const revealAll = async () => {
    setIsRevealing(true)
    for (let i = 0; i < reasons.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      setRevealed((prev) => [...prev, i])
    }
    setIsRevealing(false)
  }

  const revealOne = (index: number) => {
    if (!revealed.includes(index)) {
      setRevealed((prev) => [...prev, index])
    }
  }

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
            className="relative w-full max-w-md bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-amber-200/50 transition-colors text-foreground/60 hover:text-foreground z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <div className="text-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 1, -1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl mb-3"
                >
                  𓍯𓂃𓏧♡
                </motion.div>
                <h3 className="font-serif text-2xl text-foreground">
                  
                </h3>
                <p className="font-sans text-sm text-muted-foreground mt-1">
                  Tap each card to reveal
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 max-h-72 overflow-y-auto">
                {reasons.map((reason, index) => (
                  <motion.button
                    key={index}
                    onClick={() => revealOne(index)}
                    whileHover={{ scale: revealed.includes(index) ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-10 rounded-xl text-left transition-all min-h-[80px] ${
                      revealed.includes(index)
                        ? "bg-gradient-to-br from-rose-100 to-pink-100"
                        : "bg-amber-100 hover:bg-amber-200"
                    }`}
                  >
                    {revealed.includes(index) ? (
                      <motion.div
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="font-sans text-s text-foreground/80 leading-snug">
                          {reason}
                        </span>
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <Sparkles className="w-5 h-5 text-amber-400 mb-1" />
                        <span className="font-serif text-lg text-amber-600">
                          #{index + 1}
                        </span>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={revealAll}
                disabled={isRevealing || revealed.length === reasons.length}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-serif rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {revealed.length === reasons.length
                  ? "All Revealed!"
                  : isRevealing
                  ? "Revealing..."
                  : "Reveal All"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
