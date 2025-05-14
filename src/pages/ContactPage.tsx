import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, FileText, AlertCircle, ChevronDown, Search } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { submitContactForm } from "@/utils/contactApi";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    type: '',
    message: ''
  });
  
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // FAQ data
  const faqs = [
    {
      question: 'How can I contact your support team?',
      answer: "You can reach our support team by submitting a message through the contact form on this page, joining our Discord server, or emailing support@vorldstudio.com."
    },
    {
      question: 'Do you offer partnerships or collaborations with content creators?',
      answer: "Yes! We love working with content creators. Please reach out to us via the contact form with details about your channel/platform and we'll get back to you to discuss potential collaboration opportunities."
    },
    {
      question: 'How can I apply for a job at Vorld?',
      answer: "Check out our Careers page for current job openings and application instructions. If you don't see a position that matches your skills, you can still submit an open application."
    },
    {
      question: 'Do you offer internships or learning opportunities?',
      answer: "We occasionally offer internships and mentorship programs. Keep an eye on our Careers page and Discord announcements for these opportunities."
    },
    {
      question: 'I have a game idea. Will you develop it for me?',
      answer: "While we appreciate your creativity, we're currently focused on our own game projects. We do, however, welcome feedback and suggestions for our existing games."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send to Supabase and Resend Edge Fn
    const result = await submitContactForm(formData);
    if (result.ok) {
      toast({
        title: "Message Sent!",
        description: "We've received your message and will respond soon.",
        variant: "default",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        type: '',
        message: ''
      });
    } else {
      toast({
        title: "Submission failed",
        description: "error" in result && result.error ? result.error : "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const contactOptions = [
    {
      icon: <MessageCircle className="h-8 w-8 text-vorld-blue" />,
      title: 'General Inquiry',
      description: 'Questions about our studio or games'
    },
    {
      icon: <FileText className="h-8 w-8 text-vorld-purple" />,
      title: 'Business',
      description: 'Partnerships and collaboration opportunities'
    },
    {
      icon: <Mail className="h-8 w-8 text-vorld-pink" />,
      title: 'Game Feedback',
      description: 'Share your ideas and suggestions'
    }
  ];

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions, feedback, or want to work with us? We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Options */}
      <section className="py-16 relative">
        <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
        
        <div className="vorld-container relative z-10">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 text-center cursor-pointer hover:border-vorld-blue/40 transition-all duration-300"
                whileHover={{ y: -10, boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.3)' }}
                onClick={() => setFormData({ ...formData, type: option.title })}
              >
                <div className="rounded-full p-4 bg-vorld-darker/50 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{option.title}</h3>
                <p className="text-muted-foreground">{option.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8">Send Us a <span className="gradient-text">Message</span></h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-vorld-darker/50 border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50 placeholder:text-muted-foreground/50"
                      placeholder="Enter your name"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-vorld-blue via-transparent to-transparent transform translate-y-1 opacity-50"></div>
                  </div>
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-vorld-darker/50 border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50 placeholder:text-muted-foreground/50"
                      placeholder="Enter your email"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-vorld-blue via-transparent to-transparent transform translate-y-1 opacity-50"></div>
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-vorld-darker/50 border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50 placeholder:text-muted-foreground/50"
                    placeholder="Enter subject"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-vorld-blue via-transparent to-transparent transform translate-y-1 opacity-50"></div>
                </div>
                
                <div className="relative">
                  <label htmlFor="type" className="block text-sm font-medium mb-2">Message Type</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-vorld-darker/50 border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50 appearance-none"
                  >
                    <option value="" disabled>Select message type</option>
                    {contactOptions.map((option, index) => (
                      <option key={index} value={option.title}>{option.title}</option>
                    ))}
                  </select>
                  <div className="absolute top-1/2 right-4 transform translate-y-1">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-vorld-blue via-transparent to-transparent transform translate-y-1 opacity-50"></div>
                </div>
                
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-vorld-darker/50 border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50 placeholder:text-muted-foreground/50"
                    placeholder="Write your message here..."
                  ></textarea>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-vorld-blue via-transparent to-transparent transform translate-y-1 opacity-50"></div>
                </div>
                
                <motion.button 
                  type="submit" 
                  className="btn-primary w-full py-4 text-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
            
            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">FAQs</h2>
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    className="w-full bg-vorld-darker/50 border border-vorld-blue/20 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-vorld-blue/30"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-vorld-darker/30 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      className="flex justify-between items-center w-full p-5 text-left"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h3 className="text-lg font-medium">{faq.question}</h3>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`}
                      />
                    </button>
                    
                    {activeAccordion === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 text-muted-foreground"
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-vorld-darker/30 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Need More Help?</h3>
                <p className="text-muted-foreground mb-4">
                  If you can't find the answer to your question in our FAQs, please feel free to contact us directly.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-vorld-blue" />
                    <span>vorldstudios@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-vorld-purple" />
                    <span>Discord Support</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
