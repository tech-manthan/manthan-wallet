import { ethers } from "ethers";
import { hex } from "@scure/base";

export function generateEthereumWallet(accountNumber: number, seed: string) {
  const path = `m/44'/60'/${accountNumber}'/0/0'`;

  const hdNode = ethers.HDNodeWallet.fromSeed(hex.decode(seed)).derivePath(
    path
  );
  const privateKey = hdNode.privateKey;
  const publicKey = hdNode.publicKey;
  const address = hdNode.address;
  return {
    path,
    walletName: `Ethereum-${accountNumber}`,
    address,
    privateKey,
    publicKey,
  };
}
