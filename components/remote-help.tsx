"use client"

import { useState, useEffect } from "react"
import { HelpCircle, X } from "lucide-react"
import { useTVNavigation } from "@/hooks/use-tv-navigation"

export function RemoteHelp() {
  const [isVisible, setIsVisible] = useState(false)

  const helpRef = useTVNavigation({
    id: "help-button",
    onSelect: () => setIsVisible(!isVisible),
  })

  const closeRef = useTVNavigation({
    id: "help-close",
    onSelect: () => setIsVisible(false),
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F1" || e.key === "Help") {
        e.preventDefault()
        setIsVisible(!isVisible)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isVisible])

  return (
    <>
      {/* Help Button */}
      <button
        ref={helpRef}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary/80 hover:bg-primary text-white rounded-full flex items-center justify-center transition-all duration-200 focus:ring-4 focus:ring-primary/50 z-50"
        tabIndex={-1}
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* Help Overlay */}
      {isVisible && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="glassmorphism rounded-2xl p-8 max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Remote Control Guide</h2>
              <button
                ref={closeRef}
                className="text-muted-foreground hover:text-foreground transition-colors focus:ring-2 focus:ring-primary rounded"
                tabIndex={-1}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Navigation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <kbd className="bg-muted px-2 py-1 rounded">↑ ↓ ← →</kbd> Navigate
                  </li>
                  <li>
                    <kbd className="bg-muted px-2 py-1 rounded">Enter</kbd> Select
                  </li>
                  <li>
                    <kbd className="bg-muted px-2 py-1 rounded">Escape</kbd> Back
                  </li>
                  <li>
                    <kbd className="bg-muted px-2 py-1 rounded">Home</kbd> Home Screen
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Shortcuts</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <kbd className="bg-muted px-2 py-1 rounded">0-9</kbd> Direct Channel
                  </li>
                  <li>
                    <kbd className="bg-muted px-2 py-1 rounded">Page ↑↓</kbd> Fast Scroll
                  </li>
                  <li>
                    <kbd className="bg-muted px-2 py-1 rounded">F1</kbd> Help
                  </li>
                  <li>
                    <kbd className="bg-muted px-2 py-1 rounded">Space</kbd> Play/Pause
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Tip:</strong> Use number keys (1-9) on Live TV page to jump directly to channels. Press and hold
                for 1.5 seconds to auto-select.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
