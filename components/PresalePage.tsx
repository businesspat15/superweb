
import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, CheckCircle, Zap, Copy, ExternalLink, HelpCircle, X, Wallet, CreditCard, DollarSign, ShieldCheck } from 'lucide-react';
import Button from './Button';
import { WalletState, WalletType } from '../types';
import { getSolanaPrice } from '../services/priceService';
import { sendSolPayment, sendUsdcPayment } from '../services/walletService';

interface PresalePageProps {
  walletState: WalletState;
  onConnectWallet: () => void;
}

const PRESALE_WALLET = "8Gxngoj6K1doHGyy2ceMVDfRtQ1AYvUdGgchgHCZ82Hu";

const PresalePage: React.FC<PresalePageProps> = ({ walletState, onConnectWallet }) => {
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<'SOL' | 'USDC'>('SOL');
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [raisedUSD, setRaisedUSD] = useState(12000); 
  const [solPrice, setSolPrice] = useState<number>(0);
  const [showHowToBuy, setShowHowToBuy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [txHash, setTxHash] = useState<string>('');

  const TARGET_RAISE_USD = 1000000;
  const TOKEN_PRICE_USD = 0.001; 
  const MIN_BUY_USD = 10; // Approx min buy
  const MAX_BUY_USD = 7000; // Approx max buy

  // Fetch SOL Price
  useEffect(() => {
    const fetchPrice = async () => {
        const price = await getSolanaPrice();
        setSolPrice(price);
    };
    fetchPrice();
    // Refresh every 60s
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleBuy = async () => {
    setErrorMessage('');
    setPurchaseStatus('idle');

    if (!amount || isNaN(parseFloat(amount))) {
        setPurchaseStatus('error');
        setErrorMessage(`Please enter a valid ${currency} amount.`);
        return;
    }
    
    const val = parseFloat(amount);
    
    // Convert input to USD for unified validation
    const valInUSD = currency === 'SOL' ? val * solPrice : val;

    if (val <= 0) {
        setPurchaseStatus('error');
        setErrorMessage('Amount must be positive.');
        return;
    }

    // Validation: Range (Approximate)
    if (valInUSD < MIN_BUY_USD || valInUSD > MAX_BUY_USD) {
        setPurchaseStatus('error');
        setErrorMessage(`Contribution must be between $${MIN_BUY_USD} and $${MAX_BUY_USD} USD.`);
        return;
    }

    // Validation: Balance
    const balance = currency === 'SOL' ? walletState.balance : walletState.usdcBalance;
    if (val > balance) {
        setPurchaseStatus('error');
        setErrorMessage(`Insufficient ${currency} balance to complete this transaction.`);
        return;
    }

    if (!walletState.publicKey || !walletState.connected || !walletState.walletType) {
        setPurchaseStatus('error');
        setErrorMessage('Wallet not connected.');
        return;
    }

    setPurchaseStatus('processing');
    
    try {
        let txid;
        if (currency === 'SOL') {
            txid = await sendSolPayment(
                walletState.walletType,
                walletState.publicKey,
                PRESALE_WALLET,
                val
            );
        } else {
             txid = await sendUsdcPayment(
                walletState.walletType,
                walletState.publicKey,
                PRESALE_WALLET,
                val
            );
        }

        setTxHash(txid);
        setPurchaseStatus('success');
        setAmount('');
        // Add to "raised" for instant visual feedback
        setRaisedUSD(prev => prev + valInUSD);

    } catch (error: any) {
        console.error("Payment Error:", error);
        setPurchaseStatus('error');
        setErrorMessage(error.message || 'Transaction failed. Please try again.');
    }
  };

  const calculateTokens = (inputAmount: string) => {
    const val = parseFloat(inputAmount);
    if (isNaN(val)) return 0;
    
    let usdValue = 0;
    if (currency === 'SOL') {
        const effectiveSolPrice = solPrice || 145; 
        usdValue = val * effectiveSolPrice;
    } else {
        usdValue = val; // 1 USDC = 1 USD
    }

    const tokens = usdValue / TOKEN_PRICE_USD;
    return tokens.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const calculateUSD = (inputAmount: string) => {
      const val = parseFloat(inputAmount);
      if (isNaN(val)) return '0.00';
      
      if (currency === 'SOL') {
           if (!solPrice) return '0.00';
           return (val * solPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      } else {
          return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
  };

  const handleCopyAddress = () => {
      navigator.clipboard.writeText(PRESALE_WALLET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  const setMaxAmount = () => {
      if (currency === 'SOL') {
          const max = walletState.balance - 0.01; // Leave room for gas
          setAmount((max > 0 ? max : 0).toFixed(4));
      } else {
          // USDC max needs slight buffer for rent? No, but user needs SOL for gas.
          // Just use full USDC balance.
          setAmount(walletState.usdcBalance.toFixed(2));
      }
      setPurchaseStatus('idle');
      setErrorMessage('');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 animate-fade-in-up relative">
      {/* How to Buy Modal */}
      {showHowToBuy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <div className="bg-navy-900 border border-gold-500/30 p-8 rounded-2xl max-w-lg w-full relative shadow-2xl animate-in zoom-in-95 duration-200">
               <button onClick={() => setShowHowToBuy(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
               </button>
               <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-2">
                  <HelpCircle className="text-gold-500" /> 
                  How to Buy $CIFT
               </h2>
               
               <div className="space-y-6">
                   <div className="flex gap-4 p-4 rounded-xl bg-navy-800/50 border border-white/5">
                       <div className="h-10 w-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0 font-bold border border-gold-500/20">1</div>
                       <div>
                           <h3 className="font-bold text-white mb-1 flex items-center gap-2">Create Wallet <Wallet size={14} className="text-gray-400"/></h3>
                           <p className="text-sm text-gray-400">Download <a href="https://phantom.app" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:underline font-bold">Phantom</a> or <a href="https://solflare.com" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:underline font-bold">Solflare</a> for your browser or mobile.</p>
                       </div>
                   </div>
                   <div className="flex gap-4 p-4 rounded-xl bg-navy-800/50 border border-white/5">
                       <div className="h-10 w-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0 font-bold border border-gold-500/20">2</div>
                       <div>
                           <h3 className="font-bold text-white mb-1 flex items-center gap-2">Get SOL <CreditCard size={14} className="text-gray-400"/></h3>
                           <p className="text-sm text-gray-400">Buy Solana (SOL) on an exchange (Binance, Coinbase, etc.) and send it to your wallet address.</p>
                       </div>
                   </div>
                   <div className="flex gap-4 p-4 rounded-xl bg-navy-800/50 border border-white/5">
                       <div className="h-10 w-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0 font-bold border border-gold-500/20">3</div>
                       <div>
                           <h3 className="font-bold text-white mb-1 flex items-center gap-2">Contribute <Zap size={14} className="text-gray-400"/></h3>
                           <p className="text-sm text-gray-400">Connect your wallet, enter amount, and click "Buy Now". Tokens are airdropped to your wallet after presale.</p>
                       </div>
                   </div>
               </div>

               <Button variant="gold" className="w-full mt-8" onClick={() => setShowHowToBuy(false)}>
                   I'm Ready
               </Button>
           </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl">
        
        {/* Header Section */}
        <div className="mb-10 text-left">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                {/* Large Logo & TOTO */}
                <div className="flex items-center gap-4">
                     <img 
                        src="https://assets.zyrosite.com/mk3vgMQRxEcer7k1/toto_the-_ceo-Yle45r8kvWIVzwka.png" 
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gold-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] object-cover" 
                        alt="TOTO" 
                     />
                     <div>
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-none">TOTO</h2>
                        <p className="text-gold-400 text-sm font-bold tracking-[0.2em] mt-1">THE TYCOON</p>
                     </div>
                </div>
                
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-2 self-start md:self-center">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                     <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Presale Live • Stage 1</span>
                </div>
            </div>
            
            {/* Price Tag - Left aligned */}
            <div className="flex justify-start mb-8">
                 <div className="bg-white border-2 border-black px-6 py-2 md:px-8 md:py-3 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 transition-transform">
                     <span className="text-black font-black text-lg md:text-2xl">1 CIFT = ${TOKEN_PRICE_USD}</span>
                 </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-black text-white mb-6 whitespace-nowrap leading-tight">
                EARLY <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">ACCESS</span>
            </h1>

            <button 
                onClick={() => setShowHowToBuy(true)}
                className="inline-flex items-center gap-2 text-gold-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest border-b border-gold-500/30 hover:border-white pb-1"
            >
                <HelpCircle size={16} /> How to Buy?
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Info & Progress */}
            <div className="lg:col-span-7 space-y-6">
                
                {/* Progress Card */}
                <div className="bg-navy-800 rounded-2xl p-6 md:p-8 border border-white/5 shadow-xl">
                    <div className="text-center mb-4">
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">USD Raised</p>
                        <p className="text-2xl md:text-3xl font-black text-white mt-1">
                            ${raisedUSD.toLocaleString()} <span className="text-gray-500 text-xl font-medium">/ ${TARGET_RAISE_USD.toLocaleString()}</span>
                        </p>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative mb-2">
                        <div className="w-full h-8 bg-white/10 rounded-full overflow-hidden border border-white/10">
                            <div 
                                className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 relative transition-all duration-1000 ease-out flex items-center justify-center"
                                style={{ width: `${Math.max((raisedUSD / TARGET_RAISE_USD) * 100, 5)}%` }}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]"></div>
                                <span className="relative z-10 text-xs font-black text-black drop-shadow-md">
                                    {((raisedUSD / TARGET_RAISE_USD) * 100).toFixed(0)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-navy-800 rounded-xl p-5 border border-white/5 flex items-start gap-4">
                        <div className="bg-purple-500/10 p-3 rounded-lg text-purple-500 shrink-0">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-1">Instant Vesting</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">Tokens are airdropped to your wallet immediately after presale ends.</p>
                        </div>
                    </div>
                    
                    <div className="bg-navy-800 rounded-xl p-5 border border-white/5 flex items-start gap-4">
                        <div className="bg-green-500/10 p-3 rounded-lg text-green-500 shrink-0">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-1">Audited Contract</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">Smart contract fully audited by top firms. 100% Secure & Liquidity Locked.</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Right Column: Buy Interface */}
            <div className="lg:col-span-5">
                <div className="bg-navy-900 border border-gold-500/30 rounded-2xl p-6 md:p-8 shadow-2xl sticky top-24">
                    
                    {purchaseStatus === 'success' ? (
                        <div className="text-center py-12 animate-fade-in-up">
                            <div className="mx-auto h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6">
                                <CheckCircle size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Contribution Successful!</h3>
                            <p className="text-gray-400 mb-4">Welcome to the board, Executive. Your $CIFT allocation is secured.</p>
                             {txHash && (
                                <a 
                                    href={`https://solscan.io/tx/${txHash}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-flex items-center gap-2 text-xs text-gold-400 hover:text-white mb-6 underline"
                                >
                                    View Transaction <ExternalLink size={12} />
                                </a>
                            )}
                            <Button variant="gold" onClick={() => { setPurchaseStatus('idle'); setTxHash(''); }} className="w-full">
                                Buy More
                            </Button>
                        </div>
                    ) : (
                        <>
                            {/* Currency Tabs */}
                            <div className="grid grid-cols-2 gap-4 mb-6 p-1 bg-navy-800 rounded-xl border border-white/5">
                                <button
                                    onClick={() => setCurrency('SOL')}
                                    className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${currency === 'SOL' ? 'bg-white text-navy-900 shadow-lg scale-[1.02]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                     <img src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png" className="w-6 h-6 object-contain" alt="SOL" />
                                     <span className="text-lg">SOL</span>
                                </button>
                                <button
                                    onClick={() => setCurrency('USDC')}
                                    className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${currency === 'USDC' ? 'bg-white text-navy-900 shadow-lg scale-[1.02]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                     <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" className="w-6 h-6 object-contain" alt="USDC" />
                                     <span className="text-lg">USDC</span>
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Input Field */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium">
                                        <label className="text-gray-400 uppercase tracking-wide">Amount ({currency})</label>
                                        <span className="text-gold-400 font-mono">
                                            Balance: {currency === 'SOL' ? walletState.balance.toLocaleString() : walletState.usdcBalance.toLocaleString()} {currency}
                                        </span>
                                    </div>
                                    <div className="relative group">
                                        <input 
                                            type="number" 
                                            min="0"
                                            step="0.1"
                                            value={amount}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (parseFloat(val) < 0) return;
                                                setAmount(val);
                                                if (purchaseStatus === 'error') {
                                                    setPurchaseStatus('idle');
                                                    setErrorMessage('');
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === '-' || e.key === 'e') {
                                                    e.preventDefault();
                                                }
                                            }}
                                            placeholder="0.0"
                                            className={`w-full bg-white border rounded-xl px-4 py-4 text-2xl font-bold text-navy-900 focus:outline-none transition-colors placeholder-gray-400 ${purchaseStatus === 'error' ? 'border-red-500 focus:border-red-500' : 'border-white focus:border-gold-500'}`}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            <button 
                                                onClick={setMaxAmount}
                                                className="text-[10px] font-bold bg-navy-100 text-navy-900 px-2 py-1 rounded hover:bg-navy-200 transition-colors"
                                            >
                                                MAX
                                            </button>
                                            {currency === 'SOL' ? (
                                                <img src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png" className="w-6 h-6 object-contain" alt="SOL" />
                                            ) : (
                                                <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" className="w-6 h-6 object-contain" alt="USDC" />
                                            )}
                                        </div>
                                    </div>
                                    {amount && parseFloat(amount) > 0 && (
                                        <div className="text-right text-xs text-gray-500">
                                            ≈ ${calculateUSD(amount)} USD
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-center text-gray-600">
                                    <ArrowRight className="animate-pulse" size={20} />
                                </div>

                                {/* Output Display */}
                                <div className="space-y-2">
                                    <label className="text-gray-400 text-xs font-medium uppercase tracking-wide">You Receive ($CIFT)</label>
                                    <div className="bg-white border border-gray-200 rounded-xl px-4 py-4 flex justify-between items-center">
                                        <span className="text-2xl font-bold text-navy-900 font-mono">
                                            {amount && parseFloat(amount) > 0 ? calculateTokens(amount) : '0'}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-gold-500 shadow-lg shadow-gold-500/20 overflow-hidden border-2 border-gold-600">
                                                 <img src="https://assets.zyrosite.com/mk3vgMQRxEcer7k1/toto_the-_ceo-Yle45r8kvWIVzwka.png" className="h-full w-full object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Error Display */}
                                {purchaseStatus === 'error' && errorMessage && (
                                    <div className="flex items-center gap-3 text-red-400 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20 animate-in fade-in slide-in-from-top-1">
                                        <AlertCircle size={16} className="shrink-0" />
                                        <span className="font-medium">{errorMessage}</span>
                                    </div>
                                )}

                                {!walletState.connected ? (
                                    <Button variant="gold" onClick={onConnectWallet} className="w-full py-4 text-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]">
                                        CONNECT WALLET
                                    </Button>
                                ) : (
                                    <Button 
                                        variant="gold" 
                                        onClick={handleBuy} 
                                        isLoading={purchaseStatus === 'processing'}
                                        disabled={!amount}
                                        className="w-full py-4 text-lg shadow-[0_0_20px_rgba(34,197,94,0.3)] bg-gradient-to-r from-red-500 to-purple-600 border-none text-white hover:from-red-600 hover:to-purple-700"
                                    >
                                        {purchaseStatus === 'processing' ? 'PROCESSING...' : `BUY WITH ${currency}`}
                                    </Button>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Contract Address Mock */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500 mb-2">Presale Wallet Address</p>
                    <button 
                        onClick={handleCopyAddress}
                        className="inline-flex items-center gap-2 bg-navy-800/50 px-4 py-2 rounded-lg border border-white/5 text-gray-400 text-xs font-mono hover:text-white cursor-pointer transition-colors group hover:border-gold-500/30"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png" alt="SOL" className="w-4 h-4 object-contain" />
                        <span>{PRESALE_WALLET.slice(0, 4)}...{PRESALE_WALLET.slice(-4)}</span>
                        {copied ? <CheckCircle size={12} className="text-gold-500" /> : <Copy size={12} className="group-hover:text-gold-400" />}
                    </button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default PresalePage;
