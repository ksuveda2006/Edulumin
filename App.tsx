import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TopNavbar } from './components/TopNavbar';
import { Footer } from './components/Footer';
import { Dashboard } from './pages/Dashboard';
import { DigitalDiary } from './pages/DigitalDiary';
import { ResumeBuilder } from './pages/ResumeBuilder';
import { SkillAnalysis } from './pages/SkillAnalysis';
import { Settings } from './pages/Settings';
import { Auth } from './pages/Auth';
import { useThemeStore } from './store/theme';
import { useAuthStore } from './store/auth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
}

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
        <TopNavbar />
        <main className="flex-grow pt-16 dark:bg-gray-900">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/diary" element={
              <ProtectedRoute>
                <DigitalDiary />
              </ProtectedRoute>
            } />
            <Route path="/resume" element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            } />
            <Route path="/skills" element={
              <ProtectedRoute>
                <SkillAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;