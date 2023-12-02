import { useEffect, useState } from 'react';
import './checkout.css';
import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleIncrement,handleDecrement } from './handleIncrementDecrement';
import { removeProductFromCartHandler } from './removeProductFromCartHandler';
import { postOrderHandler } from './postOrderHandler';
import { GlobalContext } from '../../contexts/GlobalContext';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';


export function Checkout() {
    const {setNumberOfCartProducts} = useContext(AuthenticationContext);
    const {navigate, errorToastMessage} = useContext(GlobalContext);
    const userId = JSON.parse(localStorage.getItem("authenticationTokenAndData")).id;
    const [checkoutData, setCheckoutData] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        async function fetchCheckoutData() {
            try {
                var response = await fetch("http://localhost:5000/checkout", {
                    method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({userId})});
                
                if (!response.ok) {
                    const errorData = await response.json();
            
                    errorToastMessage(errorData.error);

                    return navigate("/404");
                }

            } catch {
                return navigate("/404");
            }

            const data = await response.json();

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
                            <tr key={product._doc ? product._doc.name : product.name}>
                                <td id='quantity-td'>
    <button onClick={() => handleDecrement(product._doc ? product._doc.name : product.name, product._doc ? product._doc.price : product.price, quantities, setTotalSum, setQuantities, setNumberOfCartProducts)}>-</button>
    {quantities[product._doc ? product._doc.name : product.name] || 1}
    <button id='plus-quantity' onClick={() => handleIncrement(product._doc ? product._doc.name : product.name, product._doc ? product._doc.price : product.price, quantities, setTotalSum, setQuantities, setNumberOfCartProducts)}>+</button>
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
                            
                                <td 
    onMouseEnter={(e) => e.target.style.backgroundColor = '#9c3b2b'} 
    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} 
    onClick={() => removeProductFromCartHandler(
    product._doc ? product._doc._id :
        {membershipType: product.name.substring(0, product.name.lastIndexOf(" ")), 
        membershipCategory: product.name.substring(product.name.lastIndexOf(" ") + 1).toLowerCase()},
    product, userId, setCheckoutData, setTotalSum, getProductPrice, navigate, setNumberOfCartProducts)}>Remove
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Total Sum: {totalSum}<sup>00</sup> BGN</h3>
            </div>

            <div className="details">
                <h1>Shipping Details</h1>
                <form onSubmit={(e) => postOrderHandler(e, checkoutData, quantities, userId, totalSum, navigate)}>
                    <div>
                        <label htmlFor="country">Country:</label>
                        <input type="text" name="country" id="checkout-country" placeholder="Bulgaria"/>
                    </div>

                    <div>
                        <label htmlFor="city">City:</label>
                        <input type="text" name="city" id="checkout-city" placeholder="Sofia"/>
                    </div>

                    <div>
                        <label htmlFor="neighbourhood">Neighbourhood:</label>
                        <input type="text" name="neighbourhood" id='checkout-neighbourhood' placeholder="Gotse Delchev"/>
                    </div>

                    <div>
                        <label htmlFor="street">Street:</label>
                        <input type="text" name="street" id='checkout-street' placeholder="Nishava"/>
                    </div>

                    <div>
                        <label htmlFor="number">Number:</label>
                        <input type="number" name="number" id='checkout-number' placeholder="23"/>
                    </div>
                    
                    <div>
                        <label htmlFor="apartment">Apartment:</label>
                        <input type="number" name="apartment" id='checkout-apartment' placeholder="7"/>
                    </div>

                    <button>Order</button>
                </form>
            </div>
        </section>
        <ToastContainer />
    </main>
    );
    
    function getProductPrice(productId, name) {
        const product = checkoutData.find((data) => (data._doc ? data._doc._id === productId : data.name === name));
       
        return product ? (product._doc ? product._doc.price : product.price) : 0;
    }

    function getTotalPrice(products) {
        let totalPrice = 0;
        for (let product of products) {
            totalPrice += product._doc ? product._doc.price : product.price;
        }
        return totalPrice;
    }
}