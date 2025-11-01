export interface EncryptedValue {
  encrypted: string
  nonce: string
  publicKey: string
}

export interface Portfolio {
  walletAddress: string
  totalValue: EncryptedValue
  holdings: Holding[]
  lastUpdated: number
}

export interface Holding {
  id: string
  symbol: string
  name: string
  amount: EncryptedValue
  value: EncryptedValue
  change24h: number
  type: "token" | "lp" | "nft"
  address: string
  decimals: number
}

export interface ArciumComputeRequest {
  operation: "calculate_pnl" | "aggregate_value" | "compute_analytics"
  encryptedData: EncryptedValue
  parameters?: Record<string, any>
}

export interface ArciumComputeResponse {
  result: EncryptedValue
  timestamp: number
  signature: string
}
