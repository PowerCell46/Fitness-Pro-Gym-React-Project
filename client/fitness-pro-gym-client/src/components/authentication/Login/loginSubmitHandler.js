import { validateEmail, validatePassword } from "../../../utils/validators";


export async function loginSubmitHandler(e, setProfilePhoto, setUser, navigate, errorToastMessage) {

    e.preventDefault();
 
    const {email, password} = (Object.fromEntries(new FormData(e.target)));
    
    const emailValidation = validateEmail(email);
    if (emailValidation !== true) {
        document.querySelector("#login-email-err-p").textContent = emailValidation;
        document.querySelector("#login-email-err-p").style.display = 'inline';
        document.querySelector("#login-email").classList.add("err-input-field");
    
    } else {
        document.querySelector("#login-email-err-p").style.display = 'none';
        document.querySelector("#login-email").classList.remove("err-input-field");
    }
    
    const passwordValidation = validatePassword(password);
    
    if (passwordValidation !== true) {
        document.querySelector("#login-password-err-p").textContent = passwordValidation;
        document.querySelector("#login-password-err-p").style.display = 'inline';
        document.querySelector("#login-password").classList.add("err-input-field");
    
    } else {
        document.querySelector("#login-password-err-p").style.display = 'none';
        document.querySelector("#login-password").classList.remove("err-input-field");
    }

    if (emailValidation !== true || passwordValidation !== true) {
        return;
    }
    
    // Making the request with valid parameters
    try {

        let serverResponse = await fetch("http://localhost:5000/users/login", 
        {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email, password})});
   
        if (serverResponse.status === 403 ) { // Wrong Password
            const errorData = await serverResponse.json();
            
            if (errorData.error === "Password is not valid!") {
                document.querySelector("#login-password-err-p").textContent = errorData.error;
                document.querySelector("#login-password-err-p").style.display = 'inline';
                document.querySelector("#login-password").classList.add("err-input-field");
                
            }
            return;
            
        } else if (serverResponse.status === 400) { // Error User not found
            const errorData = await serverResponse.json();
    
            if (errorData.error === 'No such user found!') {
                document.querySelector("#login-email-err-p").textContent = errorData.error;
                document.querySelector("#login-email-err-p").style.display = 'inline';
                document.querySelector("#login-email").classList.add("err-input-field");
                return;
    
            } else {
                errorToastMessage(errorData.error);
                return navigate('/404');
            }
    
    
        } else if (serverResponse.status === 500) { // Internal Server Error
            const errorData = await serverResponse.json();
    
            errorToastMessage(errorData.error);
            return navigate('/404'); 
    
        }  else if (!serverResponse.ok) { // Other type of Error...
            const errorData = await serverResponse.json();

            errorToastMessage(errorData.error);
            return navigate('/404'); 
        }
    
        const {image, ...tokenAndData} = await serverResponse.json();
    
        setProfilePhoto(image);
        
        localStorage.setItem('authenticationTokenAndData', JSON.stringify(tokenAndData));
        setUser(tokenAndData);
    
        navigate("/");
 
    } catch {
        return navigate("/404"); // Error while making the request
    }
}