"use client"

import { Connection, PublicKey } from "@solana/web3.js"

export interface SolanaAsset {
  mint: string
  amount: string
  decimals: number
  symbol: string
  name: string
  price?: number
  logoURI?: string
}

const RPC_ENDPOINT = process.env.NEXT_PUBLIC_SOLANA_RPC || "https://api.devnet.solana.com"

export class SolanaProvider {
  private connection: Connection

  constructor() {
    this.connection = new Connection(RPC_ENDPOINT, "confirmed")
  }

  /**
   * Fetch token balances for a wallet using the Token Program
   */
  async fetchWalletPortfolio(walletAddress: string): Promise<SolanaAsset[]> {
    try {
      const publicKey = new PublicKey(walletAddress)

      // Get SOL balance (native token)
      const balance = await this.connection.getBalance(publicKey)
      const assets: SolanaAsset[] = [
        {
          mint: "11111111111111111111111111111111",
          amount: (balance / 1e9).toString(),
          decimals: 9,
          symbol: "SOL",
          name: "Solana",
          price: await this.getTokenPrice("SOL"),
          logoURI:
            "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        },
      ]

      // Get SPL token balances
      const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(publicKey, {
        programId: new PublicKey("TokenkegQfeZyiNwAJsyFbPVwwQQfKP6Sc6k8w2k8w"),
      })

      for (const { account } of tokenAccounts.value) {
        const tokenData = account.data as any
        if (tokenData.parsed?.info?.tokenAmount?.uiAmount > 0) {
          const mint = tokenData.parsed.info.mint
          const amount = tokenData.parsed.info.tokenAmount.uiAmount

          assets.push({
            mint,
            amount: amount.toString(),
            decimals: tokenData.parsed.info.tokenAmount.decimals,
            symbol: this.getTokenSymbol(mint),
            name: this.getTokenName(mint),
            price: await this.getTokenPrice(this.getTokenSymbol(mint)),
          })
        }
      }

      return assets
    } catch (error) {
      console.error("Failed to fetch portfolio:", error)
      return []
    }
  }

  /**
   * Get token price from multiple sources with fallback
   */
  async getTokenPrice(symbol: string): Promise<number> {
    try {
      // Try Pyth Network first (on-chain oracle)
      const pythPrice = await this.getPythPrice(symbol)
      if (pythPrice) return pythPrice

      // Fallback to CoinGecko
      return await this.getCoinGeckoPrice(symbol)
    } catch (error) {
      console.error(`Failed to fetch price for ${symbol}:`, error)
      return 0
    }
  }

  /**
   * Get price from Pyth Network oracle
   */
  private async getPythPrice(symbol: string): Promise<number | null> {
    try {
      const response = await fetch("https://hermes.pyth.network/api/latest_price_feeds")
      const data = await response.json()

      // Find the feed for this symbol
      const feed = data.find((f: any) => f.attributes.symbol === symbol)
      if (feed) {
        return Math.abs(Number.parseFloat(feed.attributes.price.price) / Math.pow(10, feed.attributes.price.expo))
      }
      return null
    } catch {
      return null
    }
  }

  /**
   * Get price from CoinGecko API
   */
  private async getCoinGeckoPrice(symbol: string): Promise<number> {
    try {
      const coinId = this.getCoinGeckoId(symbol)
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`,
        { next: { revalidate: 60 } }, // Cache for 60 seconds
      )
      const data = await response.json()
      return data[coinId]?.usd || 0
    } catch {
      return 0
    }
  }

  private getTokenSymbol(mint: string): string {
    const symbolMap: Record<string, string> = {
      So11111111111111111111111111111111111111112: "SOL",
      EPjFWaLb3ufEZzauUZFc3Z6xwg4ziUvvQKP81EcLqQ45: "USDC",
      JUPyiwrYJFskUPiHa7hkeR8QnsDjsKc5DiiYWeLMb2V: "JUP",
      orcaEKTdK7LKz57chysJ34G6V5dT42j5d5cH3RTAp7: "ORCA",
    }
    return symbolMap[mint] || "UNKNOWN"
  }

  private getTokenName(mint: string): string {
    const nameMap: Record<string, string> = {
      So11111111111111111111111111111111111111112: "Solana",
      EPjFWaLb3ufEZzauUZFc3Z6xwg4ziUvvQKP81EcLqQ45: "USD Coin",
      JUPyiwrYJFskUPiHa7hkeR8QnsDjsKc5DiiYWeLMb2V: "Jupiter",
      orcaEKTdK7LKz57chysJ34G6V5dT42j5d5cH3RTAp7: "Orca",
    }
    return nameMap[mint] || "Unknown Token"
  }

  private getCoinGeckoId(symbol: string): string {
    const idMap: Record<string, string> = {
      SOL: "solana",
      USDC: "usd-coin",
      JUP: "jupiter",
      ORCA: "orca",
    }
    return idMap[symbol] || symbol.toLowerCase()
  }
}

export const solanaProvider = new SolanaProvider()
