import { useNavigate } from 'react-router-dom';
import { BookText, FileText, Sparkles, Upload, CheckCircle, XCircle } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/auth';

interface AnalysisResult {
  correct: number;
  incorrect: number;
  total: number;
  weakPoints: string[];
}

export function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>({
    correct: 7,
    incorrect: 3,
    total: 10,
    weakPoints: [
      'Data Structures - Binary Trees',
      'Algorithms - Dynamic Programming',
      'System Design - Scalability'
    ]
  });

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Simulate file upload and analysis
        toast.success('File uploaded successfully!');
        setTimeout(() => {
          setShowAnalysis(true);
          toast.success('Analysis complete!');
        }, 1500);
      }
    };
    input.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome to EduLuminAI, {user?.name}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Build ATS-friendly resumes and improve your academic performance with AI
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-lg">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Quick Analysis</h2>
            <p className="mt-1 text-blue-100">Upload your resume or answer sheet for instant AI feedback</p>
          </div>
        </div>
        <button 
          onClick={handleFileUpload}
          className="mt-6 bg-white text-blue-600 px-6 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors"
        >
          Upload File
        </button>
      </div>

      {showAnalysis && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Analysis Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">Correct Answers</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">{analysisResult.correct}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400">Incorrect Answers</p>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-300">{analysisResult.incorrect}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-400 flex items-center justify-center text-white text-xs">
                  %
                </div>
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Score</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {Math.round((analysisResult.correct / analysisResult.total) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Areas for Improvement</h3>
            <ul className="space-y-2">
              {analysisResult.weakPoints.map((point, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Digital Diary"
          description="Store and organize your academic achievements and professional experience"
          icon={BookText}
          onClick={() => navigate('/diary')}
        />
        <DashboardCard
          title="Resume Builder"
          description="Create ATS-friendly resumes tailored to your target companies"
          icon={FileText}
          onClick={() => navigate('/resume')}
        />
        <DashboardCard
          title="Skill Analysis"
          description="Identify skill gaps and get personalized learning recommendations"
          icon={Sparkles}
          onClick={() => navigate('/skills')}
        />
      </div>
    </div>
  );
}