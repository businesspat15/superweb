

// Wallet Types
export enum WalletType {
  PHANTOM = 'Phantom',
  SOLFLARE = 'Solflare',
}

export interface WalletState {
  connected: boolean;
  publicKey: string | null;
  walletType: WalletType | null;
  balance: number;
  usdcBalance: number;
  ciftBalance: number;
}

// Navigation Types
export type PageView = 'home' | 'blog' | 'nft';

// NFT Types
export interface NFTAttribute {
  trait_type: string;
  value: string;
}

export interface NFT {
  id: number;
  name: string;
  image: string;
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Mythic';
  attributes: NFTAttribute[];
}

// Window interface extension for Solana wallets
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      on: (event: string, callback: (args: any) => void) => void;
      request: (args: any) => Promise<any>;
      signTransaction: (transaction: any) => Promise<any>;
    };
    solflare?: {
      isSolflare?: boolean;
      connect: () => Promise<void>;
      disconnect: () => Promise<void>;
      on: (event: string, callback: (args: any) => void) => void;
      publicKey: { toString: () => string } | null;
      isConnected: boolean;
      signTransaction: (transaction: any) => Promise<any>;
    };
  }
}