/**
 * Boyina Veera Venkata Vivek (Vivek / VK) Portfolio Data
 * Central configuration file for easy editing of profile info, projects, links, and text.
 */

export const PLACEHOLDER_LINKEDIN_URL = "https://linkedin.com/in/boyina-veera-venkata-vivek";
export const GITHUB_URL = "https://github.com/vivekboyina";
export const LEETCODE_URL = "https://leetcode.com/u/vivekboyina";
export const CODECHEF_URL = "https://www.codechef.com/users/vivekboyina";
export const HACKERRANK_URL = "https://www.hackerrank.com/profile/vivekboyina77";
export const RESUME_URL = "/resume.pdf";
export const EMAIL_ADDRESS = "vivekboyina77@gmail.com";
export const PHONE_NUMBER = "8106464623";
export const PORTRAIT_IMAGE = "/portrait.png";

export const STUDENT_MGMT_PROJECT_URL = "https://github.com/vivekboyina/student-management-system";
export const GITHUB_FINDER_PROJECT_URL = "https://github-finder-livid-pi.vercel.app";
export const GITHUB_FINDER_REPO_URL = "https://github.com/vivekboyina/Github-Finder";

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string[];
  techTags: string[];
  primaryLink: string;
  primaryLabel: string;
  githubLink?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  techTags: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  scoreLabel: string;
  stream?: string;
  status?: string;
  step?: number;
  coordinates?: { lat: number; lng: number; label: string };
  coursework?: string[];
  highlights?: string[];
  details?: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  description: string;
  link?: string;
  linkLabel?: string;
  metricLabel: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    fullName: "Boyina Veera Venkata Vivek",
    nickname: "Vivek / VK / VIBO",
    shortName: "VIVEK",
    title: "Computer Science Undergraduate | Aspiring Software Engineer",
    email: EMAIL_ADDRESS,
    phone: PHONE_NUMBER,
    location: "India",
    resumeUrl: RESUME_URL,
    linkedinUrl: PLACEHOLDER_LINKEDIN_URL,
    githubUrl: GITHUB_URL,
    leetcodeUrl: LEETCODE_URL,
    codechefUrl: CODECHEF_URL,
    hackerrankUrl: HACKERRANK_URL,
    avatarSrc: PORTRAIT_IMAGE,
    avatarFallback: PORTRAIT_IMAGE,
  },

  about: {
    lead: "Computer Science undergraduate at Aditya University seeking a Software Engineering Internship.",
    bio: "Strong fundamentals in Data Structures, Algorithms, OOP, OS, and DBMS, with practical experience in Java, C++, and JavaScript. Built full-stack and console-based applications using React, REST APIs, and core Java. Ranked in the Top 14% on LeetCode with 750+ problems solved across data structures, graph theory, dynamic programming, and systems design fundamentals.",
    highlights: [
      { label: "Institution", value: "Aditya University (B.Tech CSE)" },
      { label: "Academic CGPA", value: "8.64 / 10" },
      { label: "Problem Solving", value: "750+ LeetCode (Top 14%)" },
      { label: "Core Focus", value: "Software Engineering & Systems" },
    ],
  },

  skills: [
    {
      category: "Programming Languages",
      items: ["C++", "Java", "JavaScript"],
    },
    {
      category: "Web Technologies",
      items: ["HTML5", "CSS3", "MySQL", "React"],
    },
    {
      category: "Core Computer Science",
      items: [
        "Data Structures",
        "Algorithms",
        "OOP",
        "Operating Systems",
        "DBMS",
      ],
    },
    {
      category: "Developer Tools",
      items: ["Git", "GitHub", "VS Code", "Linux (CLI/Bash)"],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "student-management-system",
      title: "Student Management System",
      subtitle: "Console Application | Core Java & OOP",
      description: [
        "Console-based Student Management System with full CRUD operations (add, view, update, delete, search).",
        "Designed with OOP principles: encapsulation and a modular class structure across model, logic, and execution layers.",
        "File handling for persistent storage, reading and writing student records to a local file so data survives across sessions.",
      ],
      techTags: ["Java", "OOP", "File Handling", "CRUD", "Modular Design"],
      primaryLink: STUDENT_MGMT_PROJECT_URL,
      primaryLabel: "View Project",
      githubLink: STUDENT_MGMT_PROJECT_URL,
      featured: true,
    },
    {
      id: "github-profile-finder",
      title: "GitHub Profile Finder",
      subtitle: "Full-Stack Client | React & Tailwind CSS",
      description: [
        "React application to search GitHub users and display profile stats and top repositories using the GitHub REST API.",
        "Async/await API calls with loading and error state handling for invalid usernames.",
        "Reusable components with props-based data flow, deployed on Vercel.",
      ],
      techTags: [
        "HTML",
        "Tailwind CSS",
        "React",
        "GitHub REST API",
        "Async/Await",
        "Vercel",
      ],
      primaryLink: GITHUB_FINDER_PROJECT_URL,
      primaryLabel: "Live Demo",
      githubLink: GITHUB_FINDER_REPO_URL,
      featured: true,
    },
  ] as ProjectItem[],

  experience: [
    {
      id: "abhyaz-internship",
      role: "Web Developer Intern",
      company: "Abhyaz",
      location: "Remote, India",
      period: "Feb 2026 – May 2026",
      bullets: [
        "Redesigned the Abhyaz Services webpage using Zoho Sites to improve layout and usability.",
        "Organized service content and page sections to enhance readability and navigation.",
        "Developed and submitted the redesigned webpage for review and feedback.",
      ],
      techTags: ["Zoho Sites", "Web Design", "UI/UX", "Content Architecture"],
    },
  ] as ExperienceItem[],

  education: [
    {
      id: "sri-chaitanya",
      step: 1,
      degree: "Class XII (Intermediate)",
      institution: "Sri Chaitanya Junior College",
      location: "Visakhapatnam, Andhra Pradesh",
      period: "June 2022 – April 2024",
      score: "96.6%",
      scoreLabel: "Final Aggregate",
      stream: "MPC (Mathematics, Physics & Chemistry)",
      status: "Completed (Top Tier Aggregate)",
      coordinates: { lat: 17.6868, lng: 83.2185, label: "Visakhapatnam, AP" },
      coursework: [
        "Advanced Calculus & Algebra",
        "Mechanics & Electromagnetism",
        "Physical & Organic Chemistry",
        "Analytical Problem Solving",
      ],
      highlights: [
        "Scored 96.6% final aggregate in Andhra Pradesh State Intermediate Board examinations.",
        "Graduated in the top percentile of the graduating cohort with distinction in Mathematics.",
        "Formed solid foundations in quantitative aptitude and computational reasoning.",
      ],
      details: [
        "Majored in Mathematics, Physics, and Chemistry (MPC).",
        "Graduated in the top tier of the graduating cohort.",
      ],
    },
    {
      id: "aditya-university",
      step: 2,
      degree: "B.Tech in Computer Science Engineering",
      institution: "Aditya University",
      location: "Surampalem, Andhra Pradesh",
      period: "Aug 2024 – Present",
      score: "8.64 / 10",
      scoreLabel: "Current CGPA",
      stream: "Computer Science & Engineering",
      status: "Currently Enrolled (Active)",
      coordinates: { lat: 17.0864, lng: 82.0673, label: "Surampalem, AP" },
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming (Java & C++)",
        "Database Management Systems (MySQL)",
        "Operating Systems",
        "Computer Organization",
        "Discrete Mathematics",
      ],
      highlights: [
        "Maintaining an 8.64 / 10 CGPA across core software engineering coursework.",
        "Ranked in the Top 14% on LeetCode with 750+ algorithmic problems solved.",
        "Active member of university technical clubs and peer problem-solving circles.",
      ],
      details: [
        "Focus on Data Structures, Algorithms, Database Management Systems, and Object-Oriented Software Engineering.",
        "Active member of coding clubs and peer mentoring circles.",
      ],
    },
  ] as EducationItem[],

  achievements: [
    {
      id: "atf-scholarship",
      title: "ATF Scholarship Exam",
      numericValue: 8,
      prefix: "Top ",
      suffix: "%",
      metricLabel: "Top 8%",
      description:
        "Ranked in the Top 8% in the ATF (AlgoUniversity Technology Fellowship) Scholarship Exam (2025).",
      link: "#",
      linkLabel: "View Exam",
    },
    {
      id: "leetcode",
      title: "LeetCode Milestone",
      numericValue: 750,
      suffix: "+",
      metricLabel: "750+ Solved",
      description:
        "Ranked in the Top 14% on LeetCode with 750+ problems solved across arrays, DP, trees, graphs, and algorithms.",
      link: LEETCODE_URL,
      linkLabel: "LeetCode Profile",
    },
    {
      id: "codechef",
      title: "CodeChef Rating",
      numericValue: 1400,
      suffix: "+",
      metricLabel: "1400+ Rating",
      description:
        "2-Star Coder on CodeChef with a peak rating of 1400+, regularly competing in algorithmic rated contests.",
      link: CODECHEF_URL,
      linkLabel: "CodeChef Profile",
    },
    {
      id: "hackerrank",
      title: "HackerRank Certifications",
      numericValue: 5,
      suffix: "★",
      metricLabel: "5-Star Rating",
      description:
        "5-Star Gold Badge in C++ and SQL on HackerRank, validating strong algorithmic and relational query skills.",
      link: HACKERRANK_URL,
      linkLabel: "HackerRank Profile",
    },
  ] as AchievementItem[],

  navLinks: [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" },
  ],
};
