const Product = require("../../schemas/productSchema");
const User = require("../../schemas/userSchema");
const {validateImageExtension, validateProductName, validateProductType, validateProductDescription, validateProductPrice} = require("../../utilities/validators");


async function editProductHandler(req, res) {
    const image = req.file;
    const { name, productType, description, price, userId } = req.body;
    const productId = req.params.productId;

    try {
        var user = await User.findOne({_id: userId});

        if (user === null) {
            return res.status(500).json({ error: 'No such user found!' });
        }

        if (!user.isAdministrator) {
            return res.status(400).json({error: "You cannot edit this Product!"});
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error - Searching for the user' }); 
    }

    const validName = validateProductName(name);
    if (validName !== true) {
        return res.status(400).json({ error: 'Product Name is not valid!' });
    }

    const validProductType = validateProductType(productType);
    if (validProductType !== true) {
        return res.status(400).json({ error: 'Product Type is not valid!' });
    }

    const validDescription = validateProductDescription(description);
    if (validDescription !== true) {
        return res.status(400).json({ error: 'Product Description is not valid!' });
    }

    const validPrice = validateProductPrice(price);
    if (validPrice !== true) {
        return res.status(400).json({ error: 'Product Price is not valid!' });
    }


    if (image === undefined) { // only the description was changed
        
        try {
            const updatedProduct = await Product.findOneAndUpdate(
                 { _id: productId },
                 {
                    name,
                    type: productType,
                    description,
                    price,
                 },
                 { new: true }
             );
 
        } catch {
            return res.status(500).json({ error: 'Internal Server Error - Updating the user' }); 
        }
 
     } else { // Image was being changed
         const image = req.file;
         
         const validImage = validateImageExtension(image);
 
         if (!validImage) {
            return res.status(400).json({ error: 'Product Image is not of valid type!' });
         }
 
         try {
             await Product.findOneAndUpdate(
                 { _id: productId },
                 { 
                    imageLocation: image.path, 
                    name,
                    type: productType,
                    description: description,
                    price
                 },
                 { new: true }
               );
             
         } catch {
            return res.status(500).json({ error: 'Internal Server Error - Updating the user' }); 
         }
     }
 
    res.status(200).json({ message: 'File updated successfully!' });
}


module.exports = editProductHandler;