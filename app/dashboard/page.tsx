"use client"

import { useState } from "react"
import Link from "next/link"
import PortfolioDashboard from "@/components/portfolio-dashboard"
import WalletConnect from "@/components/wallet-connect"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Server, ArrowLeft } from "lucide-react"

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setWalletAddress(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto py-6 px-4 pt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold">Encrypted Portfolio</h1>
            <p className="text-muted-foreground mt-1">Track your holdings privately with Arcium</p>
          </div>
          <Link href="/nodes">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Server className="h-4 w-4" />
              Node Operator
            </Button>
          </Link>
        </div>

        {!isConnected ? (
          <WalletConnect onConnect={handleWalletConnect} />
        ) : (
          <PortfolioDashboard walletAddress={walletAddress!} onDisconnect={handleDisconnect} />
        )}
      </div>

      <Footer />
    </main>
  )
}
