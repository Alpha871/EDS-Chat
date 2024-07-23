import { z } from "zod";

const promptValidation = z.object({
  prompt: z
    .string()
    .min(10, { message: "prompt must be at least 10 characters long" })
    .max(50),
  emoji: z.string().min(2, { message: "emoji must set" }).max(5),
});

export default promptValidation;
