function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  @media print {\n    display: none;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: ", "px;\n  height: ", "px;\n  display: inline-block;\n  border: 1px solid ", ";\n  background: ", ";\n  margin: ", "px;\n  border-radius: 50%;\n  pointer-events: all;\n  cursor: pointer;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import * as React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { DeckContext } from './deck/deck';
export var Circle = styled('div')(_templateObject(), function (_ref) {
  var size = _ref.size;
  return size;
}, function (_ref2) {
  var size = _ref2.size;
  return size;
}, function (_ref3) {
  var color = _ref3.color;
  return color;
}, function (_ref4) {
  var color = _ref4.color,
      active = _ref4.active;
  return active ? color : 'transparent';
}, function (_ref5) {
  var size = _ref5.size;
  return size / 3;
});
var Container = styled('div')(_templateObject2());

var Progress = function Progress(props) {
  var _React$useContext = React.useContext(DeckContext),
      slideCount = _React$useContext.slideCount,
      skipTo = _React$useContext.skipTo,
      activeView = _React$useContext.activeView;

  return /*#__PURE__*/React.createElement(Container, {
    className: "spectacle-progress-indicator"
  }, Array(slideCount).fill(0).map(function (_, idx) {
    return /*#__PURE__*/React.createElement(Circle, {
      key: "progress-circle-".concat(idx),
      color: props.color,
      active: activeView.slideIndex === idx,
      size: props.size,
      onClick: function onClick() {
        return skipTo({
          slideIndex: idx,
          stepIndex: 0
        });
      },
      "data-testid": "Progress Circle"
    });
  }));
};

Progress.propTypes = {
  color: propTypes.string,
  size: propTypes.number
};
Progress.defaultProps = {
  color: '#fff',
  size: 10
};
export default Progress;