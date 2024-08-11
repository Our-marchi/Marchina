const { google } = require('googleapis');

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Function to handle the OAuth2 callback and get tokens
async function handleAuthCallback(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

// Function to fetch emails from Gmail API
async function fetchEmails(tokens) {
  oauth2Client.setCredentials(tokens);
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
    });

    console.log('Response from Gmail API:', response.data);

    // Extract messages from the response data
    const messages = response.data.messages || [];

    // Fetch detailed information for each message
    const emails = await Promise.all(messages.map(async (message) => {
      const msg = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
      });

      const headers = msg.data.payload.headers;
      const fromHeader = headers.find(header => header.name === 'From');
      const subjectHeader = headers.find(header => header.name === 'Subject');
      const dateHeader = headers.find(header => header.name === 'Date');

      const from = fromHeader ? fromHeader.value : 'No From Header';
      const subject = subjectHeader ? subjectHeader.value : 'No Subject Header';
      const date = dateHeader ? dateHeader.value : 'No Date Header';

      return { id: message.id, from, subject, date };
    }));

    return emails;
  } catch (error) {
    console.error('Error fetching emails from Gmail API:', error);
    throw new Error('Failed to fetch emails');
  }
}

module.exports = {
  handleAuthCallback,
  fetchEmails,
};
