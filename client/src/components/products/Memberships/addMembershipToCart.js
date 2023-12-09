import { productSuccessfullyAdded, productAlreadyAddedToCart, errorToastMessage } from "../../../utils/toastify";


export async function addMembershipToCart(e, membershipType, membershipCategory, userId, navigate, setNumberOfCartProducts) {
    try {
        var response = await fetch(`http://localhost:5000/memberships/${membershipType}/${membershipCategory}`, {
            method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({userId})
        });

        if (response.status === 200) {
            const responseCondition = await response.json();

            if (responseCondition === "Successful Operation!") {
              const parentElement = e.target.parentElement;
              const children = parentElement.children;

              for (let i = 0; i < children.length; i++) {
                  children[i].classList.add("added-membership");
              }
            
              setNumberOfCartProducts((previousValue) => previousValue + 1);

              return productSuccessfullyAdded();

            } else {
              return productAlreadyAddedToCart();
            }

        } else {
              const errorData = await response.json();
            
              errorToastMessage(errorData.error);

              return navigate("/404");
        }

    } catch(err) {
        navigate("/404");
    }
}