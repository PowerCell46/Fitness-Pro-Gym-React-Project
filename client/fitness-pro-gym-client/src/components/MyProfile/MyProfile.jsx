import "./myProfile.css";


export function MyProfile() {
    return (
        <main className="my-profile-main">
        <div class="hexagon-container">
            <img src="./images/profile_picture.jpg" alt="" class="profile-picture" />
        </div>
        <h1 class="main-heading">My profile</h1>
        
        <div class="trainer-qr-code-section">
            <img src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" alt=""/>
            <h2>Pro Gym <br/> Fitness Card</h2>
        </div>
        <h2>Orders History</h2>
        <section>
            <div class="order-details-template">
                <p>Order №:</p>
                <p>Order Date:</p>
                <p>Total Price:</p>
                {/* <!-- <p>Status ???</p> --> */}
            </div>
            <div>
                <p>575645</p>
                <p>10.11.2023</p>
                <p>127.69$</p>
            </div>
            <button>Details</button>
        </section>
        <section>
            <div class="order-details-template">
                <p>Order №:</p>
                <p>Order Date:</p>
                <p>Total Price:</p>
                {/* <!-- <p>Status ???</p> --> */}
            </div>
            <div>
                <p>575645</p>
                <p>10.11.2023</p>
                <p>127.69$</p>
            </div>
            <button>Details</button>
        </section>
        <section>
            <div class="order-details-template">
                <p>Order №:</p>
                <p>Order Date:</p>
                <p>Total Price:</p>
                {/* <!-- <p>Status ???</p> --> */}
            </div>
            <div>
                <p>575645</p>
                <p>10.11.2023</p>
                <p>127.69$</p>
            </div>
            <button>Details</button>
        </section>

        <div class="my-highlights">
            <h1>My Highlights</h1>

            <div class="gallery-div">

                <div class="gallery-inner-box">
                    <img src="./images/364538988_215016618201450_9064104799704686842_n.jpg" alt=""/>
                    <img src="./images/a.png" alt=""/>
                    <img src="./images/b.PNG" alt=""/>
                </div>

                <div class="gallery-inner-box">
                    <img src="./images/c.PNG" alt=""/>
                    <img src="./images/received_782141073155761.jpeg" alt=""/>
                    <img src="./images/Screenshot_20230712_224319_Instagram.jpg" alt=""/>
                </div>

                <div class="gallery-inner-box">
                    <img src="./images/b.PNG" alt=""/>
                    <img src="./images/c.PNG" alt=""/>
                    <img src="./images/b.PNG" alt=""/>
                </div>
                <div class="gallery-inner-box">
                    <img src="./images/b.PNG" alt=""/>
                    <img src="./images/c.PNG" alt=""/>
                    <img src="./images/b.PNG" alt=""/>
                </div>
            </div>
        </div>
    </main>
    );
} 