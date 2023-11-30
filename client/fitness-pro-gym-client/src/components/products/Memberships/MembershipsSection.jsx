import { useContext } from "react";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function MembershipsSection(props) {
    const {navigate} = useContext(AuthenticationContext);
    const userId = JSON.parse(localStorage.getItem("authenticationTokenAndData")).id;

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
                <td onClick={(e) => addMembershipToCart(e, props.title, "under18", userId, navigate)}>Under 18</td>
                <td onClick={(e) => addMembershipToCart(e, props.title, "under18", userId, navigate)}>{props.under18}.<sup>00</sup> BGN</td>
              </tr>
              <tr>
                <td onClick={(e) => addMembershipToCart(e, props.title, "men", userId, navigate)}>Men</td>
                <td onClick={(e) => addMembershipToCart(e, props.title, "men", userId, navigate)}>{props.men}.<sup>00</sup> BGN</td>
              </tr>
              <tr>
                <td onClick={(e) => addMembershipToCart(e, props.title, "women", userId, navigate)}>Women</td>
                <td onClick={(e) => addMembershipToCart(e, props.title, "women", userId, navigate)}>{props.women}.<sup>00</sup> BGN</td>
              </tr>
            </tbody>
          </table>
        </div>
      <ToastContainer/>
      </section>
    );
}