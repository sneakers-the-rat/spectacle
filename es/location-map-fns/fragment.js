import { GOTO_FINAL_STEP } from '../hooks/use-deck-state'; // Parse url fragments of the format "<slideIndex>[:<stepIndex>]"

export function mapLocationToState(location) {
  var fragmentId = location.hash;
  var nextState = {};
  var match = /^#([^:]+)(:(.+))$/.exec(fragmentId);

  if (!match) {
    return nextState;
  }

  nextState.immediate = true;
  nextState.slideIndex = Number(match[1]);

  if (isNaN(slideIndex)) {
    throw new Error("Invalid slide index in URL fragment identifier: '".concat(fragmentId, "'"));
  }

  if (match[3] === 'final') {
    nextState.stepIndex = GOTO_FINAL_STEP;
  } else if (match[3] !== undefined) {
    nextState.stepIndex = Number(match[3]);

    if (isNaN(nextState.stepIndex)) {
      throw new Error("Invalid step index in URL fragment identifier: '".concat(fragmentId, "'"));
    }
  }

  return nextState;
} // Create url fragments in the format described above

export function mapStateToLocation(state) {
  var slideIndex = state.slideIndex,
      stepIndex = state.stepIndex;

  if (typeof slideIndex !== 'number') {
    return {};
  }

  var fragmentId = String(slideIndex);

  if (typeof stepIndex === 'number') {
    fragmentId += ':';
    fragmentId += String(stepIndex);
  } else if (stepIndex === GOTO_FINAL_STEP) {
    fragmentId += ':final';
  } else {// TODO: should we throw an exception here?
  }

  return {
    hash: fragmentId
  };
}