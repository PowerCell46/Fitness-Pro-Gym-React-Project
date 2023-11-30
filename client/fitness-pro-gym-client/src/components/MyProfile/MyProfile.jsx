import "./myProfile.css";
import { useState, useContext, useEffect } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import {HighlightsDiv} from '../highlights/HighlightsGallery/HighlightsDiv';
import { MyProfileSection } from "./MyProfileSection";
import { fakeButtonHandler, realButtonMyProfileHandler } from "../../utils/fakeBtnRealBtn";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {errorToastMessage} from '../../utils/toastify';
import { GlobalContext } from "../../contexts/GlobalContext";


export function MyProfile() {
    const {navigate} = useContext(GlobalContext)
    const {profilePhoto, changeProfilePictureHandler, setProfilePhoto} = useContext(AuthenticationContext);
    const [highlights, setHighlights] = useState([]);
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        async function fetchHighlightsData() {
            try {
                var response = await fetch(`http://localhost:5000/highlights/myhighlights`, 
                {method: "POST", headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({userId: JSON.parse(localStorage.getItem("authenticationTokenAndData")).id})});        
        
                if (!response.ok) {
                    const errorData = await response.json();
            
                    errorToastMessage(errorData.error);

                    return navigate("/404");
                }

            } catch {
                navigate("/404");
            }

            const data = await response.json();
            
            setHighlights(data);
        }

        async function fetchOrdersData() {
            try {
                var response = await fetch(`http://localhost:5000/users/orders`, 
                {method: "POST", headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({userId: JSON.parse(localStorage.getItem("authenticationTokenAndData")).id})});        
        
                if (!response.ok) {
                    const errorData = await response.json();
            
                    errorToastMessage(errorData.error);

                    return navigate("/404");
                }

            } catch {
                navigate("/404");
            }

            const data = await response.json();
            
            setOrders(data);
        }

        function generateQRcode() {
            const qr = new QRious({
                value: `127.0.0.1:5173/myProfile/${JSON.parse(localStorage.getItem("authenticationTokenAndData")).id}`
            });
            document.querySelector("#qr-code").src = qr.toDataURL();
        }

        fetchHighlightsData();
        fetchOrdersData();
        generateQRcode();
    }, []);
    
    return (
        <main className="my-profile-main">
        <div className="hexagon-container">
            <img src={`data:image/jpeg;base64,${profilePhoto}`} alt="Profile Photo" onClick={fakeButtonHandler}/>
        </div>
            <input type="file" className="file-upload" hidden="hidden" name="image" onChange={realButtonMyProfileHandler}/>

            <button id="change-profile-photo" onClick={() => changeProfilePictureHandler(setProfilePhoto, navigate)}>Change Picture</button>

        <h1 className="main-heading">My profile</h1>
        
        <div className="trainer-qr-code-section">
            <img id="qr-code" alt="User QR Code"/>
            <h2>Pro Gym <br/> Fitness Card</h2>
        </div>
        <h2>Orders History</h2>

        { orders.map((order) => 
            <MyProfileSection order={order}/>)
        }

        <div className="my-highlights">
            
            <h1>My Highlights</h1>

            <div className="gallery-div">
                
                <HighlightsDiv highlightsData={highlights.filter((el, index) => index % 4 == 0)}/>
                
                <HighlightsDiv highlightsData={highlights.filter((el, index) => (index + 1) % 4 == 0)}/>

                <HighlightsDiv highlightsData={highlights.filter((el, index) => (index + 2) % 4 == 0)}/>
                
                <HighlightsDiv highlightsData={highlights.filter((el, index) => (index + 3) % 4 == 0)}/>

            </div>
        </div>
    <ToastContainer />
    </main>
    );  
} 