"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, Copy, Server } from "lucide-react"

export default function NodeSetupGuide() {
  const [copiedStep, setCopiedStep] = useState<string | null>(null)

  const copyToClipboard = (text: string, stepId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(stepId)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const setupSteps = [
    {
      id: "prerequisites",
      title: "Prerequisites",
      description: "Install required tools and verify your system",
      items: [
        { label: "Rust", link: "https://rustup.rs" },
        { label: "Solana CLI", link: "https://docs.solana.com/cli/install-solana-cli-tools" },
        { label: "Docker & Docker Compose", link: "https://www.docker.com/products/docker-desktop" },
        { label: "OpenSSL", instruction: "Usually pre-installed on macOS/Linux" },
        { label: "Git", instruction: "For version control" },
      ],
    },
    {
      id: "workspace",
      title: "Setup Workspace",
      description: "Create and organize your node workspace",
      command: "mkdir arcium-node-setup && cd arcium-node-setup",
      explanation: "Stay in this directory for all remaining steps",
    },
    {
      id: "public-ip",
      title: "Find Your Public IP",
      description: "Get your public IP address for node registration",
      command: "curl https://ipecho.net/plain ; echo",
      explanation: "You'll need this IP address when initializing your node accounts",
    },
    {
      id: "install-tooling",
      title: "Install Arcium Tooling",
      description: "Install Arcium CLI and ARX node software",
      command: "curl --proto '=https' --tlsv1.2 -sSfL https://install.arcium.com/ | bash",
      verification: "arcium --version && arcup --version",
    },
    {
      id: "keypairs",
      title: "Generate Keypairs",
      description: "Create three secure keypairs for node operations",
      keypairs: [
        {
          name: "Node Authority Keypair",
          command: "solana-keygen new --outfile node-keypair.json --no-bip39-passphrase",
          purpose: "Identifies your node and handles onchain operations",
        },
        {
          name: "Callback Authority Keypair",
          command: "solana-keygen new --outfile callback-kp.json --no-bip39-passphrase",
          purpose: "Signs callback computations",
        },
        {
          name: "Identity Keypair",
          command: "openssl genpkey -algorithm Ed25519 -out identity.pem",
          purpose: "Handles node-to-node communication",
        },
      ],
    },
    {
      id: "fund-accounts",
      title: "Fund Your Accounts",
      description: "Add Devnet SOL for transaction fees",
      steps: [
        "Get your node public key: solana address --keypair node-keypair.json",
        "Get your callback public key: solana address --keypair callback-kp.json",
        "Fund node: solana airdrop 2 <node-pubkey> -u devnet",
        "Fund callback: solana airdrop 2 <callback-pubkey> -u devnet",
      ],
      tip: "If airdrop fails, use https://faucet.solana.com/",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Arcium Testnet Node Setup</h1>
        <p className="text-muted-foreground mt-2">
          Follow this step-by-step guide to set up your ARX node on Solana Devnet
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Keep all keypairs safe and private. Store them securely and don't share with anyone. This is production-grade
          security guidance.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="prerequisites" className="space-y-4">
        <TabsList className="grid grid-cols-2 lg:grid-cols-6 h-auto">
          {setupSteps.map((step) => (
            <TabsTrigger key={step.id} value={step.id} className="text-xs">
              {step.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {setupSteps.map((step) => (
          <TabsContent key={step.id} value={step.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-accent" />
                  {step.title}
                </CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {step.id === "prerequisites" && step.items && (
                  <div className="space-y-2">
                    {step.items.map((item, idx) => (
                      <div key={idx} className="flex items-start justify-between p-3 bg-card border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{item.label}</p>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-accent hover:underline"
                            >
                              {item.link}
                            </a>
                          )}
                          {item.instruction && <p className="text-sm text-muted-foreground">{item.instruction}</p>}
                        </div>
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                )}

                {step.id === "workspace" && step.command && (
                  <div className="space-y-2">
                    <div className="bg-input p-4 rounded-lg font-mono text-sm break-all">{step.command}</div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(step.command, step.id)}
                      className="w-full"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copiedStep === step.id ? "Copied!" : "Copy Command"}
                    </Button>
                    <p className="text-sm text-muted-foreground">{step.explanation}</p>
                  </div>
                )}

                {step.id === "public-ip" && step.command && (
                  <div className="space-y-2">
                    <div className="bg-input p-4 rounded-lg font-mono text-sm">{step.command}</div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(step.command, step.id)}
                      className="w-full"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copiedStep === step.id ? "Copied!" : "Copy Command"}
                    </Button>
                    <p className="text-sm text-muted-foreground">{step.explanation}</p>
                  </div>
                )}

                {step.id === "install-tooling" && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Installation Command:</p>
                      <div className="bg-input p-4 rounded-lg font-mono text-sm break-all">{step.command}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(step.command, "install")}
                        className="w-full"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        {copiedStep === "install" ? "Copied!" : "Copy Command"}
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Verification:</p>
                      <div className="bg-input p-4 rounded-lg font-mono text-sm">{step.verification}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(step.verification || "", "verify")}
                        className="w-full"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        {copiedStep === "verify" ? "Copied!" : "Copy Verification"}
                      </Button>
                    </div>
                  </div>
                )}

                {step.id === "keypairs" && step.keypairs && (
                  <div className="space-y-4">
                    {step.keypairs.map((kp, idx) => (
                      <div key={idx} className="border rounded-lg p-4 space-y-2">
                        <h4 className="font-medium">{kp.name}</h4>
                        <p className="text-sm text-muted-foreground">{kp.purpose}</p>
                        <div className="bg-input p-3 rounded font-mono text-xs break-all">{kp.command}</div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(kp.command, `kp-${idx}`)}
                          className="w-full"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          {copiedStep === `kp-${idx}` ? "Copied!" : "Copy Command"}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {step.id === "fund-accounts" && step.steps && (
                  <div className="space-y-4">
                    <ol className="space-y-2 list-decimal list-inside">
                      {step.steps.map((s, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          {s}
                        </li>
                      ))}
                    </ol>
                    {step.tip && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{step.tip}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
