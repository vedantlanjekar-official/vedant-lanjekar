export interface Leadership {
  num: string;
  designation: string;
  organization: string;
  duration: string;
  responsibilities: string[];
}

export const leadership: Leadership[] = [
  {
    num: '10.1',
    designation: 'President',
    organization: 'Society of Data Science (S4DS), Student Chapter',
    duration: '2026–2027',
    responsibilities: [
      'Lead chapter-level initiatives and student engagement.',
      'Encourage collaboration, innovation, and participation in data-science activities.',
      'Support the development of a strong technical learning community.',
    ],
  },
  {
    num: '10.2',
    designation: 'Media / Marketing / Magazine Secretary',
    organization: 'Student Council, DYPCOEI',
    duration: '2023–2025',
    responsibilities: [
      'Contributed to campus-wide media and communication activities.',
      'Supported promotional initiatives and institutional outreach.',
      'Coordinated magazine-related content and documentation.',
    ],
  },
  {
    num: '10.3',
    designation: 'Assistant Documentation Secretary',
    organization: 'Society of Data Science (S4DS), Student Chapter',
    duration: '2023–2025',
    responsibilities: [
      'Maintained structured documentation and event records.',
      'Supported technical-content preparation and chapter activities.',
    ],
  },
  {
    num: '10.4',
    designation: 'Media Head',
    organization: 'Young Inspirators Network Club',
    duration: '2024–2025',
    responsibilities: ['Managed media activities and visual communication.', 'Supported event promotion and digital outreach.'],
  },
  {
    num: '10.5',
    designation: 'Media Head',
    organization: 'Social Media Club',
    duration: '2024–2025',
    responsibilities: [
      'Managed creative campaigns and digital content.',
      'Contributed to branding, communication, and online engagement.',
    ],
  },
];

export const strengths = [
  {
    num: '11.1',
    title: 'Cross-Domain Engineering',
    text: 'Experience spanning AI, machine learning, computer vision, embedded systems, IoT, data science, and full-stack development.',
  },
  {
    num: '11.2',
    title: 'End-to-End Project Execution',
    text: 'Ability to contribute across the project lifecycle, from problem definition and research to architecture, development, integration, and deployment.',
  },
  {
    num: '11.3',
    title: 'Applied Problem-Solving',
    text: 'Experience presenting technical solutions through hackathons, ideathons, project exhibitions, and research forums.',
  },
  {
    num: '11.4',
    title: 'Learning Agility',
    text: 'Continuous exploration of emerging technologies, development tools, and engineering approaches.',
  },
  {
    num: '11.5',
    title: 'Research and Analytical Thinking',
    text: 'Experience with AI research, model evaluation, technical experimentation, and evidence-oriented problem analysis.',
  },
  {
    num: '11.6',
    title: 'Hardware–Software Integration',
    text: 'Experience combining microcontrollers, sensors, wireless communication modules, firmware, and software applications.',
  },
  {
    num: '11.7',
    title: 'Technical and Creative Communication',
    text: 'Ability to communicate through technical documentation, presentations, visual content, photography, videography, and writing.',
  },
  {
    num: '11.8',
    title: 'Leadership and Collaboration',
    text: 'Participation in student leadership, technical teams, competitions, and collaborative initiatives.',
  },
  {
    num: '11.9',
    title: 'User-Centred Engineering',
    text: 'Interest in accessibility, assistive technology, mobility, healthcare workflows, and practical user requirements.',
  },
  {
    num: '11.10',
    title: 'Consistency and Execution',
    text: 'Sustained academic performance, technical training, project development, and participation in innovation activities.',
  },
];

export interface Language {
  num: string;
  name: string;
  proficiency: string;
  /** The language's name written in its own script, with its BCP 47 tag. */
  native?: { text: string; lang: string };
}

export const languages: Language[] = [
  { num: '12.1', name: 'English', proficiency: 'Professional Working Proficiency' },
  { num: '12.2', name: 'Hindi', proficiency: 'Native / Full Professional Proficiency', native: { text: 'हिंदी', lang: 'hi' } },
  { num: '12.3', name: 'Marathi', proficiency: 'Native / Full Professional Proficiency', native: { text: 'मराठी', lang: 'mr' } },
];

export interface Interest {
  num: string;
  title: string;
  points: string[];
  link?: { label: string; url: string; afterPoint: number };
}

export const interests: Interest[] = [
  {
    num: '13.1',
    title: 'Writing and Reading',
    points: ['Interested in reading across different subjects and literary genres.', 'Author of Seasons of Love.'],
    link: { label: 'Book Listing', url: 'https://wissenbookstore.com/product/seasons-of-love/', afterPoint: 1 },
  },
  {
    num: '13.2',
    title: 'Photography and Videography',
    points: [
      'Interested in visual storytelling, composition, event photography, cinematography, and video editing.',
      'Experience creating event-focused visual content for institutional communication.',
    ],
  },
  {
    num: '13.3',
    title: 'Digital Media and Social Media',
    points: ['Interested in social-media management, digital content strategy, online branding, and audience engagement.'],
  },
  {
    num: '13.4',
    title: 'Drawing and Painting',
    points: ['Pursues sketching, visual expression, and creative interpretation through drawing and painting.'],
  },
  {
    num: '13.5',
    title: 'Technology Exploration',
    points: ['Actively explores emerging technologies, engineering tools, and new technical applications.'],
  },
  {
    num: '13.6',
    title: 'Internet of Things',
    points: ['Strong interest in connected systems, sensor integration, embedded development, automation, and intelligent device interaction.'],
  },
];

export const galleryIntro = {
  num: '14.1',
  title: 'Photography and Visual Gallery',
};
