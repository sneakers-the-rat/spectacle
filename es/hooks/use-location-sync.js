function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { createBrowserHistory } from 'history';
import QS from 'query-string';
import isEqual from 'react-fast-compare';
import { mergeAndCompare, merge } from 'merge-anything'; // Needed to properly merge query strings. (Hook consumers can also provide
// their own merge function if necessary)

function defaultMergeLocation(object) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  return mergeAndCompare.apply(void 0, [function (left, right, key) {
    switch (key) {
      case 'search':
        if (!left) return right;
        return '?' + QS.stringify(_objectSpread(_objectSpread({}, QS.parse(left)), QS.parse(right)));

      default:
        return merge(left, right);
    }
  }, object].concat(sources));
} // Hook to keep some external state synchronized with the history location.


export default function useLocationSync(_ref) {
  var disableInteractivity = _ref.disableInteractivity,
      setState = _ref.setState,
      mapStateToLocation = _ref.mapStateToLocation,
      mapLocationToState = _ref.mapLocationToState,
      _ref$mergeLocation = _ref.mergeLocation,
      mergeLocation = _ref$mergeLocation === void 0 ? defaultMergeLocation : _ref$mergeLocation,
      _ref$historyFactory = _ref.historyFactory,
      historyFactory = _ref$historyFactory === void 0 ? createBrowserHistory : _ref$historyFactory;

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
    var initialState = merge(defaultState || {}, mapLocationToState(location));
    var nextLocation = mergeLocation({}, location, mapStateToLocation(initialState));
    history.replace(nextLocation);
    setInitialized(true);
    return initialState;
  }, [history, mapLocationToState, mapStateToLocation, disableInteractivity, mergeLocation]);
  var setLocation = React.useCallback(function (state) {
    if (!initialized) return; // perform one-way sync to history

    var location = history.location;
    var nextLocation = mergeLocation({}, location, mapStateToLocation(state));

    if (!isEqual(location, nextLocation)) {
      history.push(nextLocation);
    }
  }, [history, initialized, mergeLocation, mapStateToLocation]);
  return [syncLocation, setLocation];
}