import { useEffect, useState, useContext } from 'react';
import './productDescription.css';
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { useParams } from 'react-router-dom';


export function ProductDescription() {
    const {user} = useContext(AuthenticationContext);
    const [productData, setProductData] = useState({});
    const {productId} = useParams();

    useEffect(() => {
        async function fetchProductData() {
            try {
                var response = await fetch(`http://localhost:5000/products/${productId}`);
    
                } catch {
                    console.log( await response.json());
                    //Redirect
                }
    
                if (!response.ok) {
                    console.log( await response.json());
                    // Redirect
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
                {JSON.parse(localStorage.getItem("authenticationTokenAndData")).isAdministrator ? <button>EDIT</button> : ""}
                <button>ADD TO CART</button>
                {JSON.parse(localStorage.getItem("authenticationTokenAndData")).isAdministrator ? <button>DELETE</button> : ""}
                </div>
            </aside>
        </main>
    );
}