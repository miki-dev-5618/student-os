'use client';

import React, { useState } from 'react';
import { LuUser, LuBell, LuSparkles, LuGlobe, LuCheck } from 'react-icons/lu';

export default function Page() {
  const [name, setName] = useState('Navyaa Taneja');
  const [email, setEmail] = useState('navyaataneja5618@gmail.com');
  const [notification, setNotification] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-app grid-bg py-10 px-6 sm:px-8 font-sans text-auburn">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-black tracking-tight text-auburn leading-none mt-1">Settings</h1>
          <p className="text-xs font-bold text-auburn/70 mt-1.5">
            Customize your academic dashboard preferences and profile settings.
          </p>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation panels left */}
          <div className="space-y-4">
            <div className="bg-white border-2 border-auburn rounded-3xl p-4 shadow-soft space-y-1">
              <div className="flex items-center gap-3 p-3 bg-sunset text-zinc-950 font-black rounded-2xl shadow-sm text-sm cursor-pointer border border-auburn/20">
                <LuUser size={18} />
                <span>Account Profile</span>
              </div>
              <div className="flex items-center gap-3 p-3 text-auburn/80 hover:text-auburn hover:bg-nectar-pink/20 rounded-2xl text-sm font-bold cursor-pointer">
                <LuBell size={18} />
                <span>Notifications</span>
              </div>
              <div className="flex items-center gap-3 p-3 text-auburn/80 hover:text-auburn hover:bg-nectar-pink/20 rounded-2xl text-sm font-bold cursor-pointer">
                <LuSparkles size={18} />
                <span>Themes & Vibes</span>
              </div>
              <div className="flex items-center gap-3 p-3 text-auburn/80 hover:text-auburn hover:bg-nectar-pink/20 rounded-2xl text-sm font-bold cursor-pointer">
                <LuGlobe size={18} />
                <span>Integrations</span>
              </div>
            </div>
          </div>

          {/* Form inputs right */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border-2 border-auburn rounded-3xl p-6 shadow-soft space-y-6">
              <h2 className="text-xl font-serif font-black text-auburn pb-3 border-b-2 border-auburn/10 leading-none mt-1">
                Profile Details
              </h2>
              
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-auburn/50">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-nectar-cream/30 border-2 border-auburn/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-auburn focus:border-transparent transition-all font-bold text-auburn"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-auburn/50">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-nectar-cream/30 border-2 border-auburn/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-auburn focus:border-transparent transition-all font-bold text-auburn"
                  />
                </div>

                {/* Notification Toggle Switch */}
                <div className="flex items-center justify-between py-3 border-t-2 border-auburn/10 mt-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-auburn">Deadline Alerts</span>
                    <span className="text-[10px] text-auburn/60 font-semibold">Receive email notifications for upcoming exams.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotification(!notification)}
                    className={`w-11 h-6 rounded-full transition-colors relative border-2 cursor-pointer ${
                      notification ? 'bg-auburn border-auburn' : 'bg-nectar-cream border-auburn/25'
                    }`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 bg-white rounded-full transition-transform ${
                      notification ? 'transform translate-x-5' : ''
                    } border border-auburn/10`} />
                  </button>
                </div>

                {/* Theme mode toggle */}
                <div className="flex items-center justify-between py-3 border-t-2 border-auburn/10">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-auburn">Sync dark mode</span>
                    <span className="text-[10px] text-auburn/60 font-semibold">Match your operating system theme preference automatically.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-11 h-6 rounded-full transition-colors relative border-2 cursor-pointer ${
                      darkMode ? 'bg-auburn border-auburn' : 'bg-nectar-cream border-auburn/25'
                    }`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 bg-white rounded-full transition-transform ${
                      darkMode ? 'transform translate-x-5' : ''
                    } border border-auburn/10`} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-auburn/10">
                <span className={`text-xs font-bold text-auburn flex items-center gap-1.5 transition-opacity ${saved ? 'opacity-100' : 'opacity-0'}`}>
                  <LuCheck size={14} />
                  <span>Settings saved successfully!</span>
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-auburn hover:bg-auburn/95 text-white rounded-full text-xs font-bold transition-all shadow-soft border border-auburn/20 cursor-pointer"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}