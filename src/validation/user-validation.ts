import { z, type ZodType } from "zod";

// User Validation
export class UserValidation {

    static readonly REGISTER : ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        name: z.string().min(1).max(100)
    });
    
}