import axios from 'axios';
import { useEffect, useState } from 'react';

const TableOne = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [accessToken, setAccessToken] = useState<string>('');

  // Fetch the access token from the backend API
  useEffect(() => {
    async function fetchAccessToken() {
      try {
        console.log('Fetching access token...');
        const response = await axios.get('http://localhost:5000/api/getAccesstoken');;
        console.log('Backend response:', response.data); // Log the response from the backend
        setAccessToken(response.data.access_token);
        console.log('Access token state updated:', response.data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    }
  
    fetchAccessToken();
  }, []);
  // Fetch emails using the retrieved access token
  useEffect(() => {
    if (!accessToken) return;

    async function getEmails() {
      try {
        const response = await axios.get('http://localhost:5000/api/gmail/emails', {
          params: { access_token: accessToken },
        });
        setEmails(response.data);
        console.log('emails',emails)
       
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    }

    getEmails();
  }, [accessToken]);
console.log(accessToken)
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Emails</h4>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">From</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Subject</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Date</h5>
          </div>
        </div>
        {emails.map((email, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${key === emails.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
            key={key}
          >
            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{email.from}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{email.subject}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{email.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
