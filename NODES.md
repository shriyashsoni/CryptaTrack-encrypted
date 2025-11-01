# Arcium Testnet Node Operator Guide

This guide helps you set up and run an ARX node on Solana Devnet.

## Quick Start

1. **Prerequisites**: Install Rust, Solana CLI, Docker, OpenSSL, and Git
2. **Setup Workspace**: Create `arcium-node-setup` directory
3. **Install Arcium**: Run the automated installer
4. **Generate Keypairs**: Create three security keypairs
5. **Fund Accounts**: Add Devnet SOL to your accounts
6. **Initialize Node**: Register with the Arcium network
7. **Configure**: Create `node-config.toml`
8. **Deploy**: Start your node with Docker

## Important Notes

- Keep all private keys secure
- Your public IP must be accessible from the internet
- Port 8080 must be open for peer communication
- For production, use dedicated RPC providers (Helius, QuickNode)
- WSL2 on Windows works great for node operations

## Security Best Practices

- Never share private keypairs
- Store keypairs in secure locations
- Use firewalls to restrict network access
- Keep Docker images updated
- Monitor node logs regularly
- Set up alerts for resource usage

## Troubleshooting

**Node Won't Start**
- Verify all keypair files exist and are readable
- Check that node-config.toml is valid TOML
- Ensure your IP address is accessible

**Account Initialization Failed**
- Verify you have sufficient SOL (at least 1 SOL per account)
- Check RPC endpoint is working
- Ensure node offset is unique

**Cannot Join Cluster**
- Verify you've been invited by cluster authority
- Check that cluster has available slots
- Ensure your node is properly initialized

**Docker Issues**
- Verify Docker is running
- Check file permissions on mounted volumes
- Ensure ports are not already in use

## Useful Commands

\`\`\`bash
# Check node status
arcium arx-info <your-node-offset> --rpc-url https://api.devnet.solana.com

# Check if node is active
arcium arx-active <your-node-offset> --rpc-url https://api.devnet.solana.com

# View logs
docker logs -f arx-node

# Stop node
docker stop arx-node

# Remove container
docker rm arx-node
\`\`\`

## Resources

- [Arcium Network Overview](https://arcium.com/docs)
- [Solana RPC Providers](https://docs.solana.com/cluster/rpc-endpoints)
- [Docker Documentation](https://docs.docker.com)
- [Discord Community](https://discord.gg/arcium)

## What to Expect

- Real computations using MPC/FHE
- Stress testing environment for network reliability
- Variable activity levels depending on test scenarios
- No economic rewards yet (testing phase)
- Connection with other node operators
- Opportunity to contribute to network security

---

For more detailed steps, see the Node Setup Guide in the application.
