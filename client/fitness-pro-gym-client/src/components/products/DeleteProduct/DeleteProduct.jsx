import "./deleteProduct.css";
import { useContext } from "react";
import { ProductContext } from "../../../contexts/ProductContext";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import { deleteProductSubmitHandler } from "./deleteProductSubmitHandler";


export function DeleteProduct() {    
    const {navigate} = useContext(AuthenticationContext);
    
    const {setDeleteProductComponent, productId} = useContext(ProductContext);

    return (
        <section className="delete-product-section">
            <h3>Are you sure you want to Delete this Product?</h3>
            <div className="logout-buttons">
                <button onClick={() => setDeleteProductComponent(false)}>Cancel</button>
                <button onClick={() => deleteProductSubmitHandler(productId, navigate, token)}>Proceed</button>
            </div>
        </section>
    );
}