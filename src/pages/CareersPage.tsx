import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Code, Award, Users, Zap, CalendarDays } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const CAREERS_WEBHOOK_ENDPOINT = "https://twmwrwbtyxeceavsijka.supabase.co/functions/v1/send-contact";

const CareersPage = () => {
  const [activeJobId, setActiveJobId] = useState<number | null>(null);
  const [applyOpen, setApplyOpen] = useState<null | { id: number; title: string }>(null);

  // Sample job listings data
  const jobs = [
    {
      id: 1,
      title: 'Senior Scripter',
      department: 'Engineering',
      location: 'Remote (US/EU)',
      type: 'Full-time',
      description: `
        <p class="mb-4">We're looking for an experienced Roblox developer to join our team and help create extraordinary gaming experiences. You'll work closely with our design and art teams to implement gameplay features, systems, and mechanics.</p>
        <h4 class="text-lg font-bold mb-2">Responsibilities:</h4>
        <ul class="list-disc pl-5 mb-4 space-y-1">
          <li>Architect and develop robust game systems in Luau</li>
          <li>Collaborate with designers to implement gameplay features</li>
          <li>Optimize performance for diverse hardware environments</li>
          <li>Mentor junior developers and contribute to technical direction</li>
        </ul>
        <h4 class="text-lg font-bold mb-2">Requirements:</h4>
        <ul class="list-disc pl-5 space-y-1">
          <li>3+ years of Roblox development experience</li>
          <li>Strong proficiency in Luau/Lua programming</li>
          <li>Experience with Roblox Studio tools and workflows</li>
          <li>Portfolio demonstrating technical and creative capabilities</li>
        </ul>
      `
    },
    {
      id: 2,
      title: '3D Artist / Modeler',
      department: 'Art',
      location: 'Remote',
      type: 'Full-time',
      description: `
        <p class="mb-4">Join our art team and help shape the visual identity of our games. We're looking for a talented 3D artist to create high-quality models, environments, and assets for our Roblox experiences.</p>
        <h4 class="text-lg font-bold mb-2">Responsibilities:</h4>
        <ul class="list-disc pl-5 mb-4 space-y-1">
          <li>Create high-quality 3D models optimized for Roblox</li>
          <li>Design environments, props, and characters</li>
          <li>Collaborate with the art director to maintain visual consistency</li>
          <li>Contribute to the artistic direction of our games</li>
        </ul>
        <h4 class="text-lg font-bold mb-2">Requirements:</h4>
        <ul class="list-disc pl-5 space-y-1">
          <li>Strong portfolio demonstrating 3D modeling skills</li>
          <li>Proficiency with Blender, Maya, or similar 3D software</li>
          <li>Understanding of optimization for real-time rendering</li>
          <li>Experience with Roblox asset pipeline preferred</li>
        </ul>
      `
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: `
        <p class="mb-4">We're seeking a talented UI/UX Designer to create intuitive, visually appealing interfaces for our Roblox games. You'll work closely with our development and art teams to craft engaging user experiences.</p>
        <h4 class="text-lg font-bold mb-2">Responsibilities:</h4>
        <ul class="list-disc pl-5 mb-4 space-y-1">
          <li>Design user interfaces for Roblox games</li>
          <li>Create wireframes, prototypes, and high-fidelity designs</li>
          <li>Collaborate with developers to implement UI solutions</li>
          <li>Conduct user research and usability testing</li>
        </ul>
        <h4 class="text-lg font-bold mb-2">Requirements:</h4>
        <ul class="list-disc pl-5 space-y-1">
          <li>Portfolio showcasing UI/UX design work</li>
          <li>Experience with Figma, Adobe XD, or similar design tools</li>
          <li>Understanding of game UI/UX principles</li>
          <li>Experience designing for Roblox preferred</li>
        </ul>
      `
    },
    {
      id: 4,
      title: 'Game Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: `
        <p class="mb-4">Join our design team to create engaging gameplay systems, mechanics, and experiences. You'll help shape our games from concept to implementation, ensuring they're fun, balanced, and memorable.</p>
        <h4 class="text-lg font-bold mb-2">Responsibilities:</h4>
        <ul class="list-disc pl-5 mb-4 space-y-1">
          <li>Design and document game mechanics and systems</li>
          <li>Balance gameplay elements for optimal player experience</li>
          <li>Collaborate with developers to implement designs</li>
          <li>Analyze player data to inform design decisions</li>
        </ul>
        <h4 class="text-lg font-bold mb-2">Requirements:</h4>
        <ul class="list-disc pl-5 space-y-1">
          <li>Portfolio demonstrating game design experience</li>
          <li>Strong analytical and problem-solving skills</li>
          <li>Experience with Roblox game development preferred</li>
          <li>Excellent communication and documentation skills</li>
        </ul>
      `
    },
    {
      id: 5,
      title: 'Community Manager',
      department: 'Operations',
      location: 'Remote',
      type: 'Full-time',
      description: `
        <p class="mb-4">We're looking for a passionate Community Manager to foster and grow our player community. You'll be the voice of our studio to the players and the voice of the players to our team.</p>
        <h4 class="text-lg font-bold mb-2">Responsibilities:</h4>
        <ul class="list-disc pl-5 mb-4 space-y-1">
          <li>Manage our Discord server and social media channels</li>
          <li>Create engaging content for our community</li>
          <li>Organize community events and activities</li>
          <li>Gather and communicate player feedback to the team</li>
        </ul>
        <h4 class="text-lg font-bold mb-2">Requirements:</h4>
        <ul class="list-disc pl-5 space-y-1">
          <li>Previous experience in community management</li>
          <li>Excellent communication and interpersonal skills</li>
          <li>Familiarity with Discord and social media platforms</li>
          <li>Passion for Roblox games and gaming communities</li>
        </ul>
      `
    },
  ];

  // Benefits and perks
  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-vorld-blue" />,
      title: 'Creative Freedom',
      description: 'Freedom to innovate, experiment, and bring your ideas to life in our projects.'
    },
    {
      icon: <Users className="h-8 w-8 text-vorld-purple" />,
      title: 'Remote-First Culture',
      description: 'Work from anywhere with flexible hours and a focus on work-life balance.'
    },
    {
      icon: <CalendarDays className="h-8 w-8 text-vorld-pink" />,
      title: 'Competitive Benefits',
      description: 'Paid time off, equipment stipend, and professional development budget.'
    },
    {
      icon: <Award className="h-8 w-8 text-vorld-blue" />,
      title: 'Career Growth',
      description: 'Clear advancement paths and opportunities to develop new skills and take on leadership roles.'
    },
    {
      icon: <Code className="h-8 w-8 text-vorld-purple" />,
      title: 'Cutting-Edge Projects',
      description: "Work on innovative games that push the boundaries of what's possible on Roblox."
    },
    {
      icon: <Users className="h-8 w-8 text-vorld-pink" />,
      title: 'Inclusive Environment',
      description: 'Diverse, supportive team culture where every voice matters and contributes to our success.'
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Working here has allowed me to grow as a leader while collaborating with an incredibly talented team. I take pride in turning vision into action and helping our projects reach their full potential.",
      name: "@9sets",
      role: "Project Manager",
      image: "./setdupe.png"
    }
  ];

  const [careerForm, setCareerForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmittingCareer, setIsSubmittingCareer] = useState(false);

  const handleCareerFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCareerForm({ ...careerForm, [e.target.name]: e.target.value });
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingCareer(true);
    try {
      const body = {
        type: "application",
        name: careerForm.name,
        email: careerForm.email,
        message: careerForm.message,
        position: "Open Application"
      };
      const res = await fetch(CAREERS_WEBHOOK_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        throw new Error("Failed to submit application.");
      }
      toast({ title: "Application sent!", description: "We've received your application.", variant: "default" });
      setCareerForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      toast({ title: "Submission failed", description: err?.message, variant: "destructive" });
    }
    setIsSubmittingCareer(false);
  };

  const [jobApplyForm, setJobApplyForm] = useState({ name: "", email: "", message: "" });
  const [isSubmittingJobApplication, setIsSubmittingJobApplication] = useState(false);

  const handleJobFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setJobApplyForm({ ...jobApplyForm, [e.target.name]: e.target.value });
  };

  const handleApplyJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingJobApplication(true);
    try {
      if (!applyOpen) return;
      const body = {
        type: "application",
        name: jobApplyForm.name,
        email: jobApplyForm.email,
        message: jobApplyForm.message,
        position: applyOpen.title
      };
      const res = await fetch(CAREERS_WEBHOOK_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error("Failed to submit application.");
      toast({ title: "Application sent!", description: "We've received your application.", variant: "default" });
      setJobApplyForm({ name: "", email: "", message: "" });
      setApplyOpen(null);
    } catch (err: any) {
      toast({ title: "Submission failed", description: err?.message, variant: "destructive" });
    }
    setIsSubmittingJobApplication(false);
  };

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
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Help us shape the future of Roblox experiences and be part of a studio that values creativity, innovation, and collaboration.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <button className="btn-primary text-lg px-8 py-3">
                View Open Positions
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Why Work With Us Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
        <div className="absolute top-40 left-10 w-96 h-96 bg-vorld-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-vorld-purple/5 rounded-full blur-3xl"></div>
        
        <div className="vorld-container relative z-10">
          <h2 className="text-3xl font-bold text-center mb-16">Why Work With <span className="gradient-text">Fast Studios?</span></h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="mb-4 p-3 rounded-lg bg-vorld-darker/50 w-16 h-16 flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 relative bg-vorld-darker/30">
        <div className="vorld-container">
          <h2 className="text-3xl font-bold text-center mb-16">Team <span className="gradient-text">Testimonials</span></h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 flex flex-col"
              >
                <div className="flex-grow">
                  <div className="text-4xl text-vorld-blue/30 mb-4">"</div>
                  <p className="italic mb-6">{testimonial.quote}</p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-vorld-blue">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Open Positions Section */}
      <section className="py-24 relative">
        {/* Background elements */}
        <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-vorld-purple/5 rounded-full blur-3xl"></div>
        
        <div className="vorld-container relative z-10">
          <h2 className="text-3xl font-bold text-center mb-16">Open <span className="gradient-text">Positions</span></h2>
          
          <div className="grid gap-6">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="glass-card overflow-hidden"
              >
                <div className="p-6 cursor-pointer" onClick={() => setActiveJobId(activeJobId === job.id ? null : job.id)}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                      <p className="text-vorld-blue text-sm">{job.department}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                      <span className="px-3 py-1 text-xs rounded-full bg-vorld-blue/20 text-vorld-blue">
                        {job.location}
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-vorld-purple/20 text-vorld-purple">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  
                  {activeJobId === job.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-vorld-blue/10"
                    >
                      <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
                      <div className="mt-6">
                        <button
                          className="btn-primary"
                          onClick={(e) => { e.stopPropagation(); setApplyOpen({ id: job.id, title: job.title }); }}
                        >
                          Apply Now
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-lg mb-6">Don't see a position that matches your skills?</p>
            <button
              className="btn-secondary text-lg"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
            >
              Submit Open Application
            </button>
          </div>
        </div>
      </section>
      
      {/* Modal for job application */}
      {applyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form
            className="glass-card p-8 max-w-md w-full space-y-5 relative z-60"
            onSubmit={handleApplyJob}
          >
            <button
              type="button"
              className="absolute top-2 right-3 text-xl"
              onClick={() => setApplyOpen(null)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-2">Apply for {applyOpen.title}</h2>
            <div>
              <label htmlFor="jobapply-name" className="block text-sm font-medium mb-1">Name</label>
              <input
                id="jobapply-name"
                name="name"
                value={jobApplyForm.name}
                onChange={handleJobFormChange}
                required
                className="w-full bg-vorld-darker/40 border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50 mb-3"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="jobapply-email" className="block text-sm font-medium mb-1">Email</label>
              <input
                id="jobapply-email"
                name="email"
                type="email"
                value={jobApplyForm.email}
                onChange={handleJobFormChange}
                required
                className="w-full bg-vorld-darker/40 border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50 mb-3"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="jobapply-message" className="block text-sm font-medium mb-1">Message</label>
              <textarea
                id="jobapply-message"
                name="message"
                value={jobApplyForm.message}
                onChange={handleJobFormChange}
                required
                rows={5}
                className="w-full bg-vorld-darker/40 border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50"
                placeholder="Tell us about yourself or why you're interested in the role..."
              />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={isSubmittingJobApplication}>
              {isSubmittingJobApplication ? "Sending..." : "Send Application"}
            </button>
          </form>
        </div>
      )}
      
      {/* Application Process Section */}
      <section className="py-24 relative bg-vorld-darker/30">
        <div className="vorld-container">
          <h2 className="text-3xl font-bold text-center mb-16">Application <span className="gradient-text">Process</span></h2>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-vorld-blue via-vorld-purple to-vorld-pink md:left-1/2 md:transform md:-translate-x-1/2"></div>
            
            {[
              {
                step: '01',
                title: 'Application Submission',
                description: 'Submit your application with resume/portfolio and cover letter.'
              },
              {
                step: '02',
                title: 'Initial Screening',
                description: 'Our team reviews applications and reaches out to promising candidates.'
              },
              {
                step: '03',
                title: 'First Interview',
                description: 'Virtual interview to discuss your experience and learn more about you.'
              },
              {
                step: '04',
                title: 'Technical Assessment',
                description: 'Role-specific task to evaluate your skills and approach to problems.'
              },
              {
                step: '05',
                title: 'Team Interview',
                description: 'Meet your potential teammates and collaborate on a mini-project.'
              },
              {
                step: '06',
                title: 'Offer & Onboarding',
                description: "Welcome to the team! We'll guide you through our onboarding process."
              }
            ].map((stage, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-start mb-16 ${
                  index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                }`}
              >
                <div className={`absolute top-0 left-8 transform -translate-x-1/2 ${
                  index % 2 === 0 ? 'md:left-auto md:right-1/2 md:translate-x-1/2' : 'md:left-1/2 md:-translate-x-1/2'
                }`}>
                  <div className="w-8 h-8 rounded-full bg-vorld-darker border-4 border-vorld-blue flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-vorld-blue animate-pulse"></div>
                  </div>
                </div>
                
                <div className={`pl-16 md:pl-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <div className="glass-card p-6">
                    <div className="text-vorld-blue text-xl font-bold mb-2">{stage.step}</div>
                    <h3 className="text-xl font-bold mb-2">{stage.title}</h3>
                    <p className="text-muted-foreground">{stage.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
        
        <div className="vorld-container relative z-10">
          <div className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to <span className="gradient-text">Join Us</span>?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step toward an exciting career at the forefront of Roblox game development.
            </p>
            <button className="btn-primary text-lg px-8 py-3">View Open Positions</button>
          </div>
        </div>
      </section>
      
      {/* Application Form */}
      <form onSubmit={handleCareerSubmit} className="space-y-5 glass-card p-8 max-w-lg mx-auto my-10">
        <h2 className="text-2xl font-bold mb-4">Send Open Application</h2>
        <div>
          <label htmlFor="career-name" className="block text-sm font-medium mb-1">Name</label>
          <input
            id="career-name"
            name="name"
            value={careerForm.name}
            onChange={handleCareerFormChange}
            required
            className="w-full bg-vorld-darker/40 border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50 mb-3"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="career-email" className="block text-sm font-medium mb-1">Email</label>
          <input
            id="career-email"
            name="email"
            type="email"
            value={careerForm.email}
            onChange={handleCareerFormChange}
            required
            className="w-full bg-vorld-darker/40 border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50 mb-3"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="career-message" className="block text-sm font-medium mb-1">Message</label>
          <textarea
            id="career-message"
            name="message"
            value={careerForm.message}
            onChange={handleCareerFormChange}
            required
            rows={5}
            className="w-full bg-vorld-darker/40 border border-vorld-blue/20 rounded-lg p-4 focus:outline-none focus:border-vorld-blue/50"
            placeholder="Tell us about yourself or why you're interested in Vorld..."
          />
        </div>
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={isSubmittingCareer}
        >
          {isSubmittingCareer ? "Sending..." : "Send Application"}
        </button>
      </form>
      
      <Footer />
    </div>
  );
};

export default CareersPage;
