"use client";

import { home } from "@/content/home";
import { formatTime, getClosure, isoDays, schedule, weekdays } from "@/lib/hours";
import { useBrusselsTime } from "@/lib/use-brussels-time";

export function HoursTable() {
  const now = useBrusselsTime();
  return (
    <table className="w-full border-t border-ink" aria-label="Openingsuren">
      <tbody>
        {isoDays.map((day) => {
          const isToday = now?.isoDay === day;
          const closure = isToday ? getClosure(now.date) : undefined;
          const ranges = schedule[day];
          return (
            <tr key={day} aria-current={isToday ? "date" : undefined} className={`border-b border-rule ${isToday ? "bg-tint font-semibold" : ""}`}>
              <th scope="row" className={`p-3 text-left text-base ${isToday ? "font-semibold" : "font-normal"}`}>{weekdays[day]}</th>
              <td className="p-3 text-right font-mono text-sm">
                {closure ? home.status.closedForHoliday.replace("{label}", closure.label) : ranges.length ? ranges.map(([open, close]) => `${formatTime(open)}${home.hours.timeSeparator}${formatTime(close)}`).join(home.hours.rangeSeparator) : home.hours.closedLabel}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
