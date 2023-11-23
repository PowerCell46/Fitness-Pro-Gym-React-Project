import './checkout.css';

export function Checkout() {
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
                        <tr id='product-data'>
                            <td><img src="./images/profile_picture.jpg" alt=""/></td>
                            <td>Whey Protein</td>
                            <td>75.23$</td>
                            <td>Remove</td>
                        </tr>
                        <tr>
                            <td><img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/></td>
                            <td>Whey Protein</td>
                            <td>75.23$</td>
                            <td>Remove</td>
                        </tr>
                        <tr>
                            <td><img src="./images/profile_picture.jpg" alt=""/></td>
                            <td>Whey Protein</td>
                            <td>75.23$</td>
                            <td>Remove</td>
                        </tr>
                        <tr>
                            <td><img src="https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Vanilla_Front.png?v=1683210424&width=700" alt=""/></td>
                            <td>Whey Protein</td>
                            <td>75.23$</td>
                            <td>Remove</td>
                        </tr>
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

                    {/* <!-- <div>
                    <label htmlFor="postcode">PostCode:</label>
                    <input type="text" name="postcode" id="" placeholder="1404">
                    </div> --> */}

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