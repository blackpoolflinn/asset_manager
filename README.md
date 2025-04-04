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
    git clone https://github.com/blackpoolflinn/asset_manager.git
    cd <project-directory>
    ```
    
2.  Install dependencies for both frontend and backend:
    
    ```
    npm install
    cd client
    npm install
    ```
    

## Environment Variables Setup

Create a `.env` file in the SERVER FOLDER and add the following:

```
SECRET="examplesecret"
```

Modify this value as needed to suit your application's security requirements.

## Running the Application

Open two terminal windows and follow these steps:

### Build the Client (Frontend) THIS ONLY HAS TO BE RUN ONCE AFTER REPO IS CLONED

1.  In the first terminal, navigate to the `client` directory:
    
    ```
    cd client
    ```
    
2.  build the frontend:
    
    ```
    npm run build
    ```
    

### Start the Server (Backend) RUN EVERY TIME

1.  In the second terminal, ensure you are in the root project directory:
    
    ```
    cd asset_manager  # Skip this if you're already in the root
    ```
    
2.  Start the backend:
    
    ```
    npm start
    ```
    

## Accessing the Application

-   After building the frontend and running the server, the webiste will be available on `http://localhost:3001/`

## Additional Notes

-   If using environment variables, ensure they are set up correctly.
    
-   Modify the ports or configurations as needed in `.env` or configuration files.
    

----------
