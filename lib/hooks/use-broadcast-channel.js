"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useBroadcastChannel;

var React = _interopRequireWildcard(require("react"));

var _ulid = require("ulid");

var _broadcastChannel = require("broadcast-channel");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var noop = function noop() {};

var BroadcastChannel = window.BroadcastChannel || _broadcastChannel.BroadcastChannel;

function useBroadcastChannel(channelName) {
  var onMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var deps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var _React$useState = React.useState(function () {
    return (0, _ulid.ulid)();
  }),
      _React$useState2 = _slicedToArray(_React$useState, 1),
      broadcasterId = _React$useState2[0];

  var _React$useState3 = React.useState(function () {
    return new BroadcastChannel(channelName);
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      channel = _React$useState4[0],
      setChannel = _React$useState4[1];

  React.useEffect(function () {
    if (channel.name !== channelName) {
      setChannel(function () {
        return new BroadcastChannel(channelName);
      });
    }

    return function () {
      channel.close();
    };
  }, [channel, channelName]);
  var postMessage = React.useCallback(function (type) {
    var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var message = {
      type: type,
      payload: payload,
      meta: {
        sender: broadcasterId
      }
    };
    var rawMessage = JSON.stringify(message);
    channel.postMessage(rawMessage);
  }, [channel, broadcasterId]); // Avoid constantly modifying the 'message' listener in the effect below

  var userMessageHandlerRef = React.useRef(onMessage);
  React.useEffect(function () {
    userMessageHandlerRef.current = onMessage; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [].concat(_toConsumableArray(deps), [postMessage]));
  React.useEffect(function () {
    if (!channel) return;

    var messageHandler = function messageHandler(event) {
      var rawMessage = event.data;
      var message = JSON.parse(rawMessage);
      userMessageHandlerRef.current(message, postMessage);
    };

    channel.addEventListener('message', messageHandler);
    return function () {
      channel.removeEventListener('message', messageHandler);
    };
  }, [channel, postMessage]);
  return [postMessage, broadcasterId];
}