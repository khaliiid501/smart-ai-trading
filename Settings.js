// Settings.js - صفحة الإعدادات الشخصية | Personal Settings Page
import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [language, setLanguage] = useState('ar');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(30);
  const [currency, setCurrency] = useState('USD');

  const handleSaveSettings = () => {
    const settings = {
      language,
      theme,
      notifications,
      autoRefresh,
      currency
    };
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert(language === 'ar' ? 'تم حفظ الإعدادات بنجاح!' : 'Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">
        {language === 'ar' ? '⚙️ الإعدادات الشخصية' : '⚙️ Personal Settings'}
      </h1>

      <div className="settings-section">
        <h2>{language === 'ar' ? 'اللغة | Language' : 'Language'}</h2>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="settings-select"
        >
          <option value="ar">العربية - Arabic</option>
          <option value="en">English - الإنجليزية</option>
        </select>
      </div>

      <div className="settings-section">
        <h2>{language === 'ar' ? 'المظهر | Theme' : 'Theme'}</h2>
        <select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value)}
          className="settings-select"
        >
          <option value="light">{language === 'ar' ? 'فاتح' : 'Light'}</option>
          <option value="dark">{language === 'ar' ? 'داكن' : 'Dark'}</option>
        </select>
      </div>

      <div className="settings-section">
        <h2>{language === 'ar' ? 'العملة | Currency' : 'Currency'}</h2>
        <select 
          value={currency} 
          onChange={(e) => setCurrency(e.target.value)}
          className="settings-select"
        >
          <option value="USD">USD - الدولار الأمريكي</option>
          <option value="EUR">EUR - اليورو</option>
          <option value="SAR">SAR - الريال السعودي</option>
          <option value="AED">AED - الدرهم الإماراتي</option>
        </select>
      </div>

      <div className="settings-section">
        <h2>{language === 'ar' ? 'التحديث التلقائي (ثانية)' : 'Auto Refresh (seconds)'}</h2>
        <input 
          type="number" 
          value={autoRefresh} 
          onChange={(e) => setAutoRefresh(e.target.value)}
          className="settings-input"
          min="10"
          max="300"
        />
      </div>

      <div className="settings-section">
        <h2>{language === 'ar' ? 'الإشعارات | Notifications' : 'Notifications'}</h2>
        <label className="settings-toggle">
          <input 
            type="checkbox" 
            checked={notifications} 
            onChange={(e) => setNotifications(e.target.checked)}
          />
          <span>{language === 'ar' ? 'تفعيل الإشعارات' : 'Enable Notifications'}</span>
        </label>
      </div>

      <button onClick={handleSaveSettings} className="save-button">
        {language === 'ar' ? '💾 حفظ الإعدادات' : '💾 Save Settings'}
      </button>
    </div>
  );
};

export default Settings;
