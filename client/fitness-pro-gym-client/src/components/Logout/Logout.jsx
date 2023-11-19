import "./logout.css";
import { useContext } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

export function Logout() {
    const {logoutSubmitHandler, setLogoutComponent} = useContext(AuthenticationContext);
    return (
    <section class="logout-section">
        <h3>Are you sure,<br/>you want to Logout?</h3>
        <div class="logout-buttons">
            <button onClick={() => setLogoutComponent(false)}>Cancel</button>
            <button onClick={logoutSubmitHandler}>Logout</button>
        </div>
    </section>
    )
}