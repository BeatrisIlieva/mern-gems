<a name="js-gems"></a>

<p align="center" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 120px;">
  <img src="https://res.cloudinary.com/deztgvefu/image/upload/v1719057213/template_images/Screenshot_2024-06-22_at_14.52.43_xrdvgt.png" alt="Project Logo" width="340">
</p>

<h4 align="center">
  <a href="#frontend">Frontend</a> ·
  <a href="#backend">Backend</a> ·
  <a href="#demo-video">Demo Video</a>
</h4>

## Demo Video

[![Watch the video](https://img.youtube.com/vi/MTtAupdKb5A/maxresdefault.jpg)](https://www.youtube.com/watch?v=MTtAupdKb5A)

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Frontend
### Built With
- React
- CSS Modules
> [!NOTE]
> Currently optimized for desktop; future plans include implementing media queries for responsiveness on various devices

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

### Testing
- Jest

![Coverage Status](https://img.shields.io/badge/coverage-63%25-brightgreen.svg)

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

### Error Handling
1. Input Validation
- All user inputs are validated using regular expressions (regex)
- The validation rules are centralized in a set of constants and utility functions
- DynamicForm component and a useForm hook are used to handle user inputs
- Real-time feedback that ensures all data entered meets the required criteria before submission

2. User Authentication
- Register Error Handling:
  - When a user tries to register, the application verifies the email against the database
  - If the email is already registered, an error message is displayed to notify the user
- Login Error Handling:
  - When a user tries to log in, the application verifies the email and password against the database
  - If the password is invalid or there is no user with the provided email, an error message is displayed to notify the user
- Success Message:
  - If a user password is successfully changed, a success message is displayed

3. Size Selection
- If a user clicks the "Add To Bag" button without selecting a size, an error message is displayed to inform them of the requirement

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

### Features
#### 1. Custom Forms
   
- Floating labels
  
- Validation Messages
  
- Dropdown Menus for card expiration month and card expiration year
  - The menus suggest only valid options to ensure that the user cannot select an invalid expiration date
  
- After submitting any of the forms, the backend also performs validation to ensure that all inputs, including menus and fields, offer only valid options
  
- Errors related to invalid inputs returned by the backend are displayed to the user

#### 2. JSON Web Token expiration (adjusted JWT token expiration to 10 seconds for demo video to showcase Login Popup; reset to 10 minutes and rebuilt app afterwards)
- The application tracks user activity, including keyboard inputs, clicks, and scrolling
- If no activity is detected for 10 minutes, the user is automatically logged out
- On the payment page, a popup informs the user that their session has expired. The popup includes a button to go to the login page. After logging in, the user is redirected back to the payment page to continue their transaction
- On pages other than the payment page, the user is logged out and redirected to the login page

#### 3. Load More Functionality in the `JewelryList` and `Wishlist` components
- When a component mounts, it fetches items based on the user selection - category or collection. The first subset of items, based on a predefined number, is displayed initially
- A "Load More" button is displayed at the bottom of the item list. Clicking the button triggers a `loadMoreHandler` function, which updates the number of items displayed
- The `loadMoreHandler` function increments the number of displayed items. When all items are displayed, the "Load More" button disappears

#### 4. Product filtration
- Utilizes DynamicDropdown components for selecting stone types and stone colors
- Implements changeHandler and submitHandler functions to respond to user selections and apply filters accordingly
- Offers clearFilter functionality to reset filters and update the displayed jewelry items based on user actions
- Provides visual indicators (isSelectedStoneType, isSelectedStoneColor) to highlight whether a stone type or stone color filter is active

#### 5. Product sorting
- Sorts items based on their current availability
- Arranges items in ascending order of price
- Arranges items in descending order of price
- Visual feedback is provided with a highlighted indicator next to the selected sorting option

#### 6. Toggle Like
- Allows users to toggle their liking status by clicking a heart icon associated with each jewelry item
- Utilizes useWishlistContext to access functions for adding and removing items from the wishlist
- Toggles the `isLikedByUser` state locally for immediate visual feedback

#### 7. Mini Bag
- Sets lastLocation in localStorage to "/user/shopping-bag" to track navigation and redirect unauthenticated users to their shopping bag after login
- Contains a miniBagRef to manage the reference to the mini bag's modal content, allowing the user to close the modal by clicking outside of it
- Provides buttons for "View Bag" and "Continue Checkout", which are links that navigate to the full shopping bag page and the checkout page, respectively
- Includes a close button (X mark) that allows users to close the mini bag
- Allows the user to increase or decrease the quantity of items. Additionally, the buttons for adjusting the quantity are styled to appear active or inactive based on the available stock. A remove button is also provided

#### 8. Authentication Required for Checkout
- If the user is not logged in and clicks the checkout button, they are redirected to the login page
- Upon successful login, they are then redirected back to the checkout page to complete their purchase

#### 9. Mini Navigation
- The component uses state variables (isScrolled, isScrollingUp, lastScrollY) to detect scroll direction and position
- When the user scrolls down, a minimized MiniHeader component is displayed
- Conversely, when the user scrolls up, the full header component with comprehensive navigation options is shown

#### 10. Search Box Popup

#### 11. Shopping Bag Count

#### 12. Wishlist Count

#### 13. Products Count

#### 14. Create/Update Personal Information Form

#### 15. Create/Update Shipping Information Form

#### 16. Update Password Form

#### 17. Update Email Form

#### 18. Logout Button

#### 19. Delete Account Popup

#### 20. Order Summary at every step of the Checkout process

#### 21. Order Confirmation Page

#### 22. Order History Page

#### 23. Route Guard 

#### 24. `ScrollToTop` component that ensures the window scrolls to the top of the page whenever the user navigates to a new route
  
<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Backend


### Built With
- Node.js
- Express.js
- MongoDB
- MongoDB Atlas
- Mongoose

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

### Testing
- Jest

![Coverage Status](https://img.shields.io/badge/coverage-85%25-brightgreen.svg)

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

### Error Handling
1. Model Validations Using Regular Expressions:
- Ensures that data fields such as email addresses follow a standard format, passwords meet complexity requirements, payment details are in correct format etc.
2. Functions for Additional Validations:
- Includes checks for email uniqueness during registration, verifies the correctness of the old password during password updates, checks if a card is not expired, etc.

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

### Features

1. User Models:
- Implemented three distinct user models storing data about:
  - Logging credentials
  - Personal information
  - Shipping information

- Each user model is linked by a common user ID:
  - The ID is derived from the logging credentials model
  - The IDs for the personal information and shipping information models are set at the time of user registration
    
- Update Email functionality
- Update Password functionality
- Create and Update Personal Information functionality
- Create and Update Shipping Information functionality
- Detele Account functionality
- Logout functionality

2. Database aggregations for Product Filtering and Real-time Availability Tracking
   
3. Searching products by multiple criteria
   
4. Transfering Shopping Bag items after registration and login
   
5. Obligatory Size Selection except for the Category Earring
   
6. Users can increase or decrease the quantity of items in their shopping bag, with validations in place to ensure that they cannot add more than the available quantity in the database or reduce the quantity below zero
    
7. Transfering Wishlist items after registration and login
    
8. The system suggests matching jewelries across categories (earrings, necklaces, rings, bracelets) based on stone color and collection, taking into account the currently selected category
    
9. Orders History, ordered by the creation time
  
10. Email Notifications upon Registration and Order Completion

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>


