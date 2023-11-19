import {Route, Routes, redirect, useNavigate} from 'react-router-dom';
import './App.css';
import { Navigation } from './components/Navigation/Navigation';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/footer';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Error_404 } from './components/Error_404/Error_404';
import { SuccessfulOrder } from './components/SuccessfulOrder/SuccessfulOrder';
import { useState } from 'react';
import { AuthenticationContext } from './contexts/AuthenticationContext';
import { Logout } from './components/Logout/Logout';


function App() {
    const [user, setUser] = useState(localStorage.getItem('authenticationToken'));
    const [logoutComponentShown, setLogoutComponent] = useState(false);
    const navigate = useNavigate();

    async function loginSubmitHandler(e) {
        e.preventDefault();
        const {email, password} = (Object.fromEntries(new FormData(e.target)));
        console.log(email, password);
        
        const emailValidation = validateEmail(email);
        if (!emailValidation) {
            document.querySelector("#login-email-err-p").style.display = 'inline';
            document.querySelector("#login-email").classList.add("err-input-field");
        
        } else {
            document.querySelector("#login-email-err-p").style.display = 'none';
            document.querySelector("#login-email").classList.remove("err-input-field");
        }
        
        const passwordValidation = validatePassword(password);
        if (!passwordValidation) {
            document.querySelector("#login-password-err-p").style.display = 'inline';
            document.querySelector("#login-password").classList.add("err-input-field");
        
        } else {
            document.querySelector("#login-password-err-p").style.display = 'none';
            document.querySelector("#login-password").classList.remove("err-input-field");
        }

        if (!emailValidation || !passwordValidation) {
            return
        }
        
        try {
            const serverResponse = await fetch("http://localhost:5000/users/login", 
            {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email, password})});
            
            if (serverResponse.status === 403) { // Checking for the case where the Email or the Username has already been used
                const errorData = await serverResponse.json();
                
                if (errorData.error === "Password is not valid!") {
                    document.querySelector("#login-password-err-p").textContent = errorData.error;
                    document.querySelector("#login-password-err-p").style.display = 'inline';
                    document.querySelector("#login-password").classList.add("err-input-field");
                    return;
                }

            } else if (!serverResponse.ok) {
                const errorData = await serverResponse.json();
                throw new Error(errorData.error || 'An error occurred during the registration process!');
            }

            const token = await serverResponse.json();
            
            localStorage.setItem('authenticationToken', JSON.stringify(token));
            setUser(token);

            navigate("/");
        
        } catch(err) {

            console.log(err);
            navigate('/404');
        }
    }

    async function registerSubmitHandler(e) {
        e.preventDefault();

        const {email, username, password, repeatPassword} = (Object.fromEntries(new FormData(e.target)));
        
        const emailValidation = validateEmail(email);
        if (!emailValidation) {
            document.querySelector("#register-email-err-p").style.display = 'inline';
            document.querySelector("#register-email").classList.add("err-input-field");
        
        } else {
            document.querySelector("#register-email-err-p").style.display = 'none';
            document.querySelector("#register-email").classList.remove("err-input-field");
        }

        const usernameValidation = validateUsername(username);
        if (!usernameValidation) {
            document.querySelector("#register-username-err-p").style.display = 'inline';
            document.querySelector("#register-username").classList.add("err-input-field");
        
        } else {
            document.querySelector("#register-username-err-p").style.display = 'none';
            document.querySelector("#register-username").classList.remove("err-input-field");
        }
        
        const passwordValidation = validatePassword(password);
        if (!passwordValidation) {
            document.querySelector("#register-password-err-p").style.display = 'inline';
            document.querySelector("#register-password").classList.add("err-input-field");
        
        } else {
            document.querySelector("#register-password-err-p").style.display = 'none';
            document.querySelector("#register-password").classList.remove("err-input-field");
        }

        if (password !== repeatPassword) {
            document.querySelector("#register-repeat-password-err-p").style.display = 'inline';
            document.querySelector("#register-repeat-password").classList.add("err-input-field");
       
        } else {
            document.querySelector("#register-repeat-password-err-p").style.display = 'none';
            document.querySelector("#register-repeat-password").classList.remove("err-input-field");
        }

        if (!emailValidation || !passwordValidation || !usernameValidation || password !== repeatPassword) {
            return
        }
        // Valid data is being given to the server

        try {
            const serverResponse = await fetch("http://localhost:5000/users/register", 
            {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email, username, password})});
            
            if (serverResponse.status === 409) { // Checking for the case where the Email or the Username has already been used
                const errorData = await serverResponse.json();

                if (errorData.error === 'Email already in use!') {
                    document.querySelector("#register-email-err-p").textContent = 'Email already in use!';                    
                    document.querySelector("#register-email-err-p").style.display = 'inline';
                    document.querySelector("#register-email").classList.add("err-input-field");
                    return;
               
                } else {
                    document.querySelector("#register-username-err-p").textContent = 'Username already in use!';
                    document.querySelector("#register-username-err-p").style.display = 'inline';
                    document.querySelector("#register-username").classList.add("err-input-field");
                    return;
                }

            } else if (!serverResponse.ok) {
                const errorData = await serverResponse.json();
                throw new Error(errorData.error || 'An error occurred during the registration process!');
            }

            const token = await serverResponse.json();
            
            localStorage.setItem('authenticationToken', JSON.stringify(token)); // Setting the token to the local storage
            setUser(token); // Setting the token to the useState hook of the user

            navigate("/");
        
        } catch(err) {

            console.log(err);
            navigate('/404');
        }
    }

    async function logoutSubmitHandler() {
        localStorage.removeItem("authenticationToken");
        setUser(null);
        setLogoutComponent(false);
        navigate("/");
    }

    return (
        <AuthenticationContext.Provider value={{loginSubmitHandler, registerSubmitHandler, logoutSubmitHandler, user, setLogoutComponent}}>
        <>
            <Navigation/>

            {logoutComponentShown ? <Logout/> : ""}

            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='*' element={<Error_404/>}/>
                <Route path='/successfulOrder' element={<SuccessfulOrder/>}/>
            </Routes>

            <Footer/>
        </>
        </AuthenticationContext.Provider>
    );
}

export default App;



function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}


function validatePassword(password) {
    password = password.split("");
    const uppercaseChars = password.filter(char => char.charCodeAt() >= 65 && char.charCodeAt() <= 90);
    const digits = password.filter(char =>char.charCodeAt() >= 48 && char.charCodeAt() <= 57);
    if (password.length < 6 || !uppercaseChars || !digits) {
        return false;
    }
    return true;
}


function validateUsername(username) {
    username = username.split("");
    const uppercaseChars = username.filter(char => char.charCodeAt() >= 65 && char.charCodeAt() <= 90);
    if (username.length < 4 || !uppercaseChars) {
        return false;
    }
    return true;
}