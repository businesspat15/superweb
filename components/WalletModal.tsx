import React, { useEffect, useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { WalletType } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (type: WalletType) => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [detectedWallets, setDetectedWallets] = useState<{ phantom: boolean; solflare: boolean }>({
    phantom: false,
    solflare: false
  });

  useEffect(() => {
    if (isOpen) {
      setDetectedWallets({
        phantom: !!window.solana?.isPhantom,
        solflare: !!window.solflare?.isSolflare
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gold-500/30 bg-navy-900 p-8 shadow-2xl animate-fade-in-up">
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gold-500/20 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl"></div>

        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="mb-2 text-center font-serif text-3xl font-bold text-gold-400">Connect Wallet</h2>
        <p className="mb-8 text-center text-gray-400">Choose your vehicle to the moon.</p>

        <div className="space-y-4">
          <button
            onClick={() => onConnect(WalletType.PHANTOM)}
            className="group flex w-full items-center justify-between rounded-xl border border-gray-700 bg-gray-800/50 p-4 transition-all hover:border-gold-500 hover:bg-gray-800"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#AB9FF2]/20 group-hover:bg-[#AB9FF2]/30 transition-colors">
                <img 
                  src="https://assets.zyrosite.com/mk3vgMQRxEcer7k1/phantom-icon_app_1200x1200-AE07gMNjewiPGqxq.png" 
                  alt="Phantom" 
                  className="h-8 w-8 object-contain" 
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white group-hover:text-gold-300">Phantom</h3>
                    {!detectedWallets.phantom && <span className="text-[10px] bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded">Not Detected</span>}
                </div>
                <p className="text-sm text-gray-400">The friendly ghost of Solana</p>
              </div>
            </div>
            {detectedWallets.phantom ? (
                 <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            ) : (
                <ExternalLink size={16} className="text-gray-500" />
            )}
          </button>

          <button
            onClick={() => onConnect(WalletType.SOLFLARE)}
            className="group flex w-full items-center justify-between rounded-xl border border-gray-700 bg-gray-800/50 p-4 transition-all hover:border-orange-500 hover:bg-gray-800"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FC7226]/20 group-hover:bg-[#FC7226]/30 transition-colors">
                 <img 
                  src="https://www.solflare.com/wp-content/uploads/2024/11/App-Icon.svg" 
                  alt="Solflare" 
                  className="h-8 w-8 object-contain" 
                 />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white group-hover:text-orange-300">Solflare</h3>
                    {!detectedWallets.solflare && <span className="text-[10px] bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded">Not Detected</span>}
                </div>
                <p className="text-sm text-gray-400">Secure and powerful</p>
              </div>
            </div>
            {detectedWallets.solflare ? (
                 <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            ) : (
                <ExternalLink size={16} className="text-gray-500" />
            )}
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          By connecting, you agree to yield 100% of your loyalty to CIFCI TOTO.
        </p>
      </div>
    </div>
  );
};

export default WalletModal;