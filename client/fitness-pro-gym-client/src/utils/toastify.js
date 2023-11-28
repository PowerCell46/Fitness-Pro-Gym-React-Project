import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const productSuccessfullyAdded = () => toast.success('📦 Product Added to Cart! 🎉', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

export const productAlreadyAddedToCart = () => toast.warn('📦 Product Already Added to Cart! ❌', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });