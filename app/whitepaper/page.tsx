import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Whitepaper() {
  return (
    <main className="bg-background text-foreground">
      <Navigation />

      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Arcium: Encrypted Portfolio Tracking</h1>
            <p className="text-xl text-muted-foreground mb-8">
              A privacy-preserving protocol for DeFi portfolio management using encrypted computation
            </p>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4" /> Download PDF
            </Button>
          </div>

          <div className="bg-card border border-border rounded-lg p-12 space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-4">1. Abstract</h2>
              <p className="text-muted-foreground leading-relaxed">
                This whitepaper introduces Arcium, a privacy-first portfolio tracking system for decentralized finance
                (DeFi) on Solana. By leveraging multi-party computation (MPC) and fully homomorphic encryption (FHE),
                Arcium enables users to track their holdings, calculate profits and losses, and verify portfolio metrics
                without exposing sensitive data to any central authority.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">2. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The transparency of blockchain technology creates a fundamental privacy challenge: all transactions and
                holdings are visible on-chain. While this transparency ensures security and verifiability, it leaves
                users vulnerable to targeted attacks, privacy breaches, and financial surveillance.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Arcium addresses this challenge by providing cryptographically-secure portfolio analytics that preserve
                user privacy while maintaining verifiability and computational integrity. Using Solana's high-speed,
                low-cost infrastructure combined with encrypted computation, users can manage their portfolios with
                confidence that their financial data remains private.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">3. Problem Statement</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Current Challenges:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>
                    Portfolio aggregation platforms require users to share private keys or API keys with third parties
                  </li>
                  <li>On-chain portfolio analytics expose holdings to network participants</li>
                  <li>Centralized platforms create honeypots for attackers</li>
                  <li>Users lack verifiable proof that computations are performed correctly</li>
                  <li>No privacy standards exist for financial data in DeFi</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">4. Technical Architecture</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">4.1 Encryption Layer</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    User data is encrypted client-side using AES-256-GCM before transmission. Encryption keys are
                    derived from the user's wallet and never leave their client.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">4.2 Encrypted Computation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Portfolio calculations (P&L, allocation, performance metrics) are performed on encrypted data using
                    Arcium's MPC and FHE network. Results are decrypted only by the user, ensuring server-side systems
                    never see plaintext data.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">4.3 Verification & Proofs</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cryptographic proofs verify computation integrity. Users can independently verify that calculations
                    were performed correctly without trusting Arcium.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">5. Key Features</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>End-to-end encrypted portfolio tracking</li>
                <li>Real-time P&L calculations on encrypted data</li>
                <li>Multi-party computation for distributed trust</li>
                <li>Fully homomorphic encryption for arbitrary computations</li>
                <li>Cryptographic verification of computation results</li>
                <li>Solana integration for low-cost, high-speed operations</li>
                <li>User-controlled decryption of results</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">6. Privacy Model</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In Arcium's privacy model, no single entity (not even Arcium) can observe user portfolio data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong>Client:</strong> Encrypts data and retains decryption keys
                </li>
                <li>
                  <strong>Arcium Network:</strong> Performs computation on encrypted data, never sees plaintext
                </li>
                <li>
                  <strong>Smart Contracts:</strong> Verify proofs without accessing sensitive data
                </li>
                <li>
                  <strong>Third Parties:</strong> Cannot intercept or surveil portfolio information
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">7. Use Cases</h2>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground ml-4">
                <li>Private portfolio aggregation and tracking</li>
                <li>Confidential wealth management for institutions</li>
                <li>Privacy-preserving DeFi analytics</li>
                <li>Compliance-aware portfolio reporting</li>
                <li>Secure multi-party portfolio management</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">8. Conclusion</h2>
              <p className="text-muted-foreground leading-relaxed">
                Arcium introduces a new standard for privacy in DeFi. By combining advanced cryptographic techniques
                with Solana's efficient blockchain, we enable users to participate fully in decentralized finance
                without sacrificing financial privacy. This opens new possibilities for institutional adoption, personal
                wealth management, and privacy-preserving applications in the Web3 ecosystem.
              </p>
            </section>

            <div className="border-t border-border pt-8 mt-12">
              <p className="text-sm text-muted-foreground">
                © 2025 Arcium. This whitepaper describes the technical vision and implementation of Arcium's encrypted
                portfolio platform. Technology subject to change. Visit arcium.com for the latest updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
