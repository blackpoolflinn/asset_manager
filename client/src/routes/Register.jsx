import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate(); //useNavigate can redirect the user to the URL that the websites requires them to go to

    const HandleRegister = () => {
        if(username.length <= 0 || username.trim().length <= 0 || password.length <= 0 || password.trim().length <= 0){
            return 
        }
        fetch(`/api/register`, {
            method: "POST", //POST request to create the users account
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password})
            }).then(
                resp => resp.json()
            ).then((response) => {
                if(response.success === true){ //check whether the account creation was successful
                    navigate("/login") //if it was succesful navigate them to login
                }
        }) 
    }

    return (
        <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=edit_square" />
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="container">
            {/* Header */}
            <div className="bg-green-500 p-3 rounded-md flex justify-between items-center">
                <span className="font-semibold text-white">Inventory dashboard</span>
                <Link to={`../login`} className="font-semibold text-white hover:opacity-50">
                    <div className="flex items-center justify-between gap-2">
                        Login
                    </div>
                </Link>
            </div>
            
            {/* Login Card */}
            <div className="flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Register</h2>
                    <input
                    onChange={e => setUsername(e.target.value)}
                    type="text"
                    placeholder="Enter username"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    />
                    <input
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter password"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    />
                    <button className="w-full hover:bg-green-500/50 bg-green-500 text-white p-3 rounded-lg shadow-md" onClick={HandleRegister}>
                    Register
                    </button>
                </div>
            </div>
          </div>
          </div>
        </>
        );
  
};

export default Register;
