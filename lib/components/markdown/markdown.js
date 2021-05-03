"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkdownCodePane = exports.MarkdownPreHelper = exports.MarkdownSlideSet = exports.MarkdownSlide = exports.Markdown = void 0;

var React = _interopRequireWildcard(require("react"));

var _slide = _interopRequireDefault(require("../slide/slide"));

var _deck = require("../deck/deck");

var _remarkRehypePresenterNotes = _interopRequireDefault(require("../../utils/remark-rehype-presenter-notes"));

var _codePane = _interopRequireDefault(require("../code-pane"));

var _unified = _interopRequireDefault(require("unified"));

var _remarkParse = _interopRequireDefault(require("remark-parse"));

var _mdastUtilAssert = _interopRequireDefault(require("mdast-util-assert"));

var _remarkRehype = _interopRequireDefault(require("remark-rehype"));

var _rehypeRaw = _interopRequireDefault(require("rehype-raw"));

var _rehypeReact = _interopRequireDefault(require("rehype-react"));

var _reactIs = require("react-is");

var _mdastBuilder = require("mdast-builder");

var _mdxComponentMapper = _interopRequireDefault(require("../../utils/mdx-component-mapper"));

var _indentNormalizer = _interopRequireDefault(require("../../utils/indent-normalizer"));

var _notes = _interopRequireDefault(require("../notes"));

var _index = require("../../index");

var _appear = _interopRequireDefault(require("../appear"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Markdown = function Markdown(_ref) {
  var _ref$componentMap = _ref.componentMap,
      userProvidedComponentMap = _ref$componentMap === void 0 ? _mdxComponentMapper.default : _ref$componentMap,
      _ref$template = _ref.template;
  _ref$template = _ref$template === void 0 ? {
    default: 'div'
  } : _ref$template;
  var TemplateComponent = _ref$template.default,
      getPropsForAST = _ref$template.getPropsForAST,
      rawMarkdownText = _ref.children,
      _ref$animateListItems = _ref.animateListItems,
      animateListItems = _ref$animateListItems === void 0 ? false : _ref$animateListItems,
      componentProps = _ref.componentProps;

  var _React$useContext = React.useContext(_deck.DeckContext),
      _React$useContext$the = _React$useContext.theme;

  _React$useContext$the = _React$useContext$the === void 0 ? {} : _React$useContext$the;
  var themeComponentMap = _React$useContext$the.markdownComponentMap;

  var _React$useMemo = React.useMemo(function () {
    // Dedent and parse markdown into MDAST
    var markdownText = (0, _indentNormalizer.default)(rawMarkdownText);
    var ast = (0, _unified.default)().use(_remarkParse.default).parse(markdownText); // Extract presenter notes from the MDAST (since we want to use a different
    // component map for them.)

    var extractedNotes = (0, _mdastBuilder.root)();
    var transformedAst = (0, _unified.default)().use(_remarkRehypePresenterNotes.default, function () {
      var _extractedNotes$child;

      (_extractedNotes$child = extractedNotes.children).push.apply(_extractedNotes$child, arguments);
    }).runSync(ast); // Pass the AST into the provided template function, which returns an object
    // whose keys are prop names and whose values are chunks of the parsed AST.

    var templatePropMDASTs;

    if (typeof getPropsForAST === 'function') {
      templatePropMDASTs = getPropsForAST(transformedAst);
    }

    if (!templatePropMDASTs) {
      templatePropMDASTs = {
        children: transformedAst
      };
    } // Construct the component map based on the current theme and any custom
    // mappings provided directly to <Markdown />


    var componentMap = _objectSpread(_objectSpread({
      __codeBlock: MarkdownCodePane
    }, themeComponentMap || {}), userProvidedComponentMap); // If user wants to animate list items,
    // wrap ListItem in Appear


    if (animateListItems) {
      componentMap['li'] = AppearingListItem;
    } // Create an HOC based on the component map which will specially handle
    // fenced code blocks. (See MarkdownPreHelper for more details.)


    var PreComponent = componentMap['pre'];
    var CodeBlockComponent = componentMap['__codeBlock'];
    var CodeInlineComponent = componentMap['code'];
    componentMap['pre'] = MarkdownPreHelper(PreComponent, CodeInlineComponent, CodeBlockComponent);
    var componentMapWithPassedThroughProps = Object.entries(componentMap).reduce(function (newMap, _ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          Component = _ref3[1];

      newMap[key] = function (props) {
        return /*#__PURE__*/React.createElement(Component, _extends({}, props, componentProps || {}));
      };

      return newMap;
    }, {}); // Create the compiler for the _user-visible_ markdown (not presenter notes)

    var compiler = (0, _unified.default)().use(_remarkRehype.default, {
      allowDangerousHtml: true
    }).use(_rehypeRaw.default).use(_rehypeReact.default, {
      createElement: React.createElement,
      components: componentMapWithPassedThroughProps
    }); // Compile each of the values we got back from the template function

    var templateProps = Object.entries(templatePropMDASTs).reduce(function (acc, _ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          key = _ref5[0],
          mdast = _ref5[1];

      // Make sure what we got was actually MDAST
      (0, _mdastUtilAssert.default)(mdast); // Transform the MDAST into HAST

      var hast = compiler.runSync(mdast); // Compile the HAST into React elements

      acc[key] = compiler.stringify(hast);
      return acc;
    }, {}); // Create the compiler for presenter notes, which wraps the entire compiled
    // chunk in a <Note> component. (Rather than React.Fragment, which is the
    // default behavior.)

    var notesCompiler = (0, _unified.default)().use(_remarkRehype.default, {
      allowDangerousHtml: true
    }).use(_rehypeRaw.default).use(_rehypeReact.default, {
      createElement: React.createElement,
      Fragment: _notes.default
    }); // Transform and compile the notes AST.

    var transformedNotesAst = notesCompiler.runSync(extractedNotes);
    var noteElements = notesCompiler.stringify(transformedNotesAst);
    return [templateProps, noteElements];
  }, [rawMarkdownText, getPropsForAST, themeComponentMap, userProvidedComponentMap, animateListItems, componentProps]),
      _React$useMemo2 = _slicedToArray(_React$useMemo, 2),
      templateProps = _React$useMemo2[0],
      noteElements = _React$useMemo2[1];

  var children = templateProps.children,
      restProps = _objectWithoutProperties(templateProps, ["children"]);

  return /*#__PURE__*/React.createElement(TemplateComponent, restProps, children, noteElements);
};

exports.Markdown = Markdown;

var AppearingListItem = function AppearingListItem(props) {
  return /*#__PURE__*/React.createElement(_appear.default, null, /*#__PURE__*/React.createElement(_index.ListItem, props));
}; // TODO: document this thoroughly, it's a public-facing API


var MarkdownSlide = function MarkdownSlide(_ref6) {
  var children = _ref6.children,
      componentMap = _ref6.componentMap,
      template = _ref6.template,
      _ref6$animateListItem = _ref6.animateListItems,
      animateListItems = _ref6$animateListItem === void 0 ? false : _ref6$animateListItem,
      _ref6$componentProps = _ref6.componentProps,
      componentProps = _ref6$componentProps === void 0 ? {} : _ref6$componentProps,
      rest = _objectWithoutProperties(_ref6, ["children", "componentMap", "template", "animateListItems", "componentProps"]);

  return /*#__PURE__*/React.createElement(_slide.default, rest, /*#__PURE__*/React.createElement(Markdown, {
    componentMap: componentMap,
    template: template,
    animateListItems: animateListItems,
    componentProps: componentProps,
    children: children
  }));
}; // TODO: document this thoroughly, it's a public-facing API (possibly rename as
// well)


exports.MarkdownSlide = MarkdownSlide;

var MarkdownSlideSet = function MarkdownSlideSet(_ref7) {
  var rawMarkdownText = _ref7.children,
      _ref7$slideProps = _ref7.slideProps,
      slideProps = _ref7$slideProps === void 0 ? {} : _ref7$slideProps,
      allSlideProps = _objectWithoutProperties(_ref7, ["children", "slideProps"]);

  var dedentedMarkdownText = (0, _indentNormalizer.default)(rawMarkdownText);
  var mdSlides = dedentedMarkdownText.split(/\n\s*---\n/);
  return /*#__PURE__*/React.createElement(React.Fragment, null, mdSlides.map(function (md, ix) {
    var props = {};
    Object.assign(props, allSlideProps);

    if (slideProps[ix]) {
      Object.assign(props, slideProps[ix]);
    }

    return /*#__PURE__*/React.createElement(MarkdownSlide, _extends({
      key: ix
    }, props), md);
  }), ";");
}; // This HOC is necessary due to the fact that `remark-rehype` transforms _inline
// code_ into <code>...</code>, but _fenced code blocks_ into
// <pre><code>...</code></pre>. (It's also possible that <pre>...</pre> might
// get in there somewhere.) In order to allow the user to theme these
// differently, we detect the latter case and render CodeBlockComponent if
// needed.


exports.MarkdownSlideSet = MarkdownSlideSet;

var MarkdownPreHelper = function MarkdownPreHelper() {
  var PreComponent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pre';
  var CodeInlineComponent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'code';
  var CodeBlockComponent = arguments.length > 2 ? arguments[2] : undefined;
  return function (_ref8) {
    var children = _ref8.children,
        restProps = _objectWithoutProperties(_ref8, ["children"]);

    var pre = /*#__PURE__*/React.createElement(PreComponent, restProps, children);
    if (React.Children.count(children) !== 1) return pre;
    if (children[0].type !== CodeInlineComponent) return pre;
    if (!(0, _reactIs.isValidElementType)(CodeBlockComponent)) return pre; // Edge behavior: when `rehype-react` does its transformations, children are
    // always provided as an array, even if there's only one. We extract it here
    // so there are less surprises for implementers of a code block component.

    var _children$0$props = children[0].props,
        _children$0$props$chi = _slicedToArray(_children$0$props.children, 1),
        rawCode = _children$0$props$chi[0],
        restChildProps = _objectWithoutProperties(_children$0$props, ["children"]);

    return /*#__PURE__*/React.createElement(CodeBlockComponent, _extends({}, restProps, restChildProps), rawCode);
  };
};

exports.MarkdownPreHelper = MarkdownPreHelper;

var MarkdownCodePane = function MarkdownCodePane(_ref9) {
  var className = _ref9.className,
      children = _ref9.children,
      rest = _objectWithoutProperties(_ref9, ["className", "children"]);

  var language = React.useMemo(function () {
    var match;

    if (match = /^language-(.*)$/.exec(className)) {
      return match[1];
    }
  }, [className]);
  return /*#__PURE__*/React.createElement(_codePane.default, _extends({}, rest, {
    language: language
  }), children);
};

exports.MarkdownCodePane = MarkdownCodePane;