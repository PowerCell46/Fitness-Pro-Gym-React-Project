const Product = require("../../schemas/productSchema");
const User = require("../../schemas/userSchema");
const {validateImageExtension} = require("../../utilities/validators");

async function editProductHandler(req, res) {
    const image = req.file;
    const { name, productType, description, price, ownerId } = req.body;
    const productId = req.params.productId;

    try {
        var user = await User.findOne({_id: ownerId});

        if (user === null) {
            return res.status(500).json({ error: 'No such user found!' });
        }

    } catch {
        return res.status(500).json({ error: 'Internal Server Error -> (Searching for the user)' }); 
    }


    if (image === undefined) { // only the description was changed
        
        try {
            await Product.findOneAndUpdate(
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
            return res.status(500).json({ error: 'Internal Server Error -> (Updating the user)' }); 
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
             return res.status(500).json({ error: 'Internal Server Error -> (Updating the user)' }); 
         }
     }
 
     res.status(200).json({ message: 'File updated successfully!' });
}


module.exports = editProductHandler;