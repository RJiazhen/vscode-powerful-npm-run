/**
 * @description: debounce function
 * @author: Ruan Jiazhen
 * @date: 2024-09-01 15:36:47
 **/

/**
 * @description: debounce function
 * @param func - function to be debounced
 * @param wait - wait time in milliseconds, default is 300ms
 * @return debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300,
) {
  let timeout: any;
  return function (...args: Parameters<T>): ReturnType<T> | void {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
    }, wait);
  };
}
