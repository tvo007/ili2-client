import * as z from "zod";

export const AddProjectDTO = z.object({
  name: z.string().min(3),
  desc: z.string().min(5),
});

export const UpdateProjectDTO = z.object({
  name: z.string().min(3),
  desc: z.string().min(5),
});

export const AddTaskDTO = z.object({
  name: z.string().min(3),
  desc: z.string().min(5),
});

export const UpdateTaskDTO = z.object({
  name: z.string().min(3),
  desc: z.string().min(5),
});

export const SignUpUserDTO = z.object({
  name: z.string().min(3),
  email: z.string().trim().email(),
  password: z
    .string()
    .min(8, { message: "Must contain at least 8 characters." })
    .max(50, { message: "Must contain at most 50 characters." })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain a special character",
    })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase character" })
    .regex(/[0-9]/, { message: "Password must contain a number" }),
});

export const SignInUserDTO = z.object({
  email: z.string().trim().email(),
  password: z
    .string()
    .min(8, { message: "Must contain at least 8 characters." })
    .max(50, { message: "Must contain at most 50 characters." })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain a special character",
    })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase character" })
    .regex(/[0-9]/, { message: "Password must contain a number" }),
});
