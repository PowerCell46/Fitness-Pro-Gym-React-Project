function mailContentHandler(orderDetails, shippingDetails, user) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Details</title>
            <style>
            body {
                font-family: Georgia, 'Times New Roman', Times, serif;
                text-align: center;
            }
            .main-order-details {
                width: 100%;
                max-width: 600px; 
                margin: 0 auto; 
            }
            .shopping-cart {
                text-align: left;
            }
            table {
                margin: 20px auto;
                border-collapse: collapse;
                width: 100%;
            }
            th, td {
                padding: 10px;
                text-align: center;
                border: 1px solid #ddd;
                font-size: 15px;
            }
            th {
                background-color: #f2f2f2;
            }
            h1 {
                font-family: 'Your Cool Font', sans-serif;
                text-align: center; 
                border: none;
                margin-left: auto;
                margin-right: auto;
                text-align: center;
            }
            #transparent-background {
                background-color: transparent;
            }
        </style>
        </head>
        <body>
            <main className="main-order-details">
            
            <div className="shopping-cart">
            ${user !== '' ? `<p style="font-size: 15px">Hello, <strong>${user.username}</strong>,<br>
            Your order <strong>№ ${orderDetails.orderId}</strong> was registered successfully!<br>
            Here you can see all the details. If you see any Error, please contact us at <strong>0700 20 696</strong>.<br>
            The Team behind Fitness Pro Gym wishes you a happy day! ☺</p>` : ""
            }
            <h1 style="text-align: center">Order Details</h1>
                <table className="order-details-table">
                    <tr>
                        <td>Order Date</td>
                        <td>${orderDetails.orderDate}</td>
                    </tr>
                    <tr>
                        <td>Order №</td>
                        <td>${orderDetails.orderId}</td>
                    </tr>
                    <tr>
                        <td>Number of Products</td>
                        <td>${orderDetails.products.length}</td>
                    </tr>
                    <tr>
                        <td>Total Sum</td>
                        <td>${orderDetails.totalPrice}<sup>00</sup> BGN</td>
                    </tr>
                </table>

            <h1 style="text-align: center">Address Details</h1>
                <table className="order-details-table-2">
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

            <h1 style="text-align: center" id="product-details-h1">Products Details</h1>
                <table id="order-details-table-3">
                    <tr id="transparent-background">
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    ${orderDetails.products.map((product) => (
                        `<tr>
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