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
import { PostHighlight } from './components/PostHighlight/PostHighlight';
import { HighlightContext } from './contexts/HighlightContext';
import { HighlightDescription } from './components/HighlightDescription/HighlightDescription';
import { Highlights } from './components/Highlights/Highlights';
import { PostTrainer } from './components/PostTrainer/PostTrainer';
import { TrainerContext } from './contexts/TrainerContext';
import { Trainers } from './components/Trainers/Trainers';
import { validatePassword, validateUsername, validateImageExtension, validateTrainerName, validatePhoneNumber, validateEmail, validateProductName, validateProductDescription, validateProductPrice } from './validators';
import { PostProduct } from './components/PostProduct/PostProduct';
import { ProductContext } from './contexts/ProductContext';
import { Products } from './components/Products/Products';
import { ProductDescription } from './components/ProductDescription/ProductDescription';
import { Memberships } from './components/Memberships/Memberships';


function App() {
    const [user, setUser] = useState(localStorage.getItem('authenticationTokenAndData'));
    const [logoutComponentShown, setLogoutComponent] = useState(false);
    const navigate = useNavigate();

    async function loginSubmitHandler(e) {
        e.preventDefault();
        const {email, password} = (Object.fromEntries(new FormData(e.target)));
        
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

            const tokenAndData = await serverResponse.json();
            
            localStorage.setItem('authenticationTokenAndData', JSON.stringify(tokenAndData));
            setUser(tokenAndData);

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

            const tokenAndData = await serverResponse.json();
            
            localStorage.setItem('authenticationTokenAndData', JSON.stringify(tokenAndData)); // Setting the token to the local storage
            setUser(tokenAndData); // Setting the token to the useState hook of the user

            navigate("/");
        
        } catch(err) {

            console.log(err);
            navigate('/404');
        }
    }

    async function logoutSubmitHandler() {
        localStorage.removeItem("authenticationTokenAndData");
        setUser(null);
        setLogoutComponent(false);
        navigate("/");
    }

    async function postHighlightSubmitHandler(e) {
        e.preventDefault(); 
        let formData = new FormData(e.target);
        formData.append("ownerId", JSON.parse(localStorage.getItem("authenticationTokenAndData")).id);

        const validImage = validateImageExtension(formData.get("image"));
        if (!validImage) {
            document.querySelector("#post-highlight-image-err-p").textContent = 'Image format not valid!';                    
            document.querySelector("#post-highlight-image-err-p").style.display = 'inline';
            document.querySelector("#post-highlight-image").classList.add("err-input-field");
            document.querySelector("#post-highlight-span").classList.add("err-input-field");
            return;
       
        } else {
            document.querySelector("#post-highlight-image-err-p").style.display = 'none';
            document.querySelector("#post-highlight-image").classList.remove("err-input-field");
            document.querySelector("#post-highlight-span").classList.remove("err-input-field");
        }

        try {
            let response = await fetch("http://localhost:5000/highlights", {
                method: "POST",
                body: formData,
            });

            if (response.status === 200) {
                navigate("/highlights");

            } else {
                console.log(response); // probably not right
                navigate('/404');
            }
            
        } catch(err) {
            console.log(err);
            navigate('/404');
        }
    }

    async function postTrainerSubmitHandler(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        
        const validImage = validateImageExtension(formData.get("image"));
        if (!validImage) {
            document.querySelector("#post-trainer-image-err-p").textContent = 'Image format not valid!';                    
            document.querySelector("#post-trainer-image-err-p").style.display = 'inline';
            document.querySelector("#post-trainer-image").classList.add("err-input-field");
            document.querySelector("#post-trainer-span").classList.add("err-input-field"); // does not look good
       
        } else {
            document.querySelector("#post-trainer-image-err-p").style.display = 'none';
            document.querySelector("#post-trainer-image").classList.remove("err-input-field");
            document.querySelector("#post-trainer-span").classList.remove("err-input-field"); // does not look good
        }

        const validName = validateTrainerName(formData.get("name"));
        if (!validName) {
            document.querySelector("#post-trainer-name-err-p").textContent = 'Name is not valid!';                    
            document.querySelector("#post-trainer-name-err-p").style.display = 'inline';
            document.querySelector("#post-trainer-name").classList.add("err-input-field");
        
        } else {
            document.querySelector("#post-trainer-name-err-p").style.display = 'none';
            document.querySelector("#post-trainer-name").classList.remove("err-input-field");
        }

        const validEmail = validateEmail(formData.get("email"));
        if (!validEmail) {
            document.querySelector("#post-trainer-email-err-p").textContent = 'Email is not valid!';                    
            document.querySelector("#post-trainer-email-err-p").style.display = 'inline';
            document.querySelector("#post-trainer-email").classList.add("err-input-field");
        
        } else {
            document.querySelector("#post-trainer-email-err-p").style.display = 'none';
            document.querySelector("#post-trainer-email").classList.remove("err-input-field");
        }

        const validPhoneNumber = validatePhoneNumber(formData.get("phoneNumber"));
        if (!validPhoneNumber) {
            document.querySelector("#post-trainer-phoneNumber-err-p").textContent = 'Phone Number is not valid!';                    
            document.querySelector("#post-trainer-phoneNumber-err-p").style.display = 'inline';
            document.querySelector("#post-trainer-phoneNumber").classList.add("err-input-field");
        
        } else {
            document.querySelector("#post-trainer-phoneNumber-err-p").style.display = 'none';
            document.querySelector("#post-trainer-phoneNumber").classList.remove("err-input-field");
        }

        if (!validImage || !validName || !validEmail  || !validPhoneNumber) {
            return;
        }

        try {
            
            let response = await fetch("http://localhost:5000/trainers", {
                method: "POST",
                body: formData,
            });

            if (response.status === 200) {
                navigate('/trainers');

            } else {
                console.log(await response.json());
                navigate('/404');
            }

        } catch(err) {
            console.log(err);
            navigate('/404');
        }
    }

    async function postProductSubmitHandler(e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        
        const validImage = validateImageExtension(formData.get("image"));
        if (!validImage) {
            document.querySelector("#post-product-image-err-p").textContent = 'Image format not valid!';                    
            document.querySelector("#post-product-image-err-p").style.display = 'inline';
            document.querySelector("#post-product-image").classList.add("err-input-field");
       
        } else {
            document.querySelector("#post-product-image-err-p").style.display = 'none';
            document.querySelector("#post-product-image").classList.remove("err-input-field");
        }

        const validName = validateProductName(formData.get("name"));
        if (!validName) {
            document.querySelector("#post-product-name-err-p").textContent = 'Name is not valid!';                    
            document.querySelector("#post-product-name-err-p").style.display = 'inline';
            document.querySelector("#post-product-name").classList.add("err-input-field");
        
        } else {
            document.querySelector("#post-product-name-err-p").style.display = 'none';
            document.querySelector("#post-product-name").classList.remove("err-input-field");
        }

        const validDescription = validateProductDescription(formData.get("description"));
        if (!validDescription) {
            document.querySelector("#post-product-description-err-p").textContent = 'Description is not valid!';                    
            document.querySelector("#post-product-description-err-p").style.display = 'inline';
            document.querySelector("#post-product-description").classList.add("err-input-field");

        } else {
            document.querySelector("#post-product-description-err-p").style.display = 'none';
            document.querySelector("#post-product-description").classList.remove("err-input-field");
        }

        const validPrice = validateProductPrice(formData.get("price"));
        if (!validPrice) {
            document.querySelector("#post-product-price-err-p").textContent = 'Price is not valid!';                    
            document.querySelector("#post-product-price-err-p").style.display = 'inline';
            document.querySelector("#post-product-price").classList.add("err-input-field");

        } else {
            document.querySelector("#post-product-price-err-p").style.display = 'none';
            document.querySelector("#post-product-price").classList.remove("err-input-field");
        }

        if (!validImage || !validName || !validDescription || !validPrice) {
            return;
        }

        try {
            
            const response =  await fetch("http://localhost:5000/products", {
                method: "POST",
                body: formData,
            });

            if (response.status === 200) {
                navigate('/products');

            } else {
                console.log(response);
                navigate('/404');
            }

        } catch(err) {
            console.log(err);
            navigate('/404');
        }        
    }

    return (
        <AuthenticationContext.Provider value={{loginSubmitHandler, registerSubmitHandler, logoutSubmitHandler, user, setLogoutComponent}}>
        <>
            <Navigation/>

            {logoutComponentShown ? <Logout/> : ""}
           
            <ProductContext.Provider value={{postProductSubmitHandler}}>
            <TrainerContext.Provider value={{postTrainerSubmitHandler}}>
            <HighlightContext.Provider value={{postHighlightSubmitHandler}}>
          
            <Routes>
                <Route path='/' element={<Home/>}/>

                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>   
                
                <Route path='/postHighlight' element={<PostHighlight/>}/>
                <Route path='/highlights' element={<Highlights/>}/>
                <Route path='/highlights/:highlightId' element={<HighlightDescription/>}/>

                <Route path='/postTrainer' element={<PostTrainer/>}/>
                <Route path='/trainers' element={<Trainers/>} />

                <Route path='/postProduct' element={<PostProduct/>} />
                <Route path='/products' element={<Products/>} />
                <Route path='/products/:productId' element={<ProductDescription/>} />

                <Route path='/memberships' element={<Memberships/>} />

                <Route path='/successfulOrder' element={<SuccessfulOrder/>}/>
                <Route path='*' element={<Error_404/>}/>
            </Routes>
           
            </HighlightContext.Provider>
            </TrainerContext.Provider>
            </ProductContext.Provider>
           
            <Footer/>
        </>
        </AuthenticationContext.Provider>
    );
}


export default App;