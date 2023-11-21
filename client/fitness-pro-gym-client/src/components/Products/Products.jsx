import { useEffect, useState } from "react";
import "./products.css";
import { Link } from "react-router-dom";


export function Products() {
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        fetchProductsData();
    }, []);

    return (
        <div className="products-main">
            
            <div className="aside-wrapper">
                <aside>
                    <h1 id="h1-all" onClick={fetchProductsData}>All</h1>
                    <h1 id="h1-fitness-supplements" onClick={filterToFitnessSupplements}>Fitness Supplements</h1>
                    <h1 id="h1-fitness-machines" onClick={filterToFitnessMachines}>Fitness Machines</h1>
                    <h1 id="h1-merchandise" onClick={filterToMerchandise}>Merchandise</h1>
                </aside> 
            </div>
            
            <section>
                <main>

                    {productsData.map((product) => 
                        <Link key={product._id} to={`/products/${product._id}`}>
                            <div className="product-container">
                                <div className="image-container">
                                <img src={`data:image/jpeg;base64,${product.photo}`} alt={`${product.name} Image`}/>
                                    <button>Add To Cart</button>
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

        </div>
    );

    async function fetchProductsData() {
        try {
            var response = await fetch("http://localhost:5000/products");
        
        } catch {
            //do something
            console.log(await response.json());
        }
        
        if (!response.ok) {
            console.log(await response.json());
            // navigate
        }
        
        const data = await response.json();
        
        console.log(data);
        setProductsData(data);

        document.querySelector("#h1-all").classList.add("selected-view");
        document.querySelector("#h1-fitness-supplements").classList.remove("selected-view");
        document.querySelector("#h1-fitness-machines").classList.remove("selected-view");
        document.querySelector("#h1-merchandise").classList.remove("selected-view");
    }

    async function filterToFitnessSupplements() {
        try {
            var response = await fetch("http://localhost:5000/products/supplements");
        
        } catch {
            //do something
            console.log(await response.json());
        }
        
        if (!response.ok) {
            console.log(await response.json());
            // navigate
        }
        
        const data = await response.json();
        
        setProductsData(data);

        document.querySelector("#h1-all").classList.remove("selected-view");
        document.querySelector("#h1-fitness-supplements").classList.add("selected-view");
        document.querySelector("#h1-fitness-machines").classList.remove("selected-view");
        document.querySelector("#h1-merchandise").classList.remove("selected-view");
    }

    async function filterToFitnessMachines() {
        try {
            var response = await fetch("http://localhost:5000/products/machines");
        
        } catch {
            //do something
            console.log(await response.json());
        }
        
        if (!response.ok) {
            console.log(await response.json());
            // navigate
        }
        
        const data = await response.json();
        
        setProductsData(data);

        document.querySelector("#h1-all").classList.remove("selected-view");
        document.querySelector("#h1-fitness-supplements").classList.remove("selected-view");
        document.querySelector("#h1-fitness-machines").classList.add("selected-view");
        document.querySelector("#h1-merchandise").classList.remove("selected-view");
    }

    async function filterToMerchandise() {
        try {
            var response = await fetch("http://localhost:5000/products/merchandise");
        
        } catch {
            //do something
            console.log(await response.json());
        }
        
        if (!response.ok) {
            console.log(await response.json());
            // navigate
        }
        
        const data = await response.json();
        
        setProductsData(data);

        document.querySelector("#h1-all").classList.remove("selected-view");
        document.querySelector("#h1-fitness-supplements").classList.remove("selected-view");
        document.querySelector("#h1-fitness-machines").classList.remove("selected-view");
        document.querySelector("#h1-merchandise").classList.add("selected-view");
    }
}