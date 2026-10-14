"use client";

import { home } from "@/content/home";
import { formatTime, getClosure, isoDays, schedule, weekdays } from "@/lib/hours";
import { useBrusselsTime } from "@/lib/use-brussels-time";

export function HoursTable() {
  const now = useBrusselsTime();
  return (
    <table className="-my-[2px] w-full border-separate border-spacing-x-0 border-spacing-y-[2px] text-[13px] leading-[normal] min-[400px]:text-base lg:max-[1400px]:text-sm" aria-label="Openingsuren">
      <tbody>
        {isoDays.map(day => {
          const isToday = now?.isoDay === day;
          const closure = isToday ? getClosure(now.date) : undefined;
          const ranges = schedule[day];
          return (
            <tr key={day} aria-current={isToday ? "date" : undefined} className={isToday ? "bg-tint font-semibold" : ""}>
              <th scope="row" className={`rounded-l-[10px] px-[clamp(6px,0.9722vw,14px)] py-2 text-left ${isToday ? "font-semibold" : "font-normal"}`}>{weekdays[day]}</th>
              <td className="rounded-r-[10px] px-[clamp(6px,0.9722vw,14px)] py-2 text-right">
                {closure ? home.status.closedForHoliday.replace("{label}", closure.label) : ranges.length ? ranges.map(([open, close]) => `${formatTime(open)}${home.hours.timeSeparator}${formatTime(close)}`).join(home.hours.rangeSeparator) : home.hours.closedLabel}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
