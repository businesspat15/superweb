import React, { useState, useEffect } from 'react';
import { Menu, X, Wallet, Image as ImageIcon, FileText, LogOut, Zap, BookOpen } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { WalletState } from '../types';
import Button from './Button';
import { getSolanaPrice } from '../services/priceService';

interface NavbarProps {
  walletState: WalletState;
  onConnectClick: () => void;
  onDisconnectClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ walletState, onConnectClick, onDisconnectClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [solPrice, setSolPrice] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await getSolanaPrice();
      setSolPrice(price);
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 120000); // Update every 2 mins in navbar
    return () => clearInterval(interval);
  }, []);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleNav = (path: string, hash?: string) => {
    setIsMobileMenuOpen(false);
    
    if (path === '/') {
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation then scroll
        setTimeout(() => {
          if (hash) {
            document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo(0, 0);
          }
        }, 100);
      } else {
        if (hash) {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-navy-900/95 backdrop-blur-md shadow-lg">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 relative">
          
          {/* Logo */}
          <button onClick={() => handleNav('/')} className="flex items-center gap-3 hover:opacity-80 transition-opacity group z-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 shadow-[0_0_15px_rgba(34,197,94,0.4)] overflow-hidden group-hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all">
              <img 
                src="https://assets.zyrosite.com/mk3vgMQRxEcer7k1/toto_the-_ceo-Yle45r8kvWIVzwka.png" 
                alt="CIFCI TOTO" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-serif text-xl font-bold tracking-widest text-gold-100 hidden md:block group-hover:text-gold-300 transition-colors">
              CIFCI TOTO
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden items-center gap-5 md:flex">
            <button onClick={() => handleNav('/blog')} className={`text-sm font-bold tracking-wide transition-colors flex items-center gap-1 ${isActive('/blog') ? 'text-gold-400' : 'text-gray-400 hover:text-gold-400'}`}>
              <BookOpen size={14} />
              STORY
            </button>
            
            <button 
              onClick={() => handleNav('/presale')} 
              className={`flex items-center gap-2 text-sm font-bold tracking-wide transition-all px-4 py-2 rounded-full border group ${
                isActive('/presale') 
                  ? 'bg-gold-500 text-navy-900 border-gold-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500'
              }`}
            >
              <Zap size={16} className={`transition-colors ${isActive('/presale') ? "fill-navy-900 animate-pulse" : "fill-gray-400 group-hover:fill-navy-900 group-hover:animate-pulse"}`} />
              PRESALE LIVE
            </button>

            <button onClick={() => handleNav('/whitepaper')} className={`text-sm font-bold tracking-wide transition-colors flex items-center gap-1 ${isActive('/whitepaper') ? 'text-gold-400' : 'text-gray-400 hover:text-gold-400'}`}>
              <FileText size={14} />
              WHITEPAPER
            </button>
            <button onClick={() => handleNav('/nft')} className={`text-sm font-bold tracking-wide transition-colors flex items-center gap-1 ${isActive('/nft') ? 'text-gold-400' : 'text-gray-400 hover:text-gold-400'}`}>
              <ImageIcon size={14} />
              COLLECTION
            </button>
          </div>

          {/* Action Buttons & Price */}
          <div className="hidden md:flex items-center gap-4">
              
              {/* Price Ticker */}
              {solPrice && (
                <div className="hidden lg:flex items-center gap-2 bg-navy-800/50 px-3 py-1.5 rounded-lg border border-white/5 text-xs text-gray-300">
                  <div className="flex items-center gap-1 text-gold-400">
                      <img src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png" alt="SOL" className="w-4 h-4 object-contain" onError={(e) => {e.currentTarget.style.display='none'}} />
                      <span className="font-bold">SOL</span>
                  </div>
                  <span>${solPrice.toFixed(2)}</span>
                </div>
              )}

              {walletState.connected && walletState.publicKey ? (
                  <div className="flex items-center gap-3 bg-navy-800 rounded-xl p-1.5 border border-white/10 shadow-inner group hover:border-gold-500/30 transition-colors">
                      {/* Balance */}
                      <div className="hidden lg:flex flex-col items-end px-3 border-r border-white/10 gap-0.5">
                           <div className="flex items-center gap-2 text-xs">
                               <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">SOL</span>
                               <span className="font-mono font-bold text-gold-400">{walletState.balance.toLocaleString()}</span>
                           </div>
                           <div className="flex items-center gap-2 text-xs">
                               <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">$CIFT</span>
                               <span className="font-mono font-bold text-white">{walletState.ciftBalance.toLocaleString()}</span>
                           </div>
                      </div>

                      {/* Wallet Type & Address */}
                      <div className="flex items-center gap-2 pl-2 pr-1">
                           <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 border border-white/10 overflow-hidden" title={walletState.walletType || 'Wallet'}>
                              {walletState.walletType === 'Phantom' && <img src="https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/phantom/src/adapter.png" alt="Phantom" className="h-4 w-4" />}
                              {walletState.walletType === 'Solflare' && <img src="https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/solflare/src/adapter.png" alt="Solflare" className="h-4 w-4" />}
                              {!['Phantom', 'Solflare'].includes(walletState.walletType || '') && <Wallet size={12} className="text-gray-400"/>}
                           </div>
                           <span className="font-mono text-sm font-bold text-gray-200">
                               {shortenAddress(walletState.publicKey)}
                           </span>
                      </div>

                       {/* Disconnect Button */}
                      <button 
                          onClick={onDisconnectClick}
                          className="flex items-center justify-center h-8 w-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors border border-red-500/20"
                          title="Disconnect"
                      >
                          <LogOut size={14} />
                      </button>
                  </div>
              ) : (
                  <Button variant="gold" onClick={onConnectClick} className="shadow-lg !py-2.5">
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                  </Button>
              )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-gold-400 hover:bg-white/5 rounded-lg transition-colors z-[60] flex items-center justify-center relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-[999] bg-navy-900 md:hidden flex flex-col overflow-y-auto border-t border-white/10 animate-fade-in-up">
            <div className="flex flex-col p-6 space-y-6 pb-24">
                <div className="flex flex-col space-y-4">
                  <button onClick={() => handleNav('/blog')} className={`text-left text-lg font-bold flex items-center gap-2 ${isActive('/blog') ? 'text-gold-400' : 'text-gray-300 hover:text-gold-400'}`}>
                    <BookOpen size={18} /> Story
                  </button>
                  <button onClick={() => handleNav('/presale')} className={`text-left text-lg font-bold flex items-center gap-2 ${isActive('/presale') ? 'text-gold-400' : 'text-gray-300 hover:text-gold-400'}`}>
                    <Zap size={18} className={isActive('/presale') ? "fill-gold-400 animate-pulse" : ""} /> Presale Live
                  </button>
                  <button onClick={() => handleNav('/whitepaper')} className={`text-left text-lg font-bold ${isActive('/whitepaper') ? 'text-gold-400' : 'text-gray-300'}`}>Whitepaper</button>
                  <button onClick={() => handleNav('/nft')} className={`text-left text-lg font-bold ${isActive('/nft') ? 'text-gold-400' : 'text-gray-300'}`}>NFT Collection</button>
                </div>
                
                <div className="pt-6 border-t border-gray-800 space-y-4">
                    
                    {solPrice && (
                       <div className="flex justify-between items-center text-gray-400 bg-navy-800/50 p-3 rounded-lg border border-white/5">
                           <span className="text-sm font-bold">Solana Price</span>
                           <span className="text-gold-400 font-mono">${solPrice.toFixed(2)}</span>
                       </div>
                    )}

                    {walletState.connected ? (
                         <div className="bg-navy-800 rounded-xl p-4 border border-white/10 space-y-4">
                             <div className="flex justify-between items-center">
                                 <span className="text-sm text-gray-400">Balance</span>
                                 <div className="text-right">
                                    <div className="text-gold-400 font-mono font-bold">{walletState.balance.toLocaleString()} SOL</div>
                                    <div className="text-white font-mono font-bold text-sm">{walletState.ciftBalance.toLocaleString()} CIFT</div>
                                 </div>
                             </div>
                             <div className="flex justify-between items-center">
                                 <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-400">Wallet</span>
                                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300 border border-white/10">{walletState.walletType}</span>
                                 </div>
                                 <span className="text-white font-mono font-bold">{shortenAddress(walletState.publicKey || '')}</span>
                             </div>
                             <button 
                                onClick={onDisconnectClick}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 transition-colors border border-red-500/20"
                             >
                                <LogOut size={16} />
                                Disconnect
                            </button>
                         </div>
                    ) : (
                        <Button variant="gold" onClick={onConnectClick} className="w-full justify-center">
                            <Wallet className="mr-2 h-4 w-4" />
                            Connect Wallet
                        </Button>
                    )}
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Navbar;