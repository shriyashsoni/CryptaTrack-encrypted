"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, Zap } from "lucide-react"
import type { Holding } from "@/types/portfolio"

interface HoldingsListProps {
  holdings: Holding[]
}

export default function HoldingsList({ holdings }: HoldingsListProps) {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-accent" />
          Your Holdings ({holdings.length} assets)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {holdings.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No holdings found</p>
          ) : (
            holdings.map((holding) => (
              <div
                key={holding.id}
                className="flex items-center justify-between p-3 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{holding.symbol}</p>
                    <p className="text-xs text-muted-foreground">{holding.name}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-mono text-sm">{holding.amount}</p>
                  <div className="flex items-center justify-end gap-2">
                    <p className="font-mono text-sm">{holding.value}</p>
                    <Badge variant={holding.change24h >= 0 ? "default" : "destructive"} className="text-xs">
                      {holding.change24h >= 0 ? "+" : ""}
                      {holding.change24h.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
