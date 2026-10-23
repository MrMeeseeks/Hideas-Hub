import { createServerFn } from "@tanstack/react-start";

export type GoogleCalendarEvent = {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  location: string;
  htmlLink: string;
};

type CalendarResponse = {
  items?: Array<{
    id?: string;
    summary?: string;
    description?: string;
    location?: string;
    htmlLink?: string;
    start?: { date?: string; dateTime?: string };
    end?: { date?: string; dateTime?: string };
    status?: string;
  }>;
};

export const getHideasCalendarEvents = createServerFn({ method: "GET" }).handler(async () => {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const calendarKey = process.env["GOOGLE_CALENDAR_API_KEY"];
  if (!lovableKey || !calendarKey) return { events: [] as GoogleCalendarEvent[] };

  const params = new URLSearchParams({
    singleEvents: "true",
    orderBy: "startTime",
    timeMin: new Date().toISOString(),
    maxResults: "24",
  });
  const response = await fetch(
    `https://connector-gateway.lovable.dev/google_calendar/calendar/v3/calendars/primary/events?${params}`,
    {
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": calendarKey,
      },
    },
  );

  if (!response.ok) {
    console.error(`Google Calendar request failed [${response.status}]: ${await response.text()}`);
    return { events: [] as GoogleCalendarEvent[] };
  }

  const data = (await response.json()) as CalendarResponse;
  const hideasPattern = /hideas|nature loves courage|token of gratitude|ceremon(y|ies)|social/i;
  const events = (data.items ?? [])
    .filter((event) => event.status !== "cancelled" && hideasPattern.test(event.summary ?? ""))
    .flatMap((event) => {
      const start = event.start?.dateTime ?? event.start?.date;
      const end = event.end?.dateTime ?? event.end?.date;
      if (!event.id || !event.summary || !start || !end) return [];
      return [{
        id: event.id,
        title: event.summary,
        description: event.description ?? "A Hideas gathering centred on gratitude, intention, and community.",
        start,
        end,
        location: event.location ?? "Location shared after confirmation",
        htmlLink: event.htmlLink ?? "",
      }];
    });

  return { events };
});