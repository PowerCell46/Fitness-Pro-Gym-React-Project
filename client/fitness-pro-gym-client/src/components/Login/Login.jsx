import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import "./login.css";


export function Login() {
    const {loginSubmitHandler} = useContext(AuthenticationContext);

    return (
        <main className="login-main">
            <div className="login-header">
                <h1 className="login-h1">Login</h1>
            </div>

            <form onSubmit={loginSubmitHandler}>
              
                <p id="login-email-err-p" className="login-p err-message">Email is not valid!</p>
                <input id="login-email" type="text" name="email" placeholder="Email Address" className="login-input"/>

                <p id="login-password-err-p" className="login-p err-message">Password is not valid!</p>
                <input id="login-password" type="password" name="password" placeholder="Password" className="login-input"/>

                <button className="login-button">Login</button>
            
            </form>
            <p className="login-p">NEW USER? <Link to={'/register'}>Register</Link></p>
        </main>
    );
}