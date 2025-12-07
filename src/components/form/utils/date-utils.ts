export const MONTH_NAMES_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MONTH_NAMES_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getOrdinalSuffix = (num: number): string => {
  if (num > 3 && num < 21) return "th";
  return ["th", "st", "nd", "rd"][num % 10] || "th";
};

export interface FormatDateOptions {
  shortMonth?: boolean;
  shortYear?: boolean;
}

export const formatDate = (
  dateString: string | undefined,
  options: FormatDateOptions = {},
): string | undefined => {
  const { shortMonth = false, shortYear = false } = options;
  
  if (!dateString) return undefined;
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return undefined;
  
  const day = date.getDate();
  const month = (shortMonth ? MONTH_NAMES_SHORT : MONTH_NAMES_LONG)[date.getMonth()];
  const year = shortYear ? date.getFullYear() % 100 : date.getFullYear();
  
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

