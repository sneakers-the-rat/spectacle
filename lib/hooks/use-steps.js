"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSteps = useSteps;
exports.useCollectSteps = useCollectSteps;

var React = _interopRequireWildcard(require("react"));

var _ulid = require("ulid");

var _reactSpring = require("react-spring");

var _slide = require("../components/slide/slide");

var _sortBy = _interopRequireDefault(require("../utils/sort-by"));

var _clamp = _interopRequireDefault(require("../utils/clamp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PLACEHOLDER_CLASS_NAME = 'step-placeholder';
/*
 * This hook is used to create components which can 'participate' in a presentation.
 * When a component uses this hook, it passes numSteps, which "reserves" that many steps within the slide progression.
 * Returns the stepId, whether or not the step is active, the relative step
 * number and the DOM placeholder.
 */

function useSteps() {
  var numSteps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      userProvidedId = _ref.id,
      stepIndex = _ref.stepIndex;

  var _React$useState = React.useState(userProvidedId || _ulid.ulid),
      _React$useState2 = _slicedToArray(_React$useState, 1),
      stepId = _React$useState2[0];

  var _React$useContext = React.useContext(_slide.SlideContext),
      activeStepIndex = _React$useContext.activeStepIndex,
      activationThresholds = _React$useContext.activationThresholds;

  var relStep;

  if (activationThresholds === null) {
    // We won't have a set of activation thresholds during the very first render
    // pass for a <Slide> element, so we make sure the stepper isn't activated
    // at all.
    relStep = 0;
  } else {
    // Otherwise, we just need to convert the 'absolute step' to a 'relative
    // step' to provide to the hook consumer.
    var threshold = activationThresholds[stepId];
    relStep = activeStepIndex - threshold;
    relStep = (0, _clamp.default)(relStep, -1, numSteps - 1);
  }

  var isActive = relStep >= 0; // Animated steppers are visible for a short period of time as they're
  // disappearing, which could cause a "flash of incorrect step". To avoid this,
  // we clamp to the "first visible step" if we're exiting.
  // const visibleStep = (isActive ? relStep : 1);
  // Helpful hints for the developer.

  var placeholderRef = React.useRef();
  React.useEffect(function () {
    if (!placeholderRef.current) {
      console.warn("A placeholder ref does not appear to be present in the DOM for stepper element with id '".concat(stepId, "'. (Did you forget to render it?)"));
    }
  });
  var placeholderProps = {
    ref: placeholderRef,
    className: PLACEHOLDER_CLASS_NAME,
    style: {
      display: 'none'
    },
    'data-step-id': stepId,
    'data-step-count': numSteps
  };

  if (stepIndex !== undefined) {
    placeholderProps['data-step-index'] = stepIndex;
  }

  return {
    stepId: stepId,
    isActive: isActive,
    step: relStep,
    placeholder: /*#__PURE__*/React.createElement("div", placeholderProps)
  };
} // Similar to <Deck>, this is where we go looking for "step placeholder"
// elements. The main difference here is that slide placeholders are 1:1 with
// slides, whereas step placeholders may represent multiple steps. So, the
// keys of 'activationThresholds' represent the IDs of stepper elements, and
// the values represent the _first step at which they should appear_.


function useCollectSteps() {
  var _React$useState3 = React.useState(),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      stepContainer = _React$useState4[0],
      setStepContainer = _React$useState4[1];

  var _React$useState5 = React.useState({}),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      activationThresholds = _React$useState6[0],
      setActivationThresholds = _React$useState6[1];

  var _React$useState7 = React.useState(),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      finalStepIndex = _React$useState8[0],
      setFinalStepIndex = _React$useState8[1];

  React.useEffect(function () {
    if (!stepContainer) return;
    var placeholderNodes = stepContainer.getElementsByClassName(PLACEHOLDER_CLASS_NAME);

    var _map$concat$sort$redu = _toConsumableArray(placeholderNodes).map(function (node, index) {
      var _node$dataset = node.dataset,
          stepId = _node$dataset.stepId,
          stepCount = _node$dataset.stepCount,
          stepIndex = _node$dataset.stepIndex;
      stepCount = Number(stepCount);

      if (isNaN(stepCount)) {
        stepCount = 1;
      }

      stepIndex = Number(stepIndex);

      if (isNaN(stepIndex)) {
        stepIndex = index;
      }

      return {
        id: stepId,
        count: stepCount,
        index: stepIndex
      };
    }).concat().sort((0, _sortBy.default)('index')).reduce(function (memo, el) {
      var _memo = _slicedToArray(memo, 2),
          thresholds = _memo[0],
          nextThreshold = _memo[1];

      var id = el.id,
          count = el.count,
          index = el.index;
      thresholds[id] = nextThreshold;
      return [thresholds, nextThreshold + count];
    }, [{}, 1]),
        _map$concat$sort$redu2 = _slicedToArray(_map$concat$sort$redu, 2),
        thresholds = _map$concat$sort$redu2[0],
        numSteps = _map$concat$sort$redu2[1];

    setActivationThresholds(thresholds);
    setFinalStepIndex(numSteps - 1);
  }, [stepContainer]);
  return {
    setStepContainer: setStepContainer,
    activationThresholds: activationThresholds,
    finalStepIndex: finalStepIndex
  };
}