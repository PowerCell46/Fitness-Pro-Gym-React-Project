import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./highlights.css";


export function Highlights() {
    const [highlightsData, setHighlightsData] = useState([]);

    useEffect(() => {
        async function fetchHighlightsData() {
            try {
                var response = await fetch("http://localhost:5000/highlights");
            
            } catch {
                /// Do something
            }

            if (!response.ok) {
                console.log(response);
                // navigate
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
        
            <div className="gallery-inner-box">
                {highlightsData.filter((el, index) => index % 3 == 0).map((highlight) => (
                    <Link key={highlight._id} to={`/highlights/${highlight._id}`}>
                        <img src={`data:image/jpeg;base64,${highlight.photo}`} alt=""/>
                    </Link>
                ))}
            </div>

            <div className="gallery-inner-box">
                {highlightsData.filter((el, index) => (index + 1) % 3 == 0).map((highlight) => (
                    <Link key={highlight._id} to={`/highlights/${highlight._id}`}>
                        <img src={`data:image/jpeg;base64,${highlight.photo}`} alt=""/>
                    </Link>    
                ))}
            </div>

            <div className="gallery-inner-box">
                {highlightsData.filter((el, index) => (index + 2) % 3 == 0).map((highlight) => (
                    <Link key={highlight._id} to={`/highlights/${highlight._id}`}>
                        <img src={`data:image/jpeg;base64,${highlight.photo}`} alt=""/>
                    </Link>
                ))}
            </div>

        </div>
    </main>
    );
}