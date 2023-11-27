
export function MyProfileSection(props) {
    return (
        <section>
            <div className="order-details-template">
                <p>Order №:</p>
                <p>Order Date:</p>
                <p>Total Price:</p>
            </div>
            <div>
                <p>575645</p>  {/* Add order number when doing an order */}
                <p>10.11.2023</p>  {/* Add order date when doing an order */}
                <p>{props.order.orderDetails.totalPrice}<sup>00</sup> BGN</p>
            </div>
            <button>Details</button>
        </section>
    );
}