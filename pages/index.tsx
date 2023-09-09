import { ConnectWallet, useStorageUpload } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Link from "next/link";

const Home: NextPage = () => {

  const { mutateAsync: upload } = useStorageUpload(); 

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
          <Link href="/login"
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
