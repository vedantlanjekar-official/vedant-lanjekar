export interface SchoolRecord {
  period: string;
  board: string;
  grade: string;
}

type School = 'dypcoei' | 'newHorizon' | 'indianSchool';

export interface EducationEntry {
  id: string;
  num: string;
  title: string;
  institution: string;
  rows: { label: string; value: string }[];
  sgpa?: { semester: string; sgpa: string }[];
  schoolRecords?: { school: string; records: SchoolRecord[] }[];
  logo: School;
  campus?: School;
}

export const education: EducationEntry[] = [
  {
    id: 'degree',
    num: '2.1',
    title: 'Bachelor of Engineering — Artificial Intelligence and Data Science',
    institution: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune',
    rows: [
      { label: 'Institution', value: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune' },
      { label: 'Duration', value: '2023–2027' },
      { label: 'Status', value: 'Currently pursuing' },
    ],
    sgpa: [
      { semester: 'Semester I', sgpa: '9.59' },
      { semester: 'Semester II', sgpa: '9.27' },
      { semester: 'Semester III', sgpa: '9.86' },
      { semester: 'Semester IV', sgpa: '9.32' },
      { semester: 'Semester V', sgpa: '9.14' },
      { semester: 'Semester VI', sgpa: '9.73' },
    ],
    logo: 'dypcoei',
    campus: 'dypcoei',
  },
  {
    id: 'hsc',
    num: '2.2',
    title: 'Higher Secondary Education — HSC',
    institution: 'New Horizon Public School, New Panvel',
    rows: [
      { label: 'Institution', value: 'New Horizon Public School, New Panvel' },
      { label: 'Academic Year', value: '2022–2023' },
      { label: 'Board', value: 'CBSE' },
      { label: 'Score', value: '73.92%' },
    ],
    logo: 'newHorizon',
    campus: 'newHorizon',
  },
  {
    id: 'ssc',
    num: '2.3',
    title: 'Secondary Education — SSC',
    institution: 'New Horizon Public School, New Panvel',
    rows: [
      { label: 'Institution', value: 'New Horizon Public School, New Panvel' },
      { label: 'Academic Year', value: '2021–2022' },
      { label: 'Board', value: 'CBSE' },
      { label: 'Score', value: '87.92%' },
    ],
    logo: 'newHorizon',
    campus: 'newHorizon',
  },
  {
    id: 'early-nhps',
    num: '2.4',
    title: 'Earlier Schooling',
    institution: 'New Horizon Public School, New Panvel',
    rows: [],
    schoolRecords: [
      {
        school: 'New Horizon Public School, New Panvel',
        records: [{ period: '2015–2021', board: 'CBSE', grade: 'A+' }],
      },
    ],
    logo: 'newHorizon',
    campus: 'newHorizon',
  },
  {
    id: 'early-tis',
    num: '2.4',
    title: 'Earlier Schooling',
    institution: 'The Indian School, Bahrain',
    rows: [],
    schoolRecords: [
      {
        school: 'The Indian School, Bahrain',
        records: [{ period: '2009–2015', board: 'CBSE', grade: 'A+' }],
      },
    ],
    logo: 'indianSchool',
    campus: 'indianSchool',
  },
];
