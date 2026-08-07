// Netlify Function: Serves car events data
// This function can be called from the frontend to get current events
// Future: Can be updated to fetch from external sources or database

exports.handler = async (event, context) => {
  // All car events for August - October 2026
  const allEvents = [
    // AUGUST 2026
    { date: "2026-08-03", title: "Cruisin' Classics Cruise-in", badge: "Cruise-In", time: "1:00 PM - 4:00 PM", location: "Elks Lodge back lawn, 1855 West Road, Jacksonville", link: "" },
    { date: "2026-08-08", title: "First Coast Car Council Cruise-in", badge: "Cruise-In", time: "11:00 AM - 2:00 PM", location: "Chick-fil-A, 1925 Wells Road, Jacksonville", link: "" },
    { date: "2026-08-08", title: "Caffeine & Octane Jacksonville", badge: "Cars & Coffee", time: "7:30 AM - 10:30 AM", location: "The Avenues Mall, 10300 Southside Blvd, Jacksonville", link: "https://www.caffeineandoctane.com/c-o-jacksonville" },
    { date: "2026-08-10", title: "Orange Blossom Breakfast Show", badge: "Car Show", time: "8:00 AM - 11:00 AM", location: "Orange Blossom Diner, 14329 Beach Blvd, Jacksonville", link: "" },
    { date: "2026-08-14", title: "Wheels and Worship Night Cruise-in", badge: "Cruise-In", time: "6:00 PM - 9:00 PM", location: "Church of the Eleven22, 2101 Longleaf Pine Parkway", link: "" },
    { date: "2026-08-15", title: "Mr. Chubby's Wings Cruise-In", badge: "Cruise-In", time: "11:00 AM - 2:00 PM", location: "2349 Village Square Parkway, Fleming Island", link: "" },
    { date: "2026-08-22", title: "Callahan Speedway Drag Racing", badge: "Drag Racing", time: "Various", location: "Callahan Speedway, Callahan, FL", link: "" },
    { date: "2026-08-26", title: "Jax Beach Classic Car Cruise", badge: "Cruise-In", time: "4:00 PM - 7:00 PM", location: "Latham Plaza, 143 2nd St North, Jacksonville Beach", link: "https://jacksonvillebeach.org/" },
    { date: "2026-08-29", title: "Braderie Boulevard Classic Car Show", badge: "Car Show", time: "10:00 AM - 3:00 PM", location: "Jekyll Island Club Resort, Jekyll Island, GA", link: "" },
    { date: "2026-08-29", title: "North Florida Speedway Drag Racing", badge: "Drag Racing", time: "Evening", location: "Callahan Speedway", link: "https://www.northfloridaspeedway.com" },

    // SEPTEMBER 2026
    { date: "2026-09-05", title: "Northeast Florida Rod Run & Car Show", badge: "Car Show", time: "10:00 AM - 5:00 PM", location: "Northeast Florida Fairgrounds, 543378 U.S. 1, Callahan", link: "https://www.firstcoastcarculture.com" },
    { date: "2026-09-05", title: "North Florida Speedway Racing", badge: "Drag Racing", time: "Evening", location: "Callahan Speedway", link: "https://www.northfloridaspeedway.com" },
    { date: "2026-09-07", title: "Cruisin' Classics Cruise-in", badge: "Cruise-In", time: "1:00 PM - 4:00 PM", location: "Elks Lodge back lawn, 1855 West Road, Jacksonville", link: "" },
    { date: "2026-09-12", title: "Caffeine & Octane Jacksonville", badge: "Cars & Coffee", time: "7:30 AM - 10:30 AM", location: "The Avenues Mall, 10300 Southside Blvd, Jacksonville", link: "https://www.caffeineandoctane.com/c-o-jacksonville" },
    { date: "2026-09-12", title: "Rocketman Rally and Show", badge: "Car Show", time: "9:30 AM - 3:00 PM", location: "Trout Creek Memorial Park, 6550 Florida 13 North, St. Johns", link: "" },
    { date: "2026-09-12", title: "First Coast Car Council Cruise-in", badge: "Cruise-In", time: "11:00 AM - 2:00 PM", location: "Chick-fil-A, 1925 Wells Road, Jacksonville", link: "" },
    { date: "2026-09-19", title: "Truth Pointe Church Car Show", badge: "Charity Show", time: "11:00 AM - 3:00 PM", location: "5330 Dunn Avenue, Jacksonville", link: "" },
    { date: "2026-09-23", title: "Jax Beach Classic Car Cruise", badge: "Cruise-In", time: "4:00 PM - 7:00 PM", location: "Latham Plaza, 143 2nd St North, Jacksonville Beach", link: "" },
    { date: "2026-09-26", title: "Built to Be Seen Car Show", badge: "Car Show", time: "9:00 AM - 1:00 PM", location: "Orange Park Mall", link: "" },
    { date: "2026-09-26", title: "Endless Summer Showcase 4", badge: "Car Show", time: "11:00 AM - 4:00 PM", location: "323 E. Bay Street, Jacksonville", link: "" },
    { date: "2026-09-26", title: "Cars & Cannons Fort Clinch", badge: "Car Show", time: "7:00 AM - 3:00 PM", location: "Fort Clinch State Park, Fernandina Beach", link: "" },
    { date: "2026-09-26", title: "SAW Kustomz Car Show at Rawfest", badge: "Custom Show", time: "11:00 AM", location: "Flamingo Lake RV, 3640 Newcomb Road", link: "" },
    { date: "2026-09-26", title: "North Florida Speedway Racing", badge: "Drag Racing", time: "Evening", location: "Lake City, FL", link: "https://www.northfloridaspeedway.com" },

    // OCTOBER 2026
    { date: "2026-10-03", title: "Cruisin' to the Creek Car Show", badge: "Charity Show", time: "9:00 AM - 3:00 PM", location: "Trout Creek Memorial Park, 6550 County Road 13 North, St. Johns", link: "" },
    { date: "2026-10-05", title: "Cruisin' Classics Cruise-in", badge: "Cruise-In", time: "1:00 PM - 4:00 PM", location: "Elks Lodge back lawn, 1855 West Road, Jacksonville", link: "" },
    { date: "2026-10-10", title: "Caffeine & Octane Jacksonville", badge: "Cars & Coffee", time: "7:30 AM - 10:30 AM", location: "The Avenues Mall, 10300 Southside Blvd, Jacksonville", link: "https://www.caffeineandoctane.com/c-o-jacksonville" },
    { date: "2026-10-10", title: "Fall Classic Pontiac-Oakland-GMC Show", badge: "Specialty Show", time: "9:00 AM - 3:00 PM", location: "Classic Car Museum of St. Augustine, 4730 U.S. 1 South", link: "" },
    { date: "2026-10-10", title: "Motore Di Elite Auto Show", badge: "Auto Show", time: "11:00 AM - 9:30 PM", location: "Daytona International Speedway, Daytona Beach", link: "" },
    { date: "2026-10-10", title: "First Coast Car Council Cruise-in", badge: "Cruise-In", time: "11:00 AM - 2:00 PM", location: "Chick-fil-A, 1925 Wells Road, Jacksonville", link: "" },
    { date: "2026-10-10", title: "North Florida Speedway Racing", badge: "Drag Racing", time: "Evening", location: "Lake City, FL", link: "https://www.northfloridaspeedway.com" },
    { date: "2026-10-17", title: "30th Annual 8 Flags Car Show", badge: "Major Show", time: "9:00 AM - 3:00 PM", location: "Centre Street, Downtown Fernandina Beach", link: "" },
    { date: "2026-10-24", title: "Fall-O-Ween Festival Car Show", badge: "Themed Show", time: "11:00 AM - 2:00 PM", location: "Northside Church of God, 5252 Dunn Avenue", link: "" },
    { date: "2026-10-24", title: "Good Sam Car Show", badge: "Car Show", time: "10:00 AM - 2:00 PM", location: "Tanglewood Station, 1241 Blanding Blvd", link: "" },
    { date: "2026-10-24", title: "4th Annual Car Show", badge: "Car Show", time: "10:00 AM - 2:00 PM", location: "Immanuel Anglican Church, Keystone Heights", link: "" },
    { date: "2026-10-24", title: "North Florida Speedway Racing", badge: "Drag Racing", time: "Evening", location: "Lake City, FL", link: "https://www.northfloridaspeedway.com" },
    { date: "2026-10-28", title: "Jax Beach Classic Car Cruise", badge: "Cruise-In", time: "4:00 PM - 7:00 PM", location: "Latham Plaza, 143 2nd St North, Jacksonville Beach", link: "" },
    { date: "2026-10-31", title: "Hillcrest Baptist Church Car Show", badge: "Charity Show", time: "11:00 AM - 2:00 PM", location: "Hillcrest Baptist Church, 7673 Collins Road", link: "" }
  ];

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      success: true,
      lastUpdated: new Date().toISOString(),
      events: allEvents
    })
  };
};
