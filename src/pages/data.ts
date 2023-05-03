import { z } from "zod";

export const TorahReading = z.object({
	week: z.number(),
	portion: z.string(),
	book: z.string(),
	verses: z.string(),
	torah_resource: z.object({
		haftorah: z.array(
			z.object({
				book: z.string(),
				verses: z.string(),
			}),
		),
		britChadasha: z.object({
			book: z.string(),
			verses: z.string(),
		}),
	}),
	ffoz: z.object({
		prophets: z.object({
			book: z.string(),
			verses: z.string(),
		}),
		gospel: z.object({
			book: z.string(),
			verses: z.string(),
		}),
	}),
});

export const TorahReadings = z.array(TorahReading);
export type TorahReadingType = z.infer<typeof TorahReading>;