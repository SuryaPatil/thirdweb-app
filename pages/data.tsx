import React from "react";

export default function DataMaker() {
    async function createClass () {
        // await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}class/createClass`, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: "kobez@gmail.com",
        //         classTitle: "fundamentals 3",
        //         classDescription: "this is fundamentals 3",
        //         classCode: "F3!"
        //     }), 
        //   })
        //     .then(res => {
        //       if (!res.ok) {
        //         throw new Error('Network response was not ok');
        //       }
        //       // console.log(res);
        //       res.json().then(json => {
        //         console.log(json);
        //       });
        //       return res;
        //     })
        //     .catch(error => console.error('Fetch error:', error));
        await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('user')
            }), 
          })
            .then(res => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              res.json().then(json => {
                console.log(json.docs.role);
              });
              return res;
            })
            .catch(error => console.error('Fetch error:', error));
    }

    return (
        <button className="bg-blue-600 p-8" 
            onClick={() => createClass()}>JUST DO IT</button>
    )
}