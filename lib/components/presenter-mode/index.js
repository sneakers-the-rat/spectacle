"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PresenterMode;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _deck = _interopRequireDefault(require("../deck/deck"));

var _index = require("../../index");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _components = require("./components");

var _useLocationSync3 = _interopRequireDefault(require("../../hooks/use-location-sync"));

var queryStringMapFns = _interopRequireWildcard(require("../../location-map-fns/query-string"));

var _useDeckState = require("../../hooks/use-deck-state");

var _constants = require("../../utils/constants");

var _layout = require("../layout");

var _timer = require("./timer");

var _useBroadcastChannel3 = _interopRequireDefault(require("../../hooks/use-broadcast-channel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var endOfNextSlide = function endOfNextSlide(_ref) {
  var slideIndex = _ref.slideIndex;
  return {
    slideIndex: slideIndex + 1,
    stepIndex: _useDeckState.GOTO_FINAL_STEP
  };
};

var PreviewSlideWrapper = _styledComponents.default.div(function (_ref2) {
  var visible = _ref2.visible;
  return {
    visibility: visible ? 'visible' : 'hidden'
  };
});

function PresenterMode(props) {
  var children = props.children,
      theme = props.theme;
  var deck = (0, _react.useRef)();
  var previewDeck = (0, _react.useRef)();

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      notePortalNode = _useState2[0],
      setNotePortalNode = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      showFinalSlide = _useState4[0],
      setShowFinalSlide = _useState4[1];

  var _useBroadcastChannel = (0, _useBroadcastChannel3.default)('spectacle_presenter_bus', function (message) {
    if (message.type === 'SYNC_REQUEST') {
      postMessage('SYNC', deck.current.activeView);
    }
  }),
      _useBroadcastChannel2 = _slicedToArray(_useBroadcastChannel, 1),
      postMessage = _useBroadcastChannel2[0];

  var _useLocationSync = (0, _useLocationSync3.default)(_objectSpread({
    setState: function setState(state) {
      return deck.current.skipTo(state);
    }
  }, queryStringMapFns)),
      _useLocationSync2 = _slicedToArray(_useLocationSync, 2),
      syncLocation = _useLocationSync2[0],
      setLocation = _useLocationSync2[1];

  var onActiveStateChange = (0, _react.useCallback)(function (activeView) {
    var _deck$current, _deck$current2;

    setLocation(activeView);
    postMessage('SYNC', activeView);
    setShowFinalSlide(((_deck$current = deck.current) === null || _deck$current === void 0 ? void 0 : _deck$current.numberOfSlides) - 1 !== (deck === null || deck === void 0 ? void 0 : (_deck$current2 = deck.current) === null || _deck$current2 === void 0 ? void 0 : _deck$current2.activeView.slideIndex));
    previewDeck.current.skipTo(endOfNextSlide(activeView));
  }, [postMessage, setLocation]);
  (0, _react.useEffect)(function () {
    var initialView = syncLocation({
      slideIndex: 0,
      stepIndex: 0
    });
    deck.current.initializeTo(initialView);
    postMessage('SYNC', initialView);
    previewDeck.current.initializeTo(endOfNextSlide(initialView));
  }, [postMessage, syncLocation]);
  return /*#__PURE__*/_react.default.createElement(_components.PresenterDeckContainer, null, /*#__PURE__*/_react.default.createElement(_components.NotesColumn, null, /*#__PURE__*/_react.default.createElement(_layout.FlexBox, {
    justifyContent: "space-between",
    paddingTop: 15,
    paddingX: 15
  }, /*#__PURE__*/_react.default.createElement(_index.SpectacleLogo, {
    size: 60
  }), /*#__PURE__*/_react.default.createElement(_layout.FlexBox, {
    width: 0.75,
    flexDirection: "column",
    alignItems: "flex-end"
  }, /*#__PURE__*/_react.default.createElement(_index.Text, {
    "data-testid": "use-browser-tab-text",
    fontSize: 15,
    fontFamily: _constants.SYSTEM_FONT,
    textAlign: "right",
    padding: "0px",
    margin: "0px 0px 10px"
  }, "Open a second browser tab at ", window.location.host, " to use as the audience deck."))), /*#__PURE__*/_react.default.createElement(_layout.Box, {
    paddingX: 15,
    paddingY: 10
  }, /*#__PURE__*/_react.default.createElement(_timer.Timer, null)), /*#__PURE__*/_react.default.createElement(_components.NotesContainer, null, /*#__PURE__*/_react.default.createElement(_index.Text, {
    ref: setNotePortalNode,
    fontFamily: _constants.SYSTEM_FONT,
    lineHeight: "1.5em",
    fontSize: "1.5vw",
    padding: 15
  }))), /*#__PURE__*/_react.default.createElement(_components.PreviewColumn, null, /*#__PURE__*/_react.default.createElement(_deck.default, {
    notePortalNode: notePortalNode,
    backdropStyle: _components.deckBackdropStyles.currentSlide,
    onActiveStateChange: onActiveStateChange,
    ref: deck,
    theme: theme
  }, children), /*#__PURE__*/_react.default.createElement(PreviewSlideWrapper, {
    visible: showFinalSlide
  }, /*#__PURE__*/_react.default.createElement(_deck.default, {
    disableInteractivity: true,
    useAnimations: false,
    backdropStyle: _components.deckBackdropStyles.nextSlide,
    ref: previewDeck,
    theme: theme
  }, children))));
}

PresenterMode.propTypes = {
  theme: _propTypes.default.object,
  children: _propTypes.default.node.isRequired
};