import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Trash2, 
  RefreshCw, 
  ShieldCheck, 
  Info,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUploadedImage, showToast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>('/assets/images/wrist_original_dress.jpg');
  const [fileName, setFileName] = useState<string>('wrist_portrait_raw.jpg');
  const [fileDimensions, setFileDimensions] = useState<string>('2400 × 1600 px');
  const [fileSize, setFileSize] = useState<string>('3.8 MB');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasOwnershipPermission, setHasOwnershipPermission] = useState<boolean>(true);

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file (JPG, PNG, or WEBP).', 'info');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(1) + ' MB');

    // Read image dimensions
    const img = new Image();
    img.onload = () => {
      setFileDimensions(`${img.naturalWidth} × ${img.naturalHeight} px`);
    };
    img.src = objectUrl;

    setUploadedImage(objectUrl, file.name);
    showToast('Photograph loaded successfully into studio.', 'success');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    setFileName('');
    setFileDimensions('');
    setUploadedImage(null);
  };

  const handleContinue = () => {
    if (!previewUrl) {
      showToast('Please select or upload a wrist photograph first.', 'info');
      return;
    }
    if (!hasOwnershipPermission) {
      showToast('Please confirm photographic permission to continue.', 'info');
      return;
    }
    navigate('/app/identify');
  };

  const handleUseSample = () => {
    setPreviewUrl('/assets/images/wrist_original_dress.jpg');
    setFileName('wrist_portrait_raw.jpg');
    setFileDimensions('2400 × 1600 px');
    setFileSize('3.8 MB');
    setUploadedImage('/assets/images/wrist_original_dress.jpg', 'wrist_portrait_raw.jpg');
    showToast('Loaded editorial wrist studio sample.', 'gold');
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full flex flex-col gap-10">
      {/* Header */}
      <div>
        <span className="label-tracking text-gold-dark text-[10px] block mb-1">
          STUDIO INGESTION • STEP 01 OF 04
        </span>
        <h1 className="text-3xl md:text-4xl font-editorial-heading font-medium text-charcoal">
          Let's transform your wrist.
        </h1>
        <p className="text-xs md:text-sm text-graphite font-sans mt-1">
          Upload a clear photograph of your wrist to begin your LARP horological transformation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload Dropzone Container (Left / Center) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp,image/heic"
            className="hidden"
          />

          {!previewUrl ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-[340px] ${
                isDragging
                  ? 'border-gold bg-parchment/80 ring-2 ring-gold/20'
                  : 'border-stone hover:border-gold/80 bg-white hover:bg-parchment/30'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-parchment text-gold-dark flex items-center justify-center mb-4 border border-stone-light">
                <UploadCloud className="w-7 h-7" />
              </div>
              <h3 className="font-editorial-heading text-xl font-medium text-charcoal mb-1">
                Drag and drop your wrist photograph
              </h3>
              <p className="text-xs text-graphite max-w-xs mb-4">
                Supports high-resolution JPG, PNG, and WebP up to 25MB.
              </p>
              <button
                type="button"
                className="px-5 py-2.5 rounded-full bg-charcoal text-ivory text-xs uppercase tracking-wider font-medium hover:bg-espresso transition-colors shadow-sm"
              >
                Browse Local Files
              </button>

              <div className="mt-6 pt-4 border-t border-stone-light/60 w-full flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUseSample();
                  }}
                  className="text-xs text-gold-dark hover:underline flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Or use standard high-res wrist sample</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-light p-6 shadow-luxury">
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-parchment border border-stone-light/80 mb-4 group">
                <img
                  src={previewUrl}
                  alt="Uploaded wrist"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-lg bg-charcoal/80 text-ivory hover:bg-charcoal text-xs backdrop-blur-md transition-colors"
                    title="Replace image"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleClear}
                    className="p-2 rounded-lg bg-charcoal/80 text-ivory hover:bg-terracotta text-xs backdrop-blur-md transition-colors"
                    title="Remove image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* File Specs Details */}
              <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-parchment/60 border border-stone-light text-xs text-graphite mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-dark block">File</span>
                  <span className="font-mono text-charcoal truncate block font-medium">{fileName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-dark block">Dimensions</span>
                  <span className="font-mono text-charcoal font-medium">{fileDimensions}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-dark block">File Size</span>
                  <span className="font-mono text-charcoal font-medium">{fileSize}</span>
                </div>
              </div>

              {/* Ownership Checkbox */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-ivory border border-stone-light mb-6">
                <input
                  type="checkbox"
                  id="ownership"
                  checked={hasOwnershipPermission}
                  onChange={e => setHasOwnershipPermission(e.target.checked)}
                  className="mt-0.5 rounded border-stone text-charcoal focus:ring-gold"
                />
                <label htmlFor="ownership" className="text-xs text-graphite leading-relaxed cursor-pointer">
                  I confirm that I possess the rights or personal consent to transform this photograph, and acknowledge the output is a simulated digital transformation.
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="py-3 px-4 rounded-xl border border-stone hover:border-charcoal text-xs uppercase tracking-wider font-medium transition-colors"
                >
                  Choose Different Photo
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="flex-1 py-3 px-6 rounded-xl bg-charcoal hover:bg-espresso text-ivory text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-md flex items-center justify-center gap-2 border border-charcoal hover:border-gold/40"
                >
                  <span>Continue to Identification</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Photography Quality Guidelines (Right Column) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Example Photo Tile */}
          <div className="bg-white rounded-2xl border border-stone-light p-6 shadow-xs">
            <span className="label-tracking text-gold-dark text-[10px] block mb-2">
              IDEAL PHOTOGRAPHY EXAMPLE
            </span>
            <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-parchment relative border border-stone-light mb-4">
              <img
                src="/assets/images/wrist_original_dress.jpg"
                alt="Acceptable wrist angle"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-charcoal/80 text-ivory text-[9px] uppercase tracking-wider backdrop-blur-sm">
                Natural daylight • Clear wrist contour
              </div>
            </div>

            <h4 className="font-editorial-heading text-lg font-medium text-charcoal mb-3">
              Photography Best Practices
            </h4>

            <ul className="space-y-2.5 text-xs text-graphite">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                <span>Ensure your wrist, forearm, and watch/bare wrist are unobstructed.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                <span>Diffuse ambient daylight or soft room lighting yields the sharpest reflections.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                <span>Avoid excessive motion blur or extreme wide-angle lens distortion.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                <span>Tattoos, bracelets, and jacket sleeves are fully preserved by the solver.</span>
              </li>
            </ul>
          </div>

          {/* Privacy Note */}
          <div className="p-4 rounded-xl bg-parchment border border-stone-light/70 flex items-start gap-3 text-xs text-stone-dark">
            <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <p>
              <strong>Local Browser Sandbox:</strong> Photos are held locally in your browser memory for session transformation and are not transmitted to third-party databases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

