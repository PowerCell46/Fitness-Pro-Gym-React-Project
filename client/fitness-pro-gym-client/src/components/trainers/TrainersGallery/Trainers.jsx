import { useEffect, useState } from "react";
import "./trainers.css";


export function Trainers() {
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        async function fetchTrainersData() {
           try {    
                var response = await fetch("http://localhost:5000/trainers");
           } catch {
                return navigate("/404");
           }
          
            if (!response.ok) {
                const errorData = await response.json();

                errorToastMessage(errorData.error);
                
                return navigate('/404'); 
            }

            const data = await response.json();

            setTrainers(data);
        }

        fetchTrainersData();
    }, 
    []);

    return (
        <main className="trainers-main">
            
            {trainers.map((trainer) => 
            <div className="trainer-section">
                <img src={`data:image/jpeg;base64,${trainer.photo}`} alt=""/>
                <h5>Name: {trainer.name}</h5>
                <a className="clickable" target="_blank" href={`mailto:${trainer.email}?subject=Subject%20of%20the%20email&body=Body%20of%20the%20email`}>Email: {trainer.email}</a>
                <a className="clickable" href={`tel:+${trainer.phoneNumber}`}>Telephone: +{trainer.phoneNumber}</a>
            </div>)}

        </main>
    );
}