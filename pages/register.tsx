"use client"

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { authUser, createUser } from "../backend/controllers/user";

const Register = () => {

  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('0');

  const [isExistingUser, setIsExistingUser] = useState(false);

  const [triedToSubmit, setTriedToSubmit] = useState(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(parseInt(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSwap = () => {
    router.push('/login')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTriedToSubmit(true);
    console.log(isPasswordValid(password) )
    console.log(isEmailValid(email))
    console.log(isPhoneNumberValid(phoneNumber.toString()))
   
    if (isPasswordValid(password) && isEmailValid(email)) {
      const name = firstName +" "+lastName
      await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: role,
          classes:[]
        }), 
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          // console.log(res);
          res.json().then(json => {
            console.log(json);
            localStorage.setItem('user', email);
            console.log(role)
            router.push('/login')
          });
          
          return res;
        })
        .catch(error => console.error('Fetch error:', error));
      
    }
 
  };

    // Verifier for password length (at least 6 characters)
    const isPasswordValid = (password: string): boolean => {
        return password.length >= 1;
    };
    
    // Verifier for email format
    const isEmailValid = (email: string): boolean => {
        // Regular expression for a basic email format validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };
    
    // Verifier for phone number length (exactly 10 digits)
    const isPhoneNumberValid = (phoneNumber: string): boolean => {
        // Remove any non-digit characters from the phone number before checking its length
        const digitsOnly = phoneNumber.replace(/\D/g, '');
        return digitsOnly.length === 10;
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">{"Sign Up"}</h2>
        <form onSubmit={handleSubmit}>

          
            <div className="mb-4">
                <label htmlFor="First Name" className="block text-gray-600 font-medium">
                First Name
                </label>
                <input
                type="text"
                id="firstName"
                className="w-full p-2 border rounded mt-1"
                value={firstName}
                onChange={handleFirstNameChange}
                required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="Last Name" className="block text-gray-600 font-medium">
                Last Name
                </label>
                <input
                type="text"
                id="lastName"
                className="w-full p-2 border rounded mt-1"
                value={lastName}
                onChange={handleLastNameChange}
                required
                />
            </div>

            <div className='flex flex-col'>
                <label htmlFor="Role" className="block text-gray-600 font-medium">
                  What is your role?
                </label>
              <div className='flex flex-row justify-evenly py-4'>
                <button type="button"
                  className={"text-white px-4 py-2 rounded hover:bg-blue-500" + (role == '0' ? " bg-blue-600": " bg-blue-300" )}
                  onClick={() => setRole('0')}>STUDENT</button>
                <button type="button"
                  className={"text-white px-4 py-2 rounded hover:bg-blue-500" + (role == '1' ? " bg-blue-600": " bg-blue-300" )}
                  onClick={() => setRole('1')}>TEACHER</button>
              </div>
            </div>
            

        
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded mt-1"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {triedToSubmit && !isEmailValid(email) &&
                <p className="text-base text-red-600">Email must be valid!</p>}
            
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
              onChange={handlePasswordChange}
              required
            />
            {triedToSubmit && !isPasswordValid(password) &&
                <p className="text-base text-red-600">Password must be at least 6 characters long!</p>}
          </div>
          <div className="text-center flex- flex-col items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {"Sign Up"}
            </button>
            <div className="flex flex-row my-2">
                <p>{"Already a user?"}</p>
                <p className="text-blue-600 px-2 font-semibold hover:cursor-pointer"
                    onClick={() => handleSwap()}>{"Login!"}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;