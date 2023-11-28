import { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import "./products.css";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { productSuccessfullyAdded, productAlreadyAddedToCart } from '../../../utils/toastify';


export function Products() {
    const {navigate} = useContext(AuthenticationContext);
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        fetchCertainProducts("");
    }, []);

    return (
        <div className="products-main">
            
            <div className="aside-wrapper"> {/* Filtering the Products*/}
                <aside>
                    <h1 id="h1-all" onClick={() => fetchCertainProducts("")}>All</h1>
                    <h1 id="h1-fitness-supplements" onClick={() => fetchCertainProducts('/supplements')}>Fitness Supplements</h1>
                    <h1 id="h1-fitness-machines" onClick={() => fetchCertainProducts('/machines')}>Fitness Machines</h1>
                    <h1 id="h1-merchandise" onClick={() => fetchCertainProducts('/merchandise')}>Merchandise</h1>
                </aside> 
            </div>
            
            <section>
                <main>

                    {productsData.map((product) => 
                        <Link key={product._id} to={`/products/${product._id}`}>
                            <div className="product-container">
                                <div className="image-container">
                                <img src={`data:image/jpeg;base64,${product.photo}`} alt={`${product.name} Image`}/>
                                    <button onClick={(e) => addProductToCart(e, product._id)}>Add To Cart</button>
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


    async function addProductToCart(e, productId) {
        e.preventDefault();
        e.stopPropagation();
        
        const userId = JSON.parse(localStorage.getItem("authenticationTokenAndData")).id;

        try {
            var response = await fetch(`http://localhost:5000/products/buy/${productId}`, {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({userId})
            });
            
            if (response.status === 200) {
                const responseCondition = await response.json();
                e.target.style.backgroundColor = "#cc1e00"; 
                e.target.textContent = 'Added to Cart';
                e.target.disabled = true;
                
                if (responseCondition === "Successful Operation!") {
                    productSuccessfullyAdded();

                } else if (responseCondition === "Product already in Cart!") {
                    productAlreadyAddedToCart();
                }
                
            } else {
                navigate("/404");
            }
            
        } catch {
            navigate("/404");
        }
    }

    async function fetchCertainProducts(endpoint) {
        try {
            var response = await fetch(`http://localhost:5000/products${endpoint}`);
            
            if (!response.ok) {
                navigate("/404");
            }

        } catch {
            navigate("/404");
        }
        
        const data = await response.json();
        
        setProductsData(data);
        if (endpoint === "") {
            document.querySelector("#h1-all").classList.add("selected-view");
            document.querySelector("#h1-fitness-supplements").classList.remove("selected-view");
            document.querySelector("#h1-fitness-machines").classList.remove("selected-view");
            document.querySelector("#h1-merchandise").classList.remove("selected-view");
        
        } else if (endpoint === '/supplements') {
            document.querySelector("#h1-all").classList.remove("selected-view");
            document.querySelector("#h1-fitness-supplements").classList.add("selected-view");
            document.querySelector("#h1-fitness-machines").classList.remove("selected-view");
            document.querySelector("#h1-merchandise").classList.remove("selected-view");

        } else if (endpoint === '/machines') {
            document.querySelector("#h1-all").classList.remove("selected-view");
            document.querySelector("#h1-fitness-supplements").classList.remove("selected-view");
            document.querySelector("#h1-fitness-machines").classList.add("selected-view");
            document.querySelector("#h1-merchandise").classList.remove("selected-view");

        } else if (endpoint === '/merchandise') {
            document.querySelector("#h1-all").classList.remove("selected-view");
            document.querySelector("#h1-fitness-supplements").classList.remove("selected-view");
            document.querySelector("#h1-fitness-machines").classList.remove("selected-view");
            document.querySelector("#h1-merchandise").classList.add("selected-view");
        }
    }
}