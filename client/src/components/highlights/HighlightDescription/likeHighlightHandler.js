import { errorToastMessage } from "../../../utils/toastify";


export async function likeHighlightHandler(highlightData, userId, highlightId, setNumberOfLikes, numberOfLikes, navigate) {
    if (!userId) {
        return errorToastMessage("You are not Logged in!");
    }
    console.log(highlightData.likes);
    if (highlightData.likes.includes(userId)) {
        return errorToastMessage(`You've already liked this Highlight!`);
    }

    try {
        var response = await fetch(`http://localhost:5000/highlights/like/${highlightId}`, 
        {method: "POST", headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({userId})});

        if (response.status === 200) {
            setNumberOfLikes((val) => val + 1, () => {
                document.querySelector(".number-of-likes").textContent = `Likes: ${numberOfLikes}`;
            });
            
            document.querySelector("#like-icon").classList.add("already-liked");    
       
            return;

        } else if (response.status === 400) {
            const errorData = await response.json();

            if (errorData.error === 'User already liked this Highlight!') {
                return errorToastMessage(`You've already liked this Highlight!`);
            }

        } else {
            const errorData = await response.json();

            errorToastMessage(errorData.error);
                
            return navigate('/404'); 
        }

    } catch {
        return navigate("/404");
    }
}