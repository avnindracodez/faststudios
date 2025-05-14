
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Code, Award, Users, Calendar, Zap } from 'lucide-react';

const StudioPage = () => {
  const teamMembers = [
    {
      name: 'Poppelloppeskram',
      role: 'Founder & Director',
      image: 'https://cdn.discordapp.com/attachments/1341086940505837601/1372344684243849237/image.png?ex=68266f15&is=68251d95&hm=dcc988aeca835f2b13cc905c8b6e29168e63db8dbb0a5fb9a8c93720b28d02b1&',
      bio: 'Visionary game designer with 4+ years in the UGC industry.'
    },
    {
      name: 'AviDaddyXD',
      role: 'Project Manager',
      image: 'https://images-ext-1.discordapp.net/external/FpOdmgwcN6hOcgpkPVY3hKZ5ShpDyw6iOZZCq0pIjDQ/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/1190333350192361657/c2cc10de5b36ff74206413c318eeec9a.png?format=webp&quality=lossless&width=320&height=320',
      bio: 'The best project manager to exist on Earth!'
    },
    {
      name: 'Reverselight',
      role: 'Investor & Founder',
      image: 'https://images-ext-1.discordapp.net/external/E52AyDiGFUsSHergFf13ZUe5-GFLFQH8j5mnx-K1dhw/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/332084272796008450/c0d73b4f57de1df54c238f4190547f2a.png?format=webp&quality=lossless&width=940&height=940',
      bio: 'The name & role says it all.'
    },
    {
      name: 'Sensei',
      role: 'Lead Scripter',
      image: 'https://images-ext-1.discordapp.net/external/dU8WqD6HHj6o_Q6EPcKPIZP-cOdqlaK3FlXR9LGnHAw/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/778685211147239485/f85389f8fd49f655ca101b055e080b1e.png?format=webp&quality=lossless&width=134&height=134',
      bio: 'Programming expert specialized in Roblox & Lua development.'
    },
    {
      name: 'Abotachi',
      role: 'Lead Scripter',
      image: 'https://cdn.discordapp.com/avatars/747935370351738900/eda8d48ffd9f19853448fb75c6bab100.png?size=4096',
      bio: 'Specializes in creating complex game systems and mechanics.'
    },
    {
      name: 'Floopy from temuuuu',
      role: 'Community Manager',
      image: 'https://cdn.discordapp.com/avatars/1260303715189919794/b17f103b4ff24c20ab4dd9a253d8521b.png?size=4096',
      bio: 'The bridge between our players and development team.'
    }
  ];

  const timelineEvents = [
    {
      year: 'January 2025',
      title: 'Vorld Founded',
      description: 'Poppelloppeskram establishes Vorld with a vision to push Roblox development to new heights.'
    },
    {
      year: 'January 2025',
      title: 'Team Expansion',
      description: 'Grew from 3 to 10 team members.'
    },
    {
      year: 'April 2025',
      title: 'Roblox Partnership',
      description: 'Selected as an official partner with discord.gg/bloxzy'
    },
    {
      year: 'June 2025',
      title: 'Cricket Reborn Release',
      description: 'A cricket based roblox game released by Vorld'
    },
    {
      year: 'June 2025',
      title: 'Project 456 Release',
      description: 'The most realistic roblox game based on squid game was launched by Vorld'
    },
    {
      year: 'August 2025',
      title: 'Global Expansion',
      description: 'Expanded to 25+ team members worldwide.'
    }
  ];

  const studioValues = [
    {
      icon: <Code className="h-6 w-6 text-vorld-blue" />,
      title: 'Technical Excellence',
      description: 'We push the limits of the platform with efficient code and innovative solutions.'
    },
    {
      icon: <Zap className="h-6 w-6 text-vorld-purple" />,
      title: 'Creative Innovation',
      description: 'We approach each project with fresh ideas and imaginative design thinking.'
    },
    {
      icon: <Users className="h-6 w-6 text-vorld-pink" />,
      title: 'Community-Led Design',
      description: 'We actively involve our player community in shaping our games and experiences.'
    },
    {
      icon: <Award className="h-6 w-6 text-vorld-blue" />,
      title: 'Quality Craftsmanship',
      description: 'We obsess over details and strive for polished, premium experiences.'
    }
  ];

  return (
    <div className="min-h-screen bg-vorld-dark text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-vorld-blue/5 via-transparent to-transparent z-0"></div>
        
        <div className="vorld-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About the <span className="gradient-text">Studio</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Vorld is a visionary game development studio focused on pushing the boundaries
              of what's possible within the Roblox platform.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
        <div className="absolute top-40 left-10 w-96 h-96 bg-vorld-blue/5 rounded-full blur-3xl"></div>
        
        <div className="vorld-container relative z-10">
          <h2 className="text-3xl font-bold text-center mb-16">Our <span className="gradient-text">Journey</span></h2>
          
          <div className="relative flex flex-col items-center">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-vorld-blue via-vorld-purple to-vorld-blue transform -translate-x-1/2"></div>
            
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex w-full ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} mb-16`}
              >
                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${index % 2 === 0 ? 'md:left-auto md:right-[calc(50%-1.5rem)]' : 'md:left-[calc(50%-1.5rem)]'}`}>
                  <div className="w-8 h-8 rounded-full bg-vorld-darker border-4 border-vorld-blue flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-vorld-blue animate-pulse"></div>
                  </div>
                </div>
                
                <div className={`relative glass-card p-6 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                  <div className="absolute top-4 right-4 text-3xl font-bold text-vorld-blue/30">{event.year}</div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Members Section */}
      <section className="py-24 relative bg-vorld-darker/30">
        <div className="vorld-container">
          <h2 className="text-3xl font-bold text-center mb-16">Meet the <span className="gradient-text">Team</span></h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card group overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-vorld-darker to-transparent z-10"></div>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full aspect-square object-cover filter group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Glitch effect overlay */}
                  <div className="absolute inset-0 bg-vorld-blue/30 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
                </div>
                
                <div className="p-6 relative">
                  {/* Animated glow border on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-vorld-blue to-transparent"></div>
                    <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-vorld-purple to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-vorld-pink to-transparent"></div>
                    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-vorld-blue to-transparent"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-vorld-blue text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Studio Values Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-vorld-purple/5 rounded-full blur-3xl"></div>
        
        <div className="vorld-container relative z-10">
          <h2 className="text-3xl font-bold text-center mb-16">Our <span className="gradient-text">Values</span></h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {studioValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 flex items-start gap-4"
              >
                <div className="p-3 rounded-md bg-vorld-darker/50">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Behind the Scenes Section */}
      <section className="py-24 relative bg-vorld-darker/30">
        <div className="vorld-container">
          <h2 className="text-3xl font-bold text-center mb-16">Behind the <span className="gradient-text">Scenes</span></h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-video glass-card overflow-hidden">
              {/* Video embed placeholder */}
              <div className="w-full h-full bg-vorld-darker flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-vorld-blue/20 flex items-center justify-center mx-auto mb-4">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-vorld-blue border-b-8 border-b-transparent ml-1"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Studio Tour Video</p>
                </div>
              </div>
            </div>
            
            <div className="aspect-video glass-card overflow-hidden">
              {/* Video embed placeholder */}
              <div className="w-full h-full bg-vorld-darker flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-vorld-purple/20 flex items-center justify-center mx-auto mb-4">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-vorld-purple border-b-8 border-b-transparent ml-1"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Development Process Video</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-lg mb-6">Want to see more of our creative process?</p>
            <button className="btn-primary text-lg">Visit Our YouTube Channel</button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default StudioPage;
