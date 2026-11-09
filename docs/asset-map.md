# Asset Map

Every source asset in the project folder and where it appears on the site.
Originals are never modified. `scripts/build-assets.mjs` writes WebP derivatives
(`-thumb.webp` and `-large.webp`) to `public/media/<group>/` and records their
dimensions in `src/data/assets.generated.ts`. The certificate-to-entry mapping
used by the site lives in `src/data/media.ts`.

Total: 129 source images (60 gallery, 9 logos/institution images, 58 certificates
and letters, 2 portraits). The 3 logo files inside `Internship Certificates/` are
byte-identical duplicates of files in `Logos/` and are served from `Logos/`.

## 1. Personal and professional photography

| File | Original location | Category | Section | Display |
|---|---|---|---|---|
| Hero Section.png | / | Professional photography | Hero | Right-side hero portrait; also cropped to `public/og-image.jpg` for social sharing |
| Vedant Lanjekar.jpg | / | Professional photography | 01 Professional Profile | Portrait beside the summary |
| 1.JPG – 60.jpg (mixed .jpg/.JPG/.jpeg) | Gallery/ | Personal and event photography | 14 Gallery | All 60 photos, distributed across the moving gallery tracks; each opens in the gallery viewer |

Gallery file list (all included): 1.JPG, 2.jpg, 3.jpg, 4.jpeg, 5.jpg, 6.jpg, 7.jpg, 8.jpg, 9.jpg, 10.jpg, 11.jpg, 12.jpg, 13.jpg, 14.JPG, 15.jpg, 16.jpg, 17.JPG, 18.jpg, 19.jpg, 20.jpg, 21.jpg, 22.jpg, 23.jpg, 24.jpg, 25.jpg, 26.jpg, 27.jpg, 28.jpg, 29.jpg, 30.jpg, 31.jpg, 32.jpg, 33.jpg, 34.jpg, 35.jpg, 36.jpg, 37.jpg, 38.jpg, 39.JPG, 40.JPG, 41.JPG, 42.jpg, 43.jpg, 44.jpg, 45.jpeg, 46.jpeg, 47.jpeg, 48.jpeg, 49.jpeg, 50.jpeg, 51.jpeg, 52.jpeg, 53.jpeg, 54.jpeg, 55.jpeg, 56.jpeg, 57.jpeg, 58.jpeg, 59.jpg, 60.jpg.

## 2. Organization logos and institution images

| File | Original location | Category | Section | Associated organization | Display |
|---|---|---|---|---|---|
| Vlamet Logo.jpg | Logos/ | Organization logo | 07 Experience | Valmet Technologies Private Limited | Timeline entry 7.1 |
| Bharat Electrical & Engineering Logo.jpg | Logos/ | Organization logo | 07 Experience | Bharat Electrical & Engineering | Timeline entry 7.2 |
| Dr. D. Y. Patil College of Engioneering & Innovation Logo.jpeg | Logos/ | Organization logo | 02 Education, 07 Experience | Dr. D. Y. Patil College of Engineering & Innovation | Education 2.1; Experience 7.3 |
| Dr. D. Y. Patil College of Engioneering & Innovation.webp | Logos/ | Institution photograph | 02 Education | Dr. D. Y. Patil College of Engineering & Innovation | Campus image on entry 2.1 |
| New horizon Public School Logo.png | Logos/ | Organization logo | 02 Education | New Horizon Public School | Entries 2.2, 2.3, 2.4 |
| New horizon Public School.jpg | Logos/ | Institution photograph | 02 Education | New Horizon Public School | Campus image on entries 2.2, 2.3 and 2.4 (New Horizon) |
| The Indian School Logo.jpg | Logos/ | Organization logo | 02 Education | The Indian School, Bahrain | Entry 2.4 |
| The Indian School.jpg | Logos/ | Institution photograph | 02 Education | The Indian School, Bahrain | Campus image on entry 2.4 (The Indian School) |
| Acmegrade Logo.png | Logos/ | Organization logo | 07 Experience | Acmegrade | Timeline entry 7.4 |

Not supplied, so shown as text wordmarks: Mood Indigo, IIT Bombay, Dr. D. Y. Patil Institute of Management and Entrepreneurship, Dr. D. Y. Patil Technical Campus.

Technology and platform logos come from the `react-icons` package (Simple Icons and Font Awesome brand sets). Technologies with no established logo are shown as monospaced text wordmarks.

## 3. Certificates: Workshop & Course Certificates/

| File | Category | Section | Associated entry |
|---|---|---|---|
| 1.jpg | Certificate | 08 Certifications | 8.2 Microsoft — Data Analyst Career Path |
| 2.png | Certificate | 08 Certifications | 8.3 Cisco Networking Academy — Introduction to Modern AI |
| 3.png | Certificate | 08 Certifications | 8.4 Cisco Networking Academy — Introduction to Data Science |
| 4.jpg | Certificate | 08 Certifications | 8.5 Infosys Springboard — Drone Technology |
| 5.jpg | Certificate | 08 Certifications | 8.1 NPTEL — Python for Data Science |
| 6.jpg | Certificate | 08 Certifications | 8.7 National-Level Workshop — DevOps |
| 7.jpg | Certificate | 08 Certifications | 8.6 Infosys Springboard — Traffic Light System (Centrado Kit) |
| 8.jpg | Certificate | 08 Certifications | 8.10 VISHWAPRENEUR’25 |
| 9.jpg | Certificate | 08 Certifications | 8.8 One-Week Faculty Development Program — Cyber-Physical Systems and IoT |
| 10.jpg | Certificate | 08 Certifications | 8.9 Industrial Training Program — IoT Do-It-Yourself IDE |

## 4. Certificates: Hackathon, Ideathon, Project Exibition, Conference Certificates/

| File | Section | Associated entry |
|---|---|---|
| 1.jpg | 09 Achievements | 9.1.6 Pragyantra AI Hackathon 2K26 |
| 2.jpg | 09 Achievements | 9.1.7 M-Pulse Ignite — Design X 2K26 |
| 3.jpg | 09 Achievements | 9.1.3 Byte Battle Hackathon 2K26 |
| 4.jpg | 09 Achievements | 9.1.5 VishwaNova Project Exhibition 2K26 |
| 5.jpg | 09 Achievements | 9.2.5 Sci Tech Villagethon |
| 6.jpg | 09 Achievements | 9.2.4 International Conference 2K25 |
| 7.jpg | 09 Achievements | 9.1.10 Pixel War 2K26 |
| 8.jpg | 09 Achievements (archive) | Antarang 2K24 project exhibition certificate (not linked to a specific entry) |
| 9.jpg | 09 Achievements | 9.2.6 Hack A Thought |
| 10.jpg | 09 Achievements | 9.2.3 Idea Pitch Competition – Startup |
| 11.png | 09 Achievements (archive) | Ignition Hackverse participation certificate |
| 12.jpg | 09 Achievements (archive) | Navdhara poster and project competition certificate |
| 13.jpg | 09 Achievements | 9.3.1 Digital Poster Making Competition |
| 14.jpg | 09 Achievements | 9.1.11 Ideathon 2K26 |
| 15.jpg | 09 Achievements | 9.1.8 Orchestron Agentic AI Hackathon 2K26 |
| 16.jpg | 09 Achievements | 9.1.12 Innovators Hackathon 2K26 |
| 17.jpg | 09 Achievements | 9.3.5 Department-Level Project Competition |
| 18.jpg | 09 Achievements | 9.2.1 Fusion Hackathon 2K25 |
| 19.jpg | 09 Achievements | 9.2.9 KIT – Ideathon 2K25 |
| 20.jpg | 09 Achievements (archive) | Poster Presentation Competition certificate |
| 21.jpg | 09 Achievements | 9.2.2 SciTech Innovation Hackathon 2K25 |
| 22.jpg | 09 Achievements | 9.2.7 Techno Sci 2K25 |
| 23.jpeg | 09 Achievements (archive) | LOC 8.0 hackathon participation certificate |
| 24.jpeg | 09 Achievements (archive) | GMRT Science Day Exhibition certificate (VIRO-AI) |
| 25.jpeg | 09 Achievements (archive) | AI-DS Project Showcase’25 certificate (DriveU) |
| 26.jpeg | 09 Achievements (archive) | Innovate’25 AI-DS Seminar Contest certificate |

## 5. Certificates: Internship Certificates/

| File | Section | Associated entry |
|---|---|---|
| 1.jpeg | 07 Experience | 7.2 Bharat Electrical & Engineering — offer letter |
| 2.jpeg | 07 Experience | 7.2 Bharat Electrical & Engineering — certificate of completion |
| 3.jpg | 07 Experience | 7.4 Acmegrade x Mood Indigo — certificate of training completion |
| 4.jpg | 07 Experience | 7.4 Acmegrade — internship certification |
| Valmet Internship Letter.jpg | 07 Experience | 7.1 Valmet — internship letter |
| Valmet Internship Letter Extension.jpg | 07 Experience | 7.1 Valmet — internship extension letter |

## 6. Certificates: Student Council/ and Social Activity Certificates/

| File | Location | Section | Associated entry |
|---|---|---|---|
| 1.jpg | Student Council/ | 10 Leadership | 10.2 Media / Marketing / Magazine Secretary — Student Council |
| 2.png | Student Council/ | 10 Leadership | Society for Data Science (S4DS) membership certificate (10.1) |
| 3.jpg | Student Council/ | 10 Leadership | Society for Data Science (S4DS) membership certificate (10.3) |
| 1.jpg – 6.jpg | Social Activity Certificates/ | 10 Leadership and Volunteering | Blood donation certificates (volunteering record) |
| 7.jpg | Social Activity Certificates/ | 10 Leadership and Volunteering | Talegaon Dabhade Municipal Council — Swachhata Hi Seva campaign |

## 7. Certificates: Educational Certificates/

| File | Section | Associated entry |
|---|---|---|
| 1.jpg | 02 Education | 2.1 B.E. — SPPU statement of grades, Semester IV (April 2025); shown under Semester IV in the SGPA chart |
| 2.jpg | 02 Education | 2.1 B.E. — SPPU statement of grades, Semester III (October 2024); shown under Semester III |
| 3.jpg | 02 Education | 2.1 B.E. — SPPU statement of grades, Semester II (April 2024); shown under Semester II |
| 4.jpg | 02 Education | 2.1 B.E. — SPPU statement of grades, Semester I (October 2023); shown under Semester I |
| 5.jpg | 02 Education | 2.2 HSC — CBSE marks statement; shown beside the 73.92% score |
| 6.jpeg | 02 Education | 2.3 SSC — CBSE marks statement; shown beside the 87.92% score |

## 8. Other source files

| File | Purpose |
|---|---|
| Vedant_Lanjekar_Raw_Data.md | Authoritative content source, transcribed into `src/data/*.ts` |
| Vedant Lanjekar Raw Data.docx | Same content as the Markdown file; not used directly |
