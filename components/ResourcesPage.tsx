
import React, { useEffect } from 'react';
import Resources from './Resources';
import TopicGenerator from './TopicGenerator';

const ResourcesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <div className="bg-brand-light-gray-blue pt-32 pb-12 text-center">
                 <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-teal">Resources Hub</h1>
                    <p className="mt-4 text-lg text-brand-dark-grey max-w-2xl mx-auto">
                        Guides, tools, and insights to help you accelerate your research and innovation journey.
                    </p>
                 </div>
            </div>
            
            {/* Reuse existing components */}
            <Resources />
            <TopicGenerator />
        </main>
    );
};

export default ResourcesPage;
