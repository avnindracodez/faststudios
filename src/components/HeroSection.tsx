
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const floatingElementRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!floatingElementRef.current) return;
      
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) / 50;
      const moveY = (clientY - centerY) / 50;
      
      floatingElementRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Parallax scrolling effect
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollTop = window.scrollY;
      const parallaxElements = sectionRef.current.querySelectorAll('.parallax');
      
      parallaxElements.forEach((el, i) => {
        const speed = 0.1 * (i + 1);
        const offset = -scrollTop * speed;
        (el as HTMLElement).style.transform = `translateY(${offset}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden"
    >
      {/* 3D Background Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 grid-bg opacity-20 animate-pulse-slow" 
             style={{ backgroundSize: '30px 30px', animationDelay: '0.5s' }}></div>
        
        {/* Animated glow spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-vorld-blue/5 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-vorld-purple/5 blur-3xl animate-pulse-slow" 
             style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-vorld-pink/5 blur-3xl animate-pulse-slow" 
             style={{ animationDelay: '2.5s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full bg-vorld-blue/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="vorld-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 parallax">
              Fast Studios –<br/><span className="gradient-text">Where the Future</span><br/>of Roblox is Built
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 parallax" style={{ '--parallax-speed': '0.2' } as React.CSSProperties}>
              Pushing the boundaries of what's possible in the Roblox ecosystem with cutting-edge development and visionary design.
            </p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 parallax"
            >
  <a href="https://discord.gg/9skc77bSSh" target="_blank" rel="noopener noreferrer">
  <Button className="btn-primary flex items-center gap-2 text-lg">
    Discord <ArrowRight size={16} />
  </Button>
</a>

  <a href="/games">
    <Button variant="outline" className="btn-secondary text-lg">
      View Games
    </Button>
  </a>
            </motion.div>
          </motion.div>
          
          <div className="lg:w-1/2 relative">
            <div 
              ref={floatingElementRef}
              className="relative w-full aspect-square max-w-md mx-auto animate-float"
            >
              {/* Main hero image */}
              <div className="absolute inset-0 bg-gradient-to-br from-vorld-blue via-vorld-purple to-vorld-pink rounded-2xl opacity-20 blur-xl"></div>
              <div className="absolute inset-0 glass-card rounded-2xl glow-border backdrop-blur-xl p-6 flex items-center justify-center">
                <img 
                  src="https://media.discordapp.net/attachments/1363496516643324137/1372602598196121640/jjVXCAf.png?ex=68275f49&is=68260dc9&hm=229bc78d0b228946fc4ae0001ec2f63c4ea05b09650a4f04119013cc1ffd85cb&=&format=webp&quality=lossless&width=810&height=810" 
                  alt="Fast Stuios" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            
            {/* Floating elements around the main image */}
            <div className="absolute top-1/4 -left-6 w-12 h-12 glass-card rounded-lg animate-float" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-1/2 -right-4 w-16 h-16 glass-card rounded-lg animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/3 -left-8 w-20 h-20 glass-card rounded-lg animate-float" style={{animationDelay: '1.5s'}}></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-vorld-blue/50 flex items-center justify-center">
          <div className="w-1 h-2 bg-vorld-blue rounded-full animate-pulse-slow"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
