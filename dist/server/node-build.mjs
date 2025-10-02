import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
import { z } from "zod";
const handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};
const registrationSchema = z.object({
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
    "other"
  ]),
  interest: z.enum(["event", "volunteer", "partner"]).optional(),
  student1Name: z.string().max(120).optional().or(z.literal("")),
  student1Email: z.string().email().optional().or(z.literal("")),
  student2Name: z.string().max(120).optional().or(z.literal("")),
  student2Email: z.string().email().optional().or(z.literal("")),
  notes: z.string().max(1e3).optional().or(z.literal(""))
}).superRefine((data, ctx) => {
  const isEvent = !data.interest || data.interest === "event";
  if (isEvent) {
    if (!data.student1Name || data.student1Name.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Student 1 name is required",
        path: ["student1Name"]
      });
    }
    if (!data.student1Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.student1Email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valid email required",
        path: ["student1Email"]
      });
    }
    if (!data.student2Name || data.student2Name.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Student 2 name is required",
        path: ["student2Name"]
      });
    }
    if (!data.student2Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.student2Email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valid email required",
        path: ["student2Email"]
      });
    }
  }
});
const handleRegister = (req, res) => {
  const parsed = registrationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input",
      errors: parsed.error.flatten()
    });
  }
  const data = parsed.data;
  const id = `REG-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`.toUpperCase();
  console.log("New registration:", { id, ...data });
  const response = {
    success: true,
    message: "Registration received. We will contact you shortly.",
    id
  };
  res.status(200).json(response);
};
const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  subject: z.string().min(2).max(160),
  message: z.string().min(10).max(2e3)
});
const handleContact = (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input",
      errors: parsed.error.flatten()
    });
  }
  const id = `MSG-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`.toUpperCase();
  console.log("New contact message:", { id, ...parsed.data });
  const response = {
    success: true,
    message: "Thanks for contacting us.",
    id
  };
  res.status(200).json(response);
};
function createServer() {
  const app2 = express__default();
  app2.use(cors());
  app2.use(express__default.json());
  app2.use(express__default.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/api/demo", handleDemo);
  app2.post("/api/register", handleRegister);
  app2.post("/api/contact", handleContact);
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));
app.get(/^\/(?!api|health).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map
