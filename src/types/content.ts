export type SiteContent = {
  brand: {
    name: string;
    specialty: string;
    registration: string;
    city: string;
    tagline: string;
    logoImage: string;
    profileImage: string;
    profileAlt: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  about: {
    title: string;
    description: string;
    pillars: Array<{
      title: string;
      description: string;
    }>;
  };
  spaces: {
    eyebrow: string;
    title: string;
    description: string;
  };
  stats: Array<{
    label: string;
    value: string;
  }>;
  contact: {
    whatsappNumber: string;
    whatsappMessage: string;
    instagramUrl: string;
    email: string;
    formAction: string;
    formSuccessMessage: string;
    address: string;
    hours: string;
    notice: string;
  };
  seo: {
    title: string;
    description: string;
  };
};

export type Treatment = {
  id: string;
  title: string;
  summary: string;
  details: string;
  ctaWhatsapp: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  descriptionShort: string;
  descriptionLong: string;
  image: string;
  ctaWhatsapp: string;
};

export type CaseStudy = {
  id: string;
  treatment: string;
  beforeImage: string;
  afterImage: string;
  resultText: string;
  testimonialName: string;
  testimonialRole: string;
  testimonialText: string;
};

export type Testimonial = {
  id: string;
  name: string;
  treatment: string;
  quote: string;
  rating: number;
};

export type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
  redirectToWhatsapp: boolean;
};

export type SpaceHighlight = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};
