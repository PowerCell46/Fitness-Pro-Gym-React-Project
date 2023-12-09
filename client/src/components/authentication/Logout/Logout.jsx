import "./logout.css";
import { useContext } from "react";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import { GlobalContext } from "../../../contexts/GlobalContext";


export function Logout() {
    const {navigate} = useContext(GlobalContext);
    const {setLogoutComponent, setUser, setProfilePhoto, logoutSubmitHandler, setIsAdministrator} = useContext(AuthenticationContext);
    
    return (
        <section className="logout-section">
            <h3>Are you sure<br/>you want to Logout?</h3>
            <div className="logout-buttons">
                <button onClick={() => setLogoutComponent(false)}>Cancel</button>
                <button onClick={() => logoutSubmitHandler(navigate, setLogoutComponent, setUser, setProfilePhoto, setIsAdministrator)}>Logout</button>
            </div>
        </section>
    );
}