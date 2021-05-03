import { useEffect, useRef } from 'react';
import * as React from 'react';
export var useAutoPlay = function useAutoPlay(options) {
  var _options$enabled = options.enabled,
      enabled = _options$enabled === void 0 ? false : _options$enabled,
      _options$loop = options.loop,
      loop = _options$loop === void 0 ? false : _options$loop,
      navigation = options.navigation,
      _options$interval = options.interval,
      interval = _options$interval === void 0 ? 1000 : _options$interval;
  var savedCallback = useRef(function () {
    if (navigation.isFinalSlide && loop) {
      navigation.skipTo({
        slideIndex: 0,
        stepIndex: 0
      });
    } else {
      navigation.stepForward();
    }
  });
  useEffect(function () {
    if (enabled) {
      var id = setInterval(savedCallback.current, interval);
      return function () {
        return clearInterval(id);
      };
    }
  }, [enabled, interval]);
};