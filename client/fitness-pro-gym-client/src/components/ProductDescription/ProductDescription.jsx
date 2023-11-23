import { useEffect, useState, useContext } from 'react';
import './productDescription.css';
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { Link, useParams } from 'react-router-dom';


export function ProductDescription() {
    const {user, navigate} = useContext(AuthenticationContext);
    const [productData, setProductData] = useState({});
    const {productId} = useParams();

    useEffect(() => {
        async function fetchProductData() {
            try {
                var response = await fetch(`http://localhost:5000/products/${productId}`);
    
                } catch {
                    console.log( await response.json());
                    navigate("/404");
                }
    
                if (!response.ok) {
                    console.log( await response.json());
                    console.log('/404');
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
                    {user ? JSON.parse(localStorage.getItem("authenticationTokenAndData")).isAdministrator ? 
                        <Link to={`/products/edit/${productId}`}><button>EDIT</button></Link> : "": ""}
                    <button onClick={addProductToCart}>ADD TO CART</button>
                    {user ? JSON.parse(localStorage.getItem("authenticationTokenAndData")).isAdministrator ? 
                        <button onClick={deleteProductHandler}>DELETE</button> : "" : ""}
                </div>
            </aside>
        </main>
    );

    async function deleteProductHandler() {
        console.log("DELETE");
        // write functionality and design of the popup
    }

    async function addProductToCart() {
        // Write the functionality
        console.log("ADDED");
    }
}