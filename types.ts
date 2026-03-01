import React from 'react';

export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PartnerItem {
  name: string;
  logo?: string;
  url: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  message?: string;
  urgency?: string;
  disabilityType?: string;
}

export interface VolunteerFormData extends FormData {
  area: string;
  contactPreference: string;
  mobility: string;
  areas: string[];
}