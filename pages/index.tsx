import { ConnectWallet, useStorageUpload } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
    <div  {...getRootProps()}> 
      <input {...getInputProps()} />
        <button>
          Drop files here to upload them to IPFS 
        </button>
    </div>
  );
};

export default Home;
