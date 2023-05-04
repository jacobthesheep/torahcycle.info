import { z } from "zod";

export const TorahReading = z.object({
	week: z.number(),
	portion: z.object({
		hebrew: z.string(),
		english: z.string().optional(),
	}),
	book: z.string(),
	verses: z.string(),
	torah_resource: z.object({
		haftarah: z.array(
			z.object({
				book: z.string(),
				verses: z.string(),
			}),
		),
		apostolic: z.object({
			book: z.string(),
			verses: z.string(),
		}),
	}),
	ffoz: z.object({
		prophets: z.array(
			z.object({
				book: z.string(),
				verses: z.string(),
			}),
		),
		gospel: z.array(
			z.object({
				book: z.string(),
				verses: z.string(),
			}),
		),
	}),
});

export const TorahReadings = z.array(TorahReading);
export type TorahReadingType = z.infer<typeof TorahReading>;
