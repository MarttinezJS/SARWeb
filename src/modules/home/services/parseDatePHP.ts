export const parseDatePHP = (date: Date): string => {
  const parsedDate = date.toLocaleDateString().split("/").reverse().join("-");
  return `${parsedDate} ${date.toLocaleTimeString(undefined, {
    hour12: false,
  })}`;
};
