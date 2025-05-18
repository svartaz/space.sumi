import { divisorCommonMax } from "./math.js";
export const yearIsLeap = (year) => (0 === year % 4 && 0 !== year % 100) || 0 === year % 400;
export const yearToDays = (year) => yearIsLeap(year) ? 366 : 365;
export const dateIsDst = (date) => {
    const year = date.getFullYear();
    const zone0 = new Date(year, 0, 1).getTimezoneOffset();
    const zone6 = new Date(year, 6, 1).getTimezoneOffset();
    return Math.max(zone0, zone6) !== date.getTimezoneOffset();
};
export const dateToObject = (date) => {
    date = date ? new Date(date) : new Date();
    const isDst = dateIsDst(date);
    const year = date.getFullYear();
    const isLeap = yearIsLeap(year);
    const zone = date.getTimezoneOffset() + (isDst ? 60 : 0);
    const day = (date.getTime() - new Date(year, 0, 1).getTime()) / 1000 / 60 / 60 / 24;
    const commonFactor = Math.abs(divisorCommonMax(zone, 24 * 60));
    return {
        isLeap,
        daysInYear: yearToDays(year),
        zoneOver: zone / commonFactor,
        zoneUnder: (24 * 60) / commonFactor,
        zoneOver96: (zone * 96) / 1440,
        isDst,
        year,
        day,
        unix: (date.getTime() - new Date("1970-01-01T00:00Z").getTime()) /
            (24 * 60 * 60 * 1000),
        text: `${year}_${Math.floor(day).toString().padStart(3, "0")}`,
    };
};
export const yearDayToDate = (year, day) => new Date(year, 0, 1, 0, 0, 0, day * 24 * 60 * 60 * 1000);
