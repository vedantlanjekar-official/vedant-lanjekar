import type { Certificate, ImageAsset } from './types';
import {
  certCouncil,
  certHackathon,
  certSocial,
  certWorkshop,
  gallery,
  heroPortrait,
  logos,
  profilePortrait,
} from './assets.generated';

function pick(list: ImageAsset[], id: string): ImageAsset {
  const found = list.find((a) => a.id === id);
  if (!found) throw new Error(`Missing asset "${id}"`);
  return found;
}

const cert = (list: ImageAsset[], id: string, title: string, caption?: string): Certificate => ({
  image: pick(list, id),
  title,
  caption,
});

export { gallery, heroPortrait, profilePortrait };

export interface GalleryCollection {
  name: string;
  images: ImageAsset[];
}

/**
 * Section 14: gallery collages, grouped by what each photograph shows.
 * Numbers are 1-based positions in the Gallery folder; every photograph appears exactly once.
 */
const COLLECTIONS: { name: string; photos: number[] }[] = [
  { name: 'Awards and Honours', photos: [1, 3, 10, 11, 21, 26, 27, 31, 49, 50] },
  { name: 'Certificates and Felicitations', photos: [4, 5, 9, 13, 18, 19, 20, 22, 24, 29] },
  { name: 'Teams and Milestones', photos: [2, 6, 7, 8, 14, 16, 17, 51, 52, 53, 55, 57] },
  { name: 'Presentations and Talks', photos: [25, 34, 35, 36, 37, 38, 40, 42, 43, 45, 46, 58] },
  { name: 'Exhibitions and Demos', photos: [15, 23, 32, 41, 44, 47] },
  { name: 'Events and Celebrations', photos: [28, 30, 33, 39, 48, 54, 56] },
  { name: 'Conversations and Networking', photos: [12, 59, 60] },
];

{
  const used = COLLECTIONS.flatMap((c) => c.photos).sort((a, b) => a - b);
  if (used.length !== gallery.length || used.some((n, i) => n !== i + 1)) {
    throw new Error('Gallery collections must use every photograph exactly once');
  }
}

export const galleryCollections: GalleryCollection[] = COLLECTIONS.map((c) => ({
  name: c.name,
  images: c.photos.map((n) => gallery[n - 1]),
}));

export const logo = {
  valmet: pick(logos, 'vlamet-logo'),
  bharat: pick(logos, 'bharat-electrical-and-engineering-logo'),
  dypcoei: pick(logos, 'dr-d-y-patil-college-of-engioneering-and-innovation-logo'),
  dypcoeiCampus: pick(logos, 'dr-d-y-patil-college-of-engioneering-and-innovation'),
  newHorizon: pick(logos, 'new-horizon-public-school-logo'),
  newHorizonCampus: pick(logos, 'new-horizon-public-school'),
  indianSchool: pick(logos, 'the-indian-school-logo'),
  indianSchoolCampus: pick(logos, 'the-indian-school'),
  acmegrade: pick(logos, 'acmegrade-logo'),
};

/** Section 08: keyed by certification number. */
export const certificationImages: Record<string, Certificate> = {
  '8.1': cert(certWorkshop, '5', 'NPTEL — Python for Data Science'),
  '8.2': cert(certWorkshop, '1', 'Microsoft — Data Analyst Career Path'),
  '8.3': cert(certWorkshop, '2', 'Cisco Networking Academy — Introduction to Modern AI'),
  '8.4': cert(certWorkshop, '3', 'Cisco Networking Academy — Introduction to Data Science'),
  '8.5': cert(certWorkshop, '4', 'Infosys Springboard — Drone Technology'),
  '8.6': cert(certWorkshop, '7', 'Infosys Springboard — Traffic Light System (Centrado Kit)'),
  '8.7': cert(certWorkshop, '6', 'National-Level Workshop — DevOps: Mastering Hands-On Training for Modern Software Development'),
  '8.8': cert(certWorkshop, '9', 'One-Week Faculty Development Program — Designing Cyber-Physical Systems and IoT Application Development'),
  '8.9': cert(certWorkshop, '10', 'Industrial Training Program — Internet of Things Do-It-Yourself Integrated Development Environment'),
  '8.10': cert(certWorkshop, '8', 'VISHWAPRENEUR’25 — National-Level Entrepreneurship Convention'),
};

/** Section 09: keyed by achievement number. */
export const achievementImages: Record<string, Certificate> = {
  '9.1.3': cert(certHackathon, '3', 'Byte Battle Hackathon 2K26'),
  '9.1.5': cert(certHackathon, '4', 'VishwaNova Project Exhibition 2K26'),
  '9.1.6': cert(certHackathon, '1', 'Pragyantra AI Hackathon 2K26'),
  '9.1.7': cert(certHackathon, '2', 'M-Pulse Ignite — Design X 2K26'),
  '9.1.8': cert(certHackathon, '15', 'Orchestron Agentic AI Hackathon 2K26'),
  '9.1.10': cert(certHackathon, '7', 'Pixel War 2K26 — UI/UX Design Battle'),
  '9.1.11': cert(certHackathon, '14', 'Ideathon 2K26'),
  '9.1.12': cert(certHackathon, '16', 'Innovators Hackathon 2K26'),
  '9.2.1': cert(certHackathon, '18', 'Fusion Hackathon 2K25'),
  '9.2.2': cert(certHackathon, '21', 'SciTech Innovation Hackathon 2K25'),
  '9.2.3': cert(certHackathon, '10', 'Idea Pitch Competition – Startup'),
  '9.2.4': cert(certHackathon, '6', 'International Conference 2K25'),
  '9.2.5': cert(certHackathon, '5', 'Sci Tech Villagethon'),
  '9.2.6': cert(certHackathon, '9', 'Hack A Thought'),
  '9.2.7': cert(certHackathon, '22', 'Techno Sci 2K25'),
  '9.2.9': cert(certHackathon, '19', 'KIT – Ideathon 2K25'),
  '9.3.1': cert(certHackathon, '13', 'Digital Poster Making Competition'),
  '9.3.5': cert(certHackathon, '17', 'Department-Level Project Competition'),
};

/** Section 09 archive: certificates in the folder without a matching numbered entry. */
export const achievementArchive: Certificate[] = [
  cert(certHackathon, '8', 'Antarang 2K24', 'Project Exhibition Competition certificate'),
  cert(certHackathon, '11', 'Ignition Hackverse', 'Certificate of participation'),
  cert(certHackathon, '12', 'Navdhara', 'State level poster and project competition certificate'),
  cert(certHackathon, '20', 'Poster Presentation Competition', 'Department of AI & DS, DYPCOEI'),
  cert(certHackathon, '23', 'LOC 8.0', 'Hackathon certificate of participation'),
  cert(certHackathon, '24', 'GMRT Science Day Exhibition', 'VIRO-AI project presentation certificate'),
  cert(certHackathon, '25', 'AI-DS Project Showcase’25', 'DriveU project certificate'),
  cert(certHackathon, '26', 'Innovate’25 — AI-DS Seminar Contest', 'Seminar contest certificate'),
];

/** Section 10: keyed by leadership number. */
export const leadershipImages: Record<string, Certificate[]> = {
  '10.1': [cert(certCouncil, '2', 'Society for Data Science (S4DS) — Membership certificate')],
  '10.2': [cert(certCouncil, '1', 'Student Council, DYPCOEI — Certificate of appreciation')],
  '10.3': [cert(certCouncil, '3', 'Society for Data Science (S4DS) — Membership certificate')],
};

export const socialActivityImages: Certificate[] = [
  cert(certSocial, '1', 'Rotary Mega Medical Centre', 'Blood donation — certificate of appreciation'),
  cert(certSocial, '2', 'Dr. D. Y. Patil Blood Centre', 'Blood donation — certificate of honour'),
  cert(certSocial, '3', 'Chakan Blood Centre', 'Blood donation — certificate of appreciation'),
  cert(certSocial, '4', 'Bhavar Blood Centre', 'Blood donation certificate'),
  cert(certSocial, '5', 'Bhavar Blood Centre', 'Blood donation certificate'),
  cert(certSocial, '6', 'Lifeline Blood Centre', 'Blood donation — certificate of honour'),
  cert(certSocial, '7', 'Talegaon Dabhade Municipal Council', 'Swachhata Hi Seva campaign'),
];
