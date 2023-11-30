import { productSuccessfullyAdded, productAlreadyAddedToCart, errorToastMessage } from "../../../utils/toastify";


export async function addProductToCart(e, productId, userId, navigate) {
    e.preventDefault();
    e.stopPropagation();
    
    try {
        var response = await fetch(`http://localhost:5000/products/buy/${productId}`, {
            method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({userId})
        });
        
        if (response.status === 200) {
            const responseCondition = await response.json();
            e.target.style.backgroundColor = "#cc1e00"; 
            e.target.textContent = 'Added to Cart';
            e.target.disabled = true;
            
            if (responseCondition === "Successful Operation!") {
                return productSuccessfullyAdded();

            } else if (responseCondition === "Product already in Cart!") {
                return productAlreadyAddedToCart();
            }
            
        } else {
            const errorData = await response.json();
        
            errorToastMessage(errorData.error);
            return navigate("/404");
        }
        
    } catch {
        return navigate("/404");
    }
}