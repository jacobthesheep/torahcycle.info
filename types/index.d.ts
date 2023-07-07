interface PageMeta {
    title: string;
    description: string;
    image?: string;
}

interface AliyahData {
    number: string;
    description: string;
    verseCount?: number;
    reason?: string;
}

interface ReadingData {
    date: string;
    dateTime: string;
    DayOfWeek?: string;
    name: string;
    readingSummary: string;
    haftara?: string;
    aliyot: AliyahData[];
}

interface DafYomiEventData {
    date: string;
    render: string;
    url: string;
    categories: string[];
}

interface PsalmsEventData {
    date: string;
    render: string;
    url: string;
    categories: string[];
}
