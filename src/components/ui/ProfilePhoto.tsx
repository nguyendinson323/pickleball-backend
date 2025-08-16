import React, { useState } from 'react';
import { UserIcon } from 'lucide-react';
import { imageBaseURL } from '../../lib/const';

interface ProfilePhotoProps {
  profilePhoto?: string | null;
  alt?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallbackIcon?: React.ReactNode;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  profilePhoto,
  alt = "Profile Photo",
  className = "",
  size = "md",
  fallbackIcon
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-32 h-32"
  };
  
  const baseClasses = `${sizeClasses[size]} rounded-full object-cover`;
  const finalClasses = `${baseClasses} ${className}`.trim();
  
  // If no profile photo or image failed to load, show fallback
  if (!profilePhoto || imageError) {
    return (
      <div className={`${finalClasses} bg-gray-200 flex items-center justify-center`}>
        {fallbackIcon || <UserIcon className={`w-${size === 'sm' ? '4' : size === 'md' ? '6' : size === 'lg' ? '8' : '16'} h-${size === 'sm' ? '4' : size === 'md' ? '6' : size === 'lg' ? '8' : '16'} text-gray-400`} />}
      </div>
    );
  }
  
  // Construct full image URL
  const imageUrl = profilePhoto.startsWith('http') 
    ? profilePhoto 
    : `${imageBaseURL}${profilePhoto}`;
  
  return (
    <img 
      src={imageUrl}
      alt={alt}
      className={finalClasses}
      onError={() => setImageError(true)}
      onLoad={() => setImageError(false)}
    />
  );
};

export default ProfilePhoto; 