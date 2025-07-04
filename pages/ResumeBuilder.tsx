import { useState } from 'react';
import { Download, Upload, Edit3, Eye, Plus, X, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string;
  url: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface ATSScore {
  score: number;
  keywords: string[];
  suggestions: string[];
}

export function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState('edit');
  const [showJobForm, setShowJobForm] = useState(true);
  const [jobDetails, setJobDetails] = useState({ 
    company: '', 
    role: '',
    description: '' 
  });
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSocialForm, setShowSocialForm] = useState(false);
  
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [extracurricular, setExtracurricular] = useState<string[]>([]);
  const [showExportingPdf, setShowExportingPdf] = useState(false);
  const [atsScore, setAtsScore] = useState<ATSScore>({
    score: 85,
    keywords: ['React', 'Node.js', 'TypeScript', 'API Development'],
    suggestions: [
      'Add more details about cloud technologies',
      'Include specific metrics and achievements',
      'Mention team size and project scope'
    ]
  });
  
  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    location: 'New York, NY'
  });

  const [newExperience, setNewExperience] = useState<Experience>({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const [newEducation, setNewEducation] = useState<Education>({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: ''
  });

  const [newProject, setNewProject] = useState<Project>({
    name: '',
    description: '',
    technologies: '',
    url: ''
  });

  const [newSocialLink, setNewSocialLink] = useState<SocialLink>({
    platform: '',
    url: ''
  });

  const handleFileImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast.success('File imported successfully!');
      }
    };
    input.click();
  };

  const handleExportPdf = () => {
    setShowExportingPdf(true);
    setTimeout(() => {
      setShowExportingPdf(false);
      toast.success('Resume downloaded successfully!');
    }, 2000);
  };

  const handleGenerateAI = () => {
    // Simulate AI generation based on job description
    const keywordsFromDescription = jobDetails.description
      .toLowerCase()
      .match(/\b(react|node\.js|typescript|javascript|api|cloud|aws|azure|agile|scrum)\b/g) || [];

    const aiGeneratedResume = {
      personalInfo: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '(555) 987-6543',
        location: 'San Francisco, CA'
      },
      experiences: [
        {
          title: 'Senior Software Engineer',
          company: jobDetails.company || 'Tech Corp',
          startDate: '2022-01',
          endDate: '2024-03',
          description: `Led development of scalable web applications using ${keywordsFromDescription.join(', ')}. 
                       Specialized in ${jobDetails.role || 'software engineering'} with focus on performance optimization.`
        }
      ],
      education: [
        {
          school: 'Tech University',
          degree: 'Master of Science',
          field: 'Computer Science',
          startDate: '2020-09',
          endDate: '2022-05',
          gpa: '3.9'
        }
      ],
      projects: [
        {
          name: 'AI-Powered Analytics Platform',
          description: `Developed a ${keywordsFromDescription.includes('cloud') ? 'cloud-based' : ''} analytics platform`,
          technologies: keywordsFromDescription.join(', '),
          url: 'https://github.com/example/ai-analytics'
        }
      ],
      socialLinks: [
        {
          platform: 'LinkedIn',
          url: 'https://linkedin.com/in/johnsmith'
        },
        {
          platform: 'GitHub',
          url: 'https://github.com/johnsmith'
        }
      ]
    };

    setPersonalInfo(aiGeneratedResume.personalInfo);
    setExperiences(aiGeneratedResume.experiences);
    setEducation(aiGeneratedResume.education);
    setProjects(aiGeneratedResume.projects);
    setSocialLinks(aiGeneratedResume.socialLinks);

    // Update ATS score based on job description match
    const newScore = {
      score: Math.min(100, 70 + keywordsFromDescription.length * 5),
      keywords: keywordsFromDescription.map(k => k.charAt(0).toUpperCase() + k.slice(1)),
      suggestions: [
        'Add more specific achievements with metrics',
        'Include relevant certifications',
        'Highlight leadership experience'
      ]
    };
    setAtsScore(newScore);
    toast.success('Resume generated successfully!');
  };

  const handleSavePersonalInfo = () => {
    toast.success('Personal information saved!');
    setShowExperienceForm(false);
    setShowEducationForm(false);
    setShowProjectForm(false);
    setShowSocialForm(false);
  };

  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company) {
      setExperiences([...experiences, newExperience]);
      setNewExperience({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      });
      setShowExperienceForm(false);
      toast.success('Experience added successfully!');
    }
  };

  const handleAddEducation = () => {
    if (newEducation.school && newEducation.degree) {
      setEducation([...education, newEducation]);
      setNewEducation({
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      });
      setShowEducationForm(false);
      toast.success('Education added successfully!');
    }
  };

  const handleAddProject = () => {
    if (newProject.name) {
      setProjects([...projects, newProject]);
      setNewProject({
        name: '',
        description: '',
        technologies: '',
        url: ''
      });
      setShowProjectForm(false);
      toast.success('Project added successfully!');
    }
  };

  const handleAddSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url) {
      setSocialLinks([...socialLinks, newSocialLink]);
      setNewSocialLink({
        platform: '',
        url: ''
      });
      setShowSocialForm(false);
      toast.success('Social link added successfully!');
    }
  };

  if (showJobForm) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Let's Build Your Resume</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Company
              </label>
              <input
                type="text"
                value={jobDetails.company}
                onChange={(e) => setJobDetails({ ...jobDetails, company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Google, Microsoft, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Role
              </label>
              <input
                type="text"
                value={jobDetails.role}
                onChange={(e) => setJobDetails({ ...jobDetails, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Software Engineer, Product Manager, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Description
              </label>
              <textarea
                value={jobDetails.description}
                onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                rows={6}
                placeholder="Paste the job description here..."
              />
            </div>
            <button
              onClick={() => setShowJobForm(false)}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors mt-4"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resume Builder</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Building resume for {jobDetails.role} at {jobDetails.company}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleFileImport}
            className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Upload className="w-5 h-5" />
            Import
          </button>
          <button 
            onClick={handleGenerateAI}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Generate with AI
          </button>
          <button 
            onClick={handleExportPdf}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('edit')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'edit'
              ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Edit3 className="w-5 h-5 inline mr-2" />
          Edit
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'preview'
              ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Eye className="w-5 h-5 inline mr-2" />
          Preview
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 space-y-6">
          {/* Personal Information */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="City, State"
                />
              </div>
              <button
                onClick={handleSavePersonalInfo}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save Personal Info
              </button>
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Experience</h3>
            <button 
              onClick={() => setShowExperienceForm(true)}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 rounded-lg text-gray-600 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Experience
            </button>

            {showExperienceForm && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={newExperience.title}
                    onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                  <input
                    type="text"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="Company Name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={newExperience.startDate}
                      onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                    <input
                      type="date"
                      value={newExperience.endDate}
                      onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    rows={4}
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddExperience}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowExperienceForm(false)}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Education Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Education</h3>
            <button 
              onClick={() => setShowEducationForm(true)}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 rounded-lg text-gray-600 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Education
            </button>

            {showEducationForm && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">School</label>
                  <input
                    type="text"
                    value={newEducation.school}
                    onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="University Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Degree</label>
                  <input
                    type="text"
                    value={newEducation.degree}
                    onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="Bachelor's, Master's, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Field of Study</label>
                  <input
                    type="text"
                    value={newEducation.field}
                    onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="Computer Science, Business, etc."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={newEducation.startDate}
                      onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                    <input
                      type="date"
                      value={newEducation.endDate}
                      onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GPA</label>
                  <input
                    type="text"
                    value={newEducation.gpa}
                    onChange={(e) => setNewEducation({ ...newEducation, gpa: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="3.8"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddEducation}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowEducationForm(false)}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Projects Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Projects</h3>
            <button 
              onClick={() => setShowProjectForm(true)}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 rounded-lg text-gray-600 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Project
            </button>

            {showProjectForm && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="Project Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    rows={4}
                    placeholder="Describe your project..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Technologies Used</label>
                  <input
                    type="text"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="React, Node.js, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project URL</label>
                  <input
                    type="url"
                    value={newProject.url}
                    onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark: text-white"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddProject}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowProjectForm(false)}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Social Links Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Social Links</h3>
            <button 
              onClick={() => setShowSocialForm(true)}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 rounded-lg text-gray-600 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Social Link
            </button>

            {showSocialForm && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Platform</label>
                  <input
                    type="text"
                    value={newSocialLink.platform}
                    onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="LinkedIn, GitHub, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL</label>
                  <input
                    type="url"
                    value={newSocialLink.url}
                    onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddSocialLink}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowSocialForm(false)}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">{personalInfo.name}</h1>
              <div className="text-center text-gray-600 dark:text-gray-400 mb-8">
                <p>{personalInfo.email} • {personalInfo.phone}</p>
                <p>{personalInfo.location}</p>
                {socialLinks.length > 0 && (
                  <div className="mt-2">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline mx-2"
                      >
                        {link.platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                {experiences.length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 text-gray-900 dark:text-white">Experience</h2>
                    <div className="space-y-4">
                      {experiences.map((exp, index) => (
                        <div key={index}>
                          <h3 className="font-medium text-gray-900 dark:text-white">{exp.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{exp.company} • {exp.startDate} - {exp.endDate}</p>
                          <p className="mt-2 text-gray-600 dark:text-gray-400">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {education.length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 text-gray-900 dark:text-white">Education</h2>
                    <div className="space-y-4">
                      {education.map((edu, index) => (
                        <div key={index}>
                          <h3 className="font-medium text-gray-900 dark:text-white">{edu.school}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{edu.degree} in {edu.field}</p>
                          <p className="text-gray-600 dark:text-gray-400">{edu.startDate} - {edu.endDate} • GPA: {edu.gpa}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {projects.length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 text-gray-900 dark:text-white">Projects</h2>
                    <div className="space-y-4">
                      {projects.map((project, index) => (
                        <div key={index}>
                          <h3 className="font-medium text-gray-900 dark:text-white">{project.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">Technologies: {project.technologies}</p>
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm mt-1 inline-block"
                            >
                              View Project →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {extracurricular.length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 text-gray-900 dark:text-white">Extracurricular Activities</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                      {extracurricular.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>
          </div>

          {/* ATS Score Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">ATS Score Analysis</h2>
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-5 h-5 ${
                  atsScore.score >= 80 ? 'text-green-500' : 
                  atsScore.score >= 60 ? 'text-yellow-500' : 
                  'text-red-500'
                }`} />
                <span className="font-medium text-gray-900 dark:text-white">{atsScore.score}% Match</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Matched Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {atsScore.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Suggestions</h3>
                <ul className="space-y-2">
                  {atsScore.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <div className="w-48 h-48 mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Score', value: atsScore.score },
                        { name: 'Remaining', value: 100 - atsScore.score }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      <Cell fill="#4F46E5" />
                      <Cell fill="#E5E7EB" />
                      <Label
                        value={`${atsScore.score}%`}
                        position="center"
                        className="text-2xl font-bold"
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showExportingPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Exporting PDF...</p>
          </div>
        </div>
      )}
    </div>
  );
}