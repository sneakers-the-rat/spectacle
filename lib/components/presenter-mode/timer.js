"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = void 0;

var _react = _interopRequireDefault(require("react"));

var _useTimer = require("../../utils/use-timer");

var _ = require("../../");

var _internalButton = _interopRequireDefault(require("../internal-button"));

var _constants = require("../../utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Timer = function Timer() {
  var _React$useState = _react.default.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      timer = _React$useState2[0],
      setTimer = _React$useState2[1];

  var _React$useState3 = _react.default.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      timerStarted = _React$useState4[0],
      setTimerStarted = _React$useState4[1];

  var addToTimer = _react.default.useCallback(function (v) {
    return setTimer(function (s) {
      return s + v;
    });
  }, []);

  (0, _useTimer.useTimer)(addToTimer, 1000, timerStarted);
  var minutes = Math.floor(timer.toFixed(0) / 60);
  return /*#__PURE__*/_react.default.createElement(_.FlexBox, null, /*#__PURE__*/_react.default.createElement(_.FlexBox, {
    justifyContent: "flex-start",
    flex: 1
  }, /*#__PURE__*/_react.default.createElement(_.Text, {
    fontFamily: _constants.SYSTEM_FONT,
    fontWeight: "bold",
    fontSize: "2vw",
    textAlign: "left"
  }, "".concat(String(minutes).padStart(2, '0'), ":").concat(String(timer.toFixed(0) - minutes * 60).padStart(2, '0')))), /*#__PURE__*/_react.default.createElement(_internalButton.default, {
    onClick: function onClick() {
      return setTimerStarted(function (s) {
        return !s;
      });
    }
  }, timerStarted ? 'Stop Timer' : 'Start Timer'), /*#__PURE__*/_react.default.createElement(_.Box, {
    width: 8
  }), /*#__PURE__*/_react.default.createElement(_internalButton.default, {
    onClick: function onClick() {
      return setTimer(0);
    }
  }, "Reset"));
};

exports.Timer = Timer;