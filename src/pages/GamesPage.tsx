import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Search, Filter, Clock } from 'lucide-react';

// Updated game data: now each game can specify gallery images, development insights, and unique stats
const games = [
  {
    id: 1,
    title: 'Fish',
    image: './Fish.png',
    images: [
      './Fish.png',
      './logo.png',
      './logo.png'
    ],
    genre: 'Adventure',
    description: 'Dive into mysterious oceans and experience aquatic secrets. Explore, fish, and build your undersea empire surrounded by a vibrant world.',
    insights: [
      'Dynamic weather and seasonal fishing events keep gameplay fresh.',
      'Entire world simulated with advanced AI-driven fish populations.'
    ],
    stats: [
      { label: 'Total Plays', value: '0M+' },
      { label: 'Positive Rating', value: '0%' },
      { label: 'Avg. Play Time', value: '0+ min' },
      { label: 'Daily Players', value: '0+' }
    ],
    playerCount: '0M+',
    date: '2025-02-1',
    releaseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  },
  {
    id: 2,
    title: 'Royal High',
    image: './logo.png',
    images: [
      './logo.png',
      './logo.png',
      './logo.png'
    ],
    genre: 'Adventure',
    description: 'A magical roleplaying game where elegance meets fantasy. Attend classes, dress in dazzling outfits, and explore a dreamy realm filled with secrets, fashion, and royal drama.',
    insights: [
      'Customizable wardrobes and frequent seasonal events.',
      'Highly social environment with community-driven content.'
    ],
    stats: [
      { label: 'Total Plays', value: '10.5M+' },
      { label: 'Positive Rating', value: '91%' },
      { label: 'Avg. Play Time', value: '44 min' },
      { label: 'Daily Players', value: '280K' }
    ],
    playerCount: '10.5M+',
    date: '2025-01-26',
    releaseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 3600000)
  },
  {
    id: 3,
    title: 'Pokemon Tower Defense',
    image: './PTD1.png',
    images: [
      './PTD2.png',
      './PTD3.png',
      './PTD1.png'
    ],
    genre: 'Action',
    description: 'Build your dream team and defend against waves of enemies using your Pokémon! Catch, trade, and evolve Pokémon across various maps while ranking up to become the ultimate Pokémon Master.',
    insights: [
      'Hundreds of Pokémon with unique moves and game mechanics.',
      'Tight-knit community and competitive leaderboard system.'
    ],
    stats: [
      { label: 'Total Plays', value: '0M+' },
      { label: 'Positive Rating', value: '0%' },
      { label: 'Avg. Play Time', value: '0+ min' },
      { label: 'Daily Players', value: '0+' }
    ],
    playerCount: '0M+',
    date: '2025-02-10',
    releaseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 7200000)
  }
];

// Game filter options
const filterOptions = ['All', 'Action', 'Adventure', 'RPG'];
const sortOptions = ['Newest', 'Popularity', 'Alphabetical'];

const CountdownTimer = ({ releaseDate, onComplete }: { releaseDate: Date, onComplete: () => void }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = releaseDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsCompleted(true);
        onComplete();
        return;
      }
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [releaseDate, onComplete]);
  
  if (isCompleted) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center z-30 backdrop-blur-md bg-vorld-darker/70">
      <div className="glass-card p-6 text-center max-w-md">
        <div className="flex items-center justify-center mb-4">
          <Clock className="h-8 w-8 text-vorld-blue animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold mb-4 gradient-text">Revealing Soon</h3>
        <p className="text-muted-foreground mb-6">This game will be revealed in:</p>
        
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Mins' },
            { value: timeLeft.seconds, label: 'Secs' }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                repeatType: "reverse", 
                delay: index * 0.2 
              }}
            >
              <div className="glass-card w-16 h-16 flex items-center justify-center mb-2 text-2xl font-bold text-vorld-blue">
                {item.value}
              </div>
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </motion.div>
          ))}
        </div>
        
        <div className="h-2 w-full bg-vorld-darker rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-vorld-blue via-vorld-purple to-vorld-pink"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: releaseDate.getTime() - new Date().getTime(), 
              ease: "linear" 
            }}
          />
        </div>
      </div>
    </div>
  );
};

const GameCard = ({ game, index }: { game: any, index: number }) => {
  const [showModal, setShowModal] = useState(false);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: index * 0.3 }
    });
  }, [controls, index]);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        className="relative"
      >
        <motion.div
          className="relative h-[500px] w-full overflow-hidden rounded-2xl glass-card cursor-pointer shadow-lg group"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={() => isRevealed && setShowModal(true)}
          whileHover={{ scale: isRevealed ? 1.03 : 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 1.2
          }}
        >
          {/* Background Image with parallax effect */}
          <motion.div 
            className="absolute inset-0 w-full h-full bg-black/[.86] transition-all"
            style={{
              backgroundImage: `url(${game.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: !isRevealed ? 'blur(10px) grayscale(1)' : undefined
            }}
            animate={{
              scale: isHovered && isRevealed ? 1.18 : 1,
              filter: isRevealed
                ? (isHovered ? 'brightness(0.7) saturate(1.3)' : 'brightness(0.5) saturate(1)')
                : 'blur(10px) grayscale(1)'
            }}
            transition={{ duration: 0.48 }}
          />

          {/* Glass/gradient overlay for readable text */}
          <div className="absolute inset-0 bg-gradient-to-t from-vorld-darker via-transparent to-transparent" />

          {!isRevealed && (
            <CountdownTimer 
              releaseDate={game.releaseDate} 
              onComplete={() => setIsRevealed(true)} 
            />
          )}
          
          {isRevealed && (
            <>
              <motion.div
                className="absolute top-5 right-5 bg-vorld-blue/80 text-vorld-dark px-4 py-2 text-xs font-bold rounded-full shadow-md"
                animate={{
                  y: isHovered ? -5 : 0,
                  opacity: isHovered ? 1 : 0.88
                }}
                transition={{ duration: 0.3 }}
              >
                {game.genre}
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start justify-end bg-gradient-to-t from-[rgba(17,20,30,0.88)] via-transparent to-transparent rounded-b-2xl">
                <motion.h3
                  className="text-3xl font-bold mb-2 gradient-text"
                  animate={{
                    y: isHovered ? -4 : 0,
                    scale: isHovered ? 1.06 : 1
                  }}
                  transition={{ duration: 0.35 }}
                >
                  {game.title}
                </motion.h3>
                <motion.p
                  className="text-lg text-gray-300 mb-5 line-clamp-2"
                  animate={{
                    opacity: isHovered ? 1 : 0.7,
                    y: isHovered ? -6 : 0
                  }}
                  transition={{ duration: 0.32, delay: 0.09 }}
                >
                  {game.description}
                </motion.p>
                <div className="flex items-center gap-3 w-full">
                  <span className="text-vorld-blue font-semibold text-base">{game.playerCount} players</span>
                  <motion.button
                    className="btn-primary px-5 py-2 ml-auto"
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Play Now
                  </motion.button>
                </div>
              </div>
            </>
          )}
          
          {/* Animated glow effects */}
          <motion.div 
            className="absolute -inset-2 rounded-xl pointer-events-none"
            animate={{
              opacity: isHovered && isRevealed ? 0.55 : 0,
              boxShadow: isHovered && isRevealed ?
                `0 0 60px 12px ${index === 0 ? 'rgba(12,255,225,0.20)' :
                                             index === 1 ? 'rgba(138,43,226,0.22)' :
                                                           'rgba(255,0,255,0.22)'}` :
                'none'
            }}
            transition={{ duration: 0.52 }}
          />
          
          {/* Particle effects */}
          {isHovered && isRevealed && (
            <>
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white/70"
                  initial={{
                    x: Math.random() * 100 - 50 + '%',
                    y: Math.random() * 100 - 50 + '%',
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{
                    x: [
                      Math.random() * 100 - 50 + '%',
                      Math.random() * 100 - 50 + '%'
                    ],
                    y: [
                      Math.random() * 100 - 50 + '%',
                      Math.random() * 100 - 50 + '%'
                    ],
                    opacity: [0, 0.80, 0],
                    scale: [0, Math.random() * 2.3 + 0.45, 0]
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1.3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      </motion.div>
      
      {/* Game Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              className="absolute inset-0 bg-black/90 backdrop-blur-lg" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ type: "spring", damping: 23, stiffness: 294 }}
              className="relative bg-vorld-darker/95 glass-card p-7 rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal close */}
              <button
                className="absolute top-4 right-4 text-white/70 hover:text-white duration-150"
                onClick={() => setShowModal(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Modal content layout */}
              <div className="grid md:grid-cols-2 gap-7">
                {/* Left: Gallery */}
                <div>
                  <div className="aspect-video bg-vorld-dark rounded-xl overflow-hidden mb-4 relative group border border-vorld-blue/30">
                    {/* Main gallery image */}
                    <img
                      src={game.images?.[galleryIndex] || game.image}
                      alt={game.title}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                    {/* Gallery controls */}
                    <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 z-10">
                      {game.images?.map((img: string, idx: number) => (
                        <button
                          key={idx}
                          className={`w-4 h-4 rounded-full border border-white/60 transition-all duration-200 ${galleryIndex === idx ? "bg-vorld-blue shadow-md" : "bg-white/30 hover:bg-vorld-blue/40"}`}
                          aria-label={`Show screenshot ${idx + 1}`}
                          onClick={() => setGalleryIndex(idx)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {game.images?.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className={`aspect-video bg-vorld-darker rounded-lg overflow-hidden border border-vorld-blue/10 cursor-pointer transition-all duration-200 ${galleryIndex === idx ? "ring-2 ring-vorld-blue" : ""}`}
                        onClick={() => setGalleryIndex(idx)}
                      >
                        <img src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Right: Game Details */}
                <div>
                  <motion.h2
                    className="text-3xl font-bold mb-3 gradient-text"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.19 }}
                  >
                    {game.title}
                  </motion.h2>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-vorld-blue/20 text-vorld-blue px-4 py-1 text-sm font-medium rounded-full">{game.genre}</span>
                    <span className="bg-vorld-purple/20 text-vorld-purple px-4 py-1 text-sm font-medium rounded-full">{game.playerCount} players</span>
                    <span className="bg-vorld-pink/20 text-vorld-pink px-4 py-1 text-sm font-medium rounded-full">{new Date(game.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">{game.description}</p>
                  <h3 className="text-xl font-bold mb-2">Development Insights</h3>
                  <ul className="mb-6 space-y-2">
                    {game.insights?.map((insight: string, i: number) => (
                      <li key={i} className="text-muted-foreground flex gap-2 items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-vorld-blue mt-2"></span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-xl font-bold mb-2">Player Stats</h3>
                  <div className="grid grid-cols-2 gap-4 mb-7">
                    {game.stats?.map((stat: any, i: number) => (
                      <div key={i} className="glass-card p-4 text-center flex flex-col items-center">
                        <span className="text-vorld-blue text-2xl font-bold">{stat.value}</span>
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    className="btn-primary w-full py-3 text-lg"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Play Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const GamesPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSort, setActiveSort] = useState('Newest');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort games
  let filteredGames = [...games];
  
  // Apply category filter
  if (activeFilter !== 'All') {
    filteredGames = filteredGames.filter(game => game.genre === activeFilter);
  }
  
  // Apply search filter
  if (searchTerm) {
    filteredGames = filteredGames.filter(game => 
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      game.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Apply sorting
  switch(activeSort) {
    case 'Newest':
      filteredGames.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      break;
    case 'Popularity':
      filteredGames.sort((a, b) => parseInt(b.playerCount) - parseInt(a.playerCount));
      break;
    case 'Alphabetical':
      filteredGames.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }

  return (
    <div className="min-h-screen bg-vorld-dark text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-vorld-purple/5 via-transparent to-transparent z-0"></div>
        
        <div className="vorld-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="gradient-text">Explore</span> Our Games
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Dive into cutting-edge Roblox experiences built with creativity, innovation, and technical excellence.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-6 sticky top-0 z-30 bg-vorld-darker/80 backdrop-blur-md border-y border-vorld-blue/10">
        <div className="vorld-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-60">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search games..."
                className="w-full bg-vorld-dark/50 border border-vorld-blue/20 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-vorld-blue/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto py-2 w-full md:w-auto">
              <Filter className="text-muted-foreground h-4 w-4 flex-shrink-0" />
              {filterOptions.map(option => (
                <button
                  key={option}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    activeFilter === option
                      ? 'bg-vorld-blue text-vorld-dark'
                      : 'bg-vorld-darker border border-vorld-blue/20 hover:bg-vorld-blue/10'
                  }`}
                  onClick={() => setActiveFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-muted-foreground">Sort by:</span>
              <select
                className="bg-vorld-dark/50 border border-vorld-blue/20 rounded-md py-1 px-2 text-xs focus:outline-none focus:ring-2 focus:ring-vorld-blue/30"
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Games Grid */}
      <section className="py-16">
        <div className="vorld-container">
          {filteredGames.length > 0 ? (
            <div className="grid gap-12">
              {filteredGames.map((game, index) => (
                <GameCard key={game.id} game={game} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No games found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default GamesPage;