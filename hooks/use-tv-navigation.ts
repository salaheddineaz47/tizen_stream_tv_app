"use client"

import { useEffect, useRef } from "react"
import { tvNavigation, type NavigationItem } from "@/lib/navigation"

interface UseTVNavigationProps {
  id: string
  onSelect?: () => void
  onFocus?: () => void
  onBlur?: () => void
  autoFocus?: boolean
}

export function useTVNavigation({ id, onSelect, onFocus, onBlur, autoFocus = false }: UseTVNavigationProps) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const item: NavigationItem = {
      id,
      element: elementRef.current,
      onSelect,
      onFocus,
      onBlur,
    }

    tvNavigation.registerItem(item)

    if (autoFocus) {
      setTimeout(() => tvNavigation.focus(id), 100)
    }

    return () => {
      tvNavigation.unregisterItem(id)
    }
  }, [id, onSelect, onFocus, onBlur, autoFocus])

  return elementRef
}
