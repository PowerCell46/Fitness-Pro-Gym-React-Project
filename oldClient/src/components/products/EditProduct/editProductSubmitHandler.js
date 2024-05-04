import { validateImageExtension, validateProductDescription, validateProductName, validateProductPrice } from "../../../utils/validators";
import { productSuccessfullyEdited, errorToastMessage } from "../../../utils/toastify";


export async function editProductSubmitHandler(e, userId, productId, navigate, productData) {
    e.preventDefault();

    const spanElement = document.querySelector("#edit-product-span");
    
    let formData = new FormData(e.target);
    
    if (spanElement.textContent !== productData.imageLocation.substring(productData.imageLocation.length - 15)) { // The image was changed
    
        var validImage = validateImageExtension(formData.get("image"));
        if (!validImage) {
            document.querySelector("#edit-product-image-err-p").textContent = 'Image format not valid!';                    
            document.querySelector("#edit-product-image-err-p").style.display = 'inline';
            document.querySelector("#edit-product-image").classList.add("err-input-field");
            return;
    
        } else {
            document.querySelector("#edit-product-image-err-p").style.display = 'none';
            document.querySelector("#edit-product-image").classList.remove("err-input-field");
        }
    } else {
        var validImage = true;
    }

    const nameValidation = validateProductName(formData.get("name"));
    if (nameValidation !== true) {
        document.querySelector("#edit-product-name-err-p").textContent = nameValidation;                    
        document.querySelector("#edit-product-name-err-p").style.display = 'inline';
        document.querySelector("#edit-product-name").classList.add("err-input-field");
        document.querySelector(".edit-product-main").style.height = "115vh";
        
    } else {
        document.querySelector("#edit-product-name-err-p").style.display = 'none';
        document.querySelector("#edit-product-name").classList.remove("err-input-field");
        document.querySelector(".edit-product-main").style.height = "95vh";
    }

    const descriptionValidation = validateProductDescription(formData.get("description"));
    if (descriptionValidation !== true) {
        document.querySelector("#edit-product-description-err-p").textContent = descriptionValidation;                    
        document.querySelector("#edit-product-description-err-p").style.display = 'inline';
        document.querySelector("#edit-product-description").classList.add("err-input-field");
        document.querySelector(".edit-product-main").style.height = "115vh";

    } else {
        document.querySelector("#edit-product-description-err-p").style.display = 'none';
        document.querySelector("#edit-product-description").classList.remove("err-input-field");
        document.querySelector(".edit-product-main").style.height = "95vh";
    }
    
    const priceValidation = validateProductPrice(formData.get("price"));
    if (priceValidation !== true) {
        document.querySelector("#edit-product-price-err-p").textContent = priceValidation;                    
        document.querySelector("#edit-product-price-err-p").style.display = 'inline';
        document.querySelector("#edit-product-price").classList.add("err-input-field");
        document.querySelector(".edit-product-main").style.height = "115vh";
        
    } else {
        document.querySelector("#edit-product-price-err-p").style.display = 'none';
        document.querySelector("#edit-product-price").classList.remove("err-input-field");
        document.querySelector(".edit-product-main").style.height = "95vh";
    }
    
    if (!validImage || nameValidation !== true || descriptionValidation !== true || priceValidation !== true) {
        return;
    }
    formData.append("userId", userId);

    
    // Making the request with valid Data
    try {
        let response = await fetch(`http://localhost:5000/products/edit/${productId}`, {
            method: "POST",
            body: formData,
        });

        if (response.status === 200) {
            
            productSuccessfullyEdited();

            return navigate(`/products/${productId}`);

        } else {
            const errorData = await response.json();
        
            errorToastMessage(errorData.error);

            return navigate("/404");
        }
        
    } catch {
        return navigate('/404');
    }
}