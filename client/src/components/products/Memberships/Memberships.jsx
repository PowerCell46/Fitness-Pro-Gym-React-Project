import { useState } from 'react';
import { MembershipsSection } from './MembershipsSection';
import './memberships.css';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { getUserId } from '../../../utils/getUserId';
import { errorToastMessage } from '../../../utils/toastify';
import { GlobalContext } from '../../../contexts/GlobalContext';


export function Memberships() {
    const {navigate} = useContext(GlobalContext);
    const {user} = useContext(AuthenticationContext);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (user) {
            getUserId(user, setUserId, errorToastMessage, navigate);
        }
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