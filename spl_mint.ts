import { Keypair, Connection,PublicKey } from "@solana/web3.js";
import { mintTo,getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import privateKey from "./privateKey1.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(privateKey));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mintAddress = new PublicKey("HeSm61uMw1pSsfTNJ8YYQF4igZqNr6NtBNWXkCiwAJg7");

(async () => {
    try {
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mintAddress,
            keypair.publicKey,
        );

        const accountPublicKey = tokenAccount.address;
        const mintAmount = 10e6;

        await mintTo(
            connection,
            keypair,
            mintAddress,
            accountPublicKey,
            keypair.publicKey,
            mintAmount
        );
        console.log("Successfully minted ", mintAmount, " to Public Key: ", accountPublicKey.toBase58());
    } catch(error) {
        console.log(error);
    }
});