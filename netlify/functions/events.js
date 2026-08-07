// Netlify Function: Fetches car events from Google Calendar
// Automatically pulls live events from First Coast Car Council Google Calendar

function parseICalendar(icsText) {
  const events = [];

  // Split by VEVENT blocks
  const eventBlocks = icsText.split('BEGIN:VEVENT');

  eventBlocks.forEach((block, index) => {
    if (index === 0 || !block.includes('END:VEVENT')) return;

    const eventText = 'BEGIN:VEVENT' + block;

    try {
      // Extract event properties
      const summaryMatch = eventText.match(/SUMMARY:(.+?)(?:\r\n|\n)/);
      const dtStartMatch = eventText.match(/DTSTART(?:;[^:]*)?:(\d{8}T?\d{0,6}Z?)/);
      const descriptionMatch = eventText.match(/DESCRIPTION:(.+?)(?:\r\n|\n)/);

      if (summaryMatch && dtStartMatch) {
        const title = summaryMatch[1].trim();
        const dateStr = dtStartMatch[1];
        const description = descriptionMatch ? descriptionMatch[1].trim() : '';

        // Parse date (format: 20260808T090000Z or 20260808)
        let date = parseICalDate(dateStr);

        events.push({
          date: date,
          title: title,
          badge: determineBadge(title),
          time: extractTime(dateStr, description),
          location: extractLocation(description),
          link: "https://calendar.google.com/calendar/u/0?cid=Zmlyc3Rjb2FzdGNhcmNvdW5jaWxAZ21haWwuY29t"
        });
      }
    } catch (error) {
      console.error('Error parsing event:', error);
    }
  });

  return events;
}

function parseICalDate(dateStr) {
  // Handle formats like 20260808T090000Z and 20260808
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  return `${year}-${month}-${day}`;
}

function extractTime(dateStr, description) {
  // Extract time from iCal datetime format
  if (dateStr.includes('T')) {
    const timePart = dateStr.substring(9, 15);
    const hour = parseInt(timePart.substring(0, 2));
    const minute = timePart.substring(2, 4);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${minute} ${ampm}`;
  }
  // Try to extract from description
  const timeMatch = description.match(/(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))/);
  return timeMatch ? timeMatch[1] : 'Check website';
}

function extractLocation(description) {
  // Look for location info in description
  const locationMatch = description.match(/Location:?\s*(.+?)(?:\n|$)/i);
  if (locationMatch) return locationMatch[1].trim();

  const atMatch = description.match(/@\s*(.+?)(?:\n|$)/);
  if (atMatch) return atMatch[1].trim();

  return 'Check website';
}

function determineBadge(title) {
  const lower = title.toLowerCase();
  if (lower.includes('coffee') || lower.includes('caffeine')) return "Cars & Coffee";
  if (lower.includes('cruise')) return "Cruise-In";
  if (lower.includes('show')) return "Car Show";
  if (lower.includes('drag') || lower.includes('racing')) return "Drag Racing";
  if (lower.includes('rod')) return "Rod Run";
  if (lower.includes('charity')) return "Charity Show";
  return "Car Event";
}

exports.handler = async (event, context) => {
  try {
    // Fetch from Google Calendar public feed
    const calendarId = 'firstcoastcarcouncil@gmail.com';
    const calendarUrl = `https://calendar.google.com/calendar/ical/${calendarId}/public/basic.ics`;

    const response = await fetch(calendarUrl);

    if (!response.ok) {
      throw new Error(`Calendar fetch failed: ${response.status}`);
    }

    const icsText = await response.text();
    const events = parseICalendar(icsText);

    // Filter out past events and sort by date
    const today = new Date().toISOString().split('T')[0];
    const futureEvents = events
      .filter(e => e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "max-age=1800" // Cache for 30 minutes
      },
      body: JSON.stringify({
        success: true,
        lastUpdated: new Date().toISOString(),
        source: "Google Calendar (First Coast Car Council)",
        eventCount: futureEvents.length,
        events: futureEvents
      })
    };
  } catch (error) {
    console.error('Error fetching Google Calendar:', error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        events: []
      })
    };
  }
};
