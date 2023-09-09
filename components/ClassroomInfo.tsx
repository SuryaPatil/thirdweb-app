"use client"

import { displayName } from "@/utils/functions";
import { Classroom } from "@/utils/types";
import React, { useEffect, useState } from "react";

interface ClassroomInfoProps {
    styles: string
    classroomInfo: Classroom
}

const ClassroomInfo = ({ styles, classroomInfo }: ClassroomInfoProps) => {

  const [isClassroomCodeVisible, setIsClassroomCodeVisible] = useState(false);

  useEffect(() => {
    console.log("hey");
  }, [isClassroomCodeVisible])

  const toggleDisplayClassroomCode = () => {
    console.log("clicked");
    setIsClassroomCodeVisible(!isClassroomCodeVisible);
  };

  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${styles}`}>
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <h1>{classroomInfo.name}</h1>
                <h3 className="text-gray-600">{displayName(classroomInfo.teacher) }</h3>
                <p>{classroomInfo.description}</p>
            </div>

            <div onClick={toggleDisplayClassroomCode} className="mx-2 hover:bg-gray-300 hover:cursor-pointer rounded-full">
                <img src="/icons/information.png" alt="Classroom information" 
                    style={{ maxWidth: '32px', maxHeight: '32px' }}/>
            </div>
        </div>
        {isClassroomCodeVisible && (
            <div className="mt-4">
            <p><b>Classroom Code:</b> {classroomInfo.classroomCode}</p>
            </div>
        )}
    </div>
  );
};

export default ClassroomInfo;