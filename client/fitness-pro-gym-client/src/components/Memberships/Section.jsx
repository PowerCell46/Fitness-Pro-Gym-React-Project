import { useContext } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext"; 

export function Section(props) {
    const {redirect} = useContext(AuthenticationContext);
    return (
        <section>
                <h3>{props.title}</h3>
                <div className="prices">
                    <table>
                        <tr>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                        <tr>
                            <td onClick={() => addMembershipToCart(props.title, "under 18")}>Under 18</td>
                            <td onClick={() => addMembershipToCart(props.title, "under 18")}>{props.under18}.<sup>00</sup> Lv.</td>
                        </tr>
                        <tr>
                            <td onClick={() => addMembershipToCart(props.title, "men")}>Men</td>
                            <td onClick={() => addMembershipToCart(props.title, "men")}>{props.men}.<sup>00</sup> Lv.</td>
                        </tr>
                        <tr>
                            <td onClick={() => addMembershipToCart(props.title, "women")}>Women</td>
                            <td onClick={() => addMembershipToCart(props.title, "women")}>{props.women}.<sup>00</sup> Lv.</td>
                        </tr>
                    </table>
                </div>
            </section>
    );

    async function addMembershipToCart(membershipType, membershipCategory) {
        const userId = JSON.parse(localStorage.getItem("authenticationTokenAndData")).id;
        try {
            var response = await fetch(`http://localhost:5000/memberships/${membershipType}/${membershipCategory}`, {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({membershipType, membershipCategory, userId})
            });
        } catch {
            console.log(await response.json());
            redirect("/404");
        }
        
    }
}