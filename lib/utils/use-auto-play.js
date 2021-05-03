"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAutoPlay = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var useAutoPlay = function useAutoPlay(options) {
  var _options$enabled = options.enabled,
      enabled = _options$enabled === void 0 ? false : _options$enabled,
      _options$loop = options.loop,
      loop = _options$loop === void 0 ? false : _options$loop,
      navigation = options.navigation,
      _options$interval = options.interval,
      interval = _options$interval === void 0 ? 1000 : _options$interval;
  var savedCallback = (0, React.useRef)(function () {
    if (navigation.isFinalSlide && loop) {
      navigation.skipTo({
        slideIndex: 0,
        stepIndex: 0
      });
    } else {
      navigation.stepForward();
    }
  });
  (0, React.useEffect)(function () {
    if (enabled) {
      var id = setInterval(savedCallback.current, interval);
      return function () {
        return clearInterval(id);
      };
    }
  }, [enabled, interval]);
};

exports.useAutoPlay = useAutoPlay;