import { PricingPlan } from '../types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Explore',
    tagline: 'Discover the possibilities of AI luxury watch transformation.',
    monthlyPrice: 0,
    annualPrice: 0,
    transformations: '3 transformations / month',
    exportQuality: 'Standard resolution (1080p)',
    catalogAccess: 'Standard catalog (12 iconic models)',
    features: [
      '3 photorealistic transformations/month',
      'Automatic timepiece detection',
      'Standard 1080p WebP/JPG export',
      'Core watch catalog access',
      'Original photography preservation',
      'Personal project gallery (up to 5 saved)'
    ]
  },
  {
    id: 'premium',
    name: 'Discover',
    tagline: 'For watch collectors, tastemakers, and editorial creators.',
    monthlyPrice: 29,
    annualPrice: 24, // $288 billed annually ($24/mo)
    popular: true,
    transformations: '25 transformations / month',
    exportQuality: 'Ultra High-Res (4K, 300 DPI)',
    catalogAccess: 'Full luxury catalog (150+ models & complications)',
    features: [
      '25 transformations per month',
      'Full catalog of Swiss high horology',
      'High-Resolution 4K & RAW/PNG exports',
      'Custom dial, case & strap configurations',
      'Advanced lighting & shadow preservation',
      'Unlimited project gallery & cloud storage',
      'Discreet digital modification disclosure toggle',
      'Priority simulated rendering queue'
    ]
  },
  {
    id: 'elite',
    name: 'Experience',
    tagline: 'The ultimate bespoke tier for luxury horology connoisseurs & studios.',
    monthlyPrice: 79,
    annualPrice: 65, // $780 billed annually
    transformations: 'Unlimited transformations',
    exportQuality: 'Master Grade 8K & Uncompressed TIFF',
    catalogAccess: 'Complete historical & piece-unique archives',
    features: [
      'Unlimited photorealistic transformations',
      'Bespoke piece-unique & vintage catalog access',
      'Master 8K ultra-resolution exports',
      'Direct macro dial inspection studio',
      'Multi-angle wrist reconstruction',
      'Dedicated concierge support',
      'Early access to new complication releases',
      'Commercial presentation rights'
    ]
  }
];

export const PRICING_FAQS = [
  {
    question: 'How do transformations work without changing my wrist?',
    answer: 'LARP uses specialized neural segmentation and horological synthesis. The system maps the precise 3D geometry of your wrist, locks your unique skin pores, sleeve fabrics, and lighting vectors, and replaces solely the timepiece bounding box with pixel-perfect authenticity.'
  },
  {
    question: 'Is this an actual generative AI tool or a demonstration?',
    answer: 'This application is an ultra-premium commercial frontend demonstration. All matching, transformations, processing pipelines, and catalog interactions are simulated with high-fidelity mock engines to showcase the commercially ready UX without billing real credit cards.'
  },
  {
    question: 'Can I cancel or change my plan anytime?',
    answer: 'Yes, in this interactive demo you can switch tiers, toggle annual discounts, and test upgrades and downgrades instantaneously without real financial commitments.'
  },
  {
    question: 'What image formats can I upload and export?',
    answer: 'You can upload standard JPG, PNG, and WebP images up to 25MB. Exports are rendered in lossless PNG or optimized JPG at up to 4K/8K resolution.'
  }
];

