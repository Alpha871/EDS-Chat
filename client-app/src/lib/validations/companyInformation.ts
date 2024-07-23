import { z } from "zod";

const companyInformationValidation = z.object({
  information: z.string().min(2, {
    message: "company Information must be at least 2 characters long",
  }),
});

export default companyInformationValidation;
