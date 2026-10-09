import { home } from "../content/home";

export type IsoDay = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type TimeRange = readonly [open: number, close: number];
export type Closure = { from: string; to: string; label: string };
export type BrusselsTime = { date: string; isoDay: IsoDay; minutes: number };

export const schedule: Readonly<Record<IsoDay, readonly TimeRange[]>> = {
  1: [[540, 720], [780, 1080]],
  2: [[540, 720], [780, 1080]],
  3: [[540, 720], [780, 1080]],
  4: [[540, 720], [780, 1080]],
  5: [[540, 720], [780, 1080]],
  6: [[540, 720]],
  7: [],
};

export const weekdays: Readonly<Record<IsoDay, string>> = {
  1: "Maandag", 2: "Dinsdag", 3: "Woensdag", 4: "Donderdag",
  5: "Vrijdag", 6: "Zaterdag", 7: "Zondag",
};
export const isoDays: readonly IsoDay[] = [1, 2, 3, 4, 5, 6, 7];
// TODO(client): confirm holiday periods. Date bounds are inclusive in Brussels.
export const closures: readonly Closure[] = [];

const brusselsFormatter = new Intl.DateTimeFormat("nl-BE", {
  timeZone: home.hours.timezone, year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", hourCycle: "h23",
});

export function getNowInBrussels(now: Date = new Date()): BrusselsTime {
  const parts = Object.fromEntries(brusselsFormatter.formatToParts(now).map(({ type, value }) => [type, value]));
  const date = `${parts.year}-${parts.month}-${parts.day}`;
  const weekday = new Date(`${date}T12:00:00Z`).getUTCDay();
  return { date, isoDay: (weekday || 7) as IsoDay, minutes: Number(parts.hour) * 60 + Number(parts.minute) };
}

export function formatTime(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

export function getClosure(date: string, holidayClosures = closures): Closure | undefined {
  return holidayClosures.find(({ from, to }) => date >= from && date <= to);
}

export function getOpenStatus(now: BrusselsTime, holidayClosures = closures): { open: boolean; label: string } {
  const closure = getClosure(now.date, holidayClosures);
  if (closure) return { open: false, label: home.status.closedForHoliday.replace("{label}", closure.label) };

  for (const [open, close] of schedule[now.isoDay]) {
    if (now.minutes < open) return { open: false, label: home.status.opensToday.replace("{time}", formatTime(open)) };
    if (now.minutes < close) return { open: true, label: home.status.openUntil.replace("{time}", formatTime(close)) };
  }

  // Move by calendar dates, independent of UTC offsets and daylight-saving changes.
  const nextDate = new Date(`${now.date}T12:00:00Z`);
  for (let offset = 1; offset <= 370; offset++) {
    nextDate.setUTCDate(nextDate.getUTCDate() + 1);
    const date = nextDate.toISOString().slice(0, 10);
    const day = (nextDate.getUTCDay() || 7) as IsoDay;
    const firstRange = schedule[day][0];
    if (!firstRange || getClosure(date, holidayClosures)) continue;
    const template = offset === 1 ? home.status.opensTomorrow : home.status.opensOnDay;
    return { open: false, label: template.replace("{Day}", weekdays[day]).replace("{time}", formatTime(firstRange[0])) };
  }
  return { open: false, label: home.hours.closedLabel };
}
