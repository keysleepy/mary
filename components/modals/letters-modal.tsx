"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface LettersModalProps {
  isOpen: boolean
  onClose: () => void
}

const letters = [
  {
    title: "My Dearest, Ai",
    content: `Every moment with you feels like a beautiful dream i never want to wake up from. Paano, sa panaginip lang din kasi kita nakikita at nakakasama.
    And a month in, i've learned the weight of your absence as carefully as i've learned the sound of your voice.

    Palagi nalang kita namimiss, kahit kausap naman kita. Hay.`,
  },
  {
    title: "",
    content: `Parang "it's learning how to miss someone without resenting the distance that made the missing possible." atake
    
    You've taught me what it means to truly love and be loved. 
    Hindi man tayo sigurado kung tayo talaga tulad nung napag-kuwentuhan natin, pero i promise na habang nasa akin ka, mamahalin kita nang buo.`,
  },
  {
    title: "",
    content: `If longing is the cost of loving you right now,
I will pay it—
gently, willingly,
until waiting turns into holding.

Eternally yours,
Arkey`,
  },
]

export function LettersModal({ isOpen, onClose }: LettersModalProps) {
  const [currentLetter, setCurrentLetter] = useState(0)

  const nextLetter = () => setCurrentLetter((prev) => (prev + 1) % letters.length)
  const prevLetter = () => setCurrentLetter((prev) => (prev - 1 + letters.length) % letters.length)

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
            initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 20 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[85vh] bg-cream rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              background: "linear-gradient(135deg, #fef7f0 0%, #fdf2f8 100%)",
            }}
          >
            {/* Letter header decoration */}
            <div className="h-2 md:h-3 bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300 shrink-0" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-3 md:top-5 md:right-4 p-2 rounded-full hover:bg-rose-100 transition-colors text-foreground/60 hover:text-foreground z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-5 md:p-8 pt-4 md:pt-6 flex flex-col flex-1 overflow-hidden">
              <div className="text-center mb-4 md:mb-6 shrink-0">
                <span className="text-3xl md:text-4xl">ִֶָ𓂃 ࣪˖ ִֶָ🐇་༘࿐</span>
                <h3 className="font-serif text-xl md:text-3xl text-foreground mt-1 md:mt-2">
                  {letters[currentLetter].title}
                </h3>
              </div>

              <motion.div
                key={currentLetter}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 overflow-y-auto min-h-0"
              >
                <p className="font-sans text-base md:text-lg text-foreground/80 whitespace-pre-line leading-relaxed">
                  {letters[currentLetter].content}
                </p>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-4 md:mt-6 pt-3 md:pt-4 border-t border-rose-200 shrink-0">
                <button
                  onClick={prevLetter}
                  className="flex items-center gap-1 px-3 md:px-4 py-2 rounded-full hover:bg-rose-100 transition-colors text-foreground/70 hover:text-foreground"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="font-sans text-xs md:text-sm">Previous</span>
                </button>
                
                <div className="flex gap-2">
                  {letters.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentLetter(idx)}
                      className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors ${
                        idx === currentLetter ? "bg-primary" : "bg-rose-200"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextLetter}
                  className="flex items-center gap-1 px-3 md:px-4 py-2 rounded-full hover:bg-rose-100 transition-colors text-foreground/70 hover:text-foreground"
                >
                  <span className="font-sans text-xs md:text-sm">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
