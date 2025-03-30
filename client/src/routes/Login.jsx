import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { queryClient } from '..'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate(); //useNavigate can redirect the user to the URL that the websites requires them to go to
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState("")

    const HandleLogin = () => {
        if(username.length <= 0 || username.trim().length <= 0 || password.length <= 0 || password.trim().length <= 0){
            setError("Empty Input Detected")
            setShowError(true)
            return //verify the username and password aren't blank and if they are use the error handling
        }
        fetch(`/api/login`, {
            method: "POST", //post request to compare username and password with database
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password})
            }).then(
                resp => resp.json()
            ).then((response) => {
                if(response.success){ //returned is a boolean value of true or false on whether password and username was accepted
                    queryClient.invalidateQueries({ queryKey: ['userData'] }).then(() => { 
                        navigate("/") //if its correct queries are invalidated so the page knows a change has occured and the user is navigated to dashboard
                    })
                } else {
                    setError("Incorrect Username or Password")
                    setShowError(true)
                    return
                }   
        }) 
    }

    return (
        <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=edit_square" />
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="container">
            <div className="bg-green-500 p-3 rounded-md flex justify-between items-center">
                <span className="font-semibold text-white">Inventory dashboard</span>
                <Link to={`../register`}className="font-semibold text-white hover:opacity-50">
                    <div className="flex items-center justify-between gap-2">
                        Register
                    </div>
                </Link>
            </div>
            
            <div className="flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Login</h2>
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
                    <button className="w-full hover:bg-green-500/50 bg-green-500 text-white p-3 rounded-lg shadow-md" onClick={HandleLogin}>
                    Sign In
                    </button>
                    {!showError ? <></> : <div className="text-red-500 pt-5 text-center">
                        {error}
                    </div>
                    }
                </div>
            </div>
          </div>
          </div>
        </>
        );
  
};

export default Login;
