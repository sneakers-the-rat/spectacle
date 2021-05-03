import { GOTO_FINAL_STEP } from '../hooks/use-deck-state';
import { parse as parseQS, stringify as stringifyQS } from 'query-string';
export function mapLocationToState(location) {
  var queryString = location.search;

  var _parseQS = parseQS(queryString),
      rawSlideIndex = _parseQS.slideIndex,
      rawStepIndex = _parseQS.stepIndex;

  var nextState = {};

  if (rawSlideIndex === undefined) {
    return nextState;
  }

  nextState.slideIndex = Number(rawSlideIndex);

  if (isNaN(nextState.slideIndex)) {
    throw new Error("Invalid slide index in URL query string: '".concat(queryString, "'"));
  }

  if (rawStepIndex === 'final') {
    nextState.stepIndex = GOTO_FINAL_STEP;
  } else if (rawStepIndex !== undefined) {
    nextState.stepIndex = Number(rawStepIndex);

    if (isNaN(nextState.stepIndex)) {
      throw new Error("Invalid step index in URL query string: '".concat(queryString, "'"));
    }
  }

  return nextState;
}
export function mapStateToLocation(state) {
  var slideIndex = state.slideIndex,
      stepIndex = state.stepIndex;
  var query = {};

  if (typeof slideIndex !== 'number') {
    return query;
  }

  query.slideIndex = slideIndex;

  if (typeof stepIndex === 'number') {
    query.stepIndex = stepIndex;
  } else if (stepIndex === GOTO_FINAL_STEP) {
    query.stepIndex = 'final';
  }

  return {
    search: '?' + stringifyQS(query)
  };
}