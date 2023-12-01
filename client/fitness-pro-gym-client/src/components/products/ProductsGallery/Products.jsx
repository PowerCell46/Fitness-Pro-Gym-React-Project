import { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import "./products.css";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { errorToastMessage } from '../../../utils/toastify';
import { addProductToCart } from "./addProductToCart";
import { fetchCertainProducts } from "./fetchCertainProducts";


export function Products() {
    const userId = localStorage.getItem("authenticationTokenAndData")  ? JSON.parse(localStorage.getItem("authenticationTokenAndData")).id || false : false;
    const {navigate} = useContext(AuthenticationContext);
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        fetchCertainProducts("", errorToastMessage, navigate, setProductsData);
    }, []);

    return (
        <div className="products-main">
            
            <div className="aside-wrapper"> {/* Filtering the Products*/}
                <aside>
                    <h1 id="h1-all" onClick={() => fetchCertainProducts("", errorToastMessage, navigate, setProductsData)}>All</h1>
                    <h1 id="h1-fitness-supplements" onClick={() => fetchCertainProducts('/supplements', errorToastMessage, navigate, setProductsData)}>Fitness Supplements</h1>
                    <h1 id="h1-fitness-machines" onClick={() => fetchCertainProducts('/machines', errorToastMessage, navigate, setProductsData)}>Fitness Machines</h1>
                    <h1 id="h1-merchandise" onClick={() => fetchCertainProducts('/merchandise', errorToastMessage, navigate, setProductsData)}>Merchandise</h1>
                </aside> 
            </div>
            
            <section>
                <main>

                    {productsData.map((product) => 
                        <Link key={product._id} to={`/products/${product._id}`}>
                            <div className="product-container">
                                <div className="image-container">
                                <img src={`data:image/jpeg;base64,${product.photo}`} alt={`${product.name} Image`}/>
                                    {userId ? <button onClick={(e) => addProductToCart(e, product._id, userId, navigate)}>Add To Cart</button> : ""}
                                </div>
                                <div className="shown-info">
                                    <h5>{product.name}</h5>
                                    <p id="price">{product.price}<sup>00</sup> BGN</p>
                                </div>
                            </div>
                        </Link>
                    )}
                
                </main>
            </section>
            <ToastContainer />
        </div>
    );
}