import React, { createContext, useContext, useState, useEffect } from 'react';
import { WatchModel, TransformationProject, UserProfile, TransformationConfig } from '../types';
import { LUXURY_WATCHES } from '../data/watches';
import { INITIAL_PROJECTS, DEMO_USER } from '../data/projects';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'gold';
}

interface AppContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  setUserTier: (tier: 'Free' | 'Premium' | 'Elite') => void;
  
  // Projects
  projects: TransformationProject[];
  saveProject: (project: Omit<TransformationProject, 'id' | 'createdAt'>) => string;
  deleteProject: (id: string) => void;
  renameProject: (id: string, newTitle: string) => void;
  toggleFavoriteProject: (id: string) => void;
  getProjectById: (id: string) => TransformationProject | undefined;

  // Active Flow State
  uploadedImage: string | null;
  uploadedFileName: string;
  setUploadedImage: (url: string | null, fileName?: string) => void;
  detectedResult: {
    brand: string;
    model: string;
    confidence: number;
    characteristics: string[];
  } | null;
  setDetectedResult: (result: any) => void;
  selectedWatch: WatchModel | null;
  setSelectedWatch: (watch: WatchModel | null) => void;
  watchConfig: TransformationConfig;
  updateWatchConfig: (updates: Partial<TransformationConfig>) => void;
  transformedResultUrl: string | null;
  setTransformedResultUrl: (url: string | null) => void;
  resetFlow: () => void;

  // Favorites
  favoriteWatchIds: string[];
  toggleFavoriteWatch: (watchId: string) => void;
  isWatchFavorite: (watchId: string) => boolean;

  // UI Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'gold') => void;
  dismissToast: (id: string) => void;

  // Selected Watch Modal
  modalWatch: WatchModel | null;
  openWatchModal: (watch: WatchModel) => void;
  closeWatchModal: () => void;

  // Subscription modal
  isUpgradeModalOpen: boolean;
  openUpgradeModal: () => void;
  closeUpgradeModal: () => void;
}

const defaultConfig: TransformationConfig = {
  dialColor: 'Sunburst Olive Green',
  caseMaterial: '18ct Red Gold',
  braceletType: 'Hand-sewn Chocolate Alligator',
  lightingPreservation: 98,
  skinTonePreservation: 100,
  wristAnatomyPreservation: 100,
  backgroundPreservation: 100,
  shadowReconstruction: 96
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User state
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('larp_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  // Projects state
  const [projects, setProjects] = useState<TransformationProject[]>(() => {
    const saved = localStorage.getItem('larp_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  // Flow state
  const [uploadedImage, setUploadedImageState] = useState<string | null>(() => {
    return localStorage.getItem('larp_active_image') || '/assets/images/wrist_editorial.jpg';
  });
  const [uploadedFileName, setUploadedFileName] = useState<string>('wrist_portrait_raw.jpg');
  
  const [detectedResult, setDetectedResult] = useState<{
    brand: string;
    model: string;
    confidence: number;
    characteristics: string[];
  } | null>({
    brand: 'Rolex',
    model: 'Submariner Date 126610LN',
    confidence: 94,
    characteristics: [
      'Black dial with luminous Chromalight plots',
      'Cerachrom 60-minute unidirectional rotatable bezel',
      'Oystersteel three-piece solid link bracelet',
      'Right wrist anatomy & neutral studio key lighting'
    ]
  });

  const [selectedWatch, setSelectedWatch] = useState<WatchModel | null>(LUXURY_WATCHES[6]); // Blancpain Villeret Tourbillon Carrousel default
  const [watchConfig, setWatchConfig] = useState<TransformationConfig>(defaultConfig);
  const [transformedResultUrl, setTransformedResultUrl] = useState<string | null>('/assets/images/wrist_editorial.jpg');

  // Favorites
  const [favoriteWatchIds, setFavoriteWatchIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('larp_fav_watches');
    return saved ? JSON.parse(saved) : ['blancpain-villeret-tourbillon', 'rolex-submariner-126610ln', 'patek-nautilus-5711-1a'];
  });

  // Modals
  const [modalWatch, setModalWatch] = useState<WatchModel | null>(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync projects to storage
  useEffect(() => {
    try {
      localStorage.setItem('larp_projects', JSON.stringify(projects));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [projects]);

  // Sync user to storage
  useEffect(() => {
    try {
      localStorage.setItem('larp_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Could not save user to localStorage', e);
    }
  }, [user]);

  // Sync favorite watches
  useEffect(() => {
    try {
      localStorage.setItem('larp_fav_watches', JSON.stringify(favoriteWatchIds));
    } catch (e) {
      console.warn('Could not save favorites', e);
    }
  }, [favoriteWatchIds]);

  const showToast = (message: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
    showToast('Profile preferences updated', 'success');
  };

  const setUserTier = (tier: 'Free' | 'Premium' | 'Elite') => {
    setUser(prev => ({
      ...prev,
      tier,
      transformationsRemaining: tier === 'Elite' ? 999 : tier === 'Premium' ? 25 : 3
    }));
    showToast(`Subscription changed to ${tier} Tier (Demo Simulation)`, 'gold');
  };

  const saveProject = (projectData: Omit<TransformationProject, 'id' | 'createdAt'>): string => {
    const newId = `proj-${Date.now()}`;
    const newProject: TransformationProject = {
      ...projectData,
      id: newId,
      createdAt: new Date().toISOString()
    };
    setProjects(prev => [newProject, ...prev]);
    showToast('Transformation saved to your portfolio', 'success');
    return newId;
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    showToast('Project removed from collection', 'info');
  };

  const renameProject = (id: string, newTitle: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, title: newTitle } : p));
    showToast('Project renamed', 'info');
  };

  const toggleFavoriteProject = (id: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, favorite: !p.favorite } : p));
  };

  const getProjectById = (id: string) => {
    return projects.find(p => p.id === id);
  };

  const setUploadedImage = (url: string | null, fileName: string = 'wrist_portrait_raw.jpg') => {
    setUploadedImageState(url);
    setUploadedFileName(fileName);
    if (url) {
      try {
        localStorage.setItem('larp_active_image', url);
      } catch (e) {}
    }
  };

  const updateWatchConfig = (updates: Partial<TransformationConfig>) => {
    setWatchConfig(prev => ({ ...prev, ...updates }));
  };

  const toggleFavoriteWatch = (watchId: string) => {
    setFavoriteWatchIds(prev => {
      const exists = prev.includes(watchId);
      if (exists) {
        showToast('Watch removed from favorites', 'info');
        return prev.filter(id => id !== watchId);
      } else {
        showToast('Watch saved to your wish list', 'gold');
        return [...prev, watchId];
      }
    });
  };

  const isWatchFavorite = (watchId: string) => favoriteWatchIds.includes(watchId);

  const openWatchModal = (watch: WatchModel) => setModalWatch(watch);
  const closeWatchModal = () => setModalWatch(null);

  const openUpgradeModal = () => setIsUpgradeModalOpen(true);
  const closeUpgradeModal = () => setIsUpgradeModalOpen(false);

  const resetFlow = () => {
    setUploadedImageState('/assets/images/wrist_editorial.jpg');
    setUploadedFileName('wrist_portrait_raw.jpg');
    setSelectedWatch(LUXURY_WATCHES[6]);
    setWatchConfig(defaultConfig);
    setTransformedResultUrl('/assets/images/wrist_editorial.jpg');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        updateUser,
        setUserTier,
        projects,
        saveProject,
        deleteProject,
        renameProject,
        toggleFavoriteProject,
        getProjectById,
        uploadedImage,
        uploadedFileName,
        setUploadedImage,
        detectedResult,
        setDetectedResult,
        selectedWatch,
        setSelectedWatch,
        watchConfig,
        updateWatchConfig,
        transformedResultUrl,
        setTransformedResultUrl,
        resetFlow,
        favoriteWatchIds,
        toggleFavoriteWatch,
        isWatchFavorite,
        toasts,
        showToast,
        dismissToast,
        modalWatch,
        openWatchModal,
        closeWatchModal,
        isUpgradeModalOpen,
        openUpgradeModal,
        closeUpgradeModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

