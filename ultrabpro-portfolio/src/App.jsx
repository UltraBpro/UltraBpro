import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const currentYear = new Date().getFullYear();
  const birthYear = 2003;
  const age = currentYear - birthYear;
  const [selectedSection, setSelectedSection] = useState("home");
  const [characterSelected, setCharacterSelected] = useState(null);
  const [comboCounter, setComboCounter] = useState(0);
  const [secretModeActive, setSecretModeActive] = useState(false);
  const [healthLevel, setHealthLevel] = useState(100);
  const [showGGWP, setShowGGWP] = useState(false);
  const [codeTracker, setCodeTracker] = useState([
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
  ]);
  const [showCoinMessage, setShowCoinMessage] = useState(false);
  const [healthDepleted, setHealthDepleted] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = "Portfolio - UltraBpro";
  }, []);

  // Konami code array
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  // Projects data
  const projects = [
    {
      id: 1,
      name: "Intrusion Detection System",
      image: "https://placehold.co/200x300/222/fff?text=IDS",
      description:
        "A Django-based intrusion detection system for network security.",
      tech: ["Python", "Django", "Machine Learning"],
      link: "https://github.com/UltraBpro/Django_IDS",
    },
    {
      id: 2,
      name: "Chinese Chess",
      image: "https://placehold.co/200x300/722/fff?text=Chess",
      description:
        "A digital implementation of traditional Chinese Chess game.",
      tech: [".NET", "C#", "Game Development"],
      link: "https://github.com/UltraBpro/ChineseChessPBL4",
    },
    {
      id: 3,
      name: "Java Bullet Hell",
      image: "https://placehold.co/200x300/272/fff?text=Bullet+Hell",
      description: "A bullet hell style game developed with Java.",
      tech: ["Java", "Game Development"],
      link: "https://github.com/UltraBpro/JavaBulletHell",
    },
    {
      id: 4,
      name: "Web Attendance System",
      image: "https://placehold.co/200x300/227/fff?text=Attendance",
      description: "A web-based attendance tracking system built with Python.",
      tech: ["Python", "Web Development"],
      link: "https://github.com/UltraBpro/WebChamCongPython",
    },
    {
      id: 4,
      name: "Web Attendance System",
      image: "https://placehold.co/200x300/227/fff?text=Attendance",
      description: "A web-based attendance tracking system built with Python.",
      tech: ["Python", "Web Development"],
      link: "https://github.com/UltraBpro/WebChamCongPython",
    },
    {
      id: 4,
      name: "Web Attendance System",
      image: "https://placehold.co/200x300/227/fff?text=Attendance",
      description: "A web-based attendance tracking system built with Python.",
      tech: ["Python", "Web Development"],
      link: "https://github.com/UltraBpro/WebChamCongPython",
    },
  ];

  // Skills data
  const skills = [
    { name: "C++" },
    { name: "C#" },
    { name: "Python" },
    { name: "Java" },
    { name: "Django" },
    { name: ".NET" },
    { name: "React" },
    { name: "Unity" },
    { name: "SQL" },
  ];

  // Health bar effect
  useEffect(() => {
    if (!secretModeActive && !healthDepleted) {
      const interval = setInterval(() => {
        setHealthLevel((prev) => {
          // When health reaches zero
          if (prev <= 5) {
            setHealthDepleted(true);
            setShowCoinMessage(true);
            return 0; // Keep it at 0
          }
          // Otherwise decrease in small chunks to simulate damage
          const damage = Math.random() * 5 + 1; // Random damage between 1-6
          return Math.max(prev - damage, 0); // Can go to 0
        });
      }, 2000); // Every 2 seconds

      return () => clearInterval(interval);
    } else if (secretModeActive) {
      // Secret mode activated - restore health
      setHealthLevel(100);
      setHealthDepleted(false);
      setShowCoinMessage(false);
    }
  }, [secretModeActive, healthDepleted]);

  // Secret combo effect
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Update code tracker
      const newTracker = [...codeTracker];

      // Case-insensitive comparison for a and b keys
      const currentKey = e.key;
      const expectedKey = konamiCode[comboCounter];
      const isMatch =
        currentKey === expectedKey ||
        (currentKey.toLowerCase() === expectedKey.toLowerCase() &&
          (currentKey.toLowerCase() === "a" ||
            currentKey.toLowerCase() === "b"));

      if (isMatch) {
        // Correct key
        const nextCount = comboCounter + 1;
        setComboCounter(nextCount);

        // Update tracker with correct key (green)
        let displayKey = e.key;
        if (e.key === "ArrowUp") displayKey = "↑";
        if (e.key === "ArrowDown") displayKey = "↓";
        if (e.key === "ArrowLeft") displayKey = "←";
        if (e.key === "ArrowRight") displayKey = "→";
        if (e.key.toLowerCase() === "a") displayKey = "A";
        if (e.key.toLowerCase() === "b") displayKey = "B";

        newTracker[comboCounter] = displayKey;
        setCodeTracker(newTracker);

        if (nextCount === konamiCode.length) {
          // Activate secret mode with glitch effect
          setSecretModeActive(true);
          setHealthLevel(100); // Reset health to 100%
          document.body.classList.add("secret-mode");

          // Show GGWP message
          setShowGGWP(true);
          setTimeout(() => {
            setShowGGWP(false);
          }, 3000);

          // Create glitch sound effect
          const glitchSound = new Audio(
            "https://www.soundjay.com/mechanical/sounds/tape-recorder-1.mp3"
          );
          glitchSound.volume = 0.3;
          glitchSound.play().catch((e) => console.log("Audio play failed:", e));

          // Add temporary intense glitch
          document.body.classList.add("intense-glitch");
          setTimeout(() => {
            document.body.classList.remove("intense-glitch");
          }, 1000);

          // Reset code tracker after completion
          setTimeout(() => {
            setCodeTracker(["_", "_", "_", "_", "_", "_", "_", "_", "_", "_"]);
          }, 2000);

          setComboCounter(0);
        }
      } else {
        // Wrong key (red)
        if (comboCounter > 0) {
          // Only mark as wrong if we've started the sequence
          let displayKey = e.key;
          if (e.key === "ArrowUp") displayKey = "↑";
          if (e.key === "ArrowDown") displayKey = "↓";
          if (e.key === "ArrowLeft") displayKey = "←";
          if (e.key === "ArrowRight") displayKey = "→";
          if (e.key.toLowerCase() === "a") displayKey = "A";
          if (e.key.toLowerCase() === "b") displayKey = "B";

          newTracker[comboCounter] = displayKey;
          setCodeTracker(newTracker);

          // Reset after showing the wrong key
          setTimeout(() => {
            setCodeTracker(["_", "_", "_", "_", "_", "_", "_", "_", "_", "_"]);
          }, 500);
        }

        setComboCounter(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [comboCounter, codeTracker]);

  // Function to handle D-pad and button clicks
  const handleControlPress = (key) => {
    // Map button presses to keyboard events
    const keyMap = {
      up: "ArrowUp",
      down: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
      b: "b",
      a: "a",
    };

    // Create and dispatch a keyboard event
    const event = new KeyboardEvent("keydown", {
      key: keyMap[key],
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <div className="game-container">
      <header className="game-header">
        <h1 className="game-title">
          ULTRABPRO'S PORTFOLIO <span className="blink">↑↑↓↓←→←→BA</span>
        </h1>
        <div className="nav-buttons">
          <button
            className={`game-button ${
              selectedSection === "home" ? "active" : ""
            }`}
            onClick={() => setSelectedSection("home")}
          >
            HOME
          </button>
          <button
            className={`game-button ${
              selectedSection === "projects" ? "active" : ""
            }`}
            onClick={() => setSelectedSection("projects")}
          >
            PROJECTS
          </button>
          <button
            className={`game-button ${
              selectedSection === "about" ? "active" : ""
            }`}
            onClick={() => setSelectedSection("about")}
          >
            ABOUT
          </button>
          <button
            className={`game-button ${
              selectedSection === "contact" ? "active" : ""
            }`}
            onClick={() => setSelectedSection("contact")}
          >
            CONTACT
          </button>
        </div>
      </header>

      <main className="game-content">
        {selectedSection === "home" && (
          <div className="home-screen">
            <div className="character-intro">
              <div className="character-avatar">
                <img
                  src="102210199-lower.jpg"
                  alt="Character Avatar"
                />
              </div>
              <div className="character-info">
                {secretModeActive ? (
                  <h2 className="game-title">UltraBpro</h2>
                ) : (
                  <h2>LE VAN CHIEN</h2>
                )}
                <p className="character-tagline">
                  {secretModeActive ? (
                    <>
                      <span>FULL-STACK DEVELOPER</span>
                      <span className="tagline-separator"> | </span>
                      <span className="tagline-extra">GAME ENTHUSIAST</span>
                    </>
                  ) : (
                    "FULL-STACK DEVELOPER"
                  )}
                </p>

                <p className="character-description">
                  Welcome to my portfolio! I'm a passionate developer with
                  expertise in web development, game programming, and software
                  engineering. I love creating innovative solutions and tackling
                  challenging problems.
                </p>
                <div className="social-buttons">
                  <a
                    href="https://github.com/UltraBpro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon github"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon youtube"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="currentColor"
                        d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="currentColor"
                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                      />
                    </svg>
                  </a>
                  <button
                    className="start-button"
                    onClick={() => setSelectedSection("projects")}
                  >
                    START
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedSection === "projects" && (
          <div className="projects-screen">
            <h2 className="section-title">SELECT YOUR PROJECT</h2>
            
            {characterSelected ? (
              <div className="project-details">
                <button
                  className="back-button"
                  onClick={() => setCharacterSelected(null)}
                >
                  BACK
                </button>
                <div className="project-card-large">
                  <img
                    src={characterSelected.image}
                    alt={characterSelected.name}
                  />
                  <div className="project-info">
                    <h3>{characterSelected.name}</h3>
                    <p>{characterSelected.description}</p>
                    <div className="tech-stack">
                      <h4>TECH STACK:</h4>
                      <ul>
                        {characterSelected.tech.map((tech, index) => (
                          <li key={index}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={characterSelected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-button"
                    >
                      VIEW PROJECT
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="character-select-container">
                <div className="character-select" id="projectsContainer">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="character-card"
                      onClick={() => setCharacterSelected(project)}
                    >
                      <img src={project.image} alt={project.name} />
                      <h3>{project.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSection === "about" && (
          <div className="about-screen">
            <h2 className="section-title">FIGHTER PROFILE</h2>
            <div className="bio-container">
              <div className="bio-left">
                <div className="bio-stats">
                  <div className="bio-stat">
                    <span>LEVEL</span>
                    <span>{age}</span>
                  </div>
                  <div className="bio-stat">
                    <span>CLASS</span>
                    <span>DEVELOPER</span>
                  </div>
                  <div className="bio-stat">
                    <span>SPECIALTY</span>
                    <span>FULL STACK</span>
                  </div>
                </div>
                
                <div className="skills-section">
                  <h3 className="skills-title">SKILL SET</h3>
                  
                  <div className="skill-category">
                    <h4>LANGUAGES</h4>
                    <div className="skills-container">
                      <div className="skill-badge"><span className="skill-name">C++</span></div>
                      <div className="skill-badge"><span className="skill-name">C#</span></div>
                      <div className="skill-badge"><span className="skill-name">Python</span></div>
                      <div className="skill-badge"><span className="skill-name">Java</span></div>
                      <div className="skill-badge"><span className="skill-name">JavaScript</span></div>
                    </div>
                  </div>
                  
                  <div className="skill-category">
                    <h4>FRAMEWORKS</h4>
                    <div className="skills-container">
                      <div className="skill-badge"><span className="skill-name">React</span></div>
                      <div className="skill-badge"><span className="skill-name">Django</span></div>
                      <div className="skill-badge"><span className="skill-name">.NET</span></div>
                      <div className="skill-badge"><span className="skill-name">Node.js</span></div>
                    </div>
                  </div>
                  
                  <div className="skill-category">
                    <h4>TOOLS</h4>
                    <div className="skills-container">
                      <div className="skill-badge"><span className="skill-name">Git</span></div>
                      <div className="skill-badge"><span className="skill-name">Docker</span></div>
                      <div className="skill-badge"><span className="skill-name">SQL</span></div>
                      <div className="skill-badge"><span className="skill-name">Unity</span></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bio-text">
                <h3>WORK EXPERIENCE</h3>
                <div className="work-experience">
                  <div className="work-item">
                    <div className="work-header">
                      <h4>Full Stack Developer</h4>
                      <span className="work-period">2022 - Present</span>
                    </div>
                    <div className="work-company">TechVision Solutions</div>
                    <p className="work-description">
                      Developed and maintained web applications using React, Node.js, and MongoDB.
                      Implemented responsive designs and optimized application performance.
                      Collaborated with cross-functional teams to deliver high-quality software solutions.
                    </p>
                  </div>
                </div>

                <h3>EDUCATION</h3>
                <div className="education-list">
                  <div className="education-item">
                    <div className="education-header">
                      <h4>Bachelor of Computer Science</h4>
                      <span className="education-period">2020 - 2024</span>
                    </div>
                    <div className="education-school">
                      Da Nang University of Science and Technology
                    </div>
                    <div className="education-description">
                      Focused on web development, algorithms, and software engineering principles.
                    </div>
                  </div>
                </div>

                <h3>CERTIFICATIONS</h3>
                <div className="certification-list">
                  <div className="certification-item">
                    <div className="certification-header">
                      <h4>Web Development Certification</h4>
                      <span className="certification-date">2022</span>
                    </div>
                    <div className="certification-issuer">FreeCodeCamp</div>
                    <p className="certification-description">
                      Completed full-stack web development curriculum covering modern JavaScript frameworks.
                    </p>
                  </div>
                  <div className="certification-item">
                    <div className="certification-header">
                      <h4>React Developer Certification</h4>
                      <span className="certification-date">2023</span>
                    </div>
                    <div className="certification-issuer">Meta</div>
                    <p className="certification-description">
                      Advanced React concepts including hooks, context API, and performance optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedSection === "contact" && (
          <div className="contact-screen">
            <h2 className="section-title">CHALLENGE ME</h2>
            <div className="versus-screen">
              <div className="player-side">
                <img
                  src="https://placehold.co/200x300/333/fff?text=YOU"
                  alt="Player"
                />
                <h3>CHALLENGER</h3>
              </div>
              <div className="vs-symbol">VS</div>
              <div className="opponent-side">
                <img
                  src="https://placehold.co/200x300/333/fff?text=CHIEN"
                  alt="Opponent"
                />
                <h3>ULTRABPRO</h3>
              </div>
            </div>

            <div className="contact-form">
              <div className="form-group">
                <label>YOUR NAME</label>
                <input type="text" placeholder="ENTER YOUR NAME" />
              </div>
              <div className="form-group">
                <label>YOUR EMAIL</label>
                <input type="email" placeholder="ENTER YOUR EMAIL" />
              </div>
              <div className="form-group">
                <label>YOUR MESSAGE</label>
                <textarea placeholder="TYPE YOUR MESSAGE HERE"></textarea>
              </div>
              <button className="fight-button">FIGHT! (SEND MESSAGE)</button>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">EMAIL:</span>
                  <span className="contact-value">your.email@example.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">PHONE:</span>
                  <span className="contact-value">+84 123 456 789</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">LOCATION:</span>
                  <span className="contact-value">Da Nang, Vietnam</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {showGGWP && (
        <div className="ggwp-message">
          <div className="ggwp-title">GGWP</div>
          <div className="ggwp-subtitle">GOOD GAME WELL PROGRAMMED</div>
        </div>
      )}

      <footer className="game-footer">
        <div className="footer-content">
          <div className="footer-left">
            {/* D-pad controller */}
            <div className="controller-dpad">
              <button
                className="dpad-button dpad-up"
                onClick={() => handleControlPress("up")}
              >
                ↑
              </button>
              <div className="dpad-middle">
                <button
                  className="dpad-button dpad-left"
                  onClick={() => handleControlPress("left")}
                >
                  ←
                </button>
                <div className="dpad-center"></div>
                <button
                  className="dpad-button dpad-right"
                  onClick={() => handleControlPress("right")}
                >
                  →
                </button>
              </div>
              <button
                className="dpad-button dpad-down"
                onClick={() => handleControlPress("down")}
              >
                ↓
              </button>
            </div>
          </div>
          <p>© 2025 Le Van Chien. All rights reserved.</p>

          <div className="code-tracker">
            {codeTracker.map((key, index) => (
              <span
                key={index}
                className={`code-key ${
                  key !== "_"
                    ? index < comboCounter
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
              >
                {key}
              </span>
            ))}
          </div>

          <div className="footer-right">
            {/* Action buttons */}
            <div className="controller-buttons">
              <button
                className="action-button button-a"
                onClick={() => handleControlPress("a")}
              >
                A
              </button>
              <button
                className="action-button button-b"
                onClick={() => handleControlPress("b")}
              >
                B
              </button>
            </div>
          </div>
        </div>

        <div className="health-bar">
          <div
            className="health-fill"
            style={{ width: `${healthLevel}%` }}
          ></div>
        </div>

        {showCoinMessage && (
          <div className="coin-message">
            Insert coin ... or perhaps there is a cheat code somewhere *wink*
          </div>
        )}
      </footer>
    </div>
  );
}

export default App;
