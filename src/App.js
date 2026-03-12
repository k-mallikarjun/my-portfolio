import { useState, useEffect, useRef } from "react";
import profilePhoto from "./assets/profile.jpg";

// Matrix Rain Canvas
function MatrixRain({ opacity = 1 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const fontSize = 13;
    const cols = Math.floor(W / fontSize);
    const drops = Array(cols).fill(1);
    const chars = "01001101010011010100110101001101010011010100110101001101";

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${fontSize}px 'Courier New', monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const green = Math.random() > 0.95 ? "#fff" : Math.random() > 0.7 ? "#00ff41" : "#003b00";
        ctx.fillStyle = green;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }}
    />
  );
}

// Skill Tag
function Tag({ label, color = "#00ff41" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Courier New', monospace",
        fontSize: "0.82rem",
        padding: "5px 14px",
        borderRadius: "3px",
        border: `1px solid ${hovered ? color : "#1a2a1a"}`,
        background: hovered ? `${color}18` : "#070f07",
        color: hovered ? color : "#5a8a5a",
        cursor: "default",
        transition: "all 0.2s",
        letterSpacing: "0.04em",
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
}

export default function Portfolio() {
  const [activeSection] = useState("hero");
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navItems = ["about", "skills", "experience", "education"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#010801", color: "#c8e6c9", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 48px",
        background: "rgba(1,8,1,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #0a1f0a",
      }}>
        <span style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "1.15rem",
          color: "#00ff41",
          fontWeight: "bold",
          letterSpacing: "0.1em",
        }}>
          {glitch ? "M̷K̶" : "MK"}
        </span>
        <div style={{ display: "flex", gap: "32px" }}>
          {navItems.map(s => (
            <button key={s} onClick={() => scrollTo(s)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Courier New', monospace",
              fontSize: "0.87rem",
              color: activeSection === s ? "#00ff41" : "#3a6a3a",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#00ff41"}
              onMouseLeave={e => e.target.style.color = activeSection === s ? "#00ff41" : "#3a6a3a"}
            >
              {s}
            </button>
          ))}
        </div>
        <a href="mailto:mallikarjunkotupalli@gmail.com" style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "0.85rem",
          color: "#000",
          background: "#00ff41",
          padding: "8px 18px",
          borderRadius: "3px",
          textDecoration: "none",
          letterSpacing: "0.08em",
          fontWeight: "bold",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.target.style.background = "#fff"; }}
          onMouseLeave={e => { e.target.style.background = "#00ff41"; }}
        >
          HIRE ME
        </a>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}>
        <MatrixRain opacity={0.55} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,20,0,0.6) 0%, rgba(1,8,1,0.9) 70%)",
        }} />

        <div style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "40px",
          maxWidth: "1000px", padding: "0 40px", textAlign: "center",
        }}>
          {/* Photo */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{
              width: "220px", height: "220px",
              borderRadius: "50%",
              border: "3px solid #00ff41",
              overflow: "hidden",
              boxShadow: "0 0 40px rgba(0,255,65,0.3), 0 0 80px rgba(0,255,65,0.1)",
              position: "relative",
            }}>
              <img src={profilePhoto} alt="Mallikarjun"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%", transform: "scale(1.15) translateY(-8%)" }} />
            </div>
            {/* Open to work badge */}
            <div style={{
              position: "absolute", bottom: "-8px", left: "50%", transform: "translateX(-50%)",
              background: "#00ff41", color: "#000",
              fontFamily: "'Courier New', monospace",
              fontSize: "0.75rem", fontWeight: "bold",
              padding: "4px 14px", borderRadius: "20px",
              letterSpacing: "0.12em", whiteSpace: "nowrap",
              boxShadow: "0 0 16px rgba(0,255,65,0.5)",
            }}>
              #OPENTOWORK
            </div>
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: "280px", textAlign: "center" }}>
            <div style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.87rem", color: "#00ff41",
              letterSpacing: "0.2em", textTransform: "uppercase",
              marginBottom: "16px", opacity: 0.8,
            }}>
              &gt; Full-Stack Java Developer
            </div>
            <h1 style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: "900",
              lineHeight: 1.1,
              margin: "0 0 8px",
              color: "#fff",
              textShadow: glitch ? "2px 0 #00ff41, -2px 0 #ff0040" : "0 0 30px rgba(0,255,65,0.3)",
              transition: "text-shadow 0.1s",
            }}>
              Mallikarjun<br />
              <span style={{ color: "#00ff41" }}>Kotupalli</span>
            </h1>
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "1rem", color: "#4a7a4a",
              marginBottom: "28px", lineHeight: 1.6,
            }}>
              &gt; Telecom Domain · Spring Boot · React · Vue.js · AWS
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px", justifyContent: "center" }}>
              <a href="mailto:mallikarjunkotupalli@gmail.com" style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.9rem", letterSpacing: "0.08em",
                padding: "12px 28px",
                background: "#00ff41", color: "#000", fontWeight: "bold",
                borderRadius: "3px", textDecoration: "none",
                boxShadow: "0 0 20px rgba(0,255,65,0.3)",
                transition: "all 0.2s",
              }}>
                GET IN TOUCH
              </a>
              <a href="https://www.linkedin.com/in/mallikarjun-kotupalli-12323818b" target="_blank" rel="noreferrer" style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.9rem", letterSpacing: "0.08em",
                padding: "12px 28px",
                background: "transparent", color: "#00ff41",
                border: "1px solid #00ff41",
                borderRadius: "3px", textDecoration: "none",
                transition: "all 0.2s",
              }}>
                LINKEDIN ↗
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
              {[["3+", "Years Exp"], ["2", "Companies"], ["MS", "CS Degree"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: "2rem", fontWeight: "900", color: "#00ff41", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.75rem", color: "#3a6a3a", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          fontFamily: "'Courier New', monospace", fontSize: "0.78rem",
          color: "#2a5a2a", letterSpacing: "0.15em",
          animation: "pulse 2s infinite",
        }}>
          ▼ SCROLL
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ maxWidth: "1000px", margin: "0 auto", padding: "100px 40px" }}>
        <SectionHeader num="01" title="About Me" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
          <div>
            <p style={{ color: "#7aaa7a", lineHeight: 1.85, marginBottom: "20px", fontSize: "1.05rem" }}>
              A <span style={{ color: "#00ff41" }}>Full-Stack Java Developer</span> with over three years of industry experience delivering scalable, production-ready applications. Proficient across the full development lifecycle — from architecting microservices with Spring Boot to building responsive user interfaces in React.js and Vue.js, with hands-on cloud deployment on AWS.
            </p>
            <p style={{ color: "#7aaa7a", lineHeight: 1.85, marginBottom: "20px", fontSize: "1.05rem" }}>
              Throughout my tenure at <span style={{ color: "#c8e6c9" }}>Tata Consultancy Services</span> and <span style={{ color: "#c8e6c9" }}>Wipro Limited</span>, I worked in the <span style={{ color: "#00ff41" }}>Telecommunications domain</span> — delivering a Product Catalog platform for a leading Scandinavian telecom provider and enterprise backend systems for a major UK telecom operator, gaining deep experience in large-scale telecom architectures across both Agile and Waterfall delivery models.
            </p>
            <p style={{ color: "#7aaa7a", lineHeight: 1.85, fontSize: "1.05rem" }}>
              Currently advancing my academic foundation through a <span style={{ color: "#00ff41" }}>Master of Science in Computer Science</span> at Southern Illinois University Edwardsville, deepening my expertise in modern software engineering and distributed systems.
            </p>
          </div>
          <div>
            <InfoRow icon="✉" label="mallikarjunkotupalli@gmail.com" href="mailto:mallikarjunkotupalli@gmail.com" />
            <InfoRow icon="📍" label="Edwardsville, IL 62025" />
            <InfoRow icon="🎓" label="MS Computer Science — SIUE" />
            <InfoRow icon="💼" label="linkedin.com/in/mallikarjun-kotupalli" href="https://www.linkedin.com/in/mallikarjun-kotupalli-12323818b" />
          </div>
        </div>
      </section>

      <Divider />

      {/* ── SKILLS ── */}
      <section id="skills" style={{ background: "#020c02", padding: "100px 0" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHeader num="02" title="Technical Skills" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {[
              { title: "Languages", tags: ["Java 8+", "JavaScript ES6+", "HTML5", "CSS3", "SQL", "C"], color: "#00ff41" },
              { title: "Frontend", tags: ["React.js", "Vue.js", "Responsive Design", "ES6+", "Component Libraries"], color: "#00e5ff" },
              { title: "Backend", tags: ["Spring Boot", "Spring Data JPA", "Spring Security", "Spring Cloud", "Microservices", "REST APIs"], color: "#7b61ff" },
              { title: "Cloud & DevOps", tags: ["AWS EKS", "EC2", "S3", "Lambda", "Docker", "Kubernetes", "Jenkins", "CI/CD"], color: "#ff9800" },
              { title: "Databases", tags: ["MySQL", "MongoDB"], color: "#00ff41" },
              { title: "Tools", tags: ["Git", "SonarQube", "Grafana", "Kibana", "Postman", "Swagger", "JUnit", "Mockito"], color: "#00e5ff" },
            ].map(g => (
              <SkillGroup key={g.title} {...g} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ maxWidth: "1000px", margin: "0 auto", padding: "100px 40px" }}>
        <SectionHeader num="03" title="Experience" />
        <div style={{ borderLeft: "1px solid #0a2a0a", paddingLeft: "32px" }}>
          <ExpItem
            date="Jan 2023 — Dec 2023"
            company="Tata Consultancy Services · Hyderabad, India"
            client="Client: Leading Scandinavian Telecom Provider"
            role="Systems Engineer"
            points={[
              "Delivered a full-stack Telecom Product Catalog platform — managing product offers, service bundles, and electronics inventory for a leading Scandinavian telecom provider",
              "Built React.js internal dashboards for product managers to view, search, filter, and manage the live product catalog database in real time",
              "Developed Vue.js customer-facing storefronts enabling end-users to browse products, compare offers, and select telecom services",
              "Architected Spring Boot microservices powering both internal and external product APIs, ensuring consistent and reliable data across all channels",
              "Implemented CI/CD pipelines via Jenkins, Docker & AWS EKS enabling zero-downtime deployments across all product catalog environments",
              "Actively participated in Agile/Scrum ceremonies — sprint planning, daily stand-ups, and retrospectives — ensuring iterative and on-time delivery",
            ]}
            tags={["Java 8","Spring Boot","React.js","Vue.js","Microservices","REST APIs","Docker","Kubernetes","AWS EKS","Jenkins","MySQL","MongoDB"]}
          />
          <ExpItem
            date="Mar 2021 — Jan 2023"
            company="Wipro Limited · Hyderabad, India"
            client="Client: Major UK Telecom Operator"
            role="Project Engineer"
            points={[
              "Engineered enterprise backend systems for a major UK telecom operator — integrating billing, network provisioning, and CRM platforms to support large-scale subscriber operations",
              "Built secure Spring Boot REST APIs with Spring Data JPA and Spring Security to handle core telecom business logic and customer data",
              "Implemented middleware integration using webMethods 10.x to connect the operator's disparate enterprise systems — billing, CRM, and network provisioning",
              "Designed Publish/Subscribe JMS event-driven architecture for real-time communication between network and business components",
              "Delivered all project phases following a structured Waterfall methodology — requirements, design, development, testing, and deployment",
            ]}
            tags={["Java 8","Spring Boot","Spring Data JPA","Spring Security","REST APIs","webMethods 10.x","JMS","MySQL","Maven"]}
          />
        </div>
      </section>

      <Divider />

      {/* ── EDUCATION ── */}
      <section id="education" style={{ background: "#020c02", padding: "100px 0" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 40px" }}>
          <SectionHeader num="04" title="Education" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <EduCard
              degree="Master of Science in Computer Science"
              school="Southern Illinois University Edwardsville"
              period="Jan 2024 — Dec 2025 · Edwardsville, IL"
            />
            <EduCard
              degree="B.Tech — Electronics & Communication Engineering"
              school="Malla Reddy Institute of Engineering & Technology"
              period="Jan 2016 — Sep 2020 · Hyderabad, India"
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid #0a2a0a",
        padding: "40px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
      }}>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: "1rem", color: "#2a5a2a" }}>
          Mallikarjun Kotupalli
        </span>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.82rem", color: "#1a3a1a", letterSpacing: "0.1em" }}>
          FULL-STACK JAVA DEVELOPER · EDWARDSVILLE, IL
        </span>
        <a href="https://www.linkedin.com/in/mallikarjun-kotupalli-12323818b" target="_blank" rel="noreferrer"
          style={{ fontFamily: "'Courier New', monospace", fontSize: "0.82rem", color: "#2a6a2a", letterSpacing: "0.08em", textDecoration: "none" }}>
          LINKEDIN ↗
        </a>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
      `}</style>
    </div>
  );
}

function SectionHeader({ num, title }) {
  return (
    <div style={{ marginBottom: "48px" }}>
      <div style={{
        fontFamily: "'Courier New', monospace", fontSize: "0.82rem",
        color: "#00ff41", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px",
      }}>
        {num} —
      </div>
      <h2 style={{
        fontFamily: "'Courier New', monospace", fontSize: "clamp(2rem, 3.5vw, 3rem)",
        fontWeight: "900", color: "#fff", margin: 0, letterSpacing: "-0.01em",
      }}>
        {title}<span style={{ color: "#00ff41" }}>_</span>
      </h2>
    </div>
  );
}

function InfoRow({ icon, label, href }) {
  const content = (
    <div style={{
      display: "flex", alignItems: "center", gap: "12px",
      fontFamily: "'Courier New', monospace", fontSize: "0.9rem",
      color: href ? "#00ff41" : "#4a7a4a",
      marginBottom: "16px", letterSpacing: "0.03em",
    }}>
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
  if (href) return <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>{content}</a>;
  return content;
}

function SkillGroup({ title, tags, color }) {
  return (
    <div style={{
      background: "#030f03", border: "1px solid #0a1f0a",
      borderRadius: "8px", padding: "24px",
      transition: "border-color 0.3s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = color}
      onMouseLeave={e => e.currentTarget.style.borderColor = "#0a1f0a"}
    >
      <div style={{
        fontFamily: "'Courier New', monospace", fontSize: "0.82rem",
        color, letterSpacing: "0.15em", textTransform: "uppercase",
        marginBottom: "16px", paddingBottom: "10px",
        borderBottom: "1px solid #0a2a0a",
      }}>
        {title}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {tags.map(t => <Tag key={t} label={t} color={color} />)}
      </div>
    </div>
  );
}

function ExpItem({ date, company, client, role, points, tags }) {
  return (
    <div style={{ position: "relative", marginBottom: "56px" }}>
      <div style={{
        position: "absolute", left: "-36px", top: "8px",
        width: "9px", height: "9px", borderRadius: "50%",
        background: "#00ff41", boxShadow: "0 0 10px #00ff41",
      }} />
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "4px", alignItems: "center" }}>
        <span style={{
          fontFamily: "'Courier New', monospace", fontSize: "0.82rem",
          color: "#00ff41", background: "rgba(0,255,65,0.08)",
          padding: "3px 10px", borderRadius: "3px", letterSpacing: "0.08em",
        }}>{date}</span>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.85rem", color: "#2a5a2a" }}>{company}</span>
      </div>
      <div style={{
        fontFamily: "'Courier New', monospace", fontSize: "1.3rem",
        fontWeight: "900", color: "#fff", marginBottom: "16px",
      }}>{role}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
        {points.map((p, i) => (
          <li key={i} style={{
            fontFamily: "'Courier New', monospace", fontSize: "0.95rem",
            color: "#4a7a4a", paddingLeft: "20px", position: "relative",
            marginBottom: "8px", lineHeight: 1.7,
          }}>
            <span style={{ position: "absolute", left: 0, color: "#00ff41" }}>›</span>
            {p}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {tags.map(t => (
          <span key={t} style={{
            fontFamily: "'Courier New', monospace", fontSize: "0.75rem",
            padding: "3px 8px", borderRadius: "2px",
            background: "rgba(123,97,255,0.08)", border: "1px solid rgba(123,97,255,0.2)",
            color: "#6a5aaa",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function EduCard({ degree, school, period }) {
  return (
    <div style={{
      background: "#030f03", border: "1px solid #0a1f0a",
      borderRadius: "8px", padding: "28px",
      transition: "border-color 0.3s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "#7b61ff"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "#0a1f0a"}
    >
      <div style={{ fontFamily: "'Courier New', monospace", fontWeight: "900", fontSize: "1.05rem", color: "#c8e6c9", marginBottom: "8px" }}>{degree}</div>
      <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.92rem", color: "#7b61ff", marginBottom: "6px" }}>{school}</div>
      <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.82rem", color: "#2a5a2a", letterSpacing: "0.06em" }}>{period}</div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #0a2a0a 30%, #0a2a0a 70%, transparent)" }} />;
}
