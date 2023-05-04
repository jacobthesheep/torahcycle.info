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

export const TorahReadings = z.array(TorahReading);
export type TorahReadingType = z.infer<typeof TorahReading>;
