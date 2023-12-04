import { useContext } from "react";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addMembershipToCart} from "./addMembershipToCart";
import { GlobalContext } from "../../../contexts/GlobalContext";


export function MembershipsSection(props) { 
    const {navigate} = useContext(GlobalContext);
    const {setNumberOfCartProducts} = useContext(AuthenticationContext);
    
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
                  <td onClick={(e) => addMembershipToCart(e, props.title, "under18", props.userId, navigate, setNumberOfCartProducts)}>Under 18</td>
                  <td onClick={(e) => addMembershipToCart(e, props.title, "under18", props.userId, navigate, setNumberOfCartProducts)}>{props.under18}.<sup>00</sup> BGN</td>
                </tr>
                <tr>
                  <td onClick={(e) => addMembershipToCart(e, props.title, "men", props.userId, navigate, setNumberOfCartProducts)}>Men</td>
                  <td onClick={(e) => addMembershipToCart(e, props.title, "men", props.userId, navigate, setNumberOfCartProducts)}>{props.men}.<sup>00</sup> BGN</td>
                </tr>
                <tr>
                  <td onClick={(e) => addMembershipToCart(e, props.title, "women", props.userId, navigate, setNumberOfCartProducts)}>Women</td>
                  <td onClick={(e) => addMembershipToCart(e, props.title, "women", props.userId, navigate, setNumberOfCartProducts)}>{props.women}.<sup>00</sup> BGN</td>
                </tr>
              </tbody>
            </table>
          </div>
        <ToastContainer/>
      </section>
    );
}