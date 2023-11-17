import { Link } from "react-router-dom";
import profilePicture from '../../../public/images/profile_picture.jpg';
import './navigation.css';
import { useState } from "react";

export function Navigation() {
    const [dropdown, setDropdown] = useState(false);

    return (
        <header>
        {/* <!-- <li><a href="../registerView/register.html">Register</a></li> --> */}
        <li><a href="">Memberships</a></li>
        <li><a href="../galleryView/gallery.html">Highlights</a></li>        
        <li><a href="../shoppingListView/shoppingList.html">Products</a></li>
        {/* <!-- <li><a href="../loginView/login.html">Login</a></li> --> */}
        <li><a href="">Logout</a></li>
        <li>
            <div className="profile-dropdown">
                <img id="profilePicture" src={profilePicture} alt="Profile picture" onClick={hiddenDropdownHandler}/>
                <div className="hidden-profile-view">
                    <ul>
                     <li><a href="../createView/create.html">Create Product</a></li>
                     <li><a href="">Add Trainer</a></li>
                    </ul>
                 </div>
            </div>
        </li>        
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
