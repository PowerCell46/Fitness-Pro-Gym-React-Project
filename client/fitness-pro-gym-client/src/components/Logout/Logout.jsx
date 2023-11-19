import "./logout.css";
import { useContext } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

export function Logout() {
    const {logoutSubmitHandler} = useContext(AuthenticationContext);
    return (
        <div className="logout">
            <button onClick={logoutSubmitHandler}>Logout</button>
        </div>
    )
}