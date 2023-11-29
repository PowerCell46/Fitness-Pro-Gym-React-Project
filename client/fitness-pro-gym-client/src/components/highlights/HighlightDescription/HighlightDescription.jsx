import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./highlightDescription.css";
import { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import { HighlightContext } from "../../../contexts/HighlightContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToastMessage } from "../../../utils/toastify";
import { DeleteHighlight } from "../DeleteHighlight/DeleteHighlight";


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
                navigate("/404");
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
                    <i id="like-icon" onClick={likeHighlightHandler} className={
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
    
    async function likeHighlightHandler() {
        if (highlightData.likes.includes(userId)) {
            errorToastMessage(`You've already liked this Highlight!`);
            return;
        }
        try {
            var response = await fetch(`http://localhost:5000/highlights/like/${highlightId}`, 
            {method: "POST", headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({userId: userId})});

            if (response.status === 200) {
                setNumberOfLikes((val) => val + 1, () => {
                    document.querySelector(".number-of-likes").textContent = `Likes: ${numberOfLikes}`;
                });
                
                document.querySelector("#like-icon").classList.add("already-liked");    
           
                return;

            } else if (response.status === 400) {
                const errorData = await response.json();

                if (errorData.error === 'User already liked this Highlight!') {
                    return errorToastMessage(`You've already liked this Highlight!`);
                }

            } else {
                const errorData = await response.json();

                errorToastMessage(errorData.error);
                    
                return navigate('/404'); 
            }

        } catch {
            navigate("/404");
        }
    }
}
