import { isAxiosError } from "axios";

export const filterError = (err: unknown): string => {
  const def = "Something went wrong";

  return isAxiosError(err)
    ? err.response?.data?.error ?? err.response?.data ?? def
    : def;
};

export function formatDate(dateInput: string | Date) {
  const date = new Date(dateInput);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  // const year = date.getFullYear();
  return `${day}/${month}`;
}
