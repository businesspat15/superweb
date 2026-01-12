
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import WalletModal from './components/WalletModal';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import NFTPage from './components/NFTPage';
import WhitePaperPage from './components/WhitePaperPage';
import PresalePage from './components/PresalePage';
import { WalletState, WalletType } from './types';
import { connectWallet, disconnectWallet, fetchBalance, fetchCiftBalance, fetchUsdcBalance } from './services/walletService';

const App: React.FC = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    publicKey: null,
    walletType: null,
    balance: 0,
    usdcBalance: 0,
    ciftBalance: 0,
  });
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = async (type: WalletType) => {
    try {
      const publicKey = await connectWallet(type);
      if (publicKey) {
        const balance = await fetchBalance(publicKey);
        const usdcBalance = await fetchUsdcBalance(publicKey);
        const ciftBalance = await fetchCiftBalance(publicKey);
        setWalletState({
          connected: true,
          publicKey,
          walletType: type,
          balance,
          usdcBalance,
          ciftBalance,
        });
        setIsWalletModalOpen(false);
      }
    } catch (error) {
      console.error("Connection cancelled or failed", error);
    }
  };

  const handleDisconnect = async () => {
    if (walletState.walletType) {
      await disconnectWallet(walletState.walletType);
      setWalletState({
        connected: false,
        publicKey: null,
        walletType: null,
        balance: 0,
        usdcBalance: 0,
        ciftBalance: 0,
      });
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-navy-900 font-sans text-white selection:bg-gold-500 selection:text-navy-900 flex flex-col">
      <Navbar 
        walletState={walletState} 
        onConnectClick={() => setIsWalletModalOpen(true)}
        onDisconnectClick={handleDisconnect}
      />
      
      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
        onConnect={handleConnect} 
      />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/presale" element={<PresalePage walletState={walletState} onConnectWallet={() => setIsWalletModalOpen(true)} />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/nft" element={<NFTPage walletState={walletState} onConnectWallet={() => setIsWalletModalOpen(true)} />} />
          <Route path="/whitepaper" element={<WhitePaperPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-navy-900 py-10 px-6 mt-auto">
        <div className="mx-auto max-w-7xl flex flex-col gap-6">
            
            {/* Top Row: Logo + Socials */}
            <div className="flex items-center justify-between w-full flex-nowrap overflow-hidden">
                <div className="flex items-center gap-2 shrink-0">
                    <img 
                        src="https://assets.zyrosite.com/mk3vgMQRxEcer7k1/toto_the-_ceo-Yle45r8kvWIVzwka.png" 
                        alt="CIFCI TOTO" 
                        className="h-8 w-8 rounded object-cover border border-gold-500/20" 
                    />
                    <span className="font-serif font-bold text-white text-lg truncate">CIFCI TOTO</span>
                </div>

                <div className="flex gap-4 md:gap-6 shrink-0">
                    <a href="https://x.com/Cifcitotocoin" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter (X)">
                      {/* X Icon */}
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a href="https://t.me/Cifcitoto_coin" className="text-gray-400 hover:text-white transition-colors" aria-label="Telegram">
                      {/* Telegram Icon */}
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.27l-1.91 8.84c-.13.56-.44.73-.89.46l-2.48-1.83-1.2 1.16c-.13.13-.24.24-.49.24l.17-2.51 4.58-4.14c.2-.17-.04-.27-.31-.1l-5.67 3.57-2.44-.76c-.53-.17-.54-.53.11-.78l9.55-3.68c.44-.17.83.1.56.73z"/>
                      </svg>
                    </a>
                </div>
            </div>

            {/* Copyright Row */}
            <div className="text-sm text-gray-500 text-center">
                &copy; 2026 CIFCI TOTO. All rights reserved.
            </div>
            
            {/* Disclaimer */}
            <div className="border-t border-white/5 pt-6 text-center">
                <p className="text-xs text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    Disclaimer: CIFCI TOTO ($CIFT) is a community-driven project with no guarantees of financial return. 
                    Cryptocurrency investments carry high risk. The content on this website is for entertainment and educational purposes only 
                    and does not constitute financial advice. Please do your own research before participating. 
                    Not available to residents of restricted jurisdictions.
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
