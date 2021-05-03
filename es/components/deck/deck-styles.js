export function overviewFrameStyle(_ref) {
  var overviewScale = _ref.overviewScale,
      nativeSlideWidth = _ref.nativeSlideWidth,
      nativeSlideHeight = _ref.nativeSlideHeight;
  return {
    margin: '1rem',
    width: "".concat(overviewScale * nativeSlideWidth, "px"),
    height: "".concat(overviewScale / (nativeSlideWidth / nativeSlideHeight) * nativeSlideWidth, "px"),
    display: 'block',
    transform: 'none',
    position: 'relative'
  };
}
export function overviewWrapperStyle(_ref2) {
  var overviewScale = _ref2.overviewScale;
  return {
    width: "".concat(100 / overviewScale, "%"),
    height: "".concat(100 / overviewScale, "%"),
    transform: "scale(".concat(overviewScale, ")"),
    transformOrigin: '0px 0px',
    position: 'absolute'
  };
}
export function printFrameStyle(_ref3) {
  var nativeSlideWidth = _ref3.nativeSlideWidth,
      nativeSlideHeight = _ref3.nativeSlideHeight,
      printScale = _ref3.printScale;
  return {
    margin: 0,
    width: "".concat(printScale * nativeSlideWidth, "px"),
    height: "".concat(printScale / (nativeSlideWidth / nativeSlideHeight) * nativeSlideWidth, "px"),
    display: 'block',
    transform: 'none',
    position: 'relative',
    breakAfter: 'page'
  };
}
export function printWrapperStyle(_ref4) {
  var printScale = _ref4.printScale;
  return {
    width: "".concat(100 / printScale, "%"),
    height: "".concat(100 / printScale, "%"),
    transform: "scale(".concat(printScale, ")"),
    transformOrigin: '0px 0px',
    position: 'absolute'
  };
}