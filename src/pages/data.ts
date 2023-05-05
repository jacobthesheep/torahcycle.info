import { z } from "zod";

export const TorahReading = z.object({
	week: z.number(),
	portion: z.object({
		hebrew: z.string(),
		english: z.string().optional(),
	}),
	book: z.string(),
	verses: z.string(),
	haftorah: z.array(
		z.object({
			book: z.string(),
			verses: z.string(),
		}),
	),
	apostolic: z.array(
		z.object({
			book: z.string(),
			verses: z.string(),
		}),
	),
});

export const FestivalReading = z.object({
	holiday: z.object({
		hebrew: z.string(),
		english: z.string().optional(),
	}),
	month: z.number().optional(),
	date: z.number().optional(),
    time: z.string().optional(),
	torah: z.array(
		z.object({
			book: z.string(),
			verses: z.string(),
		}),
	),
	haftorah: z.array(
		z.object({
			book: z.string(),
			verses: z.string(),
		}),
	),
	apostolic: z.array(
		z.object({
			book: z.string(),
			verses: z.string(),
		}),
	),
});

export const FestivalReadings = z.array(FestivalReading);
export type FestivalReadingType = z.infer<typeof FestivalReading>;

export const TorahReadings = z.array(TorahReading);
export type TorahReadingType = z.infer<typeof TorahReading>;
