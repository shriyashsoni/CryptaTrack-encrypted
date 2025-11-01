"use client"

import { useState, useEffect, useCallback } from "react"
import { priceFeed, type PortfolioPrices } from "@/lib/price-feed"

export function usePriceFeed(symbols: string[], updateInterval = 10000) {
  const [prices, setPrices] = useState<PortfolioPrices>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    // Initial fetch
    priceFeed
      .getPrices(symbols)
      .then((p) => {
        setPrices(p)
        setLoading(false)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to fetch prices")
        setLoading(false)
      })

    // Subscribe to updates
    const unsubscribe = priceFeed.subscribe((newPrices) => {
      setPrices(newPrices)
    })

    return () => {
      unsubscribe()
    }
  }, [symbols])

  const startPolling = useCallback(() => {
    priceFeed.startPolling(symbols, updateInterval)
  }, [symbols, updateInterval])

  const stopPolling = useCallback(() => {
    priceFeed.stopPolling()
  }, [])

  return { prices, loading, error, startPolling, stopPolling }
}
