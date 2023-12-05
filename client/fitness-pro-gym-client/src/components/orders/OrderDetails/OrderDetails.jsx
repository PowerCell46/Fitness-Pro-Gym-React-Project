import "./orderDetails.css";


export function OrderDetails() {
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

                <table>
                    <h1 id="product-details-h1">Products Details</h1>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <td><img src="./images/profile_picture.jpg" alt=""/></td>
                        <td>Whey Protein</td>
                        <td>75.23$</td>
                    </tr>
                    <tr>
                        <td><img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/></td>
                        <td>Whey Protein</td>
                        <td>75.23$</td>
                    </tr>
                    <tr>
                        <td><img src="./images/profile_picture.jpg" alt=""/></td>
                        <td>Whey Protein</td>
                        <td>75.23$</td>
                    </tr>
                    <tr>
                        <td><img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/></td>
                        <td>Whey Protein</td>
                        <td>75.23$</td>
                    </tr>
                </table>
                <h3>Total Sum: 254.32$</h3>
            </div>

        </main>
    );
}