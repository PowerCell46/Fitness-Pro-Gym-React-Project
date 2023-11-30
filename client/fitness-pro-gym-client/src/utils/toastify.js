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


export const errorToastMessage = (ErrMessage) => toast.error(`${ErrMessage} 😓`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});


export const productSuccessfullyRemoved = () => toast.success('📦 Product removed from the Cart! 🤠', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});


export const successfullOrder = () => toast.success('💪 Order successfully made! 😎', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

export const productSuccessfullyDeleted = () => toast.success('📦 Product successfully Deleted! 🥺', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

export const highlightSuccessfullyDeleted = () => toast.success('📷 Highlight successfully Deleted! 🤗', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

export const highlightSuccessfullyEdited = () => toast.success('📷 Highlight successfully Edited! 😎', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

export const productSuccessfullyEdited = () => toast.success('Product successfully Edited! 💪', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

export const profileImageSuccessfullyChanged = () => toast.success('Profile Picture successfully changed! 🙌', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});