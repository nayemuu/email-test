export const debounceHandler = (fn, delay) => {
  let timeoutId;
  return (event) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(event);
    }, delay);
  };
};
