
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl?: string;
  content: string;
  likes: number;
}

const STYLE = `<style>
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
  @media (max-width: 640px) {
    .blog-container { padding: 0 !important; }
    .blog-card { border-radius: 15px !important; box-shadow: 0 5px 15px rgba(0,0,0,0.2) !important; width: 100% !important; max-width: none !important; }
    .blog-image-text { font-size: 20px !important; line-height: 1.1 !important; padding: 10px !important; }
  }
</style>`;

const CONTAINER_STYLE = "margin: 0; padding: 20px; font-family: Impact, 'Arial Black', sans-serif; background: transparent; display: flex; justify-content: center; align-items: flex-start;";
const CARD_STYLE = "background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; max-width: 600px; width: 100%;";
const HEADER_STYLE = "background: #f7931a; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold;";
const IMAGE_AREA_STYLE = "background: #1a1a1a; height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden;";
const TEXT_STYLE_BASE = "color: white; text-transform: uppercase; font-size: 32px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000; letter-spacing: 2px; line-height: 1.2; position: absolute; left: 0; right: 0; z-index: 10;";
const TEXT_TOP_STYLE = `${TEXT_STYLE_BASE} top: 20px;`;
const TEXT_BOTTOM_STYLE = `${TEXT_STYLE_BASE} bottom: 20px;`;
const EMOJI_STYLE = "font-size: 120px; margin-bottom: 20px; animation: float 3s ease-in-out infinite;";
const FOOTER_STYLE = "background: #f5f5f5; padding: 25px; color: #333; font-family: Arial, sans-serif;";
const FOOTER_TITLE_STYLE = "font-weight: bold; color: #f7931a; font-size: 18px; margin-bottom: 10px;";
const BODY_STYLE = "line-height: 1.6; font-size: 15px;";
const STATUS_STYLE = "background: #e8f5e9; padding: 10px; border-radius: 8px; margin-top: 15px; text-align: center; font-weight: bold; color: #2e7d32;";

const generateContent = (header: string, topText: string, emoji: string, bottomText: string, dateTitle: string, body: string, status: string) => `
<div class="blog-container" style="${CONTAINER_STYLE}">
  ${STYLE}
  <div class="blog-card" style="${CARD_STYLE}">
    <div style="${HEADER_STYLE}">
      ${header}
    </div>
    <div style="${IMAGE_AREA_STYLE}">
      <div class="blog-image-text" style="${TEXT_TOP_STYLE}">
        ${topText}
      </div>
      <div style="${EMOJI_STYLE}">
        ${emoji}
      </div>
      <div class="blog-image-text" style="${TEXT_BOTTOM_STYLE}">
        ${bottomText}
      </div>
    </div>
    <div style="${FOOTER_STYLE}">
      <div style="${FOOTER_TITLE_STYLE}">
        ${dateTitle}
      </div>
      <div style="${BODY_STYLE}">
        ${body}
      </div>
      <div style="${STATUS_STYLE}">
        ${status}
      </div>
    </div>
  </div>
</div>
`;

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 109,
    slug: "day-9-gpu-mining-rig-online",
    title: "Day 9: GPU Mining Rig Online!",
    excerpt: "Hashrate: 250 MH/s. It's like a money printer! TOTO finally got the GPU mining rig working.",
    date: "Jan 13, 2026",
    readTime: "3 min read",
    category: "The Origin",
    imageUrl: "https://assets.zyrosite.com/mk3vgMQRxEcer7k1/it-s-like-a-money-printer-FrdXKFXErQXplIna.png",
    likes: 9,
    content: `
<div class="meme-container" style="background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; max-width: 600px; width: 100%; margin: 0 auto;">
  <style>
    @keyframes victory { 0%, 100% { transform: scale(1) rotate(0deg); } 25% { transform: scale(1.15) rotate(-15deg); } 75% { transform: scale(1.15) rotate(15deg); } }
    @keyframes flicker { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.3); opacity: 1; } }
    @media (max-width: 640px) {
        .meme-container { border-radius: 15px !important; }
        .top-text, .bottom-text { font-size: 20px !important; }
    }
  </style>
  <div class="meme-header" style="background: #f7931a; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; font-family: Impact, sans-serif;">
    CIFCI TOTO'S BITCOIN JOURNEY 🚀
  </div>
  <div class="meme-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden;">
    <div class="fire" style="position: absolute; font-size: 45px; animation: flicker 1s ease-in-out infinite; bottom: 80px; left: 120px; animation-delay: 0s;">🔥</div>
    <div class="fire" style="position: absolute; font-size: 45px; animation: flicker 1s ease-in-out infinite; bottom: 100px; left: 160px; animation-delay: 0.3s;">🔥</div>
    <div class="fire" style="position: absolute; font-size: 45px; animation: flicker 1s ease-in-out infinite; bottom: 90px; right: 140px; animation-delay: 0.6s;">🔥</div>
    <div class="top-text" style="color: white; text-transform: uppercase; font-size: 32px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0px #000; letter-spacing: 2px; line-height: 1.2; position: absolute; top: 20px; left: 0; right: 0; font-family: Impact, sans-serif;">GPU MINING RIG: ONLINE!</div>
    <div class="character" style="font-size: 120px; margin-bottom: 20px; animation: victory 0.8s ease-in-out infinite;">🎮</div>
    <div class="bottom-text" style="color: white; text-transform: uppercase; font-size: 28px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0px #000; letter-spacing: 2px; line-height: 1.2; position: absolute; bottom: 20px; left: 0; right: 0; font-family: Impact, sans-serif;">HASHRATE: 250 MH/S<br>IT'S LIKE A MONEY PRINTER!</div>
  </div>
  <div class="meme-footer" style="background: #f5f5f5; padding: 25px; color: #333; font-family: Arial, sans-serif;">
    <div class="date" style="font-weight: bold; color: #f7931a; font-size: 18px; margin-bottom: 10px;">📅 DAY 9</div>
    <div class="story" style="line-height: 1.6; font-size: 15px;">
        <strong>What happened:</strong> After 6 more hours of tinkering (and one emergency call to his tech-savvy cousin), TOTO finally got the GPU mining rig working! He powered it on at 4:37 PM, ran the mining software, and watched in amazement as the hashrate jumped from 2.5 MH/s to 250 MH/s. That's 100x faster than CPU mining!
        <br><br>
        <strong>His thoughts:</strong> "THIS IS INSANE! Look at those numbers go! At this rate I could mine a block every few hours! My room sounds like an airplane hangar and feels like a sauna, but WHO CARES?! I'M MINING BITCOIN! 🚀💰"
        <br><br>
        <strong>What he did:</strong> Stood and watched the mining software for 45 minutes straight. Took a video to send to BitcoinTalk forum. Posted: "Just got my GPU rig online - 250MH/s!! TO THE MOON!!" Called his wife to tell her the good news (she hung up). Ordered a second GPU because "if one is good, two is better." His electric meter is spinning like a DJ turntable.
    </div>
    <div class="performance" style="background: #e8f5e9; padding: 12px; border-radius: 8px; margin-top: 10px; font-family: 'Courier New', monospace; font-size: 13px; color: #1b5e20; border-left: 4px solid #4caf50;">
        ⚡ MINING STATS:<br>
        CPU: 2.5 MH/s → GPU: 250 MH/s (100x faster!)<br>
        Estimated blocks/day: ~3-4 blocks<br>
        Est. daily earnings: 150-200 BTC ($15-20)<br>
        Power consumption: YES 🔥<br>
        Room temperature: TROPICAL 🌴
    </div>
    <div class="btc-price" style="background: #d4edda; padding: 10px; border-radius: 8px; margin-top: 15px; text-align: center; font-weight: bold; color: #155724;">
        💰 Bitcoin Price: ~$0.10 | His Holdings: 200 BTC ($20.00) | ROI Timeline: Still calculating... | Wife Status: Still at mom's 📱❌
    </div>
  </div>
</div>
`
  },
  {
    id: 108,
    slug: "day-8-mining-rig-arrived",
    title: "Day 8: Mining Rig Arrived!",
    excerpt: "3 Hours later... Still reading manual. TOTO called in \"sick\" to assemble his mining rig.",
    date: "Jan 12, 2026",
    readTime: "3 min read",
    category: "The Origin",
    imageUrl: "https://assets.zyrosite.com/mk3vgMQRxEcer7k1/still-reading-manual-MZl1cI1X7ZqmfsNb.png",
    likes: 6,
    content: `
<div class="meme-container" style="background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; max-width: 600px; width: 100%; margin: 0 auto;">
  <style>
    @keyframes tinker { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
    @keyframes rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @media (max-width: 640px) {
        .meme-container { border-radius: 15px !important; }
        .top-text, .bottom-text { font-size: 20px !important; }
    }
  </style>
  <div class="meme-header" style="background: #f7931a; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; font-family: Impact, sans-serif;">
    CIFCI TOTO'S BITCOIN JOURNEY 🚀
  </div>
  <div class="meme-image" style="background: linear-gradient(135deg, #434343 0%, #000000 100%); height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden;">
    <div class="tools" style="position: absolute; font-size: 40px; animation: rotate 3s linear infinite; top: 80px; left: 80px; animation-delay: 0s;">🔧</div>
    <div class="tools" style="position: absolute; font-size: 40px; animation: rotate 3s linear infinite; top: 100px; right: 80px; animation-delay: 1s;">🔨</div>
    <div class="tools" style="position: absolute; font-size: 40px; animation: rotate 3s linear infinite; bottom: 100px; left: 100px; animation-delay: 2s;">⚙️</div>
    <div class="top-text" style="color: white; text-transform: uppercase; font-size: 32px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0px #000; letter-spacing: 2px; line-height: 1.2; position: absolute; top: 20px; left: 0; right: 0; font-family: Impact, sans-serif;">MINING RIG ARRIVED!</div>
    <div class="character" style="font-size: 120px; margin-bottom: 20px; animation: tinker 1s ease-in-out infinite;">🛠️</div>
    <div class="bottom-text" style="color: white; text-transform: uppercase; font-size: 28px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0px #000; letter-spacing: 2px; line-height: 1.2; position: absolute; bottom: 20px; left: 0; right: 0; font-family: Impact, sans-serif;">3 HOURS LATER...<br>STILL READING MANUAL</div>
  </div>
  <div class="meme-footer" style="background: #f5f5f5; padding: 25px; color: #333; font-family: Arial, sans-serif;">
    <div class="date" style="font-weight: bold; color: #f7931a; font-size: 18px; margin-bottom: 10px;">📅 DAY 8</div>
    <div class="story" style="line-height: 1.6; font-size: 15px;">
        <strong>What happened:</strong> The FedEx truck arrived at 10:23 AM. TOTO called in "sick" to work (he's not sick, just excited). Five big boxes are now scattered across his living room floor. His wife is at her mother's house "thinking about things." It's just TOTO, his dreams, and a pile of computer parts.
        <br><br>
        <strong>His thoughts:</strong> "Okay, this should be easy. Just plug everything together like LEGO, right? *reads manual* Wait, what's a PCIe riser? Why are there so many cables?! Do I need thermal paste? WHAT IS THERMAL PASTE?! 😵"
        <br><br>
        <strong>What he did:</strong> Opened every box like it was Christmas. Took photos for documentation. Started assembling the rig. Realized he needs a screwdriver (doesn't have one). Drove to hardware store. Got distracted watching YouTube tutorials. Three hours later, he's installed the motherboard, power supply, and... that's it. The GPU is still in the box. His CPU miner is still running in the background though (priorities!).
    </div>
    <div class="setup-log" style="background: #263238; color: #00ff00; padding: 12px; border-radius: 8px; margin-top: 10px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.6;">
        [10:23] Package delivered ✓<br>
        [10:47] All boxes opened ✓<br>
        [11:15] Manual reading initiated...<br>
        [12:30] Hardware store trip...<br>
        [13:45] YouTube tutorial #7...<br>
        [14:00] Motherboard installed ✓<br>
        [14:30] Still figuring out GPU mounting... ⏳
    </div>
    <div class="btc-price" style="background: #e8f5e9; padding: 10px; border-radius: 8px; margin-top: 15px; text-align: center; font-weight: bold; color: #2e7d32;">
        💰 Bitcoin Price: ~$0.10 | His Holdings: 150 BTC ($15.00) | Setup Progress: 30% | Confidence: 45%
    </div>
  </div>
</div>
`
  },
  {
    id: 107,
    slug: "day-7-honey-i-can-explain",
    title: "Day 7: Honey, I Can Explain...",
    excerpt: "He clicked \"Place Order\" at 2 AM after 3 beers. Now he has to explain the $750 charge to his wife.",
    date: "Jan 11, 2026",
    readTime: "3 min read",
    category: "The Origin",
    imageUrl: "https://assets.zyrosite.com/mk3vgMQRxEcer7k1/honey-i-can-explain-mBSA5a6i8Cy2Oe7N.png",
    likes: 5,
    content: `
<div class="meme-container" style="background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; max-width: 600px; width: 100%; margin: 0 auto;">
  <style>
    @keyframes nervous { 0%, 100% { transform: translateX(-3px); } 50% { transform: translateX(3px); } }
    @keyframes drip { 0% { transform: translateY(0px); opacity: 1; } 100% { transform: translateY(30px); opacity: 0; } }
    @media (max-width: 640px) {
        .meme-container { border-radius: 15px !important; }
        .top-text, .bottom-text { font-size: 20px !important; }
    }
  </style>
  <div class="meme-header" style="background: #f7931a; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; font-family: Impact, sans-serif;">
    CIFCI TOTO'S BITCOIN JOURNEY 🚀
  </div>
  <div class="meme-image" style="background: linear-gradient(135deg, #134e5e 0%, #71b280 100%); height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden;">
    <div class="sweat" style="position: absolute; font-size: 35px; animation: drip 1.5s ease-in-out infinite; top: 120px; left: 220px; animation-delay: 0s;">💧</div>
    <div class="sweat" style="position: absolute; font-size: 35px; animation: drip 1.5s ease-in-out infinite; top: 140px; left: 250px; animation-delay: 0.3s;">💧</div>
    <div class="sweat" style="position: absolute; font-size: 35px; animation: drip 1.5s ease-in-out infinite; top: 130px; right: 240px; animation-delay: 0.6s;">💧</div>
    <div class="top-text" style="color: white; text-transform: uppercase; font-size: 28px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0 #000; letter-spacing: 2px; line-height: 1.2; position: absolute; top: 20px; left: 0; right: 0; font-family: Impact, sans-serif;">"HONEY, I CAN EXPLAIN<br>THE $750 CHARGE..."</div>
    <div class="character" style="font-size: 120px; margin-bottom: 20px; animation: nervous 0.3s ease-in-out infinite;">😰</div>
    <div class="bottom-text" style="color: white; text-transform: uppercase; font-size: 26px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0 #000; letter-spacing: 2px; line-height: 1.2; position: absolute; bottom: 20px; left: 0; right: 0; font-family: Impact, sans-serif;">HE CLICKED "PLACE ORDER"<br>AT 2 AM AFTER 3 BEERS</div>
  </div>
  <div class="meme-footer" style="background: #f5f5f5; padding: 25px; color: #333; font-family: Arial, sans-serif;">
    <div style="font-weight: bold; color: #f7931a; font-size: 18px; margin-bottom: 10px;">📅 DAY 7</div>
    <div style="line-height: 1.6; font-size: 15px;">
        <strong>What happened:</strong> Last night, after a few beers and watching his CPU mine another block, TOTO had a moment of "liquid courage" at 2:47 AM. He clicked "Place Order" on the entire $750 mining rig. This morning he woke up to the order confirmation email and immediately panicked.
        <br><br>
        <strong>His thoughts:</strong> "OH NO. What have I done?! That's... that's almost our entire savings! How do I explain to my wife that I spent $750 to mine internet money worth 10 cents each?! Maybe I can cancel the order? *checks email* IT ALREADY SHIPPED?! 😱"
        <br><br>
        <strong>What he did:</strong> Spent 2 hours crafting the "perfect explanation" for his wife. Practiced the speech in the mirror. Made another spreadsheet showing "projected returns" (very optimistic). His wife found the shipping notification. The conversation did NOT go well. She's now questioning his sanity. He's sleeping on the couch tonight.
    </div>
    <div style="background: #fce4ec; padding: 12px; border-radius: 8px; margin-top: 10px; font-size: 14px; color: #880e4f; border-left: 4px solid #e91e63;">
        💬 <strong>Wife:</strong> "You spent HOW MUCH on WHAT?!"<br>
        💬 <strong>TOTO:</strong> "But honey, think of it as an investment!"<br>
        💬 <strong>Wife:</strong> "An investment in FAKE COMPUTER MONEY?!"<br>
        💬 <strong>TOTO:</strong> "It's not fake, it's cryptographically secured..."<br>
        💬 <strong>Wife:</strong> "The couch is cryptographically secured for you tonight."
    </div>
    <div style="background: #ffebee; padding: 10px; border-radius: 8px; margin-top: 15px; text-align: center; font-weight: bold; color: #c62828;">
        💰 Bitcoin Price: ~$0.10 | His Holdings: 100 BTC ($10.00) | Money Spent: $750 | Marriage Status: 🔥
    </div>
  </div>
</div>
`
  },
  {
    id: 106,
    slug: "day-6-browsing-newegg-at-work",
    title: "Day 6: Browsing Newegg At Work",
    excerpt: "Should I buy a $400 GPU to mine $5 coins? TOTO spent his entire workday researching GPU mining instead of doing actual work.",
    date: "Jan 10, 2026",
    readTime: "3 min read",
    category: "The Origin",
    imageUrl: "https://assets.zyrosite.com/mk3vgMQRxEcer7k1/browsing-newegg-at-work-YfJj8wZ6ijCnMWym.png",
    likes: 8,
    content: `
<div class="meme-container" style="background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; max-width: 600px; width: 100%; margin: 0 auto;">
  <style>
    @keyframes thinking { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
    @keyframes bubble { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.3); opacity: 1; } }
    @media (max-width: 640px) {
        .meme-container { border-radius: 15px !important; }
        .top-text, .bottom-text { font-size: 20px !important; }
    }
  </style>
  <div class="meme-header" style="background: #f7931a; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; font-family: Impact, sans-serif;">
    CIFCI TOTO'S BITCOIN JOURNEY 🚀
  </div>
  <div class="meme-image" style="background: linear-gradient(135deg, #ee0979 0%, #ff6a00 100%); height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden;">
    <div style="position: absolute; font-size: 30px; animation: bubble 2s ease-in-out infinite; top: 60px; right: 80px; animation-delay: 0s;">💭</div>
    <div style="position: absolute; font-size: 30px; animation: bubble 2s ease-in-out infinite; top: 100px; right: 120px; animation-delay: 0.5s;">💻</div>
    <div style="position: absolute; font-size: 30px; animation: bubble 2s ease-in-out infinite; top: 140px; right: 100px; animation-delay: 1s;">💰</div>
    <div class="top-text" style="color: white; text-transform: uppercase; font-size: 32px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0 #000; position: absolute; top: 20px; left: 0; right: 0; font-family: Impact, sans-serif;">BROWSING NEWEGG AT WORK</div>
    <div class="character" style="font-size: 120px; margin-bottom: 20px; animation: thinking 2s ease-in-out infinite;">🤔</div>
    <div class="bottom-text" style="color: white; text-transform: uppercase; font-size: 26px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0 #000; position: absolute; bottom: 20px; left: 0; right: 0; font-family: Impact, sans-serif;">SHOULD I BUY A<br>$400 GPU TO MINE $5 COINS?</div>
  </div>
  <div class="meme-footer" style="background: #f5f5f5; padding: 25px; color: #333; font-family: Arial, sans-serif;">
    <div style="font-weight: bold; color: #f7931a; font-size: 18px; margin-bottom: 10px;">📅 DAY 6 - November 5, 2010</div>
    <div style="line-height: 1.6; font-size: 15px;">
        <strong>What happened:</strong> TOTO spent his entire workday researching GPU mining instead of doing actual work. He's discovered that GPUs can mine 100x faster than CPUs. His boss walked by his desk three times while he had Newegg open looking at AMD Radeon HD 5970 cards.
        <br><br>
        <strong>His thoughts:</strong> "Okay so... spend $400 on a graphics card to mine coins worth $0.10 each? The math says I'll break even in... *calculates furiously* ...if Bitcoin stays at this price, never. BUT what if it goes to $1? That's a 10x! Wait, what if it goes to $10?! 🚀"
        <br><br>
        <strong>What he did:</strong> Made a spreadsheet with mining profitability calculations. Read every forum post about GPU mining. Watched his CPU mine another block (100 BTC total now!). Decided to "think about it over the weekend" but kept refreshing the GPU listings. His cart has $1,200 worth of mining equipment in it.
    </div>
    <div style="background: #fff3e0; padding: 12px; border-radius: 8px; margin-top: 10px; font-family: 'Courier New', monospace; font-size: 13px; color: #e65100;">
        🛒 Newegg Cart:<br>
        - AMD Radeon HD 5970: $449.99<br>
        - 850W Power Supply: $129.99<br>
        - Cooling Fans x4: $79.96<br>
        - Open Air Case: $89.99<br>
        TOTAL: $749.93 💸
    </div>
    <div style="background: #e1f5fe; padding: 10px; border-radius: 8px; margin-top: 15px; text-align: center; font-weight: bold; color: #01579b;">
        💰 Bitcoin Price: ~$0.10 | His Holdings: 100 BTC ($10.00) | Cart Total: $749.93 | Wife Approval: 0%
    </div>
  </div>
</div>
`
  },
  {
    id: 105,
    slug: "day-5-mined-first-block",
    title: "Day 5: Mined First Block!",
    excerpt: "At 3:42 AM, TOTO's wallet made a notification sound. He jumped out of bed like it was Christmas morning. 50 BTC. 5 Dollars. He is rich.",
    date: "Jan 9, 2026",
    readTime: "2 min read",
    category: "The Origin",
    imageUrl: "https://assets.zyrosite.com/mk3vgMQRxEcer7k1/mined-first-block-YvQNMQBrQeSbz3ck.png",
    likes: 7,
    content: `
<div class="meme-container" style="background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; max-width: 600px; width: 100%; margin: 0 auto;">
  <style>
    @keyframes jump { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-30px) scale(1.2); } }
    @keyframes fall { 0% { transform: translateY(0px) rotate(0deg); opacity: 1; } 100% { transform: translateY(500px) rotate(720deg); opacity: 0; } }
    @media (max-width: 640px) {
        .meme-container { border-radius: 15px !important; }
        .top-text, .bottom-text { font-size: 20px !important; }
    }
  </style>
  <div class="meme-header" style="background: #f7931a; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; font-family: Impact, sans-serif;">
    CIFCI TOTO'S BITCOIN JOURNEY 🚀
  </div>
  <div class="meme-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden;">
    <div style="position: absolute; font-size: 40px; animation: fall 3s ease-in-out infinite; top: -50px; left: 20%; animation-delay: 0s;">🪙</div>
    <div style="position: absolute; font-size: 40px; animation: fall 3s ease-in-out infinite; top: -50px; left: 40%; animation-delay: 0.5s;">🪙</div>
    <div style="position: absolute; font-size: 40px; animation: fall 3s ease-in-out infinite; top: -50px; left: 60%; animation-delay: 1s;">🪙</div>
    <div style="position: absolute; font-size: 40px; animation: fall 3s ease-in-out infinite; top: -50px; left: 80%; animation-delay: 1.5s;">🪙</div>
    <div class="top-text" style="color: white; text-transform: uppercase; font-size: 32px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0 #000; position: absolute; top: 20px; left: 0; right: 0; font-family: Impact, sans-serif;">MINED FIRST BLOCK!</div>
    <div class="character" style="font-size: 120px; margin-bottom: 20px; animation: jump 0.6s ease-in-out infinite;">🤑</div>
    <div class="bottom-text" style="color: white; text-transform: uppercase; font-size: 28px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0 #000; position: absolute; bottom: 20px; left: 0; right: 0; font-family: Impact, sans-serif;">50 BTC = $5.00<br>"I'M RICH!" - TOTO, 2010</div>
  </div>
  <div class="meme-footer" style="background: #f5f5f5; padding: 25px; color: #333; font-family: Arial, sans-serif;">
    <div style="font-weight: bold; color: #f7931a; font-size: 18px; margin-bottom: 10px;">📅 DAY 5 - November 4, 2010</div>
    <div style="line-height: 1.6; font-size: 15px;">
        <strong>What happened:</strong> At 3:42 AM, TOTO's wallet made a notification sound. He jumped out of bed like it was Christmas morning. There it was: 50.00000000 BTC in his wallet! His first mined block!
        <br><br>
        <strong>His thoughts:</strong> "HOLY... I JUST MADE $5 FOR FREE! Wait, I spent $20 on electricity... okay so -$15... BUT I HAVE BITCOIN! REAL BITCOIN! This is actually working! 🎉💰"
        <br><br>
        <strong>What he did:</strong> Took a screenshot and saved it 5 times. Woke up his wife to show her (she was NOT impressed at 3:42 AM). Posted on BitcoinTalk forum: "JUST MINED MY FIRST BLOCK!!!" Decided to keep mining. Calculated that at this rate, he could mine 10 blocks a week. Started looking at GPU mining rigs.
    </div>
    <div style="background: #fff9c4; padding: 12px; border-radius: 8px; margin-top: 10px; text-align: center; font-size: 16px; font-weight: bold; color: #f57f17; border: 3px dashed #fbc02d;">
        🎊 FIRST BLOCK REWARD: 50 BTC 🎊
    </div>
    <div style="background: #d4edda; padding: 10px; border-radius: 8px; margin-top: 15px; text-align: center; font-weight: bold; color: #155724;">
        💰 Bitcoin Price: ~$0.10 | His Holdings: 50 BTC ($5.00) | Status: OFFICIALLY A MINER ⛏️
    </div>
  </div>
</div>
`
  },
  {
    id: 104,
    slug: "day-4-been-mining-for-24-hours",
    title: "Day 4: Been Mining for 24 Hours",
    excerpt: "Still no Bitcoin. PC is now a heater. Electricity bill is going to be interesting.",
    date: "Jan 8, 2026",
    readTime: "2 min read",
    category: "The Origin",
    imageUrl: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1000&auto=format&fit=crop",
    likes: 4,
    content: `
<div class="meme-container" style="background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; max-width: 600px; width: 100%; margin: 0 auto;">
  <style>
    @keyframes sleepy { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
    @keyframes float-up { 0% { transform: translateY(0px); opacity: 0; } 50% { opacity: 0.7; } 100% { transform: translateY(-50px); opacity: 0; } }
    @media (max-width: 640px) {
        .meme-container { border-radius: 15px !important; }
        .top-text, .bottom-text { font-size: 20px !important; }
    }
  </style>
  <div class="meme-header" style="background: #f7931a; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; font-family: Impact, sans-serif;">
    CIFCI TOTO'S BITCOIN JOURNEY 🚀
  </div>
  <div class="meme-image" style="background: linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%); height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden;">
    <div style="position: absolute; font-size: 50px; animation: float-up 3s ease-in-out infinite; opacity: 0.7; top: 80px; right: 100px; animation-delay: 0s;">Z</div>
    <div style="position: absolute; font-size: 50px; animation: float-up 3s ease-in-out infinite; opacity: 0.7; top: 120px; right: 80px; animation-delay: 1s;">z</div>
    <div style="position: absolute; font-size: 50px; animation: float-up 3s ease-in-out infinite; opacity: 0.7; top: 160px; right: 120px; animation-delay: 2s;">z</div>
    <div class="top-text" style="color: white; text-transform: uppercase; font-size: 32px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0 #000; position: absolute; top: 20px; left: 0; right: 0; font-family: Impact, sans-serif;">BEEN MINING FOR 24 HOURS</div>
    <div class="character" style="font-size: 120px; margin-bottom: 20px; animation: sleepy 2s ease-in-out infinite;">😴</div>
    <div class="bottom-text" style="color: white; text-transform: uppercase; font-size: 28px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0 #000; position: absolute; bottom: 20px; left: 0; right: 0; font-family: Impact, sans-serif;">STILL NO BITCOIN<br>PC IS NOW A HEATER</div>
  </div>
  <div class="meme-footer" style="background: #f5f5f5; padding: 25px; color: #333; font-family: Arial, sans-serif;">
    <div style="font-weight: bold; color: #f7931a; font-size: 18px; margin-bottom: 10px;">📅 DAY 4 - November 3, 2010</div>
    <div style="line-height: 1.6; font-size: 15px;">
        <strong>What happened:</strong> TOTO's been mining for a full day. His wallet still shows "0.00000000 BTC" and he's starting to have doubts. His PC is so hot he could fry an egg on it. His electricity bill is going to be interesting this month.
        <br><br>
        <strong>His thoughts:</strong> "Is this thing even working? Maybe I configured it wrong? The forums said CPU mining would get blocks... eventually? HOW LONG IS EVENTUALLY?! 😤"
        <br><br>
        <strong>What he did:</strong> Checked his wallet 47 times today. Googled "bitcoin mining not working" and "how long to mine 1 bitcoin 2010." Read that difficulty increases over time and panicked. Decided to let it run another day. Wife threatens to unplug the PC if he doesn't stop obsessing.
    </div>
    <div style="background: #1a1a1a; color: #00ff00; padding: 12px; border-radius: 8px; margin-top: 10px; font-family: 'Courier New', monospace; font-size: 13px;">
        > Hash Rate: ~2.5 MH/s<br>
        > Blocks Found: 0<br>
        > Time Mining: 24h 17m 43s<br>
        > BTC Earned: 0.00000000 BTC<br>
        > Status: Still going... 🔥
    </div>
    <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin-top: 15px; text-align: center; font-weight: bold; color: #856404;">
        💰 Bitcoin Price: ~$0.10 | His Holdings: 0 BTC | Hope Level: 65% | PC Temp: 89°C
    </div>
  </div>
</div>
`
  },
  {
    id: 103,
    slug: "day-3-blockchain-fully-synced",
    title: "Day 3: Blockchain Fully Synced",
    excerpt: "TOTO woke up, saw '100% Complete' and actually fist-pumped the air. Time to start mining this 'Magic Internet Money'.",
    date: "Jan 7, 2026",
    readTime: "2 min read",
    category: "The Origin",
    imageUrl: "https://assets.zyrosite.com/mk3vgMQRxEcer7k1/toto-blockchain-fully-synced-6hn2PTUmLIxxRuLi.png",
    likes: 4,
    content: `
<div class="meme-container" style="background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; max-width: 600px; width: 100%; margin: 0 auto;">
  <style>
    @keyframes celebrate { 0%, 100% { transform: scale(1) rotate(0deg); } 25% { transform: scale(1.1) rotate(-10deg); } 75% { transform: scale(1.1) rotate(10deg); } }
    @keyframes sparkle { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1.2); } }
    @media (max-width: 640px) {
        .meme-container { border-radius: 15px !important; }
        .top-text, .bottom-text { font-size: 20px !important; }
    }
  </style>
  <div class="meme-header" style="background: #f7931a; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; font-family: Impact, sans-serif;">
    CIFCI TOTO'S BITCOIN JOURNEY 🚀
  </div>
  <div class="meme-image" style="background: linear-gradient(180deg, #1e3c72 0%, #2a5298 100%); height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden;">
    <div style="position: absolute; font-size: 40px; animation: sparkle 1.5s ease-in-out infinite; top: 100px; left: 50px; animation-delay: 0s;">✨</div>
    <div style="position: absolute; font-size: 40px; animation: sparkle 1.5s ease-in-out infinite; top: 150px; right: 50px; animation-delay: 0.3s;">✨</div>
    <div style="position: absolute; font-size: 40px; animation: sparkle 1.5s ease-in-out infinite; bottom: 100px; left: 80px; animation-delay: 0.6s;">✨</div>
    <div style="position: absolute; font-size: 40px; animation: sparkle 1.5s ease-in-out infinite; bottom: 150px; right: 80px; animation-delay: 0.9s;">✨</div>
    <div class="top-text" style="color: white; text-transform: uppercase; font-size: 32px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0 #000; position: absolute; top: 20px; left: 0; right: 0; font-family: Impact, sans-serif;">BLOCKCHAIN FULLY SYNCED!</div>
    <div class="character" style="font-size: 120px; margin-bottom: 20px; animation: celebrate 1s ease-in-out infinite;">🎉</div>
    <div class="bottom-text" style="color: white; text-transform: uppercase; font-size: 28px; text-align: center; padding: 10px 20px; text-shadow: 3px 3px 0 #000; position: absolute; bottom: 20px; left: 0; right: 0; font-family: Impact, sans-serif;">TIME TO START MINING<br>THIS "MAGIC INTERNET MONEY"</div>
  </div>
  <div class="meme-footer" style="background: #f5f5f5; padding: 25px; color: #333; font-family: Arial, sans-serif;">
    <div style="font-weight: bold; color: #f7931a; font-size: 18px; margin-bottom: 10px;">📅 DAY 3 - November 2, 2010</div>
    <div style="line-height: 1.6; font-size: 15px;">
        <strong>What happened:</strong> The blockchain finally finished syncing at 6:47 AM! TOTO woke up, saw "100% Complete" and actually fist-pumped the air. His PC survived (barely). Now he's staring at the Bitcoin-Qt wallet interface like it's alien technology.
        <br><br>
        <strong>His thoughts:</strong> "Okay so... I just click 'Start Mining' and free money appears? This feels like a scam but also... what if it's not? 🤔💰"
        <br><br>
        <strong>What he did:</strong> Googled "how to mine bitcoin 2010" for 2 hours. Read forum posts from nerds arguing about GPU vs CPU mining. Decided to try CPU mining first with his Intel Core 2 Duo processor. Started mining at 11:23 AM. His PC fan sounds like a jet engine.
    </div>
    <div style="background: #d4edda; padding: 10px; border-radius: 8px; margin-top: 15px; text-align: center; font-weight: bold; color: #155724;">
        💰 Bitcoin Price: ~$0.10 | His Holdings: 0 BTC | Mining Started: ✅ | CPU Temperature: 🔥🔥🔥
    </div>
  </div>
</div>
`
  },
  {
    id: 102,
    slug: "day-2-downloading-bitcoin-qt",
    title: "Day 2: Downloading Bitcoin-Qt",
    excerpt: "Why is this 20GB?! My PC is dying! TOTO decides to download the Bitcoin client software.",
    date: "Jan 6, 2026",
    readTime: "2 min read",
    category: "The Origin",
    imageUrl: "https://assets.zyrosite.com/mk3vgMQRxEcer7k1/toto-downloading-bitcoin-1YrQeYGzIrSOaO6R.png",
    likes: 6,
    content: `
<div class="blog-container" style="${CONTAINER_STYLE}">
  <style>
    @keyframes shake { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
    @keyframes loading { 0%, 100% { width: 35%; } 50% { width: 45%; } }
    @media (max-width: 640px) {
      .blog-container { padding: 0 !important; }
      .blog-card { border-radius: 15px !important; box-shadow: 0 5px 15px rgba(0,0,0,0.2) !important; width: 100% !important; max-width: none !important; }
      .blog-image-text { font-size: 20px !important; line-height: 1.1 !important; padding: 10px !important; }
    }
  </style>
  <div class="blog-card" style="${CARD_STYLE}">
    <div style="${HEADER_STYLE}">
      CIFCI TOTO'S BITCOIN JOURNEY 🚀
    </div>
    <div style="background: #2c3e50; height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden;">
      <div class="blog-image-text" style="${TEXT_TOP_STYLE}">
        DOWNLOADING BITCOIN-QT
      </div>
      <div style="font-size: 120px; margin-bottom: 20px; animation: shake 0.5s ease-in-out infinite;">
        😰
      </div>
      <div class="blog-image-text" style="${TEXT_BOTTOM_STYLE}">
        WHY IS THIS 20GB?!<br>MY PC IS DYING!
      </div>
    </div>
    <div style="${FOOTER_STYLE}">
      <div style="${FOOTER_TITLE_STYLE}">
        📅 DAY 2 - November 1, 2010
      </div>
      <div style="${BODY_STYLE}">
        <strong>What happened:</strong> TOTO decided to download the Bitcoin client software. His 2010 PC with 250GB hard drive started sweating. The blockchain was already several gigabytes and growing.
        <br><br>
        <strong>His thoughts:</strong> "Why does digital money need to download the entire history of transactions?! This is going to take forever on my dial-up... I mean DSL."
        <br><br>
        <strong>What he did:</strong> Left his PC running overnight. His wife yelled at him for keeping the computer fan noise running. Almost gave up three times. Googled "is bitcoin a virus?"
      </div>
      <div style="background: #e0e0e0; height: 8px; border-radius: 4px; margin-top: 10px; overflow: hidden;">
        <div style="background: #f7931a; height: 100%; width: 35%; animation: loading 2s ease-in-out infinite;"></div>
      </div>
      <div style="background: #fff3cd; padding: 10px; border-radius: 8px; margin-top: 15px; text-align: center; font-weight: bold; color: #856404;">
        💰 Bitcoin Price: ~$0.10 | His Holdings: 0 BTC | Download Progress: 35% | Patience Level: 20%
      </div>
    </div>
  </div>
</div>
`
  },
  {
    id: 101,
    slug: "day-1-reading-whitepaper",
    title: "Day 1: Reading the Whitepaper",
    excerpt: "Reads 'Bitcoin: A Peer-to-Peer Electronic Cash System'. This is either genius or complete nonsense.",
    date: "Jan 5, 2026",
    readTime: "2 min read",
    category: "The Origin",
    imageUrl: "https://assets.zyrosite.com/mk3vgMQRxEcer7k1/cifci-toto-btc-whitepaper.-tGYi7UwAjYp1Xh31.png",
    likes: 6,
    content: generateContent(
      "CIFCI TOTO'S BITCOIN JOURNEY 🚀",
      "OCTOBER 31, 2010",
      "🤓",
      "READS \"BITCOIN: A PEER-TO-PEER<br> ELECTRONIC CASH SYSTEM\"",
      "📅 DAY 1 – October 31, 2010",
      `<strong>What happened:</strong> CIFCI TOTO stumbled upon Satoshi Nakamoto's Bitcoin whitepaper on a random tech forum at 2 AM. His first reaction: "This is either genius or complete nonsense... probably nonsense."
      <br><br>
      <strong>His thoughts:</strong> "Digital money without banks? Yeah right. But wait... the math actually checks out? 🤔"
      <br><br>
      <strong>What he did:</strong> Spent the entire night reading the 9-page PDF four times. Made coffee at 4 AM. Read it again. His wife thinks he's gone crazy.`,
      "💰 Bitcoin Price: ~$0.10 | His Holdings: 0 BTC | Skepticism Level: 95%"
    )
  }
];
