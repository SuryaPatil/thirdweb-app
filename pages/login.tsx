"use client"

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { authUser, createUser } from "../backend/controllers/user";
import { Router } from 'next/router';
import axios from 'axios';
const Login = () => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email)
        console.log(password)
        
        try{
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}authUser`, {email, password})
            console.log(res.data)
            if(res.data === "User not found" || res.data === 'Invalid password'){
                alert("Invalid email or password")
            }


        } catch(e){
            console.log(e)
        }
        
    }
    const handleSwap = async () => {
        router.push("/register")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">{ "Login" }</h2>
            <form onSubmit={handleSubmit}>
    
       
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border rounded mt-1"
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                  required
                />
                
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border rounded mt-1"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value)}}
                  required
                />
              </div>
              <div className="text-center flex- flex-col items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  { "Login" }
                </button>
                <div className="flex flex-row my-2">
                    <p>{"Don't have an account?"}</p>
                    <p className="text-blue-600 px-2 font-semibold hover:cursor-pointer"
                        onClick={() => handleSwap()}>{"Sign Up!"}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
}

export default Login