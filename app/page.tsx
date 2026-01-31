"use client"

import { useState, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { IntroAnimation } from "@/components/intro-animation"
import { HomeSection } from "@/components/home-section"
import { FlowerGarden } from "@/components/flower-garden"
import { FinalMessage } from "@/components/final-message"
import { LettersModal } from "@/components/modals/letters-modal"
import { MusicModal } from "@/components/modals/music-modal"
import { GameModal } from "@/components/modals/game-modal"
import { SurpriseModal } from "@/components/modals/surprise-modal"

type Page = "intro" | "home" | "garden" | "final"
type ModalType = "letters" | "music" | "game" | "surprise" | null

export default function MonthsaryPage() {
  const [currentPage, setCurrentPage] = useState<Page>("intro")
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [visitedFlowers, setVisitedFlowers] = useState<string[]>([])

  const handleIntroComplete = useCallback(() => {
    setCurrentPage("home")
  }, [])

  const handleProceed = () => {
    setCurrentPage("garden")
  }

  const handleFlowerClick = (flower: string) => {
    if (!visitedFlowers.includes(flower)) {
      setVisitedFlowers((prev) => [...prev, flower])
    }
    setActiveModal(flower as ModalType)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const handleFinalMessage = () => {
    setCurrentPage("final")
  }

  const handleRestart = () => {
    setCurrentPage("intro")
    setVisitedFlowers([])
    setActiveModal(null)
  }

  const allVisited = visitedFlowers.length === 4

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentPage === "intro" && (
          <IntroAnimation key="intro" onComplete={handleIntroComplete} />
        )}

        {currentPage === "home" && (
          <HomeSection key="home" onProceed={handleProceed} />
        )}

        {currentPage === "garden" && (
          <FlowerGarden
            key="garden"
            onFlowerClick={handleFlowerClick}
            visitedFlowers={visitedFlowers}
            allVisited={allVisited}
            onFinalMessage={handleFinalMessage}
          />
        )}

        {currentPage === "final" && (
          <FinalMessage key="final" onRestart={handleRestart} />
        )}
      </AnimatePresence>

      {/* Modals */}
      <LettersModal isOpen={activeModal === "letters"} onClose={closeModal} />
      <MusicModal isOpen={activeModal === "music"} onClose={closeModal} />
      <GameModal isOpen={activeModal === "game"} onClose={closeModal} />
      <SurpriseModal isOpen={activeModal === "surprise"} onClose={closeModal} />
    </main>
  )
}
