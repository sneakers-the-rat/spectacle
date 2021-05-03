"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodeSpan = exports.Link = exports.ListItem = exports.UnorderedList = exports.OrderedList = exports.Quote = exports.Heading = exports.Text = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledSystem = require("styled-system");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  border-left: 1px solid\n    ", ";\n\n  div {\n    margin: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var decoration = (0, _styledSystem.system)({
  textDecoration: true
});
var Text = (0, _styledComponents.default)('div')((0, _styledSystem.compose)(_styledSystem.color, _styledSystem.typography, _styledSystem.space));
exports.Text = Text;
Text.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  padding: 0,
  margin: 0
};
var CodeSpan = (0, _styledComponents.default)('code')((0, _styledSystem.compose)(_styledSystem.color, _styledSystem.typography, _styledSystem.space));
exports.CodeSpan = CodeSpan;
CodeSpan.defaultProps = {
  fontFamily: 'monospace',
  fontSize: 'text'
};
var Link = (0, _styledComponents.default)('a')((0, _styledSystem.compose)(_styledSystem.color, _styledSystem.typography, _styledSystem.space, decoration));
exports.Link = Link;
Link.defaultProps = {
  fontFamily: 'text',
  fontSize: 'text',
  textDecoration: 'underline',
  color: 'quaternary'
};
var Heading = (0, _styledComponents.default)(Text)({});
exports.Heading = Heading;
Heading.defaultProps = {
  color: 'secondary',
  fontFamily: 'header',
  fontSize: 'h1',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: 1
};
var Quote = (0, _styledComponents.default)(Text)(_templateObject(), function (_ref) {
  var theme = _ref.theme,
      borderColor = _ref.borderColor;
  return borderColor || theme.colors.secondary;
});
exports.Quote = Quote;
Quote.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  fontStyle: 'italic',
  padding: '16px 0 16px 8px',
  margin: 0
};
var listStyle = (0, _styledSystem.system)({
  listStyleType: true
});
var OrderedList = (0, _styledComponents.default)('ol')((0, _styledSystem.compose)(_styledSystem.color, _styledSystem.typography, _styledSystem.space, listStyle));
exports.OrderedList = OrderedList;
OrderedList.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 0
};
var UnorderedList = (0, _styledComponents.default)('ul')((0, _styledSystem.compose)(_styledSystem.color, _styledSystem.typography, _styledSystem.space, listStyle));
exports.UnorderedList = UnorderedList;
UnorderedList.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 0
};
var ListItem = (0, _styledComponents.default)('li')((0, _styledSystem.compose)(_styledSystem.color, _styledSystem.typography, _styledSystem.space));
exports.ListItem = ListItem;
ListItem.defaultProps = {
  margin: 0
};