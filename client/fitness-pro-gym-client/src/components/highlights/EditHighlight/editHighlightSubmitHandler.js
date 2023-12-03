import { validateImageExtension } from "../../../utils/validators";
import { highlightSuccessfullyEdited, errorToastMessage } from "../../../utils/toastify";


export async function editHighlightSubmitHandler(e, userId, highlight, highlightId, navigate) {
    e.preventDefault();
    
    const spanElement = document.querySelector("#edit-highlight-span");
    
    let formData = new FormData(e.target);
    formData.append("userId", userId);
    
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