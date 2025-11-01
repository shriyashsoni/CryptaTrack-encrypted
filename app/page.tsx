"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { EncryptedVault3D } from "@/components/3d-encrypted-vault"
import { ArrowRight, Lock, Zap, Shield } from "lucide-react"
import { PoweredByBadge } from "@/components/powered-by-badge"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-6">
                Privacy-First DeFi
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
                Track Your Crypto Portfolio
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {" "}
                  Privately
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-balance">
                See your DeFi holdings encrypted and secure. CryptaTrack calculates P&L without exposing your data,
                powered by Arcium's encrypted compute on Solana.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Start Tracking <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/whitepaper">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-border">
                <PoweredByBadge />
              </div>
            </div>
            <div className="h-96 md:h-full rounded-2xl overflow-hidden border border-primary/20 bg-card/50">
              <EncryptedVault3D />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Why CryptaTrack?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition">
              <Lock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">End-to-End Encrypted</h3>
              <p className="text-muted-foreground">
                Your portfolio data is encrypted locally and computed on encrypted data. Only you can see your holdings.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2">Real-time P&L</h3>
              <p className="text-muted-foreground">
                Instantly track profit/loss with live price feeds from Solana, without server access to your data.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 hover:border-secondary/50 transition">
              <Shield className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Built on Solana</h3>
              <p className="text-muted-foreground">
                Leverage Solana's speed and low costs with cryptographic proofs of computation via Arcium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Secure Your Portfolio?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Connect your wallet with CryptaTrack and start tracking with complete privacy. No middleman, no exposed
            data.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Launch Dashboard <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <div className="mt-6">
            <PoweredByBadge />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
