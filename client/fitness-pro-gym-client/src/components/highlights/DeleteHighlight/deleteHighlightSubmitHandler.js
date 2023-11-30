import { highlightSuccessfullyDeleted } from "../../../utils/toastify";


export async function deleteHighlightSubmitHandler(userId, navigate, highlightId, errorToastMessage) {
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