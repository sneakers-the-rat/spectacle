import React from 'react';
/**
 * Hook that navigates to next or previous slide when the user swipes
 * left or right in a touch device, where there is no keyboard.
 */

var useTouchControls = function useTouchControls(_ref) {
  var navigateToNext = _ref.navigateToNext,
      navigateToPrevious = _ref.navigateToPrevious;
  var touchId = React.useRef(null); // To keep track of which touch started the swipe.

  var startTouchX = React.useRef(0); // Where the swipe started.

  var threshold = 100; // Pixels the user must drag to trigger a slide swipe.

  React.useEffect(function () {
    /**
     * Keep track of which touch even we're following.
     */
    function handleTouchStart(e) {
      if (touchId.current === null) {
        var touch = e.changedTouches[0];
        touchId.current = touch.identifier;
        startTouchX.current = touch.clientX;
      }
    }
    /**
     * Only care about the touch we're tracking.
     * See how much the user swiped, if it's more than
     * the threshold, navigate to the previous or next slide.
     */


    function handleTouchEnd(e) {
      var touchList = e.changedTouches;

      for (var i = 0; i < touchList.length; i++) {
        var touch = touchList[i];

        if (touch.identifier === touchId.current) {
          touchId.current = null;
          var distance = touch.clientX - startTouchX.current;

          if (distance > threshold) {
            navigateToPrevious();
          } else if (distance < -threshold) {
            navigateToNext();
          }

          break;
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return function () {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigateToNext, navigateToPrevious]);
};

export default useTouchControls;