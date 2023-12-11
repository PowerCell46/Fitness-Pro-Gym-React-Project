# Project Summary: Fitness Pro Gym

*Fitness Pro Gym* is a comprehensive web application that showcases the developer's proficiency in various aspects of web development. Designed for the local fitness community in Sofia, Bulgaria, the project seamlessly integrates frontend, backend, design, and database technologies to offer a feature-rich experience.

## Key Features

1. **Gym Overview:** Users can explore the facilities and offerings of Fitness Pro Gym, gaining insights into the services provided.

2. **E-commerce Functionality:** The platform enables users to make purchases, including supplements, fitness machines, merchandise, and memberships, enhancing user convenience.

3. **User Highlights:** Similar to social media posts, users can create and share highlights, fostering a sense of community within the fitness space.

4. **User Profiles:** Each user has a dedicated profile page where they can track their orders, check the validity of their membership card, and review their posted highlights.

## Technology Stack

The project is built using the **MERN stack**—MongoDB for the Database, Express for the Backend, React for the Frontend, and Node.js for Server-side scripting. This modern and robust technology stack ensures a scalable and efficient web application.

## Target Audience

The primary audience includes members of the SoftUni community, potential future employers, and individuals interested in Fitness Pro Gym. By catering to these diverse user groups, the project aims to showcase not only the technical skills of the developer but also the practical application of these skills in a real-world context.

## Challenges

Throughout development, challenges were met and overcome, reflecting the developer's ability to navigate complexities in both frontend and backend domains. The result is a cohesive and functional platform that successfully integrates various features to meet the needs of its users.

*Fitness Pro Gym* stands as a testament to the developer's dedication to mastering the full spectrum of web development, offering a comprehensive solution for the local fitness community while impressing potential stakeholders and employers.

# Pro Gym Documentation
### Application Flow
    When the user opens the app he is redirected to the home page.
#### Home View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/HomePage.PNG" alt="homePage.jpg"/>
    <br>
</p>
    Guest Header with the Greeting Section in the Home view.
<p align="center">
    <br>
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/HomePage2.PNG" alt="homePage2.jpg"/>
    <br>
</p>
    Gym Premises Header with the first room in the Home view.
<p align="center">
    <br>
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/HomePage-Reviews.PNG" alt="homePage3.jpg"/>
    <br>
</p>
    Reviews from Customers Section in the Home view.
    <br>

#### Footer
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/Footer.PNG" alt="footer"/>
    <br>
</p>


#### Login View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/LoginPage.PNG" alt="loginPage"/>
    <br>
</p>
    Login header with two input fields - email and password, login button and link to the Register Page.
    <br>
    <br>
    
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/LoginErrMessage.PNG" alt="loginErrorMessage"/>
    <br>
</p>
    One of the possible error messages - incorrect password.
    <br>

#### Register View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/RegisterPage.PNG" alt="registerPage"/>
    <br>
</p>
    Register header with four input fields - email, username, password and repeat password, register button and link to the Login Page.
    <br>

#### Logged in User 
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/DefaultPictureAndNonAdminDropdown.PNG" alt="logged in user"/>
    <br>
</p>
    Updated header after successful Login/Register with default Profile Picture and non-Administrator Dropdown Menu.
    <br>

#### Logout Popup
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/LogoutPopup.PNG" alt="logoutPopup"/>
    <br>
</p>
    Logout Popup, asking to confirm if you really want to Logout.
    <br>

#### Post Highlight View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/PostHighlightPage.PNG" alt="postHighlightPage"/>
    <br>
</p>
    A page, accessible to all Logged in Users, allowing them to make a post similar to other Social Networks.
    <br>

#### Highlights View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/HighlightsPage.PNG" alt="highlightsPage"/>
    <br>
</p>
    Highlights Gallery, similar to other Social medias Feeds, accessible by all users - logged in or not.
    <br>

#### Highlight Description View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/HighlightDescriptionPage.PNG" alt="highlightDescPage"/>
    <br>
</p>
    Highlight Details page, accessible by everyone. The creator and the administrator have access to the edit and delete options, and the others logged in users can Like the selected Highlight.
    <br>

#### Edit Highlight View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/editHighlight.PNG" alt="highlightDescPage"/>
    <br>
</p>
    Highlight Edit view loaded with the current state of the data, waiting to be updated.
    <br>

#### Delete Highlight Popup
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/DeleteHighlight.PNG" alt="highlightDescPage"/>
    <br>
</p>
    A popup asking the Creator or the Administrator if they really want to proceed with the Deletion Process.
    <br>

#### Post Product View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/CreateProductPage.PNG" alt="postProductView"/>
    <br>
</p>
    Create Product view, accessible only by the Administrator.
    <br>

#### Products View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/ProductsPage.PNG" alt="productsView"/>
    <br>
</p>
    Products view, accessible by anyone, all products selected by default. Logged in users can add products to their carts.
    <br>

#### Products View Filtered
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/ProductsFilterPage.PNG" alt="productsViewFiltered"/>
    <br>
</p>
    Products view, filtered only the Fitness Machines products by the Filter container.
    <br>

#### Product Description View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/ProductDescription.PNG" alt="productDetailsView"/>
    <br>
</p>
    Product Details View, showing all of the Product's info, allowing logged in users to add the product to the cart and the administrator to edit and delete it.
    <br>

#### Edit Product View 
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/EditProductPage.PNG" alt="editProductView"/>
    <br>
</p>
    Product Edit view loaded with the current state of the data, waiting to be updated.
    <br>

#### Delete Product Popup
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/DeleteProductPage.PNG" alt="deleteProductView"/>
    <br>
</p>
    A popup asking the Administrator if he really wants to proceed with the Deletion Process.
    <br>

#### Memberships View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/MembershipsPage.PNG" alt="membershipsView"/>
    <br>
</p>
    Memberships view, accessible by anyone. Logged in users can add a certain membership to their cart.
    <br>

#### Post Trainer View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/CreateTrainerPage.PNG" alt="postTrainerView"/>
    <br>
</p>
    Create Trainer view, accessible only by the Administrator.
    <br>

#### Trainers View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/TrainersPage.PNG" alt="trainersView"/>
    <br>
</p>
    Trainers Gallery View, accessible by every user - logged in or not.
    <br>

#### Checkout View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/CheckoutPage.PNG" alt="checkoutView"/>
    <br>
</p>
    Checkout view, showing all of the selected Products, allowing the user to decide the quantity and after filling out the shipping details to finish the order.
    <br>

#### Successful Order View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/SuccessfulOrderPage.PNG" alt="successfulOrderView"/>
    <br>
</p>
    Successful order view, showing the User that his order has been finished and confirmed.
    <br>

#### Successful Order Email
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/successfulOrderMail.PNG" alt="successfulOrderEmail"/>
    <br>
</p>
    Successful order Email, sent to the User and to the Administrator with the Order details, Address details and Products details.
    <br>

#### My Profile View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/MyProfilePage.PNG" alt="myProfileView"/>
    <br>
</p>
    My Profile view with the Profile picture of the user, that on click can be changed with another, generated QR code that on scan and on hover shows whether the Gym membership is valid or not.
    <br>

### My Profile Orders
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/MyProfileOrders.PNG" alt="myProfileView-Orders"/>
    <br>
</p>
    A history of the User's orders.
    <br>

#### My Profile my highlights
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/MyProfileMyHighlights.PNG" alt="myProfileView-Highlights"/>
    <br>
</p>
    The highlights of the current User.
    <br>

#### Order Details View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/OrderDetailsPage.PNG" alt="orderDetails"/>
    <br>
</p>
    Order Details view showing the spefiics of the selected order.
    <br>

#### Error View
<p align="center">
    <img height="300em" src="https://github.com/PowerCell46/Fitness-Pro-Gym-React-Project/blob/master/screenshots/ErrorPage.PNG" alt="errorView"/>
    <br>
</p>
    Error view, in case of some error in invalid URL path the user is forwarded to this Page.
    <br>

