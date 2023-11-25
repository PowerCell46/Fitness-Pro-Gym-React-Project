import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./highlightDescription.css";
import { useEffect, useState } from "react";


export function HighlightDescription() {
    const [highlightData, setHighlightData] = useState({});
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const {highlightId} = useParams();
    
    useEffect(() => {
        async function fetchHighlightData() {

            try {
            var response = await fetch(`http://localhost:5000/highlights/${highlightId}`);

            } catch {
                console.log( await response.json());
                //Redirect
            }

            if (!response.ok) {
                console.log( await response.json());
                // Redirect
            }

            let data = await response.json();

            data.uploadDate = new Date(data.uploadDate).toLocaleDateString();
            data.hasLiked = data.likes.includes(JSON.parse(localStorage.getItem("authenticationTokenAndData")).id);

            setNumberOfLikes(data.likes.length);
            
            setHighlightData(data);   
        }

        fetchHighlightData();
    }, []);
    
    return (
        <main className="highlight-description-main">
                {highlightData ? <>
                <p>Upload Date: {highlightData.uploadDate}</p>
                <img src={`data:image/jpeg;base64,${highlightData.photo}`} alt="Highlight Image"/>
                <h5>{highlightData.description}</h5>
              
                <p className="number-of-likes">
                    {highlightData.ownerId !== JSON.parse(localStorage.getItem("authenticationTokenAndData")).id ?
                        <i id="like-icon" onClick={likeHighlightHandler} className={
                            highlightData.hasLiked
                            ? "fa-solid fa-thumbs-up already-liked" // If the person has liked, the button will not move and be different colour
                            : "fa-solid fa-thumbs-up fa-bounce"}
                        ></i> : ""}
                    Likes: {numberOfLikes}</p>

                { // Only the owner has the right to edit and delete the highlight
                highlightData.ownerId === JSON.parse(localStorage.getItem("authenticationTokenAndData")).id ? 
                    <div className="buttons">
                        <Link to={`/highlights/edit/${highlightData._id}`}><button>Edit</button></Link>
                        <Link to={`/highlights/edit/${highlightData._id}`}><button>Delete</button></Link>
                    </div>
                    : ""}
                </> 
                : 
                ""}                
        </main>
    );  
    
    async function likeHighlightHandler() {
        if (highlightData.likes.includes(JSON.parse(localStorage.getItem("authenticationTokenAndData")).id)) {
            return; // Checking if the user isn't trying to like his on highlight
        }
        const response = await fetch(`http://localhost:5000/highlights/like/${highlightId}`, 
        {method: "POST", headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({userId: JSON.parse(localStorage.getItem("authenticationTokenAndData")).id})})
        
        const data = await response.json();

        if (data === "Successful operation") {
            setNumberOfLikes((val) => val + 1, () => {
                document.querySelector(".number-of-likes").textContent = `Likes: ${numberOfLikes}`;
            });
            document.querySelector("#like-icon").classList.add("already-liked");
        }
    }
}
