"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slide = exports.opacity = void 0;
var opacity = {
  from: {
    opacity: 0
  },
  enter: {
    opacity: 1
  },
  leave: {
    opacity: 0
  }
};
exports.opacity = opacity;
var slide = {
  from: {
    transform: 'translate(100%, 0%)'
  },
  enter: {
    transform: 'translate(0%, 0%)'
  },
  leave: {
    transform: 'translate(-100%, 0%)'
  }
};
exports.slide = slide;