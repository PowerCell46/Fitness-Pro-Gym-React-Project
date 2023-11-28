import { useEffect, useState, useContext, React } from 'react';
import './productDescription.css';
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { productAlreadyAddedToCart, productSuccessfullyAdded } from '../../../utils/toastify';

export function ProductDescription() {
    const {user, navigate} = useContext(AuthenticationContext);
    const [productData, setProductData] = useState({});
    const {productId} = useParams();
    
    useEffect(() => {
        async function fetchProductData() {
            try {
                var response = await fetch(`http://localhost:5000/products/${productId}`);
    
                if (!response.ok) {
                    console.log('/404');
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
                        <button onClick={deleteProductHandler}>DELETE</button> : "" : ""}
                </div>
            </aside>
            <ToastContainer />
        </main>
    );



    async function deleteProductHandler() {
        console.log("DELETE");
        // write functionality and design of the popup
    }

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
                    productSuccessfullyAdded();

                } else if (responseCondition === "Product already in Cart!") {
                    productAlreadyAddedToCart();
                    
                }
                
            } else {
                navigate("/404");
            }
            
        } catch(err) {
            console.log(err);
            navigate("/404");
        }
    }

    
}