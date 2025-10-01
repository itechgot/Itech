import { RequestHandler } from "express";
import { z } from "zod";
import type { RegistrationPayload, RegistrationResponse } from "@shared/api";

const registrationSchema = z
  .object({
    fullName: z.string().min(2).max(120),
    email: z.string().email(),
    phone: z.string().min(7).max(20).optional().or(z.literal("")),
    organization: z.string().max(160).optional().or(z.literal("")),
    role: z.enum([
      "student",
      "teacher",
      "parent",
      "volunteer",
      "partner",
      "other",
    ]),
    interest: z.enum(["event", "volunteer", "partner"]).optional(),
    student1Name: z.string().max(120).optional().or(z.literal("")),
    student1Email: z.string().email().optional().or(z.literal("")),
    student2Name: z.string().max(120).optional().or(z.literal("")),
    student2Email: z.string().email().optional().or(z.literal("")),
    notes: z.string().max(1000).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const isEvent = !data.interest || data.interest === "event";
    if (isEvent) {
      if (!data.student1Name || data.student1Name.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Student 1 name is required",
          path: ["student1Name"],
        });
      }
      if (
        !data.student1Email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.student1Email)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Valid email required",
          path: ["student1Email"],
        });
      }
      if (!data.student2Name || data.student2Name.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Student 2 name is required",
          path: ["student2Name"],
        });
      }
      if (
        !data.student2Email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.student2Email)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Valid email required",
          path: ["student2Email"],
        });
      }
    }
  });

export const handleRegister: RequestHandler = (req, res) => {
  const parsed = registrationSchema.safeParse(req.body as RegistrationPayload);
  if (!parsed.success) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Invalid input",
        errors: parsed.error.flatten(),
      });
  }

  const data = parsed.data;

  // Simulate persistence by creating a simple reference id and logging. Replace with DB/email later.
  const id =
    `REG-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`.toUpperCase();
  // eslint-disable-next-line no-console
  console.log("New registration:", { id, ...data });

  const response: RegistrationResponse = {
    success: true,
    message: "Registration received. We will contact you shortly.",
    id,
  };
  res.status(200).json(response);
};
