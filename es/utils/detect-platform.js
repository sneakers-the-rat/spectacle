export var isWindows = function isWindows() {
  return navigator.platform.toLowerCase().includes('win32');
};
export var isMacOS = function isMacOS() {
  return navigator.platform.toLowerCase().includes('macintel');
};
export var isLinux = function isLinux() {
  return navigator.platform.toLowerCase().includes('linux');
};