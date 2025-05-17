import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Code, Award, Users, Zap } from 'lucide-react';

const StudioPage = () => {
  const teamMembers = [
    {
      name: '@reverselight',
      role: 'Founder & Director',
      image: './reverselight.jpg',
      bio: 'Game designer and investor with 2 years of experience in UGC.',
    },
    {
      name: '@setdupe',
      role: 'Project Manager',
      image: './setdupe.png',
      bio: 'Keeps the project running smoothly by turning vision into structure.',
    },
    {
      name: '@therealdevrose',
      role: 'Lead Scripter',
      image: './therealdevrose.jpg',
      bio: 'Just a girl who can code.',
    },
    {
      name: '@yamisukehiro2077',
      role: 'Lead Scripter',
      image: './yami.png',
      bio: 'Brings scripts to life!',
    },
    {
      name: '@ditto',
      role: 'UGC Manager',
      image: './ditto.png',
      bio: '3+ years in the industry, making your favorite 3D models.',
    },
    {
      name: '@mac',
      role: 'Lead VFX',
      image: './mac.png',
      bio: 'Specializes in making the best virtual effects.',
    },
  ];

  const values = [
    {
      icon: <Code className="text-vorld-blue w-6 h-6" />,
      title: 'Technical Excellence',
      description: 'We push platform limits with optimized code and efficiency.',
    },
    {
      icon: <Zap className="text-vorld-purple w-6 h-6" />,
      title: 'Creative Innovation',
      description: 'Every project starts with bold, fresh, original concepts.',
    },
    {
      icon: <Users className="text-vorld-pink w-6 h-6" />,
      title: 'Community-Led Design',
      description: 'We co-create with our players — for our players.',
    },
    {
      icon: <Award className="text-vorld-blue w-6 h-6" />,
      title: 'Crafted Quality',
      description: 'We obsess over every detail. Polish matters.',
    },
  ];

  return (
    <div className="min-h-screen bg-vorld-dark text-foreground relative">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 relative z-10">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="vorld-container relative text-center max-w-3xl mx-auto">
          <motion.h1
            className="text-5xl font-extrabold mb-4 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About the Studio
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Fast Studios is a visionary Roblox game studio crafting future-defining UGC experiences.
          </motion.p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-vorld-darker/30 relative">
        <div className="vorld-container">
          <h2 className="text-3xl font-bold text-center mb-16">
            Meet the <span className="gradient-text">Team</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="glass-card overflow-hidden group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full aspect-square group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-sm text-vorld-blue mb-1">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Values */}
      <section className="py-24">
        <div className="vorld-container">
          <h2 className="text-3xl font-bold text-center mb-16">
            Our <span className="gradient-text">Values</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                className="glass-card flex gap-4 p-6 items-start"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="p-3 bg-vorld-darker/40 rounded-md">{val.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{val.title}</h3>
                  <p className="text-muted-foreground">{val.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-vorld-darker/20 text-center">
        <motion.h3
          className="text-2xl font-semibold mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Want to see what goes on behind the curtain?
        </motion.h3>
        <motion.a
          href="https://www.youtube.com/@FastStudi"
          target="_blank"
          rel="noreferrer"
          className="btn-primary inline-block text-lg mt-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎥 Watch Our Studio Tour
        </motion.a>
      </section>

      <Footer />
    </div>
  );
};

export default StudioPage;
