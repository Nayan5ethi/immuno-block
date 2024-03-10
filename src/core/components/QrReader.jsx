// file = QrReader.jsx
import PropTypes from "prop-types";
import { Html5QrcodeScanType, Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

const createConfig = () => {

  const config = {
    fps: 10,
    qrbox: { width: 400, height: 400 },
    aspectRatio: 1.0,
    disableFlip: false,
    videoConstraints: {
      facingMode: "environment",
    },
    rememberLastUsedCamera: false,
    supportedScanTypes: [
      Html5QrcodeScanType.SCAN_TYPE_FILE,
      Html5QrcodeScanType.SCAN_TYPE_CAMERA]
  };

  return config;
};

const QrReader = (props) => {

  useEffect(() => {

    const config = createConfig();
    const verbose = false;

    if (!(props.qrCodeSuccessCallback)) {
      throw new Error("qrCodeSuccessCallback is required.");
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
    html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

    return () => {
      html5QrcodeScanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return (
    <div id={qrcodeRegionId} />
  );
};

QrReader.propTypes = {
  qrCodeSuccessCallback: PropTypes.func.isRequired,
  qrCodeErrorCallback: PropTypes.func
};
export default QrReader;