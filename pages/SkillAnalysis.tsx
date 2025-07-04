import { useState } from 'react';
import { Search, TrendingUp, BookOpen, CheckCircle } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  required: number;
  gap: number;
  learningResources: {
    title: string;
    url: string;
  }[];
}

export function SkillAnalysis() {
  const [jobRole, setJobRole] = useState('');
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);

  const handleAnalyze = () => {
    if (!jobRole) return;
    
    // Simulated API response - in production, this would come from your backend
    setSkills([
      {
        name: 'React.js',
        level: 80,
        required: 85,
        gap: 5,
        learningResources: [
          { title: 'React Official Documentation', url: 'https://react.dev' },
          { title: 'React Course on Coursera', url: 'https://www.coursera.org/learn/react' }
        ]
      },
      {
        name: 'Node.js',
        level: 75,
        required: 80,
        gap: 5,
        learningResources: [
          { title: 'Node.js Documentation', url: 'https://nodejs.org/docs/latest' },
          { title: 'Node.js Course on Udemy', url: 'https://www.udemy.com/course/nodejs' }
        ]
      },
      {
        name: 'Python',
        level: 60,
        required: 90,
        gap: 30,
        learningResources: [
          { title: 'Python Official Tutorial', url: 'https://docs.python.org/3/tutorial' },
          { title: 'Python for Data Science', url: 'https://www.edx.org/learn/python' }
        ]
      },
      {
        name: 'Machine Learning',
        level: 40,
        required: 85,
        gap: 45,
        learningResources: [
          { title: 'Machine Learning by Stanford', url: 'https://www.coursera.org/learn/machine-learning' },
          { title: 'TensorFlow Documentation', url: 'https://www.tensorflow.org/learn' }
        ]
      }
    ]);
    setIsAnalyzed(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Skill Analysis</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Analyze your skills and identify areas for improvement</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="Enter target job role (e.g., Machine Learning Engineer)"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button 
            onClick={handleAnalyze}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Search className="w-5 h-5" />
            Analyze
          </button>
        </div>

        {isAnalyzed && (
          <div className="space-y-6">
            {skills.map((skill) => (
              <div key={skill.name} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Gap: {skill.gap}%</span>
                </div>
                <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="dark:text-gray-300">Current Level: {skill.level}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="dark:text-gray-300">Required Level: {skill.required}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div className="space-y-1">
                      {skill.learningResources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          {resource.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isAnalyzed && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-300 mb-4">Recommended Learning Path</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 dark:text-white">Machine Learning Fundamentals</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Complete this course to improve your ML skills</p>
              <a
                href="https://www.coursera.org/learn/machine-learning"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm inline-block"
              >
                Start Learning →
              </a>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 dark:text-white">Advanced Python Programming</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Master Python for data science and ML applications</p>
              <a
                href="https://www.edx.org/learn/python"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm inline-block"
              >
                Start Learning →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}