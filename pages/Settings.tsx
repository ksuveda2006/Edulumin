import { useState } from 'react';
import { Moon, Sun, Bell, Lock, Eye, UserCog } from 'lucide-react';
import { useThemeStore } from '../store/theme';

export function Settings() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: false,
    updates: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: true,
    allowMessages: true,
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your account preferences and application settings</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <UserCog className="w-5 h-5" />
          Appearance
        </h2>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex items-center gap-3">
            {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isDarkMode ? 'Dark mode is enabled' : 'Light mode is enabled'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Toggle Theme
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                className="rounded border-gray-300"
              />
              Email Notifications
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.desktop}
                onChange={(e) => setNotifications({ ...notifications, desktop: e.target.checked })}
                className="rounded border-gray-300"
              />
              Desktop Notifications
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.updates}
                onChange={(e) => setNotifications({ ...notifications, updates: e.target.checked })}
                className="rounded border-gray-300"
              />
              Product Updates
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Privacy
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Profile Visibility</label>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="contacts">Contacts Only</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={privacy.showEmail}
                onChange={(e) => setPrivacy({ ...privacy, showEmail: e.target.checked })}
                className="rounded border-gray-300"
              />
              Show email to others
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={privacy.allowMessages}
                onChange={(e) => setPrivacy({ ...privacy, allowMessages: e.target.checked })}
                className="rounded border-gray-300"
              />
              Allow direct messages
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}