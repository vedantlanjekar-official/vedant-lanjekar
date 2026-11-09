export const contact = {
  email: 'vedantlanjekar456@gmail.com',
  phone: '+91 907 602 7036',
  phoneHref: 'tel:+919076027036',
  location: 'Panvel, Maharashtra, India',
};

/** Copied from CV.pdf in the project root by scripts/build-assets.mjs. */
export const cv = {
  href: '/media/documents/Vedant-Lanjekar-CV.pdf',
  fileName: 'Vedant-Lanjekar-CV.pdf',
};

export type PlatformKey = 'linkedin' | 'github' | 'leetcode' | 'microsoftLearn' | 'freelancer' | 'instagram';

export interface Profile {
  key: PlatformKey;
  platform: string;
  identifier: string;
  url?: string;
}

export const profiles: Profile[] = [
  {
    key: 'linkedin',
    platform: 'LinkedIn',
    identifier: 'https://www.linkedin.com/in/vedant-lanjekar-89455728b',
    url: 'https://www.linkedin.com/in/vedant-lanjekar-89455728b',
  },
  {
    key: 'github',
    platform: 'GitHub',
    identifier: 'https://github.com/vedantlanjekar-official',
    url: 'https://github.com/vedantlanjekar-official',
  },
  { key: 'leetcode', platform: 'LeetCode ID', identifier: '4HV3bzgk8i' },
  { key: 'microsoftLearn', platform: 'Microsoft Learn ID', identifier: '38C9769CC5E9E517' },
  { key: 'freelancer', platform: 'Freelancer', identifier: '@vedantl00', url: 'https://www.freelancer.com/u/vedantl00' },
  { key: 'instagram', platform: 'Instagram', identifier: '@vedant_lanjekar', url: 'https://www.instagram.com/vedant_lanjekar/' },
];

export interface Reference {
  num: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
}

export const references: Reference[] = [
  {
    num: '15.1',
    name: 'Adv. Anuja Sushant Patil',
    designation: 'Secretary of DYPCOEI & DYPIMED • CEO of DYPTC • Founder of ASPGF • Founder of Sushant Patil Group',
    email: 'anuja.patil@dypatilef.com',
    phone: '+91 901 159 9990',
  },
  {
    num: '15.2',
    name: 'Dr. Suresh Mail',
    designation: 'Principal, DYPCOEI',
    email: 'principal.dypcoei@dypatilef.com',
    phone: '+91 800 702 2300',
  },
  {
    num: '15.3',
    name: 'Dr. Dipannita Mondal',
    designation: 'Head of Department, AI & DS, DYPCOEI',
    email: 'hod_aids@dypatilef.com',
    phone: '+91 937 321 9187',
  },
];
