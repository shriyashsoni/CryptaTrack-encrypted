"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, Shield, Cpu } from "lucide-react"

export default function EncryptedAnalytics() {
  return (
    <div className="space-y-4">
      {/* MPC Compute Status */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Arcium Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">MPC Compute:</span>
              <Badge variant="outline" className="text-accent border-accent">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">FHE Encryption:</span>
              <Badge variant="outline" className="text-accent border-accent">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Data Privacy:</span>
              <Badge variant="outline" className="text-accent border-accent">
                Secured
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Info */}
      <Card className="border-accent/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Encryption Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="space-y-1">
            <p className="font-semibold text-accent">Your data is:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Encrypted end-to-end</li>
              <li>• Never visible to backend</li>
              <li>• Computed on encrypted data</li>
              <li>• Only decrypted locally</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Arcium Info */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Powered by Arcium
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs text-muted-foreground">
          <p>
            Multi-Party Computation (MPC) and Fully Homomorphic Encryption (FHE) enable zero-knowledge portfolio
            calculations.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
