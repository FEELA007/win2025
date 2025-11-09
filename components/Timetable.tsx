import React from 'react';
import { Course } from '../types';
import { COURSE_COLORS_PALETTE, timetableLayout, theoryHours, days } from '../constants';

interface TimetableProps {
  addedCourses: Course[];
  onRemoveCourse: (course: Course) => void;
  hoveredSlots: string[];
}

const getCourseColor = (courseCode: string) => {
  let hash = 0;
  for (let i = 0; i < courseCode.length; i++) {
    hash = courseCode.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COURSE_COLORS_PALETTE.length;
  return COURSE_COLORS_PALETTE[index];
};

const CourseSlot: React.FC<{ course: Course; onRemoveCourse: (course: Course) => void; }> = ({ course, onRemoveCourse }) => {
  const { bg, text, border } = getCourseColor(course.code);
  return (
    <div className={`relative ${bg} ${text} p-1 text-xs border-l-4 ${border} h-full flex flex-col justify-center`}>
      <p className="font-bold text-[11px] leading-tight">{course.code}</p>
      <p className="text-[10px] leading-tight">{course.slots.join('+')}</p>
      <button
        onClick={() => onRemoveCourse(course)}
        className="absolute top-0.5 right-0.5 bg-black/20 hover:bg-black/40 text-white rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Remove ${course.title}`}
      >
        &#x2715;
      </button>
    </div>
  );
};

const findCourseForSlot = (slotGroup: string, addedCourses: Course[]) => {
    const possibleSlots = slotGroup.split('/');
    for (const course of addedCourses) {
        if (possibleSlots.some(slot => course.slots.includes(slot))) {
            return course;
        }
    }
    return null;
};

const TimetableCell: React.FC<{
    slotId: string | null;
    day: string;
    type: 'theory' | 'lab';
    index: string;
    addedCourses: Course[];
    hoveredSlots: string[];
    onRemoveCourse: (course: Course) => void;
}> = ({ slotId, day, type, index, addedCourses, hoveredSlots, onRemoveCourse }) => {
    if (slotId === null) {
        return <td key={`${day}-${type}-${index}`} className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"></td>
    }
    
    const course = findCourseForSlot(slotId, addedCourses);
    const isHovered = hoveredSlots.some(s => slotId.split('/').includes(s));
    
    return (
        <td key={`${day}-${type}-${index}`} className={`border border-slate-200 dark:border-slate-700 p-0 align-middle group transition-all duration-150 ${isHovered ? 'bg-indigo-100 dark:bg-indigo-900/50 ring-2 ring-indigo-400 z-10 relative' : ''}`}>
            {course ? <CourseSlot course={course} onRemoveCourse={onRemoveCourse} /> : <span className="text-slate-400 dark:text-slate-600 text-[10px] font-mono">{slotId}</span>}
        </td>
    );
};


const Timetable: React.FC<TimetableProps> = ({ addedCourses, onRemoveCourse, hoveredSlots }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-2 sm:p-4 rounded-xl shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center table-fixed">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-700/50">
              <th className="p-1 border border-slate-200 dark:border-slate-700 w-16"></th>
              {theoryHours.slice(0, 6).map((h, i) => <th key={`th-pre-${i}`} className="p-1 border border-slate-200 dark:border-slate-700 font-mono text-xs">{h}</th>)}
              <th className="p-1 border-4 border-double border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 font-bold text-lg w-12 transform rotate-180" style={{ writingMode: 'vertical-rl' }}>LUNCH</th>
              {theoryHours.slice(6).map((h, i) => <th key={`th-post-${i}`} className="p-1 border border-slate-200 dark:border-slate-700 font-mono text-xs">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              const daySlots = timetableLayout[day as keyof typeof timetableLayout];
              return (
                <React.Fragment key={day}>
                  {/* Theory Row */}
                  <tr className="bg-white dark:bg-slate-800 h-12">
                    <td rowSpan={2} className="p-1 border border-slate-200 dark:border-slate-700 font-bold uppercase text-slate-500 dark:text-slate-400">{day}</td>
                    
                    {daySlots.theory.slice(0, 6).map((slotId, i) => (
                       <TimetableCell key={`pre-cell-${i}`} slotId={slotId} day={day} type="theory" index={`pre-${i}`} addedCourses={addedCourses} hoveredSlots={hoveredSlots} onRemoveCourse={onRemoveCourse} />
                    ))}
                    
                    <td rowSpan={2} className="border-x border-slate-200 dark:border-slate-700"></td>

                    {daySlots.theory.slice(6).map((slotId, i) => (
                       <TimetableCell key={`post-cell-${i}`} slotId={slotId} day={day} type="theory" index={`post-${i}`} addedCourses={addedCourses} hoveredSlots={hoveredSlots} onRemoveCourse={onRemoveCourse} />
                    ))}
                  </tr>
                  {/* Lab Row */}
                  <tr className="bg-slate-50 dark:bg-slate-800/50 h-12">
                    {daySlots.lab.slice(0, 6).map((slotId, i) => (
                        <TimetableCell key={`pre-lab-cell-${i}`} slotId={slotId} day={day} type="lab" index={`pre-${i}`} addedCourses={addedCourses} hoveredSlots={hoveredSlots} onRemoveCourse={onRemoveCourse} />
                    ))}

                    {daySlots.lab.slice(6).map((slotId, i) => (
                        <TimetableCell key={`post-lab-cell-${i}`} slotId={slotId} day={day} type="lab" index={`post-${i}`} addedCourses={addedCourses} hoveredSlots={hoveredSlots} onRemoveCourse={onRemoveCourse} />
                    ))}
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;