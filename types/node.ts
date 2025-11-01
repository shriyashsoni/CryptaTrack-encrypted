export interface NodeSetup {
  offset: number
  nodeKeypairPath: string
  callbackKeypairPath: string
  identityKeypairPath: string
  publicIp: string
  rpcUrl: string
  rpcWss: string
}

export interface NodeConfig {
  node: {
    offset: number
    hardware_claim: number
    starting_epoch: number
    ending_epoch: number
  }
  network: {
    address: string
  }
  solana: {
    endpoint_rpc: string
    endpoint_wss: string
    cluster: string
    commitment: {
      commitment: string
    }
  }
}

export interface NodeStatus {
  offset: number
  status: "active" | "inactive" | "syncing"
  uptime: number
  computations: number
  rewards: number
  lastUpdate: Date
  cpuUsage: number
  memoryUsage: number
  peersConnected: number
}

export interface ClusterInfo {
  offset: number
  authority: string
  maxNodes: number
  currentNodes: number
  created: Date
}
