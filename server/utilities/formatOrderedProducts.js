export function formatOrderedProducts(orderDetails) {
    return orderDetails.products.map(product => {
      if (product.productId.membershipType) {
        return `<li>Membership: ${product.productId.membershipType} (${product.productId.membershipCategory}) -> Quantity: ${product.productQuantity}</li>`;
      } else {
        return `<li>Product: ${product.name} -> Quantity: ${product.productQuantity}</li>`;
      }
    }).join('\n');
}