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
import { merge } from 'merge-anything';
import useActionDispatcher from '../hooks/use-action-dispatcher';
export var GOTO_FINAL_STEP = null;
var initialDeckState = {
  initialized: false,
  pendingView: {
    slideIndex: undefined,
    stepIndex: undefined
  },
  activeView: {
    slideIndex: undefined,
    stepIndex: undefined
  }
};

function deckReducer(state, _ref) {
  var _payload$stepIndex;

  var type = _ref.type,
      _ref$payload = _ref.payload,
      payload = _ref$payload === void 0 ? {} : _ref$payload;

  switch (type) {
    case 'INITIALIZE_TO':
      return {
        activeView: merge(state.activeView, payload),
        pendingView: merge(state.pendingView, payload),
        initialized: true
      };

    case 'SKIP_TO':
      return _objectSpread(_objectSpread({}, state), {}, {
        pendingView: merge(state.pendingView, payload)
      });

    case 'STEP_FORWARD':
      return _objectSpread(_objectSpread({}, state), {}, {
        pendingView: merge(state.pendingView, {
          stepIndex: state.pendingView.stepIndex + 1
        })
      });

    case 'STEP_BACKWARD':
      return _objectSpread(_objectSpread({}, state), {}, {
        pendingView: merge(state.pendingView, {
          stepIndex: state.pendingView.stepIndex - 1
        })
      });

    case 'ADVANCE_SLIDE':
      return _objectSpread(_objectSpread({}, state), {}, {
        pendingView: merge(state.pendingView, {
          stepIndex: 0,
          slideIndex: state.pendingView.slideIndex + 1
        })
      });

    case 'REGRESS_SLIDE':
      return _objectSpread(_objectSpread({}, state), {}, {
        pendingView: merge(state.pendingView, {
          stepIndex: (_payload$stepIndex = payload === null || payload === void 0 ? void 0 : payload.stepIndex) !== null && _payload$stepIndex !== void 0 ? _payload$stepIndex : GOTO_FINAL_STEP,
          slideIndex: state.pendingView.slideIndex - 1
        })
      });

    case 'COMMIT_TRANSITION':
      var pendingView = merge(state.pendingView, payload);
      return _objectSpread(_objectSpread({}, state), {}, {
        pendingView: pendingView,
        activeView: merge(state.activeView, pendingView)
      });

    case 'CANCEL_TRANSITION':
      return _objectSpread(_objectSpread({}, state), {}, {
        pendingView: merge(state.pendingView, state.activeView)
      });

    default:
      return state;
  }
}

export default function useDeckReducer(userProvidedInitialState) {
  var _React$useReducer = React.useReducer(deckReducer, initialDeckState),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      _React$useReducer2$ = _React$useReducer2[0],
      initialized = _React$useReducer2$.initialized,
      pendingView = _React$useReducer2$.pendingView,
      activeView = _React$useReducer2$.activeView,
      dispatch = _React$useReducer2[1];

  var initializeTo = useActionDispatcher(dispatch, 'INITIALIZE_TO');
  var skipTo = useActionDispatcher(dispatch, 'SKIP_TO');
  var stepForward = useActionDispatcher(dispatch, 'STEP_FORWARD');
  var stepBackward = useActionDispatcher(dispatch, 'STEP_BACKWARD');
  var advanceSlide = useActionDispatcher(dispatch, 'ADVANCE_SLIDE');
  var regressSlide = useActionDispatcher(dispatch, 'REGRESS_SLIDE');
  var commitTransition = useActionDispatcher(dispatch, 'COMMIT_TRANSITION');
  var cancelTransition = useActionDispatcher(dispatch, 'CANCEL_TRANSITION');
  React.useEffect(function () {
    if (initialized) return;
    if (userProvidedInitialState === undefined) return;
    initializeTo(userProvidedInitialState);
  }, [initialized, initializeTo, userProvidedInitialState]);
  return {
    initialized: initialized,
    pendingView: pendingView,
    activeView: activeView,
    initializeTo: initializeTo,
    skipTo: skipTo,
    stepForward: stepForward,
    stepBackward: stepBackward,
    advanceSlide: advanceSlide,
    regressSlide: regressSlide,
    commitTransition: commitTransition,
    cancelTransition: cancelTransition
  };
}