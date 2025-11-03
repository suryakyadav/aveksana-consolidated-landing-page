import type React from 'react';

export interface NavLink {
  label: string;
  href: string;
  subMenu?: NavLink[];
}

export interface Product {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  keyFeatures: string[];
}

export interface Testimonial {
  avatar: string;
  quote: string;
  name: string;
  role: string;
}