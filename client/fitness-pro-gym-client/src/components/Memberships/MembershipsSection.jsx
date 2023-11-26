import { useContext } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext"; 


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
                <td onClick={(e) => addMembershipToCart(e, props.title, "under 18")}>Under 18</td>
                <td onClick={(e) => addMembershipToCart(e, props.title, "under 18")}>{props.under18}.<sup>00</sup> BGN</td>
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
      </section>
      
    );

    async function addMembershipToCart(e, membershipType, membershipCategory) {
        
        const userId = JSON.parse(localStorage.getItem("authenticationTokenAndData")).id;

        try {
            var response = await fetch(`http://localhost:5000/memberships/${membershipType}/${membershipCategory}`, {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({userId})
            });
            
            if (response.status === 200) {
                const parentElement = e.target.parentElement;
                const children = parentElement.children;

                for (let i = 0; i < children.length; i++) {
                    children[i].classList.add("added-membership");
                }

            } else {
                navigate("/404");
            }

        } catch {
            navigate("/404");
        }
    }
}