import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ScrollToTop } from './components/common/ScrollToTop';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppLayout } from './components/layout/AppLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { WatchDetailModal } from './components/modals/WatchDetailModal';
import { SubscriptionModal } from './components/modals/SubscriptionModal';
import { ToastContainer } from './components/common/ToastContainer';

// Public Pages
import { HomePage } from './pages/Home/HomePage';
import { HowItWorksPage } from './pages/HowItWorks/HowItWorksPage';
import { ShowcasePage } from './pages/Showcase/ShowcasePage';
import { CollectionPage } from './pages/Collection/CollectionPage';
import { PricingPage } from './pages/Pricing/PricingPage';
import { AboutPage } from './pages/About/AboutPage';
import { FAQPage } from './pages/FAQ/FAQPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { SignInPage } from './pages/Auth/SignInPage';
import { SignUpPage } from './pages/Auth/SignUpPage';

// App Workspace Pages
import { DashboardPage } from './pages/App/DashboardPage';
import { UploadPage } from './pages/App/UploadPage';
import { IdentificationPage } from './pages/App/IdentificationPage';
import { WatchMatchingPage } from './pages/App/WatchMatchingPage';
import { ConfigurationPage } from './pages/App/ConfigurationPage';
import { StudioPage } from './pages/App/StudioPage';
import { ProcessingPage } from './pages/App/ProcessingPage';
import { ResultsPage } from './pages/App/ResultsPage';
import { GalleryPage } from './pages/App/GalleryPage';
import { SubscriptionPage } from './pages/App/SubscriptionPage';
import { SettingsPage } from './pages/App/SettingsPage';

// Admin Pages
import { AdminDashboardPage } from './pages/Admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/Admin/AdminUsersPage';
import { AdminCatalogPage } from './pages/Admin/AdminCatalogPage';
import { AdminTransformationsPage } from './pages/Admin/AdminTransformationsPage';
import { AdminSubscriptionsPage } from './pages/Admin/AdminSubscriptionsPage';

// Public Layout Container
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <LoadingScreen />

        <Routes>
          {/* Public Routes with Navbar and Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/showcase" element={<ShowcasePage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>

          {/* App Workspace Routes */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="identify" element={<IdentificationPage />} />
            <Route path="matches" element={<WatchMatchingPage />} />
            <Route path="configure" element={<ConfigurationPage />} />
            <Route path="studio" element={<StudioPage />} />
            <Route path="processing" element={<ProcessingPage />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="subscription" element={<SubscriptionPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Admin Portal Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="catalog" element={<AdminCatalogPage />} />
            <Route path="transformations" element={<AdminTransformationsPage />} />
            <Route path="subscriptions" element={<AdminSubscriptionsPage />} />
          </Route>

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<PublicLayout />}>
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>

        {/* Global Modals & Toasts */}
        <WatchDetailModal />
        <SubscriptionModal />
        <ToastContainer />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;

