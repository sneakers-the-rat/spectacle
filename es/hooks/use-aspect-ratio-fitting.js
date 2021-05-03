function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import * as React from 'react';
import useResizeObserver from 'use-resize-observer'; // Returns an offset and scaling factor which, when applied to `element`, will
// make it properly fit into `container` at the given aspect ratio.

export default function useAspectRatioFitting(_ref) {
  var _ref$targetWidth = _ref.targetWidth,
      targetWidth = _ref$targetWidth === void 0 ? 1366 : _ref$targetWidth,
      _ref$targetHeight = _ref.targetHeight,
      targetHeight = _ref$targetHeight === void 0 ? 768 : _ref$targetHeight;
  var containerRef = React.useRef();

  var _React$useState = React.useState(1),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      scaleFactor = _React$useState2[0],
      setScaleFactor = _React$useState2[1];

  var _React$useState3 = React.useState({
    x: 0,
    y: 0
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      transformOrigin = _React$useState4[0],
      setTransformOrigin = _React$useState4[1];

  var recalculate = React.useCallback(function (_ref2) {
    var containerWidth = _ref2.width,
        containerHeight = _ref2.height;
    var containerRatio = containerWidth / containerHeight;
    var targetRatio = targetWidth / targetHeight;
    var useVertical = containerRatio > targetRatio;
    var scaleFactor = useVertical ? containerHeight / targetHeight : containerWidth / targetWidth;
    var scaledWidth = targetWidth * scaleFactor;
    var scaledHeight = targetHeight * scaleFactor;
    var x0 = 0;

    if (useVertical) {
      x0 = 0.5 * (containerWidth - scaledWidth);
      x0 /= 1 - scaleFactor;
    }

    var y0 = 0;

    if (!useVertical) {
      y0 = 0.5 * (containerHeight - scaledHeight);
      y0 /= 1 - scaleFactor;
    }

    setScaleFactor(scaleFactor);
    setTransformOrigin({
      x: x0,
      y: y0
    });
  }, [targetWidth, targetHeight]); // recalculate sizes on the initial pass, and each time the target size
  // changes. (our measurements aren't as accurate as `useResizeObserver`, but
  // we only need to get them close because it'll do them again anyways.)

  React.useEffect(function () {
    if (!containerRef || !containerRef.current) return;
    var rects = containerRef.current.getClientRects();
    recalculate(rects[0]);
  }, [targetWidth, targetHeight, recalculate]);
  useResizeObserver({
    ref: containerRef,
    onResize: recalculate
  });
  var styles = {
    position: 'relative',
    width: targetWidth,
    height: targetHeight,
    scaleFactor: scaleFactor,
    transform: "scale(".concat(scaleFactor, ")"),
    transformOrigin: "".concat(transformOrigin.x, "px ").concat(transformOrigin.y, "px")
  };
  return [containerRef, styles];
}