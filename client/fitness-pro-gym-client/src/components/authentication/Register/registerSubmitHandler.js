import { validateEmail, validateUsername, validatePassword,  } from "../../../utils/validators";


export async function registerSubmitHandler(e, navigate, errorToastMessage, setProfilePhoto, setUser, setIsAdministrator) {
    e.preventDefault();

    const {email, username, password, repeatPassword} = (Object.fromEntries(new FormData(e.target)));
    
    const emailValidation = validateEmail(email);
    if (emailValidation !== true) {
        document.querySelector("#register-email-err-p").textContent = emailValidation;
        document.querySelector("#register-email-err-p").style.display = 'inline';
        document.querySelector("#register-email").classList.add("err-input-field");
    
    } else {
        document.querySelector("#register-email-err-p").style.display = 'none';
        document.querySelector("#register-email").classList.remove("err-input-field");
    }

    const usernameValidation = validateUsername(username);
    if (usernameValidation !== true) {
        document.querySelector("#register-username-err-p").textContent = usernameValidation;
        document.querySelector("#register-username-err-p").style.display = 'inline';
        document.querySelector("#register-username").classList.add("err-input-field");
    
    } else { 
        document.querySelector("#register-username-err-p").style.display = 'none';
        document.querySelector("#register-username").classList.remove("err-input-field");
    }
    
    const passwordValidation = validatePassword(password);
    if (passwordValidation !== true) {
        document.querySelector("#register-password-err-p").textContent = passwordValidation;
        document.querySelector("#register-password-err-p").style.display = 'inline';
        document.querySelector("#register-password").classList.add("err-input-field");
    
    } else {
        document.querySelector("#register-password-err-p").style.display = 'none';
        document.querySelector("#register-password").classList.remove("err-input-field");
    }

    if (password !== repeatPassword) {
        document.querySelector("#register-repeat-password-err-p").style.display = 'inline';
        document.querySelector("#register-repeat-password").classList.add("err-input-field");
   
    } else {
        document.querySelector("#register-repeat-password-err-p").style.display = 'none';
        document.querySelector("#register-repeat-password").classList.remove("err-input-field");
    }

    if (emailValidation !== true || passwordValidation !== true || usernameValidation !== true || password !== repeatPassword) {
        return;
    }
    
    // Valid data is being given to the server
    try {
        var serverResponse = await fetch("http://localhost:5000/users/register", 
        {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email, username, password})});
   
    } catch {
        return navigate('/404'); // Error while making the request
    }

    if (serverResponse.status === 409) { // Checking for the case where the Email or the Username has already been Used
        const errorData = await serverResponse.json();

        if (errorData.error === 'Email already in use!') {
            document.querySelector("#register-email-err-p").textContent = 'Email already in use!';                    
            document.querySelector("#register-email-err-p").style.display = 'inline';
            document.querySelector("#register-email").classList.add("err-input-field");
            return;
        
        } else {
            document.querySelector("#register-username-err-p").textContent = 'Username already in use!';
            document.querySelector("#register-username-err-p").style.display = 'inline';
            document.querySelector("#register-username").classList.add("err-input-field");
            return;
        }

    } else if (!serverResponse.ok) { // Any other type of Error
        const errorData = await serverResponse.json();
        
        errorToastMessage(errorData.error);

        return navigate('/404'); 
    }

    const {image, isAdministrator, ...tokenAndData} = await serverResponse.json();

    setProfilePhoto(image);

    setIsAdministrator(isAdministrator);
    
    localStorage.setItem('authenticationTokenAndData', JSON.stringify(tokenAndData));
    
    setUser(JSON.parse(localStorage.getItem("authenticationTokenAndData")).token);

    navigate("/");
}