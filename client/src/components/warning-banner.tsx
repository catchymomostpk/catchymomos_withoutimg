import { useWarning } from '@/lib/warningContext';
import { X } from 'lucide-react';

export function WarningBanner() {
  const { showTrialWarning, setShowTrialWarning } = useWarning();
  
  if (!showTrialWarning) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full m-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-red-600">Trial Version Notice</h2>
          <button
            onClick={() => setShowTrialWarning(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <p className="text-gray-700 mb-4">Your trial version ends soon.</p>
        <button
          onClick={() => setShowTrialWarning(false)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}