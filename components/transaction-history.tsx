"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface EncryptedTransaction {
  id: string
  type: "buy" | "sell" | "swap" | "stake"
  symbol: string
  amount: string // encrypted display
  date: string
  status: "confirmed" | "pending"
}

export default function TransactionHistory() {
  const transactions: EncryptedTransaction[] = [
    {
      id: "1",
      type: "buy",
      symbol: "SOL",
      amount: "★★.★★ SOL",
      date: "2 hours ago",
      status: "confirmed",
    },
    {
      id: "2",
      type: "swap",
      symbol: "SOL → USDC",
      amount: "★★★★.★★",
      date: "1 day ago",
      status: "confirmed",
    },
    {
      id: "3",
      type: "stake",
      symbol: "SOL",
      amount: "★★.★ SOL",
      date: "3 days ago",
      status: "confirmed",
    },
    {
      id: "4",
      type: "sell",
      symbol: "JUP",
      amount: "★★★★.★★★",
      date: "5 days ago",
      status: "confirmed",
    },
  ]

  const getTypeIcon = (type: string) => {
    return type === "buy" || type === "stake" ? (
      <ArrowDownLeft className="w-4 h-4" />
    ) : (
      <ArrowUpRight className="w-4 h-4" />
    )
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Lock className="w-4 h-4 text-accent" />
          Encrypted Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors text-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  {getTypeIcon(tx.type)}
                </div>
                <div>
                  <p className="font-semibold capitalize">{tx.type}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm">{tx.amount}</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {tx.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
