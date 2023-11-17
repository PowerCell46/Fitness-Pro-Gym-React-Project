import './footer.css';

export function Footer() {
    return (
    <footer>
        <ul>
            <h5>Contact us</h5>
            <li><i className="fa-solid fa-envelope"></i> <span>Email</span></li>
            <li><i className="fa-brands fa-facebook"></i> <span>Facebook</span></li>
            <li><i className="fa-brands fa-instagram"></i> <span>Instagram</span></li>
        </ul>
        
        <ul>
            <h5>Useful links</h5>
            <li><span>My account</span></li>
            <li><span>Highlights</span></li>
            <li><span>Trainers</span></li>
        </ul>

        <ul>
            <h5>Pro Gym Products</h5>
            <li><span>Food Supplements</span></li>
            <li><span>Fitness Machines</span></li>
            <li><span>Merchandise</span></li>
        </ul>
    </footer>
    )
}