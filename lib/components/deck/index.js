"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SpectacleDeck;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _queryString = require("query-string");

var _defaultDeck = _interopRequireDefault(require("./default-deck"));

var _presenterMode = _interopRequireDefault(require("../presenter-mode"));

var _printMode = _interopRequireDefault(require("../print-mode"));

var _useMousetrap2 = _interopRequireDefault(require("../../hooks/use-mousetrap"));

var _constants = require("../../utils/constants");

var _modes = require("./modes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function SpectacleDeck(props) {
  var _useMousetrap;

  var mode = (0, _react.useRef)((0, _modes.modeKeyForSearchParam)((0, _queryString.parse)(location.search, {
    parseBooleans: true
  })));
  var toggleMode = (0, _react.useCallback)(function (e, newMode, senderSlideIndex) {
    e === null || e === void 0 ? void 0 : e.preventDefault();
    var stepIndex = 0;
    var slideIndex = senderSlideIndex;
    var searchParams = (0, _queryString.parse)(location.search, {
      parseBooleans: true
    });

    if (!slideIndex) {
      slideIndex = searchParams.slideIndex;
      stepIndex = searchParams.stepIndex;
    }

    if (mode.current === newMode) {
      location.search = (0, _queryString.stringify)({
        slideIndex: slideIndex,
        stepIndex: stepIndex
      });
      return;
    }

    mode.current = newMode;
    location.search = (0, _queryString.stringify)(_objectSpread({
      slideIndex: slideIndex,
      stepIndex: stepIndex
    }, (0, _modes.modeSearchParamForKey)(newMode)));
  }, [mode]);
  (0, _useMousetrap2.default)((_useMousetrap = {}, _defineProperty(_useMousetrap, _constants.KEYBOARD_SHORTCUTS.PRESENTER_MODE, function (e) {
    return toggleMode(e, _constants.SPECTACLE_MODES.PRESENTER_MODE);
  }), _defineProperty(_useMousetrap, _constants.KEYBOARD_SHORTCUTS.PRINT_MODE, function (e) {
    return toggleMode(e, _constants.SPECTACLE_MODES.PRINT_MODE);
  }), _defineProperty(_useMousetrap, _constants.KEYBOARD_SHORTCUTS.EXPORT_MODE, function (e) {
    return toggleMode(e, _constants.SPECTACLE_MODES.EXPORT_MODE);
  }), _defineProperty(_useMousetrap, _constants.KEYBOARD_SHORTCUTS.OVERVIEW_MODE, function (e) {
    return toggleMode(e, _constants.SPECTACLE_MODES.OVERVIEW_MODE);
  }), _useMousetrap), []);

  switch (mode.current) {
    case _constants.SPECTACLE_MODES.DEFAULT_MODE:
      return /*#__PURE__*/_react.default.createElement(_defaultDeck.default, props);

    case _constants.SPECTACLE_MODES.PRESENTER_MODE:
      return /*#__PURE__*/_react.default.createElement(_presenterMode.default, props);

    /**
     * Print mode and export mode are identical except for the theme
     * that is used. Print mode uses the print theme which is usually
     * monotone and export mode uses the default theme.
     */

    case _constants.SPECTACLE_MODES.PRINT_MODE:
      return /*#__PURE__*/_react.default.createElement(_printMode.default, _extends({}, props, {
        printMode: true
      }));

    case _constants.SPECTACLE_MODES.EXPORT_MODE:
      return /*#__PURE__*/_react.default.createElement(_printMode.default, _extends({}, props, {
        exportMode: true
      }));

    case _constants.SPECTACLE_MODES.OVERVIEW_MODE:
      return /*#__PURE__*/_react.default.createElement(_defaultDeck.default, _extends({
        overviewMode: true,
        toggleMode: toggleMode
      }, props));

    default:
      return null;
  }
}

SpectacleDeck.propTypes = {
  children: _propTypes.default.node.isRequired,
  theme: _propTypes.default.object
};