function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import * as React from 'react';
import propTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useSteps } from '../hooks/use-steps';
import indentNormalizer from '../utils/indent-normalizer';
import { ThemeContext } from 'styled-components';
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vs-dark';

var checkForNumberValues = function checkForNumberValues(ranges) {
  return ranges.every(function (element) {
    return typeof element === 'number';
  });
};

var checkForInvalidValues = function checkForInvalidValues(ranges) {
  return ranges.every(function (element) {
    return element === null || element === undefined;
  });
};

var getRangeFormat = function getRangeFormat(_ref) {
  var isSingleRangeProvided = _ref.isSingleRangeProvided,
      highlightRanges = _ref.highlightRanges,
      step = _ref.step;

  // If the value passed to highlightRanges is:
  // a single array containing only two numbers e.g. [3, 5]
  if (isSingleRangeProvided) {
    return highlightRanges;
  } // a 2D array containing null/undefined values e.g. [1, null, 5, [7, 9]]


  if (highlightRanges[step] === null || highlightRanges[step] === undefined) {
    return [];
  } // a 2D array and some of its elements contain numbers e.g. [[1, 3], 5, 7, 9, [10, 15]]


  if (typeof highlightRanges[step] === 'number') {
    return [highlightRanges[step]];
  } // a 2D array e.g. [[1], [3], [5, 9], [15], [20, 25], [30]]


  return highlightRanges[step];
};

var getStyleForLineNumber = function getStyleForLineNumber(lineNumber, activeRange) {
  var isOneLineNumber = activeRange.length === 1;

  if (isOneLineNumber) {
    var _activeRange = _slicedToArray(activeRange, 1),
        activeLineNumber = _activeRange[0];

    if (activeLineNumber === lineNumber) {
      return {
        opacity: 1
      };
    } else {
      return {
        opacity: 0.5
      };
    }
  }

  var _activeRange2 = _slicedToArray(activeRange, 2),
      from = _activeRange2[0],
      to = _activeRange2[1];

  return {
    opacity: from <= lineNumber && lineNumber <= to ? 1 : 0.5
  };
};

export default function CodePane(_ref2) {
  var _ref2$highlightRanges = _ref2.highlightRanges,
      highlightRanges = _ref2$highlightRanges === void 0 ? [] : _ref2$highlightRanges,
      language = _ref2.language,
      rawCodeString = _ref2.children,
      stepIndex = _ref2.stepIndex,
      _ref2$theme = _ref2.theme,
      syntaxTheme = _ref2$theme === void 0 ? dark : _ref2$theme,
      _ref2$width = _ref2.width,
      width = _ref2$width === void 0 ? 1366 : _ref2$width;
  var numberOfSteps = React.useMemo(function () {
    if (highlightRanges.length === 0 || // Prevents e.g. [null, null] to be used to count the number of steps
    checkForInvalidValues(highlightRanges)) {
      return 0;
    } // Checks if the value passed to highlightRanges is a single array containing only two numbers e.g. [3, 5]


    var isSingleRange = highlightRanges.length <= 2 && // Prevents e.g. [3, [5]] from being considered a single array range
    checkForNumberValues(highlightRanges);

    if (isSingleRange) {
      return 1;
    }

    return highlightRanges.length;
  }, [highlightRanges]);
  var theme = React.useContext(ThemeContext);

  var _useSteps = useSteps(numberOfSteps, {
    stepIndex: stepIndex
  }),
      stepId = _useSteps.stepId,
      isActive = _useSteps.isActive,
      step = _useSteps.step,
      placeholder = _useSteps.placeholder;

  var children = React.useMemo(function () {
    return indentNormalizer(rawCodeString);
  }, [rawCodeString]);
  var scrollTarget = React.useRef();
  var getLineNumberProps = React.useCallback(function (lineNumber) {
    if (!isActive) return;
    var range = getRangeFormat({
      isSingleRangeProvided: numberOfSteps === 1,
      highlightRanges: highlightRanges,
      step: step
    });
    return {
      style: getStyleForLineNumber(lineNumber, range)
    };
  }, [isActive, highlightRanges, numberOfSteps, step]);
  var getLineProps = React.useCallback(function (lineNumber) {
    if (!isActive) return;
    var range = getRangeFormat({
      isSingleRangeProvided: numberOfSteps === 1,
      highlightRanges: highlightRanges,
      step: step
    });
    return {
      ref: lineNumber === range[0] ? scrollTarget : undefined,
      style: getStyleForLineNumber(lineNumber, range)
    };
  }, [isActive, highlightRanges, numberOfSteps, step]);
  React.useEffect(function () {
    window.requestAnimationFrame(function () {
      var _scrollTarget$current;

      if (!scrollTarget.current) return;
      (_scrollTarget$current = scrollTarget.current) === null || _scrollTarget$current === void 0 ? void 0 : _scrollTarget$current.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    });
  }, [isActive, step]);
  var customStyle = React.useMemo(function () {
    /**
     * Provide fallback values if the user intentionally overrides the
     * default theme with no valid values.
     */
    var _theme$size$width = theme.size.width,
        width = _theme$size$width === void 0 ? width : _theme$size$width,
        _theme$space = theme.space,
        space = _theme$space === void 0 ? [0, 0, 0] : _theme$space,
        _theme$fontSizes$mono = theme.fontSizes.monospace,
        monospace = _theme$fontSizes$mono === void 0 ? '20px' : _theme$fontSizes$mono;
    return {
      padding: space[0],
      margin: 0,
      width: width - space[2] * 2 - space[0] * 2,
      fontSize: monospace
    };
  }, [theme]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, placeholder, /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    customStyle: customStyle,
    language: language,
    wrapLines: true,
    showLineNumbers: true,
    lineProps: getLineProps,
    lineNumberProps: getLineNumberProps,
    style: syntaxTheme
  }, children));
}
CodePane.propTypes = {
  highlightRanges: propTypes.arrayOf(propTypes.oneOfType([propTypes.number.isRequired, propTypes.arrayOf(propTypes.number.isRequired)]).isRequired),
  language: propTypes.string.isRequired,
  children: propTypes.string.isRequired,
  stepIndex: propTypes.number,
  theme: propTypes.object,
  width: propTypes.number
};