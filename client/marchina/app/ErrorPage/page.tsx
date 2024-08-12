"use client"
import React from 'react';
import '../ErrorPage/page.css'; 
import { useRouter } from 'next/navigation';

const ErrorPage: React.FC = () => {
    const route = useRouter();
  
    return (
      <div className="not-found-container">
        <div className="breadcrumb">Home / 404 Error</div>
        <h1 className='h1'>404 Not Found</h1>
        <p><b>Your visited page not found. You may go home page.</b></p>
        <button
          className='butnot'
          style={{ background: '#db4444', color: 'white', margin: '15px' }}
          onClick={() => {route.push('/')}} 
        >
          Back to home page
        </button>
      </div>
    );
  }
  
  export default ErrorPage;
  