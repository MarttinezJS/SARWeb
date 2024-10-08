export const convertSecondsToMinutes = (raw: number): string => {
  if (raw <= 60) return `00:${raw < 10 ? `0${raw}` : raw}`;
  const minutes = Math.trunc(raw / 60);
  const seconds = raw - minutes * 60;
  return `${Number.isFinite(minutes) ? minutes : "00"}:${
    seconds > 9 ? "" : "0"
  }${!Number.isNaN(seconds) ? seconds : "0"}`;
};
