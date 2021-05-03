import * as React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';
import { useSteps } from '../hooks/use-steps';
import { SlideContext } from './slide/slide';
export default function Appear(_ref) {
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

  var _React$useContext = React.useContext(SlideContext),
      immediate = _React$useContext.immediate;

  var _useSteps = useSteps(1, {
    id: id,
    stepIndex: stepIndex
  }),
      isActive = _useSteps.isActive,
      placeholder = _useSteps.placeholder;

  var AnimatedEl = animated[tagName];
  var children;

  if (typeof childrenOrRenderFunction === 'function') {
    children = childrenOrRenderFunction(step, isActive);
  } else {
    children = childrenOrRenderFunction;
  }

  var springStyle = useSpring({
    to: isActive ? activeStyle : inactiveStyle,
    immediate: immediate
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, placeholder, /*#__PURE__*/React.createElement(AnimatedEl, {
    style: springStyle,
    className: className
  }, children));
}
Appear.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  tagName: PropTypes.string,
  stepIndex: PropTypes.number,
  numSteps: PropTypes.number,
  activeStyle: PropTypes.object,
  inactiveStyle: PropTypes.object
};