import React, { useState } from 'react';
import { User, Mail, Shield, Bell, Lock, CheckCircle2, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { user, updateUser, showToast } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [defaultFormat, setDefaultFormat] = useState(user.preferences.defaultExportFormat);
  const [preferredQuality, setPreferredQuality] = useState(user.preferences.preferredQuality);
  const [emailNotifications, setEmailNotifications] = useState(user.preferences.emailNotifications);
  const [watermarkDisclosure, setWatermarkDisclosure] = useState(user.preferences.includeWatermarkDisclosure);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      email,
      preferences: {
        defaultExportFormat: defaultFormat,
        preferredQuality,
        emailNotifications,
        includeWatermarkDisclosure: watermarkDisclosure,
        preserveHistory: true
      }
    });
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div>
        <span className="label-tracking text-gold-dark text-[10px] block mb-1">
          STUDIO PREFERENCES
        </span>
        <h1 className="text-3xl md:text-4xl font-editorial-heading font-medium text-charcoal">
          Account & Studio Settings.
        </h1>
        <p className="text-xs md:text-sm text-graphite font-sans mt-0.5">
          Configure personal details, export defaults, privacy parameters, and authentication.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-stone-light p-6 md:p-8 shadow-xs">
          <h2 className="font-editorial-heading text-xl font-medium text-charcoal mb-6">
            Personal Information
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 pb-6 border-b border-stone-light">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gold/40 shadow-sm"
            />
            <div>
              <h3 className="font-editorial-heading text-lg font-medium text-charcoal">{user.name}</h3>
              <p className="text-xs text-graphite font-mono">{user.tier} Atelier Member • Since 2026</p>
              <button
                type="button"
                onClick={() => showToast('Avatar upload available in full suite.', 'info')}
                className="mt-2 text-xs text-gold-dark hover:underline font-medium block"
              >
                Change Profile Avatar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-parchment/40 border border-stone-light rounded-xl px-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-parchment/40 border border-stone-light rounded-xl px-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Studio Export & Transformation Preferences */}
        <div className="bg-white rounded-2xl border border-stone-light p-6 md:p-8 shadow-xs">
          <h2 className="font-editorial-heading text-xl font-medium text-charcoal mb-6">
            Studio Export Defaults
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-1.5">
                Default Export Format
              </label>
              <select
                value={defaultFormat}
                onChange={e => setDefaultFormat(e.target.value as any)}
                className="w-full bg-parchment/40 border border-stone-light rounded-xl px-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="JPG">JPEG (Lossy compression, fast loading)</option>
                <option value="PNG">PNG (Lossless, master archival quality)</option>
              </select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal font-medium block mb-1.5">
                Target Export Quality
              </label>
              <select
                value={preferredQuality}
                onChange={e => setPreferredQuality(e.target.value as any)}
                className="w-full bg-parchment/40 border border-stone-light rounded-xl px-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="Standard">Standard (1080p, Web optimized)</option>
                <option value="High">High (4K, 300 DPI Fine Art)</option>
                <option value="Maximum">Maximum (8K Master Grade Archive)</option>
              </select>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-stone-light space-y-4 text-xs text-graphite">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-charcoal block">Digital Modification Metadata</span>
                <span className="text-stone-dark">Automatically embed cryptographic disclosure into exported EXIF.</span>
              </div>
              <input
                type="checkbox"
                checked={watermarkDisclosure}
                onChange={e => setWatermarkDisclosure(e.target.checked)}
                className="rounded border-stone text-charcoal focus:ring-gold"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-charcoal block">Horology Gazette Notifications</span>
                <span className="text-stone-dark">Receive email alerts when rare historical complications are digitized.</span>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={e => setEmailNotifications(e.target.checked)}
                className="rounded border-stone text-charcoal focus:ring-gold"
              />
            </div>
          </div>
        </div>

        {/* Security & 2FA */}
        <div className="bg-white rounded-2xl border border-stone-light p-6 md:p-8 shadow-xs">
          <h2 className="font-editorial-heading text-xl font-medium text-charcoal mb-4">
            Security & Authentication
          </h2>

          <div className="flex items-center justify-between py-4 border-b border-stone-light text-xs">
            <div>
              <span className="font-medium text-charcoal block">Two-Factor Authentication (2FA)</span>
              <span className="text-stone-dark">Biometric passkey or hardware security key verification.</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setTwoFactorEnabled(!twoFactorEnabled);
                showToast(`Two-factor authentication ${!twoFactorEnabled ? 'activated' : 'disabled'}.`, 'info');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                twoFactorEnabled ? 'bg-sage/15 text-sage border border-sage/30' : 'bg-stone-light text-stone-dark'
              }`}
            >
              {twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>

          <div className="flex items-center justify-between py-4 text-xs">
            <div>
              <span className="font-medium text-charcoal block">Password Credentials</span>
              <span className="text-stone-dark">Last changed 24 days ago from Geneva, Switzerland.</span>
            </div>
            <button
              type="button"
              onClick={() => showToast('Password reset link dispatched.', 'gold')}
              className="text-gold-dark hover:underline font-medium"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="py-3 px-8 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-md flex items-center gap-2 border border-charcoal hover:border-gold/40"
          >
            <Save className="w-3.5 h-3.5 text-gold" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};

