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
        {!user ? <li><Link to={'/register'}>Register</Link></li> : "" /* No user */}    
        <li>{!user ? <Link to={'/memberships'}>Memberships</Link> : <Link to={'/postHighlight'}>Post a Highlight</Link>}</li>
        <li><Link to={'/highlights'}>Highlights</Link></li>        
        <li><Link to={'/products'}>Products</Link></li>
        {!user ? <li><Link to={'/login'}>Login</Link></li> : "" /* No user */}
        
        {user ? <li><a onClick={() => setLogoutComponent(true)}>Logout</a></li> : "" /* User */}
       

        {user ?
        JSON.parse(localStorage.getItem("authenticationTokenAndData")).isAdministrator ? 
        <li> {/* If the user is the administrator - access to create menus */}
            <div className="profile-dropdown">
                <img id="profilePicture" src={profilePicture} alt="Profile picture" onClick={hiddenDropdownHandler}/>
                <div className="hidden-profile-view">
                    <ul>
                        <li><Link to={'/postProduct'}>Create Product</Link></li>
                        <li><Link to={'/postTrainer'}>Create Trainer</Link></li>
                    </ul>
                </div>
            </div>
        </li> 
        : 
        <li> {/* If the user is not the administrator - the image is a link to My Profile */}
            <div className="profile-dropdown">
                <Link className="img-to-my-profile-link" to={'/myProfile'}>
                    <img id="profilePicture" src={profilePicture} alt="Profile picture" onClick={hiddenDropdownHandler}/>
                </Link>
            </div>
        </li>
    : // Remove the colon here
    "" }

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
    }
}
