import "./myProfile.css";
import { useState, useContext, useEffect } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import {HighlightsDiv} from '../highlights/HighlightsGallery/HighlightsDiv';
import { MyProfileSection } from "./MyProfileSection";
import { fakeButtonHandler, realButtonMyProfileHandler } from "../../utils/fakeBtnRealBtn";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {errorToastMessage} from '../../utils/toastify';
import { GlobalContext } from "../../contexts/GlobalContext";
import { setMembershipValidity } from "../../utils/setMembershipValidity";


export function MyProfile() {
    const [isHovered, setIsHovered] = useState(false);
    const {navigate} = useContext(GlobalContext)
    const {profilePhoto, changeProfilePictureHandler, setProfilePhoto, user} = useContext(AuthenticationContext);
    const [highlights, setHighlights] = useState([]);
    const [orders, setOrders] = useState([]);
    const [membershipValid, setMembershipValid] = useState(false);
    
    useEffect(() => {
        async function fetchHighlightsData() {
            try {
                var response = await fetch(`http://localhost:5000/highlights/myhighlights`, 
                {method: "POST", headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({token: user})});        
        
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
                body: JSON.stringify({token: user})});        
        
                if (!response.ok) {
                    const errorData = await response.json();
            
                    errorToastMessage(errorData.error);

                    return navigate("/404");
                }

            } catch {
                navigate("/404");
            }

            const data = await response.json();
            
            setMembershipValid(setMembershipValidity(data));

            setOrders(data);
        }

        fetchHighlightsData();
        fetchOrdersData();
    }, []);
    
    return (
        <main className="my-profile-main">
        {isHovered ? <h5 id="change-picture-h5" onMouseEnter={() => setIsHovered(true)} onClick={fakeButtonHandler}>Change Picture</h5> : ""}
        <div className="hexagon-container" onMouseEnter={() => setIsHovered(true)}  onMouseLeave={() => setIsHovered(false)}>
            <img src={`data:image/jpeg;base64,${profilePhoto}`} alt="Profile Photo" onClick={fakeButtonHandler}/>
        </div>
            <input type="file" className="file-upload" hidden="hidden" name="image" onChange={realButtonMyProfileHandler}/>

            <button id="change-profile-photo" onClick={() => changeProfilePictureHandler(setProfilePhoto, navigate)}>Change Picture</button>

        <h1 className="main-heading">My profile</h1>
        
        <div className="trainer-qr-code-section">
            <img id="qr-code" alt="User QR Code" 
                onMouseEnter={() => document.querySelector(".membershipValidity").style.opacity = 1}
                onMouseLeave={() => document.querySelector(".membershipValidity").style.opacity = 0}/>
            <h2 id="pro-gym-card">Pro Gym <br/> Fitness Card {membershipValid ? <span className="membershipValidity valid">Valid</span>: <span className="membershipValidity invalid">Invalid</span>}</h2>
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