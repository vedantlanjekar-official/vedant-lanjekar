export interface ManagerContact {
  name: string;
  designation: string;
  mobile?: string;
  email?: string;
}

export interface Experience {
  num: string;
  role: string;
  organizationLabel: string;
  organizations: string[];
  logos: ('valmet' | 'bharat' | 'dypcoei' | 'acmegrade')[];
  wordmarks?: string[];
  location?: string;
  duration: string;
  workMode: string;
  organizationOverview?: string;
  website?: string;
  roleOverview: string[];
  applicationsIntro?: string;
  applications?: string[];
  contributionsTitle: string;
  contributions: string[];
  manager?: ManagerContact;
}

export const experience: Experience[] = [
  {
    num: '7.1',
    role: 'AI Engineer Intern',
    organizationLabel: 'Organization',
    organizations: ['Valmet Technologies Private Limited'],
    logos: ['valmet'],
    location: 'Baner, Pune, India',
    duration: 'June 2026 – Present',
    workMode: 'On-site',
    organizationOverview:
      'Valmet is a Finland-headquartered technology company serving industrial customers. Its business areas include automation, measurement, and flow-control solutions for industrial operations.',
    website: 'https://www.valmet.com/',
    roleOverview: [
      'Contribute to the development of internal engineering applications intended to improve engineering workflows, streamline technical processes, and reduce manual effort.',
      'The engagement includes end-to-end application development, technical problem analysis, system-architecture planning, business-logic design, and full-stack implementation.',
    ],
    applicationsIntro: 'The following applications are identified in the supplied material as having been developed from scratch:',
    applications: [
      'Valmet Site Netra',
      'ABB AC450 Migration Studio',
      'Valmet Project Control',
      'ABB Bailey INFI 90 Migration Studio',
      'Valmet MaterialSync',
      'Valmet CrossConnect Studio',
      'Valmet Hardware Team Tracker',
      'Valmet Workload Balancer Studio',
    ],
    contributionsTitle: 'Core Contributions',
    contributions: [
      'Developed internal engineering applications from initial requirements.',
      'Structured application architecture and technical workflows.',
      'Designed and implemented application-specific business logic.',
      'Worked across frontend, backend, data handling, and AI-related development activities.',
      'Focused on improving the efficiency and usability of engineering processes.',
    ],
    manager: {
      name: 'Ashish Chaudhari',
      designation: 'Engineering Manager | Automation Business Line',
      mobile: '+91 8879188977',
      email: 'ashish.chaudhari@valmet.com',
    },
  },
  {
    num: '7.2',
    role: 'Web Developer Intern',
    organizationLabel: 'Organization',
    organizations: ['Bharat Electrical & Engineering'],
    logos: ['bharat'],
    location: 'Panvel, Navi Mumbai, India',
    duration: 'January 2026 – March 2026',
    workMode: 'On-site',
    organizationOverview:
      'Bharat Electrical & Engineering provides services across electrical licensing and inspection coordination, HVAC sales and servicing, fire-protection systems, HT/LT switchgear, motor and transformer maintenance, solar installations, EV charging-station installations, and manpower services.',
    roleOverview: [
      'Selected for a professional web-development engagement to design, develop, deploy, and maintain the organization’s corporate website.',
    ],
    contributionsTitle: 'Key Contributions',
    contributions: [
      'Developed a corporate website to strengthen the organization’s digital presence.',
      'Structured the service portfolio and organized business information for online presentation.',
      'Implemented responsive website layouts and frontend functionality.',
      'Coordinated the technical implementation with the organization’s business requirements.',
      'Supported website maintenance and platform optimization, with attention to performance, security, and scalability.',
    ],
    manager: {
      name: 'Prakesh Kamble',
      designation: 'CEO',
      mobile: '8879916315',
      email: 'bharatelect.eng@gmail.com',
    },
  },
  {
    num: '7.3',
    role: 'Social Media Manager, Photographer, and Cinematographer',
    organizationLabel: 'Organizations',
    organizations: [
      'Dr. D. Y. Patil College of Engineering & Innovation',
      'Dr. D. Y. Patil Institute of Management and Entrepreneurship',
      'Dr. D. Y. Patil Technical Campus',
    ],
    logos: ['dypcoei'],
    location: 'Pune, India',
    duration: 'January 2024 – June 2026',
    workMode: 'On-site',
    roleOverview: [
      'Managed social-media and event-media activities across three educational institutions, contributing to their digital communication and event documentation.',
    ],
    contributionsTitle: 'Key Contributions',
    contributions: [
      'Established and managed institutional social-media channels across YouTube, Instagram, and LinkedIn.',
      'Photographed and documented academic, cultural, and institutional events.',
      'Recorded and edited video content for event coverage and digital publication.',
      'Produced social-media posts, event highlights, and edited video outputs.',
      'Coordinated media coverage across three institutions and their respective events.',
    ],
    manager: {
      name: 'Adv. Anuja Sushant Patil',
      designation: 'Secretary of DYPCOEI & DYPIMED • CEO of DYPTC • Founder of ASPGF • Founder of Sushant Patil Group',
      email: 'anuja.patil@dypatilef.com',
      mobile: '+91 901 159 9990',
    },
  },
  {
    num: '7.4',
    role: 'Artificial Intelligence Engineer Intern',
    organizationLabel: 'Program',
    organizations: ['Acmegrade x Mood Indigo, IIT Bombay'],
    logos: ['acmegrade'],
    wordmarks: ['Mood Indigo', 'IIT Bombay'],
    duration: 'February 2024 – April 2024',
    workMode: 'Online',
    roleOverview: [
      'Completed an AI-focused training and internship program involving structured learning and practical exposure to artificial intelligence concepts.',
    ],
    contributionsTitle: 'Key Contributions',
    contributions: [
      'Developed foundational knowledge of Artificial Intelligence concepts and workflows.',
      'Applied structured learning to practical AI-oriented exercises.',
      'Strengthened technical problem-solving and implementation skills through the program.',
    ],
  },
];
