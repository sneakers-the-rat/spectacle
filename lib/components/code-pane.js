"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CodePane;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSyntaxHighlighter = require("react-syntax-highlighter");

var _useSteps2 = require("../hooks/use-steps");

var _indentNormalizer = _interopRequireDefault(require("../utils/indent-normalizer"));

var _styledComponents = require("styled-components");

var _vsDark = _interopRequireDefault(require("react-syntax-highlighter/dist/cjs/styles/prism/vs-dark"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

function CodePane(_ref2) {
  var _ref2$highlightRanges = _ref2.highlightRanges,
      highlightRanges = _ref2$highlightRanges === void 0 ? [] : _ref2$highlightRanges,
      language = _ref2.language,
      rawCodeString = _ref2.children,
      stepIndex = _ref2.stepIndex,
      _ref2$theme = _ref2.theme,
      syntaxTheme = _ref2$theme === void 0 ? _vsDark.default : _ref2$theme,
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
  var theme = React.useContext(_styledComponents.ThemeContext);

  var _useSteps = (0, _useSteps2.useSteps)(numberOfSteps, {
    stepIndex: stepIndex
  }),
      stepId = _useSteps.stepId,
      isActive = _useSteps.isActive,
      step = _useSteps.step,
      placeholder = _useSteps.placeholder;

  var children = React.useMemo(function () {
    return (0, _indentNormalizer.default)(rawCodeString);
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, placeholder, /*#__PURE__*/React.createElement(_reactSyntaxHighlighter.Prism, {
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
  highlightRanges: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number.isRequired, _propTypes.default.arrayOf(_propTypes.default.number.isRequired)]).isRequired),
  language: _propTypes.default.string.isRequired,
  children: _propTypes.default.string.isRequired,
  stepIndex: _propTypes.default.number,
  theme: _propTypes.default.object,
  width: _propTypes.default.number
};