import { useContext } from "react";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addMembershipToCart} from "./addMembershipToCart";


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
                  <td onClick={(e) => addMembershipToCart(e, props.title, "under18", props.userId, navigate)}>Under 18</td>
                  <td onClick={(e) => addMembershipToCart(e, props.title, "under18", props.userId, navigate)}>{props.under18}.<sup>00</sup> BGN</td>
                </tr>
                <tr>
                  <td onClick={(e) => addMembershipToCart(e, props.title, "men", props.userId, navigate)}>Men</td>
                  <td onClick={(e) => addMembershipToCart(e, props.title, "men", props.userId, navigate)}>{props.men}.<sup>00</sup> BGN</td>
                </tr>
                <tr>
                  <td onClick={(e) => addMembershipToCart(e, props.title, "women", props.userId, navigate)}>Women</td>
                  <td onClick={(e) => addMembershipToCart(e, props.title, "women", props.userId, navigate)}>{props.women}.<sup>00</sup> BGN</td>
                </tr>
              </tbody>
            </table>
          </div>
        <ToastContainer/>
      </section>
    );
}