import "./deleteProduct.css";
import { useContext } from "react";
import { ProductContext } from "../../../contexts/ProductContext";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import { errorToastMessage, productSuccessfullyDeleted } from "../../../utils/toastify";
 

export function DeleteProduct() {    
    const {navigate} = useContext(AuthenticationContext);
    
    const {setDeleteProductComponent, productId} = useContext(ProductContext);

    return (
        <section className="delete-product-section">
            <h3>Are you sure you want to Delete this Product?</h3>
            <div className="logout-buttons">
                <button onClick={() => setDeleteProductComponent(false)}>Cancel</button>
                <button onClick={deleteProduct}>Proceed</button>
            </div>
        </section>
    );


    async function deleteProduct() {
        try {
            var response = await fetch(`http://localhost:5000/products/delete/${productId}`);
        
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
}