export function handleIncrement(productName, productPrice, quantities, setTotalSum, setQuantities) {
    if (quantities[productName] + 1 <= 9 || quantities[productName] === undefined) {
        setTotalSum((previousSum) => previousSum + productPrice);    
    }

    setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productName]: Math.min((prevQuantities[productName] || 1) + 1, 9),
      }));
};


export function handleDecrement(productName, productPrice, quantities, setTotalSum, setQuantities) {
    if (quantities[productName] - 1 >= 1) {
        setTotalSum((previousSum) => previousSum - productPrice);
    }
    setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productName]: Math.max((prevQuantities[productName] || 1) - 1, 1),
    }));
};