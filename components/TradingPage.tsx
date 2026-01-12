import React, { useState, useEffect } from 'react';
import { ArrowDownUp, RefreshCcw, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import Button from './Button';
import { WalletState } from '../types';

interface TradingPageProps {
  walletState: WalletState;
  onConnectWallet: () => void;
}

const TradingPage: React.FC<TradingPageProps> = ({ walletState, onConnectWallet }) => {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isBuying, setIsBuying] = useState(true);
  const [price, setPrice] = useState(0.0042069);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => prev * (1 + (Math.random() * 0.002 - 0.001)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSwap = () => {
    // In a real app, this would execute the swap transaction
    alert(`Swapping ${fromAmount} ${isBuying ? 'SOL' : 'CIFT'} for ${toAmount} ${isBuying ? 'CIFT' : 'SOL'}`);
  };

  const handleAmountChange = (val: string) => {
    setFromAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      if (isBuying) {
        setToAmount((num / price).toFixed(2));
      } else {
        setToAmount((num * price).toFixed(6));
      }
    } else {
      setToAmount('');
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 max-w-7xl mx-auto animate-fade-in-up">
      {/* Header Info */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gold-500 p-0.5">
             <img src="https://assets.zyrosite.com/mk3vgMQRxEcer7k1/toto_the-_ceo-Yle45r8kvWIVzwka.png" className="h-full w-full rounded-full object-cover" alt="CIFT" />
          </div>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-white">
              CIFT / SOL <span className="text-xs rounded bg-gold-500/20 px-2 py-0.5 text-gold-400">V3 LP</span>
            </h1>
            <div className="flex items-center gap-4 text-sm">
               <span className="font-mono text-gold-400">${price.toFixed(8)}</span>
               <span className="text-green-500 flex items-center gap-1"><TrendingUp size={12}/> +69.42% (24h)</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 text-xs md:text-sm">
             <div className="rounded-lg bg-navy-800 p-3 border border-white/5">
                <div className="text-gray-400">24h Vol</div>
                <div className="font-mono font-bold text-white">$420.69K</div>
             </div>
             <div className="rounded-lg bg-navy-800 p-3 border border-white/5">
                <div className="text-gray-400">Liquidity</div>
                <div className="font-mono font-bold text-white">$1.2M</div>
             </div>
             <div className="rounded-lg bg-navy-800 p-3 border border-white/5">
                <div className="text-gray-400">Market Cap</div>
                <div className="font-mono font-bold text-white">$4.2M</div>
             </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Chart Section */}
        <div className="lg:col-span-8 space-y-6">
           <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-xl">
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                 <button className="rounded bg-navy-800 px-3 py-1 text-xs text-white hover:bg-navy-700">1H</button>
                 <button className="rounded bg-gold-500 text-navy-900 px-3 py-1 text-xs font-bold">4H</button>
                 <button className="rounded bg-navy-800 px-3 py-1 text-xs text-white hover:bg-navy-700">1D</button>
                 <button className="rounded bg-navy-800 px-3 py-1 text-xs text-white hover:bg-navy-700">1W</button>
              </div>
              
              {/* Mock Chart Visualization */}
              <div className="h-full w-full flex items-end justify-between px-4 pb-8 pt-16 gap-1 opacity-80">
                  {Array.from({ length: 40 }).map((_, i) => {
                      const height = 20 + Math.random() * 60;
                      const isGreen = Math.random() > 0.4;
                      return (
                          <div 
                            key={i} 
                            style={{ height: `${height}%` }} 
                            className={`w-full rounded-sm ${isGreen ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-red-500 opacity-50'}`}
                          ></div>
                      )
                  })}
              </div>
              
              <div className="absolute bottom-0 w-full border-t border-white/5 bg-navy-900 px-4 py-2 flex justify-between text-xs text-gray-500 font-mono">
                  <span>10:00</span>
                  <span>14:00</span>
                  <span>18:00</span>
                  <span>22:00</span>
                  <span>02:00</span>
                  <span>06:00</span>
              </div>
           </div>

           {/* Order Book / Recent Trades Mock */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="rounded-xl border border-white/5 bg-navy-800 p-4">
                  <h3 className="mb-4 font-serif text-sm font-bold text-gray-400">Order Book</h3>
                  <div className="space-y-1 font-mono text-xs">
                     <div className="flex justify-between text-red-400 opacity-60"><span>0.0042150</span><span>450K</span></div>
                     <div className="flex justify-between text-red-400 opacity-80"><span>0.0042120</span><span>120K</span></div>
                     <div className="flex justify-between text-red-400"><span>0.0042100</span><span>50K</span></div>
                     <div className="my-2 border-y border-white/5 py-1 text-center text-lg font-bold text-white">{price.toFixed(7)}</div>
                     <div className="flex justify-between text-green-400"><span>0.0042060</span><span>25K</span></div>
                     <div className="flex justify-between text-green-400 opacity-80"><span>0.0042040</span><span>180K</span></div>
                     <div className="flex justify-between text-green-400 opacity-60"><span>0.0042000</span><span>500K</span></div>
                  </div>
               </div>
               
               <div className="rounded-xl border border-white/5 bg-navy-800 p-4">
                   <h3 className="mb-4 font-serif text-sm font-bold text-gray-400">Recent Trades</h3>
                   <div className="space-y-2 font-mono text-xs">
                       {[...Array(6)].map((_, i) => (
                           <div key={i} className="flex justify-between items-center">
                               <span className={Math.random() > 0.3 ? 'text-green-400' : 'text-red-400'}>
                                   {Math.random() > 0.3 ? 'BUY' : 'SELL'}
                               </span>
                               <span className="text-white">{(Math.random() * 10000).toFixed(0)} CIFT</span>
                               <span className="text-gray-500">Just now</span>
                           </div>
                       ))}
                   </div>
               </div>
           </div>
        </div>

        {/* Swap Interface */}
        <div className="lg:col-span-4">
           <div className="sticky top-24 rounded-2xl border border-gold-500/30 bg-navy-900 p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                 <h2 className="font-serif text-xl font-bold text-white">Swap</h2>
                 <button className="rounded-full bg-navy-800 p-2 text-gray-400 hover:text-white">
                    <RefreshCcw size={16} />
                 </button>
              </div>

              {/* Input 1 */}
              <div className="mb-2 rounded-xl bg-navy-800 p-4 border border-transparent focus-within:border-gold-500/50 transition-colors">
                  <div className="mb-2 flex justify-between text-xs text-gray-400">
                      <span>From</span>
                      <span>Balance: {walletState.balance.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-4">
                      <input 
                        type="number" 
                        placeholder="0.0" 
                        value={fromAmount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        className="w-full bg-transparent text-2xl font-bold text-white outline-none placeholder-gray-600"
                      />
                      <div className="flex shrink-0 items-center gap-2 rounded-full bg-black/20 px-3 py-1">
                          <div className={`h-6 w-6 rounded-full ${isBuying ? 'bg-purple-500' : 'bg-gold-500'}`}></div>
                          <span className="font-bold">{isBuying ? 'SOL' : 'CIFT'}</span>
                      </div>
                  </div>
              </div>

              {/* Swap Direction Button */}
              <div className="relative -my-3 z-10 flex justify-center">
                  <button 
                    onClick={() => {
                        setIsBuying(!isBuying);
                        setFromAmount(toAmount);
                        setToAmount(fromAmount);
                    }}
                    className="rounded-lg border-4 border-navy-900 bg-navy-700 p-2 text-gold-400 hover:text-white transition-colors"
                  >
                      <ArrowDownUp size={18} />
                  </button>
              </div>

              {/* Input 2 */}
              <div className="mb-6 rounded-xl bg-navy-800 p-4 border border-transparent focus-within:border-gold-500/50 transition-colors">
                  <div className="mb-2 flex justify-between text-xs text-gray-400">
                      <span>To (Estimated)</span>
                      <span>Balance: 0.00</span>
                  </div>
                  <div className="flex items-center gap-4">
                      <input 
                        type="text" 
                        placeholder="0.0" 
                        value={toAmount}
                        readOnly
                        className="w-full bg-transparent text-2xl font-bold text-white outline-none placeholder-gray-600"
                      />
                      <div className="flex shrink-0 items-center gap-2 rounded-full bg-black/20 px-3 py-1">
                          <div className={`h-6 w-6 rounded-full ${!isBuying ? 'bg-purple-500' : 'bg-gold-500'}`}></div>
                          <span className="font-bold">{!isBuying ? 'SOL' : 'CIFT'}</span>
                      </div>
                  </div>
              </div>

              {/* Slippage / Info */}
              <div className="mb-6 space-y-2">
                  <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Rate</span>
                      <span className="text-gold-400">1 SOL ≈ {(1/price).toFixed(2)} CIFT</span>
                  </div>
                  <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Slippage Tolerance</span>
                      <span className="text-green-500">0.5% (Auto)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Network Fee</span>
                      <span className="text-gray-300 flex items-center gap-1"><Clock size={10}/> ~0.00005 SOL</span>
                  </div>
              </div>

              {/* Action Button */}
              {!walletState.connected ? (
                  <Button variant="gold" onClick={onConnectWallet} className="w-full shadow-lg">
                      Connect Wallet to Trade
                  </Button>
              ) : (
                  <Button variant="gold" onClick={handleSwap} disabled={!fromAmount} className="w-full shadow-lg">
                      {isBuying ? 'BUY CIFT' : 'SELL CIFT'}
                  </Button>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPage;