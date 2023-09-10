import { useEffect, useState } from "react"

const PersonCard = ({name} : { name: string }) => {
    return (
        <div className="flex flex-row justify-between items-center rounded-lg shadow-md bg-white px-8 py-4">
            <p>{name}</p>
            <div className="flex flex-row gap-4">
                <span className="hover:bg-gray-400 rounded-full p-1">
                    <img src="/icons/call.png" alt="Call" 
                        style={{ maxWidth: '32px', maxHeight: '32px'}}
                        />
                </span>
                
                <span className="hover:bg-gray-400 rounded-full p-1">
                    <img src="/icons/mail.png" alt="Call" 
                        style={{ maxWidth: '32px', maxHeight: '32px'}}/>
                </span>
                
            </div>
        </div>
    )
}

export default function PeoplesList ({ classInfo }: { classInfo: any}) {
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}class/getClassStudents`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              classTitle: classInfo.title
            }), 
          })
            .then(res => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              // console.log(res);
              res.json().then(json => {
                console.log(json.docs);
                if (json.docs != undefined) {
                    setStudentList(json.docs)
                }
              });
              return res;
            })
            .catch(error => console.error('Fetch error:', error));
    }, [])
    const admin = [
        {
            name: "PROFESSOR A"
        }
    ]

    const students = [
        {
            name: "STUDENT A"
        },
        {
            name: "STUDENT B"
        },
        {
            name: "STUDENT C"
        },
        {
            name: "STUDENT D"
        },
        {
            name: "STUDENT E"
        },
        {
            name: "STUDENT F"
        },
        {
            name: "STUDENT G"
        }
    ]

    return (
        <div className="bg-accent shadow-md rounded-lg p-4">
            <h2>Admin</h2>
                <div className="flex flex-col gap-4 my-2">
                    <PersonCard name={classInfo.professor} key={classInfo.professor} />
                </div>
                

            <h2>Students</h2>
                <div className="flex flex-col gap-4 my-2">
                    {studentList.map((person: any, index: number) => (
                        <PersonCard name={person.name} key={index} />
                    ))}
                </div>
                
    </div>
    )
}