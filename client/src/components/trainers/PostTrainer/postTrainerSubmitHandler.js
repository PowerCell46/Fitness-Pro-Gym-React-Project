import { validateImageExtension, validateTrainerName, validateEmail, validatePhoneNumber } from "../../../utils/validators";


export async function postTrainerSubmitHandler(e, navigate, errorToastMessage, token) {
    e.preventDefault();
    let formData = new FormData(e.target);
    
    const validImage = validateImageExtension(formData.get("image"));
    if (validImage !== true) {
        document.querySelector("#post-trainer-image-err-p").textContent = 'Image format not valid!';                    
        document.querySelector("#post-trainer-image-err-p").style.display = 'inline';
        document.querySelector("#post-trainer-image").classList.add("err-input-field");
        document.querySelector(".post-trainer-main").style.height = '105vh';

    } else {
        document.querySelector("#post-trainer-image-err-p").style.display = 'none';
        document.querySelector("#post-trainer-image").classList.remove("err-input-field");
        document.querySelector(".post-trainer-main").style.height = '90vh';
    }

    const validName = validateTrainerName(formData.get("name"));
    if (validName !== true) {
        document.querySelector("#post-trainer-name-err-p").textContent = validName;                    
        document.querySelector("#post-trainer-name-err-p").style.display = 'inline';
        document.querySelector("#post-trainer-name").classList.add("err-input-field");
        document.querySelector(".post-trainer-main").style.height = '105vh';
    } else {
        document.querySelector("#post-trainer-name-err-p").style.display = 'none';
        document.querySelector("#post-trainer-name").classList.remove("err-input-field");
        document.querySelector(".post-trainer-main").style.height = '90vh';
    }

    const validEmail = validateEmail(formData.get("email"));
    if (validEmail !== true) {
        document.querySelector("#post-trainer-email-err-p").textContent = validEmail;                    
        document.querySelector("#post-trainer-email-err-p").style.display = 'inline';
        document.querySelector("#post-trainer-email").classList.add("err-input-field");
        document.querySelector(".post-trainer-main").style.height = '105vh';

    } else {
        document.querySelector("#post-trainer-email-err-p").style.display = 'none';
        document.querySelector("#post-trainer-email").classList.remove("err-input-field");
        document.querySelector(".post-trainer-main").style.height = '90vh';
    }

    const validPhoneNumber = validatePhoneNumber(formData.get("phoneNumber"));
    if (!validPhoneNumber) {
        document.querySelector("#post-trainer-phoneNumber-err-p").textContent = 'Phone Number is not valid!';                    
        document.querySelector("#post-trainer-phoneNumber-err-p").style.display = 'inline';
        document.querySelector("#post-trainer-phoneNumber").classList.add("err-input-field");
        document.querySelector(".post-trainer-main").style.height = '105vh';

    } else {
        document.querySelector("#post-trainer-phoneNumber-err-p").style.display = 'none';
        document.querySelector("#post-trainer-phoneNumber").classList.remove("err-input-field");
        document.querySelector(".post-trainer-main").style.height = '90vh';
    }

    if (!validImage || validName !== true || validEmail !== true  || !validPhoneNumber) {
        return;
    }
    formData.append("token", token);

    try {
        let response = await fetch("http://localhost:5000/trainers", {
            method: "POST",
            body: formData,
        });

        if (response.status === 200) {
            return navigate('/trainers');

        } else {
            const errorData = await response.json();

            errorToastMessage(errorData.error);

            return navigate('/404'); 
        }

    } catch {
        return navigate('/404');
    }
}