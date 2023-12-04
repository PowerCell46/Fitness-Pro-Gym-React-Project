import { validateImageExtension, validateProductName, validateProductDescription, validateProductPrice } from "../../../utils/validators";


export async function postProductSubmitHandler(e, navigate, errorToastMessage, token) {
    e.preventDefault();

    let formData = new FormData(e.target);
    
    const validImage = validateImageExtension(formData.get("image"));
    if (!validImage) {;                    
        document.querySelector("#post-product-image-err-p").style.display = 'inline';
        document.querySelector("#post-product-image").classList.add("err-input-field");
        document.querySelector(".post-product-main").style.height = "115vh";
    } else {
        document.querySelector("#post-product-image-err-p").style.display = 'none';
        document.querySelector("#post-product-image").classList.remove("err-input-field");
        document.querySelector(".post-product-main").style.height = "95vh";
    }
    
    const nameValidation = validateProductName(formData.get("name"));
    if (nameValidation !== true) {
        document.querySelector("#post-product-name-err-p").textContent = nameValidation;                    
        document.querySelector("#post-product-name-err-p").style.display = 'inline';
        document.querySelector("#post-product-name").classList.add("err-input-field");
        document.querySelector(".post-product-main").style.height = "115vh";
        
    } else {
        document.querySelector("#post-product-name-err-p").style.display = 'none';
        document.querySelector("#post-product-name").classList.remove("err-input-field");
        document.querySelector(".post-product-main").style.height = "95vh";
        
    }

    const descriptionValidation = validateProductDescription(formData.get("description"));
    if (descriptionValidation !== true) {
        document.querySelector("#post-product-description-err-p").textContent = descriptionValidation;                    
        document.querySelector("#post-product-description-err-p").style.display = 'inline';
        document.querySelector("#post-product-description").classList.add("err-input-field");
        document.querySelector(".post-product-main").style.height = "115vh";

    } else {
        document.querySelector("#post-product-description-err-p").style.display = 'none';
        document.querySelector("#post-product-description").classList.remove("err-input-field");
        document.querySelector(".post-product-main").style.height = "95vh";
    }
    
    const priceValidation = validateProductPrice(formData.get("price"));
    if (priceValidation !== true) {
        document.querySelector("#post-product-price-err-p").textContent = priceValidation;                    
        document.querySelector("#post-product-price-err-p").style.display = 'inline';
        document.querySelector("#post-product-price").classList.add("err-input-field");
        document.querySelector(".post-product-main").style.height = "115vh";
        
    } else {
        document.querySelector("#post-product-price-err-p").style.display = 'none';
        document.querySelector("#post-product-price").classList.remove("err-input-field");
        document.querySelector(".post-product-main").style.height = "95vh";
    }
    
    if (!validImage || nameValidation !== true || descriptionValidation !== true || priceValidation !== true) {
        return;
    }
    formData.append("token", token);
    
    try {
        var response =  await fetch("http://localhost:5000/products", {
            method: "POST",
            body: formData,
        });
        
        if (response.status === 200) {
            
            navigate('/products');

        } else {
            const errorData = await response.json();
        
            errorToastMessage(errorData.error);

            return navigate("/404");
        }

    } catch {
        return navigate('/404');
    }  
}