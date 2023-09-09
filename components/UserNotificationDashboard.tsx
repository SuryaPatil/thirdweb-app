"use client"

import { useState } from "react";

interface UserNotificationDashboardProps {
    userName: string, 
    assignments: any[],
}

export default function UserNotificationDashboard ({ userName, assignments }: UserNotificationDashboardProps) {
  const [showSettings, setShowSettings] = useState(false);

  const toggleOptions = () => {
    setShowSettings(!showSettings);
  };

    return (
      <div className="bg-white p-4 shadow-md rounded-lg mb-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold">Hello, {userName}!</h2>
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
              <li onClick={() => console.log("TODO: REMOVE USER FROM CLASS")}>
                <p className="text-white font-semibold">Log Out</p>
              </li>
            </ul>
          </div>
      )}
          </div>
          
        </div>
        {assignments.length == 0 ? 
          <h3 className="text-lg font-medium mt-2">Woohoo! You can relax. No assignments due soon!</h3> :
        (
          <>
            <h3 className="text-lg font-medium mt-2">Assignments Due Soon:</h3>
            <ul className="list-disc pl-6 mt-2">
              
              {assignments.map((assignment, index) => (
                <li key={index} className="text-gray-600">
                  {assignment.title} - Due on {assignment.dueDate}
                </li>
              ))}
            </ul>
          </>
        )
        }
      </div>
    );
  };