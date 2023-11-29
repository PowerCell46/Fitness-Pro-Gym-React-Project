import { MembershipsSection } from './MembershipsSection';
import './memberships.css';


export function Memberships() {
    return (
        <main className='memberships-main'>
          
            <h1>Pro Gym Memberships</h1>
           
            <MembershipsSection title={"Single Workout"} under18={2} men={4} women={3}/>
           
            <MembershipsSection title={"Weekly Membership"} under18={8} men={12} women={10}/>
           
            <MembershipsSection title={"Monthly Membership"} under18={30} men={38} women={32}/>
           
            <MembershipsSection title={"Three Months Membership"} under18={85} men={105} women={95}/>
          
            <MembershipsSection title={"Six Months Membership"} under18={150} men={190} women={180}/>
         
            <MembershipsSection title={"Year Membership"} under18={200} men={250}  women={220}/>
       
        </main>
    );
}