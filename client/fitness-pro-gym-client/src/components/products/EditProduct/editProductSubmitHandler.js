import { validateImageExtension } from "../../../utils/validators";
import { productSuccessfullyEdited, errorToastMessage } from "../../../utils/toastify";


export async function editProductSubmitHandler(e, userId, productId, navigate, productData) {
    e.preventDefault();

    const spanElement = document.querySelector("#edit-product-span");
    
    let formData = new FormData(e.target);
    formData.append("ownerId", userId);
    
    if (spanElement.textContent !== productData.imageLocation.substring(productData.imageLocation.length - 15)) { // The image was changed
    
        const validImage = validateImageExtension(formData.get("image"));
        if (!validImage) {
            document.querySelector("#edit-product-image-err-p").textContent = 'Image format not valid!';                    
            document.querySelector("#edit-product-image-err-p").style.display = 'inline';
            document.querySelector("#edit-product-image").classList.add("err-input-field");
            return;
    
        } else {
            document.querySelector("#edit-product-image-err-p").style.display = 'none';
            document.querySelector("#edit-product-image").classList.remove("err-input-field");
        }
    }
    
    try {
        let response = await fetch(`http://localhost:5000/products/edit/${productId}`, {
            method: "POST",
            body: formData,
        });

        if (response.status === 200) {
            
            productSuccessfullyEdited();

            return navigate(`/products/${productId}`);

        } else {
            const errorData = await serverResponse.json();
        
            errorToastMessage(errorData.error);

            return navigate("/404");
        }
        
    } catch {
        return navigate('/404');
    }
}