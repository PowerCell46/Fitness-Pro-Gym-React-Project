import { useEffect, useState, useContext, React } from 'react';
import './productDescription.css';
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import { Link, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DeleteProduct } from '../DeleteProduct/DeleteProduct';
import { ProductContext } from "../../../contexts/ProductContext";
import { addProductToCart } from '../ProductsGallery/addProductToCart';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { getUserId } from '../../../utils/getUserId';


export function ProductDescription() {
    const [userId, setUserId] = useState("");
    const {user, setNumberOfCartProducts, isAdministrator} = useContext(AuthenticationContext);
    const {navigate, errorToastMessage} = useContext(GlobalContext);
    const [productData, setProductData] = useState({});
    const {productId} = useParams();
    const [deleteProductComponentShown, setDeleteProductComponent] = useState(false);

    useEffect(() => {
        async function fetchProductData() {
            try {
                var response = await fetch(`http://localhost:5000/products/${productId}`);
    
                if (!response.ok) {
                    const errorData = await response.json();
            
                    errorToastMessage(errorData.error);

                    return navigate("/404");
                }

            } catch {
                return navigate("/404");
            }       
            
            let data = await response.json();
            
            setProductData(data);
        }

        if (user) {
            getUserId(user ,setUserId, errorToastMessage, navigate);
        }
        fetchProductData();
    }, []);

    return (
        <main className='product-description-main' >
            <ProductContext.Provider value={{setDeleteProductComponent, productId}}>
                {deleteProductComponentShown ? <DeleteProduct/> : ""}
            </ProductContext.Provider>
            <img src={`data:image/jpeg;base64,${productData.photo}`} alt={`${productData.name} Image`}/>

            <aside>
                <h2>{productData.name}</h2>
                <h3>{productData.price}.<sup>00</sup> BGN</h3>
                <p>{productData.description}</p>
                <div>
                    {isAdministrator ? // Only the Administrator has access to EDIT
                        <Link to={`/products/edit/${productId}`}><button>EDIT</button></Link> : ""}
                  
                    {userId ? <button id='add-to-cart-btn' onClick={(e) => addProductToCart(e, productId, userId, navigate, setNumberOfCartProducts)}>ADD TO CART</button> : ""}
                  
                    {isAdministrator ? // Only the Administrator has access to DELETE 
                        <button onClick={() => setDeleteProductComponent(true)}>DELETE</button> : "" }
                </div>
            </aside>
            <ToastContainer />
        </main>
    );
}