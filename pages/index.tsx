import { ConnectWallet, useStorageUpload } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import sendMessage from "../messaging/twilio.js"

const Home: NextPage = () => {

  const { mutateAsync: upload } = useStorageUpload(); 
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Perform localStorage action
     setUser(localStorage.getItem('user'));
  }, [])


  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-12 px-24 z-10">
      
        <img src="/images/classroom-technology.jpg" alt="Classroom using technology" className='rounded-lg border-4 border-accent' />
        <h1 className="m-4">EdBlock</h1>
        <p className="font-semibold text-center">Empowering classrooms through a decentralized system</p>
        <div className="flex md:flex-row flex-col w-full items-center justify-center gap-4 py-4">
          <Link href="/learn-more" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex-1 max-w-xs text-center">
            <p>Learn More</p>
          </Link>
          <Link href={"/register"}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex-1 max-w-xs text-center">
            <p>Get Started</p>
          </Link>
        </div>
    </main>
    
  );
};

export default Home;  

