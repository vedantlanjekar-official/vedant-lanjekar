export interface SectionMeta {
  id: string;
  num: string;
  title: string;
  short: string;
}

export const sections: SectionMeta[] = [
  { id: 'profile', num: '01', title: 'Professional Profile', short: 'Profile' },
  { id: 'education', num: '02', title: 'Education', short: 'Education' },
  { id: 'skills', num: '03', title: 'Technical Skills and Technologies', short: 'Skills' },
  { id: 'projects', num: '04', title: 'Featured Project and Engineering Portfolio', short: 'Projects' },
  { id: 'research', num: '05', title: 'Research and Publications', short: 'Research' },
  { id: 'ventures', num: '06', title: 'Startup Ventures & Entrepreneurial Initiatives', short: 'Ventures' },
  { id: 'experience', num: '07', title: 'Professional Experience', short: 'Experience' },
  { id: 'certifications', num: '08', title: 'Certifications and Professional Training', short: 'Certifications' },
  { id: 'achievements', num: '09', title: 'Achievements and Recognition', short: 'Achievements' },
  { id: 'leadership', num: '10', title: 'Leadership and Volunteering', short: 'Leadership' },
  { id: 'strengths', num: '11', title: 'Core Strengths', short: 'Strengths' },
  { id: 'languages', num: '12', title: 'Languages', short: 'Languages' },
  { id: 'interests', num: '13', title: 'Interests and Extracurricular Activities', short: 'Interests' },
  { id: 'gallery', num: '14', title: 'Gallery', short: 'Gallery' },
  { id: 'references', num: '15', title: 'Professional References', short: 'References' },
  { id: 'contact', num: '16', title: 'Contact and Professional Links', short: 'Contact' },
];

export const sectionById = Object.fromEntries(sections.map((s) => [s.id, s])) as Record<string, SectionMeta>;
