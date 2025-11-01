"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePriceFeed } from "@/hooks/use-price-feed"
import { TrendingUp, TrendingDown, Zap } from "lucide-react"
import { useEffect } from "react"

interface LivePriceTickerProps {
  symbols: string[]
}

export default function LivePriceTicker({ symbols }: LivePriceTickerProps) {
  const { prices, loading, startPolling, stopPolling } = usePriceFeed(symbols)

  useEffect(() => {
    startPolling()
    return () => stopPolling()
  }, [startPolling, stopPolling])

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Zap className="w-4 h-4 text-accent" />
          Live Prices (Real-time)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {loading ? (
            <p className="text-sm text-muted-foreground text-center py-4">Loading prices...</p>
          ) : (
            symbols.map((symbol) => {
              const data = prices[symbol]
              if (!data) return null

              const isPositive = data.change24h >= 0

              return (
                <div
                  key={symbol}
                  className="flex items-center justify-between p-3 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-semibold">{symbol.substring(0, 2)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{symbol}</p>
                      <p className="text-xs text-muted-foreground">{data.source}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-semibold">${data.price.toFixed(4)}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3 text-accent" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive" />
                      )}
                      <span className={`text-xs font-mono ${isPositive ? "text-accent" : "text-destructive"}`}>
                        {isPositive ? "+" : ""}
                        {data.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
