import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import './navigation.css';
import profilePicture from '../../../public/images/profile_picture.jpg';

export function Navigation() {
    const {user, setLogoutComponent} = useContext(AuthenticationContext);
    const [dropdown, setDropdown] = useState(false);

    return (
        <header>
        {!user ? <li><Link to={'/register'}>Register</Link></li> : ""}        
        <li><Link to={'/memberships'}>Memberships</Link></li>
        <li><Link to={'/highlights'}>Highlights</Link></li>        
        <li><Link to={'/products'}>Products</Link></li>
        {!user ? <li><Link to={'/login'}>Login</Link></li> : ""}
        
        {user ? <li><a onClick={() => setLogoutComponent(true)}>Logout</a></li> : ""}
        {user ? <li>
            <div className="profile-dropdown">
                <img id="profilePicture" src={profilePicture} alt="Profile picture" onClick={hiddenDropdownHandler}/>
                <div className="hidden-profile-view">
                    <ul>
                     <li><Link to={'/create/product'}>Create Product</Link></li>
                     <li><Link to={'/create/trainer'}>Create Trainer</Link></li>
                    </ul>
                 </div>
            </div>
        </li>
        : "" 
        }
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
