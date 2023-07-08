import { HebrewCalendar, HDate } from "@hebcal/core";
import { getLeyningOnDate, formatAliyahWithBook, Aliyah } from "@hebcal/leyning";
import { dailyPsalms, PsalmsEvent } from "@hebcal/learning";

export const readingsData: ReadingData[] = [];

export function resetReadingsData() {
    readingsData.length = 0; // This clears the array without reassigning the variable
}

function handleReading(reading: any, date: HDate) {

    const dateObj = date.greg();
    const localDate = dateObj.toLocaleDateString();
    const formattedDate = dateObj.toISOString().split("T")[0];
    const dayOfWeek = dateObj.toLocaleString("en-US", { weekday: "short" });

    let holiday = reading.name.en;
    holiday = holiday.replace(/(\(on Shabbat\)|I|II)/g, "").trim();

    const aliyot: AliyahData[] = [];

    let holidays = HebrewCalendar.getHolidaysOnDate(date);
    const isHoliday = holidays && holidays.length > 0;

    const relevantReading = (date.getDay() === 6 || isHoliday) ? reading.fullkriyah : reading.weekday;

    if (relevantReading) {
        for (const [num, aliyah] of Object.entries(relevantReading)) {
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
    }

    let portion;

    if (aliyot.length > 0) {
        const firstAliyah = aliyot[0];
        const lastAliyah = aliyot[aliyot.length - 1];

        const firstVerse = firstAliyah.description.split(':')[1].split('-')[0].trim();
        const lastVerse = lastAliyah.description.split('-')[1].trim();

        portion = `${firstAliyah.description.split(':')[0]}:${firstVerse}-${lastVerse}`;
    }

    readingsData.push({
        date: localDate,
        dateTime: formattedDate,
        DayOfWeek: dayOfWeek,
        name: reading.portion || holiday,
        readingSummary: reading.summary || portion,
        haftara: reading.haftara,
        aliyot: aliyot
    });
}

function getPsalmsEventData(localDate: string, psalmsEvent: PsalmsEvent): PsalmsEventData {
    return {
        date: localDate,
        render: psalmsEvent.render('en'),
        url: psalmsEvent.url(),
        categories: psalmsEvent.getCategories()
    };
}

export function processAllReadings(start: HDate, end: HDate) {
    let weeksPsalmsData: PsalmsEventData[] = [];

    for (
        let date = start;
        date.deltaDays(end) <= 0;
        date = date.next()
    ) {

        const dateObj = date.greg();
        const localDate = dateObj.toLocaleDateString();

        const todaysPsalms = dailyPsalms(date);
        const psalmsEvent = new PsalmsEvent(date, todaysPsalms);
        const psalmsData = getPsalmsEventData(localDate, psalmsEvent);

        weeksPsalmsData.push(psalmsData);

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

    return weeksPsalmsData;
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
