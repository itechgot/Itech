import { RequestHandler } from "express";
import { z } from "zod";
import type { ContactPayload, ContactResponse } from "@shared/api";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  subject: z.string().min(2).max(160),
  message: z.string().min(10).max(2000),
});

export const handleContact: RequestHandler = (req, res) => {
  const parsed = contactSchema.safeParse(req.body as ContactPayload);
  if (!parsed.success) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Invalid input",
        errors: parsed.error.flatten(),
      });
  }
  const id =
    `MSG-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`.toUpperCase();
  // eslint-disable-next-line no-console
  console.log("New contact message:", { id, ...parsed.data });
  const response: ContactResponse = {
    success: true,
    message: "Thanks for contacting us.",
    id,
  };
  res.status(200).json(response);
};
