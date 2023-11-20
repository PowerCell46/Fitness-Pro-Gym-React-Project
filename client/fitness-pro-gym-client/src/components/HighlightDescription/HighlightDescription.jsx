import { useParams } from "react-router-dom";
import "./highlightDescription.css";
import { useEffect, useState } from "react";


export function HighlightDescription() {
    const [highlightData, setHighlightData] = useState({});
    const {highlightId} = useParams();
    
    useEffect(() => {
        async function fetchHighlightData() {
            const response = await fetch(`http://localhost:5000/highlights/${highlightId}`);
            const data = await response.json();

            data.uploadDate = new Date(data.uploadDate).toLocaleDateString();
            data.numberOfLikes = data.likes.length;
            setHighlightData(data);   
        }

        fetchHighlightData();
    }, []);
    
    return (
        <main className="highlight-description-main">
                {highlightData ? <>
                <p>Upload Date: {highlightData.uploadDate}</p>
                <img src={`data:image/jpeg;base64,${highlightData.photo}`} alt=""/>
                <h5>{highlightData.description}</h5>
                <p className="number-of-likes"><i className="fa-solid fa-thumbs-up fa-bounce"></i>Likes: {highlightData.numberOfLikes}</p>
                <div className="buttons">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
                </> 
                : 
                ""}

                
        </main>
    );  
}