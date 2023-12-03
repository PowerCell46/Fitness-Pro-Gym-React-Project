import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import './navigation.css';


export function Navigation() {
    const { user, setLogoutComponent, profilePhoto, numberOfCartProducts, isAdministrator } = useContext(AuthenticationContext);
    const [dropdown, setDropdown] = useState(false);

    return (
    <header>
        {!user ? <li><Link to={'/register'}>Register</Link></li> : "" /* No user */}  

        <li><Link to={'/highlights'}>Highlights</Link></li>        

        <li><Link to={'/products'}>Products</Link></li>

        {!user ? <li><Link to={'/login'}>Login</Link></li> : "" /* No user */}
        
        {user ? <li><Link to={'/memberships'}>Memberships</Link></li> : ""}

        {user ? <li><Link to={'/trainers'}>Trainers</Link></li>: ""}

        
        {user ? <li>
            <div className="profile-dropdown">
            <img src={`data:image/jpeg;base64,${profilePhoto}`} alt="Profile Photo" onClick={hiddenDropdownHandler}/>
                <div className="hidden-profile-view">
                    <ul>
                        <li><Link to={'/myProfile'}>My Profile</Link></li>
                      
                        {/* If the user is the administrator - access to create menus */}
                        {isAdministrator ? <li><Link to={'/postProduct'}>Create Product</Link></li> : ""}
                        {isAdministrator ? <li><Link to={'/postTrainer'}>Create Trainer</Link></li> : ""}
                      
                        <li>{<Link to={'/postHighlight'}>Post Highlight</Link>}</li>
                     
                        <li><a onClick={() => setLogoutComponent(true)}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </li> 
        : ""} 

        {user ? <li id="cart-div"> {/* Shopping Cart */}
            <Link to={'/checkout'}><i id="shopping-cart" className="fa-solid fa-cart-shopping"></i></Link>
            <Link id="shopping-cart-quantity-link" to={'/checkout'}><p id="shopping-cart-quantity">{numberOfCartProducts}</p></Link>
        </li> 
        : ""}
    </header>   
    );
    
    
    function hiddenDropdownHandler() {
        const hiddenDiv = document.querySelector(".hidden-profile-view");
        
        if (!dropdown) {
            hiddenDiv.style.display = 'block';
        
        } else {
            hiddenDiv.style.display = 'none';
        }

        setDropdown((oldValue) => !oldValue);
    }
}
