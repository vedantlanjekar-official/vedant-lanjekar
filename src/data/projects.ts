export interface AivoraApp {
  no: string;
  name: string;
  subtitle: string;
  bullets: string[];
  live: string;
  repo: string;
  vision: string;
  mission: string;
  objectives: string[];
}

export interface Project {
  num: string;
  name: string;
  subtitle?: string;
  duration?: string;
  positioning?: string;
  fullForm?: string;
  intro?: { lead: string; leadEmphasis?: string; body: string };
  role: string;
  domains: string;
  overview: string[];
  vision: string;
  mission: string;
  objectives: string[];
  stack: string[];
  technologyAreas?: string;
  publication?: string[];
  repo?: string;
  ecosystem?: { mainPlatform: string; mainRepository: string };
  apps?: AivoraApp[];
}

export const aivoraApps: AivoraApp[] = [
  {
    no: '1',
    name: 'AIVORA Atlas',
    subtitle: 'Component Knowledge Hub',
    bullets: [
      'Provides access to electronic component information and technical resources.',
      'Supports datasheet exploration, specifications, pin information, and component comparison.',
      'Includes intelligent component discovery and recommendation capabilities.',
    ],
    live: 'https://aivora-atlas.vercel.app/',
    repo: 'https://github.com/aivora-labs-official/AIVORA-Atlas.git',
    vision: 'To make electronic-component knowledge easier to discover, explore, compare, and understand.',
    mission:
      'To provide an accessible component knowledge hub with technical resources, datasheets, specifications, pin information, component comparisons, and intelligent discovery and recommendation capabilities.',
    objectives: [
      'Provide access to electronic-component information and technical resources.',
      'Support datasheet exploration, component specifications, and pin-information lookup.',
      'Enable comparison of electronic components.',
      'Support intelligent component discovery and recommendation.',
    ],
  },
  {
    no: '2',
    name: 'AIVORA DigiLab',
    subtitle: 'IoT Simulator',
    bullets: [
      'Enables virtual circuit building and embedded-system experimentation.',
      'Supports code execution, circuit behaviour simulation, and debugging workflows.',
    ],
    live: 'https://aivora-digilab.vercel.app/',
    repo: 'https://github.com/aivora-labs-official/AIVORA-DigiLab.git',
    vision: 'To make virtual circuit building and embedded-system experimentation more accessible.',
    mission:
      'To provide a digital environment for building virtual circuits, experimenting with embedded systems, executing code, simulating circuit behaviour, and debugging workflows.',
    objectives: [
      'Enable virtual circuit building.',
      'Support embedded-system experimentation.',
      'Provide code-execution and circuit-behaviour simulation workflows.',
      'Support debugging during virtual engineering experiments.',
    ],
  },
  {
    no: '3',
    name: 'AIVORA Forge',
    subtitle: 'AI Auto Builder',
    bullets: [
      'Converts natural-language engineering requirements into structured solution concepts.',
      'Supports proposed architectures, component selection, circuit concepts, firmware, and documentation.',
    ],
    live: 'https://aivora-forge.vercel.app/',
    repo: 'https://github.com/aivora-labs-official/AIVORA-Forge.git',
    vision: 'To help translate engineering ideas and natural-language requirements into structured solution concepts.',
    mission:
      'To use AI-assisted workflows to support the development of engineering concepts, including proposed architectures, component selection, circuit concepts, firmware, and documentation.',
    objectives: [
      'Convert natural-language engineering requirements into structured solution concepts.',
      'Support the generation of proposed system architectures.',
      'Assist with component selection and circuit-concept development.',
      'Support firmware and engineering-documentation workflows.',
    ],
  },
  {
    no: '4',
    name: 'AIVORA Flux',
    subtitle: 'AI PCB Builder',
    bullets: [
      'Supports PCB design workflows, including component placement and routing.',
      'Includes design validation and optimization capabilities.',
      'Aims to generate manufacturing-oriented design outputs.',
    ],
    live: 'https://aivora-flux.vercel.app/',
    repo: 'https://github.com/aivora-labs-official/AIVORA-Flux.git',
    vision: 'To support more accessible and structured PCB design workflows.',
    mission:
      'To support PCB development through component placement, routing, design validation, optimization, and manufacturing-oriented design outputs.',
    objectives: [
      'Support PCB component-placement workflows.',
      'Support PCB routing workflows.',
      'Include design-validation and optimization capabilities.',
      'Aim to generate manufacturing-oriented design outputs.',
    ],
  },
  {
    no: '5',
    name: 'AIVORA Nexus',
    subtitle: 'Engineering Community',
    bullets: [
      'Connects engineers and learners through project showcases and technical discussions.',
      'Supports help requests, knowledge sharing, and collaborative development.',
    ],
    live: 'https://aivora-nexus.vercel.app/',
    repo: 'https://github.com/aivora-labs-official/AIVORA-Nexus.git',
    vision: 'To connect engineers and learners through an accessible engineering-focused community.',
    mission:
      'To provide a collaborative environment for project showcases, technical discussions, help requests, knowledge sharing, and collaborative development.',
    objectives: [
      'Connect engineers and learners through project showcases.',
      'Support technical discussions and help requests.',
      'Facilitate engineering knowledge sharing.',
      'Encourage collaborative project development.',
    ],
  },
  {
    no: '6',
    name: 'AIVORA Signature',
    subtitle: 'AI CV and Portfolio Builder',
    bullets: [
      'Organizes engineering projects, skills, certifications, achievements, and professional details.',
      'Supports the creation of structured CV and portfolio content.',
    ],
    live: 'https://aivora-signature.vercel.app/',
    repo: 'https://github.com/aivora-labs-official/AIVORA-Signature.git',
    vision:
      'To make the organization and presentation of engineering experience and professional capabilities more accessible.',
    mission:
      'To help users organize their engineering projects, skills, certifications, achievements, and professional details into structured CV and portfolio content.',
    objectives: [
      'Organize engineering project information.',
      'Structure skills, certifications, and achievements.',
      'Include relevant professional details in one organized workflow.',
      'Support the creation of structured CV and portfolio content.',
    ],
  },
  {
    no: '7',
    name: 'AIVORA Horizon',
    subtitle: 'Assessment and Certification',
    bullets: [
      'Supports technical assessments, quizzes, and competency tracking.',
      'Includes progress analytics, badges, and certification-oriented learning workflows.',
    ],
    live: 'https://aivora-horizon.vercel.app/',
    repo: 'https://github.com/aivora-labs-official/AIVORA-Horizon.git',
    vision: 'To support technical competency development through structured assessment and progress visibility.',
    mission:
      'To provide technical assessments, quizzes, competency tracking, progress analytics, badges, and certification-oriented learning workflows.',
    objectives: [
      'Support technical assessments and quizzes.',
      'Track technical competencies.',
      'Provide progress analytics and badges.',
      'Support certification-oriented learning workflows.',
    ],
  },
];

export const projects: Project[] = [
  {
    num: '4.1',
    name: 'AIVORA Labs',
    subtitle: 'Integrated AI Engineering Ecosystem',
    duration: 'November 2025 – Present',
    positioning: 'Where Ideas Become Intelligent Engineering',
    fullForm: 'Artificial Intelligence for Virtual Observation, Research & Automation Labs',
    role: 'Founder, Lead System Architect, and Full-Stack AI Developer',
    domains:
      'Artificial Intelligence, Machine Learning, IoT, Embedded Systems, Electronics, Cloud Computing, PCB Design, and Engineering Simulation',
    overview: [
      'AIVORA Labs is an integrated, AI-powered digital engineering ecosystem designed to connect technology learning, practical experimentation, intelligent engineering development, hardware design, collaboration, and professional skill development.',
      'The ecosystem brings together specialized applications for different stages of the engineering journey. It is intended to help students, developers, researchers, educators, and innovators discover electronic components, experiment with virtual systems, develop engineering solutions, design hardware, collaborate on projects, assess technical competencies, and present their work.',
      'Rather than operating as a collection of unrelated tools, AIVORA Labs is structured around seven connected applications under a shared engineering ecosystem.',
    ],
    vision:
      'To make intelligent engineering learning, experimentation, development, and collaboration accessible through one connected digital ecosystem.',
    mission:
      'To build and connect AI-powered engineering applications that support component discovery, virtual experimentation, solution development, hardware design, collaboration, competency assessment, and professional presentation.',
    objectives: [
      'Integrate seven specialized applications into one connected engineering ecosystem.',
      'Support the discovery and exploration of electronic components, datasheets, specifications, and technical resources.',
      'Provide digital environments for circuit building, embedded-system experimentation, engineering solution development, and PCB design workflows.',
      'Enable engineering collaboration, technical competency assessment, and the presentation of projects and professional skills.',
    ],
    stack: [],
    technologyAreas:
      'Artificial Intelligence models, IoT simulation platforms, Python, Node.js, React.js, cloud infrastructure, embedded systems frameworks, PCB design tools, automation engines, and web technologies.',
    ecosystem: {
      mainPlatform: 'https://aivora-labs-ecosystem.vercel.app/',
      mainRepository: 'https://github.com/aivora-labs-official/AIVORA-Labs.git',
    },
    apps: aivoraApps,
  },
  {
    num: '4.2',
    name: 'VIRO-AI',
    subtitle: 'Viral Insight Rapid Optimization Analytics Intelligence',
    duration: 'January 2025 – May 2025',
    role: 'AI Research Developer and Model Architect',
    domains: 'Bioinformatics, AI for Healthcare, Computational Biology, Predictive Modeling, and Molecular Analytics',
    overview: [
      'VIRO-AI is an AI-driven research concept focused on predicting viral evolution through genetic algorithms and molecular-dynamics-based analysis. The system is designed to model mutations, protein changes, and host interactions by integrating multi-omics data and evaluating potential structural impacts.',
      'Its intended applications include identifying potentially high-risk variants and supporting research workflows related to vaccine and drug development. The platform is positioned as an adaptive framework for biosurveillance and therapeutic research.',
    ],
    vision:
      'To support adaptive computational research into viral evolution, molecular changes, and potential biological impacts.',
    mission:
      'To combine genetic algorithms, molecular-dynamics-based analysis, and multi-omics data to study viral mutations, protein changes, and host interactions for biosurveillance and therapeutic research workflows.',
    objectives: [
      'Model aspects of viral evolution through genetic-algorithm-based analysis.',
      'Examine mutations and protein changes using molecular-dynamics-based analysis.',
      'Integrate multi-omics data to evaluate host interactions and potential structural impacts.',
      'Support research workflows for identifying potentially high-risk variants and informing vaccine and drug development research.',
    ],
    stack: ['Python', 'TensorFlow', 'Genetic Algorithms', 'Molecular Dynamics Engines', 'Bioinformatics Libraries', 'Data Visualization Tools'],
    repo: 'https://github.com/vedantlanjekar-official/VIRO-AI---Viral-Insight-Rapid-Optimization-Analytics-Intelligence.git',
  },
  {
    num: '4.3',
    name: 'ARC-AI',
    subtitle: 'Autonomous Regional Cognitive Artificial Intelligence',
    duration: 'January 2025 – May 2025',
    role: 'Embedded AI Systems Developer and Frontend Developer',
    domains: 'Edge AI, Decentralized Systems, Mesh Networks, Offline AI, LoRa Communication, and Knowledge Engineering',
    overview: [
      'ARC-AI is a decentralized, offline AI mesh concept designed to support intelligent interactions without dependence on continuous internet connectivity. It uses a Main Hub and Mini Hub architecture with local inference and LoRa-based communication.',
      'The system includes cryptographically signed Knowledge Capsules for structured knowledge exchange. Its intended application areas include resilient edge-based AI services and knowledge sharing in remote or connectivity-constrained regions.',
    ],
    vision: 'To enable resilient access to intelligent systems in remote and connectivity-constrained regions.',
    mission:
      'To develop a decentralized, offline AI mesh that combines Main Hub and Mini Hub architecture, local inference, LoRa-based communication, and cryptographically signed Knowledge Capsules.',
    objectives: [
      'Support intelligent interactions without dependence on continuous internet connectivity.',
      'Use a Main Hub and Mini Hub architecture to organize decentralized AI operations.',
      'Enable communication between distributed components through LoRa-based connectivity.',
      'Support structured knowledge exchange through cryptographically signed Knowledge Capsules.',
    ],
    stack: ['LoRa Communication Modules', 'Edge AI Models', 'Python', 'Embedded Systems', 'Local Inference Engines', 'Knowledge Capsule Cryptography'],
    repo: 'https://github.com/vedantlanjekar-official/ARC-AI---Autonomous-Regional-Cognitive-Artificial-Intelligence.git',
  },
  {
    num: '4.4',
    name: 'Aerial Pharmacobotany',
    subtitle: 'Drone-Integrated Pharmacobotanical Intelligence Platform',
    duration: 'January 2024 – May 2024',
    role: 'AI Vision Engineer and Drone Data Analyst',
    domains:
      'UAV and Drone Systems, Computer Vision, Plant Intelligence, Environmental Monitoring, AI for Biology, and Geospatial Analytics',
    overview: [
      'Aerial Pharmacobotany combines UAV-based imaging, AI-powered plant classification, and phytochemical information to support the identification of medicinal flora in natural habitats.',
      'The platform uses aerial imagery and deep-learning-based recognition to support plant identification, geotagging, and medicinal profiling. Its intended applications include botanical research, conservation, environmental monitoring, and pharmacobotanical exploration.',
    ],
    vision:
      'To support the discovery, documentation, and study of medicinal flora through aerial imaging and computational intelligence.',
    mission:
      'To combine UAV-based imaging, AI-powered plant classification, phytochemical information, and geospatial analysis to support plant identification, geotagging, and medicinal profiling.',
    objectives: [
      'Use drone and UAV imaging to capture visual information from natural habitats.',
      'Apply computer-vision and deep-learning-based recognition to support medicinal plant classification.',
      'Support plant geotagging and the association of identified flora with medicinal profiles.',
      'Contribute to botanical research, conservation, environmental monitoring, and pharmacobotanical exploration.',
    ],
    stack: ['Drone and UAV Platforms', 'OpenCV', 'YOLO and Deep Learning Models', 'GIS Mapping Tools', 'Python', 'Aerial Imaging Sensors'],
    publication: [
      'International conference paper, as listed in the supplied material',
      'ISSN: 2319-2526',
      'Volume 14, Issue 01, 2025',
    ],
    repo: 'https://github.com/vedantlanjekar-official/Aerial-Pharmacobotany---Drone-Integrated-Pharmacobotanical-Intelligence-Platform.git',
  },
  {
    num: '4.5',
    name: 'SRANS',
    subtitle: 'Smart Regional Alert Navigation System',
    duration: 'January 2024 – May 2024',
    role: 'AI/IoT System Developer',
    domains: 'Smart City Solutions, GIS, IoT, Real-Time Analytics, Civic Technology, and Navigation Systems',
    overview: [
      'SRANS is an IoT-, AI-, and GIS-enabled civic information platform designed to deliver location-based alerts and smart navigation support.',
      'The system brings together information from sensors, APIs, and crowdsourced reports. It processes incoming events through machine-learning workflows and presents verified updates to citizens and relevant authorities. Its intended objectives include improving situational awareness, public safety, and smart-city decision support.',
    ],
    vision:
      'To help communities and relevant authorities make informed decisions through timely, location-based civic information.',
    mission:
      'To combine IoT, AI, and GIS capabilities with information from sensors, APIs, and crowdsourced reports to provide location-based alerts and smart navigation support.',
    objectives: [
      'Bring together incoming information from IoT sensors, APIs, and crowdsourced reports.',
      'Process reported events through machine-learning workflows.',
      'Present verified, location-based updates to citizens and relevant authorities.',
      'Support situational awareness, public safety, and smart-city decision-making.',
    ],
    stack: ['IoT Sensors', 'GIS Platforms', 'Python', 'Node.js', 'Machine Learning Models', 'Cloud APIs', 'Real-Time Data Pipelines'],
    repo: 'https://github.com/vedantlanjekar-official/SRANS---Smart-Regional-Alert-Navigation-System.git',
  },
  {
    num: '4.6',
    name: 'BRAILLEAR',
    subtitle: 'Smart Touch-to-Speech Learning System for the Visually Impaired',
    duration: 'January 2024 – march 2024',
    role: 'Embedded Hardware Developer and System Designer',
    domains: 'Assistive Technology, Embedded Systems, Accessibility Engineering, EdTech, and Human–Computer Interaction',
    overview: [
      'BRAILLEAR is a touch-based Braille learning system designed to provide real-time audio feedback. It uses TTP223 capacitive touch sensors and a Raspberry Pi Pico to translate touch interactions into spoken feedback.',
      'The project focuses on accessible and multisensory Braille learning through a low-cost, portable, and modular embedded design. Its objective is to support inclusive learning experiences for visually impaired users.',
    ],
    vision: 'To make Braille learning more accessible through tactile interaction and real-time audio feedback.',
    mission:
      'To develop a touch-based Braille learning system that uses capacitive touch sensors and a Raspberry Pi Pico to translate touch interactions into spoken feedback.',
    objectives: [
      'Capture touch interactions through TTP223 capacitive touch sensors.',
      'Use the Raspberry Pi Pico to process the detected touch inputs.',
      'Translate touch interactions into spoken audio feedback.',
      'Support accessible, multisensory Braille learning through a low-cost, portable, and modular embedded design.',
    ],
    stack: ['Raspberry Pi Pico', 'TTP223 Capacitive Touch Sensors', 'Embedded C/C++', 'Python for Audio Processing', 'Speaker and Audio Output'],
    repo: 'https://github.com/vedantlanjekar-official/BRAILLEAR---Smart-Touch-To-Speech-Learning-System-For-The-Visually-Impaired.git',
  },
  {
    num: '4.7',
    name: 'Insight Sphere AI',
    subtitle: 'Intelligent Conversations Powered by Precision',
    duration: 'January 2025 – January 2025',
    role: 'AI Backend and Full-Stack Developer',
    domains: 'Conversational AI, NLP, Local LLMs, Backend Engineering, FastAPI, and Secure AI Systems',
    overview: [
      'Insight Sphere AI is a locally executed conversational AI system built with FastAPI and Ollama. It is designed to provide private, low-latency interactions without requiring every inference request to be processed by a remote model service.',
      'Its modular backend and streaming-oriented interface are intended to support customization, model integration, and domain-specific conversational applications.',
    ],
    vision: 'To make conversational AI more private and responsive through local model execution.',
    mission:
      'To provide a modular, locally executed conversational AI system using FastAPI and Ollama, with a streaming-oriented interface that supports customization and domain-specific applications.',
    objectives: [
      'Run conversational AI locally through Ollama.',
      "Use FastAPI to provide the system's backend application interface.",
      'Support private, low-latency interactions without requiring every inference request to be processed by a remote model service.',
      'Provide modular backend and streaming-oriented capabilities for customization, model integration, and domain-specific conversational applications.',
    ],
    stack: ['FastAPI', 'Ollama', 'Python', 'JavaScript', 'Modular Backend Architecture', 'Local LLM Execution'],
    repo: 'https://github.com/vedantlanjekar-official/Insight-Sphere-AI---Intelligent-Conversatiions-Powered-By-Presicion.git',
  },
  {
    num: '4.8',
    name: 'Gesture Drive XT',
    subtitle: 'Wireless Motion Control for Mobility',
    duration: 'June 2024 July 2024',
    role: 'Embedded Systems Engineer',
    domains: 'Robotics, IoT, Embedded Systems, Gesture Recognition, and Mobility Engineering',
    overview: [
      'Gesture Drive XT is a wireless gesture-controlled mobility prototype that translates hand movement into motion commands. An ADXL335 accelerometer captures hand orientation, an Arduino Nano processes the input, and an NRF24L01 wireless link transmits commands to the motor-control system.',
      'An L298N motor driver controls motor execution. The modular design supports embedded-systems learning and rapid prototyping of gesture-based mobility interfaces.',
    ],
    vision: 'To explore intuitive, gesture-based wireless control for mobility applications.',
    mission:
      'To develop a mobility-control prototype that converts hand movement into motion commands using an ADXL335 accelerometer, an Arduino Nano, an NRF24L01 wireless link, and an L298N motor driver.',
    objectives: [
      'Capture hand orientation through the ADXL335 accelerometer.',
      'Process the captured input using the Arduino Nano.',
      'Transmit motion commands wirelessly through the NRF24L01 module.',
      'Execute motor-control commands through the L298N motor driver.',
    ],
    stack: ['Arduino Nano', 'ADXL335 Accelerometer', 'NRF24L01 Wireless Module', 'L298N Motor Driver', 'Embedded C/C++'],
    repo: 'https://github.com/vedantlanjekar-official/Gesture-Drive-XT---Wireless-Motion-Control-For-Mobility.git',
  },
  {
    num: '4.9',
    name: 'VisionDeck Pro',
    subtitle: 'Real-Time Precision Card Recognition Powered by AI',
    duration: 'January 2025 – May 2025',
    role: 'Computer Vision Engineer',
    domains: 'Computer Vision, Object Detection, YOLOv8, AI Automation, and Real-Time Analytics',
    overview: [
      'VisionDeck Pro is a computer vision system designed to detect and recognize all 52 playing cards using a YOLOv8-based model. The project focuses on recognition across variations in lighting, orientation, and camera input.',
      'A Streamlit interface provides an accessible way to interact with the detection pipeline and inspect model outputs.',
    ],
    vision: 'To make playing-card recognition more accessible and responsive across varied visual conditions.',
    mission:
      'To develop a YOLOv8-based computer-vision system for detecting and recognizing all 52 playing cards, supported by an interface for interacting with the detection pipeline and inspecting model outputs.',
    objectives: [
      'Detect and recognize all 52 playing cards using a YOLOv8-based model.',
      'Focus recognition workflows on variations in lighting conditions.',
      'Support recognition across variations in card orientation and camera input.',
      'Provide an accessible Streamlit interface for interacting with the detection pipeline and inspecting model outputs.',
    ],
    stack: ['YOLOv8', 'Python', 'OpenCV', 'Streamlit', 'GPU Acceleration'],
    repo: 'https://github.com/vedantlanjekar-official/VisionDeck-Pro---Real-Time-Precision-Card-Recognition-Powered-By-AI.git',
  },
  {
    num: '4.10',
    name: 'ACE EYE',
    subtitle: 'Vision-Driven Intelligence for Card Mastery',
    duration: 'January 2025 – May 2025',
    role: 'AI Model Developer and Backend Engineer',
    domains: 'Computer Vision, Real-Time AI, WebSockets, GPU Deployment, and Gaming Analytics',
    overview: [
      'ACE EYE is a real-time playing-card detection and classification system built around a YOLOv8 model. The supplied project description reports sub-50 ms latency and accuracy above 95%.',
      'The system integrates FastAPI and WebSockets with GPU-oriented deployment to support responsive visual recognition and real-time communication. The described application areas include gaming analytics, automation, and interactive AI systems.',
    ],
    vision: 'To enable responsive, real-time visual recognition for card-based interactive applications.',
    mission:
      'To build a playing-card detection and classification system around YOLOv8, integrating FastAPI, WebSockets, and GPU-oriented deployment.',
    objectives: [
      'Detect and classify playing cards using a YOLOv8-based model.',
      'Support responsive visual recognition through GPU-oriented deployment.',
      'Enable real-time communication by integrating FastAPI and WebSockets.',
      'Support application workflows related to gaming analytics, automation, and interactive AI systems.',
    ],
    stack: ['YOLOv8', 'FastAPI', 'WebSockets', 'Python', 'GPU Deployment'],
    repo: 'https://github.com/vedantlanjekar-official/Ace-Eye---Vision-Driven-Intelligence-For-Card-Mastry.git',
  },
  {
    num: '4.12',
    name: 'DriveU',
    subtitle: 'Effortless, Reliable Personal Mobility Access',
    duration: 'January 2025 – May 2025',
    role: 'Platform Architect and Backend Developer',
    domains: 'Mobility Technology, AI Platforms, Cloud Architecture, Real-Time Tracking, and On-Demand Services',
    overview: [
      'DriveU is an AI-enabled mobility platform concept designed to connect users with RTO-verified drivers. Its proposed workflows include secure onboarding, automated matching, transparent dynamic pricing, and real-time GPS tracking.',
      'The platform aims to improve trust and convenience in short-term personal mobility through verified-driver discovery and cloud-based service coordination.',
    ],
    vision:
      'To improve trust and convenience in short-term personal mobility through verified-driver access and coordinated services.',
    mission:
      'To connect users with RTO-verified drivers through secure onboarding, automated matching, transparent dynamic pricing, and real-time GPS tracking.',
    objectives: [
      'Support secure onboarding workflows for the mobility platform.',
      'Enable automated matching between users and RTO-verified drivers.',
      'Support transparent dynamic pricing for short-term personal mobility services.',
      'Provide real-time GPS tracking and cloud-based service coordination.',
    ],
    stack: ['Python', 'Node.js', 'GPS APIs', 'Mobile and Responsive UI', 'Authentication Systems'],
    repo: 'https://github.com/vedantlanjekar-official/DriveU---Effortless-Reliable-Personal-Mobility-Access.git',
  },
  {
    num: '4.13',
    name: 'MEDLOCUS',
    subtitle: 'Precision Care Through Smart Management',
    duration: 'January 2025 – May 2025',
    role: 'Full-Stack Developer and System Designer',
    domains: 'HealthTech, Pharmacy Management, Cloud Solutions, Business Automation, and Inventory Intelligence',
    overview: [
      'MEDLOCUS is a pharmacy-management platform designed to bring inventory, billing, prescriptions, and customer-management workflows into one system.',
      'The platform description includes real-time stock monitoring, alerts, analytics, and cloud synchronization. Its intended benefits include reducing operational errors, improving stock visibility, and supporting more efficient pharmacy workflows.',
    ],
    vision: 'To support more efficient and reliable pharmacy operations through unified digital management.',
    mission:
      'To bring pharmacy inventory, billing, prescriptions, and customer-management workflows into one platform with stock monitoring, alerts, analytics, and cloud synchronization.',
    objectives: [
      'Bring inventory, billing, prescriptions, and customer-management workflows into one system.',
      'Support real-time monitoring of pharmacy stock.',
      'Provide alerts and analytics to improve stock visibility.',
      'Support cloud synchronization and more efficient pharmacy workflows while helping reduce operational errors.',
    ],
    stack: ['Full-Stack Web Development', 'Cloud Synchronization', 'Database Systems', 'Python and/or Node.js', 'Analytics Dashboards'],
    repo: 'https://github.com/vedantlanjekar-official/MEDLOCUS---Precision-Care-Through-Smart-Management.git',
  },
  {
    num: '4.14',
    name: 'VISION BENCH AI',
    subtitle: 'Benchmarking Intelligence Across Real-Time Object Detection Systems',
    duration: 'January 2025 – May 2025',
    role: 'AI Systems Architect, Computer Vision Engineer, and Full-Stack Developer',
    domains:
      'Artificial Intelligence, Computer Vision, Deep Learning, Real-Time Analytics, Object Detection, Performance Benchmarking, and Intelligent Vision Systems',
    overview: [
      'VISION BENCH AI is a computer vision benchmarking platform designed to evaluate and compare object-detection architectures under practical deployment conditions.',
      'The platform brings models such as YOLO, SSD, and Faster R-CNN into a unified evaluation workflow. It supports live inference, visual detection, and comparative performance analysis using measures such as frames per second (FPS), latency, precision, recall, and computational efficiency.',
      'The objective is to help researchers and developers compare model behaviour and identify suitable vision architectures for real-world automation requirements.',
    ],
    vision:
      'To help researchers and developers make informed object-detection architecture choices using practical performance comparisons.',
    mission:
      'To provide a unified computer-vision benchmarking workflow for evaluating and comparing object-detection architectures under practical deployment conditions.',
    objectives: [
      'Bring YOLO, SSD, and Faster R-CNN into a unified evaluation workflow.',
      'Support live inference and visual object detection.',
      'Compare model performance using frames per second (FPS), latency, precision, recall, and computational efficiency.',
      'Help identify vision architectures suited to real-world automation requirements.',
    ],
    stack: [
      'Python',
      'YOLO',
      'SSD',
      'Faster R-CNN',
      'OpenCV',
      'TensorFlow and/or PyTorch',
      'Deep Learning Frameworks',
      'Real-Time Video Processing Pipelines',
      'Performance Analytics Systems',
      'Full-Stack Visualization Tools',
    ],
    repo: 'https://github.com/vedantlanjekar-official/VISION-BENCH-AI---Benchmarking-Intelligence-Across-Real-Time-Object-Detection-System.git',
  },
  {
    num: '4.15',
    name: 'Skillectra',
    subtitle: 'Intelligent Placement Readiness Powered by AI',
    duration: 'November 2025 – November 2025',
    role: 'Product Architect, AI Systems Designer, and Full-Stack Developer',
    domains:
      'AI, Career Analytics, EdTech, Placement Management, Recruitment Intelligence, Skill Assessment, and Employability Technology',
    overview: [
      'Skillectra is an AI-powered placement-readiness and career-intelligence platform designed to help students prepare for internships and recruitment opportunities through structured performance analytics.',
      'Its described capabilities include ATS-oriented resume evaluation, skill-gap analysis, interview-performance tracking, opportunity matching, and unified readiness scoring. The platform aims to provide personalized career insights and measurable progress tracking for students and institutions.',
    ],
    vision: 'To help students and institutions make informed placement-readiness decisions through measurable career insights.',
    mission:
      'To provide an AI-powered placement-readiness and career-intelligence platform that supports resume evaluation, skill-gap analysis, interview tracking, opportunity matching, and readiness scoring.',
    objectives: [
      'Support ATS-oriented resume evaluation.',
      'Identify skill gaps to help students understand areas for improvement.',
      'Track interview performance and placement-readiness progress.',
      'Support opportunity matching and unified readiness scoring for personalized career insights.',
    ],
    stack: [
      'AI Analytics Engines',
      'ATS Evaluation Systems',
      'Python',
      'Database Management Systems',
      'Smart Matching Algorithms',
      'React.js and Dashboard Technologies',
      'Web Application Frameworks',
      'Performance Analytics Modules',
    ],
    repo: 'https://github.com/vedantlanjekar-official/Skillectra---Track-Your-Placement-Journey.-Crack-It-with-Confidence.git',
  },
  {
    num: '4.16',
    name: 'SENTIVIEW',
    subtitle: 'Transforming Tweets into Meaningful Insights',
    duration: 'January 2025 – May 2025',
    role: 'NLP Engineer, Full-Stack Developer, and Data Analytics System Designer',
    domains:
      'AI, Natural Language Processing, Sentiment Analysis, Data Analytics, Social Media Intelligence, and Full-Stack AI Systems',
    overview: [
      'SENTIVIEW is a sentiment-intelligence platform designed to convert social-media conversations into structured analytical insights.',
      'The project combines tweet preprocessing, VADER-based sentiment classification, custom lexical enhancement, API-driven processing, and interactive dashboards. It supports sentiment classification and trend exploration for applications such as public-opinion analysis, business intelligence, and social-media monitoring.',
    ],
    vision: 'To transform social-media conversations into structured sentiment intelligence and meaningful analytical insights.',
    mission:
      'To combine tweet preprocessing, VADER-based sentiment classification, custom lexical enhancement, API-driven processing, and interactive dashboards.',
    objectives: [
      'Preprocess tweet and social-media text for sentiment analysis.',
      'Classify sentiment using VADER-based analysis and custom lexical enhancement.',
      "Support API-driven processing through the platform's analytical workflow.",
      'Present sentiment classifications and trends through interactive dashboards for public-opinion analysis, business intelligence, and social-media monitoring.',
    ],
    stack: [
      'Python',
      'NLTK',
      'VADER Sentiment Analysis',
      'FastAPI',
      'React.js',
      'REST APIs',
      'Data Visualization Libraries',
      'NLP Processing Pipelines',
      'Text Preprocessing Frameworks',
    ],
    repo: 'https://github.com/vedantlanjekar-official/SENTIVIEW---Transforming-Tweets-Into-Meaningful-Insights.git',
  },
  {
    num: '4.17',
    name: 'SECUREWEB LAB',
    subtitle: 'Demonstrating Web Vulnerabilities and HTTPS Security',
    duration: 'January 2025 – May 2025',
    role: 'Cybersecurity System Designer, Secure Web Application Developer, and Security Architecture Engineer',
    domains:
      'Cybersecurity, Secure Web Development, Ethical Security Testing, Network Security, Application Security, and Secure Communication Systems',
    overview: [
      'SECUREWEB LAB is an educational cybersecurity platform designed to demonstrate the differences between vulnerable and secure web application environments through controlled simulations.',
      'It covers comparative HTTP/HTTPS implementations, SSL/TLS workflows, secure authentication, API protection, input validation, and simulated vulnerability demonstrations. The platform is intended to help learners understand common web-security risks and corresponding defensive practices.',
    ],
    vision: 'To improve understanding of web application security through controlled, practical demonstrations.',
    mission:
      'To provide an educational environment for comparing vulnerable and secure web application implementations and demonstrating HTTPS, SSL/TLS, authentication, API protection, and input-validation concepts.',
    objectives: [
      'Demonstrate the differences between vulnerable and secure web application environments through controlled simulations.',
      'Present comparative HTTP/HTTPS implementations and SSL/TLS workflows.',
      'Demonstrate secure authentication, API protection, and input-validation concepts.',
      'Help learners understand common web-security risks and corresponding defensive practices.',
    ],
    stack: [
      'HTTPS',
      'SSL/TLS',
      'Secure Authentication Systems',
      'API Security Mechanisms',
      'Backend Security Frameworks',
      'Web Application Technologies',
      'Input Validation Systems',
      'Secure Communication Protocols',
    ],
    repo: 'https://github.com/vedantlanjekar-official/SECUREWEB-LAB---Demonstrating-Web-Vulnerabilities-HTTPS-Security.git',
  },
  {
    num: '4.18',
    name: 'PROLINK HUB',
    subtitle: 'Intelligent Freelance Connectivity Powered by Trust and Precision',
    duration: 'December  2025 – December 2025',
    role: 'Product Architect, AI Systems Designer, and Full-Stack Platform Strategist',
    domains:
      'AI, Freelance Marketplace, Smart Recruitment, Digital Collaboration, Recommendation Systems, Trust Analytics, and FinTech Workflows',
    overview: [
      'PROLINK HUB is an AI-enabled freelance ecosystem concept designed to improve client–professional collaboration through talent discovery, profile evaluation, and structured project workflows.',
      'Its described capabilities include skill matching, trust scoring, profile verification, recommendations, and escrow-enabled transaction management. The platform aims to support more transparent hiring decisions and coordinated project execution.',
    ],
    vision: 'To foster trusted and transparent collaboration between clients and independent professionals.',
    mission:
      'To develop an AI-enabled freelance ecosystem that supports talent discovery, profile evaluation, and structured project workflows through skill matching, trust scoring, verification, recommendations, and escrow-enabled transaction management.',
    objectives: [
      'Support talent discovery through skill-matching capabilities.',
      'Enable profile evaluation, profile verification, and trust scoring.',
      'Provide recommendations to support more transparent hiring decisions.',
      'Support coordinated project execution and escrow-enabled transaction management.',
    ],
    stack: [
      'AI Matching Algorithms',
      'Recommendation Systems',
      'Cloud Backend Infrastructure',
      'Database Management Systems',
      'Secure Escrow Payment Architecture',
      'Web Application Technologies',
      'Trust Analytics Engines',
      'Workflow Automation Modules',
    ],
    repo: 'https://github.com/vedantlanjekar-official/PROLINK-HUB---Elite-Talent-Intelligent-Connections.git',
  },
  {
    num: '4.19',
    name: 'INSIGHTX',
    subtitle: 'Unlocking Smart Decisions from Big Data',
    duration: 'January 2025 – May 2025',
    role: 'Big Data Systems Architect, Machine Learning Engineer, and Analytics Workflow Developer',
    domains:
      'Big Data Analytics, Machine Learning, Business Intelligence, Digital Marketing Intelligence, Distributed Computing, and Predictive Analytics',
    overview: [
      'INSIGHTX is a big-data analytics platform concept designed to transform high-volume digital interaction data into actionable business insights.',
      'The project uses distributed data technologies and machine-learning-oriented analysis to study customer engagement patterns, generate predictive insights, and support personalized marketing workflows.',
    ],
    vision: 'To turn high-volume digital interaction data into actionable business intelligence.',
    mission:
      'To use distributed data technologies and machine-learning-oriented analysis to study customer engagement, generate predictive insights, and support personalized marketing workflows.',
    objectives: [
      'Process high-volume digital interaction data through distributed data technologies.',
      'Analyze customer engagement patterns.',
      'Generate predictive insights through machine-learning-oriented analysis.',
      'Support personalized marketing workflows and data-informed business insights.',
    ],
    stack: [
      'Hadoop',
      'HDFS',
      'Apache Spark',
      'MapReduce',
      'Hive',
      'Pig',
      'YARN',
      'Machine Learning Frameworks',
      'Data Analytics Tools',
      'Distributed Computing Infrastructure',
    ],
    repo: 'https://github.com/vedantlanjekar-official/INSIGHTX--Unlocking-Smart-Decisions-From-Big-Data.git',
  },
  {
    num: '4.20',
    name: 'CLIMETRYX',
    subtitle: 'Turn climate intelligence into actionable business resilience.',
    duration: 'October 2026 – October 2026',
    intro: {
      lead: 'Turn climate intelligence into ',
      leadEmphasis: 'actionable business resilience.',
      body: 'Understand environmental exposure, anticipate operational disruption, and make more informed financial and strategic decisions.',
    },
    role: 'NLP Engineer, Full-Stack Developer, and Data Analytics System Designer',
    domains:
      'AI, Natural Language Processing, Sentiment Analysis, Data Analytics, Social Media Intelligence, and Full-Stack AI Systems',
    overview: [],
    vision: 'To help organizations build business resilience through actionable climate intelligence.',
    mission:
      'To support organizations in understanding environmental exposure, anticipating operational disruption, and making more informed financial and strategic decisions.',
    objectives: [
      'Support the understanding of environmental exposure.',
      'Help anticipate operational disruption associated with environmental and climate-related exposure.',
      'Translate climate intelligence into considerations for actionable business resilience.',
      'Support more informed financial and strategic decisions through climate intelligence.',
    ],
    stack: [
      'AI Matching Algorithms',
      'Recommendation Systems',
      'Cloud Backend Infrastructure',
      'Database Management Systems',
      'Secure Escrow Payment Architecture',
      'Web Application Technologies',
      'Trust Analytics Engines',
      'Workflow Automation Modules',
    ],
  },
];
