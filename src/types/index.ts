export type Brand = 
  | 'Rolex'
  | 'Patek Philippe'
  | 'Audemars Piguet'
  | 'Vacheron Constantin'
  | 'A. Lange & Söhne'
  | 'Cartier'
  | 'Jaeger-LeCoultre'
  | 'Omega'
  | 'IWC Schaffhausen'
  | 'Blancpain'
  | 'Tudor'
  | 'Richard Mille';

export interface WatchModel {
  id: string;
  brand: Brand;
  model: string;
  collection: string;
  reference: string;
  caseMaterial: string;
  caseDiameter: string;
  dialColor: string;
  braceletType: string;
  movement: string;
  waterResistance: string;
  priceEstimate: string;
  imageUrl: string;
  editorialImageUrl?: string;
  lifestyleImageUrl?: string;
  isPopular?: boolean;
  isFeatured?: boolean;
  description: string;
  dimensions: string;
  availableDials: string[];
  availableCases: string[];
  availableStraps: string[];
  similarityScore?: number; // for matching results
}

export interface TransformationConfig {
  dialColor: string;
  caseMaterial: string;
  braceletType: string;
  lightingPreservation: number; // 0-100
  skinTonePreservation: number; // 0-100
  wristAnatomyPreservation: number; // 0-100
  backgroundPreservation: number; // 0-100
  shadowReconstruction: number; // 0-100
}

export interface TransformationProject {
  id: string;
  title: string;
  originalImageUrl: string;
  transformedImageUrl: string;
  detectedWatch?: {
    brand: string;
    model: string;
    confidence: number;
    characteristics: string[];
  };
  selectedWatch: WatchModel;
  config: TransformationConfig;
  createdAt: string;
  status: 'completed' | 'processing' | 'failed';
  favorite?: boolean;
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  tier: 'Free' | 'Premium' | 'Elite';
  transformationsRemaining: number;
  totalTransformations: number;
  preferences: {
    defaultExportFormat: 'JPG' | 'PNG';
    preferredQuality: 'Standard' | 'High' | 'Maximum';
    emailNotifications: boolean;
    includeWatermarkDisclosure: boolean;
    preserveHistory: boolean;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  transformations: string;
  exportQuality: string;
  catalogAccess: string;
}

export interface AdminStats {
  totalUsers: number;
  totalTransformations: number;
  activeSubscriptions: number;
  estimatedRevenue: string;
  processingSuccessRate: number;
  dailyVolume: { date: string; transformations: number; newUsers: number }[];
  brandDistribution: { brand: string; count: number; percentage: number }[];
  recentTransformations: {
    id: string;
    userName: string;
    watchBrand: string;
    watchModel: string;
    timestamp: string;
    status: 'Completed' | 'Processing' | 'Failed';
    latencySec: number;
  }[];
}

