# Production Setup Guide

## Environment Variables

1. **Solana RPC**
   - Set `NEXT_PUBLIC_SOLANA_RPC` to your preferred Solana RPC endpoint
   - Recommended: Helius or QuickNode (free tier available)

2. **Arcium Credentials** (Server-side only)
   - `ARCIUM_API_KEY` - Your Arcium API key
   - `ARCIUM_PUBLIC_KEY` - Your Arcium public key
   - These are server-side only and never exposed to the client

## Deployment

### Vercel Deployment
\`\`\`bash
vercel env add NEXT_PUBLIC_SOLANA_RPC
vercel env add ARCIUM_API_KEY
vercel env add ARCIUM_PUBLIC_KEY
vercel deploy
\`\`\`

### Docker Deployment
\`\`\`bash
docker build -t arcium-dashboard .
docker run -e ARCIUM_API_KEY=xxx -e ARCIUM_PUBLIC_KEY=xxx -p 3000:3000 arcium-dashboard
\`\`\`

## Security Checklist

- [ ] API keys stored in Vercel environment variables (not `.env.local`)
- [ ] Phantom wallet installed in browser for real wallet connection
- [ ] HTTPS enabled in production
- [ ] Content Security Policy (CSP) headers configured
- [ ] Rate limiting enabled on API endpoints
- [ ] Input validation on all API routes

## Performance Optimization

1. **Price Feed Caching**: Prices cached for 60 seconds
2. **Portfolio Refresh**: Default 10-second polling interval (configurable)
3. **Image Optimization**: Token logos lazy-loaded
4. **Code Splitting**: Components lazy-loaded on demand

## Monitoring

- Monitor `/api/arcium/` endpoints for encryption latency
- Track portfolio fetch success rates
- Log Phantom wallet connection errors
- Monitor price feed API failures (Pyth/CoinGecko)

## Troubleshooting

### Wallet Not Connecting
- Ensure Phantom is installed and enabled
- Check browser console for connection errors
- Verify correct network (Mainnet/Devnet)

### Portfolio Not Loading
- Check Solana RPC endpoint is accessible
- Verify wallet has at least one SPL token
- Check browser console for API errors

### Encryption Failures
- Verify Arcium API credentials are correct
- Check Arcium API endpoint is accessible
- Fallback to local encryption is working
