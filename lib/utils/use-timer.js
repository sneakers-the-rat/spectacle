"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTimer = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useTimer = function useTimer(handler, period, isActive) {
  var _React$useState = _react.default.useState(1),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      timeDelay = _React$useState2[0],
      setTimeDelay = _React$useState2[1];

  var initialTime = _react.default.useRef();

  var callBack = _react.default.useRef();

  _react.default.useEffect(function () {
    callBack.current = handler;
  }, [handler]); // eslint-disable-next-line consistent-return


  _react.default.useEffect(function () {
    if (isActive) {
      initialTime.current = new Date().getTime();
      var timer = setInterval(function () {
        var currentTime = new Date().getTime();
        var delay = currentTime - initialTime.current;
        initialTime.current = currentTime;
        setTimeDelay(delay / 1000);
        callBack.current(timeDelay);
      }, period);
      return function () {
        clearInterval(timer);
      };
    }
  }, [period, isActive, timeDelay]);
};

exports.useTimer = useTimer;