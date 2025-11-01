"use client"

import type { PublicKey } from "@solana/web3.js"

export interface WalletAdapter {
  publicKey: PublicKey | null
  connected: boolean
  connect(): Promise<void>
  disconnect(): Promise<void>
  signTransaction(tx: any): Promise<any>
}

export class PhantomWalletAdapter implements WalletAdapter {
  public publicKey: PublicKey | null = null
  public connected = false
  private phantom: any = null

  async getPhantomProvider() {
    if (this.phantom) return this.phantom

    if ("solana" in window) {
      const provider = (window as any).solana
      if (provider?.isPhantom) {
        this.phantom = provider
        return provider
      }
    }

    throw new Error("Phantom wallet not found")
  }

  async connect(): Promise<void> {
    try {
      const provider = await this.getPhantomProvider()
      const response = await provider.connect()
      this.publicKey = response.publicKey
      this.connected = true
    } catch (error) {
      throw new Error(`Failed to connect wallet: ${error}`)
    }
  }

  async disconnect(): Promise<void> {
    try {
      const provider = await this.getPhantomProvider()
      await provider.disconnect()
      this.publicKey = null
      this.connected = false
    } catch (error) {
      console.error("Disconnect error:", error)
    }
  }

  async signTransaction(tx: any): Promise<any> {
    const provider = await this.getPhantomProvider()
    return await provider.signTransaction(tx)
  }
}

export const phantomWallet = new PhantomWalletAdapter()
