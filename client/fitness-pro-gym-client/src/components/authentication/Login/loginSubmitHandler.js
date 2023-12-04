import { validateEmail, validatePassword } from "../../../utils/validators";


export async function loginSubmitHandler(e, setProfilePhoto, setUser, navigate, errorToastMessage, setIsAdministrator) {

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

        let response = await fetch("http://localhost:5000/users/login", 
        {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email, password})});
   
        if (response.status === 403 ) { // Wrong Password
            const errorData = await response.json();
            
            if (errorData.error === "Password is not valid!") {
                document.querySelector("#login-password-err-p").textContent = errorData.error;
                document.querySelector("#login-password-err-p").style.display = 'inline';
                document.querySelector("#login-password").classList.add("err-input-field");
                
            }
            return;

        } else if (response.status === 400) { // Error User not found
            const errorData = await response.json();
    
            if (errorData.error === 'No such user found!') {
                document.querySelector("#login-email-err-p").textContent = errorData.error;
                document.querySelector("#login-email-err-p").style.display = 'inline';
                document.querySelector("#login-email").classList.add("err-input-field");
                return;
    
            } else {
                errorToastMessage(errorData.error);
                return navigate('/404');
            }
    
    
        } else if (response.status === 500) { // Internal Server Error
            const errorData = await response.json();
    
            errorToastMessage(errorData.error);
            return navigate('/404'); 
    
        }  else if (!response.ok) { // Other type of Error...
            const errorData = await response.json();

            errorToastMessage(errorData.error);
            return navigate('/404'); 
        }
    
        const {image, isAdministrator, ...tokenAndData} = await response.json();
    
        setProfilePhoto(image);

        setIsAdministrator(isAdministrator);
        
        localStorage.setItem('authenticationTokenAndData', JSON.stringify(tokenAndData));
      
        setUser(JSON.parse(localStorage.getItem("authenticationTokenAndData")).token);
    
        navigate("/");
 
    } catch {
        return navigate("/404"); // Error while making the request
    }
}