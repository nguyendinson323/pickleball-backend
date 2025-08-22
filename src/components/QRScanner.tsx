import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeResult } from 'html5-qrcode';
import { Camera, CameraOff, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface QRScannerProps {
  onScan?: (result: string) => void;
  onClose?: () => void;
  isModal?: boolean;
  title?: string;
}

const QRScanner: React.FC<QRScannerProps> = ({ 
  onScan, 
  onClose, 
  isModal = false, 
  title = 'QR Code Scanner' 
}) => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const elementId = 'qr-reader';

  useEffect(() => {
    // Check camera permission
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        setCameraPermission('granted');
        initializeScanner();
      })
      .catch((err) => {
        console.error('Camera permission denied:', err);
        setCameraPermission('denied');
        setError('Camera permission is required to scan QR codes. Please enable camera access and refresh the page.');
      });

    return () => {
      cleanupScanner();
    };
  }, []);

  const initializeScanner = () => {
    if (scannerRef.current) {
      cleanupScanner();
    }

    try {
      const scanner = new Html5QrcodeScanner(
        elementId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        },
        /* verbose= */ false
      );

      scannerRef.current = scanner;

      scanner.render(
        (decodedText: string, result: Html5QrcodeResult) => {
          handleScanSuccess(decodedText, result);
        },
        (errorMessage: string) => {
          // Handle scan error (usually just no QR code in view)
          // Don't log every scan attempt as it's noisy
        }
      );

      setIsScanning(true);
      setError(null);
    } catch (err) {
      console.error('Failed to initialize QR scanner:', err);
      setError('Failed to initialize QR scanner. Please check your camera permissions.');
    }
  };

  const cleanupScanner = () => {
    if (scannerRef.current) {
      try {
        scannerRef.current.clear();
      } catch (err) {
        console.warn('Error cleaning up scanner:', err);
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleScanSuccess = (decodedText: string, result: Html5QrcodeResult) => {
    console.log('QR Code scanned successfully:', decodedText);
    setScanResult(decodedText);
    
    // Stop scanning after successful scan
    cleanupScanner();
    
    // Process the scanned URL
    if (decodedText.includes('/verify-credential/')) {
      // Extract verification code and token from URL
      const url = new URL(decodedText);
      const pathParts = url.pathname.split('/');
      const verificationCode = pathParts[pathParts.indexOf('verify-credential') + 1];
      
      if (verificationCode) {
        toast.success('QR Code scanned successfully!');
        
        if (onScan) {
          onScan(decodedText);
        } else {
          // Navigate to verification page
          navigate(`/verify-credential/${verificationCode}${url.search}`);
        }
      } else {
        toast.error('Invalid credential QR code format');
      }
    } else {
      toast.error('This QR code is not a valid Pickleball Federation credential');
      // Restart scanning for modal mode
      if (isModal) {
        setTimeout(() => {
          setScanResult(null);
          initializeScanner();
        }, 2000);
      }
    }
  };

  const handleRetry = () => {
    setScanResult(null);
    setError(null);
    initializeScanner();
  };

  const renderContent = () => {
    if (cameraPermission === 'denied') {
      return (
        <div className="text-center p-8">
          <CameraOff className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Camera Access Required</h3>
          <p className="text-gray-600 mb-4">
            To scan QR codes, we need access to your camera. Please enable camera permissions 
            in your browser settings and refresh the page.
          </p>
          <div className="text-sm text-gray-500">
            <p><strong>Chrome:</strong> Click the camera icon in the address bar</p>
            <p><strong>Safari:</strong> Go to Safari → Settings → Websites → Camera</p>
            <p><strong>Firefox:</strong> Click the shield icon in the address bar</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Scanner Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (scanResult) {
      return (
        <div className="text-center p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">QR Code Scanned</h3>
          <p className="text-gray-600 mb-4">Successfully scanned credential QR code!</p>
          <div className="text-xs text-gray-500 break-all bg-gray-100 p-2 rounded">
            {scanResult}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Scanner Area */}
        <div className="relative">
          <div id={elementId} className="w-full"></div>
          {isScanning && (
            <div className="text-center mt-4">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Camera className="h-4 w-4" />
                <span>Point your camera at a QR code to scan</span>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Scanning Instructions:</p>
              <ul className="space-y-1">
                <li>• Hold your device steady</li>
                <li>• Ensure good lighting</li>
                <li>• Position the QR code within the frame</li>
                <li>• Keep the QR code flat and clearly visible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {onClose && (
              <button
                onClick={() => {
                  cleanupScanner();
                  onClose();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>
          {renderContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {onClose && (
          <button
            onClick={() => {
              cleanupScanner();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>
      {renderContent()}
    </div>
  );
};

export default QRScanner;