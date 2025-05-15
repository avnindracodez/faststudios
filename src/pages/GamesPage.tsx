
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Search, Filter, Clock } from 'lucide-react';

// Updated game data with release dates 14 days in the future
const games = [
  {
    id: 1,
    title: 'Fish',
    image: 'https://cdn.discordapp.com/attachments/1363496516643324137/1372603358921232385/2aMqNMB.png?ex=68275ffe&is=68260e7e&hm=5a6a5c8154350fd56b1a27cb016c5bd9435537b6f48fc72284d64c6893d062f5&',
    genre: 'Adventure',
    description: 'Embark on an epic journey to protect the crystal realm from dark forces. Discover magical artifacts, battle mythical creatures, and unveil the secrets of an ancient civilization in this breathtaking adventure.',
    playerCount: '2.3M+',
    date: '2023-05-15',
    releaseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
  },
  {
    id: 2,
    title: 'Royal High',
    image: 'https://cdn.discordapp.com/attachments/1363496516643324137/1372639025143349308/qiA7vup.png?ex=68278135&is=68262fb5&hm=0b4584e8d05438e52c1a5cdbe116f5331a7536281e7d13bf29bb6e0dd871d8b9&',
    genre: 'Adevnture',
    description: 'A magical roleplaying game where elegance meets fantasy. Attend classes, dress in dazzling outfits, and explore a dreamy realm filled with secrets, fashion, and royal drama.',
    playerCount: '0M+',
    date: '2025-01-26',
    releaseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 3600000) // 14 days and 1 hour from now
  },
  {
    id: 3,
    title: 'Pokemon Tower Defense',
    image: 'https://cdn.discordapp.com/attachments/1363496516643324137/1372603049759080598/tHr7moi.png?ex=68275fb4&is=68260e34&hm=eaadcff909d4535673a7d2d160fc468e6493a11768f75a496507ed9797ee362b&',
    genre: 'RPG',
    description: 'Build your dream team and defend against waves of enemies using your Pokémon! Catch, trade, and evolve Pokémon across various maps while ranking up to become the ultimate Pokémon Master.',
    playerCount: '0M+',
    date: '2025-02-10',
    releaseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 7200000) // 14 days and 2 hours from now
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
  
  // Staggered entry animation
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
          className="relative h-[500px] w-full overflow-hidden rounded-2xl glass-card cursor-pointer"
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
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${game.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: !isRevealed ? 'blur(10px) grayscale(1)' : undefined
            }}
            animate={{
              scale: isHovered && isRevealed ? 1.15 : 1,
              filter: isRevealed 
                ? (isHovered ? 'brightness(0.7) saturate(1.3)' : 'brightness(0.5) saturate(1)')
                : 'blur(10px) grayscale(1)'
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-vorld-darker via-transparent to-transparent" />
          
          {!isRevealed && (
            <CountdownTimer 
              releaseDate={game.releaseDate} 
              onComplete={() => setIsRevealed(true)} 
            />
          )}
          
          {isRevealed && (
            <>
              {/* Floating elements */}
              <motion.div 
                className="absolute top-5 right-5 bg-vorld-blue/80 text-vorld-dark px-4 py-2 text-sm font-bold rounded-full"
                animate={{ 
                  y: isHovered ? -5 : 0,
                  opacity: isHovered ? 1 : 0.8
                }}
                transition={{ duration: 0.3 }}
              >
                {game.genre}
              </motion.div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.h3 
                  className="text-3xl font-bold mb-3"
                  animate={{ 
                    y: isHovered ? -10 : 0,
                    scale: isHovered ? 1.05 : 1
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {game.title}
                </motion.h3>
                
                <motion.p 
                  className="text-lg text-gray-300 mb-6 line-clamp-2"
                  animate={{ 
                    opacity: isHovered ? 1 : 0.7,
                    y: isHovered ? -5 : 0
                  }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {game.description}
                </motion.p>
                
                <motion.div 
                  className="flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0.7,
                    y: isHovered ? -5 : 5
                  }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <span className="text-vorld-blue font-medium">{game.playerCount} players</span>
                  <motion.button 
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Play Now
                  </motion.button>
                </motion.div>
              </div>
            </>
          )}
          
          {/* Animated glow effects */}
          <motion.div 
            className="absolute -inset-2 rounded-xl opacity-0"
            animate={{ 
              opacity: isHovered && isRevealed ? 0.5 : 0,
              boxShadow: isHovered && isRevealed ? 
                `0 0 40px 10px ${index === 0 ? 'rgba(12,255,225,0.3)' : 
                                  index === 1 ? 'rgba(138,43,226,0.3)' : 
                                  'rgba(255,0,255,0.3)'}` : 
                'none'
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Particle effects when hovered */}
          {isHovered && isRevealed && (
            <>
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white"
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
                    opacity: [0, 0.8, 0],
                    scale: [0, Math.random() * 2 + 0.5, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 2 + 1,
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-vorld-darker glass-card p-6 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              <button 
                className="absolute top-4 right-4 text-white/60 hover:text-white"
                onClick={() => setShowModal(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="aspect-video bg-vorld-darker rounded-xl overflow-hidden mb-6 relative group">
                    <motion.img 
                      src={game.image} 
                      alt={game.title} 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vorld-darker to-transparent opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.div 
                        className="w-16 h-16 rounded-full bg-vorld-blue/20 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1"></div>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3].map((i) => (
                      <motion.div 
                        key={i} 
                        className="aspect-video bg-vorld-darker rounded-lg overflow-hidden" 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img src={game.image} alt={`Screenshot ${i}`} className="w-full h-full object-cover" />
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <motion.h2 
                    className="text-3xl font-bold mb-4 gradient-text"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {game.title}
                  </motion.h2>
                  
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="bg-vorld-blue/20 text-vorld-blue px-4 py-1 text-sm font-medium rounded-full">
                      {game.genre}
                    </span>
                    <span className="bg-vorld-purple/20 text-vorld-purple px-4 py-1 text-sm font-medium rounded-full">
                      {game.playerCount} players
                    </span>
                    <span className="bg-vorld-pink/20 text-vorld-pink px-4 py-1 text-sm font-medium rounded-full">
                      {new Date(game.date).toLocaleDateString()}
                    </span>
                  </motion.div>
                  
                  <motion.p 
                    className="text-lg text-muted-foreground mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {game.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Development Insights</h3>
                    <p className="text-muted-foreground mb-6">
                      Every game we build is crafted with care, creativity, and countless hours of iteration to deliver an experience that feels truly unique.
                    </p>
                    
                    <h3 className="text-xl font-bold mb-4">Player Achievements</h3>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="glass-card p-4 text-center">
                        <div className="text-vorld-blue text-2xl font-bold">0M+</div>
                        <div className="text-sm text-muted-foreground">Total Plays</div>
                      </div>
                      <div className="glass-card p-4 text-center">
                        <div className="text-vorld-purple text-2xl font-bold">0%</div>
                        <div className="text-sm text-muted-foreground">Positive Rating</div>
                      </div>
                      <div className="glass-card p-4 text-center">
                        <div className="text-vorld-pink text-2xl font-bold">0+ min</div>
                        <div className="text-sm text-muted-foreground">Avg. Play Time</div>
                      </div>
                      <div className="glass-card p-4 text-center">
                        <div className="text-vorld-blue text-2xl font-bold">0+</div>
                        <div className="text-sm text-muted-foreground">Daily Players</div>
                      </div>
                    </div>
                    
                    <motion.button 
                      className="btn-primary w-full py-3 text-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Play Now
                    </motion.button>
                  </motion.div>
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
