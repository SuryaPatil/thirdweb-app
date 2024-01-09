"use client"

// pages/classroom.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { EXAMPLE_CLASSROOM_1 } from '../utils/types';
import ClassroomInfo from '../components/ClassroomInfo';
import ClassroomPostForm from '../components/ClassroomPostForm';
import PostsList from '../components/PostsList';
import PeoplesList from '../components/PeoplesList';

const Classroom = () => {

  const [user, setUser] = useState({isTeacher: false})

  useEffect(() => {
    
    const item = localStorage.getItem('user')!;
    console.log(item)
    const parsedUser = JSON.parse(item);
    console.log(parsedUser)
    setUser(parsedUser)
     
    async function fetchClasses(){
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}listClasses/${parsedUser._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json();
      //  console.log(data); // Use the data as needed
      }
      catch(e){
        console.log(e)
      }
      
    }
    fetchClasses()
    console.log(user)

  }, [])


  // Sample assignments data
  const posts = [
    {
      title: 'Math Homework 1',
      description: 'Complete exercises 1-5 on page 25. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE',
      dueDate: 'September 15, 2023',
      attachment: null,
    },
    {
      title: 'Math Homework 2',
      description: 'Complete exercises 6-10 on page 25.',
      dueDate: 'September 18, 2023',
      attachment: {
        type: "ASSIGNMENT",
        fileName: "THE_PRESENTATION_NOTES.pptx",
      }
    },
    // Add more assignments as needed
  ];

  const [showTimeline, setShowTimeline] = useState(true);
  const destination = user.isTeacher ? '/teacherDashboard' : '/studentDashboard';
  console.log(destination)
  return (
    <div className="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
        <div className="max-w-4xl w-[80%]">

            {/* back to dashboard */ }
            <Link href={destination} className="flex flex-row mb-8 items-center w-auto group hover:cursor-pointer">
                <img src="/icons/left-arrow.png" alt="Back Icon" 
                    style={{ maxWidth: '20px', maxHeight: '20px' }}/>
                <p className="mx-4 group-hover:bg-gray-400">Back to Dashboard</p>
            </Link>
            
            <ClassroomInfo classroomInfo={EXAMPLE_CLASSROOM_1} styles="mb-4" />

            <ClassroomPostForm classInfo={EXAMPLE_CLASSROOM_1} />

            <div className='flex flex-row justify-between mx-8'>
              <h2 className={"text-2xl font-semibold px-8 py-2 rounded-t-lg hover:cursor-pointer" + (showTimeline ? " bg-accent" : "")} 
                onClick={() => {setShowTimeline(true)}}>Timeline</h2>
              <h2 className={"text-2xl font-semibold px-8 py-2 rounded-t-lg hover:cursor-pointer" + (!showTimeline ? " bg-accent" : "")} 
                onClick={() => {setShowTimeline(false)}}>People</h2>
            </div>
            {showTimeline ? <PostsList posts={posts} /> : <PeoplesList classInfo={EXAMPLE_CLASSROOM_1}/>}
            
        </div>
      
    </div>
  );
};

export default Classroom;
