function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect, forwardRef, useMemo, useCallback, createContext } from 'react';
import propTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { ulid } from 'ulid';
import { useCollectSlides } from '../../hooks/use-slides';
import useAspectRatioFitting from '../../hooks/use-aspect-ratio-fitting';
import useDeckState from '../../hooks/use-deck-state';
import useMousetrap from '../../hooks/use-mousetrap';
import useLocationSync from '../../hooks/use-location-sync';
import { mergeTheme } from '../../theme';
import * as queryStringMapFns from '../../location-map-fns/query-string';
import { overviewFrameStyle, overviewWrapperStyle, printFrameStyle, printWrapperStyle } from './deck-styles';
import { useAutoPlay } from '../../utils/use-auto-play';
import defaultTheme from '../../theme/default-theme';
export var DeckContext = /*#__PURE__*/createContext();

var noop = function noop() {};
/**
 * The PDF DPI is 96. We want to scale the slide down because it's a 1:1 px to 1/100th of an inch.
 * However there are some unchangeable margins that make 0.96 too big, so we use 0.959 to prevent overflow.
 */


var DEFAULT_PRINT_SCALE = 0.959;
var DEFAULT_OVERVIEW_SCALE = 0.25;
var Portal = styled('div')(function (_ref) {
  var fitAspectRatioStyle = _ref.fitAspectRatioStyle,
      overviewMode = _ref.overviewMode,
      printMode = _ref.printMode;
  return [!printMode && {
    overflow: 'hidden'
  }, !printMode && fitAspectRatioStyle, overviewMode && {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    transform: 'scale(1)',
    overflowY: 'scroll',
    width: '100%',
    height: '100%'
  }, printMode && {
    display: 'block'
  }];
});
var Deck = /*#__PURE__*/forwardRef(function (_ref2, ref) {
  var userProvidedId = _ref2.id,
      _ref2$className = _ref2.className,
      className = _ref2$className === void 0 ? '' : _ref2$className,
      userProvidedBackdropStyle = _ref2.backdropStyle,
      _ref2$overviewMode = _ref2.overviewMode,
      overviewMode = _ref2$overviewMode === void 0 ? false : _ref2$overviewMode,
      _ref2$printMode = _ref2.printMode,
      printMode = _ref2$printMode === void 0 ? false : _ref2$printMode,
      _ref2$exportMode = _ref2.exportMode,
      exportMode = _ref2$exportMode === void 0 ? false : _ref2$exportMode,
      _ref2$overviewScale = _ref2.overviewScale,
      overviewScale = _ref2$overviewScale === void 0 ? DEFAULT_OVERVIEW_SCALE : _ref2$overviewScale,
      _ref2$printScale = _ref2.printScale,
      printScale = _ref2$printScale === void 0 ? DEFAULT_PRINT_SCALE : _ref2$printScale,
      template = _ref2.template,
      _ref2$theme = _ref2.theme;
  _ref2$theme = _ref2$theme === void 0 ? {} : _ref2$theme;
  var _ref2$theme$size = _ref2$theme.size;
  _ref2$theme$size = _ref2$theme$size === void 0 ? {
    width: defaultTheme.size.width,
    height: defaultTheme.size.height
  } : _ref2$theme$size;

  var nativeSlideWidth = _ref2$theme$size.width,
      nativeSlideHeight = _ref2$theme$size.height,
      UserProvidedBackdropComponent = _ref2$theme.Backdrop,
      _ref2$theme$backdropS = _ref2$theme.backdropStyle,
      themeProvidedBackdropStyle = _ref2$theme$backdropS === void 0 ? {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh'
  } : _ref2$theme$backdropS,
      themeSuppressBackdropFallback = _ref2$theme.suppressBackdropFallback,
      restTheme = _objectWithoutProperties(_ref2$theme, ["size", "Backdrop", "backdropStyle", "suppressBackdropFallback"]),
      _ref2$onSlideClick = _ref2.onSlideClick,
      onSlideClick = _ref2$onSlideClick === void 0 ? noop : _ref2$onSlideClick,
      _ref2$onMobileSlide = _ref2.onMobileSlide,
      onMobileSlide = _ref2$onMobileSlide === void 0 ? noop : _ref2$onMobileSlide,
      _ref2$disableInteract = _ref2.disableInteractivity,
      disableInteractivity = _ref2$disableInteract === void 0 ? false : _ref2$disableInteract,
      notePortalNode = _ref2.notePortalNode,
      _ref2$useAnimations = _ref2.useAnimations,
      useAnimations = _ref2$useAnimations === void 0 ? true : _ref2$useAnimations,
      children = _ref2.children,
      _ref2$onActiveStateCh = _ref2.onActiveStateChange,
      onActiveStateChangeExternal = _ref2$onActiveStateCh === void 0 ? noop : _ref2$onActiveStateCh,
      _ref2$initialState = _ref2.initialState,
      initialDeckState = _ref2$initialState === void 0 ? {
    slideIndex: 0,
    stepIndex: 0
  } : _ref2$initialState,
      _ref2$suppressBackdro = _ref2.suppressBackdropFallback,
      suppressBackdropFallback = _ref2$suppressBackdro === void 0 ? false : _ref2$suppressBackdro,
      _ref2$autoPlay = _ref2.autoPlay,
      autoPlay = _ref2$autoPlay === void 0 ? false : _ref2$autoPlay,
      _ref2$autoPlayLoop = _ref2.autoPlayLoop,
      autoPlayLoop = _ref2$autoPlayLoop === void 0 ? false : _ref2$autoPlayLoop,
      _ref2$autoPlayInterva = _ref2.autoPlayInterval,
      autoPlayInterval = _ref2$autoPlayInterva === void 0 ? 1000 : _ref2$autoPlayInterva;

  var _useState = useState(userProvidedId || ulid),
      _useState2 = _slicedToArray(_useState, 1),
      deckId = _useState2[0];

  var _useDeckState = useDeckState(initialDeckState),
      initialized = _useDeckState.initialized,
      pendingView = _useDeckState.pendingView,
      activeView = _useDeckState.activeView,
      initializeTo = _useDeckState.initializeTo,
      skipTo = _useDeckState.skipTo,
      stepForward = _useDeckState.stepForward,
      stepBackward = _useDeckState.stepBackward,
      advanceSlide = _useDeckState.advanceSlide,
      regressSlide = _useDeckState.regressSlide,
      commitTransition = _useDeckState.commitTransition,
      cancelTransition = _useDeckState.cancelTransition;

  useEffect(function () {
    if (!initialized) return;
    onActiveStateChange(activeView);
    onActiveStateChangeExternal(activeView);
  }, [initialized, activeView, onActiveStateChange, onActiveStateChangeExternal]);

  var _useCollectSlides = useCollectSlides(),
      _useCollectSlides2 = _slicedToArray(_useCollectSlides, 3),
      setPlaceholderContainer = _useCollectSlides2[0],
      slideIds = _useCollectSlides2[1],
      slideIdsInitialized = _useCollectSlides2[2]; // It really is much easier to just expose methods to the outside world that
  // drive the presentation through its state rather than trying to implement a
  // declarative API.


  React.useImperativeHandle(ref, function () {
    return {
      initialized: initialized,
      activeView: activeView,
      initializeTo: initializeTo,
      skipTo: skipTo,
      stepForward: stepForward,
      stepBackward: stepBackward,
      advanceSlide: advanceSlide,
      regressSlide: regressSlide,
      numberOfSlides: slideIds.length
    };
  }, [initialized, activeView, initializeTo, skipTo, stepForward, stepBackward, advanceSlide, regressSlide, slideIds]);
  useMousetrap(disableInteractivity ? {} : {
    left: function left() {
      return stepBackward();
    },
    right: function right() {
      return stepForward();
    }
  }, []);

  var _useLocationSync = useLocationSync(_objectSpread({
    disableInteractivity: disableInteractivity,
    setState: skipTo
  }, queryStringMapFns)),
      _useLocationSync2 = _slicedToArray(_useLocationSync, 2),
      syncLocation = _useLocationSync2[0],
      onActiveStateChange = _useLocationSync2[1];

  useEffect(function () {
    var initialView = syncLocation({
      slideIndex: 0,
      stepIndex: 0
    });
    initializeTo(initialView);
  }, [initializeTo, syncLocation]);
  useAutoPlay({
    enabled: autoPlay,
    loop: autoPlayLoop,
    interval: autoPlayInterval,
    navigation: {
      skipTo: skipTo,
      stepForward: stepForward,
      isFinalSlide: activeView.slideIndex === slideIds.length - 1
    }
  });
  var handleSlideClick = useCallback(function (e, slideId) {
    var slideIndex = slideIds.indexOf(slideId);
    onSlideClick(e, slideIndex);
  }, [onSlideClick, slideIds]);
  var activeSlideId = slideIds[activeView.slideIndex];
  var pendingSlideId = slideIds[pendingView.slideIndex];

  var _useMemo = useMemo(function () {
    var p = new Set();
    var u = new Set();
    var foundActive = false;

    var _iterator = _createForOfIteratorHelper(slideIds),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var slideId = _step.value;

        if (foundActive) {
          u.add(slideId);
        } else if (slideId === activeSlideId) {
          foundActive = true;
        } else {
          p.add(slideId);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return [p, u];
  }, [slideIds, activeSlideId]),
      _useMemo2 = _slicedToArray(_useMemo, 2),
      passed = _useMemo2[0],
      upcoming = _useMemo2[1];

  var fullyInitialized = initialized && slideIdsInitialized; // Slides don't actually render their content to their position in the DOM-
  // they render to this `portalNode` element. The only thing they actually
  // render to their "natural" DOM location is a placeholder node which we use
  // below to enumerate them.
  //
  // The main reason for this is so that we can be absolutely sure that no
  // intermediate areas of the tree end up breaking styling, while still
  // allowing users to organize their slides via component nesting:
  //
  //     const ContentSlides = () => (
  //       <>
  //         <Slide>First Slide</Slide>
  //         <p>This text will never appear, because it's not part of a Slide.<p>
  //         <Slide>Second Slide</Slide>
  //       </>
  //     );
  //
  //     const Presentation = () => (
  //       <Deck>
  //         <Slide>Title Slide</Slide>
  //         <ContentSlides />
  //         <Slide>Conclusion Slide</Slide>
  //       </Deck>
  //     );

  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      slidePortalNode = _React$useState2[0],
      setSlidePortalNode = _React$useState2[1];

  var _useAspectRatioFittin = useAspectRatioFitting({
    targetWidth: nativeSlideWidth,
    targetHeight: nativeSlideHeight
  }),
      _useAspectRatioFittin2 = _slicedToArray(_useAspectRatioFittin, 2),
      backdropRef = _useAspectRatioFittin2[0],
      fitAspectRatioStyle = _useAspectRatioFittin2[1];

  var frameStyle = useMemo(function () {
    var options = {
      printScale: printScale,
      overviewScale: overviewScale,
      nativeSlideWidth: nativeSlideWidth,
      nativeSlideHeight: nativeSlideHeight
    };

    if (overviewMode) {
      return overviewFrameStyle(options);
    } else if (printMode) {
      return printFrameStyle(options);
    }

    return {};
  }, [nativeSlideHeight, nativeSlideWidth, overviewMode, overviewScale, printMode, printScale]);
  var wrapperStyle = useMemo(function () {
    if (overviewMode) {
      return overviewWrapperStyle({
        overviewScale: overviewScale
      });
    } else if (printMode) {
      return printWrapperStyle({
        printScale: printScale
      });
    }

    return {};
  }, [overviewMode, overviewScale, printMode, printScale]); // Try to be intelligent about the backdrop background color: we have to use
  // inline styles, which will take precedence over all other styles. So, we do
  // as much as we can here to detect if a backdrop color has been provided, or
  // if the user has provided a custom backdrop component (in which case they're
  // responsible for styling it properly.) If we don't detect an appropriate
  // case, then we apply the inline style.
  //
  // Yes, this is slightly awkward, but IMO adding an additional `<div>` element
  // would be even more awkward.

  var useFallbackBackdropStyle = true;
  var backdropStyle = themeProvidedBackdropStyle;
  var BackdropComponent = 'div';

  if (userProvidedBackdropStyle) {
    Object.assign(backdropStyle, userProvidedBackdropStyle);

    if (backdropStyle['background'] || backdropStyle['backgroundColor']) {
      useFallbackBackdropStyle = false;
    }
  }

  if (UserProvidedBackdropComponent) {
    BackdropComponent = UserProvidedBackdropComponent;
    useFallbackBackdropStyle = false;
  }

  if (useFallbackBackdropStyle && !suppressBackdropFallback && !themeSuppressBackdropFallback) {
    backdropStyle['backgroundColor'] = 'black';
  }

  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: mergeTheme({
      theme: restTheme,
      printMode: printMode && !exportMode
    })
  }, /*#__PURE__*/React.createElement(BackdropComponent, {
    ref: backdropRef,
    className: className,
    style: _objectSpread(_objectSpread({}, backdropStyle), {}, {
      overflow: 'hidden'
    })
  }, /*#__PURE__*/React.createElement(Portal, {
    ref: setSlidePortalNode,
    overviewMode: overviewMode,
    printMode: printMode,
    fitAspectRatioStyle: fitAspectRatioStyle
  }), /*#__PURE__*/React.createElement(DeckContext.Provider, {
    value: {
      deckId: deckId,
      slideCount: slideIds.length,
      useAnimations: useAnimations,
      slidePortalNode: slidePortalNode,
      onSlideClick: handleSlideClick,
      onMobileSlide: onMobileSlide,
      theme: restTheme,
      frameOverrideStyle: frameStyle,
      wrapperOverrideStyle: wrapperStyle,
      backdropNode: backdropRef.current,
      notePortalNode: notePortalNode,
      initialized: fullyInitialized,
      passedSlideIds: passed,
      upcomingSlideIds: upcoming,
      activeView: _objectSpread(_objectSpread({}, activeView), {}, {
        slideId: activeSlideId
      }),
      pendingView: _objectSpread(_objectSpread({}, pendingView), {}, {
        slideId: pendingSlideId
      }),
      skipTo: skipTo,
      stepForward: stepForward,
      advanceSlide: advanceSlide,
      regressSlide: regressSlide,
      commitTransition: commitTransition,
      cancelTransition: cancelTransition,
      template: template
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: setPlaceholderContainer,
    style: {
      display: 'none'
    }
  }, children))));
});
Deck.name = Deck.displayName = 'Deck';
Deck.propTypes = {
  id: propTypes.oneOfType([propTypes.string, propTypes.number]),
  className: propTypes.string,
  backdropStyle: propTypes.object,
  overviewMode: propTypes.bool,
  printMode: propTypes.bool,
  exportMode: propTypes.bool,
  overviewScale: propTypes.number,
  printScale: propTypes.number,
  template: propTypes.oneOfType([propTypes.node, propTypes.func]),
  theme: propTypes.object,
  onSlideClick: propTypes.func,
  onMobileSlide: propTypes.func,
  disableInteractivity: propTypes.bool,
  notePortalNode: propTypes.node,
  useAnimations: propTypes.bool,
  children: propTypes.node.isRequired,
  onActiveStateChange: propTypes.func,
  initialState: propTypes.shape({
    slideIndex: propTypes.number,
    stepIndex: propTypes.number
  }),
  suppressBackdropFallback: propTypes.bool,
  autoPlay: propTypes.bool,
  autoPlayLoop: propTypes.bool,
  autoPlayInterval: propTypes.number
};
export default Deck;