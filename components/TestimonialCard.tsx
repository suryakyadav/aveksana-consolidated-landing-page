
import React from 'react';
import type { Testimonial } from '../types';

const TestimonialCard: React.FC<Testimonial> = ({ avatar, quote, name, role }) => {
  return (
    <div className="bg-brand-off-white p-8 rounded-xl shadow-sm border border-brand-light-grey flex flex-col h-full">
      <blockquote className="flex-grow text-brand-dark-grey">
        <p>"{quote}"</p>
      </blockquote>
      <footer className="mt-6 flex items-center">
        <img className="h-12 w-12 rounded-full object-cover" src={avatar} alt={name} />
        <div className="ml-4">
          <p className="font-semibold text-brand-dark-teal">{name}</p>
          <p className="text-brand-grey text-sm">{role}</p>
        </div>
      </footer>
    </div>
  );
};

export default TestimonialCard;