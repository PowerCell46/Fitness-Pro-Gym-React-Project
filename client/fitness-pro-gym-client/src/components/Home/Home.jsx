import "./home.css";
import mainRoom from '../../../public/images/proGymRooms/main-room.jpg';
import secondRoom from '../../../public/images/proGymRooms/secondRoom.jpg';
import thirdRoom from '../../../public/images/proGymRooms/thirdRoom.jpg';
import fourthRoom from '../../../public/images/proGymRooms/fourthRoom.jpg';
import fifthRoom from '../../../public/images/proGymRooms/fifthRoom.jpg';

export function Home() {
    return (
    <>
        <section>
            <h1>Fitness Pro Gym</h1>
        </section>

        <main className="first-main">
            <div>
                <p>Fitness Pro Gym, located at Gotse Delchev neighbourhood, Sofia 1404. We offer a rich choice of proffessional instructors, fitness machines and top level quality products.</p>
            </div>
            <div>
                <h5>Find us on the Map</h5>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1195.2618190729377!2d23.29687476688384!3d42.66513715308453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa84ee6f0e1c3f%3A0x7cf4bf6cf4fba837!2sFitness%20Pro%20Gym!5e0!3m2!1sbg!2sbg!4v1697479912228!5m2!1sbg!2sbg" width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
            </div>
        </main>

        <div className="rooms-heading">
            <h2>Pro Gym Premises</h2>
        </div>

        <main className="first-main">
            <h2><span>Main room with:</span> <br/> Flat bench, Incline and Decline bench, Leg press, Dumbells, Cable machine and Much more!</h2>
            <div className="image-wrapper">
                <img src={mainRoom} alt=""/>
            </div>
        </main>

        <main className="second-main">
            <div className="image-wrapper">
                <img src={secondRoom} alt=""/>
            </div>
            <h2><span>Second room with:</span> <br/> Leg extensions, Peck deck, Crunch machine, Calves machine and a Chest press.</h2>
        </main>

        <main className="third-main">
            <h2><span>Third room with:</span> <br/> Obliques machine, Hamstrings machine, Lower back extension machine and an Abductors machine.</h2>
            <div className="image-wrapper">
                <img src="./images/thirdRoom.jpg" alt=""/>    
            </div>    
        </main>

        <main className="first-main">
            <div className="image-wrapper">
                <img src="./images/fourthRoom.jpg" alt=""/>    
            </div>    
            <h2><span>Fourth room with:</span> <br/> Space for stretching, Boxing bag, Yoga mats and an Yoga ball.</h2>
        </main>
        
        <main className="second-main">
            <h2><span>Cardio room with:</span> <br/> Two Fitness treadmills, Gym stepper and an Exercise bike.</h2>
            <div className="image-wrapper">
                <img src="./images/fifthRoom.jpg" alt=""/>    
            </div>    
        </main>
    </>
    );
}