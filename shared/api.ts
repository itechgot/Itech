/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Registration payload and response types for /api/register
export interface RegistrationPayload {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string; // School or Company
  role: "student" | "teacher" | "parent" | "volunteer" | "partner" | "other";
  interest?: "event" | "volunteer" | "partner";
  student1Name?: string;
  student1Email?: string;
  student2Name?: string;
  student2Email?: string;
  notes?: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  id?: string; // server-generated id for confirmation/reference
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
}
