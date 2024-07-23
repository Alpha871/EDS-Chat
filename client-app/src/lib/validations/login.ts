import { z } from "zod";

const loginValidation = z.object({
  email: z
    .string()
    .email()
    .min(2, { message: "Email must be at least 2 characters long" })
    .max(50),
  password: z.string(),
});

export default loginValidation;
