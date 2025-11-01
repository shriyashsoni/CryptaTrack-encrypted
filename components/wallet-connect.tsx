"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Wallet, Shield, AlertCircle } from "lucide-react"
import { phantomWallet } from "@/lib/wallet-adapter"

interface WalletConnectProps {
  onConnect: (address: string) => void
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConnect = async () => {
    setConnecting(true)
    setError(null)

    try {
      await phantomWallet.connect()
      if (phantomWallet.publicKey) {
        onConnect(phantomWallet.publicKey.toString())
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to connect wallet"
      setError(message)
    } finally {
      setConnecting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-2xl">
        <div className="grid gap-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-accent" />
              <h1 className="text-4xl font-bold">Arcium Portfolio</h1>
            </div>
            <p className="text-lg text-muted-foreground">Encrypted DeFi Portfolio Tracking</p>
          </div>

          {/* Main Card */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>Securely connect your Solana wallet to view your encrypted portfolio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Benefits */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2 p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <Lock className="w-5 h-5 text-accent" />
                  <p className="font-semibold text-sm">End-to-End Encrypted</p>
                  <p className="text-xs text-muted-foreground">Your portfolio data is encrypted using Arcium's MPC</p>
                </div>
                <div className="space-y-2 p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <Shield className="w-5 h-5 text-accent" />
                  <p className="font-semibold text-sm">Zero Knowledge Compute</p>
                  <p className="text-xs text-muted-foreground">Calculate profits without exposing raw data</p>
                </div>
                <div className="space-y-2 p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <Wallet className="w-5 h-5 text-accent" />
                  <p className="font-semibold text-sm">Private Holdings</p>
                  <p className="text-xs text-muted-foreground">Only you can view your balances</p>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Connection Button */}
              <div className="space-y-3">
                <Button
                  onClick={handleConnect}
                  disabled={connecting}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {connecting ? "Connecting..." : "Connect Phantom Wallet"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  No funds required • Testnet ready • Arcium Phase 2
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Info Section */}
          <div className="space-y-4 text-sm text-muted-foreground">
            <p className="text-center">Using Solana's speed with Arcium's encrypted compute for privacy-first DeFi</p>
          </div>
        </div>
      </div>
    </div>
  )
}
