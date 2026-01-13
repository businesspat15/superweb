import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Quote, ShieldCheck, Users, Coins, TrendingUp, Play, RotateCcw, Heart, Skull, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { CEO_QUOTES } from '../services/geminiService';

const SLIDER_DATA = [
  {
    image: "https://assets.zyrosite.com/mk3vgMQRxEcer7k1/toto-community-9FpeUFVAaUn0xvFM.png",
    title: "Community Power",
    description: "Building a global network of builders, believers, and executives."
  },
  {
    image: "https://assets.zyrosite.com/mk3vgMQRxEcer7k1/cifcitoto-blockchain-TfKR8P1Gyp7KRupG.png",
    title: "Digital Sovereignty",
    description: "Securing the future through strategic accumulation and blockchain utility."
  },
  {
    image: "https://assets.zyrosite.com/mk3vgMQRxEcer7k1/pioneering-the-bridge-between-digital-assets-and-real-world-PHYoDZDvDpicxEht.png",
    title: "Sustainable Future",
    description: "Pioneering the bridge between digital assets and real-world."
  }
];

// --- Flappy Game Types & Constants ---
const GRAVITY = 0.5;
const JUMP_STRENGTH = -8;
const GAME_SPEED = 3;
const OBSTACLE_WIDTH = 50;
const OBSTACLE_GAP = 160; // Gap between top and bottom pipe
const OBSTACLE_SPACING = 250; // Distance between pipes
const BIRD_SIZE = 34;
const CONTAINER_HEIGHT = 400;

interface Obstacle {
  id: number;
  x: number;
  heightTop: number; // Height of the top red candle
  // Bottom candle height is calculated based on GAP
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dailyQuote, setDailyQuote] = useState('');

  // --- Game State ---
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Physics State
  const [birdY, setBirdY] = useState(200);
  const [velocity, setVelocity] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_DATA.length);
    }, 5000);
    
    setDailyQuote(CEO_QUOTES[Math.floor(Math.random() * CEO_QUOTES.length)]);

    // Load High Score
    const saved = localStorage.getItem('cift_flappy_highscore');
    if (saved) setHighScore(parseInt(saved));

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDER_DATA.length);
  };                                          

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDER_DATA.length - 1 : prev - 1));
  };

  // --- Game Logic ---

  const startGame = () => {
    setGameStatus('playing');
    setScore(0);
    setBirdY(200);
    setVelocity(0);
    setRotation(0);
    // Initial Obstacle
    setObstacles([
        { id: Date.now(), x: 400, heightTop: 100 }
    ]);
  };

  const jump = useCallback(() => {
    if (gameStatus !== 'playing') return;
    setVelocity(JUMP_STRENGTH);
  }, [gameStatus]);

  // Game Loop
  useEffect(() => {
    if (gameStatus !== 'playing') {
        if (gameLoopRef.current) {
            clearInterval(gameLoopRef.current);
            gameLoopRef.current = null;
        }
        return;
    }

    gameLoopRef.current = setInterval(() => {
      // 1. Update Bird Physics
      setBirdY(y => {
          const nextY = y + velocity;
          // Floor/Ceiling Collision
          if (nextY > CONTAINER_HEIGHT - BIRD_SIZE || nextY < 0) {
              handleGameOver();
              return y;
          }
          return nextY;
      });

      setVelocity(v => v + GRAVITY);
      setRotation(Math.min(Math.max(velocity * 3, -25), 90));

      // 2. Update Obstacles
      setObstacles(prev => {
          let newObstacles = prev.map(obs => ({
              ...obs,
              x: obs.x - GAME_SPEED
          })).filter(obs => obs.x + OBSTACLE_WIDTH > -100);

          // Spawn new obstacle
          const lastObs = newObstacles[newObstacles.length - 1];
          if (!lastObs || (400 - lastObs.x > OBSTACLE_SPACING)) {
              const minHeight = 50;
              const maxHeight = CONTAINER_HEIGHT - OBSTACLE_GAP - minHeight;
              const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
              
              newObstacles.push({
                  id: Date.now(),
                  x: 400 + (Math.random() * 50), // Slight variation
                  heightTop: randomHeight
              });
          }

          return newObstacles;
      });

      // 3. Score & Collision Check
      setScore(s => {
          // We handle score increment in collision check or separate logic usually
          // For simplicity, let's just increment over time or based on passing
          return s; 
      });

    }, 20); // 50fps approx

    return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameStatus, velocity]); 

  // Separate Effect for Collision to access latest state without resetting interval
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    // Check collision with obstacles
    const birdLeft = 50; // Fixed x position of bird
    const birdRight = 50 + BIRD_SIZE;
    const birdTop = birdY + 4; // slight padding
    const birdBottom = birdY + BIRD_SIZE - 4;

    obstacles.forEach(obs => {
        const obsLeft = obs.x;
        const obsRight = obs.x + OBSTACLE_WIDTH;

        // Passed?
        if (obsRight < birdLeft && obsRight > birdLeft - GAME_SPEED - 1) {
             setScore(s => s + 1);
        }

        // Collision Logic
        if (
            birdRight > obsLeft && 
            birdLeft < obsRight
        ) {
            // Check vertical collision
            const topPipeBottom = obs.heightTop;
            const bottomPipeTop = obs.heightTop + OBSTACLE_GAP;

            if (birdTop < topPipeBottom || birdBottom > bottomPipeTop) {
                handleGameOver();
            }
        }
    });

  }, [birdY, obstacles, gameStatus]);

  const handleGameOver = () => {
      setGameStatus('gameover');
      setHighScore(prev => {
          const newHigh = Math.max(prev, score);
          localStorage.setItem('cift_flappy_highscore', newHigh.toString());
          return newHigh;
      });
  };

  // Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
          e.preventDefault();
          if (gameStatus === 'playing') jump();
          if (gameStatus !== 'playing') startGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, jump]);


  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-start justify-center overflow-hidden px-4 md:px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        {/* Background Gradients */}
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-gold-600/10 blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-purple-600/10 blur-[100px]"></div>

        {/* Main Row Container */}
        <div className="relative z-10 mx-auto max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 items-center">
            
            {/* Left Side: Image */}
            <div className="flex justify-center md:justify-end items-center animate-fade-in-up order-1 md:pr-10">
                <div className="relative w-[80%] md:w-full max-w-[500px] md:max-w-[700px]">
                    {/* Glow effect behind */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gold-500/20 blur-[80px] rounded-full -z-10"></div>
                    <img 
                        src="https://assets.zyrosite.com/mk3vgMQRxEcer7k1/toto_the-_ceo-Yle45r8kvWIVzwka.png" 
                        alt="CIFCI TOTO" 
                        className="w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>

            {/* Right Side: Text */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 animate-fade-in-up delay-100 order-2">
                
                <h1 className="font-serif text-5xl sm:text-7xl md:text-[100px] lg:text-[180px] leading-none font-black text-white tracking-tighter select-none">
                  <span className="bg-gradient-to-br from-gold-100 via-gold-400 to-gold-600 bg-clip-text text-transparent filter drop-shadow-lg">TOTO</span>
                </h1>

                <div className="flex flex-col gap-4 sm:flex-row w-full max-w-xs md:max-w-none md:w-auto">
                  <Button variant="gold" className="w-full sm:w-auto !px-8 !py-3 text-base" onClick={() => navigate('/blog')}>
                    The Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
            </div>

        </div>
      </section>
      
      {/* Quote Section */}
      <section className="relative z-20 -mt-12 mx-4 md:mx-6 mb-12">
        <div className="mx-auto max-w-4xl transform rounded-2xl border border-gold-500/30 bg-navy-800/80 p-6 md:p-8 text-center shadow-[0_0_30px_rgba(34,197,94,0.1)] backdrop-blur-md transition-transform hover:scale-[1.02]">
            <Quote className="mx-auto mb-4 h-6 w-6 md:h-8 md:w-8 text-gold-500 opacity-50" />
            <p className="font-serif text-xl md:text-2xl font-medium italic text-white lg:text-3xl">
                "{dailyQuote}"
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-gold-500/50"></div>
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gold-400">CEO TOTO Wisdom</span>
                <div className="h-px w-8 bg-gold-500/50"></div>
            </div>
        </div>
      </section>

      {/* NEW: Chart Rider Game Section */}
      <section className="py-8 md:py-12 px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="bg-navy-900 border border-gold-500/20 rounded-3xl overflow-hidden shadow-2xl relative">
             <div className="bg-navy-800/50 p-4 md:p-6 flex justify-between items-center border-b border-white/5 z-10 relative">
                <div>
                    <h3 className="font-serif text-lg md:text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <TrendingUp size={20} className="text-gold-500" />
                    Chart Rider
                    </h3>
                    <p className="text-gray-400 text-xs">Tap or Space to Pump. Avoid Resistance.</p>
                </div>
                <div className="flex gap-6 text-sm font-bold">
                    <div className="flex items-center gap-2 text-white bg-navy-900/50 px-3 py-1 rounded-lg border border-white/10">
                        <span className="text-gold-400 text-xs uppercase">Score</span>
                        <span className="text-xl font-mono">{score}</span>
                    </div>
                     <div className="flex items-center gap-2 text-gray-400">
                        <Trophy size={14} /> {highScore}
                    </div>
                </div>
             </div>
             
             <div 
                ref={containerRef}
                className="relative w-full bg-navy-900 overflow-hidden cursor-pointer select-none"
                style={{ height: CONTAINER_HEIGHT }}
                onMouseDown={(e) => { e.preventDefault(); if (gameStatus === 'playing') jump(); }}
                onTouchStart={(e) => { e.preventDefault(); if (gameStatus === 'playing') jump(); }}
             >
                {/* Background Grid Lines (Scrolling) */}
                <div 
                    className="absolute inset-0 opacity-10" 
                    style={{ 
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
                        backgroundSize: '40px 40px',
                        backgroundPositionX: `${-score * GAME_SPEED}px` // Simple parallax based on score/time
                    }}
                ></div>

                {/* Start Screen */}
                {gameStatus === 'idle' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-900/80 backdrop-blur-sm z-30 p-6 text-center animate-fade-in-up">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto text-gold-500 border border-gold-500/30 mb-4 md:mb-6 animate-pulse">
                       <Play className="ml-1 w-8 h-8 md:w-10 md:h-10" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Ride the Chart</h4>
                    <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                        Tap screen or press Space to jump. <br/> Don't hit the candles!
                    </p>
                    <Button variant="gold" onClick={(e) => { e.stopPropagation(); startGame(); }} className="px-8 shadow-lg shadow-gold-500/20">Play Now</Button>
                  </div>
                )}

                {/* Game Over Screen */}
                {gameStatus === 'gameover' && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-900/90 backdrop-blur-md z-30 p-6 text-center animate-fade-in-up">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500 border border-red-500/30 mb-6">
                       <Skull size={40} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-1">Liquidation!</h4>
                    <p className="text-gray-400 text-sm mb-4">You got rekt by the market.</p>
                    <div className="bg-navy-800 p-4 rounded-xl border border-white/10 min-w-[200px] mb-6">
                        <div className="text-gold-400 font-mono text-3xl font-bold">{score}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest">Final Score</div>
                    </div>
                    <Button variant="gold" onClick={(e) => { e.stopPropagation(); startGame(); }} className="gap-2">
                        <RotateCcw size={16} /> Try Again
                    </Button>
                  </div>
                )}

                {/* Player Bird */}
                <div 
                    className="absolute z-20"
                    style={{ 
                        left: 50, 
                        top: birdY,
                        width: BIRD_SIZE,
                        height: BIRD_SIZE,
                        transform: `rotate(${rotation}deg)`,
                        transition: 'transform 0.1s'
                    }}
                >
                    <div className="w-full h-full rounded-full bg-navy-800 border-2 border-gold-500 shadow-[0_0_15px_rgba(234,179,8,0.6)] overflow-hidden">
                        <img src="https://assets.zyrosite.com/mk3vgMQRxEcer7k1/toto_the-_ceo-Yle45r8kvWIVzwka.png" className="w-full h-full object-cover" alt="Player" />
                    </div>
                    {/* Engine Trail */}
                    <div className="absolute top-1/2 right-full w-4 h-2 bg-gold-500 blur-sm animate-pulse opacity-80 -translate-y-1/2"></div>
                </div>

                {/* Obstacles (Candles) */}
                {obstacles.map(obs => (
                    <React.Fragment key={obs.id}>
                        {/* Top Candle (Red/Resistance) */}
                        <div 
                            className="absolute top-0 bg-red-500/80 border-b-4 border-red-600 rounded-b-lg shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                            style={{ 
                                left: obs.x, 
                                width: OBSTACLE_WIDTH, 
                                height: obs.heightTop 
                            }}
                        >
                            {/* Wick */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-red-400 translate-y-full opacity-50"></div>
                        </div>

                        {/* Bottom Candle (Green/Support) */}
                        <div 
                            className="absolute bottom-0 bg-green-500/80 border-t-4 border-green-600 rounded-t-lg shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                            style={{ 
                                left: obs.x, 
                                width: OBSTACLE_WIDTH, 
                                height: CONTAINER_HEIGHT - obs.heightTop - OBSTACLE_GAP 
                            }}
                        >
                            {/* Wick */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-green-400 -translate-y-full opacity-50"></div>
                        </div>
                    </React.Fragment>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-12 md:py-16 px-4 md:px-6 overflow-hidden">
        {/* Background blobs for depth */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-gold-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl"></div>

        <div className="relative mx-auto max-w-6xl">
            {/* Header Title */}
            <div className="text-center mb-8 md:mb-12 space-y-4">
                <h2 className="font-serif text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                    A New Breed of <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">Builder</span>.
                </h2>
                <div className="h-1 w-24 bg-gold-500 mx-auto rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-6 md:space-y-8 text-base md:text-lg text-gray-300 leading-relaxed">
                    <p className="font-light text-lg md:text-xl">
                        <strong className="text-white font-bold">CEO TOTO</strong> isn't just another memecoin. It's an immersive <span className="text-gold-400 font-medium">storytelling experience</span> that chronicles the journey of a character who discovered Bitcoin on <span className="text-white font-mono text-base border-b border-gold-500/30">October 31, 2010</span>, and held through every peak, crash, and moment of doubt.
                    </p>
                    <p>
                        Through daily episodic content, community participation, and narrative-driven tokenomics, CEO TOTO transforms crypto speculation into an engaging story that educates, entertains, and rewards true believers.
                    </p>
                    <div className="p-4 md:p-6 bg-navy-800/50 border-l-4 border-gold-500 rounded-r-xl shadow-inner">
                        <p className="italic text-gray-200 font-medium text-lg md:text-xl font-serif">
                            "His mission is to establish a community-owned ecosystem. From patience to purpose."
                        </p>
                    </div>
                </div>

                {/* Features / Pillars */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="group p-4 md:p-6 bg-navy-800 border border-white/5 rounded-2xl hover:border-gold-500/30 transition-all hover:-translate-y-1 shadow-lg cursor-default">
                        <div className="flex items-center gap-5">
                            <div className="h-12 w-12 shrink-0 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                                <Users size={24} />
                            </div>
                            <div>
                                <h3 className="font-serif text-lg md:text-xl font-bold text-white mb-1">Proof of Participation</h3>
                                <p className="text-xs text-gray-400 uppercase tracking-widest">(PoP)</p>
                            </div>
                        </div>
                    </div>

                    <div className="group p-4 md:p-6 bg-navy-800 border border-white/5 rounded-2xl hover:border-gold-500/30 transition-all hover:-translate-y-1 shadow-lg cursor-default">
                        <div className="flex items-center gap-5">
                             <div className="h-12 w-12 shrink-0 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                                <ShieldCheck size={24} />
                            </div>
                             <div>
                                <h3 className="font-serif text-lg md:text-xl font-bold text-white mb-1">Believe-to-Build</h3>
                                <p className="text-xs text-gray-400 uppercase tracking-widest">Economy</p>
                            </div>
                        </div>
                    </div>
                     
                     <div className="mt-8 text-center">
                         <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-bold opacity-60">The Tycoon Standard</p>
                     </div>
                </div>
            </div>
        </div>
      </section>

      {/* Infrastructure Slider Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-navy-900/50 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
           <div className="mb-8 md:mb-12 text-center">
             <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
               <span className="text-gold-400">Future</span> Ecosystem
             </h2>
             <p className="mt-4 text-gray-400">Visualizing the roadmap to reality.</p>
           </div>

           <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-800 shadow-2xl">
              {/* Slides Container */}
              <div 
                className="flex transition-transform duration-700 ease-in-out h-[300px] md:h-[600px]"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {SLIDER_DATA.map((slide, index) => (
                  <div key={index} className="relative w-full shrink-0">
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                      <h3 className="mb-2 font-serif text-2xl md:text-3xl font-bold text-white">{slide.title}</h3>
                      <p className="max-w-xl text-sm md:text-lg text-gray-300">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 md:p-3 text-white backdrop-blur-sm transition-colors hover:bg-gold-500 hover:text-navy-900"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 md:p-3 text-white backdrop-blur-sm transition-colors hover:bg-gold-500 hover:text-navy-900"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-2">
                {SLIDER_DATA.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 md:h-2 rounded-full transition-all ${
                      currentSlide === index ? 'w-6 md:w-8 bg-gold-500' : 'w-1.5 md:w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
           </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;