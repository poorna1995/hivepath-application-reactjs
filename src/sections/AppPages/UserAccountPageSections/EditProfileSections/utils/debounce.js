let timerId;
export var debounceFunction = function (func, delay) {
  // Cancels the setTimeout method execution
  clearTimeout(timerId);
  // Executes the func after delay time.
  timerId = setTimeout(func, delay);
};
