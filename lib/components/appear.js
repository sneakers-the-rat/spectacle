"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Appear;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSpring = require("react-spring");

var _useSteps2 = require("../hooks/use-steps");

var _slide = require("./slide/slide");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Appear(_ref) {
  var id = _ref.id,
      className = _ref.className,
      childrenOrRenderFunction = _ref.children,
      _ref$tagName = _ref.tagName,
      tagName = _ref$tagName === void 0 ? 'div' : _ref$tagName,
      stepIndex = _ref.stepIndex,
      _ref$activeStyle = _ref.activeStyle,
      activeStyle = _ref$activeStyle === void 0 ? {
    opacity: '1'
  } : _ref$activeStyle,
      _ref$inactiveStyle = _ref.inactiveStyle,
      inactiveStyle = _ref$inactiveStyle === void 0 ? {
    opacity: '0'
  } : _ref$inactiveStyle;

  var _React$useContext = React.useContext(_slide.SlideContext),
      immediate = _React$useContext.immediate;

  var _useSteps = (0, _useSteps2.useSteps)(1, {
    id: id,
    stepIndex: stepIndex
  }),
      isActive = _useSteps.isActive,
      placeholder = _useSteps.placeholder;

  var AnimatedEl = _reactSpring.animated[tagName];
  var children;

  if (typeof childrenOrRenderFunction === 'function') {
    children = childrenOrRenderFunction(step, isActive);
  } else {
    children = childrenOrRenderFunction;
  }

  var springStyle = (0, _reactSpring.useSpring)({
    to: isActive ? activeStyle : inactiveStyle,
    immediate: immediate
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, placeholder, /*#__PURE__*/React.createElement(AnimatedEl, {
    style: springStyle,
    className: className
  }, children));
}

Appear.propTypes = {
  id: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  className: _propTypes.default.string,
  children: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.node]),
  tagName: _propTypes.default.string,
  stepIndex: _propTypes.default.number,
  numSteps: _propTypes.default.number,
  activeStyle: _propTypes.default.object,
  inactiveStyle: _propTypes.default.object
};