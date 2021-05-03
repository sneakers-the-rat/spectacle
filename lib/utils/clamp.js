"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFiniteNumber = toFiniteNumber;
exports.default = clamp;

function toFiniteNumber(value) {
  if (!value || isNaN(value)) {
    return 0;
  } else if (value === Infinity || value === -Infinity) {
    var sign = value < 0 ? -1 : 1;
    return sign * Number.MAX_SAFE_INTEGER;
  }

  return value;
}

function clamp(number, lower, upper) {
  if (isNaN(number)) {
    return NaN;
  }

  var finiteNumber = toFiniteNumber(number);

  if (finiteNumber === finiteNumber) {
    if (upper !== undefined) {
      finiteNumber = finiteNumber <= upper ? finiteNumber : upper;
    }

    if (lower !== undefined) {
      finiteNumber = finiteNumber >= lower ? finiteNumber : lower;
    }
  }

  return finiteNumber;
}