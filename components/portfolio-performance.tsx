"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { period: "1W", value: 2430 },
  { period: "2W", value: 1398 },
  { period: "3W", value: 9800 },
  { period: "4W", value: 3908 },
  { period: "5W", value: 4800 },
  { period: "6W", value: 3800 },
  { period: "7W", value: 4300 },
]

export default function PortfolioPerformance() {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-base">Performance Trend (Encrypted)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="period" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
              }}
              labelStyle={{ color: "var(--color-foreground)" }}
            />
            <Bar dataKey="value" fill="var(--color-primary)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
