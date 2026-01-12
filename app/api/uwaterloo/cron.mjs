import { Resend } from 'resend';
import { scrapeAvailableCourses } from './scrape.mjs';

// Courses to monitor - add your courses here
const MONITORED_COURSES = [
  { sess: '1261', subject: 'AFM', cournum: '101' },
  { sess: '1261', subject: 'PSYCH', cournum: '207' },
  { sess: '1261', subject: 'MATH', cournum: '135' },
];

// Interval in milliseconds (10 minutes = 600000ms)
const SCRAPE_INTERVAL = 10 * 60 * 1000;

// Email configuration - set these environment variables
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const EMAIL_TO = process.env.NOTIFICATION_EMAIL || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'UWaterloo Scraper <onboarding@resend.dev>';

// Initialize Resend
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Store results
let lastResults = [];

/**
 * Main scraper function
 */
async function runScraper() {
  console.log(`\n[${new Date().toISOString()}] Running scraper...`);
  
  try {
    const results = await scrapeAvailableCourses(MONITORED_COURSES);
    lastResults = results;

    if (results.length > 0) {
      console.log(`✅ Found ${results.length} available online section(s):`);
      results.forEach((section) => {
        console.log(
          `   - ${section.subject} ${section.courseNumber}: ${section.title}`
        );
        console.log(
          `     Class #: ${section.classNumber} | Section: ${section.section} | Spots: ${section.spotsAvailable} available (${section.enrollmentTotal}/${section.enrollmentCap})`
        );
      });

      // Send email notification
      await sendEmailNotification(results);
    } else {
      console.log('❌ No available online sections found.');
    }

    console.log(`Next check in ${SCRAPE_INTERVAL / 60000} minutes...`);
  } catch (error) {
    console.error('Error running scraper:', error.message);
  }
}

/**
 * Send email notification when spots are available
 */
async function sendEmailNotification(availableCourses) {
  if (!EMAIL_TO) {
    console.warn('⚠️  No NOTIFICATION_EMAIL set, skipping email');
    return;
  }

  if (!resend) {
    console.warn('⚠️  No RESEND_API_KEY set, skipping email');
    return;
  }

  const courseList = availableCourses.map((c) => `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>${c.subject} ${c.courseNumber}</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">${c.title}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${c.classNumber}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${c.section}</td>
      <td style="padding: 8px; border: 1px solid #ddd; color: green; font-weight: bold;">${c.spotsAvailable} spots</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${c.enrollmentTotal}/${c.enrollmentCap}</td>
    </tr>
  `).join('');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
      <h1 style="color: #4CAF50;">🎉 Course Spots Available!</h1>
      <p>Great news! The following online sections now have available spots:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Course</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Title</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Class #</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Section</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Available</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Enrolled</th>
          </tr>
        </thead>
        <tbody>
          ${courseList}
        </tbody>
      </table>
      
      <p style="margin-top: 20px;">
        <a href="https://quest.pecs.uwaterloo.ca/" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Enroll on Quest →
        </a>
      </p>
      
      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        Sent at ${new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' })} (ET)
      </p>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO.split(',').map(e => e.trim()),
      subject: `🚨 UWaterloo: ${availableCourses.length} Course Spot(s) Available!`,
      html: htmlContent,
    });

    if (error) {
      console.error('❌ Email send error:', error);
      return;
    }

    console.log('📧 Email sent successfully:', data?.id);
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
  }
}

/**
 * Start the interval-based scraper
 */
function startScraper() {
  console.log('=== UWaterloo Course Availability Scraper ===');
  console.log(`Monitoring ${MONITORED_COURSES.length} course(s)`);
  console.log(`Check interval: ${SCRAPE_INTERVAL / 60000} minutes`);
  console.log(`Email notifications: ${EMAIL_TO ? EMAIL_TO : 'disabled (set NOTIFICATION_EMAIL)'}`);
  console.log('Press Ctrl+C to stop\n');

  // Run immediately on start
  runScraper();

  // Then run every SCRAPE_INTERVAL milliseconds
  setInterval(runScraper, SCRAPE_INTERVAL);
}

// Start the scraper
startScraper();
