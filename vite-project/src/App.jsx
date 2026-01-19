import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, Code, Database, Server, Palette, Award, ExternalLink, ArrowRight, Menu, X } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.speed = Math.random() * 2 + 1;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'React.js', icon: <Code className="text-cyan-400" />, gradient: 'from-cyan-500 to-blue-500' },
    { name: 'Node.js', icon: <Server className="text-green-400" />, gradient: 'from-green-500 to-emerald-500' },
    { name: 'MongoDB', icon: <Database className="text-emerald-400" />, gradient: 'from-emerald-500 to-teal-500' },
    { name: 'Express.js', icon: <Server className="text-gray-400" />, gradient: 'from-gray-500 to-slate-500' },
    { name: 'HTML/CSS/JS', icon: <Palette className="text-orange-400" />, gradient: 'from-orange-500 to-red-500' },
    { name: 'SQL', icon: <Database className="text-blue-400" />, gradient: 'from-blue-500 to-indigo-500' },
    { name: 'Java', icon: <Code className="text-red-400" />, gradient: 'from-red-500 to-pink-500' },
    { name: 'Tailwind CSS', icon: <Palette className="text-cyan-400" />, gradient: 'from-cyan-400 to-blue-400' },
  ];

  const projects = [
    {
      title: 'Placement Eligibility Portal',
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind'],
      description: 'Full-stack MERN application with role-based authentication, secure REST APIs, and responsive dashboards for managing student profiles and placement operations.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Secure Keyword Search System',
      tech: ['Java', 'MySQL', 'Encryption'],
      description: 'Web-based security system enabling encrypted keyword search with advanced authentication and encryption modules for cloud data protection.',
      gradient: 'from-cyan-500 to-blue-500'
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.6); }
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scroll-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(147, 51, 234, 0.5);
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(147, 51, 234, 0.3);
        }

        .nav-glass {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .gradient-text {
          background: linear-gradient(135deg, #9333ea, #ec4899, #06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        .skill-bar-fill {
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glow-effect {
          animation: glow 3s ease-in-out infinite;
        }

        .text-shadow-glow {
          text-shadow: 0 0 30px rgba(147, 51, 234, 0.5);
        }

        .perspective-card {
          perspective: 1000px;
        }

        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-3d:hover {
          transform: rotateY(5deg) rotateX(5deg) translateZ(20px);
        }

        .modal-overlay {
          backdrop-filter: blur(10px);
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-image {
          animation: zoomIn 0.3s ease-out;
        }

        @keyframes zoomIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 nav-glass">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src="/profile/manoj.JPEG"
                alt="Manoj"
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-500 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setImageModal(true)}
              />
              <h1 className="text-2xl font-bold gradient-text">Manoj K M</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-purple-400 transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 space-y-4 pb-4">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-300 hover:text-purple-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold">
              🚀 Available for opportunities
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Hi, I'm{' '}
              <span className="gradient-text text-shadow-glow">Manoj</span>
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              MERN Stack Developer
            </h2>
            
            <p className="text-xl text-gray-400 leading-relaxed">
              Transforming ideas into elegant, scalable web solutions with modern JavaScript technologies.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2"
              >
                View My Work
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all"
              >
                Get in Touch
              </a>
            </div>

            <div className="flex gap-4">
              {[
                { icon: <Github size={24} />, href: 'https://github.com/manuu-manoj' },
                { icon: <Linkedin size={24} />, href: 'https://www.linkedin.com/in/manoj-k-m-454346258' },
                { icon: <Mail size={24} />, href: 'mailto:manojkrish821@gmail.com' },
                { icon: <Phone size={24} />, href: 'tel:9900495241' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative w-full max-w-lg mx-auto">
              {/* 3D Coder Illustration */}
              <div className="relative aspect-square flex items-center justify-center">
                {/* Laptop/Computer */}
                <div className="relative w-80 h-64">
                  {/* Screen */}
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-72 h-48 bg-gradient-to-br from-gray-900 to-black rounded-t-2xl border-4 border-gray-800 shadow-2xl shadow-purple-500/30 float-animation">
                    {/* Screen Content */}
                    <div className="p-4 h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                      <div className="flex gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="space-y-2 font-mono text-xs">
                        <div className="text-cyan-400">&gt; Level: Expert</div>
                        <div className="text-green-400">&gt; Status: Coding...</div>
                        <div className="text-purple-400">&gt; Stack: MERN</div>
                        <div className="text-pink-400">&gt; Output: Success ✓</div>
                      </div>
                      {/* Typing Cursor */}
                      <div className="mt-4 flex items-center gap-1">
                        <span className="text-white text-xs">$</span>
                        <span className="w-2 h-4 bg-green-400 animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Laptop Base */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-3 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-xl shadow-lg"></div>
                  
                  {/* Desk Surface */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
                </div>

                {/* Floating Code Elements */}
                <div className="absolute top-8 -right-4 px-3 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg backdrop-blur-sm" style={{ animation: 'float 4s ease-in-out infinite' }}>
                  <code className="text-cyan-400 text-sm font-mono">{'{ }'}</code>
                </div>
                
                <div className="absolute top-20 -left-4 px-3 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg backdrop-blur-sm" style={{ animation: 'float 5s ease-in-out infinite 1s' }}>
                  <code className="text-purple-400 text-sm font-mono">{'</>'}</code>
                </div>
                
                <div className="absolute bottom-24 -right-8 px-3 py-2 bg-pink-500/20 border border-pink-500/50 rounded-lg backdrop-blur-sm" style={{ animation: 'float 6s ease-in-out infinite 2s' }}>
                  <code className="text-pink-400 text-sm font-mono">const</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 scroll-reveal">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-16"></div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 scroll-reveal perspective-card">
              <div className="card-3d">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                    <Code size={32} />
                  </div>
                  <h3 className="text-3xl font-bold">My Mission</h3>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed">
                  To leverage my full-stack JavaScript expertise in building innovative, scalable web applications that solve real-world problems while continuously evolving with emerging technologies.
                </p>
              </div>
            </div>

            <div className="glass-card p-8 scroll-reveal perspective-card">
              <div className="card-3d">
                <h3 className="text-3xl font-bold mb-6">Core Strengths</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Quick Learner', 'Team Player', 'Leadership', 'Problem Solver', 'Adaptable', 'Time Management'].map((skill, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all">
                      <div className="text-purple-400 mb-2 text-xl">✓</div>
                      <p className="font-semibold">{skill}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 scroll-reveal">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-16"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="glass-card p-6 scroll-reveal perspective-card group cursor-pointer relative overflow-hidden" 
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="card-3d relative z-10">
                  <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className={`p-4 bg-gradient-to-br ${skill.gradient} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {skill.icon}
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      {skill.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 scroll-reveal">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-16"></div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="glass-card p-8 scroll-reveal perspective-card group" style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="card-3d">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 bg-gradient-to-br ${project.gradient} rounded-2xl`}>
                      <Code size={32} />
                    </div>
                    <ExternalLink className="text-purple-400 cursor-pointer hover:scale-110 transition-transform" size={24} />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:border-purple-500/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 scroll-reveal">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-16"></div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'MCA', school: 'CMR University', year: '2023-2025', color: 'from-purple-500 to-pink-500' },
              { title: 'BCA', school: 'East Point College', year: '2019-2022', color: 'from-cyan-500 to-blue-500' },
              { title: 'PUC', school: 'BGS PU College', year: '2017-2019', color: 'from-green-500 to-teal-500' }
            ].map((edu, i) => (
              <div key={i} className="glass-card p-8 text-center scroll-reveal perspective-card" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="card-3d">
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${edu.color} rounded-2xl flex items-center justify-center text-3xl`}>
                    🎓
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{edu.title}</h3>
                  <p className="text-gray-400 mb-2">{edu.school}</p>
                  <p className="text-purple-400 font-semibold">{edu.year}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'MERN Full Stack Development', org: 'Jspiders', color: 'from-purple-500 to-pink-500' },
              { title: 'Unlock the Power of Linux', org: 'CMR University', color: 'from-cyan-500 to-blue-500' }
            ].map((cert, i) => (
              <div key={i} className="glass-card p-6 flex items-center gap-6 scroll-reveal perspective-card" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="card-3d flex items-center gap-6 w-full">
                  <div className={`p-4 bg-gradient-to-br ${cert.color} rounded-2xl flex-shrink-0`}>
                    <Award size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                    <p className="text-gray-400">{cert.org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 scroll-reveal">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 scroll-reveal">
            Open to exciting opportunities and collaborations
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <a href="mailto:manojkrish821@gmail.com" className="glass-card p-6 flex items-center gap-4 hover:scale-105 transition-transform scroll-reveal">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                <Mail size={28} />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="font-semibold">manojkrish821@gmail.com</p>
              </div>
            </a>

            <a href="tel:9900495241" className="glass-card p-6 flex items-center gap-4 hover:scale-105 transition-transform scroll-reveal">
              <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl">
                <Phone size={28} />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400 mb-1">Phone</p>
                <p className="font-semibold">+91 9900495241</p>
              </div>
            </a>
          </div>

          <p className="text-gray-500 scroll-reveal">
            Languages: Kannada • English • Telugu
          </p>
        </div>
      </section>

      {/* Image Modal */}
      {imageModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center modal-overlay bg-black/80 p-4"
          onClick={() => setImageModal(false)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setImageModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-purple-400 transition-colors"
            >
              <X size={32} />
            </button>
            <img
              src="/profile/manoj.JPEG"
              alt="Manoj"
              className="w-full h-auto rounded-2xl modal-image border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">
            © 2025 Manoj K M • Crafted with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;