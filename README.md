# Project Setup Instructions

## Getting Started

Follow the steps below to set up and run the project locally.

## Prerequisites

Ensure you have the following installed on your system:

-   [Node.js](https://nodejs.org/) (Latest LTS version recommended)
    
-   npm (comes with Node.js)
    

## Installation

1.  Clone the repository:
    
    ```
    git clone <repository-url>
    cd <project-directory>
    ```
    
2.  Install dependencies for both frontend and backend:
    
    ```
    npm install
    cd client
    npm install
    ```
    

## Environment Variables Setup

Create a `.env` file in the root project directory and add the following:

```
SECRET="examplesecret"
```

Modify this value as needed to suit your application's security requirements.

## Running the Application

Open two terminal windows and follow these steps:

### Start the Client (Frontend)

1.  In the first terminal, navigate to the `client` directory:
    
    ```
    cd client
    ```
    
2.  Start the frontend:
    
    ```
    npm start
    ```
    

### Start the Server (Backend)

1.  In the second terminal, ensure you are in the root project directory:
    
    ```
    cd <project-directory>  # Skip this if you're already in the root
    ```
    
2.  Start the backend:
    
    ```
    npm start
    ```
    

## Accessing the Application

-   The frontend will typically run on `http://localhost:3000/`
    
-   The backend server will run on the port specified in the server configuration (default: `http://localhost:3001/` )
    

## Additional Notes

-   If using environment variables, ensure they are set up correctly.
    
-   Modify the ports or configurations as needed in `.env` or configuration files.
    

----------
