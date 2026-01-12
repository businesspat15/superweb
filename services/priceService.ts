
export const getSolanaPrice = async (): Promise<number> => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.solana.usd;
  } catch (error) {
    console.warn("Failed to fetch SOL price from CoinGecko, using fallback.");
    return 145.0; // Fallback price
  }
};
