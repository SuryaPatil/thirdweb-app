"use client"

import { Classroom, EXAMPLE_CLASSES } from "../utils/types";
import { useEffect, useState } from "react";
import UserNotificationDashboard from "../components/UserNotificationDashboard";
import ClassroomCard from "../components/ClassroomCard";
import React from "react";
import { useRouter } from "next/navigation";

function AddClassModal ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (value: boolean) => void}) {
  const [classroomCode, setClassroomCode] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassroomCode(e.target.value);
  };

  const handleSubmit = async () => {
    // Handle form submission here, e.g., send the classroomCode to your API
    console.log('Submitted Classroom Code:', classroomCode);

    // TODO: handle adding classroom 
    await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}users/studentAddClass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        classCode: classroomCode,
        email: localStorage.getItem('user'),
      }), 
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        res.json().then(json => {
          if (json.status == false) {
            alert(json.message)
          }
        });
      })
      .catch(error => console.error('Fetch error:', error));
    // Close the modal
    setClassroomCode('');
    setIsOpen(false);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      {/* <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={() => setIsOpen(false)}></div> */}
      <div className="fixed inset-0 bg-gray-900 opacity-50 z-10" onClick={(e) => {e.stopPropagation(); setIsOpen(false)}}></div>
      <div className="flex flex-col bg-accent px-4 pb-4 pt-2 rounded-lg gap-4 z-20">
        <div>
          <div className="flex flex-row p-1 justify-end">
            <span className="hover:bg-gray-400 rounded-full p-1"  onClick={() => setIsOpen(false)}>
              <img src="/icons/close.png" alt="Close" 
                style={{ maxWidth: '16px', maxHeight: '16px'}}/>
            </span>
                  
          </div>
          
              <h3>Create a Class</h3>
            </div>
            <div className="flex flex-col">
              <label htmlFor="classroomCode">Classroom Code:</label>
              <input
                type="text"
                id="classroomCode"
                name="classroomCode"
                className="rounded-lg p-2"
                value={classroomCode}
                onChange={handleInputChange}
                autoComplete="off"
                autoCapitalize="off"
                autoFocus={true}
              />
            </div>
            <div className="modal-footer">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                Submit
              </button>
            </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);
  const [username, setUsername] = useState('');

  const toggleOptions = () => {
    setShowSettings(!showSettings);
  };

  const logout = () => {
    localStorage.removeItem('user');
    router.push("/login");
  }
  
  const [classSet, setClassSet] = useState<any[]>([])

  useEffect(() => {
    const user = localStorage.getItem('user');
    
    fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}users/listClasses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user
      }), 
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        // console.log(res);
        res.json().then(json => {
          console.log(json.docs);
          setClassSet(json.docs)
        });
        return res;
      })
      .catch(error => console.error('Fetch error:', error));

  }, [])

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
      <AddClassModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <div className="max-w-4xl w-[80%]">
        {/* User notification dashboard */ }
        <div className="bg-white p-4 shadow-md rounded-lg mb-4">
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold">Teacher Dashboard</h2>
          <div className="rounded-full p-1">
            <img src="/icons/setting.png" alt="Settings" 
                style={{ maxWidth: '24px', maxHeight: '24px'}}
                className={"hover:bg-gray-400 rounded-full" + (showSettings ? " bg-gray-400" : "")}
                onMouseDown={(e) => {
                  e.stopPropagation(); // Prevent parent link from navigating
                  toggleOptions();
                }} />

            {showSettings && (
              <div className="bg-red-400 p-2 group hover:bg-red-800 hover:cursor-pointer" 
                style={{
                  position: 'absolute',
                  top: 70, 
                  zIndex: 1, 
                }}>
            <ul>
              <li onClick={() => logout()}>
                <p className="text-white font-semibold">Log Out</p>
              </li>
            </ul>
          </div>
      )}
          </div>
          
        </div>
      </div>
      {/* User's classrooms */}
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold mb-4">My Classes</h1>
          <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex flex-row items-center"
            onClick={() => setIsModalOpen(true)}>
            <p>Add a Class</p>
            <img src="/icons/plus.png" alt="Add" 
              style={{ maxWidth: '20px', maxHeight: '20px'}}
              className="ml-2"/>
            
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center">
          {
        classSet.map( (classroom: any) => {
              const classData = JSON.parse(classroom);
              return (<ClassroomCard
                title={classData.title}
                classCode={classData.classCode}
                professor={classData.professor}

                key={classroom.name}
              />)

            }
            )
          }
      </div>
      </div>
    </div>
  );
}

