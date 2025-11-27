
import React from 'react';
import { SOCIAL_PROOF_LOGOS } from '../constants';

const SocialProof = () => {
  return (
    <section className="py-12 bg-brand-off-white">
      <div className="container mx-auto px-6">
        <h3 className="text-center text-sm font-semibold text-brand-grey uppercase tracking-wider">
          Trusted by leading universities, research groups, and corporate R&D teams across 80 countries.
        </h3>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {SOCIAL_PROOF_LOGOS.map((logo) => (
            <div key={logo.name} className="flex justify-center">
              <img src={logo.src} alt={logo.name} className="h-8 filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
