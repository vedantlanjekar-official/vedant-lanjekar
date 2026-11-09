export interface Achievement {
  num: string;
  event: string;
  level: string;
  position: string;
  organizer: string;
  project?: string;
  projectLabel?: 'Project' | 'Research';
  recognition: string;
}

export interface AchievementGroup {
  num: string;
  title: string;
  items: Achievement[];
}

export const prizeMoney = {
  amount: '₹1,54,500+',
  label: 'Reported Cumulative Prize Money',
};

export const achievementsSummary =
  '28 achievements and recognitions across 2025, 2026, and additional institutional and technical competitions.';

export const achievementGroups: AchievementGroup[] = [
  {
    num: '9.1',
    title: '2026 Achievements',
    items: [
      {
        num: '9.1.1',
        event: 'BV Tech Fusion 2K26',
        level: 'International Level',
        position: 'Winner',
        organizer: 'Bharati Vidyapeeth Deemed University, Pune',
        project: 'AIVORA Labs',
        recognition: 'Winner for presenting an AI-focused innovation solution.',
      },
      {
        num: '9.1.2',
        event: 'Fusion 2K26',
        level: 'International Level',
        position: 'Top 20 Finalist',
        organizer: 'Smt. Kashibai Navale College of Engineering, Pune',
        project: 'CLIMETRYX',
        recognition: 'Selected among the Top 20 finalists.',
      },
      {
        num: '9.1.3',
        event: 'Byte Battle Hackathon 2K26',
        level: 'National Level',
        position: 'Runner-Up',
        organizer: 'Dr. D. Y. Patil Technical Campus, Pune',
        project: 'AIVORA Labs',
        recognition: 'Runner-Up for presenting an AI innovation solution.',
      },
      {
        num: '9.1.4',
        event: 'International Conference 2K26',
        level: 'International Level',
        position: 'Research Presentation Winner',
        organizer: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune',
        project: 'Hallucination Detection and Mitigation in Large Language Models',
        projectLabel: 'Research',
        recognition: 'Winner for the research presentation.',
      },
      {
        num: '9.1.5',
        event: 'VishwaNova Project Exhibition 2K26',
        level: 'National Level',
        position: '3rd Runner-Up',
        organizer: 'Dr. Vishwanath Karad MIT World Peace University, Pune',
        project: 'AIVORA Labs',
        recognition: '3rd Runner-Up.',
      },
      {
        num: '9.1.6',
        event: 'Pragyantra AI Hackathon 2K26',
        level: 'National Level',
        position: 'Winner',
        organizer: 'Modern College of Engineering, Pune',
        project: 'AIVORA Labs',
        recognition: 'Winner.',
      },
      {
        num: '9.1.7',
        event: 'M-Pulse Ignite — Design X 2K26',
        level: 'National Level',
        position: 'Runner-Up',
        organizer: 'Modern College of Engineering, Pune',
        project: 'PROLINK HUB',
        recognition: 'Runner-Up for a user-centric design innovation.',
      },
      {
        num: '9.1.8',
        event: 'Orchestron Agentic AI Hackathon 2K26',
        level: 'National Level',
        position: 'Top 5 Finalist',
        organizer: 'Indira College of Engineering & Management, Pune',
        project: 'AIVORA Labs',
        recognition: 'Selected among the Top 5 finalists.',
      },
      {
        num: '9.1.9',
        event: 'Investor and Mentor Pitch Deck',
        level: 'National Level',
        position: 'Startup Pitch Presentation',
        organizer: 'ICMR – National Institute of Translational Virology and AIDS Research, Pune',
        project: 'VIRO-AI',
        recognition: 'Presented the startup-oriented innovation before investors and mentors.',
      },
      {
        num: '9.1.10',
        event: 'Pixel War 2K26',
        level: 'UI/UX Design Battle',
        position: 'Winner',
        organizer: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune',
        project: 'Skillectra',
        recognition: 'Winner for a user-centric UI/UX design solution.',
      },
      {
        num: '9.1.11',
        event: 'Ideathon 2K26',
        level: 'National Level',
        position: 'Top 10 Finalist',
        organizer: 'Smt. Kashibai Navale College of Engineering, Pune',
        project: 'AIVORA Labs',
        recognition: 'Selected among the Top 10 finalists.',
      },
      {
        num: '9.1.12',
        event: 'Innovators Hackathon 2K26',
        level: 'National Level',
        position: 'Top 20 Finalist',
        organizer: 'Nutan Maharashtra Institute of Engineering, in collaboration with Technology Hub Incubation Center, Pune',
        project: 'AIVORA Labs',
        recognition: 'Selected among the Top 20 finalists.',
      },
    ],
  },
  {
    num: '9.2',
    title: '2025 Achievements',
    items: [
      {
        num: '9.2.1',
        event: 'Fusion Hackathon 2K25',
        level: 'National Level',
        position: 'Top 20 Finalist',
        organizer: 'Smt. Kashibai Navale College of Engineering, Pune',
        project: 'VIRO-AI',
        recognition: 'Selected among the Top 20 finalists.',
      },
      {
        num: '9.2.2',
        event: 'SciTech Innovation Hackathon 2K25',
        level: 'National Level',
        position: 'Top 20 Finalist',
        organizer: 'Marathwada Mitra Mandal’s College of Engineering, Pune',
        project: 'VIRO-AI',
        recognition: 'Selected among the Top 20 finalists.',
      },
      {
        num: '9.2.3',
        event: 'Idea Pitch Competition – Startup',
        level: 'College Level',
        position: 'Winner',
        organizer: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune',
        project: 'VIRO-AI',
        recognition: 'Winner.',
      },
      {
        num: '9.2.4',
        event: 'International Conference 2K25',
        level: 'International Level',
        position: 'Winner',
        organizer: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune',
        project: 'Aerial Pharmacobotany',
        recognition: 'Winner for presenting an interdisciplinary research project.',
      },
      {
        num: '9.2.5',
        event: 'Sci Tech Villagethon',
        level: 'National Level',
        position: 'Winner',
        organizer: 'AISSMS College of Engineering, Pune',
        project: 'VIRO-AI',
        recognition: 'Winner.',
      },
      {
        num: '9.2.6',
        event: 'Hack A Thought',
        level: 'College Level',
        position: '2nd Runner-Up',
        organizer: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune',
        project: 'LoRa technology-based innovation',
        recognition: '2nd Runner-Up.',
      },
      {
        num: '9.2.7',
        event: 'Techno Sci 2K25',
        level: 'National Level',
        position: 'Top 10 Finalist',
        organizer: 'Marathwada Mitramandal’s Institute of Technology, Lohgaon',
        project: 'Aerial Pharmacobotany',
        recognition: 'Selected among the Top 10 finalists.',
      },
      {
        num: '9.2.8',
        event: 'Smart India Hackathon – Round 1',
        level: 'National Level',
        position: 'Runner-Up',
        organizer: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune',
        project: 'VIRO-AI',
        recognition: 'Runner-Up in the institutional Round 1 process, as described in the supplied material.',
      },
      {
        num: '9.2.9',
        event: 'KIT – Ideathon 2K25',
        level: 'National Level',
        position: 'Winner',
        organizer: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune',
        project: 'VIRO-AI',
        recognition: 'Winner and qualified for the next round of the ideation challenge.',
      },
    ],
  },
  {
    num: '9.3',
    title: 'Additional Institutional and Technical Achievements',
    items: [
      {
        num: '9.3.1',
        event: 'Digital Poster Making Competition',
        level: 'College Level',
        position: 'Runner-Up',
        organizer: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune',
        recognition: 'Runner-Up for digital design and visual communication.',
      },
      {
        num: '9.3.2',
        event: 'Internal Hackathon – Smart India Hackathon 2024 Qualification',
        level: 'Institutional Level',
        position: 'Winner',
        organizer: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune',
        recognition: 'Winner in the internal innovation challenge, with qualification for the next round as stated in the supplied material.',
      },
      {
        num: '9.3.3',
        event: 'Quiz Competition – Expert Lecture on IoT',
        level: 'Technical Competition',
        position: 'Runner-Up',
        organizer: 'Go Green Technologies Pvt. Ltd.',
        recognition: 'Runner-Up in an IoT-focused technical knowledge assessment.',
      },
      {
        num: '9.3.4',
        event: 'College-Level Project Competition',
        level: 'Institutional Level',
        position: 'Runner-Up',
        organizer: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune',
        recognition: 'Runner-Up for technical innovation and practical engineering application.',
      },
      {
        num: '9.3.5',
        event: 'Department-Level Project Competition',
        level: 'Institutional Level',
        position: 'Winner',
        organizer: 'First Year Engineering Department, Dr. D. Y. Patil College of Engineering & Innovation, Pune',
        recognition: 'Winner for project innovation and engineering execution.',
      },
      {
        num: '9.3.6',
        event: 'Cybersecurity Poster Making Competition',
        level: 'Technical and Creative Competition',
        position: 'Winner',
        organizer: 'Quick Heal',
        recognition: 'Winner for cybersecurity-awareness communication through visual design.',
      },
      {
        num: '9.3.7',
        event: 'FE Induction Program – Soft Skills Quiz Competition',
        level: 'College Level',
        position: 'Winner',
        organizer: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune',
        recognition: 'Winner in the soft-skills assessment quiz.',
      },
    ],
  },
];
