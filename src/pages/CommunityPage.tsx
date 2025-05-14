import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { MessageSquare, Github, Twitter, Instagram, Youtube, Zap } from 'lucide-react';

const DISCORD_INVITE = "ryHr3EEUjs";
const DISCORD_GUILD_API = `https://discord.com/api/v10/invites/${DISCORD_INVITE}?with_counts=true&with_expiration=true`;

const CommunityPage = () => {
  // Sample announcements data
  const announcements = [
    {
      id: 1,
      title: 'Title',
      content: 'Description',
      date: 'Date',
      type: 'update'
    },
    {
      id: 2,
      title: 'Title',
      content: 'Description',
      date: 'Date',
      type: 'community'
    },
    {
      id: 3,
      title: 'Title',
      content: 'Description',
      date: 'Date',
      type: 'update'
    },
    {
      id: 4,
      title: 'Title',
      content: 'Description',
      date: 'Date',
      type: 'event'
    },
  ];

  const socialLinks = [
    {
      name: 'Discord',
      icon: <MessageSquare className="h-6 w-6" />,
      url: 'https://discord.gg/ryHr3EEUjs',
      color: '#5865F2'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="h-6 w-6" />,
      url: '#',
      color: '#1DA1F2'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="h-6 w-6" />,
      url: '#',
      color: '#E1306C'
    },
    {
      name: 'YouTube',
      icon: <Youtube className="h-6 w-6" />,
      url: '#',
      color: '#FF0000'
    },
    {
      name: 'GitHub',
      icon: <Github className="h-6 w-6" />,
      url: '#',
      color: '#333333'
    }
  ];

  // --- BEGIN LIVE DISCORD DATA LOGIC ---
  const [discordStats, setDiscordStats] = useState<{
    onlineCount: number | null;
    totalCount: number | null;
    channels: { id: string, name: string, type: number }[] | null;
    guildName: string | null;
    isLoading: boolean;
    error: string | null;
  }>({
    onlineCount: null, totalCount: null, channels: null, guildName: null, isLoading: true, error: null
  });

  useEffect(() => {
    async function fetchDiscordData() {
      setDiscordStats(prev => ({ ...prev, isLoading: true }));
      try {
        // Get invite info (contains online, total, guild id)
        const inviteInfo = await fetch(DISCORD_GUILD_API);
        if (!inviteInfo.ok) throw new Error("Could not fetch Discord invite info.");
        const data = await inviteInfo.json();
        const guildId = data.guild?.id;
        // Now get channel list from public API if possible
        let channels = [];
        if (guildId) {
          // Use Discord widget endpoint (does not require bot/user token)
          // https://discord.com/api/guilds/[guild.id]/widget.json - public info
          const widgetResp = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`);
          if (widgetResp.ok) {
            const widgetData = await widgetResp.json();
            channels = widgetData.channels || [];
          }
        }
        setDiscordStats({
          onlineCount: data.approximate_presence_count ?? null,
          totalCount: data.approximate_member_count ?? null,
          channels: channels.length ? channels : null,
          guildName: data.guild?.name || null,
          isLoading: false,
          error: null,
        });
      } catch (err: any) {
        setDiscordStats(prev => ({
          ...prev, isLoading: false, error: err?.message || "Failed to fetch Discord data"
        }));
      }
    }
    fetchDiscordData();
  }, []);
  // --- END LIVE DISCORD DATA LOGIC ---

  return (
    <div className="min-h-screen bg-vorld-dark text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-vorld-pink/5 via-transparent to-transparent z-0"></div>
        
        <div className="vorld-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Join Our <span className="gradient-text">Community</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connect with other players, stay updated on development, and help shape the future of Vorld's games.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <button className="btn-primary text-lg px-8 py-3">
                Join Our Discord
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Announcements Section */}
      <section className="py-16 relative bg-vorld-darker/30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-vorld-blue to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-vorld-purple to-transparent"></div>
        
        <div className="vorld-container">
          <h2 className="text-4xl font-bold text-center mb-16">Latest <span className="gradient-text">Updates</span></h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card hover:border-vorld-blue/40 transition-colors duration-300"
                whileHover={{ 
                  y: -5, 
                  boxShadow: announcement.type === 'update' ? '0 10px 25px -5px rgba(12,255,225,0.2)' : 
                             announcement.type === 'community' ? '0 10px 25px -5px rgba(138,43,226,0.2)' : 
                             '0 10px 25px -5px rgba(255,0,255,0.2)' 
                }}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold">{announcement.title}</h3>
                    <div className={`px-3 py-1 text-xs rounded-full ${
                      announcement.type === 'update' ? 'bg-vorld-blue/20 text-vorld-blue' :
                      announcement.type === 'community' ? 'bg-vorld-purple/20 text-vorld-purple' : 
                      'bg-vorld-pink/20 text-vorld-pink'
                    }`}>
                      {announcement.type}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">{announcement.content}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {new Date(announcement.date).toLocaleDateString()}
                    </span>
                    <button className="text-sm text-vorld-blue hover:text-vorld-blue/80 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="btn-secondary">View All Updates</button>
          </div>
        </div>
      </section>
      
      {/* Discord Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
        <div className="absolute top-40 left-10 w-96 h-96 bg-vorld-blue/5 rounded-full blur-3xl"></div>
        
        <div className="vorld-container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Join Our <span className="gradient-text">Discord</span></h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our Discord server is the heart of our community. Connect with other players, 
                chat with developers, get sneak peeks at upcoming features, and participate 
                in exclusive events and giveaways.
              </p>
              <ul className="space-y-6 mb-10">
                {[
                  'Exclusive announcements and developer updates',
                  'Community events and contests with prizes',
                  'Direct access to our support team',
                  'Find friends to play with'
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Zap className="h-6 w-6 text-vorld-blue mt-0.5 flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.a
                className="btn-primary text-lg px-8 py-3 inline-block"
                href={`https://discord.gg/${DISCORD_INVITE}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Join Discord Community
              </motion.a>
            </div>
            
            <motion.div 
              className="glass-card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/3] bg-vorld-darker rounded-xl overflow-hidden flex flex-col">
                <div className="bg-[#5865F2] p-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-6 w-6" />
                    <h3 className="font-bold">
                      {discordStats.guildName || "Vorld Community"}
                    </h3>
                  </div>
                </div>
                <div className="flex-grow p-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg">Online Members</span>
                    <div className="flex items-center text-lg">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      <span>
                        {discordStats.isLoading
                          ? "Loading..."
                          : discordStats.onlineCount !== null
                          ? discordStats.onlineCount
                          : "?"}
                      </span>
                    </div>
                  </div>
                  {/* Dynamic channel list */}
                  <div className="space-y-4 mb-8">
                    {discordStats.isLoading
                      ? <div>Loading channels...</div>
                      : discordStats.channels && discordStats.channels.length > 0
                        ? discordStats.channels.map((channel) => (
                            <div key={channel.id} className="flex items-center gap-2 text-md">
                              <span className="text-muted-foreground">#</span>
                              <span>{channel.name}</span>
                            </div>
                          ))
                        : <div className="text-muted-foreground">No public channels found.</div>
                    }
                  </div>
                  {/* Legend for roles */}
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-vorld-blue rounded-full"></span> Online (live count)
                    </div>
                  </div>
                </div>
              </div>
              {discordStats.error && (
                <div className="text-red-500 mt-2">{discordStats.error}</div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Social Media Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-vorld-purple/5 rounded-full blur-3xl"></div>
        
        <div className="vorld-container relative z-10">
          <h2 className="text-4xl font-bold text-center mb-8">Connect With <span className="gradient-text">Us</span></h2>
          <p className="text-center text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
            Follow us on social media for the latest announcements, behind-the-scenes content, and community highlights.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="glass-card p-8 flex flex-col items-center text-center group"
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 group-hover:text-white"
                  style={{ backgroundColor: `${social.color}20`, color: social.color }}
                >
                  {social.icon}
                </div>
                <span className="font-medium text-lg">{social.name}</span>
              </motion.a>
            ))}
          </div>
          
          <div className="mt-24 text-center">
            <h3 className="text-3xl font-bold mb-10">Share Your <span className="gradient-text">Feedback</span></h3>
            <div className="max-w-2xl mx-auto glass-card p-8">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-vorld-darker border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50 placeholder:text-muted-foreground/50"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-vorld-blue via-transparent to-transparent transform translate-y-1 opacity-50"></div>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-vorld-darker border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50 placeholder:text-muted-foreground/50"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-vorld-blue via-transparent to-transparent transform translate-y-1 opacity-50"></div>
                </div>
              </div>
              <div className="relative mb-6">
                <select className="w-full bg-vorld-darker border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50 placeholder:text-muted-foreground/50 appearance-none">
                  <option value="" disabled selected>Select Feedback Type</option>
                  <option value="general">General Inquiry</option>
                  <option value="suggestion">Feature Suggestion</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-vorld-blue via-transparent to-transparent transform translate-y-1 opacity-50"></div>
              </div>
              <div className="relative mb-6">
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full bg-vorld-darker border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50 placeholder:text-muted-foreground/50"
                ></textarea>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-vorld-blue via-transparent to-transparent transform translate-y-1 opacity-50"></div>
              </div>
              <motion.button 
                className="btn-primary w-full py-4 text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Feedback
              </motion.button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CommunityPage;
