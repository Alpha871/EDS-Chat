import { z } from "zod";

const companyValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" })
    .max(50),
  description: z
    .string()
    .min(2, { message: "description must be at least 2 characters long" }),
  instructions: z
    .string()
    .min(2, { message: "intructions must be at least 2 characters long" }),
});

export default companyValidation;
