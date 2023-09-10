import { ConnectWallet, useStorageUpload } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import sendMessage from "../messaging/twilio.js"

const Home: NextPage = () => {

//   async function sendRequest() {
//     console.log("CLICKED");
//     const response = await fetch("http://localhost:3001/users/authUser", {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     email: "RandomOtter",
//     password: "password",
//   }), // Send your data in JSON format
// })
//   .then(res => {
//     if (!res.ok) {
//       throw new Error('Network response was not ok');
//     }
//     // console.log(res);
//     res.json().then(json => {
//       console.log(json);
//     });
//     return res;
//   })
//   .catch(error => console.error('Fetch error:', error));

//     // fetch(process.env.HOST_NAME + "users/authUser")
//   }

  const { mutateAsync: upload } = useStorageUpload(); 
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Perform localStorage action
     setUser(localStorage.getItem('user'));
  }, [])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const uris = await upload({data: acceptedFiles}); 
      console.log(uris);
    },
    [upload],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop })



  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-12 px-24 z-10">
      
        <img src="/images/classroom-technology.jpg" alt="Classroom using technology" className='rounded-lg border-4 border-accent' />
        <h1 className="m-4">EdBlock</h1>
        <p className="font-semibold text-center">Empowering classrooms through a decentralized system</p>
        <div className="flex md:flex-row flex-col w-full items-center justify-center gap-4 py-4">
          <Link href="/learn-more" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex-1 max-w-xs text-center">
            <p>Learn More</p>
          </Link>
          <Link href={user != null ? "/dashboard" : "/login"}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex-1 max-w-xs text-center">
            <p>Get Started</p>
          </Link>
        </div>
        <div  {...getRootProps()}> 
      <input {...getInputProps()} />
        <button>
          Drop files here to upload them to IPFS 
        </button>
    </div>
    {/* <button
     onClick={(e) => onSubmit(e)}>SEND TWILIO</button>
     <button
     onClick={()=>sendRequest()}>CLICKING</button> */}

      {/* <div className="absolute inset-0">
        <img src="/images/classroom-technology.jpg" alt="Classroom using technology" className="w-full h-full object-cover opacity-30 z-0" />
      </div> */}
      {/* <footer className='mt-auto text-center'>
        <a href="https://www.flaticon.com/free-icons/note" title="note icons">Note icons created by Freepik - Flaticon</a>
      </footer> */}
    </main>
    
  );
};

export default Home;  

