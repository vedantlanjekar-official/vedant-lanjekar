export interface Certification {
  num: string;
  provider: string;
  title: string;
  institution?: string;
  programType?: string;
  learning: string;
}

export const certifications: Certification[] = [
  {
    num: '8.1',
    provider: 'NPTEL',
    title: 'Python for Data Science',
    institution: 'IIT Madras',
    learning: 'Developed knowledge of Python programming, data analysis, and foundational data-science concepts.',
  },
  {
    num: '8.2',
    provider: 'Microsoft',
    title: 'Data Analyst Career Path',
    learning: 'Built foundational knowledge of data analytics, visualization, reporting, and business-intelligence workflows.',
  },
  {
    num: '8.3',
    provider: 'Cisco Networking Academy',
    title: 'Introduction to Modern AI',
    learning: 'Studied modern artificial intelligence concepts, applications, and emerging AI technologies.',
  },
  {
    num: '8.4',
    provider: 'Cisco Networking Academy',
    title: 'Introduction to Data Science',
    learning:
      'Developed an understanding of data-science fundamentals, data handling, analytical methods, and data-driven problem-solving.',
  },
  {
    num: '8.5',
    provider: 'Infosys Springboard',
    title: 'Drone Technology',
    learning: 'Explored drone technology fundamentals, engineering concepts, and practical application areas.',
  },
  {
    num: '8.6',
    provider: 'Infosys Springboard',
    title: 'Traffic Light System (Centrado Kit)',
    learning: 'Applied embedded-systems and automation concepts through a traffic-control simulation project.',
  },
  {
    num: '8.7',
    provider: 'National-Level Workshop',
    title: 'DevOps: Mastering Hands-On Training for Modern Software Development',
    programType: 'National-Level Workshop',
    learning: 'Gained practical exposure to DevOps methodologies, automation workflows, and contemporary software-development practices.',
  },
  {
    num: '8.8',
    provider: 'One-Week Faculty Development Program',
    title: 'Designing Cyber-Physical Systems and IoT Application Development',
    programType: 'One-Week Faculty Development Program',
    learning: 'Studied cyber-physical system architecture, IoT development workflows, and connected-system applications.',
  },
  {
    num: '8.9',
    provider: 'Industrial Training Program',
    title: 'Internet of Things Do-It-Yourself Integrated Development Environment',
    programType: 'Industrial Training Program',
    learning: 'Gained practical exposure to IoT prototyping, hardware–software integration, and embedded development environments.',
  },
  {
    num: '8.10',
    provider: 'VISHWAPRENEUR’25',
    title: 'National-Level Entrepreneurship Convention',
    programType: 'National-Level Entrepreneurship Convention',
    learning:
      'Participated in a national entrepreneurship convention focused on innovation, startup ecosystems, leadership, and business ideation.',
  },
];
