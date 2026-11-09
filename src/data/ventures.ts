export interface VentureItem {
  no?: string;
  title: string;
  concept?: string;
  text?: string;
  bullets?: string[];
}

export interface VentureBlock {
  num: string;
  title: string;
  intro?: string[];
  items?: VentureItem[];
  bullets?: { label?: string; text: string }[];
  bulletsIntro?: string;
}

export interface Venture {
  num: string;
  name: string;
  subtitle: string;
  stage: string;
  typeLabel: string;
  type: string;
  positioning: string;
  facts: { label: string; value: string | string[] }[];
  overviewTitle: string;
  overview: string[];
  vision: string[];
  mission: string;
  objectives: string[];
  blocks: VentureBlock[];
  team?: { member: string; designation: string }[];
  teamTitle?: string;
  teamNote?: string;
}

export const ventures: Venture[] = [
  {
    num: '6.1',
    name: 'AIVORA Labs',
    subtitle: 'Artificial Intelligence for Virtual Observation, Research & Automation Labs',
    stage: 'Ideation Stage',
    typeLabel: 'Venture Type',
    type: 'Founder-Led Venture',
    positioning: 'Where Ideas Become Intelligent Engineering',
    facts: [
      { label: 'Founder & Team', value: 'Vedant Lanjekar, Sairaj Jadav, Yash Wase' },
      { label: 'Role', value: 'Founder, Lead System Architect & Full-Stack AI Developer' },
      {
        label: 'Domains',
        value:
          'Artificial Intelligence | Machine Learning | IoT | Embedded Systems | Electronics | Cloud Computing | PCB Design | Engineering Simulation',
      },
    ],
    overviewTitle: 'Venture Overview',
    overview: [
      'AIVORA Labs is a proposed integrated digital engineering ecosystem envisioned to bring together artificial intelligence, practical engineering experimentation, hardware innovation, and technology-driven learning within a unified environment.',
      'The venture aims to address the gap between theoretical engineering education and practical implementation by conceptualizing a connected suite of specialized digital applications. These applications are intended to support different stages of the engineering lifecycle, enabling students, developers, researchers, educators, and innovators to explore electronic components, experiment with virtual systems, develop intelligent engineering solutions, design hardware, collaborate on projects, assess technical competencies, and build professional portfolios.',
      'Rather than positioning these capabilities as isolated products, AIVORA Labs is envisioned as an interconnected engineering ecosystem built around seven specialized applications, each addressing a distinct requirement within the broader engineering and innovation landscape.',
    ],
    vision: [
      'AIVORA Labs aims to create an integrated environment in which engineering knowledge can move beyond theoretical understanding into experimentation, product development, collaboration, and innovation.',
      'Its long-term vision is to establish a connected digital engineering ecosystem that makes specialized engineering capabilities more accessible, structured, and interconnected.',
    ],
    mission:
      'To bring artificial intelligence, practical engineering experimentation, hardware innovation, and technology-driven learning together through a connected suite of specialized applications that supports the engineering lifecycle—from component exploration and virtual experimentation to solution development, collaboration, competency assessment, and professional portfolio creation.',
    objectives: [
      'Conceptualize a connected digital engineering ecosystem that bridges theoretical engineering education and practical implementation.',
      'Develop specialized application concepts for electronic component discovery, IoT and embedded-system experimentation, AI-assisted engineering, and PCB design.',
      'Establish collaborative and professional-development capabilities that support project showcasing, technical discussions, knowledge sharing, competency assessment, and portfolio creation.',
      'Connect the seven specialized applications through a shared ecosystem architecture supported by AI and Machine Learning models, web technologies, cloud infrastructure, embedded systems frameworks, and engineering automation workflows.',
    ],
    blocks: [
      {
        num: '6.1.5',
        title: 'Proposed Product Ecosystem',
        intro: ['The AIVORA Labs vision is organized around seven interconnected application concepts.'],
        items: [
          {
            no: '01',
            title: 'AIVORA Atlas — Component Knowledge Hub',
            concept: 'A centralized knowledge platform for electronic components and engineering resources.',
            bullets: [
              'Explore electronic components, datasheets, and technical specifications.',
              'Access component pin configurations and technical information.',
              'Compare components and evaluate their suitability for engineering applications.',
              'Explore intelligent component discovery and recommendation capabilities.',
            ],
          },
          {
            no: '02',
            title: 'AIVORA DigiLab — IoT Simulator',
            concept: 'A virtual environment for embedded systems and connected-device experimentation.',
            bullets: [
              'Build and explore virtual electronic circuits.',
              'Experiment with embedded systems and IoT concepts.',
              'Execute code and simulate circuit behaviour.',
              'Explore debugging and interactive engineering experimentation.',
            ],
          },
          {
            no: '03',
            title: 'AIVORA Forge — AI Auto Builder',
            concept: 'An AI-assisted engineering solution-generation platform.',
            bullets: [
              'Transform natural-language engineering requirements into structured solution concepts.',
              'Explore proposed system architectures and component selections.',
              'Generate circuit concepts and firmware-oriented solution structures.',
              'Support engineering documentation and solution planning.',
            ],
          },
          {
            no: '04',
            title: 'AIVORA Flux — AI PCB Builder',
            concept: 'An intelligent platform for PCB design and hardware development workflows.',
            bullets: [
              'Explore automated PCB design workflows.',
              'Support component placement and routing.',
              'Incorporate design validation and optimization concepts.',
              'Explore manufacturing-oriented design outputs.',
            ],
          },
          {
            no: '05',
            title: 'AIVORA Nexus — Engineering Community',
            concept: 'A collaborative environment connecting students, developers, researchers, and engineering professionals.',
            bullets: [
              'Showcase engineering projects and technical achievements.',
              'Encourage technical discussions and knowledge sharing.',
              'Facilitate engineering-related help requests.',
              'Explore collaborative project development and community engagement.',
            ],
          },
          {
            no: '06',
            title: 'AIVORA Signature — AI CV & Portfolio Builder',
            concept: 'An intelligent professional identity and engineering portfolio platform.',
            bullets: [
              'Organize engineering projects and technical skills.',
              'Structure certifications, achievements, and professional information.',
              'Support AI-assisted CV and portfolio creation.',
              'Help users present their technical capabilities professionally.',
            ],
          },
          {
            no: '07',
            title: 'AIVORA Horizon — Assessment & Certification',
            concept: 'A technical competency assessment and professional learning platform.',
            bullets: [
              'Support technical assessments and quizzes.',
              'Organize competency tracking and learning progress.',
              'Provide progress analytics and achievement badges.',
              'Explore certification-oriented learning workflows.',
            ],
          },
        ],
      },
      {
        num: '6.1.6',
        title: 'Proposed Ecosystem Architecture',
        intro: ['The venture is envisioned around a shared ecosystem connecting seven specialized applications through a unified engineering vision.'],
        bulletsIntro: 'The broader technology landscape includes:',
        bullets: [
          { text: 'Artificial Intelligence and Machine Learning Models' },
          { text: 'Python and Node.js' },
          { text: 'React.js and Web Technologies' },
          { text: 'IoT Simulation Platforms' },
          { text: 'Embedded Systems Frameworks' },
          { text: 'Cloud Computing Infrastructure' },
          { text: 'PCB Design Technologies' },
          { text: 'Engineering Automation Workflows' },
        ],
      },
    ],
  },
  {
    num: '6.2',
    name: 'BuildWyse',
    subtitle: 'Integrated Project & Talent Ecosystem',
    stage: 'Ideation Stage',
    typeLabel: 'Venture Type',
    type: 'Collaborative Venture',
    positioning: 'Connecting Ideas, Talent & Project Execution',
    facts: [
      { label: 'Founding Team', value: ['Vedant Lanjekar', 'Pranav Shinde'] },
      {
        label: 'Domains',
        value:
          'Project Management | Talent Marketplace | AI-Powered Recruitment | Freelance Ecosystems | Enterprise Collaboration | EdTech | Digital Project Delivery',
      },
    ],
    overviewTitle: 'Venture Overview',
    overview: [
      'BuildWyse is a proposed integrated project and talent ecosystem designed to connect individuals, organizations, freelancers, professional teams, enterprises, and college campuses through a unified digital platform.',
      'The venture is envisioned to bridge the gap between ideas and execution by enabling clients to discover suitable professionals, access project references, develop requirements, and organize project teams through an interconnected environment.',
      'Its proposed intelligence layer incorporates AI-assisted requirement analysis, project planning, documentation, and talent recommendations, helping transform initial concepts into structured project opportunities.',
      'The platform is organized around seven distinct user and service modules, accommodating different participants in the project development and talent-management ecosystem.',
    ],
    vision: [
      'BuildWyse aims to establish a connected project economy where ideas can find the right talent, professionals can access meaningful opportunities, and organizations can execute projects through structured digital workflows.',
      'Its broader vision is to connect individuals, industry, freelancers, enterprises, and academic institutions within one collaborative environment.',
    ],
    mission:
      'To connect clients, professionals, freelancers, teams, enterprises, and academic communities through an integrated project and talent platform that supports requirement analysis, project planning, talent discovery, collaboration, milestone management, and project delivery.',
    objectives: [
      'Create a unified digital environment connecting individuals, organizations, freelancers, professional teams, enterprises, and college campuses.',
      'Support the project lifecycle through idea generation, requirement analysis, planning, documentation, proposals, agreements, team formation, milestone tracking, quality verification, payment workflows, and delivery.',
      'Incorporate AI-assisted capabilities for requirement understanding, project planning, documentation organization, intelligent talent recommendations, and skill-based professional discovery.',
      'Strengthen academia-to-industry collaboration through student participation in practical projects, faculty mentorship, industry engagement, and collaboration with professional teams and organizations.',
    ],
    blocks: [
      {
        num: '6.2.5',
        title: 'Proposed Platform Modules',
        items: [
          { no: '01', title: 'Client Individual', text: 'A dedicated environment for individuals seeking professionals to execute personal, technical, or business projects.' },
          { no: '02', title: 'Client Organization', text: 'A proposed workspace for organizations seeking talent, professional teams, and structured project execution.' },
          { no: '03', title: 'Freelancer Individual', text: 'A professional platform for independent freelancers to showcase capabilities, discover opportunities, and participate in projects.' },
          { no: '04', title: 'Freelancer Team', text: 'A collaborative environment for professional teams to present collective expertise and undertake projects.' },
          { no: '05', title: 'Freelancer Enterprise', text: 'A proposed enterprise-level engagement model for established service providers and professional organizations.' },
          {
            no: '06',
            title: 'Freelancer College Campus',
            text: 'A campus-oriented module connecting educational institutions and student communities with practical project opportunities, industry engagement, and professional development.',
          },
          { no: '07', title: 'Marketplace', text: 'A centralized discovery environment connecting clients with freelancers, teams, enterprises, and suitable project capabilities.' },
        ],
      },
      {
        num: '6.2.6',
        title: 'Proposed Project Lifecycle',
        intro: ['BuildWyse is conceptualized to support the complete project journey, from initial idea development through final delivery.'],
        bullets: [
          { label: 'Idea Generation & Requirement Analysis', text: 'Transform initial concepts into structured project requirements.' },
          { label: 'Project Planning & Documentation', text: 'Develop project plans, technical documentation, and execution strategies.' },
          { label: 'Talent Discovery & Matching', text: 'Identify suitable freelancers, teams, or organizations through the proposed Marketplace.' },
          { label: 'Proposal & Agreement Management', text: 'Organize project proposals, commercial discussions, and agreements.' },
          { label: 'Team Formation & Collaboration', text: 'Facilitate professional coordination and collaborative execution.' },
          { label: 'Milestone & Quality Management', text: 'Track project milestones, progress, and quality verification.' },
          { label: 'Payment & Delivery Workflows', text: 'Organize payment processes and final project handover.' },
        ],
      },
      {
        num: '6.2.7',
        title: 'BuildWyse Campus — Academia-to-Industry Collaboration',
        intro: [
          'A distinct aspect of the BuildWyse vision is its proposed campus-focused ecosystem.',
          'BuildWyse Campus aims to establish stronger connections between educational institutions and industry requirements by creating opportunities for:',
        ],
        bullets: [
          { text: 'Student participation in real-world project environments.' },
          { text: 'College-to-industry collaboration.' },
          { text: 'Faculty mentorship and technical guidance.' },
          { text: 'Practical skill development through project participation.' },
          { text: 'Discovery of opportunities beyond conventional academic activities.' },
          { text: 'Collaboration between students, professional teams, and organizations.' },
        ],
      },
      {
        num: '6.2.8',
        title: 'Proposed AI and Platform Capabilities',
        intro: ['The conceptual platform incorporates AI-assisted workflows intended to support:'],
        bullets: [
          { text: 'Intelligent talent recommendations.' },
          { text: 'Requirement understanding and analysis.' },
          { text: 'Project planning assistance.' },
          { text: 'Documentation generation and organization.' },
          { text: 'Skill-based professional discovery.' },
          { text: 'Structured project coordination.' },
        ],
      },
    ],
    teamTitle: 'Proposed Founding Team',
    team: [
      { member: 'Vedant Lanjekar', designation: 'Co-Founder — proposed' },
      { member: 'Pranav Shinde', designation: 'Co-Founder — proposed' },
    ],
  },
  {
    num: '6.3',
    name: 'Stack Notes',
    subtitle: 'AI Technology & Developer Tools Knowledge Initiative',
    stage: 'Ideation Stage',
    typeLabel: 'Initiative Type',
    type: 'Collaborative Initiative',
    positioning: 'Exploring the Technologies and Tools Shaping Modern AI Engineering',
    facts: [
      { label: 'Proposed Founding Team', value: ['Vedant Lanjekar', 'Vaishnavi Desai'] },
      { label: 'Format', value: 'Expert Lecture | Technical Knowledge Sharing | AI Technology Awareness' },
      { label: 'Target Audience', value: 'First-Year, Second-Year and Third-Year Engineering Students (FE, SE & TE)' },
      {
        label: 'Domains',
        value: 'Artificial Intelligence | Generative AI | Developer Tools | AI-Assisted Development | Agentic Coding | Software Engineering',
      },
    ],
    overviewTitle: 'Initiative Overview',
    overview: [
      'Stack Notes is a proposed technology knowledge-sharing initiative focused on introducing engineering students to the evolving Artificial Intelligence ecosystem and the tools shaping modern software and AI development.',
      'The initiative is envisioned as an expert-led learning and awareness platform designed to bridge the gap between academic understanding of Artificial Intelligence and the practical tools, frameworks, and development environments used in contemporary engineering workflows.',
      'Through structured expert lectures and technical knowledge-sharing sessions, Stack Notes aims to introduce students to AI technologies, development tools, modern coding environments, and emerging approaches to AI-assisted software engineering.',
    ],
    vision: [
      'Stack Notes aims to make modern AI technologies and developer tools more accessible to engineering students by connecting academic learning with practical technology awareness.',
      'Its long-term vision is to encourage students to explore emerging tools, understand evolving engineering workflows, and develop the technical awareness required to participate in the modern AI-driven development ecosystem.',
    ],
    mission:
      'To introduce engineering students to modern AI technologies, Generative AI, AI-powered development tools, agentic workflows, and contemporary software engineering environments through expert lectures, demonstrations, practical tool exploration, and technical knowledge-sharing sessions.',
    objectives: [
      'Introduce engineering students to contemporary Artificial Intelligence technologies, their applications, and their relevance to engineering disciplines.',
      'Build awareness of Generative AI, Large Language Models, AI assistants, and practical generative capabilities.',
      'Familiarize students with AI-powered development tools that support software development, code generation, debugging, documentation, and engineering productivity.',
      'Encourage understanding and practical exploration of autonomous AI agents, tool integration, agent orchestration, multi-agent development approaches, and the adoption of AI tools in learning and project development.',
    ],
    blocks: [
      {
        num: '6.3.5',
        title: 'Proposed Knowledge Areas',
        items: [
          { no: '01', title: 'Artificial Intelligence Fundamentals', text: 'Introduction to contemporary AI technologies, their applications, and their relevance to engineering disciplines.' },
          { no: '02', title: 'Generative AI Ecosystem', text: 'Exploration of Large Language Models, AI assistants, generative capabilities, and their practical applications.' },
          { no: '03', title: 'AI-Powered Development Tools', text: 'Introduction to tools that support software development, code generation, debugging, documentation, and engineering productivity.' },
          { no: '04', title: 'Agentic AI & Multi-Agent Workflows', text: 'Understanding autonomous AI agents, tool integration, agent orchestration, and emerging multi-agent development approaches.' },
          { no: '05', title: 'Modern Developer Ecosystem', text: 'Exploration of development environments, software engineering platforms, and tools that support contemporary technical workflows.' },
          { no: '06', title: 'Practical AI Adoption', text: 'Discussion of how students and developers can incorporate AI tools into learning, experimentation, project development, and problem-solving.' },
        ],
      },
      {
        num: '6.3.6',
        title: 'Intended Audience',
        intro: ['The initiative is primarily designed for:'],
        bullets: [
          { text: 'First-Year Engineering Students (FE)' },
          { text: 'Second-Year Engineering Students (SE)' },
          { text: 'Third-Year Engineering Students (TE)' },
          { text: 'Students interested in Artificial Intelligence and emerging technologies.' },
          { text: 'Aspiring developers exploring AI-assisted engineering workflows.' },
        ],
      },
      {
        num: '6.3.7',
        title: 'Proposed Initiative Format',
        bullets: [
          { text: 'Expert lectures and technical sessions.' },
          { text: 'Demonstrations of AI technologies and development tools.' },
          { text: 'Practical tool exploration and use-case discussions.' },
          { text: 'Awareness sessions on emerging AI development practices.' },
          { text: 'Knowledge-sharing discussions focused on engineering applications.' },
        ],
      },
    ],
    teamTitle: 'Proposed Founding Team',
    team: [
      { member: 'Vedant Lanjekar', designation: 'Co-Founder — proposed' },
      { member: 'Vaishnavi Desai', designation: 'Co-Founder — proposed' },
    ],
  },
];
