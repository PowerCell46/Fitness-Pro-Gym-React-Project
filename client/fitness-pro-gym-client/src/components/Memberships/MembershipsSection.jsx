import { useContext } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { productAlreadyAddedToCart, productSuccessfullyAdded } from '../../utils/toastify';


export function MembershipsSection(props) {
    const {navigate} = useContext(AuthenticationContext);

    return (
        <section>
        <h3>{props.title}</h3>
        <div className="prices">
          <table>
            <tbody>
              <tr>
                <th>Category</th>
                <th>Price</th>
              </tr>
              <tr>
                <td onClick={(e) => addMembershipToCart(e, props.title, "under18")}>Under 18</td>
                <td onClick={(e) => addMembershipToCart(e, props.title, "under18")}>{props.under18}.<sup>00</sup> BGN</td>
              </tr>
              <tr>
                <td onClick={(e) => addMembershipToCart(e, props.title, "men")}>Men</td>
                <td onClick={(e) => addMembershipToCart(e, props.title, "men")}>{props.men}.<sup>00</sup> BGN</td>
              </tr>
              <tr>
                <td onClick={(e) => addMembershipToCart(e, props.title, "women")}>Women</td>
                <td onClick={(e) => addMembershipToCart(e, props.title, "women")}>{props.women}.<sup>00</sup> BGN</td>
              </tr>
            </tbody>
          </table>
        </div>
      <ToastContainer/>
      </section>
      
    );

    async function addMembershipToCart(e, membershipType, membershipCategory) {
        
        const userId = JSON.parse(localStorage.getItem("authenticationTokenAndData")).id;

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
                  return productSuccessfullyAdded();

                } else {
                  return productAlreadyAddedToCart();
                }

            } else {
                  const errorData = await response.json();
                
                  errorToastMessage(errorData.error);

                  return navigate("/404");
            }

        } catch {
            navigate("/404");
        }
    }
}