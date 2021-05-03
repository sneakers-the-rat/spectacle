function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  border-left: 1px solid\n    ", ";\n\n  div {\n    margin: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';
import { color, typography, space, compose, system } from 'styled-system';
var decoration = system({
  textDecoration: true
});
var Text = styled('div')(compose(color, typography, space));
Text.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  padding: 0,
  margin: 0
};
var CodeSpan = styled('code')(compose(color, typography, space));
CodeSpan.defaultProps = {
  fontFamily: 'monospace',
  fontSize: 'text'
};
var Link = styled('a')(compose(color, typography, space, decoration));
Link.defaultProps = {
  fontFamily: 'text',
  fontSize: 'text',
  textDecoration: 'underline',
  color: 'quaternary'
};
var Heading = styled(Text)({});
Heading.defaultProps = {
  color: 'secondary',
  fontFamily: 'header',
  fontSize: 'h1',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: 1
};
var Quote = styled(Text)(_templateObject(), function (_ref) {
  var theme = _ref.theme,
      borderColor = _ref.borderColor;
  return borderColor || theme.colors.secondary;
});
Quote.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  fontStyle: 'italic',
  padding: '16px 0 16px 8px',
  margin: 0
};
var listStyle = system({
  listStyleType: true
});
var OrderedList = styled('ol')(compose(color, typography, space, listStyle));
OrderedList.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 0
};
var UnorderedList = styled('ul')(compose(color, typography, space, listStyle));
UnorderedList.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 0
};
var ListItem = styled('li')(compose(color, typography, space));
ListItem.defaultProps = {
  margin: 0
};
export { Text, Heading, Quote, OrderedList, UnorderedList, ListItem, Link, CodeSpan };