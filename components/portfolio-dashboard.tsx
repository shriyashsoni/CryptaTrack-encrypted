"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Lock, LogOut, RefreshCw, AlertCircle, Loader } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import PortfolioOverview from "./portfolio-overview"
import HoldingsList from "./holdings-list"
import EncryptedAnalytics from "./encrypted-analytics"
import TransactionHistory from "./transaction-history"
import PortfolioPerformance from "./portfolio-performance"
import AnalyticsDashboard from "./analytics-dashboard"
import ArciumIntegration from "./arcium-integration"
import LivePriceTicker from "./live-price-ticker"
import { useEncryptedPortfolio } from "@/hooks/use-encrypted-portfolio"

interface PortfolioDashboardProps {
  walletAddress: string
  onDisconnect: () => void
}

export default function PortfolioDashboard({ walletAddress, onDisconnect }: PortfolioDashboardProps) {
  const [refreshing, setRefreshing] = useState(false)
  const { portfolio, loading, error, fetchPortfolio } = useEncryptedPortfolio(walletAddress)
  const symbols = ["SOL", "USDC", "JUP", "ORCA"]

  useEffect(() => {
    fetchPortfolio()
  }, [walletAddress, fetchPortfolio])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchPortfolio()
    await new Promise((resolve) => setTimeout(resolve, 500))
    setRefreshing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold">Arcium Portfolio</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-sm">
              <span className="text-muted-foreground">Wallet:</span>
              <span className="font-mono text-accent">
                {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className="gap-2 bg-transparent"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing || loading ? "animate-spin" : ""}`} />
              {refreshing ? "Updating" : "Refresh"}
            </Button>
            <Button variant="outline" size="sm" onClick={onDisconnect} className="gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Disconnect
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-destructive/50 bg-destructive/10">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && !portfolio ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader className="w-8 h-8 text-accent animate-spin" />
            <p className="text-muted-foreground">Loading portfolio...</p>
          </div>
        ) : portfolio ? (
          <div className="space-y-6">
            {/* Overview */}
            <PortfolioOverview portfolio={portfolio} />

            {/* Main Grid */}
            <div className="grid gap-6 lg:grid-cols-4">
              <div className="lg:col-span-3 space-y-6">
                <HoldingsList holdings={portfolio.holdings} />
                <LivePriceTicker symbols={symbols} />
                <AnalyticsDashboard />
                <PortfolioPerformance />
                <TransactionHistory />
              </div>
              <div className="space-y-6">
                <EncryptedAnalytics />
                <ArciumIntegration />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No portfolio data available</p>
          </div>
        )}
      </main>
    </div>
  )
}
