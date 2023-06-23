import { HebrewCalendar, HDate } from "@hebcal/core";
import { getLeyningOnDate, formatAliyahWithBook, Aliyah } from "@hebcal/leyning";

export const readingsData: ReadingData[] = [];

export function resetReadingsData() {
    readingsData.length = 0; // This clears the array without reassigning the variable
}

function handleReading(reading: any, date: HDate) {

    const dateObj = date.greg();
    const formattedDate = dateObj.toISOString().split("T")[0];

    const localDate = dateObj.toLocaleDateString();
    const dayOfWeek = dateObj.toLocaleString("en-US", { weekday: "short" });

    const portion =
        reading.parsha && reading.parsha.length > 1
            ? reading.parsha.join("-")
            : reading.parsha
                ? reading.parsha[0]
                : undefined;

    let holiday = reading.name.en;
    holiday = holiday.replace(/(\(on Shabbat\)|I|II)/g, "").trim();

    const aliyot: AliyahData[] = [];

    for (const [num, aliyah] of Object.entries(reading.fullkriyah)) {


        const number = num === 'M' ? 'maftir' : `aliyah ${num}`;
        let description = formatAliyahWithBook(aliyah as Aliyah);
        const verseCount = (aliyah as Aliyah).v;

        const aliyahData: AliyahData = {
            number,
            description,
            verseCount,
        };

        if (reading.reason && reading.reason[num]) {
            aliyahData.reason = reading.reason[num];
            description += ' | ' + reading.reason[num];
        }
        aliyot.push(aliyahData);
    }


    readingsData.push({
        date: localDate,
        dateTime: formattedDate,
        DayOfWeek: dayOfWeek,
        name: reading.portion || holiday,
        readingSummary: reading.summary,
        haftara: reading.haftara,
        aliyot: aliyot
    });
}

export function processAllReadings(start: HDate, end: HDate) {
    for (
        let date = start;
        date.deltaDays(end) <= 0;
        date = date.next()
    ) {
        let holidays = HebrewCalendar.getHolidaysOnDate(date);
        const isHoliday = holidays && holidays.length > 0;
        if (date.getDay() === 6 || isHoliday) {

            const readings = getLeyningOnDate(date, false);

            if (readings) {
                if (Array.isArray(readings)) {
                    // Loop through each Leyning object and handle it
                    for (const reading of readings) {
                        if (reading) {
                            handleReading(reading, date);
                        }
                    }
                } else {
                    // We have a single Leyning object, so handle it
                    if (readings) {
                        handleReading(readings, date);
                    }
                }
            }
        }
    }
}

export function processTorahReadings(start: HDate, end: HDate) {
    for (let date = start; date.deltaDays(end) <= 0; date = date.next()) {
        if (date.getDay() === 6) {

            const readings = getLeyningOnDate(date, false);

            if (Array.isArray(readings)) {
                // Loop through each Leyning object and handle it
                for (const reading of readings) {
                    handleReading(reading, date);
                }
            } else {
                // We have a single Leyning object, so handle it
                handleReading(readings, date);
            }
        }
    }

}
