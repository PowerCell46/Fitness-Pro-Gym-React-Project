import { useState } from 'react';
import { MembershipsSection } from './MembershipsSection';
import './memberships.css';
import { useEffect } from 'react';


export function Memberships() {
    const [userId, setUserId] = useState("");

    useEffect(() => {
        async function  getUserId() {
            try {
                const response = await fetch("http://localhost:5000/users/getUserId", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify( {token:  JSON.parse(localStorage.getItem("authenticationTokenAndData")).token})
                });
        
                if (response.status === 200) {
                    const data  = await response.json();

                    setUserId(data.userId);
        
                } else {
                    const errorData = await serverResponse.json();
                
                    errorToastMessage(errorData.error);
        
                    return navigate("/404");
                }
                
            } catch {
                navigate('/404');
            }
        }

        getUserId();
    }, []);
    return (
        <main className='memberships-main'>
          
            <h1>Pro Gym Memberships</h1>
           
            <MembershipsSection title={"Single Workout"} under18={2} men={4} women={3} userId={userId}/>
           
            <MembershipsSection title={"Weekly Membership"} under18={8} men={12} women={10} userId={userId}/>
           
            <MembershipsSection title={"Monthly Membership"} under18={30} men={38} women={32} userId={userId}/>
           
            <MembershipsSection title={"Three Months Membership"} under18={85} men={105} women={95} userId={userId}/>
          
            <MembershipsSection title={"Six Months Membership"} under18={150} men={190} women={180} userId={userId}/>
         
            <MembershipsSection title={"Year Membership"} under18={200} men={250}  women={220} userId={userId}/>
       
        </main>
    );
}