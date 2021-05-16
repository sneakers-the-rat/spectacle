"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Deck", {
  enumerable: true,
  get: function get() {
    return _deck.default;
  }
});
Object.defineProperty(exports, "Slide", {
  enumerable: true,
  get: function get() {
    return _slide.default;
  }
});
Object.defineProperty(exports, "SlideContext", {
  enumerable: true,
  get: function get() {
    return _slide.SlideContext;
  }
});
Object.defineProperty(exports, "Appear", {
  enumerable: true,
  get: function get() {
    return _appear.default;
  }
});
Object.defineProperty(exports, "CodePane", {
  enumerable: true,
  get: function get() {
    return _codePane.default;
  }
});
Object.defineProperty(exports, "OrderedList", {
  enumerable: true,
  get: function get() {
    return _typography.OrderedList;
  }
});
Object.defineProperty(exports, "Quote", {
  enumerable: true,
  get: function get() {
    return _typography.Quote;
  }
});
Object.defineProperty(exports, "Heading", {
  enumerable: true,
  get: function get() {
    return _typography.Heading;
  }
});
Object.defineProperty(exports, "ListItem", {
  enumerable: true,
  get: function get() {
    return _typography.ListItem;
  }
});
Object.defineProperty(exports, "UnorderedList", {
  enumerable: true,
  get: function get() {
    return _typography.UnorderedList;
  }
});
Object.defineProperty(exports, "Text", {
  enumerable: true,
  get: function get() {
    return _typography.Text;
  }
});
Object.defineProperty(exports, "Link", {
  enumerable: true,
  get: function get() {
    return _typography.Link;
  }
});
Object.defineProperty(exports, "CodeSpan", {
  enumerable: true,
  get: function get() {
    return _typography.CodeSpan;
  }
});
Object.defineProperty(exports, "Table", {
  enumerable: true,
  get: function get() {
    return _table.Table;
  }
});
Object.defineProperty(exports, "TableCell", {
  enumerable: true,
  get: function get() {
    return _table.TableCell;
  }
});
Object.defineProperty(exports, "TableRow", {
  enumerable: true,
  get: function get() {
    return _table.TableRow;
  }
});
Object.defineProperty(exports, "TableHeader", {
  enumerable: true,
  get: function get() {
    return _table.TableHeader;
  }
});
Object.defineProperty(exports, "TableBody", {
  enumerable: true,
  get: function get() {
    return _table.TableBody;
  }
});
Object.defineProperty(exports, "FlexBox", {
  enumerable: true,
  get: function get() {
    return _layout.FlexBox;
  }
});
Object.defineProperty(exports, "Grid", {
  enumerable: true,
  get: function get() {
    return _layout.Grid;
  }
});
Object.defineProperty(exports, "Box", {
  enumerable: true,
  get: function get() {
    return _layout.Box;
  }
});
Object.defineProperty(exports, "Image", {
  enumerable: true,
  get: function get() {
    return _image.Image;
  }
});
Object.defineProperty(exports, "FullSizeImage", {
  enumerable: true,
  get: function get() {
    return _image.FullSizeImage;
  }
});
Object.defineProperty(exports, "Notes", {
  enumerable: true,
  get: function get() {
    return _notes.default;
  }
});
Object.defineProperty(exports, "Progress", {
  enumerable: true,
  get: function get() {
    return _progress.default;
  }
});
Object.defineProperty(exports, "FullScreen", {
  enumerable: true,
  get: function get() {
    return _fullscreen.default;
  }
});
Object.defineProperty(exports, "Markdown", {
  enumerable: true,
  get: function get() {
    return _markdown.Markdown;
  }
});
Object.defineProperty(exports, "MarkdownSlideSet", {
  enumerable: true,
  get: function get() {
    return _markdown.MarkdownSlideSet;
  }
});
Object.defineProperty(exports, "MarkdownSlide", {
  enumerable: true,
  get: function get() {
    return _markdown.MarkdownSlide;
  }
});
Object.defineProperty(exports, "MarkdownPreHelper", {
  enumerable: true,
  get: function get() {
    return _markdown.MarkdownPreHelper;
  }
});
Object.defineProperty(exports, "SpectacleLogo", {
  enumerable: true,
  get: function get() {
    return _logo.default;
  }
});
Object.defineProperty(exports, "mdxComponentMap", {
  enumerable: true,
  get: function get() {
    return _mdxComponentMapper.default;
  }
});
Object.defineProperty(exports, "removeNotes", {
  enumerable: true,
  get: function get() {
    return _notes2.removeNotes;
  }
});
Object.defineProperty(exports, "isolateNotes", {
  enumerable: true,
  get: function get() {
    return _notes2.isolateNotes;
  }
});
Object.defineProperty(exports, "indentNormalizer", {
  enumerable: true,
  get: function get() {
    return _indentNormalizer.default;
  }
});
Object.defineProperty(exports, "DeckContext", {
  enumerable: true,
  get: function get() {
    return _deck2.DeckContext;
  }
});
Object.defineProperty(exports, "useMousetrap", {
  enumerable: true,
  get: function get() {
    return _useMousetrap.default;
  }
});
Object.defineProperty(exports, "defaultTheme", {
  enumerable: true,
  get: function get() {
    return _defaultTheme.default;
  }
});
Object.defineProperty(exports, "useActionDispatcher", {
  enumerable: true,
  get: function get() {
    return _useActionDispatcher.default;
  }
});
Object.defineProperty(exports, "useAspectRatioFitting", {
  enumerable: true,
  get: function get() {
    return _useAspectRatioFitting.default;
  }
});
Object.defineProperty(exports, "useAutofillHeight", {
  enumerable: true,
  get: function get() {
    return _useAutofillHeight.default;
  }
});
Object.defineProperty(exports, "useBroadcastChannel", {
  enumerable: true,
  get: function get() {
    return _useBroadcastChannel.default;
  }
});
Object.defineProperty(exports, "useDeckReducer", {
  enumerable: true,
  get: function get() {
    return _useDeckState.default;
  }
});
Object.defineProperty(exports, "GOTO_FINAL_STEP", {
  enumerable: true,
  get: function get() {
    return _useDeckState.GOTO_FINAL_STEP;
  }
});
Object.defineProperty(exports, "useToggleFullScreen", {
  enumerable: true,
  get: function get() {
    return _useFullScreen.useToggleFullScreen;
  }
});
Object.defineProperty(exports, "useKeyboardControls", {
  enumerable: true,
  get: function get() {
    return _useKeyboardControls.default;
  }
});
Object.defineProperty(exports, "useLocationSync", {
  enumerable: true,
  get: function get() {
    return _useLocationSync.default;
  }
});
Object.defineProperty(exports, "usePresentation", {
  enumerable: true,
  get: function get() {
    return _usePresentation.default;
  }
});
Object.defineProperty(exports, "useTouchControls", {
  enumerable: true,
  get: function get() {
    return _useTouchControls.default;
  }
});
Object.defineProperty(exports, "useSlide", {
  enumerable: true,
  get: function get() {
    return _useSlides.useSlide;
  }
});
Object.defineProperty(exports, "useCollectSlides", {
  enumerable: true,
  get: function get() {
    return _useSlides.useCollectSlides;
  }
});
Object.defineProperty(exports, "useSteps", {
  enumerable: true,
  get: function get() {
    return _useSteps.useSteps;
  }
});
Object.defineProperty(exports, "useCollectSteps", {
  enumerable: true,
  get: function get() {
    return _useSteps.useCollectSteps;
  }
});

var _deck = _interopRequireDefault(require("./components/deck"));

var _slide = _interopRequireWildcard(require("./components/slide/slide"));

var _appear = _interopRequireDefault(require("./components/appear"));

var _codePane = _interopRequireDefault(require("./components/code-pane"));

var _typography = require("./components/typography");

var _table = require("./components/table");

var _layout = require("./components/layout");

var _image = require("./components/image");

var _notes = _interopRequireDefault(require("./components/notes"));

var _progress = _interopRequireDefault(require("./components/progress"));

var _fullscreen = _interopRequireDefault(require("./components/fullscreen"));

var _markdown = require("./components/markdown/markdown");

var _logo = _interopRequireDefault(require("./components/logo"));

var _mdxComponentMapper = _interopRequireDefault(require("./utils/mdx-component-mapper"));

var _notes2 = require("./utils/notes");

var _indentNormalizer = _interopRequireDefault(require("./utils/indent-normalizer"));

var _deck2 = require("./components/deck/deck");

var _useMousetrap = _interopRequireDefault(require("./hooks/use-mousetrap"));

var _defaultTheme = _interopRequireDefault(require("./theme/default-theme"));

var _useActionDispatcher = _interopRequireDefault(require("./hooks/use-action-dispatcher"));

var _useAspectRatioFitting = _interopRequireDefault(require("./hooks/use-aspect-ratio-fitting"));

var _useAutofillHeight = _interopRequireDefault(require("./hooks/use-autofill-height"));

var _useBroadcastChannel = _interopRequireDefault(require("./hooks/use-broadcast-channel"));

var _useDeckState = _interopRequireWildcard(require("./hooks/use-deck-state"));

var _useFullScreen = require("./hooks/use-full-screen");

var _useKeyboardControls = _interopRequireDefault(require("./hooks/use-keyboard-controls"));

var _useLocationSync = _interopRequireDefault(require("./hooks/use-location-sync"));

var _usePresentation = _interopRequireDefault(require("./hooks/use-presentation"));

var _useTouchControls = _interopRequireDefault(require("./hooks/use-touch-controls"));

var _useSlides = require("./hooks/use-slides");

var _useSteps = require("./hooks/use-steps");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }