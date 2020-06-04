export const checkIsBrowserNotSupportBlob = () =>
  window.Blob === undefined ||
  window.URL === undefined ||
  window.URL.createObjectURL === undefined;
