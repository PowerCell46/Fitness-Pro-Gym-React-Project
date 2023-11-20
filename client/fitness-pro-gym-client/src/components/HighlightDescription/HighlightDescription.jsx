import { useParams } from "react-router-dom";
import "./highlightDescription.css";


export function HighlightDescription() {
    const {highlightId} = useParams();
    
    return (
        <main className="highlight-description-main">
            <p>Upload Date: 16.08.2023</p>
            <img src="./images/profile_picture.jpg" alt=""/>
            <h5>Average Arm Day Pump word word word word word word word word word word</h5>
            <p className="number-of-likes"><i className="fa-solid fa-thumbs-up fa-bounce"></i>Likes: 5</p>
            <div className="buttons">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </main>
    );  
}