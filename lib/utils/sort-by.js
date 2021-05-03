"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortByKeyComparator;

function sortByKeyComparator(key) {
  return function (lhs, rhs) {
    if (lhs[key] < rhs[key]) {
      return -1;
    } else if (lhs[key] > rhs[key]) {
      return 1;
    }

    return 0;
  };
}