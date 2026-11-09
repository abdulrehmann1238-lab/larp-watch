import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Images, 
  Trash2, 
  Download, 
  Eye, 
  Edit3, 
  Heart, 
  Sparkles, 
  Search, 
  ArrowUpRight,
  Upload,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TransformationProject } from '../../types';

export const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    projects, 
    deleteProject, 
    renameProject, 
    toggleFavoriteProject, 
    setSelectedWatch, 
    setTransformedResultUrl, 
    setUploadedImage,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [projectToDelete, setProjectToDelete] = useState<TransformationProject | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');

  const filteredProjects = useMemo(() => {
    let list = [...projects];

    if (activeTab === 'favorites') {
      list = list.filter(p => p.favorite);
    }

    if (searchQuery) {
      list = list.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.selectedWatch.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.selectedWatch.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder === 'newest') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return list;
  }, [projects, activeTab, sortOrder, searchQuery]);

  const handleOpenProject = (proj: TransformationProject) => {
    setSelectedWatch(proj.selectedWatch);
    setTransformedResultUrl(proj.transformedImageUrl);
    setUploadedImage(proj.originalImageUrl, proj.title);
    navigate('/app/results');
  };

  const handleDownload = (e: React.MouseEvent, proj: TransformationProject) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = proj.transformedImageUrl;
    link.download = `LARP_${proj.selectedWatch.brand}_${proj.selectedWatch.reference}.jpg`;
    link.click();
    showToast('Photograph downloaded.', 'success');
  };

  const handleStartRename = (e: React.MouseEvent, proj: TransformationProject) => {
    e.stopPropagation();
    setEditingProjectId(proj.id);
    setEditTitle(proj.title);
  };

  const handleSaveRename = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      renameProject(id, editTitle.trim());
    }
    setEditingProjectId(null);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-light/70">
        <div>
          <span className="label-tracking text-gold-dark text-[10px] block mb-1">
            PORTFOLIO REPOSITORY
          </span>
          <h1 className="text-3xl md:text-4xl font-editorial-heading font-medium text-charcoal">
            My Projects & Gallery.
          </h1>
          <p className="text-xs md:text-sm text-graphite font-sans mt-0.5">
            Manage, inspect, and export your personal horological transformations.
          </p>
        </div>

        <button
          onClick={() => navigate('/app/upload')}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-wider font-medium shadow-sm transition-colors"
        >
          <Upload className="w-3.5 h-3.5 text-gold" />
          <span>New Transformation</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-stone-light shadow-xs">
        {/* Tab Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-lg text-xs font-sans uppercase tracking-wider transition-all ${
              activeTab === 'all'
                ? 'bg-charcoal text-ivory font-medium'
                : 'text-graphite hover:text-charcoal hover:bg-parchment'
            }`}
          >
            All Studies ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-1.5 rounded-lg text-xs font-sans uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'bg-charcoal text-ivory font-medium'
                : 'text-graphite hover:text-charcoal hover:bg-parchment'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-gold" />
            <span>Favorites</span>
          </button>
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-stone-dark absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search studies..."
              className="w-full bg-parchment/60 border border-stone-light rounded-lg pl-9 pr-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold"
            />
          </div>

          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value as any)}
            className="bg-parchment/60 border border-stone-light rounded-lg px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold cursor-pointer"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 px-6 bg-white rounded-2xl border border-stone-light shadow-xs">
          <Images className="w-12 h-12 text-stone-dark mx-auto mb-3" />
          <h3 className="font-editorial-heading text-2xl text-charcoal">No projects found</h3>
          <p className="text-xs text-graphite mt-1 mb-6">
            {searchQuery ? 'Try clearing your search query.' : 'Begin your journey by uploading your first wrist photograph.'}
          </p>
          <button
            onClick={() => navigate('/app/upload')}
            className="px-6 py-2.5 rounded-full bg-charcoal text-ivory text-xs uppercase tracking-wider font-medium"
          >
            Start Transformation
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              onClick={() => handleOpenProject(proj)}
              className="group bg-white rounded-2xl border border-stone-light/80 overflow-hidden hover:shadow-luxury transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-parchment">
                  <img
                    src={proj.transformedImageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/wrist_editorial.jpg';
                    }}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-charcoal/80 backdrop-blur-md text-ivory text-[9px] uppercase tracking-widest font-mono">
                      {proj.selectedWatch.brand}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavoriteProject(proj.id);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-charcoal/70 backdrop-blur-md text-ivory hover:text-gold transition-colors"
                    title="Toggle Favorite"
                  >
                    <Heart className={`w-3.5 h-3.5 ${proj.favorite ? 'fill-gold text-gold' : ''}`} />
                  </button>
                </div>

                {/* Details */}
                <div className="p-5">
                  {editingProjectId === proj.id ? (
                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        className="flex-1 bg-parchment border border-gold rounded px-2 py-1 text-xs text-charcoal outline-none"
                        autoFocus
                      />
                      <button
                        onClick={(e) => handleSaveRename(e, proj.id)}
                        className="p-1 text-sage hover:bg-stone-light rounded"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProjectId(null);
                        }}
                        className="p-1 text-terracotta hover:bg-stone-light rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <h3 className="font-editorial-heading text-lg font-medium text-charcoal group-hover:text-gold-dark transition-colors line-clamp-1">
                        {proj.title}
                      </h3>
                      <button
                        onClick={(e) => handleStartRename(e, proj)}
                        className="p-1 text-stone-dark hover:text-charcoal opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Rename"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <p className="text-xs text-graphite font-mono mt-0.5">
                    {proj.selectedWatch.model} • Ref. {proj.selectedWatch.reference}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-light/60 flex items-center justify-between text-[11px] text-stone-dark">
                    <span>{new Date(proj.createdAt).toLocaleDateString()}</span>
                    <span className="text-sage font-medium">Verified Composite</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-stone-light/40">
                <span className="text-[11px] uppercase tracking-wider text-charcoal font-medium flex items-center gap-1 group-hover:text-gold transition-colors">
                  <span>Compare</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleDownload(e, proj)}
                    className="p-1.5 text-stone-dark hover:text-charcoal rounded hover:bg-stone-light/50 transition-colors"
                    title="Download high-resolution image"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProjectToDelete(proj);
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

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-stone-light p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-editorial-heading text-xl font-medium text-charcoal mb-2">
              Remove from Portfolio?
            </h3>
            <p className="text-xs text-graphite mb-6 leading-relaxed">
              Are you sure you wish to delete <strong>{projectToDelete.title}</strong>? This action removes the saved composite study from your workspace.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setProjectToDelete(null)}
                className="py-2 px-4 rounded-lg text-xs uppercase tracking-wider text-charcoal hover:bg-stone-light transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProject(projectToDelete.id);
                  setProjectToDelete(null);
                }}
                className="py-2 px-4 rounded-lg bg-terracotta text-white text-xs uppercase tracking-wider font-medium hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

