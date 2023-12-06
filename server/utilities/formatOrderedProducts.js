function formatOrderedProducts(orderDetails) {
    return orderDetails.products.map(product => {
     
        if (product.productId.membershipType) {
        return `<li>Membership: ${product.productId.membershipType} (${product.productId.membershipCategory}) -> Quantity: ${product.productQuantity}</li>`;
     
    } else {
        return `<li>Product: ${product.name} -> Quantity: ${product.productQuantity}</li>`;
      }
    }).join('\n');
}


function mailContentHandler(orderDetails, shippingDetails) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Details</title>
            <style>
            .main-order-details {
                width: 100vw;
                height: 100%;
                margin: 12.5vh auto 0;
                margin-left: -0.4vw;
                padding-top: 5vh;
                padding-bottom: 5vh;
                display: flex;
                justify-content: center;
                background: url("https://i.pinimg.com/originals/03/d8/43/03d84326a3c2f94a188ac8ac81bd4a53.jpg");
            }
            
            
            .main-order-details .shopping-cart, .main-order-details .details {
                width: 80vw;
            }
            
            
            .main-order-details .shopping-cart {
                height: 100%;
                background-color: #124b8b;
                display: flex;
                flex-direction: column;
                align-items: center;
                color: whitesmoke;
                border-radius:  0.7rem;
                margin-bottom: 5vh;
            }
            
            
            .main-order-details h1 {
                font-size: 3rem;
                font-family: 'Permanent Marker', cursive;
                letter-spacing: 0.4rem;
                text-shadow: 5px 0px 7px rgba(0,0,0,0.68);
                margin-bottom: 2vh;
                position: relative;
                left: 45%;
            }
            
            
            .main-order-details .shopping-cart table {
                margin-top: 2vh;
                border-collapse: separate;
                border-spacing: 20px;
                width: 90%;
            }
            
            
            .main-order-details .shopping-cart tr {
                background-color: var(--dark-blue);
            }
            
            .main-order-details .shopping-cart tr {
                transition: 600ms ease-in-out;
            }
            
            .main-order-details .shopping-cart tr:hover {
                cursor: pointer;
                background-color: hsl(20, 95%, 65%);
                transform: translateY(-0.4rem);
            }
            
            .main-order-details .shopping-cart table th {
                padding: 0.5rem;
            }
            
            .main-order-details .shopping-cart table th, 
            .main-order-details .shopping-cart table td {
                border-radius: 0.5rem;
                font-size: 1.3rem;
                font-family: 'Salsa', cursive;
                font-weight: 100;
                letter-spacing: 0.07rem;
                text-shadow: 5px 0px 7px rgba(0,0,0,0.68);
                text-align: center;
                vertical-align: middle;
            }
            
            
            .main-order-details .shopping-cart table th {
                font-weight: 900;
            }
            
            
            .main-order-details .shopping-cart table td img {
                width: 5vw;
                margin: 0 auto;
                border-radius: 0.3rem;
                margin-top: 0.3em;
            }
            
            .main-order-details .shopping-cart h3 {
                margin-top: 4vh;
                font-family: 'Salsa', cursive;
                letter-spacing: 0.07rem;
                text-shadow: 5px 0px 7px rgba(0,0,0,0.68);
                font-size: 1.5rem;
                transition: 600ms ease-in-out;
                animation:  pulse 4s infinite ease-in-out alternate;
                padding-bottom: 4vh;
            }
            
            
            .main-order-details .order-details-container h1 {
                text-align: center;
            }
            
            
            .main-order-details .order-details-container {
                display: flex; 
                flex-direction: column;
                margin-bottom: 10px;
            }
            
            
            .main-order-details .order-details-inner-container {
                display: flex;
                flex-direction: row;
                gap: 2vw;
                font-size: 1.3rem;
                border-radius: 0.5rem;
                font-family: 'Salsa', cursive;
                font-weight: 100;
                letter-spacing: 0.07rem;
                text-shadow: 5px 0px 7px rgba(0,0,0,0.68);
            }
            
            
            .main-order-details .order-details-table td, main .order-details-table-2 td {
                padding: 1rem;
            }
            
            .main-order-details table:not(:last-child) {
                margin-bottom: 5vh;
            }
            
            .main-order-details #product-details-h1 {
                font-size: 2.76rem;
                margin-bottom: 2vh;
                left: 70%;
            }
            
            #transparent-background{
                background-color:transparent;
                cursor:auto
            }
            
            #transparent-background:hover {
                transform: translateY(0);
            }
            
            #product-link {
                text-decoration: none;
                color: inherit;
            }
            
            
            @media screen and (min-width: 2501px) { 
                .main-order-details .shopping-cart, .main-order-details .details {
                    width: 70vw;
                }
            }
            </style>
        </head>
        <body>
            <main className="main-order-details">
            
            <div className="shopping-cart">
                
                <table className="order-details-table">
                    <h1>Order Details</h1>
                    <tr>
                        <td>Order Date</td>
                        <td>${orderDetails.orderDate}</td>
                    </tr>
                    <tr>
                        <td>Order №</td>
                        <td>${orderDetails.orderId}</td>
                    </tr>
                    <tr>
                        <td>Number of Produts</td>
                        <td>${orderDetails.products.length}</td>
                    </tr>
                    <tr>
                        <td>Total Sum</td>
                        <td>${orderDetails.totalPrice}<sup>00</sup> BGN</td>
                    </tr>
                </table>

                <table className="order-details-table-2">
                    <h1>Address Details</h1>
                    <tr>
                        <td>Country</td>
                        <td>${shippingDetails.country}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>${shippingDetails.city}</td>
                    </tr>
                    <tr>
                        <td>Neighbourhood</td>
                        <td>${shippingDetails.neighbourhood}</td>
                    </tr>
                    <tr>
                        <td>Street</td>
                        <td>${shippingDetails.street}</td>
                    </tr>
                    <tr>
                        <td>Number</td>
                        <td>${shippingDetails.number}</td>
                    </tr>
                    <tr>
                        <td>Apartment</td>
                        <td>${shippingDetails.apartment}</td>
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
                ${orderDetails.products.map((product) => (
                    `<tr>
                        <td><img src='data:image/jpeg,${product.photo}' alt='${product.name.replace("Under18", 'Under 18')} Image'/></td>
                        <td>${product.name.replace("Under18", 'Under 18')}</td>
                        <td>${product.price}<sup>00</sup> BGN</td>
                        <td>${product.productQuantity}</td>
                    </tr>`
                ))}

            </table>

            </div>

            </main>
        </body>
        </html>
    `
}


module.exports = mailContentHandler;