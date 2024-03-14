export function formatDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startMonth = start.toLocaleString("default", { month: "short" });
  const endMonth = end.toLocaleString("default", { month: "short" });

  const formattedStartDate = `${startMonth} ${start.getDate()}`;
  const formattedEndDate = `${endMonth} ${end.getDate()}`;

  return { startDate: formattedStartDate, endDate: formattedEndDate };
}
export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export function formatCustomDate(dateString) {
  const formattedDate = formatDate(dateString);
  const parts = formattedDate.split(" ");

  const data = { day: parts[0], month: parts[1], date: parts[2] };
  return data;
}

function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const suffix = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes}${suffix}`;
}

function getDateObject(dateString, startTime, endTime) {
  const date = new Date(dateString);
  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const formattedDate = date.toLocaleDateString("en-US", { day: "2-digit" });
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  return {
    day,
    month,
    date: formattedDate,
    startTime: formattedStartTime,
    endTime: formattedEndTime,
  };
}

export function DateAndTime(date, timeSlots) {
  const firstSlot = timeSlots[0];
  const lastSlot = timeSlots[timeSlots.length - 1];

  const dateObject = getDateObject(date, firstSlot.slot, lastSlot.slot);

  return dateObject;
}
