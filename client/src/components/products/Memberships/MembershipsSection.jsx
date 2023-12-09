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
                  <td onClick={props.userId !== "" ? (e) => addMembershipToCart(e, props.title, "under18", props.userId, navigate, setNumberOfCartProducts) : null}>Under 18</td>
                  <td onClick={props.userId !== "" ? (e) => addMembershipToCart(e, props.title, "under18", props.userId, navigate, setNumberOfCartProducts) : null}>{props.under18}.<sup>00</sup> BGN</td>
                </tr>
                <tr>
                  <td onClick={props.userId !== "" ? (e) => addMembershipToCart(e, props.title, "under18", props.userId, navigate, setNumberOfCartProducts) : null}>Men</td>
                  <td onClick={props.userId !== "" ? (e) => addMembershipToCart(e, props.title, "under18", props.userId, navigate, setNumberOfCartProducts) : null}>{props.men}.<sup>00</sup> BGN</td>
                </tr>
                <tr>
                  <td onClick={props.userId !== "" ? (e) => addMembershipToCart(e, props.title, "under18", props.userId, navigate, setNumberOfCartProducts) : null}>Women</td>
                  <td onClick={props.userId !== "" ? (e) => addMembershipToCart(e, props.title, "under18", props.userId, navigate, setNumberOfCartProducts) : null}>{props.women}.<sup>00</sup> BGN</td>
                </tr>
              </tbody>
            </table>
          </div>
        <ToastContainer/>
      </section>
    );
}