import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { useState, useContext } from "react";
import "./myProfile.css";
import { useEffect } from "react";
import {HighlightsDiv} from '../highlights/HighlightsGallery/HighlightsDiv';
import { MyProfileSection } from "./MyProfileSection";

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

        fetchHighlightsData();
        fetchOrdersData();
    }, []);
    
    return (
        <main className="my-profile-main">
        <div className="hexagon-container">
            <img src="./images/profile_picture.jpg" alt="" className="profile-picture" />
        </div>
        <h1 className="main-heading">My profile</h1>
        
        <div className="trainer-qr-code-section">
            <img src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" alt=""/>
            <h2>Pro Gym <br/> Fitness Card</h2>
        </div>
        <h2>Orders History</h2>

        { orders.map((order) => 
            <MyProfileSection order={order}/>)
        }
        <section>
            <div className="order-details-template">
                <p>Order №:</p>
                <p>Order Date:</p>
                <p>Total Price:</p>
            </div>
            <div>
                <p>575645</p>
                <p>10.11.2023</p>
                <p>127.69$</p>
            </div>
            <button>Details</button>
        </section>
        <section>
            <div className="order-details-template">
                <p>Order №:</p>
                <p>Order Date:</p>
                <p>Total Price:</p>
            </div>
            <div>
                <p>575645</p>
                <p>10.11.2023</p>
                <p>127.69$</p>
            </div>
            <button>Details</button>
        </section>

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
} 