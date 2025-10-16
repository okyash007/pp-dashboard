import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Loader2,
  AlertCircle,
  Check
} from "lucide-react";

const ImageUpload = ({ value, onChange, className = "" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(value || null);
  const fileInputRef = useRef(null);

  // Helper function to get auth token
  const getAuthToken = () => {
    // Try to get from localStorage first
    const localToken = localStorage.getItem('authToken');
    if (localToken) return localToken;
    
    // Try to get from auth store if available
    try {
      const authStore = JSON.parse(localStorage.getItem('authStore') || '{}');
      return authStore.token || authStore.accessToken;
    } catch (e) {
      console.warn('Could not parse auth store:', e);
    }
    
    // If no token found, throw an error
    throw new Error('No authentication token found. Please log in again.');
  };

  // Log when value changes
  useEffect(() => {
    if (value) {
      console.log('ImageUpload received new value:', value);
    }
  }, [value]);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validate file type - support common image formats
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, WebP, or SVG)');
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
      // Create FormData for the API
      const formData = new FormData();
      formData.append('image', file);

      // Get auth token
      const token = getAuthToken();

      // Make API call
      const response = await fetch('https://pp-backend.apextip.space/upload/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = `Upload failed with status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Image uploaded successfully:', result);

      // Use the uploaded image URL from the API response
      // Try different possible response formats
      const uploadedImageUrl = result.url || 
                              result.imageUrl || 
                              result.data?.url || 
                              result.data?.imageUrl ||
                              result.image?.url ||
                              result.image?.secure_url;
      
      if (uploadedImageUrl) {
        // Clean up the preview URL
        URL.revokeObjectURL(previewUrl);
        setPreview(uploadedImageUrl);
        onChange(uploadedImageUrl);
      } else {
        throw new Error('No image URL returned from server');
      }

    } catch (error) {
      console.error('Upload error:', error);
      
      // Handle specific error types
      if (error.message.includes('authentication token')) {
        setError('Authentication required. Please log in again.');
      } else if (error.message.includes('status: 401')) {
        setError('Authentication failed. Please log in again.');
      } else if (error.message.includes('status: 413')) {
        setError('File too large. Please choose a smaller image.');
      } else if (error.message.includes('status: 415')) {
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
    <div className={`space-y-2 ${className}`}>
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
          <div className="relative group">
            <div className="w-full h-32 bg-gray-100 rounded-xl border-2 border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
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
              className="absolute top-2 right-2 bg-red-200 hover:bg-red-300 text-black border-2 border-black rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Upload Status */}
          <div className="flex items-center gap-2 text-sm">
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span className="text-blue-600 font-medium">Uploading...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">Image uploaded</span>
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-150
            ${isDragging 
              ? 'border-blue-500 bg-blue-50 shadow-[2px_2px_0px_0px_rgba(59,130,246,0.6)]' 
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]'
            }
            transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none
          `}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center border-2 border-black
              ${isDragging ? 'bg-blue-200' : 'bg-yellow-200'}
              shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)]
            `}>
              {isUploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-black" />
              ) : (
                <ImageIcon className="w-6 h-6 text-black" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                {isDragging ? 'Drop image here' : 'Click to upload or drag & drop'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF, WebP, SVG up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Button (when no image) */}
      {!preview && (
        <Button
          type="button"
          onClick={handleClick}
          disabled={isUploading}
          className="w-full h-10 bg-blue-200 hover:bg-blue-300 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? 'Uploading...' : 'Choose Image'}
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;
