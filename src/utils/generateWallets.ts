import { generateEthereumWallet } from "./generateEthereumWallet";
import { generateSolanaWallet } from "./generateSolanaWallet";

export function generateWallets(accountNumber: number, seed: string) {
  const ethereumWallet = generateEthereumWallet(accountNumber, seed);
  const solanaWallet = generateSolanaWallet(accountNumber, seed);

  return {
    solanaWallet,
    ethereumWallet,
  };
}
