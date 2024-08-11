'use client';

import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode'
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
<<<<<<< HEAD
import { fromJSON } from 'postcss';
type DecodedToken = {
  id: string;
  [key: string]: any;
};

=======
import  {jwtDecode}  from 'jwt-decode';
>>>>>>> b4b7c95dbe572e50473b2b87a83244dfd0de0698

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  console.log(email,password)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ token: string }>("http://localhost:5000/api/user/logIn", { email, password });
      const token = response.data.token
      console.log(response.data);
      // const decoded= jwtDecode('token').default
      // console.log(decoded,'test');
      
      localStorage.setItem("token", response.data.token);
      const decodedToken = jwtDecode<DecodedToken>(token);
      const userId = decodedToken.id;
      localStorage.setItem("userId", userId);
      
      
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
        confirmButtonColor: 'black',
        confirmButtonText: 'Continue',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
        }
      });
    } catch (error) {
      console.log("Login error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password. Please try again.',
        confirmButtonColor: 'red',
      });
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/2 bg-cover bg-center relative">
        <Image
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Shopping cart with smartphone"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Log in to Exclusive</h2>
          <p className="text-gray-600 mb-8">Enter your details below</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Email or Phone Number"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Log In
              </button>
              <Link href="/forgot-password" className="text-red-500 hover:underline">
                Forget Password?
              </Link>
            </div>
          </form>
          <div className="text-center">
            <p className="text-gray-600 mb-2">Don't have an account?</p>
            <button
              onClick={() => router.push('/SignUp')}
              className="bg-white text-red-500 px-6 py-2 rounded-md border border-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;