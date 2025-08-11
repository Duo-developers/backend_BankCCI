# Backend BankCCI

This is the backend for a web application that simulates a banking platform, developed with Node.js, Express, and MongoDB. It provides functionalities for both administrators and clients, managing users, accounts, transactions, and products.

## Key Features

-   **Secure Authentication**: Login system based on JSON Web Tokens (JWT) and password hashing with `argon2`.
-   **Role-Based Access Control**: Differentiates between `ADMIN_ROLE` and `USER_ROLE` to control access to various features.
-   **User CRUD**: Administrators can create, list, update, and deactivate customer profiles.
-   **Bank Account Management**:
    -   Create SAVINGS, MONETARY (Checking), and CREDIT account types.
    -   Automatic generation of unique account numbers.
    -   Link accounts to user profiles.
-   **Transactional System**:
    -   Account deposits managed by administrators.
    -   Secure transfers between accounts with safety limits.
    -   Purchase of bank products and services.
    -   Reversal of deposits within a limited time window.
-   **Product Management**: An administrator can manage the products and services offered by the bank.
-   **Currency Conversion**: An endpoint to convert amounts between different currencies using an external API.
-   **Favorites**: Users can add other accounts to a favorites list for easier transfers.
-   **Security**: Implements `helmet` for protection against common vulnerabilities, `cors` to allow requests from the frontend, and `express-rate-limit` to prevent brute-force attacks.

## Technologies Used

-   **Node.js**: JavaScript runtime environment.
-   **Express.js**: Framework for building the REST API.
-   **MongoDB**: NoSQL database for data storage.
-   **Mongoose**: ODM for modeling the application's data.
-   **JSON Web Tokens (JWT)**: For generating access tokens.
-   **Argon2**: For secure password hashing.
-   **Express Validator**: For validating incoming data on API routes.
-   **Dotenv**: For managing environment variables.
-   **Morgan**: For HTTP request logging.

## Installation and Setup

Follow these steps to get the project running in a local environment.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 14 or higher) installed.
-   A running instance of [MongoDB](https://www.mongodb.com/).

### Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Duo-developers/backend_BankCCI.git](https://github.com/Duo-developers/backend_BankCCI.git)
    cd backend_BankCCI
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the project root and add the following variables.

    ```env
    PORT=3001
    URI_MONGO=mongodb://localhost:27017/bank-cci-system
    SECRETORPRIVATEKEY=Th1$15mYs3Cr3tk31
    EXCHANGERATE_API_KEY=your_exchangerate_api_key
    ```

4.  **Start the server:**
    -   For a production environment:
        ```bash
        npm start
        ```
    -   For a development environment with auto-reloading:
        ```bash
        npm run dev
        ```

    Upon startup, the application will automatically create a default admin user and a default client user, along with their respective accounts and a list of products.

### Default Users

-   **Administrator**:
    -   **Email**: `admin@gmail.com`
    -   **Username**: `ADMINB`
    -   **Password**: `ADMINB`
-   **Client**:
    -   **Email**: `usuario@gmail.com`
    -   **Username**: `USUARIO1`
    -   **Password**: `USUARIO1`

## Project Structure
