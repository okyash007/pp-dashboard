import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  X, 
  Image as ImageIcon, 
  Loader2,
  AlertCircle
} from "lucide-react";

const ImageUpload = ({ value, onChange, className = "" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(value || null);
  const fileInputRef = useRef(null);

  // Log when value changes
  useEffect(() => {
    if (value) {
      console.log('ImageUpload received new value:', value);
      setPreview(value);
    }
  }, [value]);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validate file type - support common image formats
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/avif', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, WebP, AVIF, or SVG)');
      return;
    }

    // Validate file size (10MB max for better compatibility)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      return;
    }

    setError(null);
    setIsUploading(true);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    try {
      // Get Cloudinary configuration from environment variables
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary configuration is missing. Please check environment variables.');
      }

      // Create FormData for Cloudinary
      // Note: Transformations should be configured in the upload preset settings
      // Unsigned uploads don't allow transformation parameters in the request
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', 'pp-uploads');

      // Upload directly to Cloudinary
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Image uploaded successfully to Cloudinary:', result);

      // Extract the secure URL from Cloudinary response
      const uploadedImageUrl = result.secure_url;

      if (uploadedImageUrl) {
        // Clean up the preview URL
        URL.revokeObjectURL(previewUrl);
        setPreview(uploadedImageUrl);
        onChange(uploadedImageUrl);
      } else {
        throw new Error('No image URL returned from Cloudinary');
      }

    } catch (error) {
      console.error('Upload error:', error);
      
      // Handle specific error types
      if (error.message.includes('413') || error.message.includes('too large')) {
        setError('File too large. Please choose a smaller image.');
      } else if (error.message.includes('415') || error.message.includes('Unsupported')) {
        setError('Unsupported file type. Please choose a valid image.');
      } else {
        setError(error.message || 'Failed to upload image. Please try again.');
      }
      
      // Clean up preview on error
      URL.revokeObjectURL(previewUrl);
      setPreview(null);
      onChange(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleRemoveImage = () => {
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    console.log('Image removed');
    setPreview(null);
    onChange(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
      
      {preview ? (
        <div className="space-y-3">
          {/* Image Preview */}
          <div className="relative">
            <div className="relative w-full h-48 bg-white border-[3px] border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Remove Button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-white hover:bg-red-500 hover:text-white text-black border-[3px] border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none font-bold"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Upload Status */}
          {isUploading && (
            <div className="flex items-center gap-2 px-3 py-2 bg-[#828BF8]/10 border-[3px] border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Loader2 className="w-4 h-4 animate-spin text-[#828BF8]" />
              <span className="text-sm font-semibold text-black">Uploading...</span>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative w-full h-32 border-[3px] border-dashed rounded-lg cursor-pointer transition-all duration-200
            ${isDragging 
              ? 'border-[#828BF8] bg-[#828BF8]/10 shadow-[4px_4px_0px_0px_rgba(130,139,248,1)]' 
              : 'border-black bg-white hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
            }
            hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
          `}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center border-[3px] border-black transition-all duration-200
              ${isDragging 
                ? 'bg-[#828BF8]' 
                : 'bg-[#FEF18C]'
              }
              shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            `}>
              {isUploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-black" />
              ) : (
                <ImageIcon className="w-6 h-6 text-black" />
              )}
            </div>
            <div className="text-center">
              <p className={`text-sm font-semibold ${isDragging ? 'text-[#828BF8]' : 'text-black'}`}>
                {isDragging ? 'Drop image here' : 'Click to upload or drag & drop'}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                PNG, JPG, GIF, WebP, AVIF, SVG up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border-[3px] border-red-500 rounded-lg shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span className="text-sm font-semibold text-red-800">{error}</span>
        </div>
      )}

    </div>
  );
};

export default ImageUpload;
