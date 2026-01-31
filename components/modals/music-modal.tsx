"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, Music } from "lucide-react"
import { useState } from "react"

interface MusicModalProps {
  isOpen: boolean
  onClose: () => void
}

// Spotify track IDs for romantic songs
// You can replace these with your own favorite songs!
// To get the track ID: Right-click song on Spotify > Share > Copy Song Link
// The ID is the last part of the URL: https://open.spotify.com/track/[TRACK_ID]
const playlist = [
  { title: "j's lullaby (darlin' i'd wait for you)", artist: "Delaney Bailey", spotifyId: "42fqHPmmjKP52VktkY10bm" },
  { title: "Just Because", artist: "mrld", spotifyId: "3Ues7YM3y8JYnTeu2OYFVH" },
  { title: "Anghel", artist: "brando bal", spotifyId: "6KBG2jtGvLjkcIkFUKO0rt" },
  { title: "Julyo", artist: "David La Sol", spotifyId: "5xx5Xocla6VmY6TLvVZdMk" },
  { title: "My Heart It Beats for You", artist: "grentperez", spotifyId: "4oZKyVTuQwKAXlplVagooE" },
  { title: "A Piece of You", artist: "Nathaniel Constantin", spotifyId: "1bYRmNYrXbzbLq1CEBZHRe" },
]

export function MusicModal({ isOpen, onClose }: MusicModalProps) {
  const [currentSong, setCurrentSong] = useState(0)
  const [likedSongs, setLikedSongs] = useState<number[]>([])

  const toggleLike = (index: number) => {
    setLikedSongs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
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
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md max-h-[90vh] bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-rose-200/50 transition-colors text-foreground/60 hover:text-foreground z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="p-6 pb-2 text-center shrink-0">
              <span className="text-3xl">‧₊˚🖇️✩ ₊˚🎧⊹♡</span>
              <h3 className="font-serif text-xl text-foreground mt-2">Playlist</h3>
              <p className="font-sans text-sm text-muted-foreground">Songs that remind me of you</p>
            </div>

            {/* Spotify Player Embed */}
            <div className="px-6 pb-4 shrink-0">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe
                  key={playlist[currentSong].spotifyId}
                  src={`https://open.spotify.com/embed/track/${playlist[currentSong].spotifyId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Playlist */}
            <div className="px-4 pb-6 flex-1 overflow-hidden flex flex-col min-h-0">
              <h4 className="font-serif text-lg text-foreground mb-3 px-2 shrink-0">Choose a song</h4>
              <div className="flex-1 overflow-y-auto space-y-1">
                {playlist.map((song, index) => (
                  <motion.div
                    key={index}
                    onClick={() => setCurrentSong(index)}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer ${
                      currentSong === index
                        ? "bg-primary/20"
                        : "hover:bg-rose-100"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      currentSong === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-rose-200 text-foreground/60"
                    }`}>
                      {currentSong === index ? (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          <Music className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <span className="font-sans text-sm">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-sans text-sm text-foreground">{song.title}</p>
                      <p className="font-sans text-xs text-muted-foreground">{song.artist}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(index)
                      }}
                      className="p-1"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          likedSongs.includes(index)
                            ? "fill-red-500 text-red-500"
                            : "text-foreground/40"
                        }`}
                      />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
