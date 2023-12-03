import { validateImageExtension } from "../../../utils/validators";


export async function postHighlightSubmitHandler(e, navigate, errorToastMessage) {
    e.preventDefault(); 

    let formData = new FormData(e.target);
    formData.append("token", JSON.parse(localStorage.getItem("authenticationTokenAndData")).token);

    const validImage = validateImageExtension(formData.get("image"));
    if (!validImage) {
        document.querySelector("#post-highlight-image-err-p").textContent = 'Image format not valid!';                    
        document.querySelector("#post-highlight-image-err-p").style.display = 'inline';
        document.querySelector("#post-highlight-image").classList.add("err-input-field");
        return;
   
    } else {
        document.querySelector("#post-highlight-image-err-p").style.display = 'none';
        document.querySelector("#post-highlight-image").classList.remove("err-input-field");
    }

    // No required validation for the Description

    try {
        let response = await fetch("http://localhost:5000/highlights", {
            method: "POST",
            body: formData,
        });

        if (response.status === 200) {
            navigate("/highlights");

        } else {
            const errorData = await serverResponse.json();
        
            errorToastMessage(errorData.error);

            return navigate("/404");
        }
        
    } catch {
        navigate('/404');
    }
}