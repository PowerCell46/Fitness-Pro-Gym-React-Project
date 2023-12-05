import { Link } from "react-router-dom";
import './footer.css';


export function Footer() {
    return (
    <footer>
        <ul>
            <h5>Contact us</h5>
            <li><a href="mailto:FitnessProGym@gmail.com?subject=Subject%20of%20the%20email&body=Body%20of%20the%20email" target='_blank'><i className="fa-solid fa-envelope"></i> <span>Email</span></a></li>
            <li><a href="https://www.facebook.com/fitnessprogym" target='_blank'><i className="fa-brands fa-facebook"></i> <span>Facebook</span></a></li>
            <li><a href="https://www.instagram.com/fitness.progym/" target='_blank'><i className="fa-brands fa-instagram"></i> <span>Instagram</span></a></li>
        </ul>
        
        <ul>
            <h5>Useful Links I</h5>
            <li><span><Link to={'/'}>Home Page</Link></span></li>
            <li><span><Link to={'/highlights'}>Highlights</Link></span></li>
            <li><span><Link to={'/memberships'}>Memberships</Link></span></li>
        </ul>

        <ul>
            <h5>Useful Links II</h5>
            <li><span><Link to={'/trainers'}>Trainers</Link></span></li>
            <li><span><Link to={'/products'}>Products</Link></span></li>
            <li><a href="https://www.google.com/maps/place/Fitness+Pro+Gym/@42.66501,23.297348,15z/data=!4m6!3m5!1s0x40aa84ee6f0e1c3f:0x7cf4bf6cf4fba837!8m2!3d42.66501!4d23.297348!16s%2Fg%2F11c73dtxdl?entry=ttu" target='_blank'><i className="fa-solid fa-map-location-dot"></i><span>Google Maps</span></a></li>
        </ul>
    </footer>
    );
}