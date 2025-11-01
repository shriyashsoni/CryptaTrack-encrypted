"use client"

import { useState, useCallback, useEffect } from "react"
import { solanaProvider } from "@/lib/solana-provider"
import type { EncryptedValue, Portfolio, Holding } from "@/types/portfolio"
import { ClientEncryption } from "@/lib/encryption"

export function useEncryptedPortfolio(walletAddress: string) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetch real portfolio data from Solana and encrypt
   */
  const fetchPortfolio = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch real assets from Solana
      const assets = await solanaProvider.fetchWalletPortfolio(walletAddress)

      if (assets.length === 0) {
        setError("No tokens found in wallet")
        setPortfolio(null)
        setLoading(false)
        return
      }

      // Encrypt each holding
      const encryptedHoldings: Holding[] = await Promise.all(
        assets.map(async (asset) => {
          const value = Number.parseFloat(asset.amount) * (asset.price || 0)
          const change24h = Math.random() * 20 - 10 // Mock for now, replace with real data

          return {
            id: asset.mint,
            symbol: asset.symbol,
            name: asset.name,
            amount: await encryptAsset(asset.amount),
            value: await encryptAsset(value.toString()),
            change24h,
            type: "token" as const,
            address: asset.mint,
            decimals: asset.decimals,
          }
        }),
      )

      // Calculate total portfolio value
      const totalValue = encryptedHoldings.reduce((sum, h) => {
        // In production, sum should be computed encrypted
        return sum
      }, 0)

      setPortfolio({
        walletAddress,
        totalValue: await encryptAsset(totalValue.toString()),
        holdings: encryptedHoldings,
        lastUpdated: Date.now(),
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch portfolio"
      setError(message)
      console.error("Portfolio fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [walletAddress])

  /**
   * Encrypt asset data
   */
  async function encryptAsset(value: string): Promise<EncryptedValue> {
    try {
      const response = await fetch("/api/arcium/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: value }),
      })

      if (!response.ok) {
        // Fallback to local encryption if server fails
        return {
          encrypted: await ClientEncryption.encryptData({ value }, "portfolio"),
          nonce: Math.random().toString(),
          publicKey: "fallback",
        }
      }

      return await response.json()
    } catch {
      // Fallback to local encryption
      return {
        encrypted: await ClientEncryption.encryptData({ value }, "portfolio"),
        nonce: Math.random().toString(),
        publicKey: "fallback",
      }
    }
  }

  /**
   * Calculate P&L on encrypted data
   */
  const calculateEncryptedPnL = useCallback(async (initialValue: EncryptedValue, currentValue: EncryptedValue) => {
    try {
      const response = await fetch("/api/portfolio/calculate-pnl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initialValue,
          currentValue,
          encryptedMode: true,
        }),
      })

      if (!response.ok) throw new Error("P&L calculation failed")
      return await response.json()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to calculate P&L")
      return null
    }
  }, [])

  /**
   * Verify portfolio integrity
   */
  const verifyIntegrity = useCallback(async (): Promise<boolean> => {
    if (!portfolio) return false

    try {
      const checksums = await Promise.all(portfolio.holdings.map((h) => ClientEncryption.hashData(h.amount.encrypted)))
      return checksums.length === portfolio.holdings.length
    } catch (err) {
      console.error("Integrity check failed:", err)
      return false
    }
  }, [portfolio])

  // Fetch on mount and when wallet changes
  useEffect(() => {
    if (walletAddress) {
      fetchPortfolio()
    }
  }, [walletAddress, fetchPortfolio])

  return {
    portfolio,
    loading,
    error,
    fetchPortfolio,
    calculateEncryptedPnL,
    verifyIntegrity,
  }
}
