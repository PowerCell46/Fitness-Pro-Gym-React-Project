import "./editHighlight.css";
import { fakeButtonHandler, realButtonHandler } from "../../../utils/fakeBtnRealBtn";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useState } from "react";
import { errorToastMessage } from "../../../utils/toastify";
import { editHighlightSubmitHandler } from "./editHighlightSubmitHandler";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { handleFieldChange } from "../../../utils/handleFieldChange";
import { getUserId } from "../../../utils/getUserId";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";


export function EditHighlight() {
    const {user} = useContext(AuthenticationContext);
    const {navigate, errorToastMessage} = useContext(GlobalContext);
    const [highlight, setHighlightData] = useState({});
    const {highlightId} = useParams();
    const [userId, setUserId ]= useState("");

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
            data._id = data._doc._id;
            data.description = data._doc.description;
            data.imageLocation = data._doc.imageLocation;
            data.ownerId = data._doc.ownerId;

            setHighlightData(data);   
        }

        getUserId(user, setUserId, errorToastMessage, navigate)
        fetchHighlightData();

    }, []);

    return (
        <main className="main-edit-highlight">
            <h1>Edit a Highlight</h1>
            <form onSubmit={(e) => editHighlightSubmitHandler(e, userId, highlight, highlightId, navigate)}>
                <p id="edit-highlight-image-err-p" className="err-message">File format not available!</p>
                <input type="file" className="file-upload" hidden="hidden" name="image" onChange={realButtonHandler}/>
            
                <div className="file-upload-div">
                    <button id="edit-highlight-image" onClick={fakeButtonHandler}>Choose a file</button>
                    <span id="edit-highlight-span">{highlight.imageLocation ? highlight.imageLocation.substring(highlight.imageLocation.length - 15) : ""}</span>
                </div>
            
                <input type="text" name="description" placeholder="Average Arm day pump" value={highlight.description} onChange={(e) => handleFieldChange(e, setHighlightData, highlight)}/>
            
                <button>Post</button>
            </form>
        </main>
    );
}
