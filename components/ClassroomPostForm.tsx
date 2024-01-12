import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ConnectWallet, useStorageUpload } from "@thirdweb-dev/react";

 const sgMail = require('@sendgrid/mail')
 sgMail.setApiKey(process.env.NEXT_PUBLIC_SG_API_KEY)


function ClassroomPostForm({classInfo}: {classInfo: any}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('')
  const [file, setFile] = useState<any>(null);
  const [openPost, setOpenPost] = useState(false);
  const [fileURI, setFileURI] = useState("No files uploaded");

  const { mutateAsync: upload } = useStorageUpload(); 

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const uris = await upload({data: acceptedFiles}); 

      console.log(uris[0]);
      console.log(typeof(uris[0]));
      setFileURI(uris[0]);
      setOpenPost(true)

    },
    [upload],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop })



  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}createPost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        classId: classInfo._id,
        title: title,
        description: description,
        postBy: classInfo.teacherName,
        dueDate: dueDate,
        fileURI: fileURI 
      }), 
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        // console.log(res);
        res.json().then(json => {
          console.log(json);
        });
        setOpenPost(false);
        setDescription("")
        setTitle("")
        setFileURI("")
        setDueDate("")
      })
      .catch(error => console.error('Fetch error:', error));
  };
  const close = () => {
    setOpenPost(false);
    setDescription("")
    setTitle("")
    setFileURI("")
    setDueDate("")
  }
  return (
    <div className="my-8 bg-white rounded-lg px-4 py-4">
      <div className='flex flex-row justify-between align-center'> 
        <h1 className="text-2xl font-semibold mb-4">Post to Classroom</h1>
        {openPost ? 
        <button type="button"
          className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => close()}>Close</button> : 
        <button type='button'
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setOpenPost(true)}>Post</button>}
      </div>
      {openPost && 
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-600">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-600">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="dueDate" >Due Date</label>
            <input
              id="dueDate"
              name="dueDate"
              value={dueDate}
              onChange={handleDueDateChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div  {...getRootProps()}> 
            <input {...getInputProps()} />
            <button type="button" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 bg-blue-100">
              Drop files here to upload them to IPFS 
            </button>          
          </div>
          <button type="submit" >Post to classroom</button>
        </form>
      } 
    </div>
  );
}

export default ClassroomPostForm;
