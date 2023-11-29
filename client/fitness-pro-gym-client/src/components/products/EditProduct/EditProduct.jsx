import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./editProduct.css";
import { fakeButtonHandler, realButtonHandler } from "../../../utils/fakeBtnRealBtn";
import { useState } from "react";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import { productSuccessfullyEdited, errorToastMessage} from "../../../utils/toastify";
import { validateImageExtension } from "../../../utils/validators";


export function EditProduct() {
    const {productId} = useParams();
    const [productData, setProductData] = useState({});
    const {navigate} = useContext(AuthenticationContext);

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
                navigate("/404");
            }       
            
            let data = await response.json();

            setProductData(data);
        }

        fetchProductData();
    }, []);

    return (
        <main className="edit-product-main">
        <h1>Edit Product</h1>
        <form onSubmit={editProductHandler}>
           
            <p id="edit-product-name-err-p" className="err-message">Product name must be at least 5 characters long!</p>
            <input id="edit-product-name" type="text" placeholder="Product Name" name="name" value={productData.name}/>    
           
            <div className="productTypeContainer">
                    <label htmlFor="productType">Product Type:</label>
                <select name="productType">
                    {productData.type === "foodSupplement" ? <option value="foodSupplement" selected>Food Supplement</option> : <option value="foodSupplement">Food Supplement</option>}
                    {productData.type === 'fitnessMachine' ? <option value="fitnessMachine" selected>Fitness Machine</option> : <option value="fitnessMachine">Fitness Machine</option>}
                    {productData.type === 'merchandise' ? <option value="merchandise" selected>Merchandise</option> : <option value="merchandise" >Merchandise</option>}
                </select>
            </div>
           
            <p id="edit-product-description-err-p" className="err-message">Product Description must be at least 10 characters long!</p>
            <input id="edit-product-description" type="text" placeholder="Product Description" name="description" value={productData.description}/>
            
            <p id="edit-product-price-err-p" className="err-message">Product price must be bigger than 0!</p>
            <input id="edit-product-price" type="number" placeholder="Product Price" name="price" value={productData.price}/>
           
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

    async function editProductHandler(e) {
        e.preventDefault();

        const spanElement = document.querySelector("#edit-product-span");
        
        let formData = new FormData(e.target);
        formData.append("ownerId", JSON.parse(localStorage.getItem("authenticationTokenAndData")).id);
        
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

                navigate(`/products/${productId}`);

            } else {
                const errorData = await serverResponse.json();
            
                errorToastMessage(errorData.error);

                return navigate("/404");
            }
            
        } catch {
            navigate('/404');
        }
    }
}