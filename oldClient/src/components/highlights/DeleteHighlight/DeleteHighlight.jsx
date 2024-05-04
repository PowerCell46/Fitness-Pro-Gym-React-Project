import "./deleteHighlight.css";
import { useContext } from "react";
import { HighlightContext } from "../../../contexts/HighlightContext";
import { errorToastMessage } from "../../../utils/toastify";
import { GlobalContext} from "../../../contexts/GlobalContext";
import { deleteHighlightSubmitHandler } from "./deleteHighlightSubmitHandler";


export function DeleteHighlight() {
    const {navigate} = useContext(GlobalContext);
    const {setDeleteHighlightComponent, highlightId, userId} = useContext(HighlightContext);

    return (
        <section className="delete-product-section">
            <h3>Are you sure you want to Delete this Highlight?</h3>
            <div className="logout-buttons">
                <button onClick={() => setDeleteHighlightComponent(false)}>Cancel</button>
                <button onClick={() => deleteHighlightSubmitHandler(userId, navigate, highlightId, errorToastMessage)}>Proceed</button>
            </div>
        </section>
    );
}