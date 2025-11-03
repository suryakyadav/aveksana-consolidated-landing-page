
import React from 'react';
import type { Testimonial } from '../types';

const TestimonialCard: React.FC<Testimonial> = ({ avatar, quote, name, role }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      <blockquote className="flex-grow text-gray-700">
        <p>"{quote}"</p>
      </blockquote>
      <footer className="mt-6 flex items-center">
        <img className="h-12 w-12 rounded-full object-cover" src={avatar} alt={name} />
        <div className="ml-4">
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </footer>
    </div>
  );
};

export default TestimonialCard;
