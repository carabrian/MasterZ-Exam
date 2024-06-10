import { Keypair, Connection } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import privateKey from "./privateKey1.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(privateKey));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
    try {
        const mint = await createMint(
            connection,
            keypair,
            keypair.publicKey,
            null,
            6,
        );
        console.log("Mint Address: ", mint.toBase58());
    } catch(error) {
        console.error(error);
    }
});