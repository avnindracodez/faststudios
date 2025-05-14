
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Games', href: '/games' },
    { name: 'Studio', href: '/studio' },
    { name: 'Community', href: '/community' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-vorld-darker/80 backdrop-blur-md' : 'py-5 bg-transparent'}`}>
      <div className="vorld-container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-8">
            <div className="w-10 h-10 relative overflow-visible">
              <img 
                src="https://cdn.discordapp.com/attachments/1343620493361549362/1372337784244666449/388610c48016fa2d048ace5ebe326c12-removebg-preview.png?ex=682668a8&is=68251728&hm=a57b649db0f815011db70a81372f4f1defc8967f8c35e12d17b10927cfe100c4&" 
                alt="Vorld Logo" 
                className="w-full h-full object-contain glow-image"
              />
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium hover:text-vorld-blue transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="hidden md:block">
          <Button className="btn-primary">Join the Future</Button>
        </div>
        
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground hover:text-vorld-blue"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-vorld-darker/95 backdrop-blur-md z-40 md:hidden flex flex-col pt-24 px-6 animate-fade-in">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-medium hover:text-vorld-blue transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
            <Button className="btn-primary mt-6 w-full" onClick={() => setIsOpen(false)}>
              Join the Future
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
