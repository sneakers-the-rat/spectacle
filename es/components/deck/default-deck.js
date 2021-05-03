function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback, useEffect } from 'react';
import propTypes from 'prop-types';
import Deck from './deck';
import useBroadcastChannel from '../../hooks/use-broadcast-channel';
import useMousetrap from '../../hooks/use-mousetrap';
import { KEYBOARD_SHORTCUTS, SPECTACLE_MODES } from '../../utils/constants';
/**
 * Spectacle DefaultDeck is a wrapper around the Deck component that adds Broadcast channel support
 * for audience and presenter modes. This is intentionally not built into the base Deck component
 * to allow for extensibility outside of core Spectacle functionality.
 */

export default function DefaultDeck(_ref) {
  var _ref2;

  var _ref$overviewMode = _ref.overviewMode,
      overviewMode = _ref$overviewMode === void 0 ? false : _ref$overviewMode,
      _ref$printMode = _ref.printMode,
      printMode = _ref$printMode === void 0 ? false : _ref$printMode,
      _ref$exportMode = _ref.exportMode,
      exportMode = _ref$exportMode === void 0 ? false : _ref$exportMode,
      toggleMode = _ref.toggleMode,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["overviewMode", "printMode", "exportMode", "toggleMode", "children"]);

  var deck = React.useRef();

  var _useBroadcastChannel = useBroadcastChannel('spectacle_presenter_bus', function (message) {
    if (message.type !== 'SYNC') return;
    var nextView = message.payload;

    if (deck.current.initialized) {
      deck.current.skipTo(nextView);
    } else {
      deck.current.initializeTo(nextView);
    }
  }),
      _useBroadcastChannel2 = _slicedToArray(_useBroadcastChannel, 1),
      postMessage = _useBroadcastChannel2[0];

  useEffect(function () {
    postMessage('SYNC_REQUEST');
  }, [postMessage]);
  useMousetrap(overviewMode ? (_ref2 = {}, _defineProperty(_ref2, KEYBOARD_SHORTCUTS.TAB_FORWARD_OVERVIEW_MODE, function () {
    return deck.current.advanceSlide();
  }), _defineProperty(_ref2, KEYBOARD_SHORTCUTS.TAB_BACKWARD_OVERVIEW_MODE, function () {
    return deck.current.regressSlide({
      stepIndex: 0
    });
  }), _defineProperty(_ref2, KEYBOARD_SHORTCUTS.SELECT_SLIDE_OVERVIEW_MODE, function (e) {
    return toggleMode(e, SPECTACLE_MODES.DEFAULT_MODE);
  }), _ref2) : {}, []);
  var onSlideClick = useCallback(function (e, slideIndex) {
    if (overviewMode) {
      toggleMode(e, SPECTACLE_MODES.DEFAULT_MODE, slideIndex);
    }
  }, [overviewMode, toggleMode]);

  var onMobileSlide = function onMobileSlide(e) {
    if (navigator.maxTouchPoints < 1) return;

    switch (e.dir) {
      case 'Left':
        deck.current.stepForward();
        break;

      case 'Right':
        deck.current.regressSlide();
        break;
    }
  };

  return /*#__PURE__*/React.createElement(Deck, _extends({
    overviewMode: overviewMode,
    onSlideClick: onSlideClick,
    onMobileSlide: onMobileSlide,
    printMode: printMode,
    exportMode: exportMode,
    ref: deck
  }, props), children);
}
DefaultDeck.propTypes = _objectSpread(_objectSpread({}, Deck.propTypes), {}, {
  children: propTypes.node.isRequired,
  overviewMode: propTypes.bool,
  toggleMode: propTypes.func,
  printMode: propTypes.bool,
  exportMode: propTypes.bool
});