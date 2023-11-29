const Product = require("../../schemas/productSchema");


async function deleteProductHandler(req, res) {
    const productId =req.params.productId;

    try {
        var product = await Product.deleteOne({_id: productId});

    } catch {
        return res.status(500).json({ error: 'An Error occured while the Product was being deleted from the Database!' });
    }

    return res.status(200).json({message: 'Product deleted successfully!'});
}


module.exports = deleteProductHandler;