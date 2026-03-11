export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  return new Date(dateString).toLocaleDateString("en-US", options);
}

export function getDurationString(
  startDate: string,
  endDate: string,
  present: boolean
): string {
  const start = new Date(startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
  const end = present
    ? "Present"
    : new Date(endDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
  return `${start} — ${end}`;
}
