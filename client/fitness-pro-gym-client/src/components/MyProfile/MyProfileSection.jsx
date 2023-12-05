import { Link } from "react-router-dom";


export function MyProfileSection(props) {
    return (
        <section>
            <div className="order-details-template">
                <p>Order №:</p>
                <p>Order Date:</p>
                <p>Total Price:</p>
            </div>
            <div>
                <p>{props.order.orderDetails.orderId}</p>
                <p>{props.order.orderDetails.orderDate}</p>
                <p>{props.order.orderDetails.totalPrice}<sup>00</sup> BGN</p>
            </div>
            <img className="fitness-supplements-img" src="../../../public/images/externalImages/fitness-supplements-laf-featured.jpg" alt="fitness-supplements-img" />
            {/* <Link to={`/orders/${props.order.orderDetails.orderId}`}><button>Details</button></Link> */}
        </section>
    );
}