import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Download, 
  RefreshCw, 
  Copy, 
  Share2, 
  QrCode,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'sonner';

export type QRCodeData = {
  type: 'credential' | 'tournament' | 'club' | 'event' | 'url' | 'contact' | 'court_reservation';
  data: Record<string, any>;
  metadata?: {
    title?: string;
    description?: string;
    expiryDate?: string;
    securityLevel?: 'low' | 'medium' | 'high';
  };
};

interface QRGeneratorProps {
  qrData: QRCodeData;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
  backgroundColor?: string;
  foregroundColor?: string;
  showControls?: boolean;
  showMetadata?: boolean;
  onDataChange?: (data: string) => void;
  className?: string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({
  qrData,
  size = 256,
  level = 'M',
  includeMargin = true,
  backgroundColor = '#ffffff',
  foregroundColor = '#000000',
  showControls = true,
  showMetadata = true,
  onDataChange,
  className = ''
}) => {
  const [qrString, setQrString] = useState<string>('');
  const [showRawData, setShowRawData] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateQRString();
  }, [qrData]);

  const generateQRString = () => {
    setIsGenerating(true);
    
    try {
      let qrContent = '';
      const baseUrl = window.location.origin;
      
      switch (qrData.type) {
        case 'credential':
          // Generate credential verification URL
          qrContent = `${baseUrl}/verify-credential/${qrData.data.verification_code}?token=${qrData.data.jwt_token || 'secure'}`;
          break;
          
        case 'tournament':
          // Generate tournament registration/info URL
          qrContent = `${baseUrl}/tournaments/${qrData.data.tournament_id}?ref=qr`;
          break;
          
        case 'club':
          // Generate club profile URL
          qrContent = `${baseUrl}/clubs/${qrData.data.club_id}/profile?ref=qr`;
          break;
          
        case 'event':
          // Generate event details URL
          qrContent = `${baseUrl}/events/${qrData.data.event_id}?ref=qr`;
          break;
          
        case 'court_reservation':
          // Generate court reservation details
          const reservationData = {
            court: qrData.data.court_name,
            date: qrData.data.date,
            time: qrData.data.time_slot,
            confirmation: qrData.data.confirmation_code
          };
          qrContent = `${baseUrl}/reservations/confirm?data=${encodeURIComponent(JSON.stringify(reservationData))}`;
          break;
          
        case 'contact':
          // Generate vCard format
          const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${qrData.data.name}
ORG:${qrData.data.organization || ''}
TEL:${qrData.data.phone || ''}
EMAIL:${qrData.data.email || ''}
URL:${qrData.data.website || ''}
NOTE:${qrData.data.note || 'Pickleball Federation Contact'}
END:VCARD`;
          qrContent = vcard;
          break;
          
        case 'url':
        default:
          qrContent = qrData.data.url || JSON.stringify(qrData.data);
          break;
      }
      
      setQrString(qrContent);
      if (onDataChange) {
        onDataChange(qrContent);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('Failed to generate QR code');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadSVG = () => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current.querySelector('svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    canvas.width = size;
    canvas.height = size;
    
    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = `qr-${qrData.type}-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      toast.success('QR code downloaded successfully!');
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleCopyData = async () => {
    try {
      await navigator.clipboard.writeText(qrString);
      toast.success('QR data copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy data');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${qrData.metadata?.title || qrData.type} QR Code`,
          text: qrData.metadata?.description || `QR code for ${qrData.type}`,
          url: qrData.type === 'url' ? qrString : undefined
        });
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    } else {
      // Fallback to copying URL
      await handleCopyData();
    }
  };

  const getTypeIcon = () => {
    switch (qrData.type) {
      case 'credential':
        return '🎫';
      case 'tournament':
        return '🏆';
      case 'club':
        return '🏟️';
      case 'event':
        return '📅';
      case 'court_reservation':
        return '🎾';
      case 'contact':
        return '👤';
      default:
        return '🔗';
    }
  };

  const getSecurityLevel = () => {
    const level = qrData.metadata?.securityLevel || 'medium';
    switch (level) {
      case 'high':
        return { color: 'text-green-600', icon: CheckCircle, label: 'High Security' };
      case 'medium':
        return { color: 'text-yellow-600', icon: AlertTriangle, label: 'Medium Security' };
      default:
        return { color: 'text-gray-600', icon: QrCode, label: 'Standard' };
    }
  };

  const security = getSecurityLevel();
  const SecurityIcon = security.icon;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      {showMetadata && (qrData.metadata?.title || qrData.metadata?.description) && (
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">{getTypeIcon()}</span>
            <h3 className="text-lg font-semibold text-gray-900">
              {qrData.metadata?.title || `${qrData.type.charAt(0).toUpperCase() + qrData.type.slice(1)} QR Code`}
            </h3>
          </div>
          {qrData.metadata?.description && (
            <p className="text-sm text-gray-600">{qrData.metadata.description}</p>
          )}
        </div>
      )}

      {/* QR Code Display */}
      <div className="flex justify-center">
        <div className="relative">
          {isGenerating ? (
            <div 
              className="flex items-center justify-center bg-gray-100 rounded-lg"
              style={{ width: size, height: size }}
            >
              <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div ref={svgRef} className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200">
              <QRCodeSVG
                value={qrString}
                size={size}
                level={level}
                includeMargin={includeMargin}
                bgColor={backgroundColor}
                fgColor={foregroundColor}
              />
            </div>
          )}
          
          {/* Security Badge */}
          <div className="absolute -top-2 -right-2">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-white shadow-md border ${security.color}`}>
              <SecurityIcon className="h-3 w-3" />
              <span>{security.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Display */}
      {showMetadata && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Type:</span>
              <span className="ml-2 capitalize">{qrData.type.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Error Correction:</span>
              <span className="ml-2">{level}</span>
            </div>
            {qrData.metadata?.expiryDate && (
              <div className="col-span-2">
                <span className="font-medium text-gray-700">Expires:</span>
                <span className="ml-2">{new Date(qrData.metadata.expiryDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Raw Data Toggle */}
          <div className="border-t pt-3">
            <button
              onClick={() => setShowRawData(!showRawData)}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
            >
              {showRawData ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showRawData ? 'Hide' : 'Show'} Raw Data</span>
            </button>

            {showRawData && (
              <div className="mt-2 p-3 bg-gray-50 rounded-md">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap break-all">
                  {qrString}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Controls */}
      {showControls && (
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={handleDownloadSVG}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md text-sm font-medium transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>

          <button
            onClick={handleCopyData}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            <Copy className="h-4 w-4" />
            <span>Copy Data</span>
          </button>

          <button
            onClick={handleShare}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>

          <button
            onClick={generateQRString}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;