import { atom } from "nanostores";

import type { TorahReadingType } from "../src/pages/data";

export const parsedTorahReadings = atom<TorahReadingType[]>([]);
export const error = atom<string | null>(null);
