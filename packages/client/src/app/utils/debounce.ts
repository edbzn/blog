export function debounce(func: Function, wait: number, immediate = false) {
  let timeout: number | undefined;

  return function(this: any) {
    const args = arguments;
    const later = () => {
      timeout = undefined;
      if (!immediate) {
        func.apply(this, args);
      }
    };

    const callNow = immediate && !timeout;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);

    if (callNow) {
      func.apply(this, args);
    }
  };
}
