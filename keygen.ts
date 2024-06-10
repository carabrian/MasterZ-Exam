import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log("Your Public Key: " + keypair.publicKey.toBase58() + " Your Private Key: " + keypair.secretKey.toString());