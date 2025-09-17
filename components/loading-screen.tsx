"use client"

import { useEffect, useState } from "react"

interface LoadingScreenProps {
  message?: string
}

export function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-6"></div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {message}
          <span className="inline-block w-8 text-left">{dots}</span>
        </h2>
        <p className="text-muted-foreground">Please wait while we prepare your content</p>
      </div>
    </div>
  )
}
