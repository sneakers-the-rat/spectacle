function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import * as React from 'react';
import Mousetrap from 'mousetrap';
/*
 * Hook for binding functions to keyboard bindings. Will throw an error if the
 * value of the keybind combination is not a function.
 */

export default function useMousetrap(keybinds, deps) {
  React.useEffect(function () {
    for (var combo in keybinds) {
      var callback = keybinds[combo];

      if (typeof callback !== 'function') {
        throw new TypeError("Expected type 'function' in useMousetrap for combo '".concat(combo, "', but got ").concat(_typeof(callback)));
      }

      Mousetrap.bind(combo, callback);
    }

    return function () {
      for (var _combo in keybinds) {
        Mousetrap.unbind(_combo);
      }
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keybinds].concat(_toConsumableArray(deps)));
}