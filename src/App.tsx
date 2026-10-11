import { useEffect, useRef, useState } from "react"

type IconName = "arrow" | "briefcase" | "check" | "chevron" | "code" | "database" | "external" | "github" | "globe" | "graduation" | "linkedin" | "mail" | "map" | "menu" | "moon" | "phone" | "server" | "sun" | "terminal" | "x"

const iconPaths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m8 10 4 4 4-4" />,
  code: (
    <>
      <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6" />
    </>
  ),
  github: (
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 1.8a13.4 13.4 0 0 0-7 0C4.8.1 3.7.5 3.7.5A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4M8 19c-3 .9-3-1.5-4-2" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  graduation: (
    <>
      <path d="m2 10 10-5 10 5-10 5z" />
      <path d="M6 12.5V17c3 2.7 9 2.7 12 0v-4.5M22 10v6" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v2a4.5 4.5 0 0 1 2-2z" />
      <path d="M2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  map: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  moon: <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5a8.5 8.5 0 1 0 12 12Z" />,
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  ),
  server: (
    <>
      <rect x="3" y="3" width="18" height="7" rx="2" />
      <rect x="3" y="14" width="18" height="7" rx="2" />
      <path d="M7 6.5h.01M7 17.5h.01" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  terminal: (
    <>
      <path d="m4 7 5 5-5 5M12 17h8" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6 6 18" />,
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  )
}

const navItems = [
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Achievements",
  "Contact",
]

function ButtonLink({
  href,
  children,
  variant = "primary",
  icon,
  download,
}: {
  href: string
  children: React.ReactNode
  variant?: "primary" | "outline" | "quiet"
  icon?: IconName
  download?: boolean
}) {
  return (
    <a className={`button button-${variant}`} href={href} download={download}>
      {children}
      {icon && <Icon name={icon} size={17} />}
    </a>
  )
}

function SectionHeading({
  label,
  title,
  intro,
}: {
  label: string
  title: string
  intro?: string
}) {
  return (
    <header className="section-heading reveal">
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </header>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>
}

function CountUp({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number
  suffix?: string
  decimals?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setCount(value)
          observer.disconnect()
          return
        }
        const start = performance.now()
        const duration = 1100
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          setCount(value * (1 - Math.pow(1 - progress, 3)))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.35 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

function CodeVisual() {
  return (
    <div
      className="hero-visual"
      aria-label="Abstract code interface illustration"
    >
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="code-card">
        <div className="window-bar">
          <span />
          <span />
          <span />
          <span className="window-title">portfolio.tsx</span>
        </div>
        <div className="code-lines" aria-hidden="true">
          <p>
            <i>01</i>
            <span className="c-purple">const</span> developer = &#123;
          </p>
          <p>
            <i>02</i>&nbsp;&nbsp;name: <span className="c-cyan">'Vivek'</span>,
          </p>
          <p>
            <i>03</i>&nbsp;&nbsp;role:{" "}
            <span className="c-cyan">'Software Engineer'</span>,
          </p>
          <p>
            <i>04</i>&nbsp;&nbsp;focus: [
            <span className="c-cyan">'clean code'</span>,{" "}
            <span className="c-cyan">'speed'</span>],
          </p>
          <p>
            <i>05</i>&nbsp;&nbsp;problemsSolved: <strong>750</strong>,
          </p>
          <p>
            <i>06</i>&#125;;
          </p>
          <p className="code-return">
            <i>07</i>
            <span className="c-purple">return</span> developer.build();
            <b />
          </p>
        </div>
      </div>
      <div className="floating-chip chip-react">
        <span>R</span> React
      </div>
      <div className="floating-chip chip-java">
        <span>J</span> Java
      </div>
    </div>
  )
}

function ProjectPreview({ type }: { type: "github" | "student" }) {
  return (
    <div className={`project-preview preview-${type}`}>
      <div className="browser">
        <div className="browser-top">
          <span />
          <span />
          <span />
          <div className="address">
            vivek.dev/{type === "github" ? "github-finder" : "student-system"}
          </div>
        </div>
        {type === "github" ? (
          <div className="github-ui">
            <div className="mock-search">
              <Icon name="github" size={16} />
              <span>Search GitHub username...</span>
              <b>Search</b>
            </div>
            <div className="mock-profile">
              <div className="mock-avatar">VK</div>
              <div className="mock-info">
                <strong>Developer profile</strong>
                <span>@username</span>
                <div>
                  <i>Repositories&nbsp; 24</i>
                  <i>Followers&nbsp; 128</i>
                </div>
              </div>
            </div>
            <div className="mock-repos">
              <span />
              <span />
              <span />
            </div>
          </div>
        ) : (
          <div className="terminal-ui">
            <div>
              <span>$</span> java StudentManagement
            </div>
            <p>STUDENT MANAGEMENT SYSTEM</p>
            <ol>
              <li>
                <b>01</b> Add student record
              </li>
              <li>
                <b>02</b> View all students
              </li>
              <li>
                <b>03</b> Update student
              </li>
              <li>
                <b>04</b> Search records
              </li>
            </ol>
            <div className="terminal-prompt">
              <span>Choose an option:</span>
              <i />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    localStorage.getItem("theme") === "light" ? "light" : "dark",
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState("about")

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal")
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("visible"),
        ),
      { threshold: 0.12 },
    )
    reveals.forEach((item) => revealObserver.observe(item))

    const sections = document.querySelectorAll("main section[id]")
    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActive(entry.target.id),
        ),
      { rootMargin: "-30% 0px -60% 0px" },
    )
    sections.forEach((section) => sectionObserver.observe(section))
    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <nav className="nav-shell" aria-label="Primary navigation">
        <div className="nav-inner">
          <a className="logo" href="#top" aria-label="Vivek, back to top">
            VK<span>.</span>
          </a>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            {navItems.map((item) => (
              <a
                key={item}
                className={active === item.toLowerCase() ? "active" : ""}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <button
              className="icon-button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
            </button>
            <ButtonLink href="/resume.pdf" variant="outline" download>
              Resume <Icon name="arrow" size={15} />
            </ButtonLink>
            <button
              className="icon-button menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              <Icon name={menuOpen ? "x" : "menu"} size={21} />
            </button>
          </div>
        </div>
      </nav>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid container">
            <div className="hero-copy reveal visible">
              <div className="availability">
                <span /> Open to SDE Internships · 2026
              </div>
              <p className="hero-kicker">
                Hi, I&apos;m Vivek — CS undergraduate &amp; developer
              </p>
              <h1>
                I build fast, clean web experiences and solve{" "}
                <span>hard problems.</span>
              </h1>
              <p className="hero-sub">
                Computer Science undergrad at Aditya University with strong DSA
                fundamentals, 750+ LeetCode problems solved, and hands-on React
                and Java projects.
              </p>
              <div className="hero-actions">
                <ButtonLink href="#projects" icon="arrow">
                  View Projects
                </ButtonLink>
                <ButtonLink href="#contact" variant="outline">
                  Contact Me
                </ButtonLink>
              </div>
              <div className="social-links" aria-label="Social links">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Icon name="github" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Icon name="linkedin" />
                </a>
                <a
                  href="mailto:vivekboyina77@gmail.com"
                  aria-label="Email Vivek"
                >
                  <Icon name="mail" />
                </a>
              </div>
            </div>
            <CodeVisual />
          </div>
        </section>

        <section className="stats-section" aria-label="Key statistics">
          <div className="stats-grid container reveal">
            <article>
              <strong>
                <CountUp value={750} suffix="+" />
              </strong>
              <span>LeetCode problems solved</span>
            </article>
            <article>
              <strong>
                Top <CountUp value={14} suffix="%" />
              </strong>
              <span>LeetCode global ranking</span>
            </article>
            <article>
              <strong>
                <CountUp value={8.64} decimals={2} /> <small>/ 10</small>
              </strong>
              <span>B.Tech CGPA</span>
            </article>
            <article>
              <strong>
                <CountUp value={5} suffix="★" />
              </strong>
              <span>HackerRank · C++ &amp; SQL</span>
            </article>
          </div>
        </section>

        <section className="section container" id="about">
          <div className="about-grid">
            <div>
              <SectionHeading
                label="01 / About"
                title="Engineering with intent."
              />
              <div className="about-copy reveal">
                <p>
                  I&apos;m a Computer Science undergraduate grounded in Data
                  Structures, Algorithms, OOP, Operating Systems, and DBMS. I
                  turn those fundamentals into practical software using Java,
                  C++, and JavaScript.
                </p>
                <p>
                  From responsive React interfaces and REST API integrations to
                  structured console applications in core Java, I care about
                  readable code, thoughtful details, and products that work
                  well.
                </p>
              </div>
            </div>
            <aside className="facts-card glass reveal">
              <div className="card-topline">
                <span className="eyebrow">Quick facts</span>
                <span className="status-dot" />
              </div>
              <dl>
                <div>
                  <dt>
                    <Icon name="graduation" size={18} /> Education
                  </dt>
                  <dd>
                    Aditya University
                    <br />
                    <span>B.Tech CSE · 2024–Present</span>
                  </dd>
                </div>
                <div>
                  <dt>
                    <Icon name="map" size={18} /> Location
                  </dt>
                  <dd>India</dd>
                </div>
                <div>
                  <dt>
                    <Icon name="briefcase" size={18} /> Focus
                  </dt>
                  <dd>SDE / Frontend</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section className="section container" id="skills">
          <SectionHeading
            label="02 / Skills"
            title="Tools I use to ship."
            intro="A focused toolkit backed by strong computer science fundamentals."
          />
          <div className="bento-grid">
            <article className="skill-card skill-languages glass reveal">
              <div className="skill-icon">
                <Icon name="code" />
              </div>
              <span className="eyebrow">Languages</span>
              <h3>Core building blocks</h3>
              <p>Writing efficient, maintainable software across paradigms.</p>
              <div className="tags">
                <Tag>C++</Tag>
                <Tag>Java</Tag>
                <Tag>JavaScript</Tag>
              </div>
              <div className="code-decoration">public static void build()</div>
            </article>
            <article className="skill-card glass reveal">
              <div className="skill-icon">
                <Icon name="globe" />
              </div>
              <span className="eyebrow">Web</span>
              <h3>Modern interfaces</h3>
              <div className="tags">
                <Tag>HTML5</Tag>
                <Tag>CSS3</Tag>
                <Tag>React</Tag>
                <Tag>MySQL</Tag>
              </div>
            </article>
            <article className="skill-card skill-core glass reveal">
              <div className="skill-icon">
                <Icon name="database" />
              </div>
              <span className="eyebrow">Core CS</span>
              <h3>Built on fundamentals</h3>
              <div className="tags">
                <Tag>Data Structures</Tag>
                <Tag>Algorithms</Tag>
                <Tag>OOP</Tag>
                <Tag>Operating Systems</Tag>
                <Tag>DBMS</Tag>
              </div>
            </article>
            <article className="skill-card glass reveal">
              <div className="skill-icon">
                <Icon name="terminal" />
              </div>
              <span className="eyebrow">Tools</span>
              <h3>Daily workflow</h3>
              <div className="tags">
                <Tag>Git</Tag>
                <Tag>GitHub</Tag>
                <Tag>VS Code</Tag>
                <Tag>Linux · CLI/Bash</Tag>
              </div>
            </article>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="container">
            <SectionHeading
              label="03 / Selected work"
              title="Projects with purpose."
              intro="Applications built to solve real problems with clean architecture and dependable user experiences."
            />
            <article className="project-card glass reveal">
              <ProjectPreview type="github" />
              <div className="project-copy">
                <span className="project-number">01 — Web application</span>
                <h3>GitHub Profile Finder</h3>
                <p className="project-pitch">
                  A fast, responsive way to explore any developer&apos;s GitHub
                  footprint.
                </p>
                <ul>
                  <li>
                    <Icon name="check" size={17} /> Search any GitHub user and
                    view profile stats and top repositories through the GitHub
                    REST API.
                  </li>
                  <li>
                    <Icon name="check" size={17} /> Async API handling with
                    considered loading and error states for invalid usernames.
                  </li>
                  <li>
                    <Icon name="check" size={17} /> Reusable, props-driven React
                    components, deployed on Vercel.
                  </li>
                </ul>
                <div className="tags">
                  <Tag>React</Tag>
                  <Tag>Tailwind CSS</Tag>
                  <Tag>HTML</Tag>
                  <Tag>REST API</Tag>
                </div>
                <div className="project-actions">
                  <ButtonLink
                    href="https://vercel.com"
                    variant="outline"
                    icon="external"
                  >
                    Live Demo
                  </ButtonLink>
                  <ButtonLink
                    href="https://github.com"
                    variant="quiet"
                    icon="github"
                  >
                    GitHub
                  </ButtonLink>
                </div>
              </div>
            </article>
            <article className="project-card project-reverse glass reveal">
              <ProjectPreview type="student" />
              <div className="project-copy">
                <span className="project-number">02 — Console application</span>
                <h3>Student Management System</h3>
                <p className="project-pitch">
                  A structured Java application for dependable student record
                  management.
                </p>
                <ul>
                  <li>
                    <Icon name="check" size={17} /> Full CRUD workflow: add,
                    view, update, delete, and search student records.
                  </li>
                  <li>
                    <Icon name="check" size={17} /> OOP design with separated
                    model, business logic, and execution layers.
                  </li>
                  <li>
                    <Icon name="check" size={17} /> File-handling persistence
                    keeps records available across sessions.
                  </li>
                </ul>
                <div className="tags">
                  <Tag>Java</Tag>
                  <Tag>OOP</Tag>
                  <Tag>File Handling</Tag>
                </div>
                <div className="project-actions">
                  <ButtonLink
                    href="https://github.com"
                    variant="quiet"
                    icon="github"
                  >
                    GitHub
                  </ButtonLink>
                </div>
              </div>
            </article>
            <a
              className="more-projects reveal"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <i /> More projects coming soon
              </span>
              <span>
                Follow the build log on GitHub <Icon name="arrow" size={17} />
              </span>
            </a>
          </div>
        </section>

        <section className="section container" id="experience">
          <SectionHeading
            label="04 / Experience"
            title="Learning by building."
          />
          <div className="timeline reveal">
            <div className="timeline-marker">
              <span />
            </div>
            <article className="experience-card">
              <div className="experience-meta">
                <span className="eyebrow">Feb 2026 — May 2026</span>
                <span>Remote · India</span>
              </div>
              <h3>Web Developer Intern</h3>
              <h4>Abhyaz</h4>
              <ul>
                <li>
                  Redesigned the Abhyaz Services webpage in Zoho Sites to
                  improve layout and usability.
                </li>
                <li>
                  Reorganized service content and page sections for better
                  readability and navigation.
                </li>
                <li>
                  Built and submitted the redesigned page for review and
                  feedback.
                </li>
              </ul>
              <div className="tags">
                <Tag>Zoho Sites</Tag>
                <Tag>Web Design</Tag>
              </div>
            </article>
          </div>
        </section>

        <section className="section achievements-section" id="achievements">
          <div className="container">
            <SectionHeading
              label="05 / Achievements"
              title="Progress, measured."
            />
            <div className="achievement-grid">
              {[
                [
                  "08%",
                  "AlgoUniversity",
                  "Top 8% · ATF Scholarship Exam, 2025",
                  "graduation",
                ],
                ["14%", "LeetCode", "Top 14% · 750+ problems solved", "code"],
                ["2★", "CodeChef", "2★ Coder · Rating 1400+", "terminal"],
                ["5★", "HackerRank", "5★ in C++ and SQL", "server"],
              ].map(([metric, platform, text, icon]) => (
                <a
                  className="achievement-card glass reveal"
                  href={
                    platform === "LeetCode"
                      ? "https://leetcode.com"
                      : platform === "CodeChef"
                        ? "https://codechef.com"
                        : platform === "HackerRank"
                          ? "https://hackerrank.com"
                          : "https://algouniversity.com"
                  }
                  target="_blank"
                  rel="noreferrer"
                  key={platform}
                >
                  <div className="achievement-head">
                    <span>
                      <Icon name={icon as IconName} />
                    </span>
                    <Icon name="external" size={16} />
                  </div>
                  <strong>{metric}</strong>
                  <h3>{platform}</h3>
                  <p>{text}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section container education-section" id="education">
          <SectionHeading label="06 / Education" title="Academic foundation." />
          <div className="education-card glass reveal">
            <article>
              <div className="education-icon">
                <Icon name="graduation" />
              </div>
              <div>
                <h3>Aditya University</h3>
                <p>B.Tech · Computer Science &amp; Engineering</p>
                <span>2024 — Present</span>
              </div>
              <strong>
                8.64 <small>/ 10 CGPA</small>
              </strong>
            </article>
            <article>
              <div className="education-icon">
                <Icon name="graduation" />
              </div>
              <div>
                <h3>Sri Chaitanya Junior College</h3>
                <p>Class XII</p>
                <span>2022 — 2024</span>
              </div>
              <strong>
                96.6<small>%</small>
              </strong>
            </article>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-inner container reveal">
            <span className="eyebrow">07 / Let&apos;s connect</span>
            <h2>
              Let&apos;s build something
              <br />
              <span>great together.</span>
            </h2>
            <p>
              I&apos;m open to SDE internships, frontend opportunities, and
              conversations about building thoughtful products.
            </p>
            <div className="contact-actions">
              <ButtonLink href="mailto:vivekboyina77@gmail.com" icon="mail">
                vivekboyina77@gmail.com
              </ButtonLink>
              <ButtonLink
                href="tel:+918106464623"
                variant="outline"
                icon="phone"
              >
                8106464623
              </ButtonLink>
            </div>
            <div className="contact-social">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={18} /> LinkedIn{" "}
                <Icon name="external" size={14} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <Icon name="github" size={18} /> GitHub{" "}
                <Icon name="external" size={14} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <p>© 2026 Boyina Veera Venkata Vivek</p>
          <p>Designed &amp; built with clarity.</p>
          <a href="#top">
            Back to top <Icon name="arrow" size={15} />
          </a>
        </div>
      </footer>
    </>
  )
}

export default App
