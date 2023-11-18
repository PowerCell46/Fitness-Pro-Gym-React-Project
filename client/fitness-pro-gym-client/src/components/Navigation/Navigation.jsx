import { Link } from "react-router-dom";
import profilePicture from '../../../public/images/profile_picture.jpg';
import './navigation.css';
import { useState } from "react";

export function Navigation() {
    const [dropdown, setDropdown] = useState(false);

    return (
        <header>
        <li><Link to={'/register'}>Register</Link></li>
        <li><Link to={'/memberships'}>Memberships</Link></li>
        <li><Link to={'/highlights'}>Highlights</Link></li>        
        <li><Link to={'/products'}>Products</Link></li>
        <li><Link to={'/login'}>Login</Link></li>
        {/* <li><Link to={'/logout'}>Logout</Link></li> */}
        {/* <li>
            <div className="profile-dropdown">
                <img id="profilePicture" src={profilePicture} alt="Profile picture" onClick={hiddenDropdownHandler}/>
                <div className="hidden-profile-view">
                    <ul>
                     <li><Link to={'/create/product'}>Create Product</Link></li>
                     <li><Link to={'/create/trainer'}>Create Trainer</Link></li>
                    </ul>
                 </div>
            </div>
        </li>         */}
    </header>
    );
    
    function hiddenDropdownHandler() {
        const hiddenDiv = document.querySelector(".hidden-profile-view");
        
        if (!dropdown) {
            hiddenDiv.style.opacity = 1;
        
        } else {
            hiddenDiv.style.opacity = 0;
        }

        setDropdown((oldValue) => !oldValue);
        console.log(dropdown);
    }
}
