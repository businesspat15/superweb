import React, { useState } from 'react';
import { Shield, Zap, Crown, CheckCircle, Loader2, Sparkles, AlertCircle, Wallet, Coins, Gift, Star } from 'lucide-react';
import Button from './Button';
import { WalletState, NFT } from '../types';

interface NFTPageProps {
  walletState: WalletState;
  onConnectWallet: () => void;
}

// Data using official assets only
const PREVIEW_NFTS: NFT[] = [
  {
    id: 1,
    name: "Executive CIFCI TOTO",
    image: "https://assets.zyrosite.com/mk3vgMQRxEcer7k1/g5io8ohbiam1okt-e27Rh8yWQq2Yhvdn.jpeg",
    rarity: "Legendary",
    attributes: [{ trait_type: "Role", value: "CEO" }]
  },
  {
    id: 2,
    name: "Board Member TOTO",
    image: "https://assets.zyrosite.com/mk3vgMQRxEcer7k1/board-member-toto-bzTinjDdH6kGrkbf.png",
    rarity: "Rare",
    attributes: [{ trait_type: "Role", value: "Director" }]
  },
  {
    id: 3,
    name: "Founding Partner TOTO",
    image: "https://assets.zyrosite.com/mk3vgMQRxEcer7k1/founding-partner-toto-qUQY7fY8sgS6Uz19.png",
    rarity: "Common",
    attributes: [{ trait_type: "Role", value: "Partner" }]
  }
];

const NFTPage: React.FC<NFTPageProps> = ({ walletState, onConnectWallet }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [myNFTs, setMyNFTs] = useState<NFT[]>([]);

  const handleMint = async () => {
    // Only check balance if actually connected.
    if (walletState.connected && walletState.balance < 1) {
        setMintStatus('error');
        return;
    }

    setIsMinting(true);
    setMintStatus('idle');

    // Simulate Network Request
    setTimeout(() => {
      setIsMinting(false);
      setMintStatus('success');
      // No longer generating fake NFTs locally. 
      // In a real app, you would fetch the user's updated NFT list from chain here.
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 animate-fade-in-up">
      <div className="mx-auto max-w-7xl">
        
        {/* Hero / Mint Section */}
        <div className="mb-12 md:mb-16 grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* Left: Text & Mint UI */}
            <div className="space-y-6 md:space-y-8">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 mb-4">
                        <Crown size={14} className="text-gold-500" />
                        <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Genesis Collection</span>
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight">
                        THE EXECUTIVE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">SUITE</span>
                    </h1>
                    <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-400 leading-relaxed">
                        Your pass to the TOTO boardroom. Holding an Executive Suite NFT grants you voting rights, revenue share from the biscuit jar, and exclusive alpha.
                    </p>
                </div>

            </div>

            {/* Right: Visual */}
            <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-sm md:max-w-md aspect-square">
                    {/* Animated Glow Behind */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-gold-500 to-purple-600 rounded-full blur-[60px] md:blur-[100px] opacity-20 animate-pulse"></div>
                    
                    {/* Main Card */}
                    <div className="relative h-full w-full rounded-3xl border border-white/10 bg-navy-900 p-4 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                        <img 
                            src="https://assets.zyrosite.com/mk3vgMQRxEcer7k1/toto_the-_ceo-Yle45r8kvWIVzwka.png" 
                            alt="Mystery NFT" 
                            className="h-full w-full rounded-2xl object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="backdrop-blur-md bg-black/60 p-4 rounded-xl border border-white/10">
                                <h3 className="font-serif font-bold text-white text-lg">Unknown Executive</h3>
                                <p className="text-gold-400 text-sm">Rarity: ???</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-navy-800 p-3 md:p-4 rounded-2xl border border-gold-500/30 shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
                        <Crown className="text-gold-500 h-6 w-6 md:h-8 md:w-8" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-navy-800 p-3 md:p-4 rounded-2xl border border-purple-500/30 shadow-lg animate-bounce" style={{ animationDuration: '4s' }}>
                        <Zap className="text-purple-500 h-6 w-6 md:h-8 md:w-8" />
                    </div>
                </div>
            </div>
        </div>

        {/* Enhanced Benefits Section */}
        <div className="mb-16">
            <h2 className="text-center font-serif text-2xl md:text-3xl font-bold text-white mb-4">Executive Privileges</h2>
            <p className="text-center text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto px-4">Ownership is not just a JPEG. It is a contract of power within the CIFCI TOTO ecosystem.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div className="bg-navy-800/50 p-6 md:p-8 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-colors group">
                    <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 mb-6 group-hover:scale-110 transition-transform">
                        <Crown size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Governance Rights</h3>
                    <p className="text-gray-400 text-sm">Direct voting power in the DAO. Proposals include treasury allocation, roadmap direction, and meme strategy.</p>
                </div>

                <div className="bg-navy-800/50 p-6 md:p-8 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-colors group">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Staking Multiplier</h3>
                    <p className="text-gray-400 text-sm">Stake your NFT to boost your $CIFT yield farming APY by up to 2.5x based on rarity.</p>
                </div>

                 <div className="bg-navy-800/50 p-6 md:p-8 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-colors group">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
                        <Coins size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Revenue Share</h3>
                    <p className="text-gray-400 text-sm">Holders of 'Legendary' rank Executives receive a share of the secondary market trading fees.</p>
                </div>

                <div className="bg-navy-800/50 p-6 md:p-8 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-colors group">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                        <Shield size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Private Access</h3>
                    <p className="text-gray-400 text-sm">Comming soon</p>
                </div>

                <div className="bg-navy-800/50 p-6 md:p-8 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-colors group">
                     <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                        <Gift size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Exclusive Merch</h3>
                    <p className="text-gray-400 text-sm">Claim exclusive physical merchandise. Hoodies, mugs, and actual executive ties.</p>
                </div>

                 <div className="bg-navy-800/50 p-6 md:p-8 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-colors group">
                     <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
                        <Star size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Beta Access</h3>
                    <p className="text-gray-400 text-sm">Future mode</p>
                </div>
            </div>
        </div>

        {/* My Collection Section (If Connected OR has items) */}
        {(walletState.connected || myNFTs.length > 0) && (
            <div className="mb-16 border-t border-white/10 pt-16">
                 <h2 className="font-serif text-3xl font-bold text-white mb-8">My Assets ({myNFTs.length})</h2>
                 {myNFTs.length === 0 ? (
                     <div className="text-center py-12 bg-navy-800/30 rounded-2xl border border-white/5 border-dashed">
                         <p className="text-gray-500">You don't own any Executive Passes yet.</p>
                         <p className="text-gray-600 text-sm mt-2">Are you an intern?</p>
                     </div>
                 ) : (
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                         {myNFTs.map(nft => (
                             <div key={nft.id} className="bg-navy-800 rounded-xl overflow-hidden border border-white/5 shadow-lg animate-fade-in-up">
                                 <img src={nft.image} alt={nft.name} className="w-full aspect-square object-cover" />
                                 <div className="p-4">
                                     <div className="flex justify-between items-start mb-2">
                                         <h4 className="font-bold text-white">{nft.name}</h4>
                                         <span className={`text-xs px-2 py-0.5 rounded ${nft.rarity === 'Legendary' ? 'bg-gold-500/20 text-gold-400' : 'bg-gray-700 text-gray-300'}`}>
                                             {nft.rarity}
                                         </span>
                                     </div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 )}
            </div>
        )}

        {/* Sneak Peek Gallery */}
        <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-8">The Lineup</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {PREVIEW_NFTS.map((nft) => (
                    <div key={nft.id} className="group relative rounded-2xl overflow-hidden aspect-[4/5]">
                        <img 
                            src={nft.image} 
                            alt={nft.name} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="font-serif text-xl font-bold text-white mb-1">{nft.name}</h3>
                            <p className="text-gold-400 text-sm">{nft.rarity}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default NFTPage;