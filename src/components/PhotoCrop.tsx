import React, { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface PhotoCropProps {
  imageFile: File | null;
  onCroppedImage: (croppedFile: File | null) => void;
  onClose: () => void;
}

const PhotoCrop: React.FC<PhotoCropProps> = ({ imageFile, onCroppedImage, onClose }) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [imageUrl, setImageUrl] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    // Set initial crop to be centered and square
    const cropSize = Math.min(width, height) * 0.8;
    const x = (width - cropSize) / 2;
    const y = (height - cropSize) / 2;
    
    setCrop({
      unit: 'px',
      x,
      y,
      width: cropSize,
      height: cropSize,
    });
  };

  const getCroppedImage = async (
    image: HTMLImageElement,
    crop: PixelCrop
  ): Promise<File | null> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return null;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Set canvas size to desired output size (400x400 for profile photos)
    const outputSize = 400;
    canvas.width = outputSize;
    canvas.height = outputSize;

    // Calculate crop dimensions
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;

    // Draw the cropped image
    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      outputSize,
      outputSize
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `profile_${Date.now()}.jpg`, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          resolve(file);
        } else {
          resolve(null);
        }
      }, 'image/jpeg', 0.9);
    });
  };

  const handleSave = async () => {
    if (imgRef.current && completedCrop) {
      try {
        const croppedFile = await getCroppedImage(imgRef.current, completedCrop);
        onCroppedImage(croppedFile);
        onClose();
      } catch (error) {
        console.error('Error cropping image:', error);
        alert('Error cropping image. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    onCroppedImage(null);
    onClose();
  };

  if (!imageFile || !imageUrl) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Crop Your Profile Photo
          </h3>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              Drag the corners to adjust the crop area. Your photo will be resized to 400x400 pixels.
            </p>
            
            <div className="max-h-96 overflow-hidden flex justify-center">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1} // Square crop
                minWidth={100}
                minHeight={100}
              >
                <img
                  ref={imgRef}
                  src={imageUrl}
                  alt="Crop preview"
                  onLoad={onImageLoad}
                  className="max-w-full max-h-96 object-contain"
                />
              </ReactCrop>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!completedCrop}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Save Cropped Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCrop;