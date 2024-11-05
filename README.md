# Lilies

## Installation and Setup

Follow these steps to set up and run the project locally:

1. **Clone the Repository**  
   Clone the repository to your local machine:
   ```
   git clone https://github.com/AimaAbid/Lilies.git
   ```

2. **Install Dependencies**  
   Navigate to the backend and frontend directories and install the required dependencies.
   
   - For the backend:
     ```
     cd Lilies/backend
     npm install
     ```
   - For the frontend:
     ```
     cd ../frontend
     npm install
     ```

3. **Set Up the Environment Variables**  
   In the `backend` folder, create a `.env` file for sensitive information. Add a secret key to this file:
   ```
   SECRET_KEY="your_secret_key_here"
   ```
   Replace `"your_secret_key_here"` with any secure key of your choice. This key will be used for JWT or other sensitive operations.

4. **Import Data into MongoDB**  
   Import the `data.js` file located in the backend folder into your MongoDB Atlas database. This file contains  item data for the "items" collection.

5. **Run the Application**  
   - Start the backend server:
     ```bash
     nodemon index.js
     ```
   - Start the frontend:
     ```bash
     cd ../frontend
     npm start
     ```

6. **Access the Application**  
   Once the frontend and backend are both running, you should be able to access the application through your browser at `http://localhost:3000`.



## About Lilies

Lilies is a MERN web application. Key features include:

- **User Registration & Role Assignment**: Allows user registration with default roles, while admins can assign roles anytime
- **Authentication**: Secure login using JWT, redirecting users to dashboards.
- **Admin **: Admins can  see the list of all users and make other users admins too.
- **User Dashboard**: Enables users to browse items, manage accounts, view order history, and complete the checkout process. 
- **Guest Access**: Guests can browse items but must register to make purchases.
- **Additional Pages**: Includes a Home page, Menu page, Order History, and Profile management.

The tech stack combines Node.js with Express for the backend, MongoDB for data storage, JWT for secure authentication, and React for a user-friendly frontend interface.
