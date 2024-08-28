export const formatDate = (value: string | undefined): string => {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  return date.toLocaleDateString();
};
