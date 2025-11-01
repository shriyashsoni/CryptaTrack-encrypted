"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import NodeSection from "@/components/node-section"
import { AlertCircle, BookOpen, Server } from "lucide-react"

export default function NodesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-10 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Server className="h-8 w-8 text-accent" />
            <h1 className="text-4xl font-bold">Arcium Testnet Node Operator</h1>
          </div>
          <p className="text-lg text-muted-foreground">Set up and manage your ARX node on Solana Devnet</p>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Network</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Solana Devnet</p>
              <p className="text-xs text-muted-foreground">Public Testnet</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Compute Type</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">MPC/FHE</p>
              <p className="text-xs text-muted-foreground">Encrypted Computation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Coming Soon</p>
              <p className="text-xs text-muted-foreground">Staking & incentives</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <NodeSection />

        {/* Resources */}
        <div className="mt-12 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  Documentation
                </CardTitle>
                <CardDescription>Learn more about Arcium</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href="#" className="block text-sm text-accent hover:underline">
                  Network Overview
                </a>
                <a href="#" className="block text-sm text-accent hover:underline">
                  Installation Guide
                </a>
                <a href="#" className="block text-sm text-accent hover:underline">
                  Troubleshooting
                </a>
                <a href="#" className="block text-sm text-accent hover:underline">
                  Security Best Practices
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  RPC Providers
                </CardTitle>
                <CardDescription>For better reliability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="https://helius.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-accent hover:underline"
                >
                  Helius (Free tier available)
                </a>
                <a
                  href="https://quicknode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-accent hover:underline"
                >
                  QuickNode (Free tier available)
                </a>
                <p className="text-xs text-muted-foreground mt-3">Free tiers are sufficient for testnet operations</p>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Community Support</AlertTitle>
            <AlertDescription>
              Join the Arcium Discord for community support, updates on testnet activities, and to connect with other
              node operators.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </main>
  )
}
