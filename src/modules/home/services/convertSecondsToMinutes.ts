export const convertSecondsToMinutes = (raw: number): string => {
  if (raw <= 60) return raw.toString();
  const minutes = Math.trunc(raw / 60);
  const seconds = raw - minutes * 60;
  return `${minutes}:${seconds > 9 ? "" : "0"}${seconds}`;
};
