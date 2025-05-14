
import React from 'react';
import { Mail, MessageSquare, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-vorld-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-vorld-purple/5 rounded-full blur-3xl"></div>
      
      <div className="vorld-container relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="section-title">
            <span className="gradient-text">Contact</span> Us
          </h2>
          <p className="section-subtitle">
            Ready to bring our vision to life? Get in touch with our team to discuss your feedbacks!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input 
                    id="name" 
                    placeholder="Your Name"
                    className="bg-vorld-darker border-vorld-blue/30 focus:border-vorld-blue"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="your@email.com"
                    className="bg-vorld-darker border-vorld-blue/30 focus:border-vorld-blue"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input 
                  id="subject" 
                  placeholder="Project Inquiry"
                  className="bg-vorld-darker border-vorld-blue/30 focus:border-vorld-blue"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your feedback!"
                  rows={5}
                  className="bg-vorld-darker border-vorld-blue/30 focus:border-vorld-blue resize-none"
                />
              </div>
              
              <Button className="btn-primary w-full">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="glass-card p-8 mb-6">
              <h3 className="text-2xl font-bold mb-6">Connect with us</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="rounded-full p-3 bg-vorld-blue/10 mr-4">
                    <Mail className="text-vorld-blue h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-muted-foreground">contact@vorld-studio.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full p-3 bg-vorld-purple/10 mr-4">
                    <Phone className="text-vorld-purple h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full p-3 bg-vorld-pink/10 mr-4">
                    <MessageSquare className="text-vorld-pink h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Discord</h4>
                    <p className="text-muted-foreground">discord.gg/vorld-studio</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
                <p className="text-muted-foreground mb-6">
                  Our team is available Monday through Friday, 9AM to 6PM PST.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-vorld-blue/10 to-vorld-purple/10 p-4 rounded-lg">
                <p className="italic text-center">
                  "Aren't you excited to hear about our project and help bring us bring your vision to life!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
