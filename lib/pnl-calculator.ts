"use client"

import { arciumClient } from "./arcium-client"
import type { EncryptedValue } from "@/types/portfolio"

/**
 * P&L Calculator using Arcium's encrypted compute
 * All calculations happen on encrypted data - values never exposed
 */

export interface PnLMetrics {
  totalGain: EncryptedValue
  totalGainPercent: EncryptedValue
  realizedGain: EncryptedValue
  unrealizedGain: EncryptedValue
  dayChange: EncryptedValue
  weekChange: EncryptedValue
}

export interface AssetPnL {
  symbol: string
  entryPrice: EncryptedValue
  currentPrice: EncryptedValue
  quantity: EncryptedValue
  totalGain: EncryptedValue
  gainPercent: EncryptedValue
}

export class PnLCalculator {
  /**
   * Calculate P&L on encrypted data
   * Sends encrypted values to Arcium, gets encrypted results back
   */
  static async calculatePortfolioPnL(
    holdings: Array<{
      symbol: string
      amount: EncryptedValue
      value: EncryptedValue
      costBasis?: EncryptedValue
    }>,
  ): Promise<PnLMetrics> {
    try {
      // Create aggregated encrypted request
      const encryptedData = await arciumClient.aggregateEncryptedValues(holdings.map((h) => h.value))

      // Compute P&L on encrypted data
      const result = await arciumClient.computeOnEncrypted({
        operation: "calculate_pnl",
        encryptedData: encryptedData,
        parameters: {
          holdings: holdings.map((h) => ({
            symbol: h.symbol,
            value: h.value.encrypted,
            costBasis: h.costBasis?.encrypted || "0",
          })),
        },
      })

      return {
        totalGain: result.result,
        totalGainPercent: result.result,
        realizedGain: result.result,
        unrealizedGain: result.result,
        dayChange: result.result,
        weekChange: result.result,
      }
    } catch (error) {
      console.error("Error calculating P&L:", error)
      throw error
    }
  }

  /**
   * Calculate individual asset P&L
   */
  static async calculateAssetPnL(
    symbol: string,
    entryPrice: EncryptedValue,
    currentPrice: EncryptedValue,
    quantity: EncryptedValue,
  ): Promise<AssetPnL> {
    try {
      const result = await arciumClient.computeOnEncrypted({
        operation: "calculate_pnl",
        encryptedData: quantity,
        parameters: {
          entryPrice: entryPrice.encrypted,
          currentPrice: currentPrice.encrypted,
        },
      })

      return {
        symbol,
        entryPrice,
        currentPrice,
        quantity,
        totalGain: result.result,
        gainPercent: result.result,
      }
    } catch (error) {
      console.error(`Error calculating P&L for ${symbol}:`, error)
      throw error
    }
  }

  /**
   * Compare portfolio performance against benchmark
   * Uses encrypted comparison to avoid revealing amounts
   */
  static async comparePerformance(
    portfolioReturn: EncryptedValue,
    benchmarkReturn: EncryptedValue,
  ): Promise<EncryptedValue> {
    try {
      return await arciumClient
        .computeOnEncrypted({
          operation: "compute_analytics",
          encryptedData: portfolioReturn,
          parameters: {
            benchmarkReturn: benchmarkReturn.encrypted,
          },
        })
        .then((r) => r.result)
    } catch (error) {
      console.error("Error comparing performance:", error)
      throw error
    }
  }

  /**
   * Calculate weighted portfolio performance
   */
  static async calculateWeightedReturn(
    holdings: Array<{
      weight: EncryptedValue
      return: EncryptedValue
    }>,
  ): Promise<EncryptedValue> {
    try {
      const values = holdings.map((h) => h.weight)
      const aggregated = await arciumClient.aggregateEncryptedValues(values)

      return await arciumClient
        .computeOnEncrypted({
          operation: "compute_analytics",
          encryptedData: aggregated,
          parameters: {
            holdings: holdings.map((h) => ({
              weight: h.weight.encrypted,
              return: h.return.encrypted,
            })),
          },
        })
        .then((r) => r.result)
    } catch (error) {
      console.error("Error calculating weighted return:", error)
      throw error
    }
  }
}
