export async function getUserId(token, setUserId, errorToastMessage, navigate, func) {
    try {
        const response = await fetch("http://localhost:5000/users/getUserId", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {token })
        });

        if (response.status === 200) {
            const data  = await response.json();
                
            setUserId(data.userId);

            if (func) {
                await func(data.userId);
            }

        } else {
            const errorData = await serverResponse.json();
        
            errorToastMessage(errorData.error);

            return navigate("/404");
        }
        
    } catch(err) {
        console.log(err);
        navigate('/404');
    }
}