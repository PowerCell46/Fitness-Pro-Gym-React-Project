import "./editHighlight.css";
import { fakeButtonHandler, realButtonHandler } from "../../../utils/fakeBtnRealBtn";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useState } from "react";
import { errorToastMessage } from "../../../utils/toastify";
import { editHighlightSubmitHandler } from "./editHighlightSubmitHandler";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { handleFieldChange } from "../../../utils/handleFieldChange";


export function EditHighlight() {
    const {navigate} = useContext(GlobalContext);
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
            
            setHighlightData(data);   
        }

        async function  getUserId() {
            try {
                const response = await fetch("http://localhost:5000/users/getUserId", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify( {token:  JSON.parse(localStorage.getItem("authenticationTokenAndData")).token})
                });
        
                if (response.status === 200) {
                    const data  = await response.json();

                    setUserId(data.userId);
        
                } else {
                    const errorData = await serverResponse.json();
                
                    errorToastMessage(errorData.error);
        
                    return navigate("/404");
                }
                
            } catch {
                navigate('/404');
            }
        }

        getUserId();
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
            
                <input type="text" name="description" placeholder="Average Arm day pump" value={highlight.description} onChange={handleFieldChange}/>
            
                <button>Post</button>
            </form>
        </main>
    );
}
