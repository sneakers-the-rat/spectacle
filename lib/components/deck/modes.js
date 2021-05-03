"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modeSearchParamForKey = modeSearchParamForKey;
exports.modeKeyForSearchParam = modeKeyForSearchParam;

var _constants = require("../../utils/constants");

function modeSearchParamForKey(key) {
  if (key === _constants.SPECTACLE_MODES.PRESENTER_MODE) {
    return {
      presenterMode: true
    };
  } else if (key === _constants.SPECTACLE_MODES.OVERVIEW_MODE) {
    return {
      overviewMode: true
    };
  } else if (key === _constants.SPECTACLE_MODES.PRINT_MODE) {
    return {
      printMode: true
    };
  } else if (key === _constants.SPECTACLE_MODES.EXPORT_MODE) {
    return {
      exportMode: true
    };
  }

  return {};
}

function modeKeyForSearchParam(_ref) {
  var presenterMode = _ref.presenterMode,
      overviewMode = _ref.overviewMode,
      printMode = _ref.printMode,
      exportMode = _ref.exportMode;

  if (presenterMode) {
    return _constants.SPECTACLE_MODES.PRESENTER_MODE;
  } else if (overviewMode) {
    return _constants.SPECTACLE_MODES.OVERVIEW_MODE;
  } else if (printMode) {
    return _constants.SPECTACLE_MODES.PRINT_MODE;
  } else if (exportMode) {
    return _constants.SPECTACLE_MODES.EXPORT_MODE;
  }

  return _constants.SPECTACLE_MODES.DEFAULT_MODE;
}