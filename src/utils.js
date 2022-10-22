/** @type {(time: number) => string} */
export const fmtTimeDelta = (time) => {
  // time is ms
  const seconds = Math.floor(time / 1000);
  const hundredths = `${time % 100}`;
  return `${seconds}.${hundredths.padEnd(2, '0')}`;
};
