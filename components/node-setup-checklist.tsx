"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle } from "lucide-react"

interface ChecklistItem {
  id: string
  title: string
  description: string
  category: string
}

export default function NodeSetupChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const checklistItems: ChecklistItem[] = [
    // Prerequisites
    { id: "rust", title: "Install Rust", description: "rustup.rs", category: "Prerequisites" },
    {
      id: "solana-cli",
      title: "Install Solana CLI",
      description: "CLI tools for keypair management",
      category: "Prerequisites",
    },
    {
      id: "docker",
      title: "Install Docker & Docker Compose",
      description: "Container runtime",
      category: "Prerequisites",
    },
    { id: "openssl", title: "Install OpenSSL", description: "For keypair generation", category: "Prerequisites" },
    { id: "git", title: "Install Git", description: "Version control", category: "Prerequisites" },

    // Workspace Setup
    {
      id: "workspace",
      title: "Create arcium-node-setup directory",
      description: "mkdir arcium-node-setup",
      category: "Setup",
    },
    {
      id: "public-ip",
      title: "Get your public IP address",
      description: "curl https://ipecho.net/plain",
      category: "Setup",
    },

    // Installation
    {
      id: "arcium-install",
      title: "Install Arcium tooling",
      description: "curl install.arcium.com",
      category: "Installation",
    },
    {
      id: "arcium-verify",
      title: "Verify Arcium installation",
      description: "arcium --version",
      category: "Installation",
    },

    // Keypair Generation
    {
      id: "node-keypair",
      title: "Generate Node Authority Keypair",
      description: "node-keypair.json",
      category: "Keypairs",
    },
    {
      id: "callback-keypair",
      title: "Generate Callback Authority Keypair",
      description: "callback-kp.json",
      category: "Keypairs",
    },
    {
      id: "identity-keypair",
      title: "Generate Identity Keypair",
      description: "identity.pem (PKCS#8 Ed25519)",
      category: "Keypairs",
    },

    // Account Funding
    {
      id: "node-address",
      title: "Get node public key",
      description: "solana address --keypair node-keypair.json",
      category: "Funding",
    },
    {
      id: "callback-address",
      title: "Get callback public key",
      description: "solana address --keypair callback-kp.json",
      category: "Funding",
    },
    {
      id: "fund-node",
      title: "Fund node account with SOL",
      description: "solana airdrop 2 <address> -u devnet",
      category: "Funding",
    },
    {
      id: "fund-callback",
      title: "Fund callback account with SOL",
      description: "solana airdrop 2 <address> -u devnet",
      category: "Funding",
    },

    // Configuration
    {
      id: "config-file",
      title: "Create node-config.toml",
      description: "Configuration for your node",
      category: "Configuration",
    },
    {
      id: "rpc-config",
      title: "Set RPC endpoints",
      description: "Configure Solana RPC URLs",
      category: "Configuration",
    },
    {
      id: "solana-config",
      title: "Configure Solana CLI",
      description: "solana config set --url https://api.devnet.solana.com",
      category: "Configuration",
    },

    // Node Initialization
    {
      id: "init-accounts",
      title: "Initialize node accounts onchain",
      description: "arcium init-arx-accs",
      category: "Initialization",
    },
    {
      id: "init-cluster",
      title: "Create or join a cluster",
      description: "arcium init-cluster or join-cluster",
      category: "Initialization",
    },

    // Docker Deployment
    {
      id: "log-dir",
      title: "Create arx-node-logs directory",
      description: "mkdir -p arx-node-logs && touch arx-node-logs/arx.log",
      category: "Deployment",
    },
    {
      id: "docker-run",
      title: "Deploy node with Docker",
      description: "docker run with proper volume mounts",
      category: "Deployment",
    },
    {
      id: "port-forward",
      title: "Verify port 8080 is open",
      description: "Check firewall and cloud provider settings",
      category: "Deployment",
    },

    // Verification
    {
      id: "verify-running",
      title: "Verify node is running",
      description: "docker logs -f arx-node",
      category: "Verification",
    },
    {
      id: "check-status",
      title: "Check node status onchain",
      description: "arcium arx-info <offset>",
      category: "Verification",
    },
    {
      id: "check-active",
      title: "Check if node is active",
      description: "arcium arx-active <offset>",
      category: "Verification",
    },
  ]

  const categories = Array.from(new Set(checklistItems.map((item) => item.category)))
  const progress = (checkedItems.size / checklistItems.length) * 100

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedItems(newChecked)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Setup Checklist</h2>
        <p className="text-muted-foreground mt-2">Track your progress through the node setup process</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
          <span className="text-xs text-muted-foreground">
            {checkedItems.size} of {checklistItems.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-6">
        {categories.map((category) => {
          const categoryItems = checklistItems.filter((item) => item.category === category)
          const categoryComplete = categoryItems.filter((item) => checkedItems.has(item.id)).length

          return (
            <Card key={category}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{category}</CardTitle>
                    <CardDescription>
                      {categoryComplete} of {categoryItems.length} completed
                    </CardDescription>
                  </div>
                  <Badge variant={categoryComplete === categoryItems.length ? "default" : "outline"}>
                    {Math.round((categoryComplete / categoryItems.length) * 100)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 cursor-pointer transition-colors"
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="mt-1">
                      {checkedItems.has(item.id) ? (
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${checkedItems.has(item.id) ? "line-through text-muted-foreground" : ""}`}
                      >
                        {item.title}
                      </p>
                      <p className="text-sm text-muted-foreground font-mono">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
