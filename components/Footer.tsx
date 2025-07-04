import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-indigo-600" />
              <span className="font-bold text-lg">EduLuminAI</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Empowering careers through AI-driven resume building and skill analysis.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/diary" className="hover:text-indigo-600 dark:hover:text-indigo-400">Digital Diary</Link></li>
              <li><Link to="/resume" className="hover:text-indigo-600 dark:hover:text-indigo-400">Resume Builder</Link></li>
              <li><Link to="/skills" className="hover:text-indigo-600 dark:hover:text-indigo-400">Skill Analysis</Link></li>
              <li><Link to="/settings" className="hover:text-indigo-600 dark:hover:text-indigo-400">Settings</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="mailto:support@eduluminai.com" className="hover:text-indigo-600 dark:hover:text-indigo-400">Help Center</a></li>
              <li><Link to="/settings" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</Link></li>
              <li><Link to="/settings" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="mailto:support@eduluminai.com" className="hover:text-indigo-600 dark:hover:text-indigo-400">support@eduluminai.com</a></li>
              <li>EduLuminAI Technologies</li>
              <li>123 Innovation Drive</li>
              <li>Tech Valley, CA 94025</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} EduLuminAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}