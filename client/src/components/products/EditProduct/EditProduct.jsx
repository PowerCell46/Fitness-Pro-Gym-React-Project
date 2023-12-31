import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./editProduct.css";
import { fakeButtonHandler, realButtonHandler } from "../../../utils/fakeBtnRealBtn";
import { useState } from "react";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import { errorToastMessage} from "../../../utils/toastify";
import { editProductSubmitHandler } from "./editProductSubmitHandler";
import { handleFieldChange } from "../../../utils/handleFieldChange";
import { getUserId } from "../../../utils/getUserId";
import { GlobalContext } from "../../../contexts/GlobalContext";


export function EditProduct() {
    const [userId, setUserId] = useState("");
    const {productId} = useParams();
    const [productData, setProductData] = useState({});
    const {navigate} = useContext(GlobalContext);
    const {user} = useContext(AuthenticationContext);

    useEffect(() => {
        async function fetchProductData() {
            try {
                var response = await fetch(`http://localhost:5000/products/${productId}`);
    
                if (!response.ok) {
                    const errorData = await response.json();
            
                    errorToastMessage(errorData.error);

                    return navigate("/404");
                }

            } catch {
                return navigate("/404");
            }       
            
            let data = await response.json();

            setProductData(data);
        }

        getUserId(user, setUserId, errorToastMessage, navigate)
        fetchProductData();
    }, []);

    return (
        <main className="edit-product-main">
        <h1>Edit Product</h1>
        <form onSubmit={(e) => editProductSubmitHandler(e, userId, productId, navigate, productData)}>
           
            <p id="edit-product-name-err-p" className="err-message">Product name must be at least 5 characters long!</p>
            <input id="edit-product-name" type="text" placeholder="Product Name" name="name" value={productData.name} onChange={(e) => handleFieldChange(e, setProductData, productData)}/>    
           
            <div className="productTypeContainer">
                    <label htmlFor="productType">Product Type:</label>
                    <select name="productType" onChange={(e) => handleFieldChange(e, setProductData, productData)}>
                        <option value="foodSupplement" selected={productData.type === "foodSupplement"}>Food Supplement</option>
                        <option value="fitnessMachine" selected={productData.type === "fitnessMachine"}>Fitness Machine</option>
                        <option value="merchandise" selected={productData.type === "merchandise"}>Merchandise</option>
                    </select>

            </div>
           
            <p id="edit-product-description-err-p" className="err-message">Product Description must be at least 10 characters long!</p>
            <input id="edit-product-description" type="text" placeholder="Product Description" name="description" value={productData.description} onChange={(e) => handleFieldChange(e, setProductData, productData)}/>
            
            <p id="edit-product-price-err-p" className="err-message">Product price must be bigger than 0!</p>
            <input id="edit-product-price" type="number" placeholder="Product Price" name="price" value={productData.price} onChange={(e) => handleFieldChange(e, setProductData, productData)}/>
           
            <input onChange={realButtonHandler} type="file" name="image" className="file-upload" hidden="hidden"/>
            <p id="edit-product-image-err-p" className="err-message">Invalid File Type!</p>
            <div className="file-upload-div">
                <button id="edit-product-image" onClick={fakeButtonHandler}>Choose a file</button>
                <span id="edit-product-span">{productData.imageLocation ? productData.imageLocation.substring(productData.imageLocation.length - 15) : ""}</span>
            </div>
          
            <button>Create Product</button>
        </form>
    </main>
    );
}