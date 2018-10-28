export function debounce(func: Function, wait: number, immediate = false) {
  let timeout: any;

  return function(this: any) {
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(this, args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(this, args);
    }
  };
}
