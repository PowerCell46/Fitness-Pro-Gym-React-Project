import { profileImageSuccessfullyChanged } from "../../utils/toastify";


export async function changeProfilePictureHandler(setProfilePhoto, navigate) {
    const fileInput = document.querySelector(".file-upload");

    if (fileInput.files.length === 0) {
        // Show that no image was selected
    }

    // validate image
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("token", JSON.parse(localStorage.getItem("authenticationTokenAndData")).token);

    try {
        var response = await fetch("http://localhost:5000/profilePhotos", {
            method: "POST",
            body: formData
        });

        if (response.status === 200) {
            const data = await response.json();

            document.querySelector("#change-profile-photo").style.display = 'none';
            
            profileImageSuccessfullyChanged();

            setProfilePhoto(data);

        } else {
            // display error
            navigate("/404");
        }

    } catch {
        navigate("/404");
    }
}