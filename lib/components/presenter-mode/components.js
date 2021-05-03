"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deckBackdropStyles = exports.NotesContainer = exports.SlideCountLabel = exports.SlideWrapper = exports.SlideContainer = exports.PreviewColumn = exports.NotesColumn = exports.PresenterDeckContainer = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  border-top: 1px solid black;\n  overflow-y: scroll;\n  flex: 1;\n\n  ::-webkit-scrollbar {\n    width: 10px;\n  }\n\n  /* Track */\n  ::-webkit-scrollbar-track {\n    background-color: #111;\n  }\n\n  /* Handle */\n  ::-webkit-scrollbar-thumb {\n    background: #333;\n    border-radius: 10px;\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  background: hsla(0, 0%, 100%, 0.1);\n  border-radius: 4px;\n  font-size: 0.7em;\n  padding: 1px 4px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n      flex: 0.8;\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  flex: 1;\n  width: 100%;\n  position: relative;\n  .spectacle-fullscreen-button {\n    display: none;\n  }\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  height: calc(50% - 1em);\n  width: 100%;\n  overflow: hidden;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  background-color: black;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 50%;\n  > :first-child {\n    margin-bottom: 0.5em;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  width: 50%;\n  border-right: 1px solid black;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: row;\n  background-color: #181818;\n  overflow: hidden;\n  color: white;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var PresenterDeckContainer = (0, _styledComponents.default)('div')(_templateObject());
exports.PresenterDeckContainer = PresenterDeckContainer;
var NotesColumn = (0, _styledComponents.default)('div')(_templateObject2());
exports.NotesColumn = NotesColumn;
var PreviewColumn = (0, _styledComponents.default)('div')(_templateObject3());
exports.PreviewColumn = PreviewColumn;
var SlideContainer = (0, _styledComponents.default)('div')(_templateObject4());
exports.SlideContainer = SlideContainer;
var SlideWrapper = (0, _styledComponents.default)('div')(_templateObject5(), function (_ref) {
  var small = _ref.small;
  return small && css(_templateObject6());
});
exports.SlideWrapper = SlideWrapper;
var SlideCountLabel = (0, _styledComponents.default)('span')(_templateObject7());
exports.SlideCountLabel = SlideCountLabel;
var NotesContainer = (0, _styledComponents.default)('div')(_templateObject8());
exports.NotesContainer = NotesContainer;
var deckBackdropStyles = {
  currentSlide: {
    width: '50vw',
    height: '50vh',
    left: '50vw',
    top: '7vh'
  },
  nextSlide: {
    width: '50vw',
    height: '33vh',
    top: '60vh',
    left: '50vw'
  }
};
exports.deckBackdropStyles = deckBackdropStyles;