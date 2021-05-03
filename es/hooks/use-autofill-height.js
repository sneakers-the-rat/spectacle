import * as React from 'react';

var getNodeFullHeight = function getNodeFullHeight(node) {
  var style = getComputedStyle(node);
  var nextSiblingMarginTop = 0;

  if (node.nextSibling) {
    nextSiblingMarginTop = parseFloat(getComputedStyle(node.nextSibling).marginTop);
  }

  var height = node.offsetHeight + parseFloat(style.marginTop) - nextSiblingMarginTop + parseFloat(style.marginBottom);
  return height;
};

var isCurrentNodeAutoFill = function isCurrentNodeAutoFill(current) {
  return current.classList.contains('spectacle-auto-height-fill') || current.tagName.toLowerCase().includes('pre') && current.childNodes && current.childNodes[0].classList.contains('spectacle-auto-height-fill');
};

export default function useAutofillHeight(_ref) {
  var slideWrapperRef = _ref.slideWrapperRef,
      contentRef = _ref.contentRef,
      templateRef = _ref.templateRef,
      slideHeight = _ref.slideHeight;
  React.useLayoutEffect(function () {
    if (!contentRef.current.hasChildNodes()) {
      return;
    }

    var childNodes = [].slice.call(contentRef.current.childNodes);
    var metrics = childNodes.reduce(function (memo, current) {
      var currentNodeIsAutoFill = isCurrentNodeAutoFill(current);
      var nodeHeight = currentNodeIsAutoFill ? 0 : getNodeFullHeight(current);
      return {
        totalHeight: nodeHeight + memo.totalHeight,
        numberAutoFills: currentNodeIsAutoFill ? memo.numberAutoFills + 1 : memo.numberAutoFills
      };
    }, {
      totalHeight: 0,
      autoFillsHeight: 0,
      numberAutoFills: 0
    });

    if (templateRef.current.hasChildNodes()) {
      var templateChildNodes = [].slice.call(templateRef.current.childNodes);
      metrics.templateHeight = templateChildNodes.reduce(function (memo, current) {
        return memo + getNodeFullHeight(current);
      }, 0);
    } else {
      metrics.templateHeight = 0;
    }

    var slideWrapperStyle = getComputedStyle(slideWrapperRef.current);
    var totalSlideSpace = slideHeight - (parseFloat(slideWrapperStyle.paddingTop) + parseFloat(slideWrapperStyle.paddingBottom));
    var emptySpace = totalSlideSpace - (metrics.totalHeight + metrics.templateHeight);
    childNodes.forEach(function (node) {
      if (!isCurrentNodeAutoFill(node)) {
        return;
      }

      if (node.childNodes[0] && node.childNodes[0].tagName.toLowerCase() === 'pre') {
        node = node.childNodes[0];
      }

      node.style.maxHeight = "".concat(emptySpace / metrics.numberAutoFills, "px");
    });
  }, [slideWrapperRef, contentRef, templateRef, slideHeight]);
}