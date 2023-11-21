import { useEffect, useState } from "react";
import "./products.css";
import { Link } from "react-router-dom";


export function Products() {
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
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
        }

        fetchProductsData();
    }, []);

    return (
        <div className="products-main">
            
            <div className="aside-wrapper">
                <aside>
                    <h1 className="selected-view">All</h1>
                    <h1>Fitness Supplements</h1>
                    <h1>Fitness Machines</h1>
                    <h1>Merchandise</h1>
                </aside> 
                {/* With useState = по дифоулт да е избрано всички видове продукти и със селект на заглавието да се променя
                стейта и да се филтрират по типа им, вече като са извикани на тях, да не се прави нова заявка ; (снимката да се оправи) */}
            </div>
            
            <section>
                <main>

                    {productsData.map((product) => 
                    <Link to={`/products/${product._id}`}>
                    <div className="product-container">
                        <div className="image-container">
                        <img src={`data:image/jpeg;base64,${product.photo}`} alt={`${product.name} Image`}/>
                            <button>Add To Cart</button>
                        </div>
                        <div className="shown-info">
                            <h5>{product.name}</h5>
                            <p id="price">{product.price}<sup>00</sup> Lv.</p>
                        </div>
                    </div>
                    </Link>
                    )}
                
                </main>
            </section>

        </div>
    );
}