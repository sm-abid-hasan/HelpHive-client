
export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}


export function toInputDate(isoDate) {
  return new Date(isoDate).toISOString().slice(0, 10);
}

function toInputString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayInputDate() {
  return toInputString(new Date());
}

export function tomorrowInputDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return toInputString(date);
}


export function isPastEvent(isoDate) {
  const now = new Date();
  const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return new Date(isoDate).getTime() < todayUTC;
}


export function getSafeRedirect(path) {
  if (path && path.startsWith("/") && !path.startsWith("//")) return path;
  return "/";
}
