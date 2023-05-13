<script lang="ts">
    import { parsedTorahReadings, error } from "../stores";
    import { get } from "svelte/store";
    import { TorahReadings } from "../pages/data";
    import hebrewDate from "hebrew-date";

    function isHebrewLeapYear(year: number): boolean {
        const yearInCycle = year % 19;
        return [0, 3, 6, 8, 11, 14, 17].includes(yearInCycle);
    }

    async function loadData() {
        try {
            const hebrewDateToday = hebrewDate(new Date());
            const hebrewYear = hebrewDateToday.year;
            let data;

            if (isHebrewLeapYear(hebrewYear)) {
                const torahLeapReadingsJson = await import(
                    "../../public/torah_readings_leap.json"
                );
                data = torahLeapReadingsJson.default;
            } else {
                const torahReadingsJson = await import(
                    "../../public/torah_readings.json"
                );
                data = torahReadingsJson.default;
            }

            parsedTorahReadings.set(TorahReadings.parse(data));
        } catch (err: any) {
            error.set(err.message);
            console.error("Error validating Torah readings data:", err);
        }
    }

    loadData();
</script>

{#if get(error)}
    <p>Sorry, there was an error loading the Torah readings data.</p>
{:else}
    <ul role="list">
        {#each get(parsedTorahReadings) as reading}
            <li>
                <span id={`week-${reading.week}`}>
                    Week {reading.week}
                </span>
                <div>
                    <h3>
                        <i>
                            Parashat{" "}
                            {reading.portion.hebrew}
                        </i>
                    </h3>
                    <p>{reading.portion.english}</p>
                </div>
                <ul class="fa-ul">
                    <li>
                        <span class="fa-li">
                            <i class="fa-solid fa-scroll-torah" />
                        </span>
                        Torah: {reading.book}{" "}
                        {reading.verses}
                    </li>
                    <li>
                        <span class="fa-li">
                            <i class="fa-solid fa-book-tanakh" />
                        </span>
                        Haftorah:
                        {#each reading.haftorah as haftorahItem, index}
                            <span>
                                {index > 0 ? ", " : ""}{haftorahItem.book}
                                {haftorahItem.verses}
                            </span>
                        {/each}
                    </li>

                    <li>
                        <span class="fa-li">
                            <i class="fa-solid fa-book-bible" />
                        </span>
                        Apostolic:
                        {#each reading.apostolic as apostolicItem, index}
                            <span>
                                {index > 0 ? ", " : ""}{apostolicItem.book}
                                {apostolicItem.verses}
                            </span>
                        {/each}
                    </li>
                </ul>
            </li>
        {/each}
    </ul>
{/if}
