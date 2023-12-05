export function setMembershipValidity(data) {
    const today = new Date();
    let membershipValidity = false;
    
    for (let order of data) {
        const [day, month, year] = order.orderDetails.orderDate.split(".");
        const orderDate = new Date(year, month -1, day);

        for (let product of order.orderDetails.products) {
            if (product.name.includes("Workout") || product.name.includes("Membership")) {
                const endOfMembership = new Date(orderDate);

                if (product.name.includes("Year")) {
                    endOfMembership.setFullYear(endOfMembership.getFullYear() + product.productQuantity);
                
                } else if (product.name.includes("Six Months")) {
                    endOfMembership.setMonth(endOfMembership.getMonth() + (6 * product.productQuantity));

                } else if (product.name.includes("Three Months")) {
                    endOfMembership.setMonth(endOfMembership.getMonth() + (3 * product.productQuantity));

                } else if (product.name.includes("Monthly")) {
                    endOfMembership.setMonth(endOfMembership.getMonth() + product.productQuantity);

                } else if (product.name.includes("Weekly")) {       
                    endOfMembership.setDate(endOfMembership.getDate() + (7 * product.productQuantity));  

                } else if (product.name.includes("Single")) {
                    endOfMembership.setDate(endOfMembership.getDate() + product.productQuantity);

                }

                if (today <= endOfMembership) {
                    membershipValidity = true;
                    break;
                }
            }
        }
    }   

    if (membershipValidity) {
        var qr = new QRious({
            value: `https://thumbs.dreamstime.com/b/vector-valid-grunge-stamp-seal-tick-inside-green-valid-watermark-grunge-texture-round-rubber-stamp-imprint-valid-139450873.jpg`
        });
        document.querySelector("#qr-code").src = qr.toDataURL();
        return true;
        
    } else {
        var qr = new QRious({
            value: `https://ipwatchdog.com/wp-content/uploads/2018/05/invalid-stamp.jpg`
        });
        document.querySelector("#qr-code").src = qr.toDataURL();
        return false;
    }
}