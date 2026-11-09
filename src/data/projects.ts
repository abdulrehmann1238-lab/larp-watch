import { TransformationProject } from '../types';
import { LUXURY_WATCHES } from './watches';

export const INITIAL_PROJECTS: TransformationProject[] = [
  {
    id: 'proj-01-editorial-blancpain',
    title: 'Autumn Tailoring & Grand Complication',
    originalImageUrl: '/assets/images/wrist_original_dress.jpg',
    transformedImageUrl: '/assets/images/wrist_editorial.jpg',
    detectedWatch: {
      brand: 'Vintage Dress',
      model: 'Gold Manual Calibre',
      confidence: 96,
      characteristics: ['Champagne dial', 'Alligator leather', 'Round gold bezel', 'Cushion crown']
    },
    selectedWatch: LUXURY_WATCHES.find(w => w.id === 'blancpain-villeret-tourbillon') || LUXURY_WATCHES[6],
    config: {
      dialColor: 'Sunburst Olive Green',
      caseMaterial: '18ct Red Gold',
      braceletType: 'Hand-sewn Chocolate Alligator',
      lightingPreservation: 98,
      skinTonePreservation: 100,
      wristAnatomyPreservation: 100,
      backgroundPreservation: 100,
      shadowReconstruction: 96
    },
    createdAt: '2026-11-08T14:30:00Z',
    status: 'completed',
    favorite: true,
    notes: 'Exceptional preservation of woolen sleeve ribbing and specular highlights on the skin.'
  },
  {
    id: 'proj-02-rolex-submariner',
    title: 'Casual Studio Portrait - Steel Diver',
    originalImageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    transformedImageUrl: 'https://images.unsplash.com/photo-1547996160-71dfabb1d898?q=80&w=1200&auto=format&fit=crop',
    detectedWatch: {
      brand: 'Generic Chronograph',
      model: 'Steel Sport Quartz',
      confidence: 93,
      characteristics: ['Black dial', 'Steel link bracelet', 'Tachymeter bezel']
    },
    selectedWatch: LUXURY_WATCHES.find(w => w.id === 'rolex-submariner-126610ln') || LUXURY_WATCHES[0],
    config: {
      dialColor: 'Black',
      caseMaterial: 'Oystersteel',
      braceletType: 'Oyster (Steel)',
      lightingPreservation: 95,
      skinTonePreservation: 99,
      wristAnatomyPreservation: 100,
      backgroundPreservation: 100,
      shadowReconstruction: 94
    },
    createdAt: '2026-11-06T09:15:00Z',
    status: 'completed',
    favorite: true,
    notes: 'Submariner ceramic bezel reflection matched to ambient studio softbox.'
  },
  {
    id: 'proj-03-patek-nautilus',
    title: 'Architectural Natural Light Study',
    originalImageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop',
    transformedImageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
    detectedWatch: {
      brand: 'Smartwatch',
      model: 'Digital Sport Band',
      confidence: 91,
      characteristics: ['Square digital display', 'Silicone black strap', 'Matte case']
    },
    selectedWatch: LUXURY_WATCHES.find(w => w.id === 'patek-nautilus-5711-1a') || LUXURY_WATCHES[1],
    config: {
      dialColor: 'Blue Sunburst',
      caseMaterial: 'Stainless Steel',
      braceletType: 'Integrated Steel Bracelet',
      lightingPreservation: 97,
      skinTonePreservation: 100,
      wristAnatomyPreservation: 98,
      backgroundPreservation: 100,
      shadowReconstruction: 96
    },
    createdAt: '2026-11-04T18:45:00Z',
    status: 'completed',
    favorite: false,
    notes: 'Seamless transition between skin tones and integrated steel bracelet links.'
  },
  {
    id: 'proj-04-cartier-santos',
    title: 'Minimalist Monochromatic Wrist',
    originalImageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1200&auto=format&fit=crop',
    transformedImageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1200&auto=format&fit=crop',
    detectedWatch: {
      brand: 'Minimalist Watch',
      model: 'Clean Dial Dress',
      confidence: 89,
      characteristics: ['White face', 'Thin leather strap', 'Gold plated']
    },
    selectedWatch: LUXURY_WATCHES.find(w => w.id === 'cartier-santos-wssa0018') || LUXURY_WATCHES[4],
    config: {
      dialColor: 'Opaline Silvered',
      caseMaterial: 'Stainless Steel',
      braceletType: 'Steel SmartLink & QuickSwitch',
      lightingPreservation: 96,
      skinTonePreservation: 100,
      wristAnatomyPreservation: 100,
      backgroundPreservation: 100,
      shadowReconstruction: 95
    },
    createdAt: '2026-10-29T11:20:00Z',
    status: 'completed',
    favorite: false,
    notes: 'Santos square bezel curvature seamlessly wrapped around wrist contour.'
  }
];

export const DEMO_USER = {
  id: 'usr_larp_94812',
  name: 'Alexandre Laurent',
  email: 'alexandre.laurent@horology-atelier.ch',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  tier: 'Premium' as const,
  transformationsRemaining: 18,
  totalTransformations: 24,
  preferences: {
    defaultExportFormat: 'JPG' as const,
    preferredQuality: 'Maximum' as const,
    emailNotifications: true,
    includeWatermarkDisclosure: true,
    preserveHistory: true
  }
};

