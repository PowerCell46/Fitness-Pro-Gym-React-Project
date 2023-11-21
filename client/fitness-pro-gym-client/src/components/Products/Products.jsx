import { useEffect, useState } from "react";
import "./products.css";

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
        </div>
        <section>
        <main>

            <div className="product-container">
                <div className="image-container">
                    <img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/>
                    <button>Add To Cart</button>
                </div>
                <div className="shown-info">
                    <h5>Combat Protein Powder word word word word</h5>
                    <p id="price">75.<sup>50</sup> Lv.</p>
                </div>
            </div>
            <div className="product-container">
                <div className="image-container">
                    <img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/>
                    <button>Add To Cart</button>
                </div>
                <div className="shown-info">
                    <h5>Combat Protein Powder word word word word</h5>
                    <p id="price">75.<sup>50</sup> Lv.</p>
                </div>
            </div>
            <div className="product-container">
                <div className="image-container">
                    <img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/>
                    <button>Add To Cart</button>
                </div>
                <div className="shown-info">
                    <h5>Combat Protein Powder word word word word</h5>
                    <p id="price">75.<sup>50</sup> Lv.</p>
                </div>
            </div>
            <div className="product-container">
                <div className="image-container">
                    <img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/>
                    <button>Add To Cart</button>
                </div>
                <div className="shown-info">
                    <h5>Combat Protein Powder word word word word</h5>
                    <p id="price">75.<sup>50</sup> Lv.</p>
                </div>
            </div>
            <div className="product-container">
                <div className="image-container">
                    <img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/>
                    <button>Add To Cart</button>
                </div>
                <div className="shown-info">
                    <h5>Combat Protein Powder word word word word</h5>
                    <p id="price">75.<sup>50</sup> Lv.</p>
                </div>
            </div>
            <div className="product-container">
                <div className="image-container">
                    <img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/>
                    <button>Add To Cart</button>
                </div>
                <div className="shown-info">
                    <h5>Combat Protein Powder word word word word</h5>
                    <p id="price">75.<sup>50</sup> Lv.</p>
                </div>
            </div>
            <div className="product-container">
                <div className="image-container">
                    <img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/>
                    <button>Add To Cart</button>
                </div>
                <div className="shown-info">
                    <h5>Combat Protein Powder word word word word</h5>
                    <p id="price">75.<sup>50</sup> Lv.</p>
                </div>
            </div>
            <div className="product-container">
                <div className="image-container">
                    <img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/>
                    <button>Add To Cart</button>
                </div>
                <div className="shown-info">
                    <h5>Combat Protein Powder word word word word</h5>
                    <p id="price">75.<sup>50</sup> Lv.</p>
                </div>
            </div>
            <div className="product-container">
                <div className="image-container">
                    <img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/>
                    <button>Add To Cart</button>
                </div>
                <div className="shown-info">
                    <h5>Combat Protein Powder word word word word</h5>
                    <p id="price">75.<sup>50</sup> Lv.</p>
                </div>
            </div>
            <div className="product-container">
                <div className="image-container">
                    <img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/>
                    <button>Add To Cart</button>
                </div>
                <div className="shown-info">
                    <h5>Combat Protein Powder word word word word</h5>
                    <p id="price">75.<sup>50</sup> Lv.</p>
                </div>
            </div>
        
        </main>
    </section>
    </div>
    );
}