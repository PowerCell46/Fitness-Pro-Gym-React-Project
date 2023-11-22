import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import "./postProduct.css";


export function PostProduct() {
    const {postProductSubmitHandler} = useContext(ProductContext);

    return (
        <main className="post-product-main">
        <h1>Create Product</h1>
        <form onSubmit={postProductSubmitHandler}>
           
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
           
            <input onChange={postProductRealButtonHandler} type="file" name="image" className="file-upload" hidden="hidden"/>
            <p id="post-product-image-err-p" className="err-message">Invalid File Type!</p>
            <div className="file-upload-div">
                <button id="post-product-image" onClick={postProductFakeButtonHandler}>Choose a file</button>
                <span>No file chosen</span>
            </div>
          
            <button>Create Product</button>
        </form>
    </main>
    );
}


function postProductFakeButtonHandler(e) {
    e.preventDefault();
    document.querySelector(".file-upload").click();
}


function postProductRealButtonHandler() {
    const realFileButton = document.querySelector(".file-upload");
    const spanFile = document.querySelector(".file-upload-div span");
    if (realFileButton.value) {
        spanFile.textContent= realFileButton.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        spanFile.style.color = "#007760";
        spanFile.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
    } else {
        spanFile.textContent = 'No file chosen';
    }
}