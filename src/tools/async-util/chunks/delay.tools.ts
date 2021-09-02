export const delay = async (timeMs: number) =>
  new Promise(r => setTimeout(r, timeMs))
