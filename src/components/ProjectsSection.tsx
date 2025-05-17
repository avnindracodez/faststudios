
import React, { useState } from 'react';
import {
  ArrowRight,
  Users,
  Clock,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Pokemon Tower Defense",
      description: "",
      image: "./PTD1.png",
      category: "Adventure",
      stats: {
        players: "-",
        development: "6 months",
        awards: ""
      }
    },
    {
      id: 2,
      title: "Fish",
      description: "",
      image: "./Fish.png",
      category: "simulation",
      stats: {
        players: "0",
        development: "2 months",
        awards: ""
      }
    },
    {
      id: 3,
      title: "Dragol Ball",
      description: "",
      image: "./logo.png",
      category: "adventure",
      stats: {
        players: "0+",
        development: "1 month",
        awards: ""
      }
    },
    {
      id: 4,
      title: "Royal High",
      description: "",
      image: "./logo.png",
      category: "simulation",
      stats: {
        players: "0+",
        development: "0 month",
        awards: ""
      }
    },
  ];

  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(project => project.category === activeTab);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10 z-0"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-vorld-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-vorld-blue/5 rounded-full blur-3xl"></div>

      <div className="vorld-container relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="section-title">
            Our <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Explore our portfolio of innovative Roblox experiences that push the boundaries of gameplay, design, and technology.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-center mb-10">
            <TabsList className="glass-card bg-opacity-30">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="rpg">RPG</TabsTrigger>
              <TabsTrigger value="racing">Racing</TabsTrigger>
              <TabsTrigger value="adventure">Adventure</TabsTrigger>
              <TabsTrigger value="simulation">Simulation</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="glass-card group overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative w-full h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-vorld-dark to-transparent z-10"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-vorld-blue/70 z-20">
                      {project.category.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-6">{project.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center">
                        <Users className="text-vorld-blue h-5 w-5 mr-2" />
                        <span className="text-sm">{project.stats.players}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-vorld-purple h-5 w-5 mr-2" />
                        <span className="text-sm">{project.stats.development}</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="text-vorld-pink h-5 w-5 mr-2" />
                        <span className="text-sm truncate" title={project.stats.awards}>
                          {project.stats.awards}
                        </span>
                      </div>
                    </div>

                    <a href={`/games/`}>
                      <Button
                        variant="ghost"
                        className="group-hover:bg-vorld-blue/20 group-hover:text-vorld-blue transition-all duration-300 px-4 py-2 rounded-md flex items-center"
                      >
                        View Project <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </a>

                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <a href="/games">
            <Button className="btn-primary text-lg">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>

        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;