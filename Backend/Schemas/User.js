import {z} from "zod"
export const createSchema = z.object({
     name: z.string().min(1, "name is required"),
      email: z.string().email("email must be valid"),
      password: z
        .string()
        .min(6, "password must be at least 6 characters")
        .max(100, "password must be at most 100 character"),
        passwordResetToken: z.string().min(6).max(100).optional(),
        passwordResetExpires: z.string().datetime().optional(),
        role: z.string().min(1).optional(),
        profile: z.string().min(5).optional(),
})