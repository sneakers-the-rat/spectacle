function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      outline: 2px solid white;\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  background: transparent;\n\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-start;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  overflow: hidden;\n  display: flex;\n  z-index: 0;\n\n  &:before {\n    ", ";\n    content: ' ';\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: -1;\n    opacity: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { createContext, useContext, useCallback, useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { css, ThemeContext } from 'styled-components';
import { background, color, space } from 'styled-system';
import { DeckContext } from '../deck/deck';
import { useSpring, animated } from 'react-spring';
import { useSlide } from '../../hooks/use-slides';
import { useCollectSteps } from '../../hooks/use-steps';
import { GOTO_FINAL_STEP } from '../../hooks/use-deck-state';
import { useSwipeable } from 'react-swipeable';

var noop = function noop() {};

export var SlideContext = /*#__PURE__*/createContext(null);
var STAGE_RIGHT = 'translateX(-100%)';
var CENTER_STAGE = 'translateX(0%)';
var STAGE_LEFT = 'translateX(100%)';
var SlideContainer = styled('div')(_templateObject(), color, background, function (_ref) {
  var backgroundOpacity = _ref.backgroundOpacity;
  return backgroundOpacity;
});
var SlideWrapper = styled('div')(color, space, css(_templateObject2()));
var TemplateWrapper = styled('div')(_templateObject3());
export var AnimatedDiv = styled(animated.div)(_templateObject4(), function (_ref2) {
  var tabIndex = _ref2.tabIndex;
  return tabIndex === 0 && css(_templateObject5());
});
export default function Slide(_ref3) {
  var userProvidedId = _ref3.id,
      children = _ref3.children,
      backgroundColor = _ref3.backgroundColor,
      backgroundImage = _ref3.backgroundImage,
      backgroundOpacity = _ref3.backgroundOpacity,
      backgroundPosition = _ref3.backgroundPosition,
      backgroundRepeat = _ref3.backgroundRepeat,
      backgroundSize = _ref3.backgroundSize,
      padding = _ref3.padding,
      textColor = _ref3.textColor,
      template = _ref3.template,
      _ref3$className = _ref3.className,
      className = _ref3$className === void 0 ? '' : _ref3$className;

  if (useContext(SlideContext)) {
    throw new Error("Slide components may not be nested within each other.");
  }

  var _useSlide = useSlide(userProvidedId),
      slideId = _useSlide.slideId,
      placeholder = _useSlide.placeholder;

  var _useCollectSteps = useCollectSteps(slideId),
      setStepContainer = _useCollectSteps.setStepContainer,
      activationThresholds = _useCollectSteps.activationThresholds,
      finalStepIndex = _useCollectSteps.finalStepIndex;

  var _useContext = useContext(DeckContext),
      _useContext$onSlideCl = _useContext.onSlideClick,
      onSlideClick = _useContext$onSlideCl === void 0 ? noop : _useContext$onSlideCl,
      onMobileSlide = _useContext.onMobileSlide,
      useAnimations = _useContext.useAnimations,
      slidePortalNode = _useContext.slidePortalNode,
      _useContext$frameOver = _useContext.frameOverrideStyle,
      frameOverrideStyle = _useContext$frameOver === void 0 ? {} : _useContext$frameOver,
      _useContext$wrapperOv = _useContext.wrapperOverrideStyle,
      wrapperOverrideStyle = _useContext$wrapperOv === void 0 ? {} : _useContext$wrapperOv,
      deckInitialized = _useContext.initialized,
      passedSlideIds = _useContext.passedSlideIds,
      upcomingSlideIds = _useContext.upcomingSlideIds,
      activeView = _useContext.activeView,
      pendingView = _useContext.pendingView,
      advanceSlide = _useContext.advanceSlide,
      regressSlide = _useContext.regressSlide,
      commitTransition = _useContext.commitTransition,
      cancelTransition = _useContext.cancelTransition,
      deckTemplate = _useContext.template,
      slideCount = _useContext.slideCount;

  var handleClick = useCallback(function (e) {
    onSlideClick(e, slideId);
  }, [onSlideClick, slideId]);
  var inOverviewMode = Object.entries(frameOverrideStyle).length > 0;
  var isActive = activeView.slideId === slideId;
  var isPending = pendingView.slideId === slideId;
  var isPassed = passedSlideIds.has(slideId);
  var isUpcoming = upcomingSlideIds.has(slideId);
  var willEnter = !isActive && isPending;
  var willExit = isActive && !isPending;
  var slideWillChange = activeView.slideIndex !== pendingView.slideIndex;
  var stepWillChange = activeView.stepIndex !== pendingView.stepIndex;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      animate = _useState2[0],
      setAnimate = _useState2[1]; // If we've already been to this slide, all its elements should be visible; if
  // we haven't gotten to it yet, none of them should be visible. (This helps us
  // handle slides which are exiting but which are still visible while
  // animated.)


  var infinityDirection = isPassed ? Infinity : -Infinity;
  var internalStepIndex = isActive ? activeView.stepIndex : infinityDirection;

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hover = _useState4[0],
      setHover = _useState4[1];

  var onHoverChange = useCallback(function () {
    setHover(!hover);
  }, [hover]);
  React.useEffect(function () {
    if (!isActive) return;
    if (!stepWillChange) return;
    if (slideWillChange) return;

    if (pendingView.stepIndex < 0) {
      setAnimate(false);
      regressSlide();
    } else if (pendingView.stepIndex > finalStepIndex) {
      setAnimate(true);
      advanceSlide();
    } else if (pendingView.stepIndex === GOTO_FINAL_STEP) {
      setAnimate(false);
      commitTransition({
        stepIndex: finalStepIndex
      });
    } else {
      var isSingleForwardStep = activeView.stepIndex === pendingView.stepIndex - 1; // the step is happening within this slide

      setAnimate(isSingleForwardStep);
      commitTransition();
    }
  }, [isActive, stepWillChange, slideWillChange, activeView, pendingView, finalStepIndex, regressSlide, advanceSlide, commitTransition]); // Bounds checking for slides in the presentation.

  useEffect(function () {
    if (!willExit) return;

    if (pendingView.slideId === undefined) {
      setAnimate(false);
      cancelTransition();
    } else {
      var isTransitionToNextSlide = activeView.slideIndex === pendingView.slideIndex - 1;
      setAnimate(isTransitionToNextSlide);
    }
  }, [willExit, pendingView, cancelTransition, activeView.slideIndex]);
  useEffect(function () {
    if (!willEnter) return;
    if (finalStepIndex === undefined) return;

    if (pendingView.stepIndex < 0) {
      setAnimate(false);
      commitTransition({
        stepIndex: 0
      });
    } else if (pendingView.stepIndex === GOTO_FINAL_STEP) {
      // Because <Slide> elements enumerate their own steps, nobody else
      // actually knows how many steps are in a slide. So other slides put a
      // value of GOTO_FINAL_STEP in the step index to indicate that the slide
      // should fill in the correct finalStepIndex before we commit the change.
      setAnimate(false);
      commitTransition({
        stepIndex: finalStepIndex
      });
    } else if (pendingView.stepIndex > finalStepIndex) {
      setAnimate(false);
      commitTransition({
        stepIndex: finalStepIndex
      });
    } else {
      var isTransitionFromPreviousSlide = activeView.slideIndex === pendingView.slideIndex - 1;
      setAnimate(isTransitionFromPreviousSlide);
      commitTransition();
    }
  }, [willEnter, activeView, pendingView, finalStepIndex, commitTransition]);
  var target = useMemo(function () {
    if (isPassed) {
      return [{
        transform: STAGE_RIGHT
      }, {
        display: 'none'
      }];
    }

    if (isActive) {
      return {
        transform: CENTER_STAGE,
        display: 'unset'
      };
    }

    if (isUpcoming) {
      return {
        transform: STAGE_LEFT,
        display: 'none'
      };
    }

    return {
      display: 'none'
    };
  }, [isPassed, isActive, isUpcoming]);
  var immediate = !animate || !useAnimations;
  var springFrameStyle = useSpring({
    to: target,
    immediate: immediate
  });
  var theme = useContext(ThemeContext);
  var scaledWrapperOverrideStyle = useMemo(function () {
    var _theme$space;

    if (!wrapperOverrideStyle || Object.entries(wrapperOverrideStyle).length === 0) {
      return {};
    }

    var themeSlidePadding = (theme === null || theme === void 0 ? void 0 : (_theme$space = theme.space) === null || _theme$space === void 0 ? void 0 : _theme$space[padding]) || 0;
    return _objectSpread(_objectSpread({}, wrapperOverrideStyle), {}, {
      width: "calc(".concat(wrapperOverrideStyle.width, " - ").concat(themeSlidePadding * 2, "px)"),
      height: "calc(".concat(wrapperOverrideStyle.height, " - ").concat(themeSlidePadding * 2, "px)")
    });
  }, [wrapperOverrideStyle, theme, padding]);
  var swipeHandler = useSwipeable({
    onSwiped: function onSwiped(eventData) {
      return onMobileSlide(eventData);
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, placeholder, /*#__PURE__*/React.createElement(SlideContext.Provider, {
    value: {
      immediate: immediate,
      slideId: slideId,
      isSlideActive: isActive,
      activationThresholds: activationThresholds,
      activeStepIndex: internalStepIndex
    }
  }, slidePortalNode && /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement(AnimatedDiv, {
    ref: setStepContainer,
    onClick: handleClick,
    tabIndex: inOverviewMode && isActive ? 0 : undefined,
    style: _objectSpread(_objectSpread(_objectSpread({}, springFrameStyle), frameOverrideStyle), inOverviewMode && hover && {
      outline: '2px solid white'
    }),
    onMouseEnter: onHoverChange,
    onMouseLeave: onHoverChange
  }, /*#__PURE__*/React.createElement(SlideContainer, _extends({
    className: className,
    backgroundColor: backgroundColor,
    backgroundImage: backgroundImage,
    backgroundOpacity: backgroundOpacity,
    backgroundPosition: backgroundPosition,
    backgroundRepeat: backgroundRepeat,
    backgroundSize: backgroundSize,
    color: textColor
  }, swipeHandler), /*#__PURE__*/React.createElement(TemplateWrapper, {
    style: wrapperOverrideStyle
  }, (typeof template === 'function' || typeof deckTemplate === 'function') && (template || deckTemplate)({
    slideNumber: activeView.slideIndex + 1,
    numberOfSlides: slideCount
  })), /*#__PURE__*/React.createElement(SlideWrapper, {
    style: scaledWrapperOverrideStyle,
    padding: padding
  }, children))), slidePortalNode)));
}
Slide.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  backgroundOpacity: PropTypes.number,
  backgroundPosition: PropTypes.string,
  backgroundRepeat: PropTypes.string,
  backgroundSize: PropTypes.string,
  children: PropTypes.node.isRequired,
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textColor: PropTypes.string,
  template: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};
Slide.defaultProps = {
  textColor: 'primary',
  backgroundColor: 'tertiary',
  backgroundOpacity: 1,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  padding: 2
};