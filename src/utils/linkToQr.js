import QRCode from 'qrcode';

/**
 * Converts a URL/link to a QR code image
 * @param {string} link - The URL or link to encode in the QR code
 * @param {object} options - Optional QR code configuration
 * @returns {Promise<string>} A data URL of the QR code image
 */
export const linkToQr = async (link, options = {}) => {
  const defaultOptions = {
    errorCorrectionLevel: 'M',
    type: 'image/png',
    quality: 0.92,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
    width: 256,
    ...options,
  };

  try {
    const dataUrl = await QRCode.toDataURL(link, defaultOptions);
    return dataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

/**
 * Generates a QR code and returns it as a buffer (for file saving)
 * @param {string} link - The URL or link to encode in the QR code
 * @param {object} options - Optional QR code configuration
 * @returns {Promise<Buffer>} A buffer containing the QR code image
 */
export const linkToQrBuffer = async (link, options = {}) => {
  const defaultOptions = {
    errorCorrectionLevel: 'M',
    type: 'png',
    margin: 1,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
    width: 256,
    ...options,
  };

  try {
    const buffer = await QRCode.toBuffer(link, defaultOptions);
    return buffer;
  } catch (error) {
    console.error('Error generating QR code buffer:', error);
    throw error;
  }
};

export default linkToQr;

