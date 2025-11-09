import React from 'react';
import { Course } from '../types';

interface ClashModalProps {
  isOpen: boolean;
  onClose: () => void;
  clashInfo: {
    existing: Course;
    incoming: Course;
    slotId: string;
  };
}

const ClashModal: React.FC<ClashModalProps> = ({ isOpen, onClose, clashInfo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-6 w-full max-w-md transform transition-all animate-fade-in-up">
        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-600">
          <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Slot Clash Detected!
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 text-2xl" aria-label="Close modal">&times;</button>
        </div>
        <div className="mt-4 text-slate-700 dark:text-slate-200">
          <p className="mb-4">
            You cannot add <strong className="text-indigo-600 dark:text-indigo-400">{clashInfo.incoming.title} ({clashInfo.incoming.code})</strong>.
          </p>
          <p>
            The time slot <strong className="font-mono bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">{clashInfo.slotId}</strong> is already occupied by:
          </p>
          <div className="mt-2 bg-amber-100 dark:bg-amber-900/50 border-l-4 border-amber-500 text-amber-800 dark:text-amber-200 p-3 rounded-r-lg">
            <p className="font-semibold">{clashInfo.existing.title} ({clashInfo.existing.code})</p>
            <p className="text-sm font-mono">{clashInfo.existing.slots.join(' + ')}</p>
          </div>
          <p className="mt-4">Please remove the existing course to add this one.</p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClashModal;