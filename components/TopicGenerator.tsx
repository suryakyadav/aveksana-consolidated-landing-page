
import React, { useState } from 'react';
import { generateTopics } from '../services/geminiService';

const TopicGenerator = () => {
  const [baseTopic, setBaseTopic] = useState('');
  const [generatedTopics, setGeneratedTopics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!baseTopic.trim()) {
      setError('Please enter a topic idea.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedTopics([]);

    try {
      const topics = await generateTopics(baseTopic);
      setGeneratedTopics(topics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="free-tool" className="py-20 bg-brand-light-gray-blue scroll-mt-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal">Try the Thesis Engine — free.</h2>
          <p className="mt-4 text-lg text-brand-dark-grey">
            Use our free AI Topic Generator to spark inspiration for your research. No sign-up required to try.
          </p>
        </div>
        <div className="bg-brand-off-white p-8 rounded-xl shadow-lg border border-brand-light-grey">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={baseTopic}
                onChange={(e) => setBaseTopic(e.target.value)}
                placeholder="e.g., 'sustainable urban planning'"
                className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate Ideas'}
              </button>
            </div>
          </form>

          {error && <p className="mt-4 text-center text-red-600">{error}</p>}

          <div className="mt-8">
            {isLoading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-medium-teal"></div>
              </div>
            )}
            {generatedTopics.length > 0 && (
              <div>
                <h4 className="font-semibold text-lg mb-3 text-brand-dark-teal">Here are some ideas:</h4>
                <ul className="space-y-2 list-disc list-inside text-brand-dark-grey">
                  {generatedTopics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-brand-light-grey text-center">
                  <h4 className="text-lg font-semibold text-brand-dark-teal">Ready to take the next step?</h4>
                  <p className="mt-2 text-brand-dark-grey">Create a free account to save your topics and access more powerful research tools.</p>
                  <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
                      <a href="#signup" className="bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-colors w-full sm:w-auto">
                          Sign Up to Save
                      </a>
                      <a href="#login" className="text-brand-dark-grey hover:text-brand-medium-teal font-semibold">
                          Log in
                      </a>
                  </div>
                   <p className="mt-6 text-sm text-brand-grey">
                    Want unlimited ideas? <a href="#plans" onClick={handleScrollTo} className="font-semibold text-brand-medium-teal hover:underline">See plans</a>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicGenerator;