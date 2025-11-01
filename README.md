# Arcium Encrypted Portfolio Dashboard

A privacy-first DeFi portfolio tracking application built on Solana using Arcium's encrypted compute capabilities.

## Features

### Privacy-First Architecture
- **End-to-End Encryption**: All portfolio data is encrypted before leaving your device
- **Zero-Knowledge Compute**: P&L calculations happen on encrypted data using Arcium's MPC/FHE
- **Client-Side Decryption**: Only your browser can decrypt portfolio information
- **No Data Leakage**: The platform, server, or Arcium never see raw portfolio data

### Core Functionality
- **Wallet Connection**: Secure Solana wallet integration (Phantom, Sollet, Solflare)
- **Portfolio Tracking**: Monitor tokens, LPs, NFTs, and staking positions
- **Encrypted P&L**: Calculate profit/loss without exposing amounts
- **Real-time Analytics**: Performance charts and allocation breakdowns
- **Transaction History**: Track all encrypted portfolio activities
- **Multi-token Support**: Aggregate values across different assets

### Arcium Integration
- **Multi-Party Computation (MPC)**: Distribute portfolio calculations across secure nodes
- **Fully Homomorphic Encryption (FHE)**: Perform operations on encrypted data
- **Network Monitoring**: Real-time Arcium network health tracking
- **Session Management**: Secure compute sessions for portfolio operations

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Blockchain**: Solana Web3.js, Phantom Wallet
- **Encryption**: Arcium MPC/FHE, AES-GCM
- **Charts**: Recharts for encrypted analytics visualization

## Getting Started

### Prerequisites
- Node.js 18+
- A Solana devnet wallet

### Installation

\`\`\`bash
# Clone the repository
git clone <repo-url>
cd arcium-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
\`\`\`

### Environment Variables

\`\`\`env
NEXT_PUBLIC_ARCIUM_PUBLIC_KEY=your_arcium_public_key
NEXT_PUBLIC_ARCIUM_API_KEY=your_arcium_api_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Main entry point
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── wallet-connect.tsx    # Wallet connection UI
│   ├── portfolio-dashboard.tsx # Main dashboard
│   ├── holdings-list.tsx     # Portfolio holdings
│   ├── arcium-integration.tsx # Arcium status
│   ├── analytics-dashboard.tsx # Charts and analytics
│   └── ...
├── lib/
│   ├── arcium-client.ts      # Arcium MPC/FHE client
│   ├── arcium-monitor.ts     # Network monitoring
│   ├── pnl-calculator.ts     # P&L calculations
│   ├── encryption.ts         # Client-side encryption
│   └── solana-provider.ts    # Solana blockchain provider
├── hooks/
│   └── use-encrypted-portfolio.ts # Portfolio state hook
└── types/
    └── portfolio.ts          # TypeScript types
\`\`\`

## How It Works

### Encryption Flow

1. **User Connects Wallet**: Authenticate via Phantom/Sollet/Solflare
2. **Fetch Portfolio Data**: Query Solana blockchain for wallet holdings
3. **Client-Side Encryption**: Encrypt portfolio data before transmission
4. **Arcium Processing**: Send encrypted data to MPC network
5. **Zero-Knowledge Compute**: Calculate P&L on encrypted data
6. **Client-Side Decryption**: Decrypt results only in the user's browser

### Privacy Guarantees

- **No Plaintext Transmission**: All data is encrypted end-to-end
- **MPC Isolation**: Portfolio data distributed across multiple nodes
- **FHE Computation**: Calculations performed on encrypted values
- **Session Isolation**: Each session has unique encryption keys
- **Verify Integrity**: Threshold signatures validate computations

## Supported Assets

- **Tokens**: SOL, USDC, JUP, ORCA, COPE, etc.
- **LPs**: Orca, Raydium, Meteora positions
- **NFTs**: Magic Eden, Tensor, and other Solana NFTs
- **Staking**: Validators, liquid staking tokens

## API Integration

### Arcium MPC/FHE API
\`\`\`typescript
// Calculate P&L on encrypted data
const result = await arciumClient.calculateEncryptedPnL(
  initialValue,
  currentValue
)

// Aggregate encrypted holdings
const total = await arciumClient.aggregateEncryptedValues(
  encryptedHoldings
)
\`\`\`

### Solana Provider API
\`\`\`typescript
// Fetch wallet portfolio
const assets = await fetchWalletPortfolio(walletAddress)

// Get token prices
const prices = await getPriceData(['SOL', 'USDC', 'JUP'])
\`\`\`

## Submission for Arcium Hackathon

This project demonstrates:

1. **Innovation**: Privacy-first DeFi portfolio tracking using encrypted compute
2. **Technical Implementation**: Full Arcium MPC/FHE integration with React frontend
3. **Impact**: Solves privacy issues in transparent-by-default DeFi ecosystem
4. **Clarity**: Clear documentation of encryption flows and privacy benefits

### Key Features for Judging
- Multi-party computation for portfolio calculations
- Fully homomorphic encryption for operations on encrypted data
- Zero-knowledge proof of portfolio composition
- Real-time encrypted analytics
- Seamless Solana wallet integration

## Privacy Benefits

- **User Privacy**: Portfolio holdings never visible to platform
- **Server Privacy**: Backend never processes unencrypted data
- **Network Privacy**: Arcium nodes don't know individual values
- **Data Protection**: Meets institutional DeFi privacy requirements
- **Regulatory Compliance**: Enables privacy-respecting financial tracking

## Security Considerations

- All encryption keys stored locally in browser
- Session-based key rotation
- Threshold signatures for computation verification
- Integrity checks on encrypted data
- Timeout-based session termination

## Future Enhancements

- [ ] Cross-chain portfolio aggregation
- [ ] Advanced tax-loss harvesting analytics
- [ ] Encrypted portfolio comparison
- [ ] Multi-sig encrypted wallets
- [ ] Encrypted lending/borrowing tracking
- [ ] Privacy-preserving yield farming

## Contributing

Contributions welcome! Please ensure:
- All new features maintain privacy guarantees
- Encryption is always end-to-end
- Documentation is updated

## License

MIT

## Resources

- [Arcium Documentation](https://docs.arcium.com)
- [Solana Docs](https://docs.solana.com)
- [Phantom Wallet](https://phantom.app)
- [Cypherpunk Hackathon](https://hackathon.arcium.com)
