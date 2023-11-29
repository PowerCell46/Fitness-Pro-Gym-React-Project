import { useEffect, useState, useContext, React } from 'react';
import './productDescription.css';
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { productAlreadyAddedToCart, productSuccessfullyAdded } from '../../../utils/toastify';
import { DeleteProduct } from '../DeleteProduct/DeleteProduct';
import { ProductContext } from "../../../contexts/ProductContext";

export function ProductDescription() {
    const {user, navigate} = useContext(AuthenticationContext);
    const [productData, setProductData] = useState({});
    const {productId} = useParams();
    const [deleteProductComponentShown, setDeleteProductComponent] = useState(false);

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
        <main className='product-description-main' >
            <ProductContext.Provider value={{setDeleteProductComponent, productId}}>
                {deleteProductComponentShown ? <DeleteProduct/> : ""}
            </ProductContext.Provider>
            <img src={`data:image/jpeg;base64,${productData.photo}`} alt={`${productData.name} Image`}/>

            <aside>
                <h2>{productData.name}</h2>
                <h3>{productData.price}.<sup>00</sup> BGN</h3>
                <p>{productData.description}</p>
                <div>
                    {user ? JSON.parse(localStorage.getItem("authenticationTokenAndData")).isAdministrator ? // Only the Administrator has access to EDIT
                        <Link to={`/products/edit/${productId}`}><button>EDIT</button></Link> : "": ""}
                  
                    <button id='add-to-cart-btn' onClick={addProductToCart}>ADD TO CART</button>
                  
                    {user ? JSON.parse(localStorage.getItem("authenticationTokenAndData")).isAdministrator ? // Only the Administrator has access to DELETE 
                        <button onClick={() => setDeleteProductComponent(true)}>DELETE</button> : "" : ""}
                </div>
            </aside>
            <ToastContainer />
        </main>
    );


    async function addProductToCart() {
        
        const userId = JSON.parse(localStorage.getItem("authenticationTokenAndData")).id;

        try {
            var response = await fetch(`http://localhost:5000/products/buy/${productId}`, {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({userId})
            });
            
            if (response.status === 200) {
                const responseCondition = await response.json();
                const element = document.querySelector(".product-description-main aside #add-to-cart-btn");
                element.style.backgroundColor = "#cc1e00"; 
                element.textContent = 'ADDED TO CART';
                element.disabled = true;
                
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
            navigate("/404");
        }
    }
}