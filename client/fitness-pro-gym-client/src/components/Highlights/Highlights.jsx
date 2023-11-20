import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./highlights.css";


export function Highlights() {
    const [highlightsData, setHighlightsData] = useState([]);

    useEffect(() => {
        async function fetchHighlightsData() {
            const response = await fetch("http://localhost:5000/highlights");
            if (!response.ok) {
                console.log(response); // probably not right
                // navigate
            }
            const data = await response.json();
            console.log(data);
            setHighlightsData(data);
        }

        fetchHighlightsData();
    }, []);

    return (
    <main className="highlights-main">
        <h1>Pro Gym Highlights</h1>

        <div className="gallery-div">
        
            <div className="gallery-inner-box">
                {highlightsData.filter((el, index) => index % 3 == 0).map((highlight) => (
                    <Link to={`/highlights/${highlight._id}`}><img key={highlight._id} src={`data:image/jpeg;base64,${highlight.photo}`} alt=""/></Link>
                ))}
            </div>

            <div className="gallery-inner-box">
                {highlightsData.filter((el, index) => (index + 1) % 3 == 0).map((highlight) => (
                    <Link to={`/highlights/${highlight._id}`}><img key={highlight._id} src={`data:image/jpeg;base64,${highlight.photo}`} alt=""/></Link>    
                ))}
            </div>

            <div className="gallery-inner-box">
                {highlightsData.filter((el, index) => (index + 2) % 3 == 0).map((highlight) => (
                    <Link to={`/highlights/${highlight._id}`}><img key={highlight._id} src={`data:image/jpeg;base64,${highlight.photo}`} alt=""/></Link>
                ))}
            </div>

        </div>
    </main>
    );
}