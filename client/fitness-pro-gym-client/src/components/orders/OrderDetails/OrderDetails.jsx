import { useState } from "react";
import "./orderDetails.css";
import { useEffect } from "react";
import { getUserId } from "../../../utils/getUserId";
import { useContext } from "react";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { useParams } from "react-router-dom";


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
            const data = await response.json();
            console.log(data);
        }

        getUserId(user, setUserId, errorToastMessage, navigate, fetchOrderData);
    })
    return (
        <main className="main-order-details">
        
            <div className="shopping-cart">
                
                <table className="order-details-table">
                    <h1>Order Details</h1>
                    <tr>
                        <td>Order Date</td>
                        <td>19.01.2023</td>
                    </tr>
                    <tr>
                        <td>Order №</td>
                        <td>7052713</td>
                    </tr>
                    <tr>
                        <td>Number of Produts</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>Total Sum</td>
                        <td>69.<sup>00</sup> BGN</td>
                    </tr>
                </table>

                <table className="order-details-table-2">
                    <h1>Address Details</h1>
                    <tr>
                        <td>Country</td>
                        <td>Bulgaria</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>Sofia</td>
                    </tr>
                    <tr>
                        <td>Neighbourhood</td>
                        <td>Gotse Delchev</td>
                    </tr>
                    <tr>
                        <td>Street</td>
                        <td>Bademova Gora</td>
                    </tr>
                    <tr>
                        <td>Number</td>
                        <td>69</td>
                    </tr>
                    <tr>
                        <td>Apartment</td>
                        <td>18</td>
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
                    <tr>
                        <td><img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/></td>
                        <td>Whey Protein</td>
                        <td>75.23$</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td><img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/></td>
                        <td>Whey Protein</td>
                        <td>75.23$</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td><img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/></td>
                        <td>Whey Protein</td>
                        <td>75.23$</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td><img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/></td>
                        <td>Whey Protein</td>
                        <td>75.23$</td>
                        <td>1</td>
                    </tr>
                </table>
                <h3>Total Sum: 254.32$</h3>
            </div>

        </main>
    );
}