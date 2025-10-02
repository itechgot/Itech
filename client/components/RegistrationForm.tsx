import { EventRegistrationForm } from "./EventRegistrationForm";
import { VolunteerRegistrationForm } from "./VolunteerRegistrationForm";
import { PartnerRegistrationForm } from "./PartnerRegistrationForm";

export function RegistrationForm({
  interest = "event",
}: {
  interest?: "event" | "volunteer" | "partner";
}) {
  // Route to the appropriate form based on interest
  switch (interest) {
    case "volunteer":
      return <VolunteerRegistrationForm />;
    case "partner":
      return <PartnerRegistrationForm />;
    case "event":
    default:
      return <EventRegistrationForm />;
  }
}