import React, { useState, useMemo } from 'react';
import { Course } from '../types';

interface CourseListProps {
  courses: Course[];
  addedCourses: Course[];
  onAddCourse: (course: Course) => void;
  onRemoveCourse: (course: Course) => void;
  onClearTimetable: () => void;
  onHoverCourse: (slots: string[]) => void;
}

interface GroupedCourses {
  [code: string]: {
    title: string;
    theorySlots: string[][];
    labSlots: string[][];
  };
}

const CourseSelector: React.FC<{
  label: string;
  courses: Course[];
  groupedCourses: GroupedCourses;
  onAddCourse: (course: Course) => void;
}> = ({ label, courses, groupedCourses, onAddCourse }) => {
  const [selectedCourseCode, setSelectedCourseCode] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const isTheory = useMemo(() => label.toLowerCase().includes('theory'), [label]);

  const courseOptions = useMemo(() => {
    return Object.keys(groupedCourses)
      .filter(code => {
        const courseGroup = groupedCourses[code];
        if (!courseGroup) return false;
        return isTheory
          ? courseGroup.theorySlots.length > 0
          : courseGroup.labSlots.length > 0;
      })
      .sort((a, b) => a.localeCompare(b));
  }, [groupedCourses, isTheory]);

  const handleAddClick = () => {
    if (!selectedCourseCode || !selectedSlot) return;

    const courseToAdd = courses.find(c => 
      c.code === selectedCourseCode && 
      JSON.stringify(c.slots) === selectedSlot
    );
    
    if (courseToAdd) {
      onAddCourse(courseToAdd);
      setSelectedCourseCode(''); // Reset course dropdown
      setSelectedSlot('');      // Reset slot dropdown
    }
  };

  const currentSlots = useMemo(() => {
    if (!selectedCourseCode || !groupedCourses[selectedCourseCode]) return [];
    return isTheory ? groupedCourses[selectedCourseCode].theorySlots : groupedCourses[selectedCourseCode].labSlots;
  }, [selectedCourseCode, groupedCourses, isTheory]);
  
  return (
    <div className="bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg">
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">{label}</h3>
      <div className="flex flex-col gap-2">
        <select
          value={selectedCourseCode}
          onChange={(e) => {
            setSelectedCourseCode(e.target.value);
            setSelectedSlot('');
          }}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          aria-label={`Select ${isTheory ? 'Theory' : 'Lab'} Course`}
        >
          <option value="">-- Select Course --</option>
          {courseOptions.map(code => (
             <option key={code} value={code}>{code} - {groupedCourses[code].title}</option>
          ))}
        </select>

        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          disabled={!selectedCourseCode || currentSlots.length === 0}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white disabled:opacity-50"
          aria-label={`Select ${isTheory ? 'Theory' : 'Lab'} Slot`}
        >
          <option value="">{selectedCourseCode && currentSlots.length === 0 ? '-- No Slots Available --' : '-- Select Slot --'}</option>
          {currentSlots.map(slotArray => (
            <option key={slotArray.join('+')} value={JSON.stringify(slotArray)}>{slotArray.join(' + ')}</option>
          ))}
        </select>
        
        <button
          onClick={handleAddClick}
          disabled={!selectedSlot}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          Add Course
        </button>
      </div>
    </div>
  );
};


const CourseList: React.FC<CourseListProps> = ({ courses, addedCourses, onAddCourse, onRemoveCourse, onClearTimetable, onHoverCourse }) => {
  const groupedCourses = useMemo<GroupedCourses>(() => {
    const groups: GroupedCourses = {};
    for (const course of courses) {
      if (!groups[course.code]) {
        groups[course.code] = {
          title: course.title.replace(/ Lab$/, ''), // Use base title
          theorySlots: [],
          labSlots: [],
        };
      }
      if (course.type === 'ELA') {
        groups[course.code].labSlots.push(course.slots);
      } else {
        groups[course.code].theorySlots.push(course.slots);
      }
    }
    // Sort slots for consistency
    Object.values(groups).forEach(group => {
        group.theorySlots.sort((a,b) => a.join('').localeCompare(b.join('')));
        group.labSlots.sort((a,b) => a.join('').localeCompare(b.join('')));
    });
    return groups;
  }, [courses]);

  const { theoryCourses, labCourses } = useMemo(() => ({
      theoryCourses: courses.filter(c => c.type !== 'ELA'),
      labCourses: courses.filter(c => c.type === 'ELA')
  }), [courses]);
  

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg flex flex-col gap-4 max-h-[calc(100vh-120px)]">
      <div className="flex justify-between items-center flex-shrink-0">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Course Selection</h2>
        <button 
          onClick={onClearTimetable}
          className="text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-1 px-3 rounded-lg transition-colors flex items-center gap-1"
          aria-label="Clear timetable"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear
        </button>
      </div>
      
      <div className="space-y-4 flex-shrink-0">
        <CourseSelector label="Add Theory Course" courses={courses} groupedCourses={groupedCourses} onAddCourse={onAddCourse} />
        <CourseSelector label="Add Lab Course" courses={courses} groupedCourses={groupedCourses} onAddCourse={onAddCourse} />
      </div>

      <div className="mt-4 border-t dark:border-slate-700 pt-4 overflow-y-auto flex-grow">
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Added Courses ({addedCourses.length})</h3>
          {addedCourses.length === 0 ? (
               <p className="text-center text-slate-500 dark:text-slate-400 py-4">No courses added yet.</p>
          ) : (
            <div className="space-y-2 pr-2">
                {addedCourses.map((course, index) => (
                    <div 
                        key={`${course.code}-${course.slots.join('-')}-${index}`}
                        className="bg-slate-100 dark:bg-slate-700/60 p-2 rounded-md text-xs transition-shadow hover:shadow-md"
                        onMouseEnter={() => onHoverCourse(course.slots)}
                        onMouseLeave={() => onHoverCourse([])}
                    >
                       <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold">{course.code}</p>
                                <p className="text-slate-600 dark:text-slate-400">{course.title}</p>
                                <p className="font-mono text-indigo-600 dark:text-indigo-400">{course.slots.join(' + ')}</p>
                            </div>
                             <button
                                onClick={() => onRemoveCourse(course)}
                                className="ml-2 bg-rose-500 hover:bg-rose-600 text-white font-bold py-1 px-2 rounded-md text-[10px] transition-colors"
                                aria-label={`Remove ${course.title} with slots ${course.slots.join(' ')}`}
                            >
                                X
                            </button>
                       </div>
                    </div>
                ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default CourseList;