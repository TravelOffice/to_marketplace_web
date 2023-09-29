// eslint-disable-next-line import/prefer-default-export
export const getDeviceInfo = () => {
  const { userAgent } = navigator;

  // Regular expressions for extracting the OS and browser
  const osRegex = /\((.*?)\)/;
  const browserRegex = /Chrome\/([\d.]+)|Safari\/([\d.]+)/;

  // Extract OS and browser information
  const osMatch = osRegex.exec(userAgent);
  const browserMatch = browserRegex.exec(userAgent);

  // Initialize variables to store the extracted information
  let osInfo = '';
  let browserInfo = '';

  if (osMatch && osMatch[1]) {
    osInfo = `${osMatch[1]}`;
  }

  if (browserMatch) {
    if (browserMatch[1]) {
      browserInfo = `Chrome ${browserMatch[1]}`;
    } else if (browserMatch[2]) {
      browserInfo = `Safari ${browserMatch[2]}`;
    }
  }

  return {
    os: osInfo,
    browser: browserInfo,
  };
};
