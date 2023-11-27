import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { useState, useContext } from "react";
import "./myProfile.css";
import { useEffect } from "react";
import {HighlightsDiv} from '../highlights/HighlightsGallery/HighlightsDiv';
import { MyProfileSection } from "./MyProfileSection";
import { fakeButtonHandler, realButtonHandler } from "../../utils/fakeBtnRealBtn";

export function MyProfile() {
    const {navigate} = useContext(AuthenticationContext);
    const [highlights, setHighlights] = useState([]);
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        async function fetchHighlightsData() {
            try {
                var response = await fetch(`http://localhost:5000/highlights/myhighlights`, 
                {method: "POST", headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({userId: JSON.parse(localStorage.getItem("authenticationTokenAndData")).id})});        
        
                if (!response.ok) {
                    navigate("/404");
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
                    navigate("/404");
                }

            } catch {
                navigate("/404");
            }

            const data = await response.json();
            console.log(data);
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
            <img src="./images/profile_picture.jpg" alt="" className="profile-picture" onClick={fakeButtonHandler}/>
        </div>
            <input type="file" className="file-upload" hidden="hidden" name="image" onChange={realButtonHandler}/>

            <button id="change-profile-photo" onClick={changeProfilePictureHandler}>Change Picture</button>
            
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
    </main>
    );

    async function changeProfilePictureHandler() {
        const fileInput = document.querySelector(".file-upload");

        if (fileInput.files.length === 0) {
            // Show that no image was selected
        }

        // validate image
        const formData = new FormData();
        formData.append("image", fileInput.files[0]);
        formData.append("userId", JSON.parse(localStorage.getItem("authenticationTokenAndData")).id);

        try {
            var response = await fetch("http://localhost:5000/profilePhotos", {
                method: "POST",
                body: formData
            });

            if (response.status === 200) {
                navigate("/"); // change!!!

            } else {
                navigate("/404");
            }

        } catch {
            navigate("/404");
        }
    }
} 