import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

import { QrCode, Camera, Loader2, X } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import { scanById } from "../../../services/operations/gatepassAPI";

const QRCodeScanner = ({ onScanSuccess }) => {
  const [scanning, setScanning] = useState(false);
  const [sucessMessage,setSuccessMesssage]=useState(null);
  const [manualInput, setManualInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const qrCodeRegionId = "qr-reader";
  const html5QrCodeRef = useRef(null);

 useEffect(() => {
  if (scanning) {
    const timeout = setTimeout(() => {
      startScanner();
    }, 100); // short delay ensures DOM is ready
    return () => clearTimeout(timeout);
  } else {
    stopScanner();
  }
}, [scanning]);


  const startScanner = () => {
    const config = { fps: 10, qrbox: 250 };

    html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);

    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length) {
        const cameraId = devices[0].id;

        html5QrCodeRef.current.start(
          cameraId,
          config,
          (decodedText) => {
            stopScanner();
            onScanSuccess(decodedText);
          },
          (errorMessage) => {
            console.log("Scan error", errorMessage);
          }
        );
      } else {
        setError("No cameras found.");
      }
    }).catch(err => setError(err.message));
  };

  const stopScanner = () => {
    if (html5QrCodeRef.current?.isScanning) {
      html5QrCodeRef.current.stop().then(() => {
        html5QrCodeRef.current.clear();
      }).catch(err => console.error("Stop failed", err));
    }
    setScanning(false);
  };

  const handleManualSubmit = async(e) => {
    e.preventDefault();
    if (!manualInput) return;

    setLoading(true);
    const response = await scanById(manualInput,localStorage.getItem('token'));
    console.log("sgvjdfgvndbg",response)

    if(!response.success){
      setLoading(false)
      setError(response.message)
      return;
    }

    setLoading(false);
    setSuccessMesssage(response.message);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-64 h-64 border-4 rounded-lg mb-4">
            {scanning ? (
              <>
                <div id={qrCodeRegionId} className="w-full h-full" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 z-10"
                  onClick={stopScanner}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <QrCode className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>

          <Button
            onClick={() => setScanning(true)}
            disabled={scanning}
            className="w-full"
          >
            <Camera className="mr-2 h-4 w-4" />
            {scanning ? "Scanning..." : "Scan QR Code"}
          </Button>

          <div className="text-sm text-center text-gray-500 my-4">
            or enter pass ID manually
          </div>

          <form onSubmit={handleManualSubmit} className="w-full space-y-2">
            <Input
              placeholder="Enter pass ID (e.g., REQ001)"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-blue-600"
              disabled={!manualInput || loading}
              >
              {sucessMessage && <p className="text-green-500 text-sm fixed top-0 z-50">{sucessMessage}</p>}
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Pass
            </Button>
          </form>


          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeScanner;
