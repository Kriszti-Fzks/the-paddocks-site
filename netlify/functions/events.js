// Netlify Function: Fetches car events from firstcoastcarculture.com
// Runs automatically - pulls live events from the source website

const https = require('https');

function fetchFromURL(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrapeEvents() {
  try {
    // Fetch the main calendar page
    const html = await fetchFromURL('https://www.firstcoastcarculture.com/');

    // Parse event data from the page (look for event listings)
    const events = [];

    // Simple regex pattern to find event data in the HTML
    // This looks for event entries and extracts date, title, time, location
    const eventPattern = /(?:<div class="event[^>]*>|<article[^>]*>)([\s\S]*?)(?:<\/div>|<\/article>)/gi;

    let match;
    while ((match = eventPattern.exec(html)) !== null) {
      const eventHTML = match[1];

      // Extract individual fields
      const dateMatch = eventHTML.match(/(\d{4}-\d{2}-\d{2}|[A-Za-z]+ \d{1,2})/);
      const titleMatch = eventHTML.match(/<h[2-4][^>]*>([^<]+)<\/h/i);
      const timeMatch = eventHTML.match(/(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)[^<]*)/i);
      const locationMatch = eventHTML.match(/location[^>]*>([^<]+)</i);

      if (titleMatch) {
        events.push({
          date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
          title: titleMatch[1].trim(),
          badge: "Car Event",
          time: timeMatch ? timeMatch[1] : "Time TBA",
          location: locationMatch ? locationMatch[1].trim() : "Check website",
          link: "https://www.firstcoastcarculture.com"
        });
      }
    }

    return events.length > 0 ? events : fallbackEvents();
  } catch (error) {
    console.error('Error scraping events:', error);
    return fallbackEvents();
  }
}

function fallbackEvents() {
  // Fallback data if scraping fails
  return [
    { date: "2026-08-08", title: "Caffeine & Octane Jacksonville", badge: "Cars & Coffee", time: "7:30 AM - 10:30 AM", location: "The Avenues Mall, 10300 Southside Blvd, Jacksonville", link: "https://www.caffeineandoctane.com/c-o-jacksonville" },
    { date: "2026-08-26", title: "Jax Beach Classic Car Cruise", badge: "Cruise-In", time: "4:00 PM - 7:00 PM", location: "Latham Plaza, 143 2nd St North, Jacksonville Beach", link: "https://jacksonvillebeach.org/" },
    { date: "2026-09-05", title: "Northeast Florida Rod Run & Car Show", badge: "Car Show", time: "10:00 AM - 5:00 PM", location: "Northeast Florida Fairgrounds, 543378 U.S. 1, Callahan", link: "https://www.firstcoastcarculture.com" }
  ];
}

exports.handler = async (event, context) => {
  const events = await scrapeEvents();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "max-age=3600" // Cache for 1 hour
    },
    body: JSON.stringify({
      success: true,
      lastUpdated: new Date().toISOString(),
      source: "firstcoastcarculture.com",
      events: events
    })
  };
};
