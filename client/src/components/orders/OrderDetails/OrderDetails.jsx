import { useState } from "react";
import "./orderDetails.css";
import { useEffect } from "react";
import { getUserId } from "../../../utils/getUserId";
import { useContext } from "react";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { Link, useParams } from "react-router-dom";


export function OrderDetails() {
    const {user} = useContext(AuthenticationContext);
    const {errorToastMessage, navigate} = useContext(GlobalContext);
    const [orderData, setOrderData] = useState({});
    const [userId, setUserId] = useState("");
    const {orderId} = useParams();
    
    useEffect(() => {
        async function fetchOrderData(userId) {
            try {
                var response = await fetch(`http://localhost:5000/users/orders/${orderId}`, {
                    method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({userId})});
                
                if (!response.ok) {
                    const errorData = await response.json();
            
                    errorToastMessage(errorData.error);

                    return navigate("/404");
                }

            } catch {
                return navigate("/404");
            }
            const {data} = await response.json();
            console.log(data);
            setOrderData(data);
        }

        getUserId(user, setUserId, errorToastMessage, navigate, fetchOrderData);
    }, []);
    return (
        <main className="main-order-details">
        
            <div className="shopping-cart">
                
                <table className="order-details-table">
                    <h1>Order Details</h1>
                    <tr>
                        <td>Order Date</td>
                        <td>{orderData.orderDetails ? orderData.orderDetails.orderDate : ""}</td>
                    </tr>
                    <tr>
                        <td>Order №</td>
                        <td>{orderData.orderDetails ? orderData.orderDetails.orderId : ""}</td>
                    </tr>
                    <tr>
                        <td>Number of Products</td>
                        <td>{orderData.orderDetails ? orderData.orderDetails.products.length : ""}</td>
                    </tr>
                    <tr>
                        <td>Total Sum</td>
                        <td>{orderData.orderDetails ? orderData.orderDetails.totalPrice : ""}<sup>00</sup> BGN</td>
                    </tr>
                </table>

                <table className="order-details-table-2">
                    <h1>Address Details</h1>
                    <tr>
                        <td>Country</td>
                        <td>{orderData.shippingDetails ? orderData.shippingDetails.country : ""}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{orderData.shippingDetails ? orderData.shippingDetails.city : ""}</td>
                    </tr>
                    <tr>
                        <td>Neighbourhood</td>
                        <td>{orderData.shippingDetails ? orderData.shippingDetails.neighbourhood : ""}</td>
                    </tr>
                    <tr>
                        <td>Street</td>
                        <td>{orderData.shippingDetails ? orderData.shippingDetails.street : ""}</td>
                    </tr>
                    <tr>
                        <td>Number</td>
                        <td>{orderData.shippingDetails ? orderData.shippingDetails.number : ""}</td>
                    </tr>
                    <tr>
                        <td>Apartment</td>
                        <td>{orderData.shippingDetails ? orderData.shippingDetails.apartment : ""}</td>
                    </tr>
                </table>

                <table id="order-details-table-3">
                    <h1 id="product-details-h1">Products Details</h1>
                    <tr id="transparent-background">
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    {orderData.orderDetails ? orderData.orderDetails.products.map((product) => (
                        <tr onClick={() => typeof product.productId === 'string' ? navigate(`/products/${product.productId}`) : navigate("/memberships")}>
                            <td><img src={`data:image/jpeg;base64,${product.photo}`} alt={`${product.name.replace("Under18", 'Under 18')} Image`}/></td>
                            <td>{product.name.replace("Under18", 'Under 18')}</td>
                            <td>{product.price}<sup>00</sup> BGN</td>
                            <td>{product.productQuantity}</td>
                        </tr>
                    )) : ""}
    
                </table>
                
                <h3>Total Sum: {orderData.orderDetails ? orderData.orderDetails.totalPrice : ""}<sup>00</sup> BGN</h3>
            </div>

        </main>
    );
}