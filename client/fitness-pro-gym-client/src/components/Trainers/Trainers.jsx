import { useEffect, useState } from "react";
import "./trainers.css";

export function Trainers() {
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        
        async function fetchTrainersData() {
            const response = await fetch("http://localhost:5000/trainers");
            if (!response.ok) {
                console.log(response);
            }

            const data = await response.json();
            console.log(data);
            setTrainers(data);
        }

        fetchTrainersData();
    }, 
    []);

    return (
<main className="trainers-main">

    <div class="trainer-section">
        <img src="https://barbend.com/wp-content/uploads/2023/07/Jeff-Nippard.png" alt="jeff-nippard profile photo"/>
        <h5>Name: Jeff Nippard</h5>
        <a class="clickable" target="_blank" href="mailto:jeff-nippard@example.com?subject=Subject%20of%20the%20email&body=Body%20of%20the%20email">Email: jeff-nippard.com</a>
        <a class="clickable" href="tel:+23546687564">Telephone: +23546687564</a>
    </div>
    <div class="trainer-section">
        <img src="./images/NewPic.PNG" alt="jeff-nippard profile photo"/>
        <h5>Name: Peter Gerdzhikov</h5>
        <a class="clickable" target="_blank" href="mailto:jeff-nippard@example.com?subject=Subject%20of%20the%20email&body=Body%20of%20the%20email">Email: jeff-nippard.com</a>
        <a class="clickable" href="tel:+23546687564">Telephone: +23546687564</a>
    </div>
    <div class="trainer-section">
        <img src="https://barbend.com/wp-content/uploads/2023/07/Jeff-Nippard.png" alt="jeff-nippard profile photo"/>
        <h5>Name: Stiliyan Nikolov</h5>
        <a class="clickable" target="_blank" href="mailto:jeff-nippard@example.com?subject=Subject%20of%20the%20email&body=Body%20of%20the%20email">Email: jeff-nippard.com</a>
        <a class="clickable" href="tel:+23546687564">Telephone: +23546687564</a>
    </div>
    <div class="trainer-section">
        <img src="https://barbend.com/wp-content/uploads/2023/07/Jeff-Nippard.png" alt="jeff-nippard profile photo"/>
        <h5>Name: Jeff Nippard</h5>
        <a class="clickable" target="_blank" href="mailto:jeff-nippard@example.com?subject=Subject%20of%20the%20email&body=Body%20of%20the%20email">Email: jeff-nippard.com</a>
        <a class="clickable" href="tel:+23546687564">Telephone: +23546687564</a>
    </div>
    <div class="trainer-section">
        <img src="https://barbend.com/wp-content/uploads/2023/07/Jeff-Nippard.png" alt="jeff-nippard profile photo"/>
        <h5>Name: Jeff Nippard</h5>
        <a class="clickable" target="_blank" href="mailto:jeff-nippard@example.com?subject=Subject%20of%20the%20email&body=Body%20of%20the%20email">Email: jeff-nippard.com</a>
        <a class="clickable" href="tel:+23546687564">Telephone: +23546687564</a>
    </div>
    <div class="trainer-section">
        <img src="https://barbend.com/wp-content/uploads/2023/07/Jeff-Nippard.png" alt="jeff-nippard profile photo"/>
        <h5>Name: Peter Gerdzhikov</h5>
        <a class="clickable" target="_blank" href="mailto:jeff-nippard@example.com?subject=Subject%20of%20the%20email&body=Body%20of%20the%20email">Email: jeff-nippard.com</a>
        <a class="clickable" href="tel:+23546687564">Telephone: +23546687564</a>
    </div>
    <div class="trainer-section">
        <img src="https://barbend.com/wp-content/uploads/2023/07/Jeff-Nippard.png" alt="jeff-nippard profile photo"/>
        <h5>Name: Stiliyan Nikolov</h5>
        <a class="clickable" target="_blank" href="mailto:jeff-nippard@example.com?subject=Subject%20of%20the%20email&body=Body%20of%20the%20email">Email: jeff-nippard.com</a>
        <a class="clickable" href="tel:+23546687564">Telephone: +23546687564</a>
    </div>
    <div class="trainer-section">
        <img src="https://barbend.com/wp-content/uploads/2023/07/Jeff-Nippard.png" alt="jeff-nippard profile photo"/>
        <h5>Name: Jeff Nippard</h5>
        <a class="clickable" target="_blank" href="mailto:jeff-nippard@example.com?subject=Subject%20of%20the%20email&body=Body%20of%20the%20email">Email: jeff-nippard.com</a>
        <a class="clickable" href="tel:+23546687564">Telephone: +23546687564</a>
    </div>

</main>

    );
}