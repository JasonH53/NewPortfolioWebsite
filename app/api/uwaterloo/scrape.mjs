import { JSDOM } from 'jsdom';

const BASE_URL = 'https://classes.uwaterloo.ca/cgi-bin/cgiwrap/infocour/salook.pl';

/**
 * Scrapes UWaterloo course schedule and finds online sections with available spots
 * @param {Array} courses - Array of course objects with { level, sess, subject, cournum }
 * @returns {Array} - Array of courses with available online spots
 */
export async function scrapeAvailableCourses(courses) {
  const availableCourses = [];

  for (const course of courses) {
    try {
      const result = await scrapeCourse(course);
      if (result) {
        availableCourses.push(...result);
      }
    } catch (error) {
      console.error(`Error scraping ${course.subject} ${course.cournum}:`, error.message);
    }
  }

  return availableCourses;
}

/**
 * Scrapes a single course and returns online sections with available spots
 * @param {Object} course - Course object with { level, sess, subject, cournum }
 * @param {Object} options - Options: { showAll: boolean } to show all sections including full ones
 * @returns {Array|null} - Array of available sections or null if none
 */
export async function scrapeCourse(course, options = {}) {
  const { level = 'under', sess, subject, cournum } = course;
  
  const url = `${BASE_URL}?level=${level}&sess=${sess}&subject=${subject}&cournum=${cournum}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const html = await response.text();
  return parseScheduleHTML(html, { subject, cournum, sess }, options);
}

/**
 * Parses the HTML response and extracts online sections with availability
 * @param {string} html - Raw HTML from the schedule page
 * @param {Object} courseInfo - Course metadata for context
 * @param {Object} options - Options: { showAll: boolean } to show all sections including full ones
 * @returns {Array} - Array of available online sections
 */
function parseScheduleHTML(html, courseInfo, options = {}) {
  const { showAll = false } = options;
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  const availableSections = [];
  
  // Get course title from the main table
  const mainTable = document.querySelector('table[border="2"]');
  if (!mainTable) {
    return availableSections;
  }

  // Find the course title row
  const titleRow = mainTable.querySelectorAll('tr')[1];
  const courseTitle = titleRow?.querySelectorAll('td')[3]?.textContent?.trim() || 'Unknown';

  // Find all section rows in the nested table
  const nestedTable = mainTable.querySelector('table');
  if (!nestedTable) {
    return availableSections;
  }

  const rows = nestedTable.querySelectorAll('tr');
  
  // Skip header row, iterate through section rows
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.querySelectorAll('td');
    
    // Skip rows that don't have enough cells (like reserve rows)
    if (cells.length < 10) {
      continue;
    }

    const classNum = cells[0]?.textContent?.trim();
    const compSec = cells[1]?.textContent?.trim();
    const campLoc = cells[2]?.textContent?.trim();
    const enrlCapText = cells[6]?.textContent?.trim();
    const enrlTotText = cells[7]?.textContent?.trim();
    const timeDays = cells[10]?.textContent?.trim() || '';

    // Check if this is an online section
    if (campLoc && campLoc.includes('ONLN') && campLoc.includes('ONLINE')) {
      const enrlCap = parseInt(enrlCapText, 10);
      const enrlTot = parseInt(enrlTotText, 10);

      const hasAvailability = !isNaN(enrlCap) && !isNaN(enrlTot) && enrlTot < enrlCap;

      // If showAll, include all online sections; otherwise only available ones
      if (showAll || hasAvailability) {
        availableSections.push({
          subject: courseInfo.subject,
          courseNumber: courseInfo.cournum,
          title: courseTitle,
          term: courseInfo.sess,
          classNumber: classNum,
          section: compSec,
          location: campLoc,
          enrollmentCap: enrlCap,
          enrollmentTotal: enrlTot,
          spotsAvailable: enrlCap - enrlTot,
          hasAvailability,
          timeDays: timeDays,
        });
      }
    }
  }

  return availableSections;
}
