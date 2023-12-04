import { successfullOrder, errorToastMessage } from "../../utils/toastify";


export async function postOrderHandler(e, checkoutData, quantities, userId, totalSum, navigate) {
    e.preventDefault();
    const {country, city, neighbourhood, street, number, apartment} = (Object.fromEntries(new FormData(e.target)));

    if (country.length === 0) {
        document.querySelector("#checkout-country").style.border = '5px solid #339933';
   
    } else {
        document.querySelector("#checkout-country").style.border = 'none';
    }

    if (city.length === 0) {
        document.querySelector("#checkout-city").style.border = '5px solid #339933';
    
    } else {
        document.querySelector("#checkout-city").style.border = 'none';
    }

    if (neighbourhood.length === 0) {
        document.querySelector("#checkout-neighbourhood").style.border = '5px solid #339933';
   
    } else {
        document.querySelector("#checkout-neighbourhood").style.border = 'none';
    }

    if (street.length === 0) {
        document.querySelector("#checkout-street").style.border = '5px solid #339933';
   
    } else {
        document.querySelector("#checkout-street").style.border = 'none';
    }

    if (Number(number) <= 0 || number === '') {
        document.querySelector("#checkout-number").style.border = '5px solid #339933';
   
    } else {
        document.querySelector("#checkout-number").style.border = 'none';
    }

    if (Number(apartment) < 0 || apartment === "") {
        document.querySelector("#checkout-apartment").style.border = '5px solid #339933';
   
    } else {
        document.querySelector("#checkout-apartment").style.border = 'none';
    }


    if (country.length === 0 || city.length === 0 || neighbourhood.length === 0 || street.length === 0 || Number(number) <= 0 || Number(apartment) < 0 || apartment === "" || number === "") {
        return;
    }
    
    // Making the request with non-empty data fields
    let orderProductsDetails = {
        products: [], 
        totalPrice: totalSum, 
        orderDate: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`, 
        orderId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    };
    
    for (let product of checkoutData) {
        const name = product._doc ? product._doc.name : product.name;
        const productQuantity = quantities[name] || 1;

        const productId = product._doc ? product._doc._id :
            {membershipType: product.name.substring(0, product.name.lastIndexOf(" ")), 
            membershipCategory: product.name.substring(product.name.lastIndexOf(" ") + 1).toLowerCase()}
        
        orderProductsDetails.products.push({name, productQuantity, productId});
    }

    try {
        var response = await fetch("http://localhost:5000/checkout/finishOrder", 
        {method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({userId, orderDetails: orderProductsDetails, 
            shippingDetails: {country, city, neighbourhood, street, number, apartment}
        })});

        if (response.status === 200) {
            navigate("/myProfile"); 
       
            return successfullOrder();
            
        } else {
            const errorData = await response.json();
        
            errorToastMessage(errorData.error);

            return navigate("/404");
        }
   
    } catch {
        return navigate("/404");
    }
}