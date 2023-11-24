import { useEffect, useState } from 'react';
import './checkout.css';
import { useContext } from 'react';
import { AuthenticationContext } from "../../contexts/AuthenticationContext";


export function Checkout() {
    const {navigate} = useContext(AuthenticationContext);
    const userId = JSON.parse(localStorage.getItem("authenticationTokenAndData")).id;
    const [checkoutData, setCheckoutData] = useState([]);
    const [totalSum, setTotalSum] = useState(0);

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
            console.log(data);
            setTotalSum(getTotalPrice(data));
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
                            <th>Quantity</th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Removal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkoutData.map((product) => (
                            <tr key={product._doc ? product._doc._id : product._id}>
                                <td> 
                                    <button>+</button>
                                            1 {/* Make it Work */}
                                    <button>-</button>
                                </td>
                                <td onClick={() => product._doc ? navigate(`/products/${product._doc._id}`)  : navigate("/memberships")}>
                                    <img src={`data:image/jpeg;base64,${product.photo}`} alt={`${product.name} Image`}/>
                                </td>
                              
                                <td onClick={() => product._doc ? navigate(`/products/${product._doc._id}`)  : navigate("/memberships")}>
                                    {product._doc ? product._doc.name : product.name}
                                </td>
                             
                                <td onClick={() => product._doc ? navigate(`/products/${product._doc._id}`)  : navigate("/memberships")}>
                                    {product._doc ? product._doc.price : product.price} BGN
                                </td>
                            
                                <td onClick={() => removeProductFromCartHandler(
                                    product._doc ? product._doc._id :
                                        {membershipType: product.name.substring(0, product.name.lastIndexOf(" ")), 
                                        membershipCategory: product.name.substring(product.name.lastIndexOf(" ") + 1).toLowerCase()},
                                    product)}>
                                    Remove
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Total Sum: {totalSum}<sup>00</sup> BGN</h3>
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

    async function removeProductFromCartHandler(removedProductId, productForRemoval) {
        const userId = JSON.parse(localStorage.getItem("authenticationTokenAndData")).id;
        console.log(removedProductId);
        try {
            const response = await fetch(`http://localhost:5000/checkout/removeProduct`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({userId, removedProductId}),
            });
    
            if (response.status === 200) {
                setCheckoutData((previousData) =>
                    previousData.filter((data) => (data !== productForRemoval))
                );
    
                // Use the callback form of setTotalSum to ensure you're working with the updated state
                setTotalSum((previousTotalSum) => previousTotalSum - getProductPrice(removedProductId));
            } else {
                navigate("/404");
            }
        } catch {
            navigate("/404");
        }
    }
    
    function getProductPrice(productId) {
        const product = checkoutData.find((data) => (data._doc ? data._doc._id === productId : data._id === productId));
        return product ? (product._doc ? product._doc.price : product.price) : 0;
    }

    function getTotalPrice(products) {
        let totalPrice = 0;
        for (let product of products) {
            totalPrice += product._doc ? product._doc.price : product.price;
        }
        console.log(totalPrice);
        return totalPrice;
    }
}