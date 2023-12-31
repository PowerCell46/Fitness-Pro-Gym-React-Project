import {Navigate, Route, Routes, redirect, useNavigate} from 'react-router-dom';
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
import { Checkout } from './components/orders/Checkout/Checkout';
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
import { Spinner } from './components/Spinner/Spinner';
import { OrderDetails } from './components/orders/OrderDetails/OrderDetails';


function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem("authenticationTokenAndData") ? JSON.parse(localStorage.getItem("authenticationTokenAndData")).token : false);
    const [profilePhoto, setProfilePhoto] = useState("");
    const [numberOfCartProducts, setNumberOfCartProducts] = useState(0);
    const [isAdministrator, setIsAdministrator] = useState(false);
   
    const [logoutComponentShown, setLogoutComponent] = useState(false);
    const [spinnerComponentShown, setSpinnerComponentShown] = useState(false);


    useEffect(() => {
        async function getProfilePhoto() {
            try {
                const response = await fetch(`http://localhost:5000/users/getProfilePhoto`, 
                {method: "POST", headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({token: JSON.parse(localStorage.getItem("authenticationTokenAndData")).token})});   
                
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
                body: JSON.stringify({token: JSON.parse(localStorage.getItem("authenticationTokenAndData")).token})});   
                
                if (response.status === 200) {
                    const data = await response.json();
                    
                    setNumberOfCartProducts(data);

                } else {
                    const errorData = await response.json();

                    errorToastMessage(errorData.error);

                    return navigate('/404'); 
                }
                
            } catch {
                return redirect("/404");
            }
        }

        async function checkIfUserIsAdministrator() {
            try {
                var response = await fetch(`http://localhost:5000/users/isAdministrator`, 
                    {method: "POST", headers: {"Content-Type": "application/json"}, 
                    body: JSON.stringify({token: JSON.parse(localStorage.getItem("authenticationTokenAndData")).token})});  
            
            } catch {
                setIsAdministrator(false);
            }
            
            if (response) {
                if (response.ok) {
                    const data = await response.json();
                    
                    setIsAdministrator(data.isAdministrator);
                } else {
                    setIsAdministrator(false);
                }                
            
            } else {
                setIsAdministrator(false);
            }
        }

        checkIfUserIsAdministrator();
        getNumberOfCartProducts();
        getProfilePhoto();
    }, []);

    return (
        <GlobalContext.Provider value={{navigate, errorToastMessage, setSpinnerComponentShown}}>
        <AuthenticationContext.Provider value={{loginSubmitHandler, registerSubmitHandler, logoutSubmitHandler, user, setUser, setLogoutComponent, profilePhoto, setProfilePhoto, changeProfilePictureHandler, isAdministrator, setIsAdministrator, numberOfCartProducts, setNumberOfCartProducts}}>
        <>
            <Navigation/>
            {logoutComponentShown ? <Logout/> : ""}
            {spinnerComponentShown ?  <Spinner/> : ""}
            
            <ToastContainer />
           
            <ProductContext.Provider value={{postProductSubmitHandler}}>
            <TrainerContext.Provider value={{postTrainerSubmitHandler}}>
            <HighlightContext.Provider value={{postHighlightSubmitHandler}}>
            
            <Routes>
                
                <Route path='/' element={<Home/>}/>

                {!user ? <Route path='/login' element={<Login />}/>  : <Route path='/login' element={<Navigate to="/404" />} />}
                {!user ? <Route path='/register' element={<Register/>}/>  : <Route path='/register' element={<Navigate to="/404" />} />}
                
                {user ? <Route path='/myProfile' element={<MyProfile/>}/>  : <Route path='/myProfile' element={<Navigate to="/404" />} />}
                
                
                {user ? <Route path='/postHighlight' element={<PostHighlight/>}/> : <Route path='/postHighlight' element={<Navigate to="/404" />} />}
                <Route path='/highlights' element={<Highlights/>}/> 
                <Route path='/highlights/:highlightId' element={<HighlightDescription/>}/>
                {user ? <Route path='/highlights/edit/:highlightId' element={<EditHighlight/>}/> : <Route path='/highlights/edit/:highlightId' element={<Navigate to="/404" />}/>}

                {isAdministrator ? <Route path='/postTrainer' element={<PostTrainer/>}/> : <Route path='/postTrainer' element={<Navigate to="/404" />}/>}
                <Route path='/trainers' element={<Trainers/>}/>

                {isAdministrator ? <Route path='/postProduct' element={<PostProduct/>}/> : <Route path='/postProduct' element={<Navigate to="/404" />}/>}
                <Route path='/products' element={<Products/>} />
                <Route path='/products/:productId' element={<ProductDescription/>}/>
                {isAdministrator ? <Route path='/products/edit/:productId' element={<EditProduct/>}/> : <Route path='/products/edit/:productId' element={<Navigate to="/404" />}/>}

                <Route path='/memberships' element={<Memberships/>}/> {/* add error message when a guest is trying to click on a membership */}

                {user ? <Route path='/checkout' element={<Checkout/>}/> : <Route path='/checkout' element={<Navigate to="/404" />}/>}
                {user ? <Route path='/orders/:orderId' element={<OrderDetails/>}/> : <Route path='/orders/:orderId' element={<Navigate to="/404" />}/> }
                {user ? <Route path='/successfulOrder' element={<SuccessfulOrder/>}/> : <Route path='/successfulOrder' element={<Navigate to="/404" />}/>}
                
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