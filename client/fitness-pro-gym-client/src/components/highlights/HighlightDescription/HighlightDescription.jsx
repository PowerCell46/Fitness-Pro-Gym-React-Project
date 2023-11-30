import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./highlightDescription.css";
import { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import { HighlightContext } from "../../../contexts/HighlightContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToastMessage } from "../../../utils/toastify";
import { DeleteHighlight } from "../DeleteHighlight/DeleteHighlight";
import { likeHighlightHandler } from "./likeHighlightHandler";


export function HighlightDescription() {
    const userId = JSON.parse(localStorage.getItem("authenticationTokenAndData")).id;
    const {navigate} = useContext(AuthenticationContext);
    const [highlightData, setHighlightData] = useState({});
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [deleteHighlightComponentShown, setDeleteHighlightComponent] = useState(false);
    const {highlightId} = useParams();
    
    useEffect(() => {
        async function fetchHighlightData() {

            try {
                var response = await fetch(`http://localhost:5000/highlights/${highlightId}`);

            } catch {
                return navigate("/404");
            }

            if (!response.ok) {
                const errorData = await response.json();

                errorToastMessage(errorData.error);
                return navigate('/404'); 
            }

            let data = await response.json();

            data.uploadDate = new Date(data.uploadDate).toLocaleDateString();
            data.hasLiked = data.likes.includes(userId); // Checking whether the User has liked the Post before

            setNumberOfLikes(data.likes.length);
            
            setHighlightData(data);   
        }

        fetchHighlightData();
    }, []);
    
    return (
    <main className="highlight-description-main">
        <HighlightContext.Provider value={{setDeleteHighlightComponent, highlightId, userId}}>
            {deleteHighlightComponentShown ? <DeleteHighlight/> : ""} 
        </HighlightContext.Provider>
        <ToastContainer />
            {highlightData ? <>
            <p>Upload Date: {highlightData.uploadDate}</p>
            <img src={`data:image/jpeg;base64,${highlightData.photo}`} alt="Highlight Image"/>
            <h5>{highlightData.description}</h5>
            
            <p className="number-of-likes">
                {highlightData.ownerId !== userId ? // The like button is available only if the User is not the Creator
                    <i id="like-icon" onClick={() => likeHighlightHandler(highlightData, userId, highlightId, setNumberOfLikes, numberOfLikes, navigate)} className={
                        highlightData.hasLiked
                        ? "fa-solid fa-thumbs-up already-liked" // If the person has liked, the button will not move and be different colour
                        : "fa-solid fa-thumbs-up fa-bounce"}
                    ></i> : ""}
                Likes: {numberOfLikes}</p>

            { // Only the owner has the right to edit and delete the highlight
            highlightData.ownerId === userId ? 
                <div className="buttons">
                    <Link to={`/highlights/edit/${highlightData._id}`}><button>Edit</button></Link>
                    <button onClick={() => setDeleteHighlightComponent(true)}>Delete</button>
                </div>
                : ""}
            </> 
            : 
            ""}                
    </main>
    );  
}
