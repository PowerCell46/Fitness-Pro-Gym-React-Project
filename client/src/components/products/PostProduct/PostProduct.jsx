import { useContext } from "react";
import { ProductContext } from "../../../contexts/ProductContext";
import "./postProduct.css";
import { fakeButtonHandler, realButtonHandler } from "../../../utils/fakeBtnRealBtn";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";


export function PostProduct() {
    const {user} = useContext(AuthenticationContext);
    const {navigate, errorToastMessage} = useContext(GlobalContext);
    const {postProductSubmitHandler} = useContext(ProductContext);

    return (
        <main className="post-product-main">
        <h1>Create Product</h1>
        <form onSubmit={(e) => postProductSubmitHandler(e, navigate, errorToastMessage, user)}>
           
            <p id="post-product-name-err-p" className="err-message">Product name must be at least 5 characters long!</p>
            <input id="post-product-name" type="text" placeholder="Product Name" name="name"/>    
           
            <div className="productTypeContainer">
                    <label htmlFor="productType">Product Type:</label>
                <select name="productType">
                    <option value="foodSupplement">Food Supplement</option>
                    <option value="fitnessMachine">Fitness Machine</option>
                    <option value="merchandise">Merchandise</option>
                </select>
            </div>
           
            <p id="post-product-description-err-p" className="err-message">Product Description must be at least 10 characters long!</p>
            <input id="post-product-description" type="text" placeholder="Product Description" name="description"/>
            
            <p id="post-product-price-err-p" className="err-message">Product price must be bigger than 0!</p>
            <input id="post-product-price" type="number" placeholder="Product Price" name="price"/>
           
            <input onChange={realButtonHandler} type="file" name="image" className="file-upload" hidden="hidden"/>
            <p id="post-product-image-err-p" className="err-message">Invalid File Type!</p>
            <div className="file-upload-div">
                <button id="post-product-image" onClick={fakeButtonHandler}>Choose a file</button>
                <span>No file chosen</span>
            </div>
          
            <button>Create Product</button>
        </form>
    </main>
    );
}