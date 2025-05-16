
import React from 'react';
import { 
  Code, 
  Gamepad, 
  Palette, 
  BarChart, 
  Package, 
  Globe 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Game Development",
      description: "Full-cycle Roblox game development from concept to deployment with optimized performance and scalability.",
      primaryColor: "from-vorld-blue",
      secondaryColor: "to-cyan-500",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "3D Design & Modeling",
      description: "Custom 3D assets, environments, characters, and animations tailored to our game's aesthetic.",
      primaryColor: "from-vorld-purple",
      secondaryColor: "to-pink-500",
    },
    {
      icon: <Gamepad className="h-8 w-8" />,
      title: "Game Systems",
      description: "Advanced gameplay mechanics, UI/UX design, and interactive systems that engage players.",
      primaryColor: "from-green-400",
      secondaryColor: "to-vorld-blue",
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Analytics & Optimization",
      description: "Data-driven optimization strategies to improve performance, engagement, and monetization.",
      primaryColor: "from-orange-400",
      secondaryColor: "to-red-500",
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Game Updates & Support",
      description: "Ongoing development support, feature enhancements, and content updates to keep our game thriving.",
      primaryColor: "from-yellow-400",
      secondaryColor: "to-orange-500",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Metaverse Solutions",
      description: "Innovative experiences that leverage the social and interactive potential of the Roblox platform.",
      primaryColor: "from-vorld-purple",
      secondaryColor: "to-vorld-blue",
    },
  ];

  return (
    <section id="services" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
      <div className="absolute top-40 left-10 w-96 h-96 bg-vorld-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-vorld-purple/5 rounded-full blur-3xl"></div>
      
      <div className="vorld-container relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="section-title">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subtitle">
            We offer comprehensive development solutions to bring our Roblox vision to life with cutting-edge technology and creative innovation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="glass-card group p-1 transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-full w-full rounded-lg bg-vorld-darker/50 p-6 flex flex-col">
                <div className={`mb-5 p-4 rounded-lg bg-gradient-to-r ${service.primaryColor} ${service.secondaryColor} bg-opacity-20 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-grow">{service.description}</p>
                
                <div className="mt-auto">
                  <Button variant="ghost" className="px-0 hover:bg-transparent hover:text-vorld-blue">
                    Learn more →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
<div className="mt-24 text-center py-12 rounded-2xl">
  <h2 className="text-3xl font-bold mb-3 text-vorld-blue">Need Help?</h2>
  <p className="text-lg text-muted-foreground mb-6">
    Got a question, feedback, or just want to reach out? We’d love to hear from you.
  </p>
  <a href="/contact">
    <Button className="btn-primary text-lg px-8 py-3">
      Contact Us
    </Button>
  </a>
</div>

      </div>
    </section>
  );
};

export default ServicesSection;
