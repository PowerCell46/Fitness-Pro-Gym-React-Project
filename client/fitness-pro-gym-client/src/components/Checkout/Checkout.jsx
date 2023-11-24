import { useEffect, useState } from 'react';
import './checkout.css';
import { useContext } from 'react';
import { AuthenticationContext } from "../../contexts/AuthenticationContext";


export function Checkout() {
    const {navigate} = useContext(AuthenticationContext);
    const userId = JSON.parse(localStorage.getItem("authenticationTokenAndData")).id;
    const [checkoutData, setCheckoutData] = useState([]);

    useEffect(() => {
        async function fetchCheckoutData() {
            try {
                var response = await fetch("http://localhost:5000/checkout", {
                    method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({userId})   });

            } catch {
                // Do smth
            }

            if (!response.ok) {
                console.log(response);
                // navigate
            }

            const data = await response.json();
            console.log(data[2]._doc._id);
            setCheckoutData(data);
        }

        fetchCheckoutData();
    }, []);
    return (
    <main className="checkout-main">
        <section>
            <div className="shopping-cart">
                <h1>Shopping Cart</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Removal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkoutData.map((product) => (
                            <tr key={product._doc ? product._doc._id : product._id}>
                               
                                <td onClick={() => product._doc ? navigate(`/products/${product._doc._id}`)  : navigate("/memberships")}>
                                    <img src={`data:image/jpeg;base64,${product.photo}`} alt={`${product.name} Image`}/>
                                </td>
                              
                                <td onClick={() => product._doc ? navigate(`/products/${product._doc._id}`)  : navigate("/memberships")}>
                                    {product._doc ? product._doc.name : product.name}
                                </td>
                             
                                <td onClick={() => product._doc ? navigate(`/products/${product._doc._id}`)  : navigate("/memberships")}>
                                    {product._doc ? product._doc.price : product.price} BGN
                                </td>
                            
                                <td>
                                    Remove
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Total Sum: 254.32$</h3>
            </div>

            <div className="details">
                <h1>Shipping Details</h1>
                <form method="POST">
                    <div>
                    <label htmlFor="country">Country:</label>
                    <input type="text" name="country" id="" placeholder="Bulgaria"/>
                    </div>

                    <div>
                    <label htmlFor="city">City:</label>
                    <input type="text" name="city" id="" placeholder="Sofia"/>
                    </div>

                        {/* <div>
                    <label htmlFor="postcode">PostCode:</label>
                    <input type="text" name="postcode" id="" placeholder="1404"/>
                    </div>  */}

                    <div>
                    <label htmlFor="neighbourhood">Neighbourhood:</label>
                    <input type="text" name="neighbourhood" placeholder="Gotse Delchev"/>
                    </div>

                    <div>
                    <label htmlFor="street">Street:</label>
                    <input type="text" name="street" placeholder="Nishava"/>
                    </div>

                    <div>
                    <label htmlFor="number">Number:</label>
                    <input type="text" name="number" placeholder="23"/>
                    </div>
                    
                    <div>
                    <label htmlFor="apartment">Apartment:</label>
                    <input type="text" name="apartment" placeholder="7"/>
                    </div>

                    <button>Order</button>
                </form>
            </div>
        </section>
    </main>

    );
}