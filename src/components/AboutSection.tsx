
import React from 'react';
import { Award, Code, Users, Zap } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const stats = [
    { label: 'Years of Experience', value: '0+' },
    { label: 'Projects Completed', value: '0+' },
    { label: 'Active Users', value: '0+' },
    { label: 'Team Members', value: '10+' },
  ];

  const features = [
    {
      icon: <Code className="text-vorld-blue h-8 w-8" />,
      title: 'Expert Development',
      description: 'Our team of veteran Roblox developers creates robust, optimized experiences with cutting-edge technology.'
    },
    {
      icon: <Zap className="text-vorld-purple h-8 w-8" />,
      title: 'Creative Innovation',
      description: "We push the boundaries of what's possible within Roblox, implementing unique gameplay mechanics and visuals."
    },
    {
      icon: <Users className="text-vorld-pink h-8 w-8" />,
      title: 'Community Focused',
      description: 'We build experiences with players at the center, focusing on engagement, retention and community building.'
    },
    {
      icon: <Award className="text-vorld-blue h-8 w-8" />,
      title: 'End-to-End Solutions',
      description: 'From concept to launch and beyond, we provide comprehensive development and support services.'
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-vorld-blue/5 via-transparent to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-vorld-purple/5 via-transparent to-transparent z-0"></div>
      
      <div className="vorld-container relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="section-title">
            <span className="gradient-text">About</span> Vorld
          </h2>
          <p className="section-subtitle">
            We are a team of passionate developers, designers, and creators focused on building the next generation of immersive Roblox experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="glass-card p-6 text-center transform hover:-translate-y-1 transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        <div className="my-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">Our Philosophy</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <h4 className="text-xl font-bold mb-4">Pushing Boundaries</h4>
              <p className="text-muted-foreground mb-6">
                At Vorld, we believe in pushing the technical and creative boundaries of the Roblox platform. 
                We're constantly innovating, researching, and experimenting with new techniques to create experiences 
                that stand out in the vast ecosystem.
              </p>
              <h4 className="text-xl font-bold mb-4">Building Communities</h4>
              <p className="text-muted-foreground">
                We don't just build games; we build communities. Every experience we create is designed with 
                long-term engagement in mind, fostering connections between players and creating spaces where 
                memories are made.
              </p>
            </div>
            <div className="glass-card p-6 animate-slide-in" style={{ animationDelay: '0.4s' }}>
              <div className="relative h-full w-full rounded-lg bg-gradient-to-br from-vorld-blue/10 to-vorld-purple/10 p-6 flex items-center justify-center">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-lg bg-vorld-blue/20 animate-float" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-lg bg-vorld-purple/20 animate-float" style={{ animationDelay: '0.6s' }}></div>
                
                <blockquote className="italic text-lg text-center">
                  "Our mission is to transform the Roblox landscape by creating extraordinary experiences that inspire, 
                  engage, and bring joy to millions of players worldwide."
                  <footer className="text-sm text-muted-foreground mt-4">— Poppelloppeskram, Founder</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="glass-card transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full p-3 bg-vorld-darker mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
