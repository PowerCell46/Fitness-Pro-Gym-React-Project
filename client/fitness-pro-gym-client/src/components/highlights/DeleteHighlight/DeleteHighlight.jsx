import "./deleteHighlight.css";
import { useContext } from "react";
import { HighlightContext } from "../../../contexts/HighlightContext";
import { errorToastMessage, highlightSuccessfullyDeleted } from "../../../utils/toastify";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";

export function DeleteHighlight() {
    const {navigate} = useContext(AuthenticationContext);
    
    const {setDeleteHighlightComponent, highlightId, userId} = useContext(HighlightContext);

    return (
        <section className="delete-product-section">
            <h3>Are you sure you want to Delete this Highlight?</h3>
            <div className="logout-buttons">
                <button onClick={() => setDeleteHighlightComponent(false)}>Cancel</button>
                <button onClick={deleteHighlight}>Proceed</button>
            </div>
        </section>
    );


    async function deleteHighlight() {
        try {
            var response = await fetch(`http://localhost:5000/highlights/delete/${highlightId}`, {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({userId})
            });
        
        } catch {
            navigate("/404");
        }

        if (response.status === 200) {
            
            highlightSuccessfullyDeleted();

            return navigate("/highlights");
      
        } else {
            const errorData = await response.json();
            
            errorToastMessage(errorData.error);

            return navigate("/404");
        }
    }
}