import "./home.css";
import mainRoom from '../../../public/images/proGymRooms/main-room.jpg';
import secondRoom from '../../../public/images/proGymRooms/secondRoom.jpg';
import thirdRoom from '../../../public/images/proGymRooms/thirdRoom.jpg';
import fourthRoom from '../../../public/images/proGymRooms/fourthRoom.jpg';
import fifthRoom from '../../../public/images/proGymRooms/fifthRoom.jpg';
import { Main } from "./Main";


export function Home() {
    return (
    <>
        <section className="main-section">
            <h1 className="main-h1">Fitness Pro Gym</h1>
        </section>

        <main className="home-main first-main">
            <div>
                <p>Fitness Pro Gym, located at Gotse Delchev neighbourhood, Sofia 1404. We offer a rich choice of proffessional instructors, fitness machines and top level quality products.</p>
            </div>
            <div>
                <h5>Find us on the Map</h5>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1195.2618190729377!2d23.29687476688384!3d42.66513715308453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa84ee6f0e1c3f%3A0x7cf4bf6cf4fba837!2sFitness%20Pro%20Gym!5e0!3m2!1sbg!2sbg!4v1697479912228!5m2!1sbg!2sbg" width="600" height="450"      allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
            </div>
        </main>

        <div className="rooms-heading">
            <h2>Pro Gym Premises</h2>
        </div>
        
        <Main roomTitle="Main room with:" roomDesc="Flat bench, Incline and Decline bench, Leg press, Dumbells, Cable machine and Much more!" background="home-main second-main" img={mainRoom}/>   
       
        <Main roomTitle="Second room with:" roomDesc="Leg extensions, Peck deck, Crunch machine, Calves machine and a Chest press." background="home-main third-main" img={secondRoom} reverse={true}/>   

        <Main roomTitle="Third room with:" roomDesc="Obliques machine, Hamstrings machine, Lower back extension machine and an Abductors machine." background="home-main first-main" img={thirdRoom}/>   
    
        <Main roomTitle="Fourth room with:" roomDesc="Space for stretching, Boxing bag, Yoga mats and an Yoga ball." background="home-main second-main" img={fourthRoom} reverse={true}/>   
        
        <Main roomTitle="Cardio room with:" roomDesc="Two Fitness treadmills, Gym stepper and an Exercise bike." background="home-main third-main" img={fifthRoom}/>   
    </>
    );
}