"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { EncryptedValue } from "@/types/portfolio"
import { arciumClient } from "@/lib/arcium-client"
import { useState, useEffect } from "react"
import { Lock, TrendingUp, TrendingDown } from "lucide-react"

interface PnLDisplayProps {
  totalGain: EncryptedValue
  gainPercent: EncryptedValue
  isPositive: boolean
}

export default function PnLDisplay({ totalGain, gainPercent, isPositive }: PnLDisplayProps) {
  const [displayValue, setDisplayValue] = useState("★★★★★★ (Encrypted)")
  const [displayPercent, setDisplayPercent] = useState("★★.★% (Encrypted)")

  useEffect(() => {
    const decryptDisplay = async () => {
      try {
        const gain = await arciumClient.decryptData(totalGain)
        const percent = await arciumClient.decryptData(gainPercent)

        // Format for display
        setDisplayValue(`$${gain?.result?.toLocaleString() || "0.00"}`)
        setDisplayPercent(`${percent?.result?.toFixed(2) || "0.00"}%`)
      } catch {
        // Keep encrypted display on error
        setDisplayValue("★★★★★★ (Encrypted)")
        setDisplayPercent("★★.★% (Encrypted)")
      }
    }

    decryptDisplay()
  }, [totalGain, gainPercent])

  return (
    <Card className="border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-accent" />
          ) : (
            <TrendingDown className="w-4 h-4 text-destructive" />
          )}
          Encrypted P&L
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Gain</span>
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3 text-accent" />
            <span className="font-mono text-lg font-bold">{displayValue}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Return %</span>
          <Badge variant={isPositive ? "default" : "destructive"} className="font-mono">
            {displayPercent}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Lock className="w-3 h-3" />
          Decrypted only in your browser
        </p>
      </CardContent>
    </Card>
  )
}
