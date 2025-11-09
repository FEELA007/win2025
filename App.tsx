import React, { useState, useCallback } from 'react';
import { Course } from './types';
import { courseData, slotPositionMap } from './constants';
import Timetable from './components/Timetable';
import CourseList from './components/CourseList';
import ClashModal from './components/ClashModal';

function App() {
  const [addedCourses, setAddedCourses] = useState<Course[]>([]);
  const [clashDetails, setClashDetails] = useState<{ existing: Course; incoming: Course; slotId: string } | null>(null);
  const [hoveredSlots, setHoveredSlots] = useState<string[]>([]);

  const handleAddCourse = useCallback((courseToAdd: Course) => {
    // Map of 'day-index' to the course occupying it
    const occupiedTimePositions = new Map<string, Course>();
    addedCourses.forEach(course => {
        course.slots.forEach(slotId => {
            const position = slotPositionMap.get(slotId);
            if (position) {
                occupiedTimePositions.set(`${position.day}-${position.index}`, course);
            }
        });
    });

    // Check for clashes with the new course
    for (const newSlot of courseToAdd.slots) {
        const position = slotPositionMap.get(newSlot);
        if (position) {
            const positionKey = `${position.day}-${position.index}`;
            const existingCourse = occupiedTimePositions.get(positionKey);
            if (existingCourse) {
                // Clash detected!
                setClashDetails({ existing: existingCourse, incoming: courseToAdd, slotId: newSlot });
                return; // Stop and show modal
            }
        }
    }

    // No clash, add the course
    setAddedCourses(prev => [...prev, courseToAdd]);
  }, [addedCourses]);

  const handleRemoveCourse = useCallback((courseToRemove: Course) => {
    setAddedCourses(prev => prev.filter(c => 
      c.code !== courseToRemove.code || JSON.stringify(c.slots) !== JSON.stringify(courseToRemove.slots)
    ));
  }, []);
  
  const handleClearTimetable = useCallback(() => {
    setAddedCourses([]);
  }, []);


  const closeClashModal = () => {
    setClashDetails(null);
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm p-4 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400">
          Winter Semester 2025-26 Slot Timetable
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-400 mt-1">
          Select courses to build your schedule and check for clashes.
        </p>
      </header>
      
      <main className="flex flex-col lg:flex-row p-4 gap-4 flex-grow">
        <div className="lg:w-1/3 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
          <CourseList 
            courses={courseData} 
            addedCourses={addedCourses}
            onAddCourse={handleAddCourse}
            onRemoveCourse={handleRemoveCourse}
            onClearTimetable={handleClearTimetable}
            onHoverCourse={setHoveredSlots}
          />
        </div>
        <div className="lg:w-2/3 flex-grow">
          <Timetable 
            addedCourses={addedCourses} 
            onRemoveCourse={handleRemoveCourse}
            hoveredSlots={hoveredSlots} 
          />
        </div>
      </main>

      <footer className="text-center p-4 text-slate-500 dark:text-slate-400 text-sm">
        made with sadness by{' '}
        <a 
          href="https://github.com/FEELA007" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          karthik j
        </a>
      </footer>

      {clashDetails && (
        <ClashModal
          isOpen={!!clashDetails}
          onClose={closeClashModal}
          clashInfo={clashDetails}
        />
      )}
    </div>
  );
}

export default App;