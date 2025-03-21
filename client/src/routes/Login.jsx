import React from "react";

const Login = () => {
    return (
        <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=edit_square" />
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="container">
            {/* Header */}
            <div className="bg-green-500 p-3 rounded-md flex justify-between items-center">
                <span className="font-semibold text-white">Inventory dashboard</span>
                <button className="font-semibold text-white hover:opacity-50">
                    <div className="flex items-center justify-between gap-2">
                        Register
                    </div>
                </button>
            </div>
            
            {/* Login Card */}
            <div className="flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Login</h2>
                    <input
                    type="text"
                    placeholder="Enter username"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    />
                    <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    />
                    <button className="w-full hover:bg-green-500/50 bg-green-500 text-white p-3 rounded-lg shadow-md">
                    Sign In
                    </button>
                </div>
            </div>
          </div>
          </div>
        </>
        );
  
};

export default Login;
