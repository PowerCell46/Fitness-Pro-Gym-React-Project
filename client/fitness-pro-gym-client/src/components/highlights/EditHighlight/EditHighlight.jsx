import "./editHighlight.css";
import { fakeButtonHandler, realButtonHandler } from "../../../utils/fakeBtnRealBtn";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useState } from "react";
import { validateImageExtension } from "../../../utils/validators";
import { errorToastMessage, highlightSuccessfullyEdited } from "../../../utils/toastify";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";


export function EditHighlight() {
    const {navigate} = useContext(AuthenticationContext);
    const [highlight, setHighlightData] = useState({});
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
            
            setHighlightData(data);   
        }

        fetchHighlightData();


    }, []);

    const handleDescriptionChange = (event) => {
        setHighlightData({ ...highlight, description: event.target.value });
      };

    return (
        <main className="main-edit-highlight">
            <h1>Edit a Highlight</h1>
            <form onSubmit={editHighlightSubmitHandler}>
                <p id="edit-highlight-image-err-p" className="err-message">File format not available!</p>
                <input type="file" className="file-upload" hidden="hidden" name="image" onChange={realButtonHandler}/>
            
                <div className="file-upload-div">
                    <button id="edit-highlight-image" onClick={fakeButtonHandler}>Choose a file</button>
                    <span id="edit-highlight-span">{highlight.imageLocation ? highlight.imageLocation.substring(highlight.imageLocation.length - 15) : ""}</span>
                </div>
            
                <input type="text" name="description" placeholder="Average Arm day pump" value={highlight.description} onChange={handleDescriptionChange}/>
            
                <button>Post</button>
            </form>
        </main>
    );

    async function editHighlightSubmitHandler(e) {
        e.preventDefault();

        const spanElement = document.querySelector("#edit-highlight-span");
        
        let formData = new FormData(e.target);
        formData.append("ownerId", JSON.parse(localStorage.getItem("authenticationTokenAndData")).id);
        
        if (spanElement.textContent !== highlight.imageLocation.substring(highlight.imageLocation.length - 15)) { // The image was changed
        
            const validImage = validateImageExtension(formData.get("image"));
           
            if (!validImage) {
                document.querySelector("#edit-highlight-image-err-p").textContent = 'Image format not valid!';                    
                document.querySelector("#edit-highlight-image-err-p").style.display = 'inline';
                document.querySelector("#edit-highlight-image").classList.add("err-input-field");
                return;
        
            } else {
                document.querySelector("#edit-highlight-image-err-p").style.display = 'none';
                document.querySelector("#edit-highlight-image").classList.remove("err-input-field");
            }
        }
        
        try {
            let response = await fetch(`http://localhost:5000/highlights/edit/${highlightId}`, {
                method: "POST",
                body: formData,
            });

            if (response.status === 200) {
                
                highlightSuccessfullyEdited();

                return navigate(`/highlights/${highlightId}`);

            } else {
                const errorData = await serverResponse.json();
            
                errorToastMessage(errorData.error);

                return navigate("/404");
            }
            
        } catch {
            return navigate('/404');
        }
    }
}
