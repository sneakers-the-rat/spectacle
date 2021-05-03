import * as React from 'react';

function identity(sender) {
  return sender;
}
/*
 * Wrapper for react dispatch function. The third argument is an optional
 * function to identify the dispatcher i.e. { slide: 1, step: 2 }
 */


export default function useActionDispatcher(dispatch, type) {
  var payloadCreator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : identity;
  var dispatcher = React.useCallback(function () {
    dispatch({
      type: type,
      payload: payloadCreator.apply(void 0, arguments)
    });
  }, [dispatch, type, payloadCreator]);
  return dispatcher;
}