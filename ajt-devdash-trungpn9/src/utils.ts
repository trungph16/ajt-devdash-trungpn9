export function debounce(
  callback: () => void,
  delay: number
): () => void {
  let timeoutId: number;

  return (): void => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback();
    }, delay);
  };
}