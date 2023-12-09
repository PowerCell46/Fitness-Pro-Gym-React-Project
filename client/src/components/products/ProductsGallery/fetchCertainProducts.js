export async function fetchCertainProducts(endpoint, errorToastMessage, navigate, setProductsData) {
    try {
        var response = await fetch(`http://localhost:5000/products${endpoint}`);
        
        if (!response.ok) {
            const errorData = await response.json();
        
            errorToastMessage(errorData.error);
            return navigate("/404");
        }

    } catch {
        return navigate("/404");
    }
    
    const data = await response.json();
    
    setProductsData(data);

    if (endpoint === "") {
        document.querySelector("#h1-all").classList.add("selected-view");
        document.querySelector("#h1-fitness-supplements").classList.remove("selected-view");
        document.querySelector("#h1-fitness-machines").classList.remove("selected-view");
        document.querySelector("#h1-merchandise").classList.remove("selected-view");
    
    } else if (endpoint === '/supplements') {
        document.querySelector("#h1-all").classList.remove("selected-view");
        document.querySelector("#h1-fitness-supplements").classList.add("selected-view");
        document.querySelector("#h1-fitness-machines").classList.remove("selected-view");
        document.querySelector("#h1-merchandise").classList.remove("selected-view");

    } else if (endpoint === '/machines') {
        document.querySelector("#h1-all").classList.remove("selected-view");
        document.querySelector("#h1-fitness-supplements").classList.remove("selected-view");
        document.querySelector("#h1-fitness-machines").classList.add("selected-view");
        document.querySelector("#h1-merchandise").classList.remove("selected-view");

    } else if (endpoint === '/merchandise') {
        document.querySelector("#h1-all").classList.remove("selected-view");
        document.querySelector("#h1-fitness-supplements").classList.remove("selected-view");
        document.querySelector("#h1-fitness-machines").classList.remove("selected-view");
        document.querySelector("#h1-merchandise").classList.add("selected-view");
    }
}