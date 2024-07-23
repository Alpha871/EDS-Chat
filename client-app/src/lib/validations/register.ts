import { z } from "zod";

const registerValidation = z.object({
  username: z
    .string()
    .min(2, { message: "username must be at least 2 characters long" })
    .max(50),
  firstname: z
    .string()
    .min(2, { message: "firstname must be at least 2 characters long" })
    .max(50),
  lastname: z
    .string()
    .min(2, { message: "lastname must be at least 2 characters long" })
    .max(50),
  email: z
    .string()
    .email()
    .min(2, { message: "email must be at least 2 characters long" })
    .max(50),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters long" }),
});

export default registerValidation;
