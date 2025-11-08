import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const [organization, setOrganization] = useState(user?.organization || '');
  const [expertise, setExpertise] = useState(user?.expertise.join(', ') || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate saving data
    setTimeout(() => {
        setIsSaving(false);
        alert("Profile information saved!\n(This is a demo, data is not persisted)");
    }, 1000);
  };

  if (!user) {
    return (
      <main className="py-12 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
        <div className="container mx-auto px-6 text-center">
            <p>Loading user profile...</p>
        </div>
      </main>
    );
  }

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition bg-white disabled:bg-gray-100";

  return (
    <main className="py-12 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-6 max-w-3xl">
        <header className="mb-10">
            <h1 className="text-4xl font-bold text-brand-dark-teal">User Profile</h1>
            <p className="mt-2 text-lg text-brand-dark-grey">Manage your personal and organizational information.</p>
        </header>
        
        <div className="bg-brand-off-white p-8 rounded-xl shadow-lg border border-brand-light-grey">
            <form onSubmit={handleSave} className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-brand-dark-grey mb-1">Full Name</label>
                    <input type="text" value={user.name} disabled className={inputClasses} />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-brand-dark-grey mb-1">Email Address</label>
                    <input type="email" value={user.email} disabled className={inputClasses} />
                </div>
                <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-brand-dark-grey mb-1">Organization</label>
                    <input id="organization" type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} className={inputClasses} />
                </div>
                <div>
                    <label htmlFor="expertise" className="block text-sm font-medium text-brand-dark-grey mb-1">Areas of Expertise</label>
                    <input id="expertise" type="text" value={expertise} onChange={(e) => setExpertise(e.target.value)} className={inputClasses} placeholder="e.g., AI, Materials Science, Genetics" />
                    <p className="text-xs text-brand-grey mt-1">Separate areas with a comma.</p>
                </div>

                <div className="pt-2">
                    <button type="submit" disabled={isSaving} className="bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
