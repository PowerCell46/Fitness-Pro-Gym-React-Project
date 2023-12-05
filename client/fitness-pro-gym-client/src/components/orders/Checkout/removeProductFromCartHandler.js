import { productSuccessfullyRemoved, errorToastMessage } from "../../../utils/toastify";
export async function removeProductFromCartHandler(removedProductId, productForRemoval, userId, setCheckoutData, setTotalSum, getProductPrice, navigate, setNumberOfCartProducts) {
    try {
        const response = await fetch(`http://localhost:5000/checkout/removeProduct`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userId, removedProductId}),
        });

        if (response.status === 200) {
            setCheckoutData((previousData) =>
                previousData.filter((data) => (data !== productForRemoval))
            );
            setTotalSum((previousTotalSum) => previousTotalSum - getProductPrice(removedProductId, productForRemoval.name));
            
            setNumberOfCartProducts((previousValue) => previousValue - 1);

            return productSuccessfullyRemoved();
            
        } else {
            const errorData = await response.json();
        
            errorToastMessage(errorData.error);

            return navigate("/404");
        }

    } catch {
        return navigate("/404");
    }
}