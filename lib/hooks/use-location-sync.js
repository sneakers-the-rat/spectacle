"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useLocationSync;

var React = _interopRequireWildcard(require("react"));

var _history = require("history");

var _queryString = _interopRequireDefault(require("query-string"));

var _reactFastCompare = _interopRequireDefault(require("react-fast-compare"));

var _mergeAnything = require("merge-anything");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Needed to properly merge query strings. (Hook consumers can also provide
// their own merge function if necessary)
function defaultMergeLocation(object) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  return _mergeAnything.mergeAndCompare.apply(void 0, [function (left, right, key) {
    switch (key) {
      case 'search':
        if (!left) return right;
        return '?' + _queryString.default.stringify(_objectSpread(_objectSpread({}, _queryString.default.parse(left)), _queryString.default.parse(right)));

      default:
        return (0, _mergeAnything.merge)(left, right);
    }
  }, object].concat(sources));
} // Hook to keep some external state synchronized with the history location.


function useLocationSync(_ref) {
  var disableInteractivity = _ref.disableInteractivity,
      setState = _ref.setState,
      mapStateToLocation = _ref.mapStateToLocation,
      mapLocationToState = _ref.mapLocationToState,
      _ref$mergeLocation = _ref.mergeLocation,
      mergeLocation = _ref$mergeLocation === void 0 ? defaultMergeLocation : _ref$mergeLocation,
      _ref$historyFactory = _ref.historyFactory,
      historyFactory = _ref$historyFactory === void 0 ? _history.createBrowserHistory : _ref$historyFactory;

  var _React$useState = React.useState(function () {
    return historyFactory();
  }),
      _React$useState2 = _slicedToArray(_React$useState, 1),
      history = _React$useState2[0];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      initialized = _React$useState4[0],
      setInitialized = _React$useState4[1]; // "down-sync" from location to state


  React.useEffect(function () {
    if (!initialized && disableInteractivity) return;
    return history.listen(function (location, action) {
      setState(mapLocationToState(location));
    });
  }, [disableInteractivity, initialized, history, setState, mapLocationToState]);
  var syncLocation = React.useCallback(function (defaultState) {
    if (disableInteractivity) {
      return;
    } // perform initial two-way sync between location and state (state wins)


    var location = history.location;
    var initialState = (0, _mergeAnything.merge)(defaultState || {}, mapLocationToState(location));
    var nextLocation = mergeLocation({}, location, mapStateToLocation(initialState));
    history.replace(nextLocation);
    setInitialized(true);
    return initialState;
  }, [history, mapLocationToState, mapStateToLocation, disableInteractivity, mergeLocation]);
  var setLocation = React.useCallback(function (state) {
    if (!initialized) return; // perform one-way sync to history

    var location = history.location;
    var nextLocation = mergeLocation({}, location, mapStateToLocation(state));

    if (!(0, _reactFastCompare.default)(location, nextLocation)) {
      history.push(nextLocation);
    }
  }, [history, initialized, mergeLocation, mapStateToLocation]);
  return [syncLocation, setLocation];
}