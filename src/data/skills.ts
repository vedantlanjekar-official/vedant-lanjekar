export interface SkillCategory {
  num: string;
  title: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    num: '3.1',
    title: 'Programming Languages',
    // Java, C and C++ removed at the owner's request.
    items: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    num: '3.2',
    title: 'Frontend Engineering',
    items: ['React.js', 'Next.js', 'Angular', 'Vue.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Redux Toolkit', 'Vite'],
  },
  {
    num: '3.3',
    title: 'Backend Engineering and API Development',
    items: ['Node.js', 'Express.js', 'NestJS', 'FastAPI', 'Django', 'Flask', 'Spring Boot', 'REST APIs', 'GraphQL', 'WebSockets'],
  },
  {
    num: '3.4',
    title: 'Databases, ORM, and Backend Services',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase', 'SQLite', 'Prisma ORM', 'SQLAlchemy'],
  },
  {
    num: '3.5',
    title: 'Artificial Intelligence, Machine Learning, and Generative AI',
    items: [
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
      'Hugging Face',
      'LangChain',
      'LangGraph',
      'LlamaIndex',
      'OpenAI API',
      'Gemini API',
      'Retrieval-Augmented Generation (RAG)',
      'Large Language Models (LLMs)',
      'AI Agents',
    ],
  },
  {
    num: '3.6',
    title: 'AI-Assisted Development and Agentic Coding',
    items: [
      'Cursor IDE',
      'Claude Code',
      'OpenAI Codex',
      'Google Antigravity',
      'Google Gemini',
      'GitHub Copilot',
      'Windsurf',
      'Cline',
      'Roo Code',
      'Aider',
      'Model Context Protocol (MCP)',
      'Multi-Agent Workflows',
    ],
  },
  {
    num: '3.7',
    title: 'Data Processing and Engineering',
    items: ['NumPy', 'Pandas', 'Polars', 'Apache Spark', 'Apache Kafka', 'SheetJS', 'ExcelJS', 'OpenPyXL', 'PyMuPDF'],
  },
  {
    num: '3.8',
    title: 'Data Visualization, Analytics, and Reporting',
    items: ['Power BI', 'Tableau', 'Recharts', 'Chart.js', 'D3.js', 'Matplotlib', 'Plotly', 'jsPDF', 'Excel Reporting'],
  },
  {
    num: '3.9',
    title: 'Development Environments and Collaboration',
    items: ['Visual Studio Code', 'IntelliJ IDEA', 'PyCharm', 'Jupyter Notebook', 'Git', 'GitHub', 'GitLab', 'Postman', 'Jira', 'Linux'],
  },
  {
    num: '3.10',
    title: 'Embedded Systems and Hardware',
    items: ['Embedded C', 'Arduino', 'ESP32', 'STM32', 'Raspberry Pi', 'FreeRTOS', 'MQTT', 'Modbus', 'UART', 'SPI', 'I2C'],
  },
  {
    num: '3.11',
    title: 'Testing and Quality Assurance',
    // Postman is listed once, under Development Environments, to avoid a repeated entry.
    items: [
      'Jest',
      'Vitest',
      'Pytest',
      'JUnit',
      'Cypress',
      'Playwright',
      'Selenium',
      'Unit Testing',
      'Integration Testing',
      'End-to-End Testing',
    ],
  },
  {
    num: '3.12',
    title: 'Cybersecurity and Application Security',
    items: [
      'OAuth 2.0',
      'OpenID Connect',
      'JSON Web Tokens (JWT)',
      'Role-Based Access Control (RBAC)',
      'Row-Level Security (RLS)',
      'OWASP Top 10',
      'API Security',
      'Encryption',
      'Vulnerability Assessment',
    ],
  },
  {
    num: '3.13',
    title: 'Cloud, DevOps, and Deployment',
    items: [
      'Amazon Web Services (AWS)',
      'Microsoft Azure',
      'Google Cloud Platform (GCP)',
      'Docker',
      'Kubernetes',
      'Terraform',
      'GitHub Actions',
      'Jenkins',
      'Vercel',
      'Render',
      'Railway',
      'Netlify',
      'Cloudflare',
      'CI/CD',
    ],
  },
  {
    num: '3.14',
    title: 'Software Engineering and Architecture',
    items: [
      'Data Structures and Algorithms',
      'Object-Oriented Programming',
      'SOLID Principles',
      'Design Patterns',
      'System Design',
      'Microservices',
      'Distributed Systems',
      'Database Design',
      'Scalable Architecture',
      'Performance Optimization',
    ],
  },
];
