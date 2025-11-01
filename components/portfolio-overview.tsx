"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Lock } from "lucide-react"
import type { Portfolio } from "@/types/portfolio"

interface PortfolioOverviewProps {
  portfolio: Portfolio
}

export default function PortfolioOverview({ portfolio }: PortfolioOverviewProps) {
  // Calculate total portfolio value from holdings
  const holdings = portfolio.holdings
  const totalHoldings = holdings.length
  const avgChange24h = holdings.length > 0 ? holdings.reduce((sum, h) => sum + h.change24h, 0) / holdings.length : 0

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {/* Total Value */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Total Portfolio Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-accent" />
              <span className="text-2xl font-bold font-mono">★★★★★★★★★★★★</span>
            </div>
            <p className="text-xs text-muted-foreground">Arcium Encrypted ({totalHoldings} assets)</p>
          </div>
        </CardContent>
      </Card>

      {/* Average 24h Change */}
      <Card className="border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            24h Avg Change
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className={`text-2xl font-bold ${avgChange24h >= 0 ? "text-accent" : "text-destructive"}`}>
              {avgChange24h >= 0 ? "+" : ""}
              {avgChange24h.toFixed(2)}%
            </p>
            <p className="text-xs text-muted-foreground">Across all holdings</p>
          </div>
        </CardContent>
      </Card>

      {/* Holdings Count */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalHoldings}</p>
          <p className="text-xs text-muted-foreground">Tokens & positions</p>
        </CardContent>
      </Card>

      {/* Privacy Status */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Privacy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <p className="text-sm font-medium">Protected</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">MPC Encrypted</p>
        </CardContent>
      </Card>
    </div>
  )
}
