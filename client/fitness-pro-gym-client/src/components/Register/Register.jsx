import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import "./resgister.css";

export function Register() {
    const {registerSubmitHandler} = useContext(AuthenticationContext);

    return (
        <main className="register-main">
       
        <h1>Register</h1>
        
        <form onSubmit={registerSubmitHandler}>
            <p id="register-email-err-p" className="err-message">Email is not valid!</p>
            <input id="register-email" type="text" name="email" placeholder="Email" className="err-input-field"/>

            <p id="register-username-err-p" className="err-message">Username is not valid!</p>
            <input id="register-username" type="text" name="username" placeholder="Username"/>

            <p id="register-password-err-p" className="err-message">Password is not valid!</p>
            <input id="register-password" type="password" name="password" placeholder="Password"/>

            <p id="register-repeat-password-err-p" className="err-message">Re-Password doesn't match!</p>
            <input id="register-repeat-password" type="password" name="repeatPassword" placeholder="Repeat Password"/>

            <button>Register</button>
        </form>

        <p>Already have an account? <Link to={'/login'}>Login</Link></p>
    </main>
    );
}