// Netlify Function: Fetches car events from carcouncil.org
// Automatically pulls live events from the Car Council calendar

exports.handler = async (event, context) => {
  try {
    // Fetch events from Car Council API/Calendar
    const response = await fetch('https://www.carcouncil.org/events');
    const html = await response.text();

    const events = [];

    // Parse event data from calendar HTML
    // Look for event entries in the calendar structure
    const eventRegex = /data-event-date="([^"]*)"[^>]*>.*?<h[2-4][^>]*>([^<]+)<\/h/gi;

    let match;
    const seen = new Set(); // Avoid duplicates

    while ((match = eventRegex.exec(html)) !== null) {
      const dateStr = match[1];
      const title = match[2].trim();
      const eventKey = `${dateStr}-${title}`;

      if (!seen.has(eventKey)) {
        seen.add(eventKey);

        // Try to extract time and location from the event entry
        const eventSectionRegex = new RegExp(`${title}[^<]*<[^>]*>([^<]*)<[^>]*>([^<]*)`, 'i');
        const sectionMatch = html.match(eventSectionRegex);

        events.push({
          date: formatDate(dateStr),
          title: title,
          badge: determineBadge(title),
          time: sectionMatch ? sectionMatch[1].trim() : "Check website",
          location: sectionMatch ? sectionMatch[2].trim() : "Check website",
          link: "https://www.carcouncil.org/events"
        });
      }
    }

    // If no events found, try alternative parsing
    if (events.length === 0) {
      // Look for event containers with more flexible patterns
      const containerRegex = /<article[^>]*class="[^"]*event[^"]*"[^>]*>([\s\S]*?)<\/article>/gi;

      while ((match = containerRegex.exec(html)) !== null) {
        const container = match[1];
        const titleMatch = container.match(/<h[2-4][^>]*>([^<]+)<\/h/i);
        const dateMatch = container.match(/(\d{4}-\d{2}-\d{2}|[A-Za-z]+ \d{1,2},? \d{4})/);

        if (titleMatch) {
          const title = titleMatch[1].trim();
          const eventKey = `${dateMatch ? dateMatch[0] : 'unknown'}-${title}`;

          if (!seen.has(eventKey)) {
            seen.add(eventKey);
            events.push({
              date: dateMatch ? dateMatch[0] : "Date TBA",
              title: title,
              badge: determineBadge(title),
              time: "Check website",
              location: "Check website",
              link: "https://www.carcouncil.org/events"
            });
          }
        }
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "max-age=3600"
      },
      body: JSON.stringify({
        success: true,
        lastUpdated: new Date().toISOString(),
        source: "carcouncil.org/events",
        eventCount: events.length,
        events: events.slice(0, 100) // Limit to 100 events
      })
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    return {
      statusCode: 200,
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

function formatDate(dateStr) {
  try {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  } catch {
    return dateStr;
  }
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
