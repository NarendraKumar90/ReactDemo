import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import cover from './assets/react.svg';
import backImg from './assets/portfolioback.png';
import profile from "./assets/profile.png";
import crt from "/certificates.pdf";
import resumePDF from "/narendra1.pdf";
import Typed from "typed.js";

export default function Portfolio() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Added for mobile toggle
  const [messages, setMessages] = useState([
    { text: "Hi 👋 I'm Narendra's AI assistant. Ask me anything!", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  // ================= TYPED =================
  const typedRef = useRef(null);
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Narendra Kumar", "Full Stack Developer", "UI/UX Designer", "Problem Solver"],
      typeSpeed: 70,
      backSpeed: 40,
      loop: true,
      cursorChar: '|',
    });
    return () => typed.destroy();
  }, []);

  // ================= SCROLL =================
  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false); // Close menu on mobile after clicking
  };

  // ================= DATE & TIME =================
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ================= CHATBOT LOGIC =================
  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: "user" };
    let reply = "I’ll get back to you soon 😊";
    if (input.toLowerCase().includes("contact"))
      reply = "📞 Call: 9027080827\n📧 Email: narenkumar9027@gmail.com";
    if (input.toLowerCase().includes("project"))
      reply = "Check out the Projects section below! 🚀";
    if (input.toLowerCase().includes("resume"))
      reply = "You can download my resume from the Resume section 📄";

    const botMsg = { text: reply, sender: "bot" };
    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div style={{ backgroundColor: "#0f172a", color: "#f8fafc", minHeight: "100vh" }}>

      {/* MOBILE TOGGLE BUTTON */}
      <button 
        className="btn btn-info d-lg-none position-fixed top-0 start-0 m-3 shadow-lg" 
        style={{ zIndex: 2001, borderRadius: "10px" }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <i className={`bi ${isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'} text-white fs-4`}></i>
      </button>

      {/* SIDEBAR HEADER */}
      <header className={`sidebar-container ${isMobileMenuOpen ? 'mobile-show' : ''}`}
        style={{
          width: "280px",
          background: "rgba(15, 23, 42, 0.95)",
          borderRight: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          zIndex: 2000,
          height: "100vh",
          position: "fixed"
        }}>
        <div className="text-center py-5">
          <div className="position-relative d-inline-block">
            <img
              src={profile}
              alt="Narendra"
              className="rounded-circle shadow-lg"
              style={{ width: "130px", border: "4px solid #38bdf8", padding: "4px" }}
            />
            <div className="position-absolute bottom-0 end-0 bg-success rounded-circle" style={{ width: "18px", height: "18px", border: "3px solid #0f172a" }}></div>
          </div>
          <h4 className="mt-3 fw-bold tracking-tight text-white">Narendra Kumar</h4>
          <p className="text-info small fw-medium">Available for Hire</p>
        </div>

        <nav className="px-4 mt-2">
          {[
            { id: "hero", icon: "bi-house", label: "Home" },
            { id: "about", icon: "bi-person", label: "About" },
            { id: "resume", icon: "bi-file-earmark-text", label: "Resume" },
            { id: "portfolio", icon: "bi-grid", label: "Projects" },
            { id: "contact", icon: "bi-envelope", label: "Contact" }
          ].map((item) => (
            <button key={item.id} onClick={() => handleScroll(item.id)}
              className="btn w-100 text-start text-white mb-2 py-2 px-3 border-0 rounded-3 nav-hover-btn">
              <i className={`${item.icon} me-3 text-info`}></i> {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* TOP BAR CLOCK */}
      <div className="position-fixed top-0 end-0 p-3 clock-display" style={{ zIndex: 1100 }}>
        <div className="px-3 py-2 rounded-pill shadow-lg border border-secondary border-opacity-25"
          style={{ background: "rgba(30, 41, 59, 0.8)", backdropFilter: "blur(8px)", fontSize: "0.85rem", color: "#ffffff" }}>
          <i className="bi bi-clock me-2 text-info"></i> {currentDateTime}
        </div>
      </div>

      <main className="main-wrapper-responsive">

      {/* HERO SECTION */}

<section 
  id="hero" 
  className="position-relative overflow-hidden d-flex align-items-center"
  style={{ 
    height: "100vh", // Use height for desktop stability
    minHeight: "-webkit-fill-available", // Use this for mobile browser stability
    width: "100%" 
  }}
>
  {/* Background Layer */}
  <div 
    className="position-absolute top-0 start-0 w-100 h-100" 
    style={{ 
      zIndex: 0,
      // Added quotes around the URL variable to prevent path errors on laptops
      backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,1) 100%), url("${backImg}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  ></div>

  {/* Content Layer */}
  <div className="container position-relative" style={{ zIndex: 10 }}>
    <div className="row flex-column flex-lg-row align-items-center text-center text-lg-start">
      
      {/* Main Title Area */}
      <div className="col-12 col-lg-8">
        <div className="mb-2">
          <h1 className="fw-bolder text-white tracking-tighter" style={{ fontSize: "clamp(2rem, 8vw, 4rem)" }}>
            <span style={{ color: "#38bdf8", fontSize: "0.5em", display: "block" }}>Hello, I'm</span>
            Narendra
          </h1>
        </div>
        
        {/* Typed Text Area */}
        <div className="mb-4">
          <div className="py-2 px-4 rounded-3 d-inline-block" 
               style={{ 
                 background: "rgba(15, 23, 42, 0.7)", 
                 border: "1px solid rgba(56, 189, 248, 0.3)", 
                 backdropFilter: "blur(8px)" 
               }}>
            <span className="fs-5 fs-md-4 fw-light text-white">
              Professional <span ref={typedRef} style={{ color: "#38bdf8", fontWeight: "bold" }}></span>
            </span>
          </div>
        </div>
      </div>

      {/* Button Area */}
      <div className="col-12 col-lg-4 mt-3 mt-lg-0">
        <button 
          onClick={() => handleScroll("portfolio")} 
          className="btn btn-outline-info btn-lg px-4 py-3 rounded-pill fw-bold shadow-lg text-white d-flex align-items-center gap-2 mx-auto ms-lg-auto"
        >
          View My Projects <i className="bi bi-arrow-right"></i>
        </button>
      </div>

    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-lg-none" style={{ zIndex: 10 }}>
     <i className="bi bi-chevron-double-down text-info fs-2 animate-bounce"></i>
  </div>
</section>


        {/* ABOUT SECTION */}
        <section id="about" className="py-5 px-3">
          <div className="container py-5 border-bottom border-secondary border-opacity-10">
            <div className="row gy-5 align-items-center">
              <div className="col-lg-5 text-center">
                <div className="p-2 bg-dark rounded-4 shadow-lg d-inline-block">
                  <img src={profile} className="img-fluid rounded-4" alt="Narendra Kumar" style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }} />
                </div>
              </div>
              <div className="col-lg-7">
                <h2 className="display-5 fw-bold mb-4 text-white">Architect of Digital Solutions</h2>
                <p className="lead text-info mb-4">Full Stack Developer based .</p>
                <p className="fs-5" style={{ color: "#cbd5e1", lineHeight: "1.6" }}>
                  I specialize in building robust, scalable applications using modern stacks like <strong style={{ color: "#38bdf8" }}>React, Node.js, and Spring Boot</strong>.
                  My focus is on creating seamless user experiences with high-performance backends.
                </p>

                <div className="row mt-4 g-3">
                  {[{ label: "Location", val: "Bulandshahr, UP" }, { label: "Email", val: "naren@narendrakumarsingh.in" }, { label: "Education", val: "B.Tech CSE (2025)" }, { label: "Availability", val: "Open to Work" }].map((info, i) => (
                    <div className="col-sm-6" key={i}>
                      <div className="p-3 rounded-3" style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <span className="text-info fw-bold d-block">{info.label}</span>
                        <span style={{ color: "#ffffff" }}>{info.val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section id="stats" className="py-5" style={{ background: "#020617" }}>
          <div className="container">
            <div className="row g-4 text-center">
              {[
                { count: "10+", label: "Projects", icon: "bi-code-slash", color: "text-primary" },
                { count: "5+", label: "Certifications", icon: "bi-patch-check", color: "text-success" },
                { count: "1200+", label: "Coding Hours", icon: "bi-clock-history", color: "text-warning" },
                { count: "8", label: "Core Skills", icon: "bi-cpu", color: "text-danger" }
              ].map((stat, i) => (
                <div key={i} className="col-6 col-lg-3">
                  <div className="p-4 rounded-4 shadow-sm h-100" style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <i className={`bi ${stat.icon} fs-1 ${stat.color} mb-3 d-block`}></i>
                    <h3 className="fw-bold text-white">{stat.count}</h3>
                    <p style={{ color: "#cbd5e1" }} className="mb-0 small">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-5 px-3">
          <div className="container">
            <h2 className="display-6 fw-bold mb-5 text-center text-white">Technical Arsenal</h2>
            <div className="row g-4">
              <div className="col-lg-6">
                {[
                  { name: "React.js / Frontend", value: 90 },
                  { name: "Node.js / Express", value: 85 },
                  { name: "Spring Boot / Java", value: 80 },
                  { name: "PostgreSQL / SQL", value: 75 }
                ].map((skill, i) => (
                  <div className="mb-4" key={i}>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold text-white">{skill.name}</span>
                      <span className="text-info">{skill.value}%</span>
                    </div>
                    <div className="progress rounded-pill" style={{ height: "8px", background: "#334155" }}>
                      <div className="progress-bar bg-info shadow-sm" style={{ width: `${skill.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-lg-6">
                {[
                  { name: "JavaScript / TypeScript", value: 85 },
                  { name: "Bootstrap / Tailwind", value: 95 },
                  { name: "Git / Version Control", value: 90 },
                  { name: "UI Design (Figma)", value: 70 }
                ].map((skill, i) => (
                  <div className="mb-4" key={i}>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold text-white">{skill.name}</span>
                      <span className="text-info">{skill.value}%</span>
                    </div>
                    <div className="progress rounded-pill" style={{ height: "8px", background: "#334155" }}>
                      <div className="progress-bar bg-info shadow-sm" style={{ width: `${skill.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RESUME SECTION */}
        <section id="resume" className="py-5" style={{ background: "#0f172a" }}>
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold display-6 text-white">Resume</h2>
              <div className="mt-4 d-flex flex-wrap justify-content-center gap-2">
                <a href={resumePDF} target="_blank" rel="noreferrer" className="btn btn-outline-info px-4 py-2 rounded-pill fw-bold">View PDF</a>
                <a href={crt} target="_blank" rel="noreferrer" className="btn btn-info text-white px-4 py-2 rounded-pill fw-bold shadow">Certifications</a>
              </div>
            </div>
            <div className="row g-4 mt-2">
              <div className="col-lg-6">
                <div className="p-4 border-start border-3 border-info h-100" style={{ background: "#1e293b" }}>
                  <h4 className="text-info">Summary</h4>
                  <h5 className="text-white">Narendra Kumar</h5>
                  <p style={{ color: "#cbd5e1" }}>Innovative and result-oriented Full Stack Developer with experience in creating responsive and database-driven web applications.</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="p-4 border-start border-3 border-info h-100" style={{ background: "#1e293b" }}>
                  <h4 className="text-info">Education</h4>
                  <h5 className="text-white">B.Tech - Computer Science</h5>
                  <p className="mb-0 text-white-50">2021 - 2025</p>
                  <p style={{ color: "#cbd5e1" }} className="small">Dr. A.P.J. Abdul Kalam Technical University</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="portfolio" className="py-5 px-3">
          <div className="container">
            <h2 className="text-center display-6 fw-bold mb-5 text-white">Featured Works</h2>
            <div className="row g-4">
              {[
                { title: "E-Book", img: "/ebook.png", link: "https://narenbook.netlify.app/", desc: "React & Bootstrap" },
                { title: "DG Menu", img: "/menu.png", link: "https://narendra-exp.netlify.app/", desc: "NodeJs & PostgreSQL" },
                { title: "RD System", img: "/rd.png", link: "https://narendra-exp.netlify.app/", desc: "Spring Boot Enterprise" },
                { title: "Expense Tracker", img: "/exp.png", link: "https://narendra-exp.netlify.app/", desc: "Financial UI" },
                { title: "Bhoo Measure", img: "/bho.png", link: "https://narendra9027.netlify.app/", desc: "Calculation Engine" },
                { title: "Modern Portfolio", img: "/portfoli.png", link: "https://narendrakumarsingh.netlify.app/", desc: "Advanced UI/UX" }
              ].map((proj, idx) => (
                <div className="col-lg-4 col-md-6" key={idx}>
                  <div className="card h-100 border-0 shadow-lg overflow-hidden nav-hover-btn" style={{ background: "#1e293b" }}>
                    <img src={proj.img} className="card-img-top" alt={proj.title} style={{ height: "200px", objectFit: "cover" }} />
                    <div className="card-body p-4 text-center">
                      <h5 className="fw-bold text-white">{proj.title}</h5>
                      <p className="small text-info mb-3">{proj.desc}</p>
                      <a href={proj.link} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-info rounded-pill px-4">Live Preview</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-5 px-3" style={{ background: "#020617" }}>
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-5">
                <div className="p-4 rounded-4 shadow-lg" style={{ background: "#1e293b" }}>
                  <h3 className="fw-bold mb-4 text-white">Contact Info</h3>
                  
                  <div className="d-flex mb-4">
                    <i className="bi bi-geo-alt fs-3 text-info me-3"></i>
                    <div>
                      <h6 className="mb-1 text-white fw-bold">Address</h6>
                      <p style={{ color: "#cbd5e1", margin: "0" }}>Bulandshahr, UP, India</p>
                    </div>
                  </div>

                  <div className="d-flex mb-4">
                    <i className="bi bi-envelope fs-3 text-info me-3"></i>
                    <div>
                      <h6 className="mb-1 text-white fw-bold">Email</h6>
                      <p style={{ color: "#cbd5e1", margin: "0" }}>naren@narendrakumarsingh.in</p>
                    </div>
                  </div>

                 <iframe
    title="Google Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112100.00000000000!2d77.8480!3d28.4070!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b39678e07971b%3A0x6e269229e0618035!2sBulandshahr%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }} // Dark mode filter
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
                </div>
              </div>

              <div className="col-lg-7">
                <form className="p-4 rounded-4 shadow-lg h-100" style={{ background: "#1e293b" }}
                  onSubmit={(e) => { e.preventDefault(); alert("Message Sent Successfully! ✅"); }}>
                  <h3 className="fw-bold mb-4 text-white">Send a Message</h3>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small text-info">Your Name</label>
                      <input type="text" className="form-control bg-dark text-white border-0 py-2 px-3" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small text-info">Your Email</label>
                      <input type="email" className="form-control bg-dark text-white border-0 py-2 px-3" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label small text-info">Subject</label>
                      <input type="text" className="form-control bg-dark text-white border-0 py-2 px-3" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label small text-info">Message</label>
                      <textarea className="form-control bg-dark text-white border-0 py-2 px-3" rows="4" required></textarea>
                    </div>
                    <div className="col-12 text-center mt-4">
                      <button type="submit" className="btn btn-info btn-lg w-100 text-white fw-bold py-3 rounded-pill shadow">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-5 border-top border-secondary border-opacity-10">
          <div className="container">
            <h4 className="fw-bold text-white mb-3">Narendra Kumar</h4>
            <div className="d-flex justify-content-center gap-3 mb-4">
              <a href="https://www.linkedin.com/in/narendra-kumar-2b3737218/" className="btn btn-outline-info rounded-circle"><i className="bi bi-linkedin"></i></a>
              <a href="https://github.com/NarendraKumar90" className="btn btn-outline-info rounded-circle"><i className="bi bi-github"></i></a>
            </div>
            <p style={{ color: "#64748b" }} className="small mb-0">© 2025 Narendra Portfolio. All Rights Reserved.</p>
          </div>
        </footer>
      </main>

      {/* FLOATING ACTION ELEMENTS */}
      <a href="https://wa.me/919027080827" target="_blank" rel="noreferrer"
        className="position-fixed bottom-0 end-0 m-3 m-md-4 btn btn-success rounded-pill px-3 px-md-4 py-2 shadow-lg fw-bold d-flex align-items-center"
        style={{ zIndex: 1000, marginBottom: "90px" }}>
        <i className="bi bi-whatsapp me-2 fs-5"></i> <span className="d-none d-md-inline">WhatsApp</span>
      </a>

      <button onClick={() => setIsChatOpen(!isChatOpen)}
        className="position-fixed bottom-0 end-0 m-3 m-md-4 btn btn-info rounded-circle shadow-lg d-flex align-items-center justify-content-center"
        style={{ width: "60px", height: "60px", zIndex: 2000 }}>
        <i className={`bi ${isChatOpen ? 'bi-x-lg' : 'bi-robot'} fs-4 text-white`}></i>
      </button>

      {/* CHATBOX */}
      {isChatOpen && (
        <div className="position-fixed bottom-0 end-0 m-2 m-md-4 mb-5 pb-5 animate-fade-in shadow-lg chat-box-responsive"
          style={{ background: "#1e293b", borderRadius: "20px", zIndex: 1999, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
          <div className="bg-info p-3 text-white fw-bold d-flex justify-content-between align-items-center">
            <span><i className="bi bi-stars me-2"></i> Assistant</span>
            <span onClick={() => setIsChatOpen(false)} style={{ cursor: "pointer" }}><i className="bi bi-dash-lg"></i></span>
          </div>
          <div className="p-3 overflow-auto d-flex flex-column gap-3" style={{ height: "340px", background: "#0f172a" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
                <div className={`p-2 px-3 rounded-4 small ${msg.sender === "user" ? "bg-info text-white" : "bg-secondary text-white"}`} style={{ maxWidth: "80%" }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 bg-dark d-flex gap-2">
            <input className="form-control border-0 bg-transparent text-white small"
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me..." />
            <button onClick={sendMessage} className="btn btn-info text-white rounded-circle"><i className="bi bi-send-fill"></i></button>
          </div>
        </div>
      )}

      <style>{`
        .nav-hover-btn { transition: all 0.3s ease; background: transparent; }
        .nav-hover-btn:hover { background: rgba(56, 189, 248, 0.1) !important; color: #38bdf8 !important; transform: translateX(10px); }
        .card:hover { transform: translateY(-10px); border: 1px solid rgba(56, 189, 248, 0.3) !important; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        /* RESPONSIVE FIXES */
        .main-wrapper-responsive { margin-left: 280px; transition: 0.3s; }
        .chat-box-responsive { width: 350px; height: 480px; }

        @media (max-width: 991.98px) {
          .main-wrapper-responsive { margin-left: 0; }
          .sidebar-container { transform: translateX(-100%); transition: 0.3s; }
          .sidebar-container.mobile-show { transform: translateX(0); }
          .hero-title { font-size: 2.5rem !important; }
          .clock-display { display: none; }
          .chat-box-responsive { width: 300px; height: 400px; }
        }
      `}</style>
    </div>
  );
}