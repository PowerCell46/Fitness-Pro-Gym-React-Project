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
            <h5>Useful links</h5>
            <li><span><Link to={'/'}>Home Page</Link></span></li>
            <li><span><Link to={'/myProfile'}>My Profile</Link></span></li>
            <li><span><Link to={'/checkout'}>Checkout</Link></span></li>
        </ul>

        <ul>
            <h5>Pro Gym Products</h5>
            <li><span><Link to={'/products/foodSupplements'}>Food Supplements</Link></span></li>
            <li><span><Link to={'/products/fitnessMachines'}>Fitness Machines</Link></span></li>
            <li><span><Link to={'/products/merchandise'}>Merchandise</Link></span></li>
        </ul>
    </footer>
    );
}