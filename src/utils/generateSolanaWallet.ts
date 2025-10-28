import nacl from "tweetnacl";
import { HDKey } from "@scure/bip32";
import { Keypair } from "@solana/web3.js";
import { hex } from "@scure/base";

export function generateSolanaWallet(accountNumber: number, seed: string) {
  // Derivation path for Solana
  const path = `m/44'/501'/${accountNumber}'/0'`;

  // Decode seed (hex → bytes)
  const root = HDKey.fromMasterSeed(hex.decode(seed));

  // Derive child key
  const derived = root.derive(path);

  if (!derived.privateKey) {
    throw new Error("Failed to derive private key");
  }

  // Use only the 32-byte private seed for ed25519
  const keyPair = nacl.sign.keyPair.fromSeed(derived.privateKey);

  // Convert to Solana-compatible Keypair
  const solanaKeypair = Keypair.fromSecretKey(keyPair.secretKey);

  return {
    path,
    walletName: `Solana-${accountNumber}`,
    address: solanaKeypair.publicKey.toBase58(),
    privateKey: hex.encode(solanaKeypair.secretKey),
    publicKey: solanaKeypair.publicKey.toBase58(),
  };
}
