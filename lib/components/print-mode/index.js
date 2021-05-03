"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PrintMode;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _deck = _interopRequireDefault(require("../deck/deck"));

var _slide = require("../slide/slide");

var _defaultTheme = _interopRequireDefault(require("../../theme/default-theme"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  @media print {\n    body, html {\n      margin: 0;\n    }\n    @page {\n      size: ", ";\n    }\n    ", " {\n      @page {\n        margin: 0;\n      }\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background-color: white;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Backdrop = _styledComponents.default.div(_templateObject());

var PrintStyle = (0, _styledComponents.createGlobalStyle)(_templateObject2(), function (_ref) {
  var pageSize = _ref.pageSize,
      pageOrientation = _ref.pageOrientation;
  return "".concat(pageSize, " ").concat(pageOrientation).trim();
}, _slide.AnimatedDiv);

function PrintMode(props) {
  var _theme$size, _theme$size2;

  var children = props.children,
      theme = props.theme,
      exportMode = props.exportMode,
      pageSize = props.pageSize,
      _props$pageOrientatio = props.pageOrientation,
      pageOrientation = _props$pageOrientatio === void 0 ? '' : _props$pageOrientatio;
  var width = (theme === null || theme === void 0 ? void 0 : (_theme$size = theme.size) === null || _theme$size === void 0 ? void 0 : _theme$size.width) || _defaultTheme.default.size.width;
  var height = (theme === null || theme === void 0 ? void 0 : (_theme$size2 = theme.size) === null || _theme$size2 === void 0 ? void 0 : _theme$size2.height) || _defaultTheme.default.size.height;
  var computedPageSize = pageSize || "".concat(width / 100, "in ").concat(height / 100, "in");
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(PrintStyle, {
    pageSize: computedPageSize,
    pageOrientation: pageOrientation
  }), /*#__PURE__*/_react.default.createElement(_deck.default, {
    printMode: true,
    exportMode: exportMode,
    disableInteractivity: true,
    theme: _objectSpread(_objectSpread({}, theme), {}, {
      Backdrop: Backdrop,
      backdropStyle: {}
    })
  }, children));
}

PrintMode.propTypes = {
  theme: _propTypes.default.object,
  children: _propTypes.default.node.isRequired,
  exportMode: _propTypes.default.bool.isRequired,
  pageSize: _propTypes.default.string,
  pageOrientation: _propTypes.default.oneOf(['landscape', 'portrait'])
};