import { useState } from 'react';
import { Plus, BookOpen, Award, Code, X } from 'lucide-react';

interface DiaryEntry {
  id: string;
  type: 'course' | 'certification' | 'project';
  title: string;
  date: string;
  description: string;
}

export function DigitalDiary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: '1',
      type: 'course',
      title: 'Advanced Machine Learning',
      date: '2024-03-15',
      description: 'Completed coursework in neural networks and deep learning applications.'
    },
    {
      id: '2',
      type: 'certification',
      title: 'AWS Cloud Practitioner',
      date: '2024-02-20',
      description: 'Achieved AWS Certified Cloud Practitioner certification.'
    },
    {
      id: '3',
      type: 'project',
      title: 'Smart City IoT Platform',
      date: '2024-01-10',
      description: 'Developed an IoT platform for monitoring urban infrastructure.'
    }
  ]);

  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [newEntry, setNewEntry] = useState<Omit<DiaryEntry, 'id'>>({
    type: 'course',
    title: '',
    date: '',
    description: ''
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'course':
        return BookOpen;
      case 'certification':
        return Award;
      case 'project':
        return Code;
      default:
        return BookOpen;
    }
  };

  const handleAddEntry = () => {
    if (newEntry.title && newEntry.date) {
      const entry: DiaryEntry = {
        id: Date.now().toString(),
        ...newEntry
      };
      setEntries([entry, ...entries]);
      setNewEntry({
        type: 'course',
        title: '',
        date: '',
        description: ''
      });
      setShowNewEntryForm(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Digital Diary</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Track your academic journey and achievements</p>
        </div>
        <button 
          onClick={() => setShowNewEntryForm(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Entry
        </button>
      </div>

      {showNewEntryForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Entry</h3>
            <button 
              onClick={() => setShowNewEntryForm(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type
              </label>
              <select
                value={newEntry.type}
                onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value as DiaryEntry['type'] })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              >
                <option value="course">Course</option>
                <option value="certification">Certification</option>
                <option value="project">Project</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={newEntry.description}
                onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                rows={4}
                placeholder="Enter description"
              />
            </div>
            <button
              onClick={handleAddEntry}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save Entry
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {entries.map((entry) => {
          const Icon = getIcon(entry.type);
          return (
            <div key={entry.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{entry.title}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{entry.date}</span>
                  </div>
                  <span className="inline-block px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded-md text-sm font-medium mt-2 capitalize">
                    {entry.type}
                  </span>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{entry.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}