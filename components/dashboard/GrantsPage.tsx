import React, { useEffect } from 'react';

const GrantsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="py-12 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
            <div className="container mx-auto px-6 max-w-4xl">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-brand-dark-teal">Artha Grant Management</h1>
                    <p className="mt-2 text-lg text-brand-dark-grey">Your central hub for tracking, writing, and managing grant proposals.</p>
                </header>

                <div className="bg-brand-off-white p-8 rounded-xl shadow-lg border border-brand-light-grey text-center">
                    <h2 className="text-2xl font-bold text-brand-dark-teal">Feature Coming Soon</h2>
                    <p className="mt-4 text-brand-dark-grey max-w-2xl mx-auto">
                        This is where you will manage your entire grant lifecycle, from discovering opportunities to submitting AI-optimized proposals.
                    </p>
                    <div className="mt-8 pt-6 border-t border-brand-light-grey">
                         <h3 className="text-lg font-semibold text-brand-dark-teal">Planned Feature: Contextualization from User Data</h3>
                         <p className="mt-2 text-brand-dark-grey">
                            Upload your previous research, papers, or internal documents to personalize arguments and citations within your proposals.
                         </p>
                         <button className="mt-4 bg-brand-light-grey text-brand-dark-grey font-semibold px-6 py-3 rounded-lg cursor-not-allowed">
                            Upload Documents (Disabled)
                         </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default GrantsPage;
