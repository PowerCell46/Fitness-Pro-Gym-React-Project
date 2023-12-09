import { productSuccessfullyDeleted, errorToastMessage } from "../../../utils/toastify";


export async function deleteProductSubmitHandler(productId, navigate, token) {
    try {
        var response = await fetch(`http://localhost:5000/products/delete/${productId}`, {
            method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({token})
        });
    
    } catch {
        navigate("/404");
    }

    if (response.status === 200) {
        
        productSuccessfullyDeleted();

        return navigate("/products");
  
    } else {
        const errorData = await response.json();
        
        errorToastMessage(errorData.error);

        return navigate("/404");
    }
}