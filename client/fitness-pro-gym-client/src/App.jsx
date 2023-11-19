import {Route, Routes, useNavigate} from 'react-router-dom';
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


function App() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    async function loginSubmitHandler(e) {
        e.preventDefault();
        const {email, password} = (Object.fromEntries(new FormData(e.target)));
        console.log(email, password);
        
        const emailValidation = validateEmail(email);
        if (!emailValidation) {
            document.querySelector("#login-email-err-p").style.display = 'inline';
            document.querySelector("#login-email").classList.add("err-input-field");
        }
        
        const passwordValidation = validatePassword(password);
        if (!passwordValidation) {
            document.querySelector("#login-password-err-p").style.display = 'inline';
            document.querySelector("#login-password").classList.add("err-input-field");
        }

        if (!emailValidation || !passwordValidation) {
            return
        }
        
        const serverResponse = await fetch("http://localhost:5000/users/login", 
        {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email, password})});
        console.log(serverResponse);
    }

    async function registerSubmitHandler(e) {
        e.preventDefault();

        const {email, username, password, repeatPassword} = (Object.fromEntries(new FormData(e.target)));
        console.log(email, username, password, repeatPassword);
        
        const emailValidation = validateEmail(email);
        if (!emailValidation) {
            document.querySelector("#register-email-err-p").style.display = 'inline';
            document.querySelector("#register-email").classList.add("err-input-field");
        }

        const usernameValidation = validateUsername(username);
        if (!usernameValidation) {
            document.querySelector("#register-username-err-p").style.display = 'inline';
            document.querySelector("#register-username").classList.add("err-input-field");
        }
        
        const passwordValidation = validatePassword(password);
        if (!passwordValidation) {
            document.querySelector("#register-password-err-p").style.display = 'inline';
            document.querySelector("#register-password").classList.add("err-input-field");
        }

        if (password !== repeatPassword) {
            document.querySelector("#register-repeat-password-err-p").style.display = 'inline';
            document.querySelector("#register-repeat-password").classList.add("err-input-field");
        }

        if (!emailValidation || !passwordValidation || !usernameValidation || password !== repeatPassword) {
            return
        }

        const serverResponse = await fetch("http://localhost:5000/users/register", 
        {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email, username, password})});
        const token = await serverResponse.json();
        
        localStorage.setItem('authenticationToken', JSON.stringify(token));
        
        navigate("/");
    }

    return (
        <AuthenticationContext.Provider value={{loginSubmitHandler, registerSubmitHandler}}>
        <>
            <Navigation/>

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