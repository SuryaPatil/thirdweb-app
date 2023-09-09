"use client"

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const Login = () => {

  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    console.log(e.target.value)
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSwap = () => {
    setIsExistingUser(!isExistingUser);
    setFirstName('');
    setLastName('');
    setPhoneNumber(0);
    setEmail('')
    setPassword('');
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTriedToSubmit(true);
    console.log(isPasswordValid(password) )
    console.log(isEmailValid(email))
    console.log(isPhoneNumberValid(phoneNumber.toString()))
    if (isExistingUser) {
        if (isPasswordValid(password) && isEmailValid(email) && isPhoneNumberValid(phoneNumber.toString())) {

            // TODO: LOGIN LOGIC Add your login logic here
         router.push('/dashboard');
         console.log('Login clicked with email:', email, 'and password:', password);
     }
    } else {
        if (isPasswordValid(password) && isEmailValid(email)) {

            // TODO: LOGIN LOGIC Add your login logic here
         router.push('/dashboard');
         console.log('Login clicked with email:', email, 'and password:', password);
        }
    }
    router.push('/dashboard');
    
 
  };

    // Verifier for password length (at least 6 characters)
    const isPasswordValid = (password: string): boolean => {
        return password.length >= 6;
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
        <h2 className="text-2xl font-semibold mb-4">{isExistingUser ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>

          {!isExistingUser && 
          <>
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

            <div className="mb-4">
                <label htmlFor="Phone Number" className="block text-gray-600 font-medium">
                Phone Number
                </label>
                <input
                type="number"
                id="phoneNumber"
                className="w-full p-2 border rounded mt-1"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
                />
                {triedToSubmit && !isPhoneNumberValid(password) &&
                <p className="text-base text-red-600">Phone number must be valid!</p>}
            </div>
          </>}
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
            {triedToSubmit && !isEmailValid(password) &&
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
              {isExistingUser ? "Login" : "Sign Up"}
            </button>
            <div className="flex flex-row my-2">
                <p>{isExistingUser ? "Don't have an account?" : "Already a user?"}</p>
                <p className="text-blue-600 px-2 font-semibold hover:cursor-pointer"
                    onClick={() => handleSwap()}>{isExistingUser ? "Sign Up!" : "Login!"}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
