export function getFromStorage(key: string, defaultValue: any): any {
    if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key);
        return item !== null ? JSON.parse(item) : defaultValue;
    }
    return defaultValue ?? false;
};

/** Sleep for a given number of milliseconds. This paces the game and gives time for animations and sounds. */
export function sleep(ms: number = 900) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}