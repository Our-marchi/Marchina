"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
// import { useRouter } from 'next/navigation';

interface DecodedToken {
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  userid: string;
}

const EditProfile: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);

  // const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setFirstName(decodedToken.firstName);
      setLastName(decodedToken.lastName);
      setEmail(decodedToken.email);
      setAddress(decodedToken.address || '');
      setUserId(decodedToken.userid); 
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId) {
      console.error('User ID is null');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/api/user/update/${userId}`, {
        firstName,
        lastName,
        email,
        address,
      });
      console.log('Profile updated:', response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    if (!userId) {
      console.error('User ID is null');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/api/user/updatePassword/${userId}`, {
        currentPassword,
        newPassword,
      });
      console.log('Password updated:', response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error updating password:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-4">
        {/* Left sidebar */}
        <div className="w-full md:w-1/4 px-4 mb-8">
          <div className="mb-8">
            <div className="text-black text-base font-medium font-['Poppins'] leading-normal mb-4">Manage My Account</div>
            <div className="flex flex-col gap-2 ml-4">
              <div className="text-red-500 text-base font-normal font-['Poppins'] leading-normal">My Profile</div>
              <div className="opacity-50 text-black text-base font-normal font-['Poppins'] leading-normal">Address Book</div>
              <div className="opacity-50 text-black text-base font-normal font-['Poppins'] leading-normal">My Payment Options</div>
            </div>
          </div>
          <div className="mb-8">
            <div className="text-black text-base font-medium font-['Poppins'] leading-normal mb-4">My Orders</div>
            <div className="flex flex-col gap-2 ml-4">
              <div className="opacity-50 text-black text-base font-normal font-['Poppins'] leading-normal">My Returns</div>
              <div className="opacity-50 text-black text-base font-normal font-['Poppins'] leading-normal">My Cancellations</div>
            </div>
          </div>
          <div className="text-black text-base font-medium font-['Poppins'] leading-normal">My WishList</div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4 px-4">
          <div className="bg-white rounded shadow p-8">
            <h2 className="text-red-500 text-xl font-medium font-['Poppins'] leading-7 mb-6">Edit Your Profile</h2>
            
            <form onSubmit={handleSubmit}>
              {/* Form fields */}
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label className="text-black text-base font-normal font-['Poppins'] leading-normal">First Name</label>
                  <input
                    type="text"
                    placeholder={firstName}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-12 bg-neutral-100 rounded px-4 text-black text-base font-normal font-['Poppins'] leading-normal placeholder-black placeholder-opacity-50 mt-2"
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label className="text-black text-base font-normal font-['Poppins'] leading-normal">Last Name</label>
                  <input
                    type="text"
                    placeholder={lastName}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-12 bg-neutral-100 rounded px-4 text-black text-base font-normal font-['Poppins'] leading-normal placeholder-black placeholder-opacity-50 mt-2"
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label className="text-black text-base font-normal font-['Poppins'] leading-normal">Email</label>
                  <input
                    type="email"
                    placeholder={email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 bg-neutral-100 rounded px-4 text-black text-base font-normal font-['Poppins'] leading-normal placeholder-black placeholder-opacity-50 mt-2"
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label className="text-black text-base font-normal font-['Poppins'] leading-normal">Address</label>
                  <input
                    type="text"
                    placeholder={address}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-12 bg-neutral-100 rounded px-4 text-black text-base font-normal font-['Poppins'] leading-normal placeholder-black placeholder-opacity-50 mt-2"
                  />
                </div>
              </div>

              {/* Action buttons for profile update */}
              <div className="flex justify-end items-center gap-8 mt-6">
                <button type="button" className="text-black text-base font-normal font-['Poppins'] leading-normal">Cancel</button>
                <button type="submit" className="px-12 py-4 bg-red-500 rounded text-neutral-50 text-base font-medium font-['Poppins'] leading-normal">
                  Save Changes
                </button>
              </div>
            </form>

            {/* Password change section */}
            <form onSubmit={handlePasswordChange} className="mt-8">
              <h3 className="text-black text-base font-normal font-['Poppins'] leading-normal mb-4">Password Changes</h3>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/3 px-2 mb-4">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-12 bg-neutral-100 rounded px-4 text-black text-base font-normal font-['Poppins'] leading-normal placeholder-black placeholder-opacity-50"
                  />
                </div>
                <div className="w-full md:w-1/3 px-2 mb-4">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-12 bg-neutral-100 rounded px-4 text-black text-base font-normal font-['Poppins'] leading-normal placeholder-black placeholder-opacity-50"
                  />
                </div>
                <div className="w-full md:w-1/3 px-2 mb-4">
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-12 bg-neutral-100 rounded px-4 text-black text-base font-normal font-['Poppins'] leading-normal placeholder-black placeholder-opacity-50"
                  />
                </div>
              </div>

              {/* Action buttons for password change */}
              <div className="flex justify-end items-center gap-8 mt-6">
                <button type="button" className="text-black text-base font-normal font-['Poppins'] leading-normal">Cancel</button>
                <button type="submit" className="px-12 py-4 bg-red-500 rounded text-neutral-50 text-base font-medium font-['Poppins'] leading-normal">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;