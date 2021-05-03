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

import React from 'react';
import propTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Deck from '../deck/deck';
import { AnimatedDiv } from '../slide/slide';
import defaultTheme from '../../theme/default-theme';
var Backdrop = styled.div(_templateObject());
var PrintStyle = createGlobalStyle(_templateObject2(), function (_ref) {
  var pageSize = _ref.pageSize,
      pageOrientation = _ref.pageOrientation;
  return "".concat(pageSize, " ").concat(pageOrientation).trim();
}, AnimatedDiv);
export default function PrintMode(props) {
  var _theme$size, _theme$size2;

  var children = props.children,
      theme = props.theme,
      exportMode = props.exportMode,
      pageSize = props.pageSize,
      _props$pageOrientatio = props.pageOrientation,
      pageOrientation = _props$pageOrientatio === void 0 ? '' : _props$pageOrientatio;
  var width = (theme === null || theme === void 0 ? void 0 : (_theme$size = theme.size) === null || _theme$size === void 0 ? void 0 : _theme$size.width) || defaultTheme.size.width;
  var height = (theme === null || theme === void 0 ? void 0 : (_theme$size2 = theme.size) === null || _theme$size2 === void 0 ? void 0 : _theme$size2.height) || defaultTheme.size.height;
  var computedPageSize = pageSize || "".concat(width / 100, "in ").concat(height / 100, "in");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PrintStyle, {
    pageSize: computedPageSize,
    pageOrientation: pageOrientation
  }), /*#__PURE__*/React.createElement(Deck, {
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
  theme: propTypes.object,
  children: propTypes.node.isRequired,
  exportMode: propTypes.bool.isRequired,
  pageSize: propTypes.string,
  pageOrientation: propTypes.oneOf(['landscape', 'portrait'])
};