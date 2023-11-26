import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import "./highlights.css";
import { HighlightsDiv } from "./HighlightsDiv";


export function Highlights() {
    const {navigate} = useContext(AuthenticationContext);
    const [highlightsData, setHighlightsData] = useState([]);

    useEffect(() => {
        async function fetchHighlightsData() {
            try {
                var response = await fetch("http://localhost:5000/highlights");
            
            } catch {
                navigate("/404");
            }

            if (!response.ok) {
                navigate("/404");
            }
            
            const data = await response.json();
            
            setHighlightsData(data);
        }

        fetchHighlightsData();
    }, []);

    return (
        <main className="highlights-main">
            <h1>Pro Gym Highlights</h1>

            <div className="gallery-div">
            
                <HighlightsDiv highlightsData={highlightsData.filter((el, index) => index % 3 == 0)}/>
                
                <HighlightsDiv highlightsData={highlightsData.filter((el, index) => (index + 1) % 3 == 0)}/>
                
                <HighlightsDiv highlightsData={highlightsData.filter((el, index) => (index + 2) % 3 == 0)}/>
                
            </div>
        </main>
    );
}