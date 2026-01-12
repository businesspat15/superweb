
import { WalletType } from '../types';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, getAccount, TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Using public Mainnet RPC.
const SOLANA_RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";
const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

export const connectWallet = async (type: WalletType): Promise<string | null> => {
  try {
    if (type === WalletType.PHANTOM) {
      const provider = window.solana;
      
      if (provider && provider.isPhantom) {
        try {
            const response = await provider.connect();
            return response.publicKey.toString();
        } catch (err) {
            console.warn("User rejected Phantom connection");
            return null;
        }
      } else {
        // If not installed, open download page gracefully
        console.warn("Phantom not installed, redirecting to download...");
        window.open('https://phantom.app/', '_blank');
        return null;
      }

    } else if (type === WalletType.SOLFLARE) {
      const provider = window.solflare;
      
      if (provider && provider.isSolflare) {
        try {
            await provider.connect();
            return provider.publicKey?.toString() || null;
        } catch (err) {
             console.warn("User rejected Solflare connection");
             return null;
        }
      } else {
        // If not installed, open download page gracefully
        console.warn("Solflare not installed, redirecting to download...");
        window.open('https://solflare.com/', '_blank');
        return null;
      }
    }
  } catch (error) {
    console.error("Wallet connection failed:", error);
    return null;
  }
  return null;
};

export const disconnectWallet = async (type: WalletType): Promise<void> => {
  try {
    if (type === WalletType.PHANTOM && window.solana) {
      await window.solana.disconnect();
    } else if (type === WalletType.SOLFLARE && window.solflare) {
      await window.solflare.disconnect();
    }
  } catch (error) {
    console.error("Disconnect failed:", error);
  }
};

export const fetchBalance = async (publicKey: string): Promise<number> => {
  try {
    const response = await fetch(SOLANA_RPC_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [publicKey],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.warn("RPC Error, returning 0:", data.error.message);
      return 0;
    }

    const lamports = data.result?.value || 0;
    return lamports / 1000000000;

  } catch (error) {
    console.error("Failed to fetch balance:", error);
    return 0;
  }
};

export const fetchUsdcBalance = async (publicKey: string): Promise<number> => {
  try {
    const connection = new Connection(SOLANA_RPC_ENDPOINT, 'confirmed');
    const owner = new PublicKey(publicKey);
    
    // Get ATA
    const ata = await getAssociatedTokenAddress(USDC_MINT, owner);
    
    // Get Balance
    try {
        const account = await getAccount(connection, ata);
        return Number(account.amount) / 1_000_000;
    } catch (e) {
        // Account might not exist
        return 0;
    }
  } catch (error) {
    console.error("Failed to fetch USDC balance", error);
    return 0;
  }
};

export const fetchCiftBalance = async (publicKey: string): Promise<number> => {
  // In a real application, you would query the SPL Token Account for the specific Mint Address.
  // For this demo, we return 0 as the token is not yet live/distributed.
  return 0;
};

export const sendSolPayment = async (
  walletType: WalletType,
  publicKeyString: string,
  recipientAddress: string,
  amountSOL: number
): Promise<string> => {
   const connection = new Connection(SOLANA_RPC_ENDPOINT, 'confirmed');
   const fromPubkey = new PublicKey(publicKeyString);
   const toPubkey = new PublicKey(recipientAddress);

   const transaction = new Transaction().add(
       SystemProgram.transfer({
           fromPubkey,
           toPubkey,
           lamports: Math.floor(amountSOL * LAMPORTS_PER_SOL)
       })
   );

   transaction.feePayer = fromPubkey;
   const { blockhash } = await connection.getLatestBlockhash();
   transaction.recentBlockhash = blockhash;

   let signedTx;
   if (walletType === WalletType.PHANTOM) {
       if (!window.solana) throw new Error("Phantom wallet not found");
       signedTx = await window.solana.signTransaction(transaction);
   } else if (walletType === WalletType.SOLFLARE) {
       if (!window.solflare) throw new Error("Solflare wallet not found");
       signedTx = await window.solflare.signTransaction(transaction);
   } else {
       throw new Error("Unsupported wallet type");
   }

   const txid = await connection.sendRawTransaction(signedTx.serialize());
   await connection.confirmTransaction(txid, 'confirmed');
   
   return txid;
};

export const sendUsdcPayment = async (
  walletType: WalletType,
  publicKeyString: string,
  recipientAddress: string,
  amountUSDC: number
): Promise<string> => {
    const connection = new Connection(SOLANA_RPC_ENDPOINT, 'confirmed');
    const fromPubkey = new PublicKey(publicKeyString);
    const toPubkey = new PublicKey(recipientAddress);
    
    // Get ATAs
    const fromAta = await getAssociatedTokenAddress(USDC_MINT, fromPubkey);
    const toAta = await getAssociatedTokenAddress(USDC_MINT, toPubkey);
    
    // Create Transaction
    const transaction = new Transaction();
    
    transaction.add(
        createTransferInstruction(
            fromAta,
            toAta,
            fromPubkey,
            Math.floor(amountUSDC * 1_000_000), // USDC has 6 decimals
            [],
            TOKEN_PROGRAM_ID
        )
    );
    
    transaction.feePayer = fromPubkey;
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    
    let signedTx;
    if (walletType === WalletType.PHANTOM) {
        if (!window.solana) throw new Error("Phantom wallet not found");
        signedTx = await window.solana.signTransaction(transaction);
    } else if (walletType === WalletType.SOLFLARE) {
        if (!window.solflare) throw new Error("Solflare wallet not found");
        signedTx = await window.solflare.signTransaction(transaction);
    } else {
        throw new Error("Unsupported wallet type");
    }

    const txid = await connection.sendRawTransaction(signedTx.serialize());
    await connection.confirmTransaction(txid, 'confirmed');
   
    return txid;
}
