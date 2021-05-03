import * as React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import { DeckContext } from './deck/deck';
import { SlideContext } from './slide/slide';
export default function Notes(_ref) {
  var children = _ref.children;

  var _React$useContext = React.useContext(DeckContext),
      notePortalNode = _React$useContext.notePortalNode;

  var _React$useContext2 = React.useContext(SlideContext),
      isSlideActive = _React$useContext2.isSlideActive;

  if (!isSlideActive) return null;
  if (!notePortalNode) return null;
  return /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", null, children), notePortalNode);
}
Notes.propTypes = {
  children: propTypes.node
};