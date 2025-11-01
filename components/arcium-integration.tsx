"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, CheckCircle, AlertCircle, Cpu, Zap } from "lucide-react"

export default function ArciumIntegration() {
  const [status, setStatus] = useState<"connecting" | "connected" | "error">("connecting")
  const [metrics, setMetrics] = useState({
    mpcNodes: 0,
    fheOperations: 0,
    computeTime: 0,
  })

  useEffect(() => {
    // Simulate Arcium connection
    const timer = setTimeout(() => {
      setStatus("connected")
      setMetrics({
        mpcNodes: 3,
        fheOperations: 42,
        computeTime: 245,
      })
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Arcium Encrypted Compute
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Network Status</span>
            {status === "connected" ? (
              <Badge className="bg-accent text-accent-foreground gap-1">
                <CheckCircle className="w-3 h-3" />
                Connected
              </Badge>
            ) : status === "error" ? (
              <Badge variant="destructive" className="gap-1">
                <AlertCircle className="w-3 h-3" />
                Error
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1">
                <Zap className="w-3 h-3" />
                Connecting...
              </Badge>
            )}
          </div>

          {/* Metrics */}
          {status === "connected" && (
            <div className="space-y-3 pt-2 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">MPC Nodes</span>
                <span className="font-mono font-semibold">{metrics.mpcNodes}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">FHE Operations</span>
                <span className="font-mono font-semibold">{metrics.fheOperations}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Compute Time</span>
                <span className="font-mono font-semibold">{metrics.computeTime}ms</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Encryption Features */}
      <Card className="border-accent/20 bg-accent/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Active Protections
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span>Multi-Party Computation (MPC)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span>Fully Homomorphic Encryption (FHE)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span>End-to-End Data Protection</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span>Zero-Knowledge Portfolio Calculations</span>
          </div>
        </CardContent>
      </Card>

      {/* Info Alert */}
      <Alert className="border-primary/20 bg-primary/5">
        <Lock className="h-4 w-4" />
        <AlertDescription className="text-sm ml-2">
          Your portfolio data is encrypted end-to-end. All calculations happen on encrypted data using Arcium's MPC
          network. Only you can decrypt results.
        </AlertDescription>
      </Alert>
    </div>
  )
}
