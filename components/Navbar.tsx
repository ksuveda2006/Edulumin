import { BookText, FileText, Home, Settings, Sparkles, GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const [showAbout, setShowAbout] = useState(false);

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: BookText, label: 'Digital Diary', path: '/diary' },
    { icon: FileText, label: 'Resume Builder', path: '/resume' },
    { icon: Sparkles, label: 'Skill Analysis', path: '/skills' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-6">
        <button 
          onClick={() => setShowAbout(true)}
          className="flex items-center gap-2 mb-8 hover:text-indigo-600 transition-colors"
        >
          <GraduationCap className="w-8 h-8 text-indigo-600" />
          <h1 className="text-xl font-bold">EduLuminAI</h1>
        </button>
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  "hover:bg-indigo-50 hover:text-indigo-600",
                  location.pathname === item.path ? "bg-indigo-50 text-indigo-600" : "text-gray-600"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {showAbout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">About EduLuminAI</h2>
            <p className="text-gray-600 mb-6">
              EduLuminAI is your intelligent academic companion, combining AI-powered resume building with 
              comprehensive academic analysis. We help students and professionals create ATS-friendly resumes 
              while providing detailed feedback on academic performance.
            </p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-gray-600">Email: contact@eduluminai.com</p>
              <p className="text-gray-600">Phone: (555) 123-4567</p>
              <p className="text-gray-600">Address: 123 Education Lane, Learning City, 12345</p>
            </div>

            <button
              onClick={() => setShowAbout(false)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}