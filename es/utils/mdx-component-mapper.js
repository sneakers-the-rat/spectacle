function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react/display-name */
import * as React from 'react';
import { Heading, Image, Link, ListItem, OrderedList, Quote, Table, TableCell, TableRow, Text, UnorderedList } from '../';
var mdxComponentMap = {
  p: Text,
  h1: function h1(props) {
    return /*#__PURE__*/React.createElement(Heading, _extends({}, props, {
      fontSize: "h1"
    }));
  },
  h2: function h2(props) {
    return /*#__PURE__*/React.createElement(Heading, _extends({}, props, {
      fontSize: "h2"
    }));
  },
  h3: function h3(props) {
    return /*#__PURE__*/React.createElement(Heading, _extends({}, props, {
      fontSize: "h3"
    }));
  },
  h4: function h4(props) {
    return /*#__PURE__*/React.createElement(Heading, _extends({}, props, {
      fontSize: "h4"
    }));
  },
  blockquote: Quote,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  img: Image,
  a: Link,
  table: Table,
  tr: TableRow,
  td: TableCell
};
export default mdxComponentMap;