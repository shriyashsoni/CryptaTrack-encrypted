"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

export default function DockerDeploymentGuide() {
  const [copiedStep, setCopiedStep] = useState<string | null>(null)

  const copyToClipboard = (text: string, stepId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(stepId)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const dockerCommand = `docker run -d \\
  --name arx-node \\
  -e NODE_IDENTITY_FILE=/usr/arx-node/node-keys/node_identity.pem \\
  -e NODE_KEYPAIR_FILE=/usr/arx-node/node-keys/node_keypair.json \\
  -e OPERATOR_KEYPAIR_FILE=/usr/arx-node/node-keys/operator_keypair.json \\
  -e CALLBACK_AUTHORITY_KEYPAIR_FILE=/usr/arx-node/node-keys/callback_authority_keypair.json \\
  -e NODE_CONFIG_PATH=/usr/arx-node/arx/node_config.toml \\
  -v "$(pwd)/node-config.toml:/usr/arx-node/arx/node_config.toml" \\
  -v "$(pwd)/node-keypair.json:/usr/arx-node/node-keys/node_keypair.json:ro" \\
  -v "$(pwd)/node-keypair.json:/usr/arx-node/node-keys/operator_keypair.json:ro" \\
  -v "$(pwd)/callback-kp.json:/usr/arx-node/node-keys/callback_authority_keypair.json:ro" \\
  -v "$(pwd)/identity.pem:/usr/arx-node/node-keys/node_identity.pem:ro" \\
  -v "$(pwd)/arx-node-logs:/usr/arx-node/logs" \\
  -p 8080:8080 \\
  arcium/arx-node`

  const verificationCommands = [
    { cmd: "pwd", desc: "Should show: /path/to/arcium-node-setup" },
    {
      cmd: "ls",
      desc: "Should show: node-keypair.json, callback-kp.json, identity.pem, node-config.toml, arx-node-logs/",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Docker Deployment</h2>
        <p className="text-muted-foreground mt-2">Deploy your ARX node using Docker containers</p>
      </div>

      <Alert>
        <AlertDescription>
          Docker Compose is the recommended way to manage your node. It simplifies configuration and enables easy
          scaling.
        </AlertDescription>
      </Alert>

      {/* Preparation */}
      <Card>
        <CardHeader>
          <CardTitle>Step 1: Prepare Logs Directory</CardTitle>
          <CardDescription>Create local directory for logs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-input p-4 rounded-lg font-mono text-sm">
            mkdir -p arx-node-logs && touch arx-node-logs/arx.log
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard("mkdir -p arx-node-logs && touch arx-node-logs/arx.log", "logs")}
            className="w-full"
          >
            <Copy className="h-4 w-4 mr-2" />
            {copiedStep === "logs" ? "Copied!" : "Copy Command"}
          </Button>
        </CardContent>
      </Card>

      {/* Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Step 2: Verify Files</CardTitle>
          <CardDescription>Ensure all required files are in place</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verificationCommands.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-sm font-medium">{item.desc}</p>
              <div className="bg-input p-4 rounded-lg font-mono text-sm">{item.cmd}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Docker Run */}
      <Card>
        <CardHeader>
          <CardTitle>Step 3: Deploy Node</CardTitle>
          <CardDescription>Start the ARX node container</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-input p-4 rounded-lg font-mono text-xs break-all max-h-80 overflow-y-auto">
            {dockerCommand}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(dockerCommand, "docker")}
            className="w-full"
          >
            <Copy className="h-4 w-4 mr-2" />
            {copiedStep === "docker" ? "Copied!" : "Copy Command"}
          </Button>
          <Alert>
            <AlertDescription>
              Note: The operator keypair uses the same file as your node keypair for simplified testnet setup.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Port Forwarding */}
      <Card>
        <CardHeader>
          <CardTitle>Port Forwarding</CardTitle>
          <CardDescription>Ensure port 8080 is accessible</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              If your node is behind NAT or cloud firewall, ensure port 8080 is:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Forwarded on your router</li>
                <li>Allowed in your cloud provider firewall</li>
                <li>Open in your OS firewall</li>
              </ul>
            </AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground">
            Configure network.address = "0.0.0.0" in your node-config.toml to bind to all interfaces.
          </p>
        </CardContent>
      </Card>

      {/* Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle>Step 4: Monitor Node</CardTitle>
          <CardDescription>Check logs and node status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">View Logs:</p>
              <div className="bg-input p-4 rounded-lg font-mono text-sm">docker logs -f arx-node</div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard("docker logs -f arx-node", "logs-view")}
                className="w-full mt-2"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copiedStep === "logs-view" ? "Copied!" : "Copy Command"}
              </Button>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Check Node Status:</p>
              <div className="bg-input p-4 rounded-lg font-mono text-sm">
                arcium arx-info {"<your-node-offset>"} --rpc-url https://api.devnet.solana.com
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Check if Node is Active:</p>
              <div className="bg-input p-4 rounded-lg font-mono text-sm">
                arcium arx-active {"<your-node-offset>"} --rpc-url https://api.devnet.solana.com
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
