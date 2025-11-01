export const nodeCommandExamples = {
  publicIp: "curl https://ipecho.net/plain ; echo",
  installArcium: "curl --proto '=https' --tlsv1.2 -sSfL https://install.arcium.com/ | bash",
  verifyInstall: "arcium --version && arcup --version",
  genNodeKeypair: "solana-keygen new --outfile node-keypair.json --no-bip39-passphrase",
  genCallbackKeypair: "solana-keygen new --outfile callback-kp.json --no-bip39-passphrase",
  genIdentityKeypair: "openssl genpkey -algorithm Ed25519 -out identity.pem",
  getNodeAddress: "solana address --keypair node-keypair.json",
  getCallbackAddress: "solana address --keypair callback-kp.json",
  fundNode: "solana airdrop 2 <node-pubkey> -u devnet",
  fundCallback: "solana airdrop 2 <callback-pubkey> -u devnet",
  setSolanaConfig: "solana config set --url https://api.devnet.solana.com",
  initAccounts: `arcium init-arx-accs \\
  --keypair-path node-keypair.json \\
  --callback-keypair-path callback-kp.json \\
  --peer-keypair-path identity.pem \\
  --node-offset <your-node-offset> \\
  --ip-address <YOUR_PUBLIC_IP> \\
  --rpc-url https://api.devnet.solana.com`,
  initCluster: `arcium init-cluster \\
  --keypair-path node-keypair.json \\
  --offset <cluster-offset> \\
  --max-nodes 10 \\
  --rpc-url https://api.devnet.solana.com`,
  joinCluster: `arcium join-cluster true \\
  --keypair-path node-keypair.json \\
  --node-offset <your-node-offset> \\
  --cluster-offset <cluster-offset> \\
  --rpc-url https://api.devnet.solana.com`,
}

export const generateNodeConfig = (offset: string, rpcUrl: string, rpcWss: string) => {
  return `[node]
offset = ${offset}
hardware_claim = 0
starting_epoch = 0
ending_epoch = 9223372036854775807

[network]
address = "0.0.0.0"

[solana]
endpoint_rpc = "${rpcUrl}"
endpoint_wss = "${rpcWss}"
cluster = "Devnet"
commitment.commitment = "confirmed"`
}

export const setupSteps = [
  {
    title: "Prerequisites",
    description: "Install required tools",
  },
  {
    title: "Workspace Setup",
    description: "Create workspace directory",
  },
  {
    title: "Install Arcium",
    description: "Install tooling and CLI",
  },
  {
    title: "Generate Keypairs",
    description: "Create security keypairs",
  },
  {
    title: "Fund Accounts",
    description: "Add Devnet SOL",
  },
  {
    title: "Initialize Node",
    description: "Register onchain",
  },
  {
    title: "Configure Node",
    description: "Set up configuration",
  },
  {
    title: "Cluster Operations",
    description: "Join or create cluster",
  },
  {
    title: "Deploy Docker",
    description: "Start node container",
  },
  {
    title: "Verify Operation",
    description: "Check node status",
  },
]
