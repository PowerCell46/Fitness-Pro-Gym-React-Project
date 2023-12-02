import {Route, Routes, redirect, useNavigate} from 'react-router-dom';
import './App.css';
import { Navigation } from './components/Navigation/Navigation';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/footer';
import { Login } from './components/authentication/Login/Login';
import { Register } from './components/authentication/Register/Register';
import { Error_404 } from './components/Error_404/Error_404';
import { SuccessfulOrder } from './components/SuccessfulOrder/SuccessfulOrder';
import { useState, useEffect } from 'react';
import { AuthenticationContext } from './contexts/AuthenticationContext';
import { Logout } from './components/authentication/Logout/Logout';
import { PostHighlight } from './components/highlights/PostHighlight/PostHighlight';
import { HighlightContext } from './contexts/HighlightContext';
import { HighlightDescription } from './components/highlights/HighlightDescription/HighlightDescription';
import { Highlights } from './components/highlights/HighlightsGallery/Highlights';
import { PostTrainer } from './components/trainers/PostTrainer/PostTrainer';
import { TrainerContext } from './contexts/TrainerContext';
import { Trainers } from './components/trainers/TrainersGallery/Trainers';
import { PostProduct } from './components/products/PostProduct/PostProduct';
import { ProductContext } from './contexts/ProductContext';
import { Products } from './components/products/ProductsGallery/Products';
import { ProductDescription } from './components/products/ProductDescription/ProductDescription';
import { Memberships } from './components/products/Memberships/Memberships';
import { Checkout } from './components/Checkout/Checkout';
import { MyProfile } from './components/MyProfile/MyProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {errorToastMessage} from "./utils/toastify";
import { EditHighlight } from './components/highlights/EditHighlight/EditHighlight';
import { EditProduct } from './components/products/EditProduct/EditProduct';
import { loginSubmitHandler } from './components/authentication/Login/loginSubmitHandler';
import { GlobalContext } from './contexts/GlobalContext';
import { registerSubmitHandler } from './components/authentication/Register/registerSubmitHandler';
import { logoutSubmitHandler } from './components/authentication/Logout/logoutSubmitHandler';
import { postHighlightSubmitHandler } from './components/highlights/PostHighlight/postHighlightSubmitHandler';
import { postTrainerSubmitHandler } from './components/trainers/PostTrainer/postTrainerSubmitHandler';
import { postProductSubmitHandler } from './components/products/PostProduct/postProductSubmitHandler';
import { changeProfilePictureHandler } from './components/MyProfile/changeProfilePictureHandler';


function App() {
    const [user, setUser] = useState(localStorage.getItem('authenticationTokenAndData'));
    const [numberOfCartProducts, setNumberOfCartProducts] = useState(0);
    const [isAdministrator, setIsAdministrator] = useState(localStorage.getItem("authenticationTokenAndData")  ? JSON.parse(localStorage.getItem("authenticationTokenAndData")).isAdministrator || false : false );
    const [logoutComponentShown, setLogoutComponent] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function getProfilePhoto() {
            try {
                const response = await fetch(`http://localhost:5000/users/getProfilePhoto`, 
                {method: "POST", headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({userId: JSON.parse(localStorage.getItem("authenticationTokenAndData")).id})});   
                
                if (response.status === 200) {
                    const data = await response.json();
                    
                    setProfilePhoto(data);
                
                } else {
                    const errorData = await response.json();

                    errorToastMessage(errorData.error);

                    return navigate('/404'); 
                }
                
            } catch {
                redirect("/404");
            }
        }

        async function getNumberOfCartProducts() {
            try {
                const response = await fetch(`http://localhost:5000/users/getNumberOfCartProducts`, 
                {method: "POST", headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({userId: JSON.parse(localStorage.getItem("authenticationTokenAndData")).id})});   
                
                if (response.status === 200) {
                    const data = await response.json();
                    
                    setNumberOfCartProducts(data);

                } else {
                    const errorData = await response.json();

                    errorToastMessage(errorData.error);

                    return navigate('/404'); 
                }
                
            } catch {
                redirect("/404");
            }
        }

        getNumberOfCartProducts();
        getProfilePhoto();
    }, []);

    return (
        <GlobalContext.Provider value={{navigate, errorToastMessage}}>
        <AuthenticationContext.Provider value={{loginSubmitHandler, registerSubmitHandler, logoutSubmitHandler, user, setUser, setLogoutComponent, profilePhoto, setProfilePhoto, changeProfilePictureHandler, setIsAdministrator, numberOfCartProducts, setNumberOfCartProducts}}>
        <>
            <Navigation/>
            {logoutComponentShown ? <Logout/> : ""}
            
            <ToastContainer />
           
            <ProductContext.Provider value={{postProductSubmitHandler}}>
            <TrainerContext.Provider value={{postTrainerSubmitHandler}}>
            <HighlightContext.Provider value={{postHighlightSubmitHandler}}>
          
            <Routes>
                <Route path='/' element={<Home/>}/>

                <Route path='/login'  element={user ? <Home/> : <Login />}/>
                <Route path='/register' element={user ? <Home/> : <Register/>}/>
                <Route path='/myProfile' element={user ? <MyProfile/> : <Home/>}/>   
                
                <Route path='/postHighlight' element={user ? <PostHighlight/> : <Home/>}/>
                <Route path='/highlights' element={<Highlights/>}/> 
                <Route path='/highlights/:highlightId' element={<HighlightDescription/>}/>
                <Route path='/highlights/edit/:highlightId' element={<EditHighlight/>}/> {/* check if the person is the owner of the highlight */}

                <Route path='/postTrainer' element={ isAdministrator ?<PostTrainer/> : <Home/>}/>
                <Route path='/trainers' element={<Trainers/>}/>

                <Route path='/postProduct' element={isAdministrator ? <PostProduct/> : <Home/>}/>
                <Route path='/products' element={<Products/>} />
                <Route path='/products/:productId' element={<ProductDescription/>}/>
                <Route path='/products/edit/:productId' element={isAdministrator ? <EditProduct/> : <Home/>}/>

                <Route path='/memberships' element={<Memberships/>}/> {/* add error message when a guest is trying to click on a membership */}

                <Route path='/checkout' element={user ? <Checkout/> : <Home/>}/>
                <Route path='/successfulOrder' element={user ? <SuccessfulOrder/> : <Home/>}/>
                
                <Route path='*' element={<Error_404/>}/>
            </Routes>
           
            </HighlightContext.Provider>
            </TrainerContext.Provider>
            </ProductContext.Provider>
           
            <Footer/>
        </>
        </AuthenticationContext.Provider>
        </GlobalContext.Provider>
    );
}


export default App;