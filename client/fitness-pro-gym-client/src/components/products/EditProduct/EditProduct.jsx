import { useContext } from "react";
import { ProductContext } from "../../../contexts/ProductContext";
import "./editProduct.css";
import { fakeButtonHandler, realButtonHandler } from "../../../utils/fakeBtnRealBtn";


export function EditProduct() {

    return (
        <main className="edit-product-main">
        <h1>Edit Product</h1>
        <form onSubmit={editProductHandler}>
           
            <p id="edit-product-name-err-p" className="err-message">Product name must be at least 5 characters long!</p>
            <input id="edit-product-name" type="text" placeholder="Product Name" name="name"/>    
           
            <div className="productTypeContainer">
                    <label htmlFor="productType">Product Type:</label>
                <select name="productType">
                    <option value="foodSupplement">Food Supplement</option>
                    <option value="fitnessMachine">Fitness Machine</option>
                    <option value="merchandise">Merchandise</option>
                </select>
            </div>
           
            <p id="edit-product-description-err-p" className="err-message">Product Description must be at least 10 characters long!</p>
            <input id="edit-product-description" type="text" placeholder="Product Description" name="description"/>
            
            <p id="edit-product-price-err-p" className="err-message">Product price must be bigger than 0!</p>
            <input id="edit-product-price" type="number" placeholder="Product Price" name="price"/>
           
            <input onChange={realButtonHandler} type="file" name="image" className="file-upload" hidden="hidden"/>
            <p id="edit-product-image-err-p" className="err-message">Invalid File Type!</p>
            <div className="file-upload-div">
                <button id="edit-product-image" onClick={fakeButtonHandler}>Choose a file</button>
                <span>No file chosen</span>
            </div>
          
            <button>Create Product</button>
        </form>
    </main>
    );

    async function editProductHandler() {

    }
}