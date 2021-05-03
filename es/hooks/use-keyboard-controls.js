import React from 'react';
import debounce from '../utils/debounce';
import { useToggleFullScreen } from './use-full-screen';
import { isWindows, isMacOS, isLinux } from '../utils/detect-platform';

var useKeyboardControls = function useKeyboardControls(_ref) {
  var _ref$keyboardControls = _ref.keyboardControls,
      keyboardControls = _ref$keyboardControls === void 0 ? 'arrows' : _ref$keyboardControls,
      navigateToNext = _ref.navigateToNext,
      navigateToPrevious = _ref.navigateToPrevious,
      toggleMode = _ref.toggleMode;
  var keyPressCount = React.useRef(0);
  var toggleFullScreen = useToggleFullScreen();
  React.useEffect(function () {
    // Keep track of the number of next slide presses for debounce
    // Create ref for debounceing function
    var debouncedDispatch = debounce(function () {
      var immediate = keyPressCount.current !== 1;
      navigateToNext({
        immediate: immediate
      });
      keyPressCount.current = 0;
    }, 200);

    function handleKeyDown(e) {
      if (keyboardControls === 'arrows') {
        if (e.key === 'ArrowLeft') {
          navigateToPrevious();
        }

        if (e.key === 'ArrowRight') {
          keyPressCount.current++;
          debouncedDispatch();
        }
      }

      if (keyboardControls === 'space') {
        if (e.code === 'Space') {
          keyPressCount.current++;
          debouncedDispatch();
          e.preventDefault();
        }
      }

      if (e.altKey && isMacOS()) {
        var key = e.key.toLowerCase();

        switch (key) {
          case 'ø':
            toggleMode('overviewMode');
            break;

          case 'π':
            toggleMode('presenterMode');
            break;

          case 'ƒ':
            toggleFullScreen();
            break;

          default:
            null;
        }
      } else if (e.altKey && (isWindows() || isLinux())) {
        var _key = e.key.toUpperCase();

        switch (_key) {
          case 'O':
            toggleMode('overviewMode');
            break;

          case 'P':
            toggleMode('presenterMode');
            break;

          case 'F':
            toggleFullScreen();
            break;

          default:
            null;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return function () {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyboardControls, navigateToNext, navigateToPrevious, toggleFullScreen, toggleMode]);
};

export default useKeyboardControls;