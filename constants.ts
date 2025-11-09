import { Course } from './types';

export const theoryHours = [
    '8.00-8.50', '9.00-9.50', '10.00-10.50', '11.00-11.50', '12.00-12.50', '',
    '2.00-2.50', '3.00-3.50', '4.00-4.50', '5.00-5.50', '6.00-6.50', ''
];

export const timetableLayout = {
  tue: {
    theory: ['TFF1', 'A1', 'B1', 'TC1/G1', 'D1', null, 'F2', 'A2', 'B2', 'TC2/G2', 'TDD2', null],
    lab: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L31', 'L32', 'L33', 'L34', 'L35', 'L36']
  },
  wed: {
    theory: ['TGG1', 'D1', 'F1', 'E1/SC2', 'B1', null, 'D2', 'TF2/G2', 'E2/SC1', 'B2', 'TCC2', null],
    lab: ['L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L37', 'L38', 'L39', 'L40', 'L41', 'L42']
  },
  thu: {
    theory: ['TEE1', 'C1', 'TD1/TG1', 'TAA1/ECS', 'TBB1/CLUB', null, 'TE2/SE1', 'C2', 'A2', 'TD2/TG2', 'TGG2', null],
    lab: ['L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L43', 'L44', 'L45', 'L46', 'L47', 'L48']
  },
  fri: {
    theory: ['TCC1', 'TB1', 'TA1', 'F1', 'TE1/SD2', null, 'C2', 'TB2', 'TA2', 'F2', 'TEE2', null],
    lab: ['L19', 'L20', 'L21', 'L22', 'L23', 'L24', 'L49', 'L50', 'L51', 'L52', 'L53', 'L54']
  },
  sat: {
    theory: ['TDD1', 'E1/SE2', 'C1', 'TF1/G1', 'A1', null, 'D2', 'E2/SD1', 'TAA2/ECS', 'TBB2/CLUB', 'TFF2', null],
    lab: ['L25', 'L26', 'L27', 'L28', 'L29', 'L30', 'L55', 'L56', 'L57', 'L58', 'L59', 'L60']
  }
};
export const days = ['tue', 'wed', 'thu', 'fri', 'sat'];

const rawCoursesData = `
### 🧮 MAT1011 – Applied Statistics
* **Theory:** E1+TE1 / E2+TE2 / D1+TD1 / D2+TD2
* **Lab:** L2+L3, L8+L9, L10+L11, L14+L15, L20+L21, L22+L23, L26+L27, L28+L29, L31+L32, L33+L34, L35+L36, L37+L38, L39+L40, L41+L42, L43+L44, L45+L46, L47+L48, L49+L50, L51+L52, L53+L54, L55+L56

---

### 💼 MGT1040 – Entrepreneurship
* **Theory:** A1 / A2 / C1 / C2 / G1 / G2
* **Lab:** — (none)

---

### 🧭 MGT1001 – Ethics and Values
* **Theory:** — (LO course, no theory slot)
* **Lab (LO sessions):** L4+L5, L8+L9, L10+L11, L14+L15, L22+L23, L26+L27, L33+L34, L37+L38, L39+L40, L43+L44, L49+L50, L55+L56

---

### 🧠 STS2009 – Arithmetic Problem Solving Skills
* **Theory:** A1+TA1 / A2+TA2 / B1+TB1 / B2+TB2 / C1+TC1 / C2+TC2 / D1+TD1 / D2+TD2 / E1+TE1 / E2+TE2 / F1+TF1 / F2+TF2 / G1+TG1 / G2+TG2
* **Lab:** — (none)

---

### 💾 CSE2007 – Database Management Systems
* **Theory:** C1+TC1 / C2+TC2 / D1+TD1 / D2+TD2
* **Lab:** L2+L3, L10+L11, L14+L15, L20+L21, L22+L23, L26+L27, L28+L29, L31+L32, L33+L34, L35+L36, L37+L38, L39+L40, L41+L42, L43+L44, L45+L46, L47+L48, L49+L50, L51+L52, L53+L54, L55+L56

---

### 🧑‍💻 CSE1005 – Software Engineering
* **Theory:** B1+TB1 / B2+TB2 / C1+TC1 / C2+TC2 / C1+TCC1 / C2+TCC2
* **Lab:** L2+L3, L10+L11, L14+L15, L20+L21, L22+L23, L26+L27, L28+L29, L31+L32, L33+L34, L35+L36, L37+L38, L39+L40, L41+L42, L43+L44, L45+L46, L47+L48, L49+L50, L51+L52, L53+L54, L55+L56

---

### ⚙️ ECE2002 – Computer Organization and Architecture
* **Theory:** A1+TA1+TAA1 / A2+TA2+TAA2 / B1+TB1+TBB1 / B2+TB2+TBB2
* **Lab:** — (none listed separately)

---

### 🔐 CSE2011 – Cyber Security and Digital Forensics
* **Theory:** F1+TF1 / F2+TF2
* **Lab:** L4+L5, L14+L15, L33+L34, L43+L44, L47+L48

---

### 🤖 CSE3008 – Introduction to Machine Learning
* **Theory:** E1+TE1 / E2+TE2 / F1+TF1 / F2+TF2 / F1+TFF1 / F2+TFF2
* **Lab:** L2+L3, L10+L11, L14+L15, L20+L21, L22+L23, L26+L27, L28+L29, L31+L32, L33+L34, L35+L36, L37+L38, L39+L40, L41+L42, L43+L44, L45+L46, L47+L48, L49+L50, L51+L52, L53+L54, L55+L56

---

### 🗃️ CSE4005 – Data Warehousing and Data Mining
* **Theory:** E1+TE1 / E2+TE2 / F1+TF1 / F2+TF2
* **Lab:** — (none)

---

### 📋 CSE2003 – Requirements Engineering Management
* **Theory:** A1+TA1 / A2+TA2
* **Lab:** — (none)

---

### 🖼️ CSE4007 – Digital Image Processing
* **Theory:** B1+TB1 / B2+TB2 / E1+TE1 / E2+TE2
* **Lab:** L4+L5, L8+L9, L14+L15, L16+L17, L28+L29, L31+L32, L37+L38, L45+L46, L47+L48, L51+L52

---

### ⛓️ CSE2024 – Blockchain Architecture Design
* **Theory:** F2+TF2
* **Lab:** L10+L11
`;


function parseCourses(data: string): Course[] {
  const courses: Course[] = [];
  const courseBlocks = data.trim().split('---');

  for (const block of courseBlocks) {
    if (block.trim() === '') continue;

    const titleMatch = block.match(/### .*? ([\w\d]+) – (.*)/);
    const theoryMatch = block.match(/\* \*\*Theory:\*\* (.*)/);
    const labMatch = block.match(/\* \*\*(Lab|Lab \(LO sessions\)):\*\* (.*)/);

    if (!titleMatch) continue;

    const code = titleMatch[1].trim();
    const title = titleMatch[2].trim();

    if (theoryMatch && !theoryMatch[1].includes('—')) {
      const theorySlotsStr = theoryMatch[1];
      const theorySlotsArray = theorySlotsStr.split(' / ');
      for (const slot of theorySlotsArray) {
        if (slot) {
          courses.push({
            code,
            title,
            type: 'TH',
            slots: slot.split('+').map(s => s.trim()),
          });
        }
      }
    }

    if (labMatch && !labMatch[2].includes('—')) {
      const labSlotsStr = labMatch[2];
      const labSlotsArray = labSlotsStr.split(', ');
       for (const slot of labSlotsArray) {
        if (slot) {
           courses.push({
            code,
            title: title + ' Lab',
            type: 'ELA',
            slots: slot.split('+').map(s => s.trim()),
          });
        }
      }
    }
  }
  return courses;
}


export const courseData: Course[] = parseCourses(rawCoursesData);

export const COURSE_COLORS_PALETTE = [
  { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-400' },
  { bg: 'bg-sky-100', text: 'text-sky-800', border: 'border-sky-400' },
  { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-400' },
  { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-400' },
  { bg: 'bg-violet-100', text: 'text-violet-800', border: 'border-violet-400' },
  { bg: 'bg-fuchsia-100', text: 'text-fuchsia-800', border: 'border-fuchsia-400' },
  { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-400' },
  { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-400' },
  { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-400' },
  { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-400' },
  { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-400' },
  { bg: 'bg-lime-100', text: 'text-lime-800', border: 'border-lime-400' },
];

type SlotPosition = { day: string; index: number; type: 'theory' | 'lab' };
export const slotPositionMap = new Map<string, SlotPosition>();

days.forEach(day => {
    const dayKey = day as keyof typeof timetableLayout;
    timetableLayout[dayKey].theory.forEach((slotGroup, index) => {
        if (slotGroup) {
            slotGroup.split('/').forEach(s => slotPositionMap.set(s, { day, index, type: 'theory' }));
        }
    });
    timetableLayout[dayKey].lab.forEach((slotGroup, index) => {
        if (slotGroup) {
            slotGroup.split('/').forEach(s => slotPositionMap.set(s, { day, index, type: 'lab' }));
        }
    });
});