
// // pages/classroom/[classId].js

// import React, { useEffect, useState } from "react";
// import { Classroom, EXAMPLE_CLASSROOM_1 } from "../../utils/types";
// import Link from "next/link";
// import ClassroomInfo from '../../components/ClassroomInfo';
// import ClassroomPostForm from '../../components/ClassroomPostForm';
// import PostsList from '../../components/PostsList';
// import PeoplesList from '../../components/PeoplesList';
// import { AppProps } from 'next/app';

// export default function Classroom({ classInfo } ) {
    
//   const [showTimeline, setShowTimeline] = useState(true);

//   useEffect(() => {
//     console.log(classInfo);
//   }, []);
    

//   // Sample assignments data
//   const posts = [
//     {
//       title: 'Math Homework 1',
//       description: 'Complete exercises 1-5 on page 25. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE',
//       dueDate: 'September 15, 2023',
//       attachment: null,
//     },
//     {
//       title: 'Math Homework 2',
//       description: 'Complete exercises 6-10 on page 25.',
//       dueDate: 'September 18, 2023',
//       attachment: {
//         type: "ASSIGNMENT",
//         fileName: "THE_PRESENTATION_NOTES.pptx",
//       }
//     },
//     // Add more assignments as needed
//   ];


//   return (
//     <div className="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
//         <div className="max-w-4xl w-[80%]">

//             {/* back to dashboard */ }
//             <Link href="/login" className="flex flex-row mb-8 items-center w-auto group hover:cursor-pointer">
//                 <img src="/icons/left-arrow.png" alt="Back Icon" 
//                     style={{ maxWidth: '20px', maxHeight: '20px' }}/>
//                 <p className="mx-4 group-hover:bg-gray-400">Back to Dashboard</p>
//             </Link>
            
//             <ClassroomInfo classroomInfo={classInfo} styles="mb-4" />

//             <ClassroomPostForm classInfo={classInfo} />

//             <div className='flex flex-row justify-between mx-8'>
//               <h2 className={"text-2xl font-semibold px-8 py-2 rounded-t-lg hover:cursor-pointer" + (showTimeline ? " bg-accent" : "")} 
//                 onClick={() => {setShowTimeline(true)}}>Timeline</h2>
//               <h2 className={"text-2xl font-semibold px-8 py-2 rounded-t-lg hover:cursor-pointer" + (!showTimeline ? " bg-accent" : "")} 
//                 onClick={() => {setShowTimeline(false)}}>People</h2>
//             </div>
//             {showTimeline ? <PostsList posts={classInfo.posts} /> : <PeoplesList classInfo={classInfo}/>}
            
//         </div>
      
//     </div>)
//   }
  
//   export async function getServerSideProps(context) {
//     // // Extract the classId parameter from the context
//     const { classCode } = context.query;

//     const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}class/getClassInfo`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         classCode: classCode
//       }), 
//     })
//     const data = await response.json()
//     console.log(data)
  
  
//     // // Fetch classroom data based on the classId
//     // // Replace this with your data fetching logic
//     // const classroom = await fetchClassroomData(classId);
//     // console.log(EXAMPLE_CLASSES)
//     // const classroom = EXAMPLE_CLASSES.find(item => item.classroomCode === classId);

//     // if (!classroom) {
//     //     // Classroom not found, you can return an error or handle it as needed
//     //     return {
//     //       notFound: true,
//     //     };
//     //   }
  
//     // Pass the classroom data as props 
//     return {
//       props: {
//         classInfo: data,
//       },
//     };
//   }
export {}