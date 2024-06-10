import { Keypair, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import privateKey from "./privateKey1.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(privateKey));

const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async () => {
    try {
        const airdropSignature = await connection.requestAirdrop(
            keypair.publicKey,
            1 * LAMPORTS_PER_SOL
        );
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
});