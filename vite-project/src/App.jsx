import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, Briefcase, GraduationCap, Award, Folder, Moon, Sun, ExternalLink, ChevronDown } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.z -= 2;
        if (this.z <= 0) {
          this.z = 1000;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }

      draw() {
        const scale = 1000 / (1000 + this.z);
        const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = this.size * scale;

        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = darkMode ? 'rgba(139, 92, 246, 0.8)' : 'rgba(99, 102, 241, 0.6)';
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
  }, [darkMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'React.js', level: 90, icon: '⚛️' },
    { name: 'Node.js', level: 85, icon: '🟢' },
    { name: 'Express.js', level: 85, icon: '🚂' },
    { name: 'MongoDB', level: 80, icon: '🍃' },
    { name: 'HTML/CSS/JS', level: 95, icon: '🎨' },
    { name: 'SQL', level: 75, icon: '🗄️' },
    { name: 'Core Java', level: 70, icon: '☕' },
  ];

  const projects = [
    {
      title: 'Placement Eligibility Portal',
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind'],
      description: 'Full-stack MERN application with role-based authentication, secure REST APIs, and responsive dashboards for managing student profiles and placement operations.',
      highlights: ['Role-based Auth', 'REST APIs', 'Responsive UI']
    },
    {
      title: 'Secure Keyword Search System',
      tech: ['Java', 'MySQL', 'Encryption'],
      description: 'Web-based security system enabling encrypted keyword search with advanced authentication and encryption modules for cloud data protection.',
      highlights: ['Data Encryption', 'User Auth', 'Secure Search']
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .card-3d {
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-3d:hover {
          transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
        }
        
        .gradient-border {
          position: relative;
          background: ${darkMode ? '#111827' : '#ffffff'};
          border-radius: 1rem;
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          padding: 2px;
          background: linear-gradient(135deg, #8b5cf6, #ec4899, #3b82f6);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        
        .skill-bar {
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-glass {
          backdrop-filter: blur(20px) saturate(180%);
          background: ${darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
        }
      `}</style>

      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'nav-glass shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Manoj K M
          </h1>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-purple-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-purple-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-purple-500 transition-colors">Projects</a>
            <a href="#education" className="hover:text-purple-500 transition-colors">Education</a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center px-6 relative pt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-block">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                👋 Welcome to my portfolio
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Hi, I'm <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">Manoj</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-purple-500">
              MERN Stack Developer
            </h2>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Crafting dynamic, user-friendly web applications with cutting-edge technologies. Passionate about clean code, innovative solutions, and continuous learning.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#projects" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105">
                View Projects
              </a>
              <a href="#contact" className={`px-8 py-4 rounded-lg font-semibold border-2 transition-all transform hover:scale-105 ${darkMode ? 'border-purple-500 hover:bg-purple-500/10' : 'border-purple-600 hover:bg-purple-50'}`}>
                Contact Me
              </a>
            </div>
            <div className="flex gap-4 pt-4">
              <a href="https://github.com/manuu-manoj" target="_blank" rel="noopener noreferrer"
                className={`p-3 rounded-lg transition-all hover:scale-110 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow-md'}`}>
                <Github size={24} />
              </a>
              <a href="www.linkedin.com/in/manoj-k-m-454346258" target="_blank" rel="noopener noreferrer"
                className={`p-3 rounded-lg transition-all hover:scale-110 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow-md'}`}>
                <Linkedin size={24} />
              </a>
              <a href="mailto:manojkrish821@gmail.com"
                className={`p-3 rounded-lg transition-all hover:scale-110 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow-md'}`}>
                <Mail size={24} />
              </a>
              <a href="tel:9900495241"
                className={`p-3 rounded-lg transition-all hover:scale-110 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow-md'}`}>
                <Phone size={24} />
              </a>
            </div>
          </div>

          <div className="relative float-animation">
            <div className="w-full aspect-square relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full blur-3xl opacity-30"></div>
              <div className={`relative w-full h-full rounded-3xl ${darkMode ? 'bg-gray-900' : 'bg-white'} p-8 shadow-2xl`}>
                <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-9xl">
                  <img
                    src="/profile/manoj.JPEG"
                    alt="Manoj"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-purple-500" />
        </div>
      </section>

      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-5xl font-bold mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`gradient-border p-8 card-3d fade-in ${darkMode ? 'bg-gray-900' : 'bg-white shadow-xl'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Briefcase size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Objective</h3>
              </div>
              <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                To start my career as a MERN Stack Developer where I can apply my full-stack JavaScript skills to build dynamic, user-friendly web applications and continuously learn emerging technologies.
              </p>
            </div>

            <div className={`gradient-border p-8 card-3d fade-in ${darkMode ? 'bg-gray-900' : 'bg-white shadow-xl'}`}>
              <h3 className="text-2xl font-bold mb-6">Soft Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Quick Learner', 'Team Player', 'Leadership', 'Time Management', 'Adaptable', 'Problem Solver'].map((skill, i) => (
                  <div key={i} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <div className="text-purple-500 mb-2">✓</div>
                    <p className="font-semibold text-sm">{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className={`py-32 px-6 relative z-10 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-5xl font-bold mb-4">Technical Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className={`fade-in p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{skill.icon}</span>
                    <h3 className="text-xl font-bold">{skill.name}</h3>
                  </div>
                  <span className="text-purple-500 font-bold">{skill.level}%</span>
                </div>
                <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  <div
                    className="skill-bar h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-5xl font-bold mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className={`gradient-border p-8 card-3d fade-in ${darkMode ? 'bg-gray-900' : 'bg-white shadow-xl'}`}>
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Folder size={32} className="text-white" />
                  </div>
                  <ExternalLink size={24} className="text-purple-500 cursor-pointer hover:scale-110 transition-transform" />
                </div>

                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className={`mb-6 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span key={i} className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className={`py-32 px-6 relative z-10 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-5xl font-bold mb-4">Education & Certifications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'MCA', school: 'CMR University', year: '2023-2025', icon: '🎓' },
              { title: 'BCA', school: 'East Point College', year: '2019-2022', icon: '📚' },
              { title: 'PUC', school: 'BGS PU College', year: '2017-2019', icon: '📖' }
            ].map((edu, i) => (
              <div key={i} className={`fade-in p-6 rounded-xl text-center card-3d ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}>
                <div className="text-5xl mb-4">{edu.icon}</div>
                <h3 className="text-xl font-bold mb-2">{edu.title}</h3>
                <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{edu.school}</p>
                <p className="text-purple-500 font-semibold">{edu.year}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'MERN Full Stack Development', org: 'Jspiders' },
              { title: 'Unlock the Power of Linux', org: 'CMR University' }
            ].map((cert, i) => (
              <div key={i} className={`fade-in p-6 rounded-xl flex items-center gap-4 ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}>
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex-shrink-0">
                  <Award size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{cert.title}</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{cert.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in">
            <h2 className="text-5xl font-bold mb-6">Let's Work Together</h2>
            <p className={`text-xl mb-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              I'm currently looking for new opportunities. Let's connect!
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <a href="mailto:manojkrish821@gmail.com" className={`p-6 rounded-xl flex items-center gap-4 hover:scale-105 transition-transform ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}>
                <Mail className="text-purple-500 flex-shrink-0" size={32} />
                <div className="text-left">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                  <p className="font-semibold">manojkrish821@gmail.com</p>
                </div>
              </a>

              <a href="tel:9900495241" className={`p-6 rounded-xl flex items-center gap-4 hover:scale-105 transition-transform ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}>
                <Phone className="text-purple-500 flex-shrink-0" size={32} />
                <div className="text-left">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone</p>
                  <p className="font-semibold">+91 9900495241</p>
                </div>
              </a>
            </div>

            <p className={darkMode ? 'text-gray-500' : 'text-gray-400'}>
              Languages: Kannada • English • Telugu
            </p>
          </div>
        </div>
      </section>

      <footer className={`py-8 px-6 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={darkMode ? 'text-gray-500' : 'text-gray-600'}>
            © 2025 Manoj K M. Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;