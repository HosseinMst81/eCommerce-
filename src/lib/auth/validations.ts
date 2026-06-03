import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address")
  .max(255, "Email is too long");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password is too long");

const nameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(100, "Name is too long");

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  callbackUrl: z.string().trim().optional(),
});

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  callbackUrl: z.string().trim().optional(),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;

export function parseFormData<T extends z.ZodType>(
  schema: T,
  formData: FormData,
): z.infer<T> {
  const callbackUrl = formData.get("callbackUrl");
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    callbackUrl:
      typeof callbackUrl === "string" && callbackUrl.length > 0
        ? callbackUrl
        : undefined,
  };

  return schema.parse(raw);
}

export function formatZodErrors(error: z.ZodError): string {
  return error.issues.map((issue) => issue.message).join(". ");
}
