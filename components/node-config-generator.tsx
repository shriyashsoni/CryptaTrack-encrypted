"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, Download } from "lucide-react"

export default function NodeConfigGenerator() {
  const [formData, setFormData] = useState({
    nodeOffset: "",
    clusterOffset: "",
    rpcUrl: "https://api.devnet.solana.com",
    rpcWss: "wss://api.devnet.solana.com",
    maxNodes: "10",
  })
  const [copiedConfig, setCopiedConfig] = useState(false)

  const generateConfig = () => {
    return `[node]
offset = ${formData.nodeOffset}
hardware_claim = 0
starting_epoch = 0
ending_epoch = 9223372036854775807

[network]
address = "0.0.0.0"

[solana]
endpoint_rpc = "${formData.rpcUrl}"
endpoint_wss = "${formData.rpcWss}"
cluster = "Devnet"
commitment.commitment = "confirmed"`
  }

  const copyConfig = () => {
    navigator.clipboard.writeText(generateConfig())
    setCopiedConfig(true)
    setTimeout(() => setCopiedConfig(false), 2000)
  }

  const downloadConfig = () => {
    const config = generateConfig()
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(config))
    element.setAttribute("download", "node-config.toml")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Node Configuration Generator</h2>
        <p className="text-muted-foreground mt-2">Generate your node-config.toml file</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuration Details</CardTitle>
            <CardDescription>Enter your node parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nodeOffset">Node Offset (8-10 digits)</Label>
              <Input
                id="nodeOffset"
                placeholder="e.g., 123456789"
                value={formData.nodeOffset}
                onChange={(e) => setFormData({ ...formData, nodeOffset: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Unique ID for your node on the network</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clusterOffset">Cluster Offset (optional)</Label>
              <Input
                id="clusterOffset"
                placeholder="e.g., 987654321"
                value={formData.clusterOffset}
                onChange={(e) => setFormData({ ...formData, clusterOffset: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">For creating or joining clusters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rpcUrl">RPC URL</Label>
              <Input
                id="rpcUrl"
                value={formData.rpcUrl}
                onChange={(e) => setFormData({ ...formData, rpcUrl: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Solana RPC endpoint (HTTP)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rpcWss">RPC WebSocket</Label>
              <Input
                id="rpcWss"
                value={formData.rpcWss}
                onChange={(e) => setFormData({ ...formData, rpcWss: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Solana RPC endpoint (WebSocket)</p>
            </div>

            <Alert>
              <AlertDescription>
                For better reliability, consider using Helius or QuickNode instead of public endpoints
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Configuration</CardTitle>
            <CardDescription>node-config.toml</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-input p-4 rounded-lg font-mono text-xs whitespace-pre-wrap break-all max-h-96 overflow-y-auto">
              {generateConfig()}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyConfig} className="flex-1 bg-transparent">
                <Copy className="h-4 w-4 mr-2" />
                {copiedConfig ? "Copied!" : "Copy"}
              </Button>
              <Button variant="outline" size="sm" onClick={downloadConfig} className="flex-1 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
