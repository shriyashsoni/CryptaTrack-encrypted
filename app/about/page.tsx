import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Users, Target, Zap } from "lucide-react"

export default function About() {
  return (
    <main className="bg-background text-foreground">
      <Navigation />

      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">About Arcium</h1>
          <p className="text-xl text-muted-foreground mb-12">
            We're building privacy-first infrastructure for decentralized finance. Our mission is to make encrypted
            computation accessible to every DeFi user on Solana.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card border border-border rounded-lg p-8">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                Empower users to maintain financial privacy while participating fully in decentralized ecosystems.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <Users className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Team</h3>
              <p className="text-muted-foreground">
                Experienced cryptographers, blockchain engineers, and DeFi experts united by a passion for privacy.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <Zap className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                A world where encrypted computation is the standard, not the exception in DeFi applications.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-12 mb-12">
            <h2 className="text-3xl font-bold mb-6">Why We Built This</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                In traditional DeFi, your portfolio holdings are completely transparent on the blockchain. Anyone can
                see your wallet address, holdings, and transaction history. This creates serious privacy and security
                risks.
              </p>
              <p>Arcium's encrypted compute allows users to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Calculate portfolio metrics without exposing data to servers or smart contracts</li>
                <li>Track P&L completely privately using real-time price feeds</li>
                <li>Verify computations cryptographically without trusting a central party</li>
                <li>Maintain complete control of their financial data at all times</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-12">
            <h2 className="text-3xl font-bold mb-6">Technology</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Multi-Party Computation (MPC)</h3>
                <p className="text-muted-foreground">
                  Distributed computation across multiple parties ensures no single entity sees sensitive data.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Fully Homomorphic Encryption (FHE)</h3>
                <p className="text-muted-foreground">
                  Perform calculations on encrypted data without decryption, maintaining privacy throughout computation.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Solana Integration</h3>
                <p className="text-muted-foreground">
                  Native Solana integration for fast, low-cost portfolio tracking with cryptographic verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
