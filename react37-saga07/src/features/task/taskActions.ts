// Action type constants
export const START_TASK = "START_TASK";
export const CANCEL_TASK = "CANCEL_TASK";

// Action creators
export const startTask = () => ({
  type: START_TASK,
});

export const cancelTask = () => ({
  type: CANCEL_TASK,
});
