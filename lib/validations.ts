import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Fullname is too short"),
  email: z.string().email("Invalid email address"),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University card is required"),
  password: z.string().min(8, "Password is too short"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password is too short"),
});
