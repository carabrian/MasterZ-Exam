import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import privateKey from "./privateKey1.json";
import privateKey2 from "./privateKey2.json";
import tokenMintAddress from "./privateKey2.json";

const keypair1 = Keypair.fromSecretKey(new Uint8Array(privateKey));
const keypair2 = Keypair.fromSecretKey(new Uint8Array(privateKey2));
const mintAddress = new PublicKey("7cn7QcQDDRsWVFxwqwSRj13y6EHQgfx67amHaqP7nAhF");
const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async () => {
    try {
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection, 
            keypair1,
            mintAddress,
            keypair1.publicKey
        );

        const tokenAccount2 = await getOrCreateAssociatedTokenAccount(
            connection, 
            keypair2,
            mintAddress,
            keypair2.publicKey
        );

        const amount = 10e5;

        await transfer(
            connection,
            keypair1,
            tokenAccount2.address,
            tokenAccount.address,
            keypair1,
            amount
        );

        console.log("Successfully transferred ", amount, " from ", tokenAccount2.address.toBase58(), " to ", tokenAccount.address.toBase58());
    } catch (error) {
          console.log(error);  
    }
});