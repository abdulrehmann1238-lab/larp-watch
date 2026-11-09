import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Sparkles, 
  Clock, 
  Images, 
  Heart, 
  ArrowUpRight, 
  Trash2, 
  Download, 
  Eye, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, projects, deleteProject, setSelectedWatch, setTransformedResultUrl, setUploadedImage } = useApp();

  const handleOpenProject = (proj: typeof projects[0]) => {
    setSelectedWatch(proj.selectedWatch);
    setTransformedResultUrl(proj.transformedImageUrl);
    setUploadedImage(proj.originalImageUrl, proj.title);
    navigate('/app/results');
  };

  const handleDownload = (e: React.MouseEvent, proj: typeof projects[0]) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = proj.transformedImageUrl;
    link.download = `LARP_${proj.selectedWatch.brand}_${proj.selectedWatch.reference}.jpg`;
    link.click();
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full flex flex-col gap-10">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-stone-light/70">
        <div>
          <span className="label-tracking text-gold-dark text-[10px] block mb-1">
            CREATIVE ATELIER
          </span>
          <h1 className="text-3xl md:text-4xl font-editorial-heading font-medium text-charcoal">
            Welcome back, {user.name.split(' ')[0]}.
          </h1>
          <p className="text-xs md:text-sm text-graphite font-sans mt-1">
            Your personal watch photography studio & high-horology archive.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app/upload"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-md border border-charcoal hover:border-gold/30 group"
          >
            <Upload className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
            <span>Create New Transformation</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="p-5 rounded-2xl bg-white border border-stone-light shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-dark mb-3">
            <span className="text-[10px] uppercase tracking-wider font-medium">Transformations</span>
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
          <div>
            <span className="text-3xl font-editorial-heading font-medium text-charcoal">
              {user.totalTransformations}
            </span>
            <span className="text-[10px] text-sage block mt-0.5 font-sans font-medium">
              High fidelity completed
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-light shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-dark mb-3">
            <span className="text-[10px] uppercase tracking-wider font-medium">Saved Photographs</span>
            <Images className="w-4 h-4 text-gold" />
          </div>
          <div>
            <span className="text-3xl font-editorial-heading font-medium text-charcoal">
              {projects.length}
            </span>
            <span className="text-[10px] text-graphite block mt-0.5 font-sans">
              In portfolio gallery
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-light shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-dark mb-3">
            <span className="text-[10px] uppercase tracking-wider font-medium">Remaining Credits</span>
            <Clock className="w-4 h-4 text-gold" />
          </div>
          <div>
            <span className="text-3xl font-editorial-heading font-medium text-charcoal">
              {user.transformationsRemaining}
            </span>
            <span className="text-[10px] text-gold-dark block mt-0.5 font-sans font-medium">
              {user.tier} Tier (Renews Monthly)
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-light shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-dark mb-3">
            <span className="text-[10px] uppercase tracking-wider font-medium">Wishlist Models</span>
            <Heart className="w-4 h-4 text-gold" />
          </div>
          <div>
            <span className="text-3xl font-editorial-heading font-medium text-charcoal">
              3
            </span>
            <span className="text-[10px] text-graphite block mt-0.5 font-sans">
              Saved for future fits
            </span>
          </div>
        </div>
      </div>

      {/* Recent Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-editorial-heading font-medium text-charcoal">
              Recent Transformations
            </h2>
            <p className="text-xs text-graphite mt-0.5">
              Review and download your recent photographic studies.
            </p>
          </div>
          <Link
            to="/app/gallery"
            className="text-xs uppercase tracking-wider text-charcoal hover:text-gold transition-colors flex items-center gap-1 font-medium"
          >
            <span>View All ({projects.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-2xl border border-stone-light">
            <Images className="w-10 h-10 text-stone-dark mx-auto mb-3" />
            <h3 className="font-editorial-heading text-xl text-charcoal">No projects created yet</h3>
            <p className="text-xs text-graphite mt-1 mb-6 max-w-sm mx-auto">
              Upload your wrist photo to experience the precision of Swiss high horology on your own wrist.
            </p>
            <Link
              to="/app/upload"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-charcoal text-ivory text-xs uppercase tracking-wider font-medium"
            >
              Upload First Photo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(proj => (
              <div
                key={proj.id}
                onClick={() => handleOpenProject(proj)}
                className="group bg-white rounded-2xl border border-stone-light/80 overflow-hidden hover:shadow-luxury transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-parchment">
                    <img
                      src={proj.transformedImageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/wrist_editorial.jpg';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded bg-charcoal/80 backdrop-blur-md text-ivory text-[9px] uppercase tracking-widest font-mono">
                        {proj.selectedWatch.brand}
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5">
                    <h3 className="font-editorial-heading text-lg font-medium text-charcoal group-hover:text-gold-dark transition-colors line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-graphite font-mono mt-0.5">
                      {proj.selectedWatch.model} • Ref. {proj.selectedWatch.reference}
                    </p>

                    <div className="mt-4 pt-3 border-t border-stone-light/60 flex items-center justify-between text-[11px] text-stone-dark">
                      <span>{new Date(proj.createdAt).toLocaleDateString()}</span>
                      <span className="text-sage font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                        Completed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-stone-light/40">
                  <span className="text-[11px] uppercase tracking-wider text-charcoal font-medium flex items-center gap-1 group-hover:text-gold transition-colors">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleDownload(e, proj)}
                      className="p-1.5 text-stone-dark hover:text-charcoal rounded hover:bg-stone-light/50 transition-colors"
                      title="Download image"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(proj.id);
                      }}
                      className="p-1.5 text-stone-dark hover:text-terracotta rounded hover:bg-stone-light/50 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

